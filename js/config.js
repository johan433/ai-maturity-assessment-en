/* ============================================= */
/* AI Maturity Assessment — Configuration        */
/* ============================================= */

// Firebase Configuration (shared project, separate collections)
const firebaseConfig = {
  apiKey: "AIzaSyBaYbvx0SK3leIIEhNo2bBV93Z_DkLBako",
  authDomain: "assessments-3db08.firebaseapp.com",
  projectId: "assessments-3db08",
  storageBucket: "assessments-3db08.firebasestorage.app",
  messagingSenderId: "700341865638",
  appId: "1:700341865638:web:52e68d70e935a56b413867"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Collections (separate from German version to keep data distinct)
const SESSIONS_COLLECTION = 'maturity_sessions_en';
const RESPONSES_COLLECTION = 'maturity_responses_en';

// =====================
// Admin Auth
// =====================
const ADMIN_PASSWORD = 'Admin2024!';

function checkAdmin() {
  return sessionStorage.getItem('maturity_admin_en') === 'true';
}
function loginAdmin(password) {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem('maturity_admin_en', 'true');
    return true;
  }
  return false;
}
function logoutAdmin() {
  sessionStorage.removeItem('maturity_admin_en');
}

// =====================
// Shared Utilities
// =====================

function generateSessionCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function getUrlParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

function formatDate(timestamp) {
  if (!timestamp) return '';
  const d = timestamp.toDate ? timestamp.toDate() : new Date(timestamp.seconds * 1000);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// =====================
// Scoring
// =====================

/**
 * Calculate the maturity score from a response.
 * Score is derived from:
 * - Star ratings -> averaged (1-5)
 * - Ordinal single-selects -> normalized to 1-5 scale
 * Multi-selects are NOT scored numerically.
 */
function calculateMaturityScore(answers, path) {
  const questions = getQuestionsForPath(path);
  const scores = [];

  function processQuestion(q, ans) {
    if (!ans && ans !== 0) return;
    if (q.type === 'stars') {
      scores.push(Number(ans));
    } else if (q.type === 'single' && q.options && q.options.length > 0) {
      // Normalize ordinal single-selects to 1-5 scale
      const maxVal = Math.max(...q.options.map(o => Number(o.value)).filter(v => v > 0));
      if (maxVal > 0 && Number(ans) > 0) {
        scores.push((Number(ans) / maxVal) * 5);
      }
    }
  }

  questions.forEach(q => {
    if (q.type === 'compound' && q.subQuestions) {
      q.subQuestions.forEach(sq => {
        processQuestion(sq, answers[sq.id]);
      });
    } else {
      processQuestion(q, answers[q.id]);
    }
  });

  if (scores.length === 0) return 0;
  return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
}

/**
 * Get individual dimension scores for radar chart.
 * Returns array of { label, score } for star-rating and ordinal questions.
 */
function getDimensionScores(answers, path) {
  const questions = getQuestionsForPath(path);
  const dimensions = [];

  function addDimension(q, ans) {
    if (!ans && ans !== 0) return;
    if (q.type === 'stars') {
      dimensions.push({ id: q.id, label: q.section || q.text.substring(0, 30), score: Number(ans), max: 5 });
    } else if (q.type === 'single' && q.options && q.options.length > 0) {
      const maxVal = Math.max(...q.options.map(o => Number(o.value)).filter(v => v > 0));
      if (maxVal > 0 && Number(ans) > 0) {
        dimensions.push({ id: q.id, label: q.section || q.text.substring(0, 30), score: Number(ans), max: maxVal });
      }
    }
  }

  questions.forEach(q => {
    if (q.type === 'compound' && q.subQuestions) {
      q.subQuestions.forEach(sq => addDimension(sq, answers[sq.id]));
    } else {
      addDimension(q, answers[q.id]);
    }
  });

  return dimensions;
}

// =====================
// Session Management
// =====================

async function createSession(name, organisation) {
  let code = generateSessionCode();
  // Ensure unique
  let existing = await db.collection(SESSIONS_COLLECTION).doc(code).get();
  while (existing.exists) {
    code = generateSessionCode();
    existing = await db.collection(SESSIONS_COLLECTION).doc(code).get();
  }
  await db.collection(SESSIONS_COLLECTION).doc(code).set({
    code,
    name,
    organisation,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  return code;
}

async function getSession(code) {
  const doc = await db.collection(SESSIONS_COLLECTION).doc(code.toUpperCase()).get();
  return doc.exists ? doc.data() : null;
}

async function submitResponse(sessionCode, respondentName, email, path, answers) {
  const score = calculateMaturityScore(answers, path);
  const docRef = await db.collection(RESPONSES_COLLECTION).add({
    sessionCode: sessionCode.toUpperCase(),
    respondentName,
    email: email || '',
    path,
    pathLabel: getPathLabel(path),
    answers,
    maturityScore: parseFloat(score),
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  return docRef.id;
}

async function getResponses(sessionCode) {
  const snapshot = await db.collection(RESPONSES_COLLECTION)
    .where('sessionCode', '==', sessionCode.toUpperCase())
    .orderBy('createdAt', 'asc')
    .get();
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function getAllSessions() {
  const snapshot = await db.collection(SESSIONS_COLLECTION)
    .orderBy('createdAt', 'desc')
    .get();
  return snapshot.docs.map(d => d.data());
}

async function deleteSession(code) {
  if (!confirm(`Delete session ${code} and ALL associated responses?\n\nThis cannot be undone.`)) return;
  try {
    const snapshot = await db.collection(RESPONSES_COLLECTION)
      .where('sessionCode', '==', code).get();
    const batch = db.batch();
    snapshot.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    await db.collection(SESSIONS_COLLECTION).doc(code).delete();
    alert(`Session ${code} has been successfully deleted.`);
    if (typeof loadDashboard === 'function') loadDashboard();
  } catch (err) {
    alert('Error deleting: ' + err.message);
    console.error(err);
  }
}

async function clearSessionResponses(code) {
  if (!confirm(`Delete all responses for session ${code}?\n\nThe session will be kept but all participant data will be removed.`)) return;
  try {
    const snapshot = await db.collection(RESPONSES_COLLECTION)
      .where('sessionCode', '==', code).get();
    if (snapshot.empty) { alert('No responses available.'); return; }
    const batch = db.batch();
    snapshot.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
    alert(`${snapshot.size} response(s) from session ${code} deleted.`);
    if (typeof loadDashboard === 'function') loadDashboard();
  } catch (err) {
    alert('Error deleting responses: ' + err.message);
    console.error(err);
  }
}

// =====================
// CSV Export
// =====================

function csvEscape(v) {
  const s = String(v == null ? '' : v);
  return (s.includes(',') || s.includes('"') || s.includes('\n')) ? `"${s.replace(/"/g, '""')}"` : s;
}

function exportMaturityCSV(sessionName, responses) {
  if (!responses.length) { alert('No data to export.'); return; }

  // Collect ALL unique question IDs across responses
  const allQuestionIds = new Set();
  responses.forEach(r => {
    if (r.answers) Object.keys(r.answers).forEach(k => allQuestionIds.add(k));
  });
  const questionIds = Array.from(allQuestionIds).sort();

  // Build question label map
  const labelMap = {};
  [NOVICE_QUESTIONS, INTERMEDIATE_QUESTIONS, EXPERT_QUESTIONS].forEach(qs => {
    qs.forEach(q => {
      if (q.type === 'compound' && q.subQuestions) {
        q.subQuestions.forEach(sq => { labelMap[sq.id] = sq.text.substring(0, 40); });
      } else {
        labelMap[q.id] = (q.section || q.text).substring(0, 40);
      }
    });
  });

  const headers = ['Name', 'Email', 'Maturity Level', ...questionIds.map(id => labelMap[id] || id), 'Overall Score', 'Date'];

  const rows = responses.map(r => {
    const answerValues = questionIds.map(id => {
      const val = r.answers ? r.answers[id] : '';
      if (Array.isArray(val)) return val.join(' | ');
      return val;
    });
    return [
      r.respondentName,
      r.email || '',
      r.pathLabel || getPathLabel(r.path),
      ...answerValues,
      r.maturityScore || '',
      r.createdAt ? new Date(r.createdAt.seconds * 1000).toLocaleDateString('en-GB') : ''
    ];
  });

  const csv = [headers, ...rows].map(row => row.map(csvEscape).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `AI-Maturity_${sessionName.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
