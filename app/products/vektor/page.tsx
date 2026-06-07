'use client';

import { useEffect } from 'react';

// All requests go through the Next.js proxy to avoid CORS issues.
// The proxy forwards server-to-server to the Render backend.
const VEKTOR_PROXY = '/api/vektor';

export default function VektorPage() {
  useEffect(() => {
    // Handle Paystack redirect on page load
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') && params.get('ref')) {
      fetch(`${VEKTOR_PROXY}/billing/verify?ref=${params.get('ref')}`)
        .then((r) => r.json())
        .then((d) => {
          if (d.ok) {
            const qs = new URLSearchParams({ plan: d.plan || 'solo' });
            if (d.apiKey) qs.set('key', d.apiKey);
            window.location.href = `/products/vektor/success?${qs.toString()}`;
          }
        });
    }
    if (params.get('cancelled')) {
      const wrap = document.querySelector('.vektor-register-wrap');
      if (wrap) {
        wrap.insertAdjacentHTML(
          'afterbegin',
          `<div class="vk-error" style="display:block;">Payment cancelled — no charge was made.</div>`
        );
      }
    }
  }, []);

  return (
    <>
      <style>{`
        /* ── VEKTOR TOKENS ── */
        .vk { --vk-bg2:#0e1018; --vk-bg3:#151821; --vk-border:rgba(255,255,255,0.07);
               --vk-amber:#f4a61d; --vk-amber2:#ffcc5e; --vk-green:#30d97c;
               --vk-red:#ff5c5c; --vk-muted:#5a6072; --vk-text:#dde3f0; --vk-text2:#8b94a8;
               --vk-display:'Syne',sans-serif; --vk-mono:'DM Mono',monospace; }
        .vk { font-family:'DM Sans',sans-serif; font-size:15px; line-height:1.6; color:var(--vk-text); }
        .vk a { color:var(--vk-amber); text-decoration:none; }
        .vk * { box-sizing:border-box; }

        /* Layout */
        .vk-container { max-width:1080px; margin:0 auto; padding:0 24px; }
        .vk section { padding:96px 0; }

        /* Hero */
        .vk-hero { padding:80px 0 80px; position:relative; overflow:hidden; }
        .vk-hero-glow {
          position:absolute; top:-100px; left:50%; transform:translateX(-50%);
          width:800px; height:600px;
          background:radial-gradient(ellipse at center,rgba(244,166,29,0.08) 0%,transparent 70%);
          pointer-events:none;
        }
        .vk-hero-grid { display:grid; grid-template-columns:1fr 420px; gap:64px; align-items:center; }
        .vk-eyebrow {
          font-family:var(--vk-mono); font-size:11px; letter-spacing:3px;
          color:var(--vk-amber); text-transform:uppercase; margin-bottom:20px;
          display:flex; align-items:center; gap:10px;
        }
        .vk-eyebrow::before { content:''; display:block; width:24px; height:1px; background:var(--vk-amber); }
        .vk-h1 {
          font-family:var(--vk-display); font-size:clamp(36px,5vw,58px);
          font-weight:800; line-height:1.08; letter-spacing:-1px;
          color:#fff; margin-bottom:24px;
        }
        .vk-h1 span { color:var(--vk-amber); }
        .vk-sub { font-size:17px; color:var(--vk-text2); line-height:1.7; max-width:480px; margin-bottom:36px; }
        .vk-actions { display:flex; gap:12px; flex-wrap:wrap; }
        .vk-btn-primary {
          padding:13px 28px; background:var(--vk-amber); color:#000;
          font-family:var(--vk-display); font-weight:700; font-size:14px;
          border-radius:8px; border:none; cursor:pointer; transition:all 0.2s; letter-spacing:0.5px;
        }
        .vk-btn-primary:hover { background:var(--vk-amber2); transform:translateY(-1px); }
        .vk-btn-ghost {
          padding:13px 28px; background:transparent; color:var(--vk-text);
          font-size:14px; border-radius:8px; border:1px solid var(--vk-border); cursor:pointer; transition:all 0.2s;
        }
        .vk-btn-ghost:hover { border-color:var(--vk-amber); color:var(--vk-amber); }
        .vk-stats { display:flex; gap:32px; margin-top:48px; }
        .vk-stat-num { font-family:var(--vk-display); font-size:28px; font-weight:800; color:var(--vk-amber); }
        .vk-stat-lbl { font-size:12px; color:var(--vk-muted); letter-spacing:0.5px; }

        /* Hero card */
        .vk-hero-card {
          background:var(--vk-bg2); border:1px solid var(--vk-border);
          border-radius:16px; padding:28px; position:relative; overflow:hidden;
        }
        .vk-hero-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,var(--vk-amber),transparent);
        }
        .vk-card-label { font-family:var(--vk-mono); font-size:9px; letter-spacing:2px; color:var(--vk-muted); text-transform:uppercase; margin-bottom:14px; }
        .vk-card-niche { font-family:var(--vk-display); font-size:14px; font-weight:600; color:var(--vk-amber); line-height:1.4; margin-bottom:18px; }
        .vk-card-metrics { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:18px; }
        .vk-metric { background:var(--vk-bg3); border-radius:8px; padding:10px; text-align:center; }
        .vk-metric-val { font-family:var(--vk-display); font-size:16px; font-weight:700; }
        .vk-metric-val.green { color:var(--vk-green); }
        .vk-metric-val.amber { color:var(--vk-amber); }
        .vk-metric-lbl { font-size:9px; color:var(--vk-muted); letter-spacing:1px; text-transform:uppercase; margin-top:2px; }
        .vk-pain { font-size:12px; color:var(--vk-text2); line-height:1.5; }
        .vk-pain strong { display:block; margin-bottom:6px; font-family:var(--vk-mono); font-size:10px; letter-spacing:1px; color:var(--vk-muted); }
        .vk-pain-item { display:flex; align-items:flex-start; gap:8px; margin-bottom:6px; }
        .vk-pain-item::before { content:'⟶'; color:var(--vk-amber); font-size:11px; margin-top:2px; flex-shrink:0; }
        .vk-card-footer { margin-top:16px; padding-top:14px; border-top:1px solid var(--vk-border); display:flex; justify-content:space-between; align-items:center; }
        .vk-card-badge { font-family:var(--vk-mono); font-size:9px; padding:3px 8px; border-radius:4px; background:rgba(244,166,29,0.12); color:var(--vk-amber); letter-spacing:1px; }

        /* Section headers */
        .vk-tag { font-family:var(--vk-mono); font-size:10px; letter-spacing:3px; color:var(--vk-amber); text-transform:uppercase; margin-bottom:14px; }
        .vk-h2 { font-family:var(--vk-display); font-size:clamp(26px,3.5vw,38px); font-weight:800; color:#fff; line-height:1.15; margin-bottom:16px; }
        .vk-section-sub { font-size:16px; color:var(--vk-text2); max-width:540px; line-height:1.7; margin-bottom:56px; }

        /* Steps */
        .vk-steps { display:grid; grid-template-columns:repeat(5,1fr); gap:2px; }
        .vk-step { background:var(--vk-bg2); border:1px solid var(--vk-border); border-radius:12px; padding:28px 22px; transition:border-color 0.2s; }
        .vk-step:hover { border-color:rgba(244,166,29,0.3); }
        .vk-step-num { font-family:var(--vk-display); font-size:36px; font-weight:800; color:rgba(244,166,29,0.15); line-height:1; margin-bottom:14px; }
        .vk-step h3 { font-family:var(--vk-display); font-size:15px; font-weight:700; color:#fff; margin-bottom:8px; }
        .vk-step p { font-size:13px; color:var(--vk-text2); line-height:1.6; }

        /* Compare */
        .vk-compare-wrap { overflow-x:auto; }
        .vk-compare { width:100%; border-collapse:separate; border-spacing:2px; min-width:680px; }
        .vk-compare th { font-family:var(--vk-display); font-size:13px; font-weight:700; padding:14px 16px; text-align:left; background:var(--vk-bg2); border-radius:6px; white-space:nowrap; }
        .vk-compare th.vc { background:rgba(244,166,29,0.12); color:var(--vk-amber); }
        .vk-compare td { padding:11px 16px; font-size:13px; background:var(--vk-bg2); border-radius:4px; color:var(--vk-text2); vertical-align:middle; }
        .vk-compare td.rl { color:var(--vk-text); }
        .vk-compare td.vc { background:rgba(244,166,29,0.06); }
        .vk-tick { color:var(--vk-green); font-weight:500; }
        .vk-cross { color:var(--vk-muted); }
        .vk-partial { color:var(--vk-amber); }
        .vk-score { display:inline-block; font-family:var(--vk-display); font-size:18px; font-weight:800; color:var(--vk-amber); background:rgba(244,166,29,0.1); border-radius:6px; padding:4px 10px; }

        /* Wins/Gaps */
        .vk-two-col { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
        .vk-win-item { background:var(--vk-bg2); border:1px solid var(--vk-border); border-left:3px solid var(--vk-green); border-radius:8px; padding:18px 20px; margin-bottom:16px; }
        .vk-win-item h4 { font-family:var(--vk-display); font-size:14px; font-weight:700; color:#fff; margin-bottom:6px; }
        .vk-win-item p { font-size:13px; color:var(--vk-text2); line-height:1.6; }
        .vk-gap-item { background:var(--vk-bg2); border:1px solid var(--vk-border); border-left:3px solid var(--vk-amber); border-radius:8px; padding:18px 20px; margin-bottom:16px; }
        .vk-gap-item h4 { font-family:var(--vk-display); font-size:14px; font-weight:700; color:var(--vk-amber); margin-bottom:6px; }
        .vk-gap-item p { font-size:13px; color:var(--vk-text2); line-height:1.6; }

        /* Pricing */
        .vk-plans { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .vk-plan { background:var(--vk-bg2); border:1px solid var(--vk-border); border-radius:16px; padding:32px 28px; position:relative; transition:border-color 0.2s; }
        .vk-plan:hover { border-color:rgba(244,166,29,0.25); }
        .vk-plan.featured { border-color:var(--vk-amber); background:linear-gradient(160deg,rgba(244,166,29,0.08) 0%,var(--vk-bg2) 60%); }
        .vk-plan-badge { position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:var(--vk-amber); color:#000; font-size:11px; font-weight:700; padding:3px 14px; border-radius:20px; font-family:var(--vk-display); letter-spacing:1px; white-space:nowrap; }
        .vk-plan-name { font-family:var(--vk-mono); font-size:10px; letter-spacing:2px; color:var(--vk-muted); text-transform:uppercase; margin-bottom:10px; }
        .vk-plan-price { font-family:var(--vk-display); font-size:40px; font-weight:800; color:#fff; margin-bottom:4px; }
        .vk-plan-price sup { font-size:20px; vertical-align:top; margin-top:8px; color:var(--vk-text2); }
        .vk-plan-period { font-size:13px; color:var(--vk-muted); margin-bottom:24px; }
        .vk-plan-features { list-style:none; padding:0; margin-bottom:28px; }
        .vk-plan-features li { font-size:13px; color:var(--vk-text2); padding:6px 0; border-bottom:1px solid var(--vk-border); display:flex; align-items:center; gap:10px; }
        .vk-plan-features li:last-child { border-bottom:none; }
        .vk-plan-features li::before { content:'✓'; color:var(--vk-green); font-size:12px; flex-shrink:0; }
        .vk-plan-features li.dim::before { content:'–'; color:var(--vk-muted); }
        .vk-plan-features li.dim { color:var(--vk-muted); }
        .vk-plan-btn { width:100%; padding:13px; border:none; border-radius:8px; font-family:var(--vk-display); font-size:14px; font-weight:700; cursor:pointer; transition:all 0.2s; letter-spacing:0.5px; }
        .vk-plan-btn.primary { background:var(--vk-amber); color:#000; }
        .vk-plan-btn.primary:hover { background:var(--vk-amber2); }
        .vk-plan-btn.ghost { background:transparent; border:1px solid var(--vk-border); color:var(--vk-text); }
        .vk-plan-btn.ghost:hover { border-color:var(--vk-amber); color:var(--vk-amber); }

        /* Register */
        .vektor-register-wrap { max-width:520px; margin:0 auto; background:var(--vk-bg2); border:1px solid var(--vk-border); border-radius:20px; padding:48px 40px; position:relative; }
        .vektor-register-wrap::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,var(--vk-amber),transparent); border-radius:20px 20px 0 0; }
        .vk-form-label { font-family:var(--vk-mono); font-size:10px; letter-spacing:2px; color:var(--vk-muted); text-transform:uppercase; margin-bottom:8px; display:block; }
        .vk-form-input { width:100%; padding:13px 16px; background:var(--vk-bg3); border:1px solid var(--vk-border); border-radius:8px; color:var(--vk-text); font-family:'DM Sans',sans-serif; font-size:14px; outline:none; transition:border-color 0.2s; margin-bottom:16px; }
        .vk-form-input:focus { border-color:var(--vk-amber); }
        .vk-tabs { display:flex; gap:2px; background:var(--vk-bg3); border-radius:8px; padding:4px; margin-bottom:28px; }
        .vk-tab { flex:1; padding:8px; font-size:13px; border:none; background:none; color:var(--vk-text2); border-radius:6px; cursor:pointer; transition:all 0.15s; font-family:'DM Sans',sans-serif; }
        .vk-tab.active { background:var(--vk-bg2); color:var(--vk-text); }
        .vk-key-reveal { background:var(--vk-bg3); border:1px solid var(--vk-amber); border-radius:8px; padding:16px; font-family:var(--vk-mono); font-size:13px; color:var(--vk-amber); word-break:break-all; margin:16px 0; display:none; }
        .vk-key-reveal.visible { display:block; }
        .vk-error { font-size:12px; color:var(--vk-red); margin-bottom:12px; display:none; }
        .vk-error.visible { display:block; }
        .vk-success { font-size:13px; color:var(--vk-green); margin-bottom:12px; display:none; line-height:1.5; }
        .vk-success.visible { display:block; }
        .vk-copy-hint { font-size:11px; color:var(--vk-muted); text-align:center; margin-top:8px; }
        .vk-download-wrap { margin-top:16px; display:none; }
        .vk-download-wrap.visible { display:block; }
        .vk-download-btn {
          display:flex; align-items:center; justify-content:center; gap:10px;
          width:100%; padding:14px 24px; background:transparent;
          border:1px solid var(--vk-amber); border-radius:8px;
          color:var(--vk-amber); font-family:var(--vk-display); font-size:14px; font-weight:700;
          text-decoration:none; cursor:pointer; transition:all 0.2s; letter-spacing:0.5px;
        }
        .vk-download-btn:hover { background:rgba(244,166,29,0.1); transform:translateY(-1px); }
        .vk-download-hint { font-size:11px; color:var(--vk-muted); text-align:center; margin-top:8px; }

        /* Live dot */
        @keyframes vk-pulse { 0%,100%{opacity:1}50%{opacity:0.3} }
        .vk-live-dot { display:inline-block; width:6px; height:6px; background:var(--vk-green); border-radius:50%; animation:vk-pulse 2s infinite; margin-right:6px; }

        /* Responsive */
        @media(max-width:900px){
          .vk-hero-grid { grid-template-columns:1fr; }
          .vk-hero-card-wrap { display:none; }
          .vk-steps { grid-template-columns:repeat(2,1fr); }
          .vk-two-col { grid-template-columns:1fr; }
          .vk-plans { grid-template-columns:1fr; }
        }
        @media(max-width:560px){
          .vk-steps { grid-template-columns:1fr; }
          .vektor-register-wrap { padding:32px 24px; }
        }
      `}</style>

      <div className="vk">

        {/* ── HERO ── */}
        <section className="vk-hero" style={{ background: '#08090c' }}>
          <div className="vk-container">
            <div className="vk-hero-glow" />
            <div className="vk-hero-grid">
              <div>
                <div className="vk-eyebrow">
                  <span className="vk-live-dot" />
                  Live market intelligence
                </div>
                <h1 className="vk-h1">
                  Find your next<br /><span>bestselling ebook</span><br />before anyone else
                </h1>
                <p className="vk-sub">
                  Vektor autonomously sweeps Amazon Kindle and Google for real buyer intent —
                  then delivers competitor BSR data, niche revenue economics, keyword validation,
                  KDP category fit, Amazon Ads packs, and a complete publishing brief.
                  No seed keywords. No guesswork.
                </p>
                <div className="vk-actions">
                  <button className="vk-btn-primary" onClick={() => document.getElementById('vk-register')?.scrollIntoView({ behavior: 'smooth' })}>
                    Get free API key →
                  </button>
                  <button className="vk-btn-ghost" onClick={() => document.getElementById('vk-compare')?.scrollIntoView({ behavior: 'smooth' })}>
                    See how it compares
                  </button>
                </div>
                <div className="vk-stats">
                  <div><div className="vk-stat-num">11</div><div className="vk-stat-lbl">Niche modes</div></div>
                  <div><div className="vk-stat-num">2×</div><div className="vk-stat-lbl">Daily auto sweeps</div></div>
                  <div><div className="vk-stat-num">60s</div><div className="vk-stat-lbl">Signal to brief</div></div>
                </div>
              </div>

              <div className="vk-hero-card-wrap">
                <div className="vk-hero-card">
                  <div className="vk-card-label">⚡ Latest sweep result</div>
                  <div className="vk-card-niche">AI-Powered Job Search Strategies: Free Tools &amp; Workflows for First-Time Tech Applicants</div>
                  <div className="vk-card-metrics">
                    <div className="vk-metric"><div className="vk-metric-val amber">8/10</div><div className="vk-metric-lbl">Revenue band</div></div>
                    <div className="vk-metric"><div className="vk-metric-val green">5G·3A</div><div className="vk-metric-lbl">Keywords</div></div>
                    <div className="vk-metric"><div className="vk-metric-val amber">7/10</div><div className="vk-metric-lbl">Category fit</div></div>
                  </div>
                  <div className="vk-pain">
                    <strong>Included in every sweep</strong>
                    <div className="vk-pain-item">Niche revenue band — page-1 units, royalty range, conquest ASINs</div>
                    <div className="vk-pain-item">Keyword traffic lights + KDP category paths (primary/secondary)</div>
                    <div className="vk-pain-item">Competitor BSR table, ads pack, pain points, outline, manuscript prompt</div>
                  </div>
                  <div className="vk-card-footer">
                    <span className="vk-card-badge">Amazon KDP</span>
                    <span style={{ fontFamily: 'DM Mono,monospace', fontSize: 10, color: 'var(--vk-muted)' }}>NICHE:ai-automation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="vk-how" style={{ background: '#0e1018', padding: '96px 0' }}>
          <div className="vk-container">
            <div className="vk-tag">The pipeline</div>
            <h2 className="vk-h2">From zero to publishable brief<br />in under 60 seconds</h2>
            <p className="vk-section-sub">Five automated stages — discovery, validation, scoring, market intel, and LLM synthesis. No manual research. No typing seed keywords.</p>
            <div className="vk-steps">
              <div className="vk-step"><div className="vk-step-num">01</div><h3>Kindle Sweep</h3><p>Amazon autocomplete across your niche letter-space — capturing real buyer searches with zero seed input.</p></div>
              <div className="vk-step"><div className="vk-step-num">02</div><h3>Google Validation</h3><p>Every signal cross-checked on Google Suggest. Only dual-platform confirmed topics advance.</p></div>
              <div className="vk-step"><div className="vk-step-num">03</div><h3>Opportunity Scoring</h3><p>Demand × intent × competition. Top signals unlock premium SerpApi PAA for deeper buyer questions.</p></div>
              <div className="vk-step"><div className="vk-step-num">04</div><h3>Market Intel</h3><p>Competitor BSR, sweet-spot verdict, niche revenue band (P1), keyword validation (P2), category fit (P3) — Rainforest + SerpApi on Solo/Pro.</p></div>
              <div className="vk-step"><div className="vk-step-num">05</div><h3>Publishing Brief</h3><p>Pain points, outline, 3 titles, Amazon Ads pack (7 backend + PPC + ASINs), and a ready-to-paste manuscript prompt.</p></div>
            </div>
          </div>
        </section>

        {/* ── COMPARE ── */}
        <section id="vk-compare" style={{ padding: '96px 0' }}>
          <div className="vk-container">
            <div className="vk-tag">Honest comparison</div>
            <h2 className="vk-h2">Vektor vs. the existing<br />KDP research stack</h2>
            <p className="vk-section-sub">Benchmarked against Publisher Rocket, KDSpy, and Book Bolt — the tools KDP publishers actually use. Scores reflect discovery depth, intel breadth, and time-to-publishable output.</p>

            <div className="vk-compare-wrap">
              <table className="vk-compare">
                <thead>
                  <tr>
                    <th style={{ width: '34%' }}>Capability</th>
                    <th className="vc">⚡ Vektor</th>
                    <th>Publisher Rocket</th>
                    <th>KDSpy</th>
                    <th>Book Bolt</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="rl">Zero-seed autonomous discovery</td><td className="vc"><span className="vk-tick">✓ Unique</span></td><td><span className="vk-cross">✗ Seed required</span></td><td><span className="vk-cross">✗ Browse-first</span></td><td><span className="vk-cross">✗ Seed required</span></td></tr>
                  <tr><td className="rl">Live competitor BSR table</td><td className="vc"><span className="vk-tick">✓ Premium</span></td><td><span className="vk-tick">✓ Best-in-class</span></td><td><span className="vk-tick">✓ Real-time</span></td><td><span className="vk-partial">~ Partial</span></td></tr>
                  <tr><td className="rl">Market-entry sweet-spot verdict</td><td className="vc"><span className="vk-tick">✓ Scored</span></td><td><span className="vk-cross">✗</span></td><td><span className="vk-cross">✗</span></td><td><span className="vk-cross">✗</span></td></tr>
                  <tr><td className="rl">Niche revenue band (page-1 economics)</td><td className="vc"><span className="vk-tick">✓ P1</span></td><td><span className="vk-partial">~ Per-keyword est.</span></td><td><span className="vk-partial">~ Page revenue</span></td><td><span className="vk-cross">✗</span></td></tr>
                  <tr><td className="rl">Keyword validation (traffic lights)</td><td className="vc"><span className="vk-tick">✓ P2</span></td><td><span className="vk-tick">✓ + volume</span></td><td><span className="vk-partial">~ Basic</span></td><td><span className="vk-partial">~ Basic</span></td></tr>
                  <tr><td className="rl">KDP category fit (primary/secondary)</td><td className="vc"><span className="vk-tick">✓ P3</span></td><td><span className="vk-tick">✓ 16k+ browser</span></td><td><span className="vk-partial">~ Basic</span></td><td><span className="vk-tick">✓ LCB focus</span></td></tr>
                  <tr><td className="rl">Amazon Ads pack (backend + PPC + ASINs)</td><td className="vc"><span className="vk-tick">✓ Export-ready</span></td><td><span className="vk-partial">~ AMS seeds only</span></td><td><span className="vk-cross">✗</span></td><td><span className="vk-cross">✗</span></td></tr>
                  <tr><td className="rl">LLM pain-point synthesis</td><td className="vc"><span className="vk-tick">✓ Ranked brief</span></td><td><span className="vk-cross">✗</span></td><td><span className="vk-cross">✗</span></td><td><span className="vk-cross">✗</span></td></tr>
                  <tr><td className="rl">Outline + titles + manuscript prompt</td><td className="vc"><span className="vk-tick">✓ One step</span></td><td><span className="vk-cross">✗</span></td><td><span className="vk-cross">✗</span></td><td><span className="vk-cross">✗</span></td></tr>
                  <tr><td className="rl">Fiction &amp; children&apos;s analyst modes</td><td className="vc"><span className="vk-tick">✓ Dedicated</span></td><td><span className="vk-partial">~ General</span></td><td><span className="vk-partial">~ General</span></td><td><span className="vk-partial">~ Low-content focus</span></td></tr>
                  <tr><td className="rl">BSR history &amp; trend curves</td><td className="vc"><span className="vk-cross">P4 roadmap</span></td><td><span className="vk-partial">~ Static</span></td><td><span className="vk-tick">✓ Real-time</span></td><td><span className="vk-cross">✗</span></td></tr>
                  <tr><td className="rl">Scheduled autonomous sweeps</td><td className="vc"><span className="vk-tick">✓ 2× daily</span></td><td><span className="vk-cross">✗</span></td><td><span className="vk-cross">✗</span></td><td><span className="vk-cross">✗</span></td></tr>
                  <tr><td className="rl">Feedback learning loop</td><td className="vc"><span className="vk-tick">✓</span></td><td><span className="vk-cross">✗</span></td><td><span className="vk-cross">✗</span></td><td><span className="vk-cross">✗</span></td></tr>
                  <tr><td className="rl">Pricing</td><td className="vc" style={{ color: 'var(--vk-amber)', fontWeight: 500 }}>Free · $19 · $39/mo</td><td>$97–199 once</td><td>~$47–69 once</td><td>$10–20/mo</td></tr>
                  <tr><td className="rl">Overall score*</td><td className="vc"><span className="vk-score">93</span></td><td><span style={{ fontWeight: 600 }}>78</span></td><td><span style={{ fontWeight: 600 }}>71</span></td><td><span style={{ fontWeight: 600 }}>65</span></td></tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 11, color: 'var(--vk-muted)', marginTop: 12, fontFamily: 'DM Mono,monospace' }}>*Weighted: discovery autonomy (30%), validation depth (25%), brief quality (25%), workflow speed (20%). Vektor P1–P3 closes the Rocket validation gap; Rocket still leads on search volume numbers and category node browsing.</p>

            <div style={{ marginTop: 64 }}>
              <div className="vk-two-col">
                <div>
                  <div className="vk-tag" style={{ marginBottom: 20 }}>Where Vektor wins</div>
                  <div className="vk-win-item"><h4>Zero-seed discovery</h4><p>Publisher Rocket, KDSpy, and Book Bolt all start from a keyword or Amazon page you already found. Vektor sweeps the full niche space autonomously — surfacing opportunities you would never have thought to search.</p></div>
                  <div className="vk-win-item"><h4>Discover → validate → brief in one sweep</h4><p>Competitors give keyword spreadsheets. Vektor delivers P1 niche revenue economics, P2 keyword traffic lights, P3 category fit, a BSR table, sweet-spot verdict, ads pack, pain points, outline, titles, and a manuscript prompt — in one pass.</p></div>
                  <div className="vk-win-item"><h4>Gets smarter with use</h4><p>Thumbs up reinforces signal patterns. Thumbs down blocks noise permanently. Per-user diversity spreads concurrent users across 12 sub-niche angles. No other KDP tool combines a feedback loop with autonomous discovery.</p></div>
                </div>
                <div>
                  <div className="vk-tag" style={{ marginBottom: 20 }}>Honest gaps</div>
                  <div className="vk-gap-item"><h4>Premium Amazon data on paid plans</h4><p>Live BSR via Rainforest API is Solo/Pro only. Free tier uses Google Books catalog fallback — useful, but not the same as page-1 Amazon Kindle rankings.</p></div>
                  <div className="vk-gap-item"><h4>Category browser vs category fit</h4><p>P3 recommends primary/secondary KDP paths with fit scores. Publisher Rocket still wins for browsing 16,000+ category nodes and exact search-volume numbers.</p></div>
                  <div className="vk-gap-item"><h4>Coming in P4–P5</h4><p>BSR history curves (Keepa-style) and an Amazon Lens overlay while browsing are on the roadmap. Use KDSpy today for live on-page competitor spying between sweeps.</p></div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 56, background: 'var(--vk-bg2)', border: '1px solid var(--vk-border)', borderLeft: '3px solid var(--vk-amber)', borderRadius: 12, padding: '28px 32px' }}>
              <p style={{ fontSize: 17, color: 'var(--vk-text)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 10 }}>&ldquo;Use Vektor to discover what to write, validate revenue and keywords (P1–P3), and export your ads pack. Use Publisher Rocket for deep category browsing and search volume. Use KDSpy while on Amazon to spy live competitors. Three tools, one workflow.&rdquo;</p>
              <p style={{ fontSize: 12, color: 'var(--vk-muted)', fontFamily: 'DM Mono,monospace', letterSpacing: 1 }}>— RECOMMENDED WORKFLOW FOR SERIOUS KDP PUBLISHERS</p>
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="vk-pricing" style={{ background: '#0e1018', padding: '96px 0' }}>
          <div className="vk-container">
            <div className="vk-tag">Simple pricing</div>
            <h2 className="vk-h2">Start free.<br />Scale when you&apos;re ready.</h2>
            <p className="vk-section-sub">No credit card required to start. Upgrade when the free tier isn&apos;t enough.</p>
            <div className="vk-plans">
              <div className="vk-plan">
                <div className="vk-plan-name">Free</div>
                <div className="vk-plan-price"><sup>$</sup>0</div>
                <div className="vk-plan-period">forever</div>
                <ul className="vk-plan-features">
                  <li>3 sweeps per month</li>
                  <li>11 niche modes (9 auto + fiction + children&apos;s)</li>
                  <li>Full LLM publishing brief</li>
                  <li>Heuristic keyword validation (P2)</li>
                  <li>Heuristic category fit (P3)</li>
                  <li>Google Books competitor fallback</li>
                  <li className="dim">Live Amazon BSR + revenue band (P1)</li>
                  <li className="dim">Amazon Ads keyword pack</li>
                  <li className="dim">Live catalog counts (SerpApi)</li>
                </ul>
                <button className="vk-plan-btn ghost" onClick={() => document.getElementById('vk-register')?.scrollIntoView({ behavior: 'smooth' })}>Get started free</button>
              </div>
              <div className="vk-plan featured">
                <div className="vk-plan-badge">Most Popular</div>
                <div className="vk-plan-name">Solo</div>
                <div className="vk-plan-price"><sup>$</sup>19</div>
                <div className="vk-plan-period">per month</div>
                <ul className="vk-plan-features">
                  <li>40 sweeps per month</li>
                  <li>Everything in Free</li>
                  <li>Live competitor BSR table (Rainforest)</li>
                  <li>Niche revenue band — units &amp; royalty range (P1)</li>
                  <li>Keyword validation with live catalog counts (P2)</li>
                  <li>Category fit + Rainforest refinements (P3)</li>
                  <li>Market-entry sweet-spot verdict</li>
                  <li>Amazon Ads pack — 7 backend + PPC + ASINs</li>
                  <li>Sweep history + feedback learning</li>
                </ul>
                <button className="vk-plan-btn primary" onClick={() => startCheckout('solo')}>Upgrade to Solo →</button>
              </div>
              <div className="vk-plan">
                <div className="vk-plan-name">Pro</div>
                <div className="vk-plan-price"><sup>$</sup>39</div>
                <div className="vk-plan-period">per month</div>
                <ul className="vk-plan-features">
                  <li>Unlimited sweeps</li>
                  <li>Everything in Solo</li>
                  <li>Priority LLM inference</li>
                  <li>Real-time SSE pipeline streaming</li>
                  <li>Full sweep history</li>
                  <li>Early feature access</li>
                </ul>
                <button className="vk-plan-btn ghost" onClick={() => startCheckout('pro')}>Upgrade to Pro →</button>
              </div>
            </div>
          </div>
        </section>

        {/* ── REGISTER ── */}
        <section id="vk-register" style={{ padding: '96px 0' }}>
          <div className="vk-container">
            <div className="vk-tag" style={{ textAlign: 'center' }}>Get started</div>
            <h2 className="vk-h2" style={{ textAlign: 'center', marginBottom: 12 }}>Your API key in 10 seconds</h2>
            <p style={{ textAlign: 'center', color: 'var(--vk-text2)', marginBottom: 48 }}>Enter your email. Copy your key. Paste it into the Chrome extension. Done.</p>

            <div className="vektor-register-wrap">
              <div className="vk-tabs">
                <button className="vk-tab active" id="vk-tab-reg" onClick={() => showTab('reg')}>Register Free</button>
                <button className="vk-tab" id="vk-tab-login" onClick={() => showTab('login')}>Retrieve Key</button>
              </div>

              <div id="vk-panel-reg">
                <label className="vk-form-label">Email address</label>
                <input type="email" className="vk-form-input" id="vk-reg-email" placeholder="you@example.com" autoComplete="email" />
                <div className="vk-error" id="vk-reg-error" />
                <div className="vk-success" id="vk-reg-success" />
                <div className="vk-key-reveal" id="vk-reg-key" />
                <div className="vk-copy-hint" id="vk-reg-copy-hint" style={{ display: 'none' }}>
                  <button onClick={copyKey} style={{ color: 'var(--vk-amber)', background: 'none', border: '1px solid var(--vk-border)', borderRadius: 6, padding: '8px 20px', cursor: 'pointer', fontSize: 13, width: '100%', marginBottom: 8 }}>📋 Copy API key</button>
                  Paste this key into the Vektor Chrome extension when prompted.
                </div>
                <button className="vk-plan-btn primary" id="vk-reg-btn" onClick={doRegister} style={{ marginTop: 4 }}>Generate free API key →</button>
                <div className="vk-download-wrap" id="vk-reg-download">
                  <a id="vk-reg-download-btn" href="#" className="vk-download-btn" target="_blank" rel="noopener noreferrer">
                    ⬇ Download Vektor Extension
                  </a>
                  <p className="vk-download-hint">Chrome extension (.zip) — load it unpacked in chrome://extensions</p>
                </div>
              </div>

              <div id="vk-panel-login" style={{ display: 'none' }}>
                <label className="vk-form-label">Email address</label>
                <input type="email" className="vk-form-input" id="vk-login-email" placeholder="you@example.com" autoComplete="email" />
                <div className="vk-error" id="vk-login-error" />
                <div className="vk-success" id="vk-login-success" />
                <div className="vk-key-reveal" id="vk-login-key" />
                <div className="vk-copy-hint" id="vk-login-copy-hint" style={{ display: 'none' }}>
                  <button onClick={copyLoginKey} style={{ color: 'var(--vk-amber)', background: 'none', border: '1px solid var(--vk-border)', borderRadius: 6, padding: '8px 20px', cursor: 'pointer', fontSize: 13, width: '100%', marginBottom: 8 }}>📋 Copy API key</button>
                </div>
                <button className="vk-plan-btn primary" id="vk-login-btn" onClick={doLogin}>Retrieve my key →</button>
                <div className="vk-download-wrap" id="vk-login-download">
                  <a id="vk-login-download-btn" href="#" className="vk-download-btn" target="_blank" rel="noopener noreferrer">
                    ⬇ Download Vektor Extension
                  </a>
                  <p className="vk-download-hint">Chrome extension (.zip) — load it unpacked in chrome://extensions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

/* ── Client-side logic ── */
declare global { interface Window { __vk_key?: string; __vk_login_key?: string; } }

function showTab(t: 'reg' | 'login') {
  const panelReg   = document.getElementById('vk-panel-reg');
  const panelLogin = document.getElementById('vk-panel-login');
  const tabReg     = document.getElementById('vk-tab-reg');
  const tabLogin   = document.getElementById('vk-tab-login');
  if (!panelReg || !panelLogin || !tabReg || !tabLogin) return;
  panelReg.style.display   = t === 'reg'   ? 'block' : 'none';
  panelLogin.style.display = t === 'login' ? 'block' : 'none';
  tabReg.className   = 'vk-tab' + (t === 'reg'   ? ' active' : '');
  tabLogin.className = 'vk-tab' + (t === 'login' ? ' active' : '');
}

async function doRegister() {
  const emailEl = document.getElementById('vk-reg-email') as HTMLInputElement;
  const errEl   = document.getElementById('vk-reg-error')!;
  const sucEl   = document.getElementById('vk-reg-success')!;
  const keyEl   = document.getElementById('vk-reg-key')!;
  const btn     = document.getElementById('vk-reg-btn') as HTMLButtonElement;
  const hintEl  = document.getElementById('vk-reg-copy-hint')!;
  const email   = emailEl?.value.trim() ?? '';
  errEl.className = 'vk-error'; sucEl.className = 'vk-success';
  if (!email || !email.includes('@')) { errEl.textContent = 'Please enter a valid email.'; errEl.className = 'vk-error visible'; return; }
  btn.disabled = true; btn.textContent = 'Generating...';
  try {
    const res  = await fetch(`${VEKTOR_PROXY}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
    const data = await res.json();
    if (!res.ok) { errEl.textContent = data.error || 'Registration failed.'; errEl.className = 'vk-error visible'; return; }
    keyEl.textContent = data.apiKey; keyEl.className = 'vk-key-reveal visible';
    window.__vk_key = data.apiKey;
    hintEl.style.display = 'block';
    sucEl.textContent = data.isNew ? '✓ API key generated! Copy it and paste into the extension.' : '✓ You already have an account — here is your existing key.';
    sucEl.className = 'vk-success visible';
    // Show download button
    const dlWrap = document.getElementById('vk-reg-download');
    const dlBtn  = document.getElementById('vk-reg-download-btn') as HTMLAnchorElement;
    if (dlWrap && dlBtn) {
      dlBtn.href = `https://vektor-xr-1.onrender.com/auth/download?key=${encodeURIComponent(data.apiKey)}`;
      dlWrap.className = 'vk-download-wrap visible';
    }
  } catch(err: unknown) {
    const msg = err instanceof Error ? err.message : 'Network error';
    errEl.textContent = `${msg} — please try again.`;
    errEl.className = 'vk-error visible';
    console.error('[Vektor register]', err);
  }
  finally { btn.disabled = false; btn.textContent = 'Generate free API key →'; }
}

async function doLogin() {
  const emailEl = document.getElementById('vk-login-email') as HTMLInputElement;
  const errEl   = document.getElementById('vk-login-error')!;
  const sucEl   = document.getElementById('vk-login-success')!;
  const keyEl   = document.getElementById('vk-login-key')!;
  const btn     = document.getElementById('vk-login-btn') as HTMLButtonElement;
  const hintEl  = document.getElementById('vk-login-copy-hint')!;
  const email   = emailEl?.value.trim() ?? '';
  errEl.className = 'vk-error';
  if (!email) { errEl.textContent = 'Please enter your email.'; errEl.className = 'vk-error visible'; return; }
  btn.disabled = true; btn.textContent = 'Looking up...';
  try {
    const res  = await fetch(`${VEKTOR_PROXY}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
    const data = await res.json();
    if (!res.ok) { errEl.textContent = data.error || 'Not found.'; errEl.className = 'vk-error visible'; return; }
    keyEl.textContent = data.apiKey; keyEl.className = 'vk-key-reveal visible';
    window.__vk_login_key = data.apiKey;
    hintEl.style.display = 'block';
    sucEl.textContent = '✓ Here is your API key.'; sucEl.className = 'vk-success visible';
    // Show download button
    const dlWrap = document.getElementById('vk-login-download');
    const dlBtn  = document.getElementById('vk-login-download-btn') as HTMLAnchorElement;
    if (dlWrap && dlBtn) {
      dlBtn.href = `https://vektor-xr-1.onrender.com/auth/download?key=${encodeURIComponent(data.apiKey)}`;
      dlWrap.className = 'vk-download-wrap visible';
    }
  } catch { errEl.textContent = 'Network error.'; errEl.className = 'vk-error visible'; }
  finally { btn.disabled = false; btn.textContent = 'Retrieve my key →'; }
}

async function startCheckout(plan: string) {
  const email = prompt('Enter your registered email address:');
  if (!email) return;
  try {
    const res  = await fetch(`${VEKTOR_PROXY}/billing/checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email.trim(), plan }) });
    const data = await res.json();
    if (!res.ok) { alert(data.error || 'Checkout failed. Please register first.'); return; }
    window.location.href = data.url;
  } catch { alert('Could not connect. Please try again.'); }
}

function copyKey()      { navigator.clipboard.writeText(window.__vk_key ?? '').then(() => alert('API key copied!')); }
function copyLoginKey() { navigator.clipboard.writeText(window.__vk_login_key ?? '').then(() => alert('API key copied!')); }
