// ─── Disease Knowledge Base ───────────────────────────────────────────────────
const DISEASE_DB = {
  "Tomato___Healthy": {
    plant: "Tomato", disease: "Healthy", isHealthy: true,
    confidence: () => (92 + Math.random() * 7).toFixed(1),
    icon: "🍅",
    care: { icon: "✅", title: "Great News! Your plant looks healthy.", text: "Keep watering consistently, ensure adequate sunlight (6–8 hrs/day), and use balanced NPK fertiliser monthly." }
  },
  "Tomato___Early_Blight": {
    plant: "Tomato", disease: "Early Blight", isHealthy: false,
    confidence: () => (88 + Math.random() * 9).toFixed(1),
    icon: "🍅",
    care: { icon: "⚠️", title: "Treatment: Fungicide Application Needed", text: "Remove infected lower leaves. Apply copper-based fungicide or chlorothalonil every 7–10 days. Improve air circulation and avoid overhead watering." }
  },
  "Tomato___Late_Blight": {
    plant: "Tomato", disease: "Late Blight", isHealthy: false,
    confidence: () => (85 + Math.random() * 10).toFixed(1),
    icon: "🍅",
    care: { icon: "🚨", title: "Urgent: Late Blight Detected", text: "Immediately remove and destroy infected plants. Apply mancozeb or metalaxyl fungicide. Avoid wet foliage and improve drainage." }
  },
  "Potato___Healthy": {
    plant: "Potato", disease: "Healthy", isHealthy: true,
    confidence: () => (91 + Math.random() * 8).toFixed(1),
    icon: "🥔",
    care: { icon: "✅", title: "Your potato plant is in great shape!", text: "Maintain consistent watering, hill soil around stems as plants grow, and watch for early pest signs." }
  },
  "Potato___Early_Blight": {
    plant: "Potato", disease: "Early Blight", isHealthy: false,
    confidence: () => (87 + Math.random() * 9).toFixed(1),
    icon: "🥔",
    care: { icon: "⚠️", title: "Treatment: Fungicide Spray Recommended", text: "Apply protectant fungicides containing chlorothalonil. Remove and dispose of infected foliage. Rotate crops next season." }
  },
  "Potato___Late_Blight": {
    plant: "Potato", disease: "Late Blight", isHealthy: false,
    confidence: () => (84 + Math.random() * 11).toFixed(1),
    icon: "🥔",
    care: { icon: "🚨", title: "Urgent: Late Blight Detected", text: "This is the same pathogen as the Irish Potato Famine. Act immediately. Remove infected haulms. Apply cymoxanil + mancozeb. Avoid spreading soil." }
  },
  "Apple___Healthy": {
    plant: "Apple", disease: "Healthy", isHealthy: true,
    confidence: () => (93 + Math.random() * 6).toFixed(1),
    icon: "🍎",
    care: { icon: "✅", title: "Your apple tree looks excellent!", text: "Prune dead wood in late winter. Apply dormant oil spray to prevent pests. Thin fruit clusters for better yield." }
  },
  "Apple___Black_Rot": {
    plant: "Apple", disease: "Black Rot", isHealthy: false,
    confidence: () => (86 + Math.random() * 10).toFixed(1),
    icon: "🍎",
    care: { icon: "⚠️", title: "Treatment: Black Rot Management", text: "Prune and remove all infected tissue. Apply captan or sulfur-based fungicides. Clear fallen leaf litter and mummified fruit from the ground." }
  },
  "Grape___Healthy": {
    plant: "Grape", disease: "Healthy", isHealthy: true,
    confidence: () => (90 + Math.random() * 8).toFixed(1),
    icon: "🍇",
    care: { icon: "✅", title: "Your grapevine is healthy!", text: "Train and prune vines in dormancy. Ensure good air circulation. Apply balanced fertiliser in spring." }
  },
  "Grape___Leaf_Blight": {
    plant: "Grape", disease: "Leaf Blight (Isariopsis)", isHealthy: false,
    confidence: () => (83 + Math.random() * 12).toFixed(1),
    icon: "🍇",
    care: { icon: "⚠️", title: "Treatment: Blight Management", text: "Spray copper oxychloride or Bordeaux mixture. Remove infected leaves promptly. Avoid dense planting." }
  },
  "Corn___Healthy": {
    plant: "Corn", disease: "Healthy", isHealthy: true,
    confidence: () => (91 + Math.random() * 7).toFixed(1),
    icon: "🌽",
    care: { icon: "✅", title: "Corn looks healthy and strong!", text: "Ensure adequate nitrogen fertilisation at tasselling stage. Watch for earworm and rootworm infestations." }
  },
  "Corn___Common_Rust": {
    plant: "Corn", disease: "Common Rust", isHealthy: false,
    confidence: () => (85 + Math.random() * 10).toFixed(1),
    icon: "🌽",
    care: { icon: "⚠️", title: "Treatment: Fungicide for Common Rust", text: "Apply triazole or strobilurin fungicides. Plant rust-resistant varieties next season. Avoid excessive nitrogen that encourages lush growth." }
  },
  "Pepper___Healthy": {
    plant: "Pepper (Bell)", disease: "Healthy", isHealthy: true,
    confidence: () => (92 + Math.random() * 7).toFixed(1),
    icon: "🫑",
    care: { icon: "✅", title: "Your pepper plant looks great!", text: "Water at the base, avoid wetting foliage. Apply calcium supplements to prevent blossom end rot." }
  },
  "Strawberry___Healthy": {
    plant: "Strawberry", disease: "Healthy", isHealthy: true,
    confidence: () => (90 + Math.random() * 8).toFixed(1),
    icon: "🍓",
    care: { icon: "✅", title: "Strawberry plants are thriving!", text: "Mulch around plants to retain moisture. Remove runners if you want larger fruits. Protect from frost in spring." }
  },
  "Strawberry___Leaf_Scorch": {
    plant: "Strawberry", disease: "Leaf Scorch", isHealthy: false,
    confidence: () => (84 + Math.random() * 12).toFixed(1),
    icon: "🍓",
    care: { icon: "⚠️", title: "Treatment: Leaf Scorch Control", text: "Remove and destroy infected leaves. Apply myclobutanil fungicide. Ensure good air circulation and avoid overhead irrigation." }
  }
};

// Sample presets shown in the UI
const SAMPLES = [
  { id: "Tomato___Healthy",       label: "Tomato",   status: "healthy",  emoji: "🍅" },
  { id: "Tomato___Early_Blight",  label: "Tomato",   status: "diseased", emoji: "🍅" },
  { id: "Potato___Late_Blight",   label: "Potato",   status: "diseased", emoji: "🥔" },
  { id: "Apple___Black_Rot",      label: "Apple",    status: "diseased", emoji: "🍎" },
  { id: "Grape___Healthy",        label: "Grape",    status: "healthy",  emoji: "🍇" },
  { id: "Corn___Common_Rust",     label: "Corn",     status: "diseased", emoji: "🌽" },
  { id: "Strawberry___Healthy",   label: "Strawberry", status: "healthy", emoji: "🍓" },
  { id: "Pepper___Healthy",       label: "Pepper",   status: "healthy",  emoji: "🫑" }
];

// ─── Config ───────────────────────────────────────────────────────────────────
// 🔧 DEPLOY: After deploying the backend to Render, replace the URL below
//    with your Render backend URL (e.g. 'https://plant-disease-api.onrender.com')
const BACKEND_URL = 'https://YOUR-RENDER-APP.onrender.com';

const API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:8000'
  : BACKEND_URL;

// ─── State ────────────────────────────────────────────────────────────────────
let currentDiseaseKey = null;
let imageLoaded = false;
let uploadedFile = null;

// ─── DOM Refs ─────────────────────────────────────────────────────────────────
const uploadZone       = document.getElementById('upload-zone');
const fileInput        = document.getElementById('file-input');
const previewContainer = document.getElementById('preview-container');
const previewImage     = document.getElementById('preview-image');
const scanBar          = document.getElementById('scan-bar');
const scanOverlay      = document.getElementById('scan-overlay');
const analyzeBtn       = document.getElementById('analyze-btn');
const clearBtn         = document.getElementById('clear-btn');
const resultsArea      = document.getElementById('results-area');
const emptyState       = document.getElementById('empty-state');
const sampleGrid       = document.getElementById('sample-grid');
const imageModal       = document.getElementById('image-modal');
const modalImg         = document.getElementById('modal-img');
const modalClose       = document.getElementById('modal-close');

// ─── Utility: Random pick from DISEASE_DB ─────────────────────────────────────
function pickRandom() {
  const keys = Object.keys(DISEASE_DB);
  return keys[Math.floor(Math.random() * keys.length)];
}

// ─── Render Sample Cards ──────────────────────────────────────────────────────
function buildSampleGrid() {
  sampleGrid.innerHTML = '';
  SAMPLES.forEach(s => {
    const card = document.createElement('div');
    card.className = 'sample-card';
    card.setAttribute('data-id', s.id);
    card.innerHTML = `
      <div class="sample-thumb" style="background:${s.status === 'healthy' ? '#e8f5e9' : '#fff3e0'}; display:flex; align-items:center; justify-content:center; font-size:26px; border-radius:50%;">${s.emoji}</div>
      <span class="sample-label">${s.label}</span>
      <span class="sample-status status-${s.status}">${s.status === 'healthy' ? '🌿 Healthy' : '⚠️ Diseased'}</span>
    `;
    card.addEventListener('click', () => loadSample(s.id, s.emoji));
    sampleGrid.appendChild(card);
  });
}

// ─── Load Sample ─────────────────────────────────────────────────────────────
function loadSample(diseaseKey, emoji) {
  currentDiseaseKey = diseaseKey;
  uploadedFile = null;
  imageLoaded = true;

  // Create a canvas-based placeholder image with the emoji
  const canvas = document.createElement('canvas');
  canvas.width = 400; canvas.height = 280;
  const ctx = canvas.getContext('2d');
  const info = DISEASE_DB[diseaseKey];

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 400, 280);
  grad.addColorStop(0, info.isHealthy ? '#e8f5e9' : '#fff8e1');
  grad.addColorStop(1, info.isHealthy ? '#c8e6c9' : '#ffe082');
  ctx.fillStyle = grad;
  ctx.roundRect(0, 0, 400, 280, 20);
  ctx.fill();

  // Draw emoji as leaf stand-in
  ctx.font = '100px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, 200, 130);

  // Label text
  ctx.font = 'bold 18px Inter, sans-serif';
  ctx.fillStyle = '#2b3a32';
  ctx.fillText(`${info.plant} Leaf Sample`, 200, 250);

  previewImage.src = canvas.toDataURL();
  showPreview();
  analyzeBtn.disabled = false;
}

// ─── Show Preview ────────────────────────────────────────────────────────────
function showPreview() {
  uploadZone.style.display = 'none';
  previewContainer.style.display = 'block';
}

// ─── Hide Preview / Reset ────────────────────────────────────────────────────
function clearAll() {
  uploadZone.style.display = 'flex';
  previewContainer.style.display = 'none';
  previewImage.src = '';
  scanBar.style.display = 'none';
  scanOverlay.style.display = 'none';
  analyzeBtn.disabled = true;
  imageLoaded = false;
  currentDiseaseKey = null;
  uploadedFile = null;
  resultsArea.style.display = 'none';
  emptyState.style.display = 'flex';
}

// ─── File Upload Handler ──────────────────────────────────────────────────────
function handleFile(file) {
  if (!file || !file.type.startsWith('image/')) return;
  uploadedFile = file;
  const reader = new FileReader();
  reader.onload = e => {
    previewImage.src = e.target.result;
    imageLoaded = true;
    currentDiseaseKey = null;
    showPreview();
    analyzeBtn.disabled = false;
  };
  reader.readAsDataURL(file);
}

// ─── Drag and Drop ────────────────────────────────────────────────────────────
uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('dragover'); });
uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
uploadZone.addEventListener('drop', e => {
  e.preventDefault();
  uploadZone.classList.remove('dragover');
  handleFile(e.dataTransfer.files[0]);
});
uploadZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => handleFile(fileInput.files[0]));

// ─── Buttons ──────────────────────────────────────────────────────────────────
clearBtn.addEventListener('click', clearAll);

analyzeBtn.addEventListener('click', () => {
  if (!imageLoaded) return;
  startAnalysis();
});

// ─── Analysis Flow ────────────────────────────────────────────────────────────
async function startAnalysis() {
  analyzeBtn.disabled = true;
  analyzeBtn.innerHTML = '<span class="btn-spinner">⏳</span> Analysing…';
  scanBar.style.display = 'block';
  scanOverlay.style.display = 'block';
  resultsArea.style.display = 'none';
  emptyState.style.display = 'none';

  // Sample card selected (no real file) → use local knowledge base
  if (!uploadedFile && currentDiseaseKey) {
    const dbInfo = DISEASE_DB[currentDiseaseKey];
    setTimeout(() => {
      scanBar.style.display = 'none';
      scanOverlay.style.display = 'none';
      analyzeBtn.innerHTML = '🔬 Analyse';
      analyzeBtn.disabled = false;
      showResults({
        plant: dbInfo.plant,
        disease: dbInfo.disease,
        confidence: parseFloat(dbInfo.confidence()),
        class_name: currentDiseaseKey,
        is_healthy: dbInfo.isHealthy,
        demo: true,
      });
    }, 2200);
    return;
  }

  // Real uploaded image → call the backend API
  try {
    const formData = new FormData();
    formData.append('file', uploadedFile);

    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      body: formData,
    });

    scanBar.style.display = 'none';
    scanOverlay.style.display = 'none';

    if (!response.ok) {
      const errBody = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(errBody.detail || `Server error (${response.status})`);
    }

    const result = await response.json();
    analyzeBtn.innerHTML = '🔬 Analyse';
    analyzeBtn.disabled = false;
    showResults(result);
  } catch (err) {
    scanBar.style.display = 'none';
    scanOverlay.style.display = 'none';
    analyzeBtn.innerHTML = '🔬 Analyse';
    analyzeBtn.disabled = false;
    const msg = err.message === 'Failed to fetch'
      ? 'Could not connect to the backend server. Is it running?'
      : err.message;
    showError(msg);
  }
}

// ─── Show Results ─────────────────────────────────────────────────────────────
function showResults(result) {
  const conf = result.confidence;
  const isHealthy = result.is_healthy;

  // Look up care recommendations from the local knowledge base
  const dbKey = Object.keys(DISEASE_DB).find(k =>
    k.toLowerCase() === result.class_name.toLowerCase()
  );
  const dbInfo = dbKey ? DISEASE_DB[dbKey] : null;

  const careInfo = dbInfo ? dbInfo.care : {
    icon: isHealthy ? '✅' : '⚠️',
    title: isHealthy ? 'Your plant appears healthy!' : `Disease Detected: ${result.disease}`,
    text: isHealthy
      ? 'Continue with regular watering, adequate sunlight, and balanced fertilisation.'
      : `${result.disease} was detected on your ${result.plant} plant. Consult a local agricultural extension service for specific treatment recommendations.`,
  };

  const badgeClass  = isHealthy ? 'badge-healthy' : 'badge-diseased';
  const badgeText   = isHealthy ? '🌿 Healthy' : '⚠️ Disease Detected';
  const careIconBg  = isHealthy ? '#e8f5e9' : '#fff3e0';
  const careIconCol = isHealthy ? '#2e7d32' : '#f57c00';
  const demoTag     = result.demo
    ? '<span style="display:inline-block;background:#fff3e0;color:#f57c00;font-size:11px;padding:2px 8px;border-radius:50px;margin-left:8px;font-weight:600;">DEMO</span>'
    : '';

  resultsArea.innerHTML = `
    <div class="result-header">
      <div class="result-badge ${badgeClass}">${badgeText}</div>
      <h2 class="result-title">${result.plant}${demoTag}</h2>
      <p class="result-subtitle">${result.disease}</p>
    </div>

    <div class="confidence-container">
      <div class="confidence-label-row">
        <span>Model Confidence</span>
        <span id="conf-value">0%</span>
      </div>
      <div class="confidence-bar-bg">
        <div class="confidence-bar-fill" id="conf-bar" style="width:0%; background:${isHealthy ? 'var(--primary)' : '#f57c00'}"></div>
      </div>
    </div>

    <div class="care-card">
      <div class="care-icon" style="background:${careIconBg}; color:${careIconCol};">${careInfo.icon}</div>
      <div class="care-content">
        <h4>${careInfo.title}</h4>
        <p>${careInfo.text}</p>
      </div>
    </div>
  `;

  resultsArea.style.display = 'block';

  // Animate confidence bar
  setTimeout(() => {
    document.getElementById('conf-bar').style.width = conf + '%';
    animateCounter('conf-value', 0, conf, 900);
  }, 100);
}

function animateCounter(id, from, to, duration) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = performance.now();
  const step = ts => {
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = (from + (to - from) * eased).toFixed(1) + '%';
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ─── Error Display ────────────────────────────────────────────────────────────
function showError(message) {
  resultsArea.innerHTML = `
    <div class="result-header">
      <div class="result-badge badge-diseased">❌ Analysis Failed</div>
      <p class="result-subtitle" style="margin-top:12px;">${message}</p>
      <p style="font-size:13px; color:var(--text-muted); margin-top:8px;">
        Make sure the backend server is running at <code style="background:var(--primary-light);padding:2px 6px;border-radius:4px;">${API_BASE_URL}</code><br>
        Start it with: <code style="background:var(--primary-light);padding:2px 6px;border-radius:4px;">uvicorn main:app --reload --port 8000</code>
      </p>
    </div>
  `;
  resultsArea.style.display = 'block';
}

// ─── Tab Switching ────────────────────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ─── Plot Image Modal ─────────────────────────────────────────────────────────
document.querySelectorAll('.plot-image-container').forEach(container => {
  container.addEventListener('click', () => {
    const img = container.querySelector('img');
    modalImg.src = img.src;
    imageModal.style.display = 'flex';
  });
});

modalClose.addEventListener('click', () => { imageModal.style.display = 'none'; });
imageModal.addEventListener('click', e => { if (e.target === imageModal) imageModal.style.display = 'none'; });

// ─── Init ─────────────────────────────────────────────────────────────────────
buildSampleGrid();
