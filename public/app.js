import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";

// ---------- Smooth Nav Scroll ----------
document.querySelectorAll("[data-scroll]").forEach((el) => {
  el.addEventListener("click", () => {
    const selector = el.getAttribute("data-scroll");
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ---------- Footer Year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Portfolio Builder ----------
const portfolioFilters = [
  { label: "All", value: "all" },
  { label: "Candid", value: "candid" },
  { label: "Portraits", value: "portraits" },
  { label: "Weddings", value: "weddings" },
  { label: "Events", value: "events" },
  { label: "Brand", value: "brand" },
];

const portfolioItems = [
  {
    title: "Campus Fest Roars",
    subtitle: "College Fest · 2025",
    category: "events",
    image: "https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=900&q=80",
    link: "https://unsplash.com/photos/Q1p7bh3SHj8",
  },
  {
    title: "Golden Hour Gaze",
    subtitle: "Outdoor Portrait",
    category: "portraits",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    link: "https://unsplash.com/photos/d1UPkiFd04A",
  },
  {
    title: "Bride In Motion",
    subtitle: "Wedding Story",
    category: "weddings",
    image: "https://images.unsplash.com/photo-1488600779855-8151a2b2e4eb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/ln2p1cD9Z9w",
  },
  {
    title: "Varmala Vibes",
    subtitle: "Ceremony Aisle",
    category: "weddings",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
    link: "https://unsplash.com/photos/7wUorDiCi2s",
  },
  {
    title: "Dance in Neon",
    subtitle: "Sangeet Night",
    category: "weddings",
    image: "https://images.unsplash.com/photo-1717873642124-107e90699429?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/3Ap0NCUn2xQ",
  },
  {
    title: "Couple Chronicles",
    subtitle: "Pre-Wedding Trail",
    category: "weddings",
    image: "https://images.unsplash.com/photo-1636790830225-f37e3bf91b83?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/NOD3bJ_wSCU",
  },
  {
    title: "Friends Forever",
    subtitle: "Farewell Function",
    category: "candid",
    image: "https://plus.unsplash.com/premium_photo-1661685783553-f43a6f207525?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/mEZ3PoFGs_k",
  },
  {
    title: "Street Laughs",
    subtitle: "Candid Walk",
    category: "candid",
    image: "https://plus.unsplash.com/premium_photo-1661443337979-208a39b1f493?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/FJzQyXlJ32I",
  },
  {
    title: "Fest Confetti",
    subtitle: "Campus Candid",
    category: "candid",
    image: "https://plus.unsplash.com/premium_photo-1670333351976-4582a949c4f7?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/tAKXap853rY",
  },
  {
    title: "Product Glow",
    subtitle: "Brand Portrait",
    category: "brand",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    link: "https://unsplash.com/photos/rDEOVtE7vOs",
  },
  {
    title: "Editorial Pose",
    subtitle: "Portrait Session",
    category: "portraits",
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80",
    link: "https://unsplash.com/photos/BS-W1u7jaf0",
  },
];

const filtersContainer = document.getElementById("portfolioFilters");
const gridContainer = document.getElementById("portfolioGrid");

let currentFilter = "all";

function buildFilterChips() {
  filtersContainer.innerHTML = "";
  portfolioFilters.forEach((filter) => {
    const btn = document.createElement("button");
    btn.className = `filter-chip ${filter.value === currentFilter ? "active" : ""}`;
    btn.textContent = filter.label;
    btn.type = "button";
    btn.addEventListener("click", () => {
      currentFilter = filter.value;
      buildFilterChips();
      renderPortfolio();
    });
    filtersContainer.appendChild(btn);
  });
}

function renderPortfolio() {
  gridContainer.innerHTML = "";
  const cards = portfolioItems.filter((item) => {
    if (currentFilter === "all") return true;
    return item.category === currentFilter;
  });

  cards.forEach((item) => {
    const anchor = document.createElement("a");
    anchor.href = item.link;
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
    anchor.className = "gallery-item";
    anchor.style.backgroundImage = `url(${item.image})`;
    anchor.setAttribute("data-category", item.category);

    anchor.innerHTML = `
      <div class="gallery-label">
        <span>${item.title}</span>
        <span>${item.subtitle}</span>
      </div>
    `;

    gridContainer.appendChild(anchor);
  });
}

buildFilterChips();
renderPortfolio();

// ---------- Contact Form Backend Hook ----------
const bookingForm = document.getElementById("bookingForm");
const formStatus = document.getElementById("formStatus");

bookingForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(bookingForm);
  const payload = Object.fromEntries(formData.entries());

  formStatus.textContent = "Sending your inquiry...";
  formStatus.style.color = "#93c5fd";

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    formStatus.textContent = "Sent! We'll reply shortly.";
    formStatus.style.color = "#22c55e";
    bookingForm.reset();
  } catch (error) {
    console.error(error);
    formStatus.textContent = "Something went wrong. Please try again.";
    formStatus.style.color = "#f87171";
  } finally {
    setTimeout(() => {
      formStatus.textContent = "We usually reply within 24 hours.";
      formStatus.style.color = "";
    }, 5000);
  }
});

// ---------- THREE.JS 3D CAMERA ----------
const canvas = document.getElementById("camera3d");
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x01030a, 8, 22);

const camera = new THREE.PerspectiveCamera(32, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
camera.position.set(0, 1.8, 8);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

function addLights() {
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.1);
  keyLight.position.set(5, 8, 10);

  const fillLight = new THREE.DirectionalLight(0x4f46e5, 1.2);
  fillLight.position.set(-6, 1, -4);

  const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
  rimLight.position.set(0, 6, -10);

  const ambient = new THREE.AmbientLight(0x1e293b, 0.9);
  const spot = new THREE.SpotLight(0x38bdf8, 1.4, 20, Math.PI / 5, 0.4, 1);
  spot.position.set(0, 6, 4);
  scene.add(keyLight, fillLight, rimLight, ambient, spot);
}

function buildCameraModel() {
  const group = new THREE.Group();

  const bodyGeo = new THREE.BoxGeometry(4.4, 2.6, 1.6);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x050b1e,
    metalness: 0.65,
    roughness: 0.4,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0.2;
  group.add(body);

  const leatherGeo = new THREE.BoxGeometry(4.5, 2.4, 1.62);
  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x0b1228,
    metalness: 0.2,
    roughness: 0.9,
    emissive: 0x060a1b,
  });
  const leather = new THREE.Mesh(leatherGeo, leatherMat);
  leather.position.y = 0.18;
  group.add(leather);

  const lensGeo = new THREE.CylinderGeometry(1, 1.2, 2.4, 50, 1, true);
  const lensMat = new THREE.MeshStandardMaterial({
    color: 0x111827,
    metalness: 0.95,
    roughness: 0.12,
    envMapIntensity: 1.2,
  });
  const lens = new THREE.Mesh(lensGeo, lensMat);
  lens.rotation.z = Math.PI / 2;
  lens.position.set(1.9, 0.2, 0);
  group.add(lens);

  const glassGeo = new THREE.CircleGeometry(0.9, 64);
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x5eead4,
    emissiveIntensity: 0.6,
    metalness: 0.8,
    roughness: 0.08,
  });
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.position.set(3, 0.2, 0);
  glass.rotation.y = -Math.PI / 2;
  group.add(glass);

  const sensorGeo = new THREE.BoxGeometry(1.4, 0.6, 0.1);
  const sensorMat = new THREE.MeshStandardMaterial({
    color: 0x2563eb,
    emissive: 0x1d4ed8,
    emissiveIntensity: 0.5,
  });
  const sensor = new THREE.Mesh(sensorGeo, sensorMat);
  sensor.position.set(-1.4, 0.2, 0.85);
  group.add(sensor);

  const shutterGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.3, 24);
  const shutterMat = new THREE.MeshStandardMaterial({
    color: 0xf97316,
    emissive: 0xf97316,
    emissiveIntensity: 0.7,
  });
  const shutter = new THREE.Mesh(shutterGeo, shutterMat);
  shutter.rotation.x = Math.PI / 2;
  shutter.position.set(0.5, 1.25, 0.55);
  group.add(shutter);

  const dialGeo = new THREE.TorusGeometry(0.45, 0.08, 24, 48);
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    metalness: 0.9,
    roughness: 0.3,
  });
  const dial = new THREE.Mesh(dialGeo, dialMat);
  dial.rotation.x = Math.PI / 2;
  dial.position.set(-1.6, 1.05, -0.6);
  group.add(dial);

  const baseGeo = new THREE.CylinderGeometry(3.8, 3.8, 0.4, 60);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x050b1e,
    metalness: 0.1,
    roughness: 0.9,
  });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = -1.2;
  group.add(base);

  const strapGeo = new THREE.TorusGeometry(3.5, 0.04, 16, 100);
  const strapMat = new THREE.MeshStandardMaterial({
    color: 0x1d4ed8,
    emissive: 0x2563eb,
    emissiveIntensity: 0.3,
    metalness: 0.4,
    roughness: 0.7,
  });
  const strap = new THREE.Mesh(strapGeo, strapMat);
  strap.rotation.x = Math.PI / 2;
  strap.position.y = -0.3;
  group.add(strap);

  const lensGlow = createLensGlow();
  group.add(lensGlow);

  const focusGrid = createFocusGrid();
  focusGrid.position.set(-0.6, 0.85, 0.95);
  group.add(focusGrid);

  const floorHalo = createFloorHalo();
  floorHalo.position.y = -1.21;
  group.add(floorHalo);

  group.rotation.y = -0.9;
  group.rotation.x = -0.18;

  return {
    group,
    refs: {
      shutter,
      lensGlow,
      focusGrid,
    },
  };
}

function buildFloatingParticles() {
  const particlesGeo = new THREE.BufferGeometry();
  const count = 180;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = Math.random() * 6;
    positions[i * 3 + 2] = -Math.random() * 6;
  }

  particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particlesMat = new THREE.PointsMaterial({
    color: 0x60a5fa,
    size: 0.05,
    transparent: true,
    opacity: 0.7,
  });

  return new THREE.Points(particlesGeo, particlesMat);
}

function createLensGlow() {
  const geometry = new THREE.RingGeometry(0.95, 1.4, 64);
  const material = new THREE.MeshBasicMaterial({
    color: 0x5eead4,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide,
  });
  const glow = new THREE.Mesh(geometry, material);
  glow.position.set(3.01, 0.2, 0);
  glow.rotation.y = -Math.PI / 2;
  return glow;
}

function createFocusGrid() {
  const geometry = new THREE.RingGeometry(0.3, 0.6, 32, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0x7dd3fc,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.PI / 2.2;
  return mesh;
}

function createFloorHalo() {
  const geometry = new THREE.RingGeometry(2.8, 3.4, 80);
  const material = new THREE.MeshBasicMaterial({
    color: 0x2563eb,
    transparent: true,
    opacity: 0.25,
  });
  const halo = new THREE.Mesh(geometry, material);
  halo.rotation.x = -Math.PI / 2;
  return halo;
}

function createBackdrop() {
  const geometry = new THREE.PlaneGeometry(18, 10, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0x01030a,
    emissive: 0x0f172a,
    emissiveIntensity: 0.6,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(0, 1.8, -6);
  plane.rotation.x = -0.06;
  return plane;
}

function createAuraPanels() {
  const panels = [];
  const colors = [0x2563eb, 0xa855f7, 0x0ea5e9];
  for (let i = 0; i < colors.length; i++) {
    const geometry = new THREE.PlaneGeometry(3.5, 1.2);
    const material = new THREE.MeshBasicMaterial({
      color: colors[i],
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });
    const panel = new THREE.Mesh(geometry, material);
    panel.position.set(-2 + i * 2.2, 1 + i * 0.2, -2.5 - i * 0.3);
    panel.rotation.y = -0.2 + i * 0.2;
    panels.push(panel);
  }
  return panels;
}

addLights();
const { group: cameraGroup, refs: cameraRefs } = buildCameraModel();
scene.add(cameraGroup);
scene.add(createBackdrop());
scene.add(buildFloatingParticles());
const auraPanels = createAuraPanels();
auraPanels.forEach((panel) => scene.add(panel));

let targetRotX = cameraGroup.rotation.x;
let targetRotY = cameraGroup.rotation.y;
let autoRotate = 0.15;
const shutterRestY = cameraRefs.shutter.position.y;

window.addEventListener("pointermove", (event) => {
  const xNorm = (event.clientX / window.innerWidth) * 2 - 1;
  const yNorm = (event.clientY / window.innerHeight) * 2 - 1;

  targetRotY = -0.6 + xNorm * 0.45;
  targetRotX = -0.2 + yNorm * 0.25;
});

window.addEventListener("pointerdown", () => {
  autoRotate = 0.05;
  cameraRefs.shutter.position.y = shutterRestY - 0.08;
});

const resetShutter = () => {
  autoRotate = 0.15;
  cameraRefs.shutter.position.y = shutterRestY;
};

window.addEventListener("pointerup", resetShutter);
window.addEventListener("pointerleave", resetShutter);

window.addEventListener("resize", () => {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();

  cameraGroup.rotation.y += autoRotate * 0.01;
  cameraGroup.rotation.y += (targetRotY - cameraGroup.rotation.y) * 0.06;
  cameraGroup.rotation.x += (targetRotX - cameraGroup.rotation.x) * 0.06;
  cameraGroup.position.y = Math.sin(elapsed * 0.6) * 0.04;
  cameraGroup.rotation.z = Math.sin(elapsed * 0.3) * 0.02;

  if (cameraRefs.lensGlow) {
    cameraRefs.lensGlow.material.opacity =
      0.35 + Math.sin(elapsed * 2) * 0.15;
  }

  if (cameraRefs.focusGrid) {
    cameraRefs.focusGrid.rotation.z = elapsed * 0.4;
    cameraRefs.focusGrid.position.x = -0.6 + Math.sin(elapsed * 0.8) * 0.15;
  }

  auraPanels.forEach((panel, index) => {
    panel.position.y = 1.1 + Math.sin(elapsed * 0.9 + index) * 0.35;
    panel.material.opacity = 0.15 + Math.sin(elapsed * 1.3 + index) * 0.1;
  });

  scene.traverse((child) => {
    if (child.isPoints) {
      child.rotation.y += 0.0008;
      child.position.y = Math.sin(elapsed * 0.4) * 0.08;
    }
  });

  renderer.render(scene, camera);
}

animate();

