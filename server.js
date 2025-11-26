import path from "path";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const FALLBACK_EMAIL =
  process.env.FORMSUBMIT_EMAIL ||
  process.env.MAIL_TO ||
  "24mc3040@rgipt.ac.in";

const fetchAdapter = (...args) => {
  if (typeof fetch !== "undefined") {
    return fetch(...args);
  }
  return import("node-fetch").then(({ default: nodeFetch }) =>
    nodeFetch(...args)
  );
};

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const isSmtpConfigured = () => {
  const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"];
  return required.every((key) => Boolean(process.env[key]));
};

const sendViaSmtp = async (payload) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"BluEyes Studio" <${process.env.SMTP_USER}>`,
    to: FALLBACK_EMAIL,
    subject: `New BluEyes inquiry from ${payload.name}`,
    text: `
Name: ${payload.name}
Phone: ${payload.phone}
Event Type: ${payload.eventType}
Date: ${payload.date}
Location: ${payload.location}

Message:
${payload.message}
    `,
  };

  await transporter.sendMail(mailOptions);
};

const sendViaFormSubmit = async (payload) => {
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(
    FALLBACK_EMAIL
  )}`;
  const response = await fetchAdapter(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      phone: payload.phone,
      eventType: payload.eventType,
      date: payload.date,
      location: payload.location,
      message: payload.message,
      _subject: `New BluEyes inquiry from ${payload.name}`,
      _template: "table",
      _captcha: "false",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`FormSubmit error: ${errorText}`);
  }
};

app.post("/api/contact", async (req, res) => {
  const { name, phone, eventType, date, location, message } = req.body || {};

  if (!name || !phone) {
    return res.status(400).json({ error: "Name and phone are required." });
  }

  const payload = {
    name,
    phone,
    eventType: eventType || "n/a",
    date: date || "n/a",
    location: location || "n/a",
    message: message || "n/a",
  };

  try {
    if (isSmtpConfigured()) {
      await sendViaSmtp(payload);
    } else {
      await sendViaFormSubmit(payload);
    }
    res.json({ success: true });
  } catch (error) {
    console.error("Email send failed", error);
    res.status(500).json({ error: "Failed to send message." });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`BluEyes server running at http://localhost:${PORT}`);
});


