'use strict';
//Constants
const EXAM_DATE = new Date("2026-11-29");
const QA_TOPICS = ["Number Systems", "LCM & HCF", "Percentages", "Profit & Loss", "Simple & Compound Interest", "Ratio & Proportion", "Time & Work", "Time, Speed & Distance", "Averages & Mixtures", "Linear Equations", "Quadratic Equations", "Inequalities", "Logarithms", "Progressions (AP/GP)", "Functions & Graphs", "Lines & Angles", "Triangles", "Circles", "Polygons & Quadrilaterals", "Mensuration", "Coordinate Geometry", "Permutation & Combination", "Probability", "Sets & Venn Diagrams", "Surds & Indices"];
const DILR_TOPICS = ["Tables", "Bar Charts", "Line Graphs", "Pie Charts", "Caselets", "Network & Routes", "Linear Arrangements", "Circular Arrangements", "Matrix Puzzles", "Blood Relations", "Venn Diagrams (LR)", "Games & Tournaments", "Logical Sequences", "Clocks & Calendars"];
const VARC_TOPICS = ["RC Fact-based passages", "RC Inference passages", "RC Abstract passages", "RC Social Science passages", "RC Science/Tech passages", "Parajumbles", "Para Summary", "Odd Sentence Out", "Critical Reasoning"];
const PHASES = [
  { name: "Foundation", start: "2026-05-19", end: "2026-07-31", color: "#F472B6" },
  { name: "Intensive", start: "2026-08-01", end: "2026-09-30", color: "#10B981" },
  { name: "Mock Sprint", start: "2026-10-01", end: "2026-11-21", color: "#FB923C" },
  { name: "Final Week", start: "2026-11-22", end: "2026-11-28", color: "#F43F5E" },
];
const ERROR_TYPES = ["Concept gap", "Silly error", "Time pressure", "Misread question", "Calculation error"];
const TYPE_COLORS = { "Concept gap": "#F43F5E", "Silly error": "#FB923C", "Time pressure": "#F472B6", "Misread question": "#10B981", "Calculation error": "#c4a0b0" };
const SEC_COLORS = { QA: ["#BE185D", "#fdf2f8"], VARC: ["#c2410c", "#fff7ed"], DILR: ["#065f46", "#ecfdf5"] };

const QUOTES = [
  "Every hour you study today is a percentile you gain tomorrow.",
  "The IIM gates open for those who show up, every single day.",
  "Comparison is the thief of focus. Just beat yesterday's you.",
  "Hard days build the student who gets 99%ile.",
  "Your consistency right now is your competitive advantage.",
  "One topic a day keeps the concept gap away.",
  "Mistakes in mock tests are free lessons. Use them.",
  "CAT is a marathon. Pace yourself, but never stop.",
  "The score you want is on the other side of today's discomfort.",
  "Small daily improvements lead to stunning long-term results.",
  "99 problems, but a percentile ain't one stay focused.",
  "Review every wrong answer. That's where the real prep happens.",
  "Your target college is waiting. Don't make it wait too long.",
  "Discipline on the easy days creates champions on exam day.",
  "One more mock, one more lesson. Keep going.",
  "The syllabus is finite. Your potential isn't.",
  "Sleep well, study smart, attempt boldly.",
  "Your error log is your most valuable study tool.",
  "Revision is not repetition, it's consolidation.",
  "The best time to start was yesterday. The next best time is now.",
];

const BOOKS = {
  qa_sharma: { label: "Quantitative Aptitude for CAT", author: "Arun Sharma", chapters: ["Number Systems", "LCM & HCF", "Percentages", "Profit & Loss", "Simple & Compound Interest", "Ratio & Proportion", "Time & Work", "Time Speed Distance", "Averages & Mixtures", "Algebra", "Geometry", "Mensuration", "Permutation & Combination", "Probability"] },
  di_sharma: { label: "Data Interpretation for CAT", author: "Arun Sharma", chapters: ["Tables", "Bar Charts", "Line Graphs", "Pie Charts", "Caselets", "Mixed DI", "Logical DI (LOD 1)", "Logical DI (LOD 2)", "Logical DI (LOD 3)"] },
  lr_sharma: { label: "Logical Reasoning for CAT", author: "Arun Sharma", chapters: ["Linear Arrangements", "Circular Arrangements", "Matrix Puzzles", "Blood Relations", "Games & Tournaments", "Networks & Routes", "Logical Sequences", "Clocks & Calendars"] },
  varc_sharma: { label: "Verbal Ability & RC for CAT", author: "Arun Sharma", chapters: ["RC Fundamentals", "Fact-based RC", "Inference RC", "Abstract RC", "Parajumbles", "Para Summary", "Odd Sentence Out", "Critical Reasoning", "The CAT Experience"] },
  oswaal: { label: "Oswaal CAT 25 Years PYQ", author: "Oswaal Editorial", chapters: ["QA 1992-2008", "QA 2017-2024", "DILR 2017-2024", "VARC 2017-2024", "Full Papers 2021", "Full Papers 2022", "Full Papers 2023", "Full Papers 2024"] },
};

const COLLEGES = [
  { name: "IIM Ahmedabad", cutoff: 99, tag: "A" },
  { name: "IIM Bangalore", cutoff: 99, tag: "B" },
  { name: "IIM Calcutta", cutoff: 98, tag: "C" },
  { name: "IIM Lucknow", cutoff: 97, tag: "L" },
  { name: "IIM Kozhikode", cutoff: 95, tag: "K" },
  { name: "IIM Indore", cutoff: 95, tag: "I" },
  { name: "MDI Gurgaon", cutoff: 95, tag: "MDI" },
  { name: "IIM Shillong", cutoff: 92, tag: "" },
  { name: "NITIE Mumbai", cutoff: 93, tag: "" },
  { name: "NMIMS Mumbai", cutoff: 90, tag: "" },
  { name: "IIM Rohtak / Raipur", cutoff: 90, tag: "" },
  { name: "TAPMI / XIMB", cutoff: 85, tag: "" },
  { name: "FORE / LBSIM", cutoff: 80, tag: "" },
];

// percentile -> approx total score (out of ~198)
const SCORE_MAP = [[99.5, 115], [99, 105], [98, 95], [97, 88], [95, 78], [90, 65], [85, 56], [80, 48], [75, 42], [70, 36], [60, 26]];

const STATUSES = [
  { id: '', label: 'Not Started', color: '#9d8aab', bg: '#f3f0f5', border: '#d5cade' },
  { id: 'inprogress', label: 'In Progress', color: '#3B82F6', bg: '#EFF6FF', border: '#BFDBFE' },
  { id: 'revision', label: 'Needs Revision', color: '#FB923C', bg: '#FFF7ED', border: '#FED7AA' },
  { id: 'understood', label: 'Understood', color: '#4ADE80', bg: '#F0FDF4', border: '#BBF7D0' },
  { id: 'strong', label: 'Strong', color: '#10B981', bg: '#ECFDF5', border: '#A7F3D0' },
  { id: 'mastered', label: 'Mastered ?', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
];

const CHECKLIST_ITEMS = ["Reviewed all wrong answers", "Categorised errors in Error Log", "Noted time management issues", "Updated attempt strategy", "Identified weak topics to revisit"];

//State
const S = {
  logs: [], mocks: [], topicStatus: {}, topicFlags: {}, errors: [],
  weeklyGoal: 25, mockChecklists: {}, bookProgress: {},
  notes: [], strategy: { qa: { order: "", time: "" }, varc: { order: "", time: "" }, dilr: { order: "", time: "" } },
  activeTab: "dashboard", activeTopicSection: "QA", activeBookTab: "qa_sharma",
  quoteDismissed: false,
  revFilters: { statuses: [], revisit: false, highWeight: false }, revAllRevisit: false,
};

//Storage
function ls(k) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null } catch { return null } }
function ss(k, v) { try { localStorage.setItem(k, JSON.stringify(v)) } catch { } }
function persist() { ss("cat:logs", S.logs); ss("cat:mocks", S.mocks); ss("cat:topic_status", S.topicStatus); ss("cat:topic_flags", S.topicFlags); ss("cat:errors", S.errors); ss("cat:weeklyGoal", S.weeklyGoal); ss("cat:mockChecklists", S.mockChecklists); ss("cat:books", S.bookProgress); ss("cat:notes", S.notes); ss("cat:strategy", S.strategy); }

//Helpers
const $ = id => document.getElementById(id);
const daysLeft = () => Math.ceil((EXAM_DATE - new Date()) / 864e5);
const today = () => new Date().toISOString().split("T")[0];
const fmtDate = d => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
const currentPhase = () => PHASES.find(p => new Date() >= new Date(p.start) && new Date() <= new Date(p.end)) || PHASES[0];
const badge = (t, fg, bg) => `<span class="badge" style="color:${fg};background:${bg}">${t}</span>`;
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function ringsSVG(value, max, size, color, label, sub) {
  const r = (size - 10) / 2, circ = 2 * Math.PI * r, dash = circ * Math.min(value / max, 1);
  return `<div class="ring-item"><svg width="${size}" height="${size}">
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="#fde8f4" stroke-width="8"/>
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="8"
      stroke-dasharray="${dash} ${circ - dash}" stroke-dashoffset="${circ / 4}" stroke-linecap="round" style="transition:stroke-dasharray .5s"/>
    <text x="${size / 2}" y="${size / 2 + 5}" text-anchor="middle" font-size="13" font-weight="600" fill="#1a0a12">${label}</text>
  </svg>${sub ? `<div class="ring-label">${sub}</div>` : ""}</div>`;
}

function flashBtn(id, defaultText, cls) {
  const b = $(id); b.textContent = "âœ“ Saved!"; b.classList.add("saved");
  setTimeout(() => { b.textContent = defaultText; b.classList.remove("saved"); }, 2000);
}

//Init
document.addEventListener("DOMContentLoaded", () => {
  S.logs = ls("cat:logs") || []; S.mocks = ls("cat:mocks") || [];
  const oldTopics = ls("cat:topics") || {};
  S.topicStatus = ls("cat:topic_status") || {};
  S.topicFlags = ls("cat:topic_flags") || {};
  // Migrate old 3-state topics if new storage is empty
  if (!Object.keys(S.topicStatus).length && Object.keys(oldTopics).length) {
    Object.entries(oldTopics).forEach(([k, v]) => { S.topicStatus[k] = v || ""; });
  }
  S.errors = ls("cat:errors") || []; S.weeklyGoal = ls("cat:weeklyGoal") || 25;
  S.mockChecklists = ls("cat:mockChecklists") || {}; S.bookProgress = ls("cat:books") || ls("cat:bookProgress") || {};
  S.notes = ls("cat:notes") || []; S.strategy = ls("cat:strategy") || { qa: { order: "", time: "" }, varc: { order: "", time: "" }, dilr: { order: "", time: "" } };

  $("log-date").value = today(); $("mock-date").value = today(); $("error-date").value = today(); $("note-date").value = today();
  $("weekly-goal-input").value = S.weeklyGoal;

  $("loading-screen").style.display = "none"; $("main-layout").style.display = "flex";

  setupSidebar(); setupListeners(); renderAll();
});

// Sidebar 
function setupSidebar() {
  const ph = currentPhase(), days = daysLeft();
  $("phase-name").textContent = ph.name; $("phase-name").style.color = ph.color;
  $("phase-bar-fill").style.background = ph.color;
  const elapsed = (new Date() - new Date(ph.start)) / (new Date(ph.end) - new Date(ph.start));
  $("phase-bar-fill").style.width = Math.min(100, elapsed * 100) + "%";
  $("days-left-number").textContent = days;
  if (days < 30) $("days-left-number").classList.add("urgent");

  document.querySelectorAll(".nav-btn").forEach(btn => {
    if (btn.dataset.tab === S.activeTab) { btn.classList.add("active"); btn.style.borderLeftColor = ph.color; }
    btn.addEventListener("click", () => {
      S.activeTab = btn.dataset.tab;
      document.querySelectorAll(".nav-btn").forEach(b => { b.classList.remove("active"); b.style.borderLeftColor = "transparent"; });
      btn.classList.add("active"); btn.style.borderLeftColor = ph.color;
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      $("panel-" + S.activeTab).classList.add("active");
      renderAll();
    });
  });
}

// Listeners
function setupListeners() {
  $("btn-add-log").addEventListener("click", addLog);
  $("btn-add-mock").addEventListener("click", addMock);
  $("btn-add-error").addEventListener("click", addError);
  $("btn-add-note").addEventListener("click", addNote);
  $("btn-calc").addEventListener("click", calcScore);
  $("btn-save-strategy").addEventListener("click", saveStrategy);
  $("weekly-goal-input").addEventListener("change", e => { S.weeklyGoal = parseInt(e.target.value) || 25; ss("cat:weeklyGoal", S.weeklyGoal); renderDashboard(); });
  $("notes-search-input").addEventListener("input", renderNotes);
}

// Render All  
function renderAll() { renderDashboard(); renderStudyLog(); renderMocks(); renderRevScheduler(); renderErrors(); renderBooks(); renderNotes(); renderGoals(); }

// Dashboard 
function renderDashboard() {
  // Quote
  if (!S.quoteDismissed) {
    const q = QUOTES[new Date().getDate() % QUOTES.length];
    $("quote-banner-wrap").innerHTML = `<div class="quote-banner"><span class="quote-text">"${q}"</span><button class="quote-dismiss" onclick="dismissQuote()">×</button></div>`;
  } else { $("quote-banner-wrap").innerHTML = ""; }

  // Greeting
  const h = new Date().getHours();
  $("greeting-text").textContent = (h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening") + "🤍";
  $("greeting-date").textContent = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  // Weekly goal
  const wkLogs = S.logs.filter(l => (new Date() - new Date(l.date)) / 864e5 <= 7);
  const wkHrs = wkLogs.reduce((a, l) => a + (l.qa + l.varc + l.dilr) / 60, 0);
  const goalPct = Math.min(100, Math.round(wkHrs / S.weeklyGoal * 100));
  $("goal-bar-fill").style.width = goalPct + "%";
  $("goal-pct").textContent = goalPct + "%";
  $("goal-sub").textContent = `${wkHrs.toFixed(1)} / ${S.weeklyGoal} hrs this week`;

  // Stats
  const streak = calcStreak();
  const totalH = S.logs.reduce((a, l) => a + (l.qa + l.varc + l.dilr) / 60, 0);
  const avgPct = S.mocks.length ? Math.round(S.mocks.reduce((a, m) => a + (m.percentile || 0), 0) / S.mocks.length) : null;
  $("dashboard-stats-row").innerHTML = [
    { label: "Study streak", value: `${streak}d`, sub: "consecutive days", color: "#F472B6" },
    { label: "Total hours", value: `${totalH.toFixed(1)}h`, sub: "since May 19", color: "#10B981" },
    { label: "This week", value: `${wkHrs.toFixed(1)}h`, sub: `${wkLogs.length} sessions`, color: "#FB923C" },
    { label: "Mocks taken", value: S.mocks.length, sub: avgPct ? `avg ${avgPct}%ile` : "none yet", color: "#F472B6" },
  ].map(s => `<div class="stat-card"><div class="stat-label">${s.label}</div><div class="stat-value" style="color:${s.color}">${s.value}</div><div class="stat-sub">${s.sub}</div></div>`).join("");

  // Phase countdown
  const now = new Date();
  $("phase-countdown-grid").innerHTML = PHASES.map(p => {
    const s = new Date(p.start), e = new Date(p.end);
    const isPast = now > e, isActive = now >= s && now <= e, isFuture = now < s;
    const daysN = isPast ? 0 : isActive ? Math.ceil((e - now) / 864e5) : Math.ceil((s - now) / 864e5);
    const pct = Math.min(100, Math.max(0, ((now - s) / (e - s)) * 100));
    const sub = isPast ? "Completed" : isActive ? `${daysN}d remaining` : `Starts in ${daysN}d`;
    return `<div class="phase-cd-card${isActive ? " active-phase" : ""}">
      ${isActive ? `<div class="phase-active-badge">NOW</div>` : ""}
      <div class="phase-cd-name" style="color:${p.color}">${p.name}</div>
      <div class="phase-cd-days" style="color:${isPast ? "#c4a0b0" : p.color}">${isPast ? "âœ“" : daysN}</div>
      <div class="phase-cd-sub">${sub}</div>
      <div class="phase-cd-bar"><div class="phase-cd-fill" style="width:${pct}%;background:${p.color}"></div></div>
    </div>`;
  }).join("");

  // Topic rings
  const qaS = QA_TOPICS.filter(t => ["strong", "mastered"].includes(S.topicStatus[`qa_${t}`] || "")).length;
  const dilrS = DILR_TOPICS.filter(t => ["strong", "mastered"].includes(S.topicStatus[`dilr_${t}`] || "")).length;
  const varcS = VARC_TOPICS.filter(t => ["strong", "mastered"].includes(S.topicStatus[`varc_${t}`] || "")).length;
  $("topic-rings").innerHTML =
    ringsSVG(qaS, QA_TOPICS.length, 80, "#F472B6", `${qaS}/${QA_TOPICS.length}`, "QA strong") +
    ringsSVG(dilrS, DILR_TOPICS.length, 80, "#10B981", `${dilrS}/${DILR_TOPICS.length}`, "DILR strong") +
    ringsSVG(varcS, VARC_TOPICS.length, 80, "#FB923C", `${varcS}/${VARC_TOPICS.length}`, "VARC strong");

  // Time split
  const qaM = S.logs.reduce((a, l) => a + l.qa, 0), vM = S.logs.reduce((a, l) => a + l.varc, 0), dM = S.logs.reduce((a, l) => a + l.dilr, 0);
  const tot = qaM + vM + dM || 1;
  $("time-split-bars").innerHTML = [{ l: "QA", m: qaM, c: "#F472B6" }, { l: "VARC", m: vM, c: "#FB923C" }, { l: "DILR", m: dM, c: "#10B981" }].map(s => `
    <div class="time-bar-group"><div class="time-bar-header"><span class="label" style="color:${s.c}">${s.l}</span><span class="value">${(s.m / 60).toFixed(1)}h</span></div>
    <div class="time-bar-track"><div class="time-bar-fill" style="background:${s.c};width:${(s.m / tot) * 100}%"></div></div></div>`).join("");

  // Last mock
  const last = S.mocks.length ? S.mocks[S.mocks.length - 1] : null;
  $("last-mock-content").innerHTML = last ? `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <div><div style="font-weight:600;font-size:15px">${esc(last.name)}</div><div style="font-size:12px;color:var(--text-2)">${fmtDate(last.date)}</div></div>
      <div style="text-align:right"><div style="font-size:22px;font-weight:700;color:var(--pink)">${last.total}</div><div style="font-size:11px;color:var(--text-2)">total score</div></div>
    </div>
    <div class="mock-scores-grid">
      ${[["QA", last.qa, "#F472B6"], ["VARC", last.varc, "#FB923C"], ["DILR", last.dilr, "#10B981"]].map(([s, v, c]) => `<div class="mock-score-box"><div class="label">${s}</div><div class="value" style="color:${c}">${v ?? '—'}</div></div>`).join("")}
    </div>${last.percentile ? `<div class="percentile-banner">${last.percentile}th percentile</div>` : ""}` :
    `<div class="empty-state">No mocks yet — go take one!</div>`;

  // Recent logs
  $("recent-logs-content").innerHTML = S.logs.length ? S.logs.slice(-5).reverse().map(l => `
    <div class="recent-log-row">
      <div><div class="recent-log-date">${fmtDate(l.date)}</div>
      <div class="recent-log-breakdown"><span style="color:#F472B6">QA ${l.qa}m</span> Â· <span style="color:#FB923C">VARC ${l.varc}m</span> Â· <span style="color:#10B981">DILR ${l.dilr}m</span></div></div>
      <div class="recent-log-total">${((l.qa + l.varc + l.dilr) / 60).toFixed(1)}h</div>
    </div>`).join("") :
    `<div class="empty-state">No sessions yet — start today!</div>`;

  // College mapper
  const ap = avgPct || 0;
  $("college-mapper").innerHTML = `<table class="college-table">
    <thead><tr><th>College</th><th>~Cutoff %ile</th><th>Status</th></tr></thead>
    <tbody>${COLLEGES.map(c => {
    const reach = ap >= c.cutoff, border = ap >= c.cutoff - 5 && ap < c.cutoff;
    const color = reach ? "#10B981" : border ? "#FB923C" : "#F43F5E";
    const label = reach ? "Reachable" : border ? "Borderline" : "Stretch";
    return `<tr><td style="font-weight:500"><span class="college-dot" style="background:${color}"></span>${c.name}</td>
        <td style="color:var(--text-2)">${c.cutoff}+</td>
        <td><span style="font-size:11px;font-weight:700;color:${color}">${label}</span></td></tr>`;
  }).join("")}</tbody></table>
    ${!avgPct ? `<div style="font-size:11px;color:var(--text-3);margin-top:8px;text-align:center">Log mock percentiles to see your college map</div>` : ""}`;
}

function dismissQuote() { S.quoteDismissed = true; $("quote-banner-wrap").innerHTML = ""; }

function calcStreak() {
  if (!S.logs.length) return 0;
  const dates = [...new Set(S.logs.map(l => l.date))].sort().reverse();
  let s = 0, cur = new Date();
  for (const d of dates) { const ld = new Date(d); if (Math.round((cur - ld) / 864e5) <= 1) { s++; cur = ld; } else break; }
  return s;
}

// -- Study Log ----------------------------------------------------------------
function addLog() {
  const qa = parseInt($("log-qa").value) || 0, varc = parseInt($("log-varc").value) || 0, dilr = parseInt($("log-dilr").value) || 0;
  if (!qa && !varc && !dilr) return;
  S.logs.push({ date: $("log-date").value, qa, varc, dilr, notes: $("log-notes").value });
  persist(); $("log-qa").value = ""; $("log-varc").value = ""; $("log-dilr").value = ""; $("log-notes").value = "";
  flashBtn("btn-add-log", "+ Log session"); renderAll();
}
function removeLog(i) { S.logs.splice(i, 1); persist(); renderAll(); }
function renderStudyLog() {
  $("log-count-header").textContent = `All sessions (${S.logs.length})`;
  if (!S.logs.length) { $("study-log-list").innerHTML = `<div class="empty-state">No sessions yet — log your first one above!</div>`; return; }
  const hdr = `<div class="log-table-header"><span>Date</span><span style="color:#F472B6">QA</span><span style="color:#FB923C">VARC</span><span style="color:#10B981">DILR</span><span>Total</span><span>Notes</span><span></span></div>`;
  const rows = [...S.logs].reverse().map((l, i) => {
    const ri = S.logs.length - 1 - i;
    return `<div class="log-table-row"><span style="color:var(--text-2)">${fmtDate(l.date)}</span><span style="font-weight:600;color:#F472B6">${l.qa}m</span><span style="font-weight:600;color:#FB923C">${l.varc}m</span><span style="font-weight:600;color:#10B981">${l.dilr}m</span><span style="font-weight:700">${((l.qa + l.varc + l.dilr) / 60).toFixed(1)}h</span><span class="log-notes-cell">${esc(l.notes || '—')}</span><button class="btn-delete" onclick="removeLog(${ri})">×</button></div>`;
  }).join("");
  $("study-log-list").innerHTML = hdr + rows;
}

// -- Mocks --------------------------------------------------------------------
function addMock() {
  if (!$("mock-name").value) return;
  S.mocks.push({ date: $("mock-date").value, name: $("mock-name").value, qa: parseInt($("mock-qa").value) || 0, varc: parseInt($("mock-varc").value) || 0, dilr: parseInt($("mock-dilr").value) || 0, total: parseInt($("mock-total").value) || 0, percentile: parseInt($("mock-percentile").value) || null, notes: $("mock-notes").value });
  persist();["mock-name", "mock-qa", "mock-varc", "mock-dilr", "mock-total", "mock-percentile", "mock-notes"].forEach(id => $(id).value = "");
  flashBtn("btn-add-mock", "+ Log mock"); renderAll();
}
function removeMock(i) { S.mocks.splice(i, 1); persist(); renderAll(); }
function toggleChecklistItem(mockIdx, itemIdx) {
  if (!S.mockChecklists[mockIdx]) S.mockChecklists[mockIdx] = {};
  S.mockChecklists[mockIdx][itemIdx] = !S.mockChecklists[mockIdx][itemIdx];
  persist(); renderMocks();
}
function renderMocks() {
  if (S.mocks.length >= 2) {
    const avg = Math.round(S.mocks.reduce((a, m) => a + (m.percentile || 0), 0) / S.mocks.length);
    const trend = S.mocks[S.mocks.length - 1].percentile - S.mocks[S.mocks.length - 2].percentile;
    const tc = trend > 0 ? "#10B981" : trend < 0 ? "#F43F5E" : "#F472B6";
    $("mock-stats-row").style.display = "grid";
    $("mock-stats-row").innerHTML = `<div class="stat-card"><div class="stat-label">Mocks taken</div><div class="stat-value" style="color:#F472B6">${S.mocks.length}</div></div><div class="stat-card"><div class="stat-label">Avg percentile</div><div class="stat-value" style="color:#10B981">${avg}</div></div><div class="stat-card"><div class="stat-label">Last vs prev</div><div class="stat-value" style="color:${tc}">${trend > 0 ? "+" : ""}${trend}%ile</div></div>`;
  } else $("mock-stats-row").style.display = "none";

  // Chart
  const hasPct = S.mocks.filter(m => m.percentile).length >= 2;
  $("mock-chart-card").style.display = hasPct ? "block" : "none";
  if (hasPct) requestAnimationFrame(() => drawChart());

  if (!S.mocks.length) { $("mock-history-list").innerHTML = `<div class="empty-state">No mocks logged yet.</div>`; return; }
  $("mock-history-list").innerHTML = [...S.mocks].reverse().map((m, i) => {
    const ri = S.mocks.length - 1 - i;
    const cl = S.mockChecklists[ri] || {};
    const doneCnt = CHECKLIST_ITEMS.filter((_, j) => cl[j]).length;
    return `<div class="mock-item"><div>
      <div class="mock-item-header"><span class="mock-item-name">${esc(m.name)}</span><span class="mock-item-date">${fmtDate(m.date)}</span>${m.percentile ? badge(m.percentile + "%ile", "#BE185D", "#fdf2f8") : ""}</div>
      <div class="mock-item-scores"><span style="color:#F472B6;font-weight:600">QA: ${m.qa}</span><span style="color:#FB923C;font-weight:600">VARC: ${m.varc}</span><span style="color:#10B981;font-weight:600">DILR: ${m.dilr}</span><span style="font-weight:700">Total: ${m.total}</span></div>
      ${m.notes ? `<div class="mock-item-notes">${esc(m.notes)}</div>` : ""}
      <div class="mock-checklist">
        <div class="mock-checklist-title">Post-mock checklist (${doneCnt}/${CHECKLIST_ITEMS.length} done)</div>
        ${CHECKLIST_ITEMS.map((item, j) => `<label class="checklist-item${cl[j] ? " done" : ""}"><input type="checkbox" ${cl[j] ? "checked" : ""} onchange="toggleChecklistItem(${ri},${j})"> ${item}</label>`).join("")}
      </div>
    </div><button class="btn-delete" onclick="removeMock(${ri})">×</button></div>`;
  }).join("");
}

function drawChart() {
  const canvas = $("percentile-chart"); if (!canvas) return;
  const data = S.mocks.filter(m => m.percentile);
  if (data.length < 2) return;
  const w = canvas.offsetWidth || 600, h = 180;
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d");
  const pad = { t: 20, r: 20, b: 30, l: 40 };
  const minP = Math.max(0, Math.min(...data.map(m => m.percentile)) - 10);
  const maxP = Math.min(100, Math.max(...data.map(m => m.percentile)) + 5);
  const xScale = i => (pad.l + (w - pad.l - pad.r) * (i / (data.length - 1)));
  const yScale = v => (h - pad.b - (v - minP) / (maxP - minP) * (h - pad.t - pad.b));
  ctx.clearRect(0, 0, w, h);
  // Grid
  ctx.strokeStyle = "#fce7f3"; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) { const y = pad.t + (h - pad.t - pad.b) * i / 4; ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke(); }
  // Gradient fill
  const grad = ctx.createLinearGradient(0, pad.t, 0, h - pad.b);
  grad.addColorStop(0, "rgba(244,114,182,0.25)"); grad.addColorStop(1, "rgba(244,114,182,0)");
  ctx.beginPath(); ctx.moveTo(xScale(0), yScale(data[0].percentile));
  data.forEach((m, i) => ctx.lineTo(xScale(i), yScale(m.percentile)));
  ctx.lineTo(xScale(data.length - 1), h - pad.b); ctx.lineTo(xScale(0), h - pad.b);
  ctx.closePath(); ctx.fillStyle = grad; ctx.fill();
  // Line
  ctx.beginPath(); ctx.strokeStyle = "#F472B6"; ctx.lineWidth = 2.5; ctx.lineJoin = "round";
  data.forEach((m, i) => { i === 0 ? ctx.moveTo(xScale(i), yScale(m.percentile)) : ctx.lineTo(xScale(i), yScale(m.percentile)); });
  ctx.stroke();
  // Dots + labels
  data.forEach((m, i) => {
    const x = xScale(i), y = yScale(m.percentile);
    ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fillStyle = "#F472B6"; ctx.fill();
    ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fillStyle = "#fff"; ctx.fill();
    ctx.fillStyle = "#BE185D"; ctx.font = "bold 10px DM Sans,sans-serif"; ctx.textAlign = "center";
    ctx.fillText(m.percentile + "%", x, y - 10);
    ctx.fillStyle = "#c4a0b0"; ctx.font = "9px DM Sans,sans-serif";
    ctx.fillText(m.name.slice(0, 8), x, h - 8);
  });
}


// -- Revision Scheduler -------------------------------------------------------
const REV_SECS = {
  QA: { topics: QA_TOPICS, prefix: "qa_", color: "#F472B6" },
  DILR: { topics: DILR_TOPICS, prefix: "dilr_", color: "#10B981" },
  VARC: { topics: VARC_TOPICS, prefix: "varc_", color: "#FB923C" },
};

function setTopicSection(s) { S.activeTopicSection = s; renderRevScheduler(); }
function toggleAllRevisit() { S.revAllRevisit = !S.revAllRevisit; renderRevScheduler(); }
function toggleStatusFilter(id) {
  const i = S.revFilters.statuses.indexOf(id);
  if (i > -1) S.revFilters.statuses.splice(i, 1); else S.revFilters.statuses.push(id);
  renderRevScheduler();
}
function toggleFlagFilter(flag) { S.revFilters[flag] = !S.revFilters[flag]; renderRevScheduler(); }
function setTopicStatus(key, val) { S.topicStatus[key] = val; persist(); renderRevScheduler(); renderDashboard(); }
function toggleTopicFlag(key, flag) {
  if (!S.topicFlags[key]) S.topicFlags[key] = {};
  S.topicFlags[key][flag] = !S.topicFlags[key][flag]; persist(); renderRevScheduler();
}
function escAttr(s) { return String(s).replace(/'/g, "\\'"); }

function statusSelectHTML(key) {
  const st = S.topicStatus[key] || "";
  const cfg = STATUSES.find(s => s.id === st) || STATUSES[0];
  return '<select class="rev-status-select" style="color:' + cfg.color + ';border-color:' + cfg.border + ';background:' + cfg.bg + '" onchange="setTopicStatus(\'' + escAttr(key) + '\',this.value);applySelectStyle(this)">' +
    STATUSES.map(s => '<option value="' + s.id + '"' + (st === s.id ? ' selected' : '') + '>' + s.label + '</option>').join('') + '</select>';
}

function applySelectStyle(sel) {
  const cfg = STATUSES.find(s => s.id === sel.value) || STATUSES[0];
  sel.style.color = cfg.color; sel.style.borderColor = cfg.border; sel.style.background = cfg.bg;
}

function renderRevScheduler() {
  const sEl = id => document.getElementById(id);

  // Status filter pills
  sEl("rev-status-filters").innerHTML = STATUSES.map(st => {
    const active = S.revFilters.statuses.includes(st.id);
    return '<button class="rev-status-pill' + (active ? ' active' : '') + '" style="color:' + st.color + ';border-color:' + st.border + ';' + (active ? 'background:' + st.bg : '') + '" onclick="toggleStatusFilter(\'' + st.id + '\')">' + st.label + '</button>';
  }).join("");

  const rEl = sEl("filter-flag-revisit"); if (rEl) rEl.classList.toggle("active", !!S.revFilters.revisit);
  const hEl = sEl("filter-flag-highweight"); if (hEl) hEl.classList.toggle("active", !!S.revFilters.highWeight);
  const aqEl = sEl("btn-revisit-all"); if (aqEl) aqEl.classList.toggle("active", S.revAllRevisit);

  if (S.revAllRevisit) {
    sEl("rev-section-tabs").style.display = "none";
    sEl("rev-section-summary").innerHTML = "";
    const items = [];
    Object.entries(REV_SECS).forEach(([sec, { topics, prefix, color }]) => {
      topics.forEach(t => { const key = prefix + t; if (S.topicFlags[key] && S.topicFlags[key].revisit) items.push({ sec, t, key, color }); });
    });
    sEl("rev-topic-grid").innerHTML = items.length
      ? '<div class="rev-all-revisit-list">' + items.map(({ sec, t, key, color }) =>
        '<div class="rev-revisit-item"><span class="rev-revisit-sec" style="background:' + color + '22;color:' + color + '">' + sec + '</span><span style="font-weight:600;flex:1">' + esc(t) + '</span>' + statusSelectHTML(key) + '</div>').join('') + '</div>'
      : '<div class="empty-state">No topics flagged Revisit Today. Flag topics from any section.</div>';
    return;
  }

  sEl("rev-section-tabs").style.display = "flex";
  sEl("rev-section-tabs").innerHTML = Object.entries(REV_SECS).map(([s, { color, topics, prefix }]) => {
    const strong = topics.filter(t => ["strong", "mastered"].includes(S.topicStatus[prefix + t] || "")).length;
    const act = S.activeTopicSection === s;
    return '<button class="rev-section-tab' + (act ? ' active' : '') + '" style="' + (act ? 'background:' + color + ';border-color:' + color : '') + '" onclick="setTopicSection(\'' + s + '\')">' + s + ' - ' + strong + '/' + topics.length + ' done</button>';
  }).join("");

  const sec = REV_SECS[S.activeTopicSection];
  const counts = {}; STATUSES.forEach(st => { counts[st.id] = sec.topics.filter(t => (S.topicStatus[sec.prefix + t] || "") === st.id).length; });
  const tot = sec.topics.length;
  sEl("rev-section-summary").innerHTML = '<div class="rev-summary-bar"><div class="rev-summary-header"><span class="rev-summary-title">' + S.activeTopicSection + ' - ' + tot + ' topics</span><div class="rev-summary-counts">' +
    STATUSES.map(st => counts[st.id] ? '<span class="rev-summary-count" style="background:' + st.bg + ';color:' + st.color + '">' + counts[st.id] + ' ' + st.label + '</span>' : "").join("") +
    '</div></div><div class="rev-stacked-bar">' + STATUSES.map(st => counts[st.id] ? '<div class="rev-stacked-seg" style="width:' + ((counts[st.id] / tot) * 100) + '%;background:' + st.color + '"></div>' : "").join("") + '</div></div>';

  let filtered = sec.topics.filter(t => {
    const key = sec.prefix + t; const st = S.topicStatus[key] || ""; const flags = S.topicFlags[key] || {};
    if (S.revFilters.statuses.length && !S.revFilters.statuses.includes(st)) return false;
    if (S.revFilters.revisit && !flags.revisit) return false;
    if (S.revFilters.highWeight && !flags.highWeight) return false;
    return true;
  });

  if (!filtered.length) { sEl("rev-topic-grid").innerHTML = '<div class="empty-state">No topics match the current filters.</div>'; return; }

  sEl("rev-topic-grid").innerHTML = '<div class="rev-topic-grid">' + filtered.map(t => {
    const key = sec.prefix + t; const flags = S.topicFlags[key] || {};
    const st = S.topicStatus[key] || ""; const cfg = STATUSES.find(s => s.id === st) || STATUSES[0];
    return '<div class="rev-topic-card" style="border-color:' + cfg.border + '">' +
      '<div class="rev-card-top"><span class="rev-topic-name">' + esc(t) + '</span>' +
      '<div class="rev-flags">' +
      '<button class="rev-flag-btn flag-highweight' + (flags.highWeight ? ' active' : '') + '" onclick="toggleTopicFlag(\'' + escAttr(key) + '\',\'highWeight\')" title="High weightage">\uD83D\uDCCC</button>' +
      '<button class="rev-flag-btn flag-revisit' + (flags.revisit ? ' active' : '') + '" onclick="toggleTopicFlag(\'' + escAttr(key) + '\',\'revisit\')" title="Revisit today">\uD83D\uDD34</button>' +
      '</div></div>' + statusSelectHTML(key) + '</div>';
  }).join("") + '</div>';
}


// -- Error Log -----------------------------------------------------------------
function addError() {
  if (!$("error-topic").value) return;
  S.errors.push({ date: $("error-date").value, section: $("error-section").value, type: $("error-type").value, topic: $("error-topic").value, description: $("error-description").value });
  persist(); $("error-topic").value = ""; $("error-description").value = "";
  flashBtn("btn-add-error", "+ Log error"); renderAll();
}
function removeError(i) { S.errors.splice(i, 1); persist(); renderAll(); }
function renderErrors() {
  $("error-count-header").textContent = `All errors (${S.errors.length})`;
  if (S.errors.length) {
    const byType = {}; ERROR_TYPES.forEach(t => byType[t] = S.errors.filter(e => e.type === t).length);
    $("error-stats-row").style.display = "grid";
    $("error-stats-row").innerHTML = ERROR_TYPES.map(t => `<div class="error-stat-card"><div class="error-stat-value" style="color:${TYPE_COLORS[t]}">${byType[t]}</div><div class="error-stat-label">${t}</div></div>`).join("");
  } else $("error-stats-row").style.display = "none";
  if (!S.errors.length) { $("error-log-list").innerHTML = `<div class="empty-state">No errors logged yet — start reviewing your mocks.</div>`; return; }
  $("error-log-list").innerHTML = [...S.errors].reverse().map((e, i) => {
    const ri = S.errors.length - 1 - i, sc = SEC_COLORS[e.section] || ["#BE185D", "#fdf2f8"];
    return `<div class="error-item"><div>
      <div class="error-item-header">${badge(e.type, TYPE_COLORS[e.type], TYPE_COLORS[e.type] + "22")}${badge(e.section, sc[0], sc[1])}<span style="font-size:11px;color:var(--text-3)">${fmtDate(e.date)}</span></div>
      <div class="error-item-topic">${esc(e.topic)}</div>
      ${e.description ? `<div class="error-item-desc">${esc(e.description)}</div>` : ""}
    </div><button class="btn-delete" onclick="removeError(${ri})">×</button></div>`;
  }).join("");
}

// -- Books ---------------------------------------------------------------------
function setBookTab(t) { S.activeBookTab = t; renderBooks(); }
function cycleChapter(key) {
  const cur = S.bookProgress[key] || "";
  S.bookProgress[key] = cur === "" ? "inprogress" : cur === "inprogress" ? "done" : "";
  persist(); renderBooks();
}
function renderBooks() {
  const bookKeys = Object.keys(BOOKS);
  $("book-tabs").innerHTML = bookKeys.map(k => `<button class="book-tab-btn${S.activeBookTab === k ? " active" : ""}" onclick="setBookTab('${k}')">${BOOKS[k].label}</button>`).join("");
  const bk = BOOKS[S.activeBookTab];
  const done = bk.chapters.filter((_, i) => S.bookProgress[`${S.activeBookTab}_${i}`] === "done").length;
  const inprog = bk.chapters.filter((_, i) => S.bookProgress[`${S.activeBookTab}_${i}`] === "inprogress").length;
  const pct = Math.round(done / bk.chapters.length * 100);
  $("book-content").innerHTML = `
    <div class="book-progress-header"><span class="book-progress-label">${bk.label}</span><span class="book-progress-pct">${done}/${bk.chapters.length} done (${inprog} in progress)</span></div>
    <div class="book-bar-track"><div class="book-bar-fill" style="width:${pct}%"></div></div>
    <div class="book-chapter-grid">${bk.chapters.map((ch, i) => {
    const key = `${S.activeBookTab}_${i}`, st = S.bookProgress[key] || "";
    return `<button class="chapter-btn${st ? " ch-" + st : ""}" onclick="cycleChapter('${key}')"><span class="chapter-dot"></span><span class="chapter-name">${esc(ch)}</span></button>`;
  }).join("")}</div>`;
}

// -- Notes ---------------------------------------------------------------------
function addNote() {
  if (!$("note-title").value && !$("note-body").value) return;
  S.notes.push({ id: Date.now(), date: $("note-date").value, section: $("note-section").value, title: $("note-title").value, body: $("note-body").value });
  persist(); $("note-title").value = ""; $("note-body").value = "";
  flashBtn("btn-add-note", "+ Add note"); renderNotes();
}
function removeNote(id) { S.notes = S.notes.filter(n => n.id !== id); persist(); renderNotes(); }
function renderNotes() {
  const q = ($("notes-search-input").value || "").toLowerCase();
  const filtered = S.notes.filter(n => (n.title + n.body + n.section).toLowerCase().includes(q));
  const secColor = { QA: "#F472B6", VARC: "#FB923C", DILR: "#10B981", Mocks: "#BE185D", General: "#9d7c8a" };
  $("notes-list").innerHTML = filtered.length ? [...filtered].reverse().map(n => `
    <div class="note-card"><div class="note-card-header">
      <span class="note-title">${esc(n.title || "Untitled")}</span>
      ${badge(n.section, secColor[n.section] || "#9d7c8a", (secColor[n.section] || "#9d7c8a") + "22")}
      <span class="note-meta">${fmtDate(n.date)}</span>
      <button class="btn-delete" onclick="removeNote(${n.id})">×</button>
    </div><div class="note-body">${esc(n.body)}</div></div>`).join("") :
    `<div class="empty-state">${q ? "No notes match your search." : "No notes yet — add your first one above!"}</div>`;
}

// -- Goals & Tools -------------------------------------------------------------
function calcScore() {
  const pct = parseFloat($("calc-overall").value);
  if (!pct || pct < 0 || pct > 100) { alert("Enter a valid percentile (0–100)."); return; }
  let score = SCORE_MAP[SCORE_MAP.length - 1][1];
  for (const [p, s] of SCORE_MAP) { if (pct >= p) { score = s; break; } }
  const qa = Math.round(score * 0.33), varc = Math.round(score * 0.36), dilr = Math.round(score * 0.30);
  $("calc-result").style.display = "block";
  $("calc-result").innerHTML = `
    <div class="calc-result-row"><span class="calc-result-label">Total raw score</span><span class="calc-result-value">${score}+</span></div>
    <div class="calc-result-row"><span class="calc-result-label" style="color:#F472B6">QA (out of 66)</span><span class="calc-result-value" style="color:#F472B6">${qa}+</span></div>
    <div class="calc-result-row"><span class="calc-result-label" style="color:#FB923C">VARC (out of 72)</span><span class="calc-result-value" style="color:#FB923C">${varc}+</span></div>
    <div class="calc-result-row"><span class="calc-result-label" style="color:#10B981">DILR (out of 60)</span><span class="calc-result-value" style="color:#10B981">${dilr}+</span></div>
    <div style="font-size:10px;color:var(--text-3);margin-top:8px">*Approximate based on historical CAT score distributions. Actual scores vary by paper difficulty.</div>`;
}
function saveStrategy() {
  ["qa", "varc", "dilr"].forEach(s => {
    const o = $(`strat-${s}-order`), t = $(`strat-${s}-time`);
    if (o) S.strategy[s].order = o.value; if (t) S.strategy[s].time = t.value;
  });
  persist(); flashBtn("btn-save-strategy", "Save strategy");
}
function renderGoals() {
  // Strategy form
  $("strategy-form").innerHTML = ["qa", "varc", "dilr"].map(s => {
    const color = s === "qa" ? "#F472B6" : s === "varc" ? "#FB923C" : "#10B981";
    return `<div class="strategy-section"><div class="strategy-section-title" style="color:${color}">${s.toUpperCase()}</div>
      <div class="form-grid-2" style="margin-bottom:0">
        <div class="form-group"><label>Attempt order / priority</label><input type="text" id="strat-${s}-order" value="${esc(S.strategy[s]?.order || "")}" placeholder="e.g. Sets ? P&C ? Arithmetic"></div>
        <div class="form-group"><label>Time allocation</label><input type="text" id="strat-${s}-time" value="${esc(S.strategy[s]?.time || "")}" placeholder="e.g. 40 min, skip DI > 4 steps"></div>
      </div></div>`;
  }).join("");

  // Revision list
  const rev = [];
  Object.entries(REV_SECS).forEach(([sec, { topics, prefix }]) => {
    topics.forEach(t => { if (S.topicStatus[`${prefix}${t}`] === "revision") rev.push({ sec, t }); });
  });
  const secColor = { QA: "#F472B6", VARC: "#FB923C", DILR: "#10B981" };
  $("revision-list").innerHTML = rev.length ? `<div style="display:flex;flex-wrap:wrap;gap:8px">${rev.map(r => `<span style="background:${secColor[r.sec]}22;color:${secColor[r.sec]};border:1px solid ${secColor[r.sec]}44;font-size:12px;font-weight:600;padding:4px 12px;border-radius:20px">${r.sec}: ${esc(r.t)}</span>`).join("")}</div>` :
    `<div class="empty-state">No topics marked for revision — go to the Topics tab and categorise your topics.</div>`;
}




