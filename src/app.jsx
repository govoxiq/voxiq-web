import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// --- Tweak defaults parsed from the host-managed block in index.html
const TWEAK_DEFAULTS = (() => {
  try { return JSON.parse(document.getElementById("tweak-defaults").textContent); }
  catch (e) { return { accent: "#e8553a", headline: "italic-strike", heroVisual: "waveform", showFlow: true }; }
})();

// =====================================================================
// Icons (inline, simple geometry only — no complex SVG)
// =====================================================================
const Arrow = ({ size = 14 }) => (
  <svg className="arrow" width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

const Check = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path d="M2 6.5l2.5 2.5L10 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
  </svg>
);

// =====================================================================
// NAV
// =====================================================================
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="container nav-inner">
        <a className="logo" href="#top">
          <span className="logo-mark">
            <LogoMark />
          </span>
          VoxIQ
        </a>
        <nav className="nav-links">
          <a href="#what">What we do</a>
          <a href="#industries">Industries</a>
          <a href="#snippet">Sample report</a>
          <a href="#report">Free report</a>
        </nav>
        <div className="nav-cta">
          <a href="#report" className="btn btn-primary">Get a free report <Arrow /></a>
        </div>
      </div>
    </header>
  );
}

function LogoMark() {
  // tiny stylized "waveform" bars inside the logo square
  return (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <rect x="2"  y="6" width="1.6" height="4" rx="0.6" fill="currentColor" />
      <rect x="5"  y="3" width="1.6" height="10" rx="0.6" fill="currentColor" />
      <rect x="8"  y="5" width="1.6" height="6" rx="0.6" fill="currentColor" />
      <rect x="11" y="2" width="1.6" height="12" rx="0.6" fill="currentColor" />
    </svg>
  );
}

// =====================================================================
// HERO
// =====================================================================
function Hero({ headline }) {
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">VoxIQ · Early access</span>
            <h1>
              {headline === "italic-strike" && (
                <>
                  Turn customer voices into <span className="accent">operational</span> intelligence.
                </>
              )}
              {headline === "plain" && (
                <>Customer voices, operational intelligence.</>
              )}
              {headline === "question" && (
                <>What are your customers <span className="accent">actually</span> telling you?</>
              )}
            </h1>
            <p className="lede">
              VoxIQ reads every customer voice, ranks the single change most
              likely to move your rating, generates the training that lands
              it — and then measures whether it worked. Not review
              monitoring. The complete loop.
            </p>
            <div className="hero-cta">
              <a href="#report" className="btn btn-accent">Get a free review intelligence report <Arrow /></a>
              <a href="#what" className="btn btn-ghost">See how it works</a>
            </div>
            <div className="hero-meta">
              <div>
                <div className="stat-label mono" style={{ marginTop: 0 }}>STEP 01 · IDENTIFY</div>
                <div className="stat-line">Read every review and cluster the language into operational themes.</div>
              </div>
              <div>
                <div className="stat-label mono" style={{ marginTop: 0 }}>STEP 02 · RECOMMEND</div>
                <div className="stat-line">Rank the single change most likely to move your rating.</div>
              </div>
              <div>
                <div className="stat-label mono" style={{ marginTop: 0 }}>STEP 03 · TRAIN</div>
                <div className="stat-line">Generate the scripts and modules that land the fix on the floor.</div>
              </div>
              <div>
                <div className="stat-label mono" style={{ marginTop: 0 }}>STEP 04 · MEASURE</div>
                <div className="stat-line">Watch the theme shrink in next month's reviews — or try the next one.</div>
              </div>
            </div>
          </div>

          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="hv-top">
        <span>VOXIQ IN PRACTICE</span>
        <span className="live mono">ILLUSTRATIVE</span>
      </div>

      <div className="ba-stage">
        {/* BEFORE */}
        <div className="ba-card before">
          <div className="ba-label">Before</div>
          <div className="ba-rating">
            <div className="ba-stars">
              <span>★</span><span>★</span><span>★</span><span>★</span><span className="empty">★</span>
            </div>
            <div className="ba-num">4.1</div>
          </div>
          <div className="ba-stats">
            <div>
              <div className="ba-stat-l">Top complaint</div>
              <div className="ba-stat-v">Scheduling</div>
            </div>
          </div>
        </div>

        <div className="ba-divider">
          <span className="line" />
          <span className="label mono">AFTER VOXIQ ↓</span>
          <span className="line" />
        </div>

        {/* AFTER */}
        <div className="ba-card after">
          <div className="ba-label">After</div>
          <div className="ba-rating">
            <div className="ba-stars">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <div className="ba-num">4.7</div>
          </div>
          <div className="ba-stats">
            <div>
              <div className="ba-stat-l">Scheduling mentions</div>
              <div className="ba-stat-v"><span className="delta">↓</span>42%</div>
            </div>
            <div>
              <div className="ba-stat-l">Patient satisfaction</div>
              <div className="ba-stat-v"><span className="up">↑</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// WHAT VOXIQ DOES — tabbed capabilities
// =====================================================================
const CAPABILITIES = [
  {
    id: "identify",
    title: "Identify what customers are saying",
    headline: "Every voice, read — and clustered into the themes that actually run your business.",
    body: "Review monitoring tools surface star ratings. VoxIQ reads the actual language — every public Google review, soon every call, survey, and chat — and clusters it into an industry-aware theme taxonomy so you see what they're saying, not just whether they liked it.",
    bullets: ["Industry-tuned theme taxonomies", "Speech-to-text + PHI/PII redaction on ingest", "Per-location, per-cohort, per-agent rollups", "Anomaly alerts on emerging issues"],
    viz: "identify",
  },
  {
    id: "recommend",
    title: "Recommend what to fix",
    headline: "The single change most likely to move your rating, ranked by impact.",
    body: "Every theme is scored on volume × severity × addressability. The top of your dashboard isn't a feed — it's a ranked queue of operational changes, each with an owner, an SLA, and the lift it should produce. Decisions, not noise.",
    bullets: ["Impact-weighted action queue", "Owner assignment + SLA tracking", "Effort vs. lift estimates per action", "Closed-loop response drafting"],
    viz: "recommend",
  },
  {
    id: "train",
    title: "Train your team",
    headline: "Role-specific scripts and modules, generated from your actual reviews.",
    body: "This is where VoxIQ stops being software and starts being a system. Once an action is queued, VoxIQ writes the training that lands it: front-desk scripts, technician scripts, manager talking points — all grounded in what your customers actually said, ready to drop into a 15-minute huddle.",
    bullets: ["Auto-generated role-specific scripts", "Coaching modules with example quotes", "Manager talk-tracks for weekly huddles", "Versioned, rollback-able as the data shifts"],
    viz: "train",
  },
  {
    id: "measure",
    title: "Measure whether it worked",
    headline: "Did the fix actually show up in next month's reviews?",
    body: "Every action ships with a measurement plan. VoxIQ watches the relevant theme's volume and sentiment, plus the downstream KPI you cared about, and tells you — week over week — whether the fix paid off or whether it's time to try the next one.",
    bullets: ["Pre/post theme tracking", "Linked KPI movement (CSAT, churn, AOV)", "Automated weekly digest to leadership", "Board-ready summaries on export"],
    viz: "measure",
  },
];

function WhatWeDo() {
  const [active, setActive] = useState(0);
  const cap = CAPABILITIES[active];
  return (
    <section id="what">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Not review monitoring</span>
            <h2>The complete<br />loop.</h2>
          </div>
          <p className="sub">
            VoxIQ <strong style={{ color: "var(--ink)", fontWeight: 500 }}>identifies</strong> what your customers are telling you,
            {" "}<strong style={{ color: "var(--ink)", fontWeight: 500 }}>recommends</strong> what to fix,
            {" "}<strong style={{ color: "var(--ink)", fontWeight: 500 }}>generates training</strong> for your team,
            and <strong style={{ color: "var(--ink)", fontWeight: 500 }}>measures</strong> whether it worked.
            That's a complete loop — and it's why we're not competing
            with review monitoring software.
          </p>
        </div>

        <div className="capabilities">
          <div className="cap-tabs">
            {CAPABILITIES.map((c, i) => (
              <button
                key={c.id}
                className={"cap-tab" + (i === active ? " active" : "")}
                onClick={() => setActive(i)}
              >
                <span className="idx mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="title">{c.title}</span>
              </button>
            ))}
          </div>

          <div className="cap-panel" key={cap.id}>
            <div className="copy">
              <span className="eyebrow">Capability {String(active + 1).padStart(2, "0")}</span>
              <h3>{cap.headline}</h3>
              <p>{cap.body}</p>
              <ul className="bullets">
                {cap.bullets.map((b) => (<li key={b}>{b}</li>))}
              </ul>
              <div className="cap-thread mono">
                <span className="cap-thread-l">Following one example →</span>
                Bright Smile Dental · 127 Google reviews · last 90 days
              </div>
            </div>
            <div className="viz">
              {cap.viz === "identify" && <IdentifyViz />}
              {cap.viz === "recommend" && <RecommendViz />}
              {cap.viz === "train" && <TrainViz />}
              {cap.viz === "measure" && <MeasureViz />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// CAPABILITY VIZES — one persistent example (Bright Smile Dental,
// 127 reviews) threads through all four steps of the loop.
// =====================================================================
function IdentifyViz() {
  const mentions = [
    { l: "Can't reach the office",  n: 24 },
    { l: "Callbacks delayed",       n: 18 },
    { l: "Voicemail frustration",   n: 15 },
  ];
  return (
    <div className="viz-stack">
      <div className="viz-crumb mono">STEP 01 · IDENTIFY · CUSTOMER SIGNAL</div>
      <div className="viz-hero">
        <div className="viz-hero-num">31%</div>
        <div className="viz-hero-l">
          of reviews mention<br />
          <strong>scheduling friction</strong>
        </div>
      </div>
      <div className="viz-sub mono">Patients are saying</div>
      <div className="viz-list">
        {mentions.map((m) => (
          <div className="viz-row" key={m.l}>
            <span className="viz-bullet mono">›</span>
            <span className="viz-row-l">{m.l}</span>
            <span className="viz-row-v mono">{m.n} mentions</span>
          </div>
        ))}
      </div>
      <div className="viz-quote">
        “Took three calls to confirm a slot. Voicemail every time.”
      </div>
    </div>
  );
}

function RecommendViz() {
  return (
    <div className="viz-stack">
      <div className="viz-crumb mono">STEP 02 · RECOMMEND · PRIORITY ACTION</div>
      <div className="viz-pair">
        <div className="viz-pair-cell">
          <div className="viz-pair-l mono">Priority issue</div>
          <div className="viz-pair-v">Scheduling</div>
        </div>
        <div className="viz-pair-cell">
          <div className="viz-pair-l mono">Expected impact</div>
          <div className="viz-pair-v">
            <span className="impact-dot high" /> High
          </div>
        </div>
      </div>
      <div className="viz-reco-card">
        <span className="viz-reco-tag mono">Recommended action</span>
        <div className="viz-reco-text">
          Implement two-way SMS appointment confirmations with self-service reschedule.
        </div>
      </div>
      <div className="viz-trio">
        <div>
          <div className="viz-pair-l mono">Owner</div>
          <div className="viz-trio-v">Front desk</div>
        </div>
        <div>
          <div className="viz-pair-l mono">Effort</div>
          <div className="viz-trio-v">Medium</div>
        </div>
        <div>
          <div className="viz-pair-l mono">SLA</div>
          <div className="viz-trio-v">30 days</div>
        </div>
      </div>
      <div className="viz-foot mono">
        ▲ Root cause: 4.1× more “voicemail” mentions than “callback”
      </div>
    </div>
  );
}

function TrainViz() {
  const topics = [
    "SMS confirmation flow",
    "Reschedule scripts",
    "Voicemail callback SLA",
    "Insurance pre-check timing",
  ];
  return (
    <div className="viz-stack">
      <div className="viz-crumb mono">STEP 03 · TRAIN · MODULE GENERATED</div>
      <div className="viz-module">
        <div className="viz-module-head">
          <span className="viz-module-tag mono">MODULE 01 · FRONT DESK</span>
          <span className="viz-module-status mono">READY TO ASSIGN</span>
        </div>
        <div className="viz-module-title">Appointment Confirmation</div>
        <div className="viz-module-meta">
          <div>
            <div className="viz-pair-l mono">Duration</div>
            <div className="viz-trio-v">12 min</div>
          </div>
          <div>
            <div className="viz-pair-l mono">Quiz</div>
            <div className="viz-trio-v">8 questions</div>
          </div>
          <div>
            <div className="viz-pair-l mono">Sourced from</div>
            <div className="viz-trio-v">57 reviews</div>
          </div>
        </div>
      </div>
      <div className="viz-sub mono">Covered topics</div>
      <div className="viz-list">
        {topics.map((t, i) => (
          <div className="viz-row" key={t}>
            <span className="viz-bullet mono">{String(i + 1).padStart(2, "0")}</span>
            <span className="viz-row-l">{t}</span>
            <span style={{ color: "var(--good)" }}><Check /></span>
          </div>
        ))}
      </div>
      <div className="viz-foot mono">↳ scripts grounded in your own review language</div>
    </div>
  );
}

function MeasureViz() {
  const before = [31, 33, 29, 32, 30, 28, 31];
  const after  = [26, 22, 18, 14, 13, 12, 12];
  return (
    <div className="viz-stack">
      <div className="viz-crumb mono">STEP 04 · MEASURE · 90 DAYS POST-ROLLOUT</div>
      <div className="viz-ba">
        <div className="viz-ba-cell viz-ba-before">
          <span className="viz-pair-l mono">Before</span>
          <span className="viz-ba-num">31%</span>
          <span className="viz-ba-sub mono">of reviews</span>
        </div>
        <div className="viz-ba-arrow mono">→</div>
        <div className="viz-ba-cell viz-ba-after">
          <span className="viz-pair-l mono">After</span>
          <span className="viz-ba-num">12%</span>
          <span className="viz-ba-sub mono">of reviews</span>
        </div>
      </div>
      <div className="viz-chart">
        <svg width="100%" height="100%" viewBox="0 0 280 100" preserveAspectRatio="none">
          <line x1="140" x2="140" y1="0" y2="100" stroke="var(--muted)" strokeDasharray="3 3" strokeWidth="1" />
          {before.map((v, i) => (
            <rect key={"b" + i} x={i * 19 + 2} y={100 - v * 2.5} width="14" height={v * 2.5} fill="var(--ink)" rx="2" />
          ))}
          {after.map((v, i) => (
            <rect key={"a" + i} x={142 + i * 19} y={100 - v * 2.5} width="14" height={v * 2.5} fill="var(--accent)" rx="2" />
          ))}
          <text x="144" y="11" className="mono" fontSize="8" fill="var(--muted)">ROLLOUT</text>
        </svg>
      </div>
      <div className="viz-result">
        <div>
          <div className="viz-result-l mono">Reduction</div>
          <div className="viz-result-v">61%</div>
        </div>
        <div className="viz-result-r mono">
          ↳ verified against Google review volume + CSAT
        </div>
      </div>
    </div>
  );
}

// =====================================================================
// DENTAL USE CASE
// =====================================================================
// =====================================================================
// INDUSTRIES — multi-vertical use cases
// =====================================================================
const INDUSTRIES = [
  {
    id: "healthcare",
    name: "Healthcare",
    voice: "patients",
    verticals: ["Dental", "Orthodontics", "Eye Care", "Dermatology", "Medical Clinics", "Physical Therapy", "Urgent Care", "Veterinary"],
    themes: ["Scheduling", "Wait Times", "Communication", "Billing Transparency", "Staff Experience", "Treatment Outcomes"],
    recommendation: {
      theme: "Scheduling",
      signal: {
        metric: "4 : 1",
        label: "'Voicemail' vs. 'callback' mentions",
        detail: "Patients describe leaving messages four times more often than they describe getting a call back.",
      },
      action: "Implement self-service rescheduling with two-way SMS confirmation.",
      impact: "High",
    },
  },
  {
    id: "home-services",
    name: "Home Services",
    voice: "homeowners",
    verticals: ["HVAC", "Plumbing", "Electrical", "Roofing", "Landscaping", "Pest Control", "Cleaning"],
    themes: ["Scheduling", "Technician Quality", "Communication", "Pricing", "Quote Accuracy", "Completion Quality"],
    recommendation: {
      theme: "Communication",
      signal: {
        metric: "73%",
        label: "of 1-star reviews mention 'no-show' or 'late'",
        detail: "Arrival window — not technician skill — is what's pulling ratings down most often.",
      },
      action: "Send automated technician ETA + photo before every visit.",
      impact: "High",
    },
  },
  {
    id: "hospitality",
    name: "Hospitality",
    voice: "guests",
    verticals: ["Hotels", "Resorts", "Vacation Rentals", "Tours"],
    themes: ["Check-In", "Cleanliness", "Staff", "Value", "Booking Experience"],
    recommendation: {
      theme: "Check-In",
      signal: {
        metric: "22 min",
        label: "Median check-in wait in negative reviews",
        detail: "Guests arriving between 3–5pm wait three times longer than any other window of the day.",
      },
      action: "Enable mobile check-in and digital room key by default.",
      impact: "High",
    },
  },
  {
    id: "food-bev",
    name: "Food & Beverage",
    voice: "diners",
    verticals: ["Restaurants", "Coffee Shops", "Quick Service", "Bars"],
    themes: ["Wait Time", "Food Quality", "Consistency", "Service", "Value"],
    recommendation: {
      theme: "Wait Time",
      signal: {
        metric: "2.3×",
        label: "More 'reservation' mentions in 3★ reviews than 5★",
        detail: "Diners who reserved and still waited are more critical than walk-ins who waited the same amount.",
      },
      action: "Surface live wait estimates inside the reservation flow.",
      impact: "Medium",
    },
  },
  {
    id: "personal-care",
    name: "Personal Care",
    voice: "clients",
    verticals: ["Hair Salons", "Barbers", "Med Spas", "Day Spas", "Nail Salons"],
    themes: ["Consistency", "Staff", "Scheduling", "Price Perception", "Results"],
    recommendation: {
      theme: "Consistency",
      signal: {
        metric: "62%",
        label: "of detractors mention a 'different' stylist or tech",
        detail: "Last-minute provider swaps drive most 1- and 2-star reviews — even when the work is good.",
      },
      action: "Tag client preferences in profile and surface them at booking.",
      impact: "High",
    },
  },
];

function Industries({ showFlow }) {
  const [active, setActive] = useState("healthcare");
  const ind = INDUSTRIES.find((i) => i.id === active) || INDUSTRIES[0];

  const flow = [
    { n: "01", t: "Ingest",     d: "Every public Google Review of your business — the feedback your customers are already giving you." },
    { n: "02", t: "Cluster",    d: "Group language into the operational themes that actually run your category." },
    { n: "03", t: "Prioritize", d: "Score every theme on volume, severity, and addressability. The actions that matter most rise to the top." },
    { n: "04", t: "Close loop", d: "Front desk gets scripted responses. Leadership gets a weekly digest. The themes you fix shrink over time." },
  ];

  return (
    <section id="industries">
      <div className="container">
        <div className="case-wrap">
          <div className="ind-head">
            <span className="case-eyebrow">Industries we understand</span>
            <h2>Industry. Signal.<br /><span style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 400 }}>Action.</span></h2>
            <p className="body">
              Every service business is generating customer signals 
              every day. Reviews, calls, surveys, messages, and emails 
              all contain clues about what customers are experiencing. 
              VoxIQ turns those signals into ranked operational actions. Pick your
              category to see the whole loop on one screen.
            </p>
          </div>

          <div className="ind-chips">
            {INDUSTRIES.map((i) => (
              <button
                key={i.id}
                className={"ind-chip" + (i.id === active ? " active" : "")}
                onClick={() => setActive(i.id)}
              >
                {i.name}
              </button>
            ))}
          </div>

          <div className="loop-rail">
            <span className="loop-step mono">01 · Industry</span>
            <span className="loop-arrow">→</span>
            <span className="loop-step mono">02 · Theme</span>
            <span className="loop-arrow">→</span>
            <span className="loop-step mono">03 · Action</span>
          </div>

          <div className="ind-panel" key={ind.id}>
            {/* STEP 01 — INDUSTRY */}
            <div className="ind-card ind-card-industry">
              <div className="ind-card-head">
                <span className="ind-card-num mono">01</span>
                <span className="ind-card-label mono">Industry</span>
              </div>
              <div className="ind-card-title">{ind.name}</div>
              <div className="ind-verticals-head">
                <span className="ind-col-l mono">Verticals</span>
                <span className="ind-col-c mono">{ind.verticals.length}</span>
              </div>
              <ul className="ind-verticals">
                {ind.verticals.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
              <div className="ind-card-foot mono">
                Customer voice · <strong>{ind.voice}</strong>
              </div>
            </div>

            {/* STEP 02 — THEMES */}
            <div className="ind-card ind-card-themes">
              <div className="ind-card-head">
                <span className="ind-card-num mono">02</span>
                <span className="ind-card-label mono">Themes VoxIQ understands</span>
              </div>
              <ul className="ind-themes-list">
                {ind.themes.map((t) => (
                  <li
                    key={t}
                    className={"ind-theme-row" + (t === ind.recommendation.theme ? " focus" : "")}
                  >
                    <span className="ind-theme-name">{t}</span>
                    {t === ind.recommendation.theme && (
                      <span className="ind-theme-flag mono">priority signal</span>
                    )}
                  </li>
                ))}
              </ul>
              <div className="ind-card-foot mono">
                {ind.themes.length} operational dimensions
              </div>
            </div>

            {/* STEP 03 — RECOMMENDATION */}
            <div className="ind-card ind-card-reco">
              <div className="ind-card-head">
                <span className="ind-card-num mono">03</span>
                <span className="ind-card-label mono">Recommendation example</span>
              </div>
              <div className="reco-block">
                <span className="reco-theme-tag mono">{ind.recommendation.theme} · priority signal</span>
                <div className="reco-stat">{ind.recommendation.signal.metric}</div>
                <div className="reco-stat-label">{ind.recommendation.signal.label}</div>
                <div className="reco-stat-sub">{ind.recommendation.signal.detail}</div>
              </div>
              <div className="reco-section">
                <div className="reco-section-l mono">Recommended action</div>
                <div className="reco-section-v">{ind.recommendation.action}</div>
              </div>
              <div className="reco-section reco-impact">
                <div className="reco-section-l mono">Expected impact</div>
                <div className="reco-impact-pill">
                  <span className={"impact-dot " + ind.recommendation.impact.toLowerCase()} />
                  {ind.recommendation.impact}
                </div>
              </div>
            </div>
          </div>

          {showFlow && (
            <div className="case-flow">
              <div className="case-eyebrow" style={{ marginBottom: 18 }}>How the engagement runs</div>
              <div className="case-flow-row">
                {flow.map((s) => (
                  <div className="flow-step" key={s.n}>
                    <span className="step-num mono">{s.n}</span>
                    <div className="step-title">{s.t}</div>
                    <div className="step-desc">{s.d}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// REPORT SNIPPET (sample preview of the free report)
// =====================================================================
function ReportSnippet() {
  return (
    <section className="report-section" id="snippet">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Sample snippet</span>
            <h2>What the<br />report looks like.</h2>
          </div>
          <p className="sub">
            One page of a real Review Intelligence Report. Volume, sentiment,
            and — most importantly — the single change most likely to move
            the needle. The full version goes deeper on every theme, every
            competitor, and every recommendation.
          </p>
        </div>

        <div className="report-doc">
          <div className="report-corner mono">PG. 01 / 14</div>

          <div className="report-head">
            <div className="left">
              <span className="crumb">VoxIQ · Review Intelligence Report</span>
              <div className="title">At a glance — <em style={{ fontStyle: "normal", color: "var(--muted)" }}>[Your Company]</em></div>
            </div>
            <span className="report-stamp mono">SAMPLE</span>
          </div>

          <div className="report-meta">
            <span><strong>Period</strong> Last 12 months</span>
            <span className="sep">│</span>
            <span><strong>Source</strong> Google Reviews (public)</span>
            <span className="sep">│</span>
            <span><strong>Prepared by</strong> VoxIQ</span>
          </div>

          <div className="report-grid">
            <div className="report-cell">
              <span className="lbl">Google Reviews analyzed</span>
              <div className="big">127</div>
              <div className="sub">across 12 months · 100% read</div>
            </div>
            <div className="report-cell">
              <span className="lbl">Average rating</span>
              <div className="big">4.3<span className="unit">★</span></div>
              <div className="stars">
                <span className="s">★</span>
                <span className="s">★</span>
                <span className="s">★</span>
                <span className="s">★</span>
                <span className="s half">★</span>
              </div>
            </div>
            <div className="report-cell">
              <span className="lbl">Themes detected</span>
              <div className="big">18</div>
              <div className="sub">9 positive · 7 negative · 2 mixed</div>
            </div>
          </div>

          <div className="report-themes">
            <div className="theme-cell">
              <div className="tk"><span className="dot-pos" /> Most common positive theme</div>
              <div className="theme-name">Friendly Staff</div>
              <div className="quote-snip">“The hygienist explained everything and made me feel comfortable the whole time.”</div>
            </div>
            <div className="theme-cell">
              <div className="tk"><span className="dot-neg" /> Most common negative theme</div>
              <div className="theme-name">Scheduling Friction</div>
              <div className="quote-snip">“Took three calls to get a slot, and the confirmation never came through.”</div>
            </div>
          </div>

          <div className="report-reco">
            <div className="reco-label mono">
              HIGHEST IMPACT RECOMMENDATION
              <span className="num">01 of 6</span>
            </div>
            <div className="reco-text">
              Roll out <span className="em">automated appointment confirmations</span> with two-way SMS reschedule.
            </div>
            <a href="#report" className="reco-cta">See the full report <Arrow /></a>
          </div>

          <div className="report-pagenum mono" style={{ position: "static", textAlign: "right", padding: "14px 0" }}>VOXIQ.COM / REPORT</div>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// LEAD FORM
// =====================================================================
function LeadForm() {
  const [form, setForm] = useState({
    name: "", email: "", company: "", role: "", industry: "Healthcare", url: "", goal: "", consent: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid work email";
    if (!form.company.trim()) e.company = "Required";
    if (!form.consent) e.consent = "Required";
    return e;
  };
  const handleChange = (k) => (ev) => {
    const v = ev.target.type === "checkbox" ? ev.target.checked : ev.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = async (ev) => {
    ev.preventDefault();

    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setSubmitting(true);

    try {
      const response = await fetch(
        "https://formspree.io/f/xdajwzgy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Failed");
      }

      setSubmitted(true);
    }
    catch (err) {
      console.error(err);
      alert("Unable to submit report request.");
    }
    finally {
      setSubmitting(false);
    }
  };  

  const includes = [
    { t: "Reputation signal review", s: "We identify the themes appearing most often in your customer feedback." },
    { t: "Industry context", s: "See how your customer experience compares to common patterns in your category." },
    { t: "Opportunity assessment", s: "Understand where VoxIQ believes operational improvements may exist." },
    { t: "Pilot recommendation", s: "If there's a fit, we'll recommend next steps for a deeper engagement." },
  ];

  return (
    <section id="report">
      <div className="container">
        <div className="lead-wrap">
          <div className="lead-copy">
            <span className="eyebrow">Free · 7-day turnaround</span>
            <h2>Request a VoxIQ pilot <span className="accent">assessment.</span></h2>
            <p>
              Share your business and public review profile. We'll review whether VoxIQ can identify enough signal to produce a useful operational assessment.
            </p>
            <div className="lead-includes">
              {includes.map((i) => (
                <div className="incl" key={i.t}>
                  <div className="ck"><Check /></div>
                  <div className="it">
                    <strong>{i.t}</strong>
                    <span>{i.s}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {submitted ? (
            <div className="form-success">
              <div className="check"><Check size={20} /></div>
              <h3>Report queued for {form.company || "you"}.</h3>
              <p>We've sent a confirmation to <strong>{form.email}</strong>. Thanks. We'll review your submission and follow up if there's a fit for the early access pilot.</p>
            </div>
          ) : (
            <form className="form" onSubmit={submit} noValidate>
              <div className="row">
                <div className={"field" + (errors.name ? " err" : "")}>
                  <label htmlFor="name">Name</label>
                  <input id="name" value={form.name} onChange={handleChange("name")} placeholder="Jamie Rivera" />
                  {errors.name && <span className="err-msg">{errors.name}</span>}
                </div>
                <div className={"field" + (errors.email ? " err" : "")}>
                  <label htmlFor="email">Work email</label>
                  <input id="email" type="email" value={form.email} onChange={handleChange("email")} placeholder="jamie@brightsmile.co" />
                  {errors.email && <span className="err-msg">{errors.email}</span>}
                </div>
              </div>
              <div className="row">
                <div className={"field" + (errors.company ? " err" : "")}>
                  <label htmlFor="company">Company</label>
                  <input id="company" value={form.company} onChange={handleChange("company")} placeholder="Your Company Name" />
                  {errors.company && <span className="err-msg">{errors.company}</span>}
                </div>
                <div className="field">
                  <label htmlFor="role">Role</label>
                  <input id="role" value={form.role} onChange={handleChange("role")} placeholder="VP Operations" />
                </div>
              </div>
              <div className="row">
                <div className="field">
                  <label htmlFor="industry">Industry</label>
                  <select id="industry" value={form.industry} onChange={handleChange("industry")}>
                    <option>Healthcare</option>
                    <option>Home Services</option>
                    <option>Hospitality</option>
                    <option>Food & Beverage</option>
                    <option>Personal Care</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="url">Public URL (Google / Yelp)</label>
                  <input id="url" value={form.url} onChange={handleChange("url")} placeholder="Website URL" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="goal">What would make this report useful for you?</label>
                <textarea id="goal" value={form.goal} onChange={handleChange("goal")} placeholder="e.g., We're rolling out 4 new locations and want a baseline before we open." />
              </div>
              <label className={"field" + (errors.consent ? " err" : "")} style={{ flexDirection: "row", gap: 10, alignItems: "flex-start" }}>
                <input type="checkbox" checked={form.consent} onChange={handleChange("consent")} style={{ marginTop: 3 }} />
                <span style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>
                  I agree VoxIQ may pull my publicly listed reviews to prepare this report. No sales call required.
                </span>
              </label>
              {errors.consent && <span className="err-msg">{errors.consent}</span>}
              <div className="submit-row">
                <button type="submit" className="btn btn-accent" disabled={submitting}>
                  {submitting ? "Queuing…" : <>Request an assessment <Arrow /></>}
                </button>
                <div className="privacy">7-day turnaround · We never contact your customers · Report yours to keep.</div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// FOOTER
// =====================================================================
function Footer() {
  return (
    <footer id="about">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a className="logo" href="#top" style={{ marginBottom: 16, display: "inline-flex" }}>
              <span className="logo-mark"><LogoMark /></span> VoxIQ
            </a>
            <p style={{ color: "var(--ink-2)", fontSize: 14, lineHeight: 1.5, maxWidth: 320, margin: "12px 0 0" }}>
              The operating system for customer feedback intelligence. Every interaction, ranked into a decision.
            </p>
          </div>
          <div>
            <h4>The loop</h4>
            <ul>
              <li><a href="#what">Identify</a></li>
              <li><a href="#what">Recommend</a></li>
              <li><a href="#what">Train</a></li>
              <li><a href="#what">Measure</a></li>
            </ul>
          </div>
          <div>
            <h4>Industries</h4>
            <ul>
              <li><a href="#industries">Healthcare</a></li>
              <li><a href="#industries">Home Services</a></li>
              <li><a href="#industries">Hospitality</a></li>
              <li><a href="#industries">Food & Beverage</a></li>
              <li><a href="#industries">Personal Care</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#about">Mission</a></li>
              <li><a href="#about">Security</a></li>
              <li><a href="#report">Free report</a></li>
              <li><a href="#about">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>
            <div className="mark-big mono">VoxIQ.</div>
            <div style={{ marginTop: 14 }}>© 2026 VoxIQ Inc.</div>
          </div>
          <div className="mono" style={{ textAlign: "right" }}>
            <div>↗ docs.voxiq.com</div>
            <div>↗ status.voxiq.com</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// =====================================================================
// TWEAKS
// =====================================================================
function VoxIQTweaks({ t, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection title="Brand">
        <TweakColor
          label="Accent"
          value={t.accent}
          options={["#e8553a", "#1a4dff", "#2d6a4f", "#c4a23a", "#8a2be2"]}
          onChange={(v) => { setTweak("accent", v); document.documentElement.style.setProperty("--accent", v); }}
        />
      </TweakSection>
      <TweakSection title="Hero">
        <TweakRadio
          label="Headline"
          value={t.headline}
          options={[
            { value: "italic-strike", label: "Italic" },
            { value: "plain", label: "Plain" },
            { value: "question", label: "Question" },
          ]}
          onChange={(v) => setTweak("headline", v)}
        />
      </TweakSection>
      <TweakSection title="Dental section">
        <TweakToggle label="Show 4-step flow" value={t.showFlow} onChange={(v) => setTweak("showFlow", v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

// =====================================================================
// APP
// =====================================================================
export default function App() {
  const [t, setT] = useState(TWEAK_DEFAULTS);

  const setTweak = (key, value) => {
    setT((current) => ({ ...current, [key]: value }));
  };
  //const [t, setTweak] = tweaks;

  useEffect(() => {
    if (t.accent) document.documentElement.style.setProperty("--accent", t.accent);
  }, [t.accent]);

  return (
    <>
      <Nav />
      <Hero headline={t.headline} />
      <WhatWeDo />
      <Industries showFlow={t.showFlow} />
      <ReportSnippet />
      <LeadForm />
      <Footer />
      {/* <VoxIQTweaks t={t} setTweak={setTweak} /> */}
    </>
  );
}

