/* =========================================================
   EDIT THIS CONFIG BLOCK WITH YOUR REAL DETAILS
   Everything on the page updates automatically from here.
========================================================= */
const CONFIG = {
  babyName: "Baby's Name",
  parents: "Parent One & Parent Two",
  godparents: "Godparent One & Godparent Two",
  childFullName: "Child's Full Name",

  // Use ISO format: "YYYY-MM-DDTHH:MM:SS"
  eventDateISO: "2026-09-20T11:00:00",

  venueName: "St. Mary's Church",
  venueAddress: "123 Church Street, Your City",
  // Simple text search works well, e.g. "St. Mary's Church, Your City"
  mapQuery: "St. Mary's Church, Your City",

  // Include country code, digits only, e.g. "491701234567"
  whatsappNumber: "491701234567",
  whatsappMessage: "Hello! We'd be delighted to attend the baptism celebration. 🕊️"
};

/* ========================================================= */

function applyConfig(){
  document.getElementById('baby-name-display').textContent = CONFIG.babyName;
  document.getElementById('parents-names').textContent = CONFIG.parents;
  document.getElementById('godparents-names').textContent = CONFIG.godparents;
  document.getElementById('child-name').textContent = CONFIG.childFullName;
  document.getElementById('venue-name').textContent = CONFIG.venueName;
  document.getElementById('venue-address').textContent = CONFIG.venueAddress;
  document.title = "The Baptism of " + CONFIG.babyName;

  const mapEl = document.getElementById('map-embed');
  const q = encodeURIComponent(CONFIG.mapQuery);
  mapEl.src = `https://www.google.com/maps?q=${q}&output=embed`;
  document.getElementById('directions-link').href = `https://www.google.com/maps/search/?api=1&query=${q}`;

  const waMsg = encodeURIComponent(CONFIG.whatsappMessage);
  document.getElementById('whatsapp-link').href = `https://wa.me/${CONFIG.whatsappNumber}?text=${waMsg}`;

  const d = new Date(CONFIG.eventDateISO);
  const opts = { weekday:'long', year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' };
  document.getElementById('event-date-display').textContent = d.toLocaleDateString(undefined, opts);
}

/* ---------- Countdown ---------- */
function startCountdown(){
  const target = new Date(CONFIG.eventDateISO).getTime();
  const els = {
    d: document.getElementById('cd-days'),
    h: document.getElementById('cd-hours'),
    m: document.getElementById('cd-mins'),
    s: document.getElementById('cd-secs')
  };
  function tick(){
    const now = Date.now();
    let diff = Math.max(0, target - now);
    const days = Math.floor(diff / 86400000); diff -= days*86400000;
    const hours = Math.floor(diff / 3600000); diff -= hours*3600000;
    const mins = Math.floor(diff / 60000); diff -= mins*60000;
    const secs = Math.floor(diff / 1000);
    els.d.textContent = String(days).padStart(2,'0');
    els.h.textContent = String(hours).padStart(2,'0');
    els.m.textContent = String(mins).padStart(2,'0');
    els.s.textContent = String(secs).padStart(2,'0');
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------- Falling daisy petals ---------- */
const DAISY_SVG = `
<svg viewBox="0 0 60 60" width="26" height="26">
  <g>
    <ellipse cx="30" cy="12" rx="7" ry="12" fill="#ffffff" stroke="#e7edf2" stroke-width="0.5"/>
    <ellipse cx="30" cy="48" rx="7" ry="12" fill="#ffffff" stroke="#e7edf2" stroke-width="0.5"/>
    <ellipse cx="12" cy="30" rx="12" ry="7" fill="#ffffff" stroke="#e7edf2" stroke-width="0.5"/>
    <ellipse cx="48" cy="30" rx="12" ry="7" fill="#ffffff" stroke="#e7edf2" stroke-width="0.5"/>
    <ellipse cx="17" cy="17" rx="10" ry="6" fill="#ffffff" stroke="#e7edf2" stroke-width="0.5" transform="rotate(45 17 17)"/>
    <ellipse cx="43" cy="17" rx="10" ry="6" fill="#ffffff" stroke="#e7edf2" stroke-width="0.5" transform="rotate(-45 43 17)"/>
    <ellipse cx="17" cy="43" rx="10" ry="6" fill="#ffffff" stroke="#e7edf2" stroke-width="0.5" transform="rotate(-45 17 43)"/>
    <ellipse cx="43" cy="43" rx="10" ry="6" fill="#ffffff" stroke="#e7edf2" stroke-width="0.5" transform="rotate(45 43 43)"/>
    <circle cx="30" cy="30" r="8" fill="#F4C542"/>
  </g>
</svg>`;

function spawnDaisy(){
  const layer = document.getElementById('petal-layer');
  const d = document.createElement('div');
  d.className = 'daisy';
  const startX = Math.random() * 100;
  const duration = 7 + Math.random() * 6;
  const size = 0.6 + Math.random() * 0.8;
  const sway = (Math.random() * 2 - 1) * 60;
  d.style.left = startX + 'vw';
  d.style.animationDuration = duration + 's';
  d.style.setProperty('--sway', sway + 'px');
  d.innerHTML = `<div style="transform:scale(${size})">${DAISY_SVG}</div>`;
  layer.appendChild(d);
  setTimeout(() => d.remove(), duration * 1000 + 200);
}

function startPetals(){
  spawnDaisy();
  setInterval(spawnDaisy, 900);
}

/* ---------- Envelope open interaction ---------- */
function initEnvelope(){
  const envelope = document.getElementById('envelope');
  const screen = document.getElementById('envelope-screen');
  const invitation = document.getElementById('invitation');
  const music = document.getElementById('bg-music');
  let opened = false;

  function openInvitation(){
    if (opened) return;
    opened = true;
    envelope.classList.add('opened');

    music.volume = 0.6;
    music.play().catch(() => { /* autoplay may be blocked until gesture; click already is one */ });

    setTimeout(() => {
      screen.classList.add('hidden');
      invitation.classList.add('visible');
    }, 900);
  }

  envelope.addEventListener('click', openInvitation);
  envelope.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openInvitation(); }
  });
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  startCountdown();
  startPetals();
  initEnvelope();
});
