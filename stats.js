// Talks to the Google Sheet and turns raw answers into percentages.
// Used by both index.html and results.html.

function apiReady() { return !!(window.GENZ_CONFIG && GENZ_CONFIG.API_URL); }

// Send one person's answers. No custom headers on purpose: that keeps it a
// "simple" request, so the browser doesn't block it (CORS).
function sendAnswers(payload) {
  if (!apiReady()) return Promise.resolve(false);
  return fetch(GENZ_CONFIG.API_URL, { method: "POST", body: JSON.stringify(payload) })
    .then(() => true).catch(() => false);
}

// Get every answer collected so far: [{ mindAge, answers: [..] }, ...]
function loadRows() {
  if (!apiReady()) return Promise.resolve(null);
  return fetch(GENZ_CONFIG.API_URL + "?t=" + Date.now())
    .then(r => r.json()).then(d => d.rows || []).catch(() => null);
}

// Turn rows into counts + headline percentages.
function summarize(rows) {
  const qIndex = id => QUESTIONS.findIndex(q => q.id === id);
  const counts = QUESTIONS.map(q => q.options.map(() => 0));
  let ageSum = 0;
  rows.forEach(r => {
    (r.answers || []).forEach((a, i) => { if (counts[i] && counts[i][a] != null) counts[i][a]++; });
    ageSum += Number(r.mindAge) || 0;
  });
  const n = rows.length;
  const pct = (id, picks) => {
    const c = counts[qIndex(id)];
    const total = c.reduce((s, x) => s + x, 0);
    return total ? Math.round(picks.reduce((s, p) => s + c[p], 0) / total * 100) : 0;
  };
  return {
    n,
    counts,
    avgAge: n ? Math.round(ageSum / n) : 0,
    overthink: pct("overthink", [0, 1]),   // "Constantly" + "A lot"
    joke: pct("joke", [0, 1]),             // "Always" + "Often"
    heard: pct("heard", [0]),              // "Yes, most of the time"
    notStubborn: pct("stubborn", [1, 2])   // "want to be heard" + "nobody listens"
  };
}

// Fake answers so you can rehearse with results.html?demo=1
function demoRows(n = 24) {
  const pick = w => { let r = Math.random() * w.reduce((a, b) => a + b), i = 0; while ((r -= w[i]) > 0) i++; return i; };
  const weights = {
    gen: [1, 2, 6, 14, 1], fine: [2, 8, 9, 3], hurt: [10, 4, 3, 4], joke: [7, 10, 5, 2],
    send: [3, 7, 9, 4], call: [2, 9, 8, 5], overthink: [9, 9, 5, 1], stubborn: [2, 11, 8, 3],
    heard: [3, 10, 8, 3], care: [10, 5, 2, 7], friday: [1, 7, 6, 10], misunderstood: [8, 9, 4, 3]
  };
  return Array.from({ length: n }, () => {
    const answers = QUESTIONS.map(q => pick(weights[q.id]));
    return { answers, mindAge: computeMindAge(answers) };
  });
}
