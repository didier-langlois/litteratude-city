const state = { districts: {}, current: null };

const drawer = document.getElementById("drawer");
const rail = document.getElementById("rail");
const promptBox = document.getElementById("prompt");
const lamp = document.getElementById("lamp");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

fetch("data/districts.json")
  .then(response => {
    if (!response.ok) throw new Error("Impossible de charger districts.json");
    return response.json();
  })
  .then(data => {
    state.districts = data;
    buildHotspots();
  })
  .catch(error => {
    console.error(error);
    openModal("Erreur de chargement", "Le moteur ne parvient pas à lire les données. Ouvrez cette version depuis un petit serveur local ou depuis GitHub Pages.");
  });

function buildHotspots() {
  const container = document.getElementById("hotspots");
  Object.entries(state.districts).forEach(([id, district]) => {
    const button = document.createElement("button");
    button.className = "hotspot";
    button.id = `hotspot-${id}`;
    button.style.left = `${district.hotspot.left}%`;
    button.style.top = `${district.hotspot.top}%`;
    button.style.width = `${district.hotspot.width}%`;
    button.style.height = `${district.hotspot.height}%`;
    button.innerHTML = `<span class="hotspot-label">${district.title}</span>`;
    button.addEventListener("click", () => openDistrict(id));
    container.appendChild(button);
  });
}

function openDistrict(id) {
  state.current = id;
  document.querySelectorAll(".hotspot").forEach(item => item.classList.remove("active"));
  document.getElementById(`hotspot-${id}`).classList.add("active");

  const district = state.districts[id];
  document.getElementById("districtType").textContent = district.type;
  document.getElementById("districtTitle").textContent = district.title;
  document.getElementById("districtText").textContent = district.description;
  document.getElementById("districtPortrait").src = district.portrait;

  rail.innerHTML = "";
  district.cards.forEach((card, index) => {
    const article = document.createElement("article");
    article.className = "card";
    article.innerHTML = `
      <img src="${card.image}" alt="">
      <div class="card-text">
        <h2>${card.title}</h2>
        <p>${card.description}</p>
      </div>`;
    article.addEventListener("click", () => openCard(card));
    rail.appendChild(article);
  });

  drawer.classList.add("open");
  promptBox.style.opacity = "0";
  lamp.classList.add("hidden");
}

function closeDrawer() {
  drawer.classList.remove("open");
  document.querySelectorAll(".hotspot").forEach(item => item.classList.remove("active"));
  promptBox.style.opacity = "1";
  lamp.classList.remove("hidden");
}

function openCard(card) {
  if (card.kind === "video") {
    showModal(`
      <h1>${card.title}</h1>
      <video controls poster="${card.image}">
        <source src="${card.media}" type="video/mp4">
      </video>
      <p>${card.description}</p>`);
    return;
  }

  if (card.kind === "video-audio") {
    const audios = (card.audio || []).map(src => `<audio controls src="${src}"></audio>`).join("");
    showModal(`
      <h1>${card.title}</h1>
      <video controls poster="${card.image}">
        <source src="${card.media}" type="video/mp4">
      </video>
      <p>${card.description}</p>${audios}`);
    return;
  }

  if (card.kind === "gallery-audio") {
    const gallery = (card.gallery || []).map(src => `<img src="${src}" alt="">`).join("");
    const audios = (card.audio || []).map(src => `<audio controls src="${src}"></audio>`).join("");
    showModal(`
      <h1>${card.title}</h1>
      <img src="${card.image}" alt="">
      <p>${card.description}</p>
      <div class="gallery">${gallery}</div>${audios}`);
    return;
  }

  if (card.kind === "future") {
    openModal(card.title, `${card.description}<br><br><strong>Cette porte est déjà réservée dans l’architecture de la Cité.</strong>`);
    return;
  }

  showModal(`<h1>${card.title}</h1><img src="${card.image}" alt=""><p>${card.description}</p>`);
}

function showModal(html) {
  modalContent.innerHTML = html;
  modal.classList.add("open");
}

function openModal(title, text) {
  showModal(`<h1>${title}</h1><p>${text}</p>`);
}

function closeModal() {
  modal.classList.remove("open");
  modalContent.innerHTML = "";
}

document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
document.getElementById("overviewButton").addEventListener("click", closeDrawer);
document.getElementById("leftArrow").addEventListener("click", () => rail.scrollBy({ left: -520, behavior: "smooth" }));
document.getElementById("rightArrow").addEventListener("click", () => rail.scrollBy({ left: 520, behavior: "smooth" }));
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });

lamp.addEventListener("click", () => openModal(
  "La Lampe du Village",
  "Le savoir est accueilli librement. La transmission est offerte. Ceux qui le souhaitent peuvent, en retour, contribuer librement à faire vivre le Village."
));

document.getElementById("emblemsButton").addEventListener("click", () => showModal(`
  <h1>Les emblèmes de Littératude</h1>
  <div class="emblems">
    <div class="emblem">⌖<b>Explorer</b></div>
    <div class="emblem">▤<b>Lire</b></div>
    <div class="emblem">◖<b>Écouter</b></div>
    <div class="emblem">◉<b>Regarder</b></div>
    <div class="emblem">✎<b>Écrire</b></div>
    <div class="emblem">▣<b>Archives</b></div>
    <div class="emblem">◎<b>Comprendre</b></div>
    <div class="emblem">⌁<b>Voyager</b></div>
    <div class="emblem">✦<b>Constellations</b></div>
    <div class="emblem">▥<b>Passeport</b></div>
  </div>`));
