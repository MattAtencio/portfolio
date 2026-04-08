// Static rendering only. No state, no API.

const fmt = {
  usd(cents) {
    const n = cents / 100;
    if (Math.abs(n) >= 1e9) return (n / 1e9).toFixed(2) + "B";
    if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(1) + "M";
    if (Math.abs(n) >= 1e3) return (n / 1e3).toFixed(1) + "K";
    return n.toFixed(0);
  },
  usdFull(cents) {
    return "$" + (cents / 100).toLocaleString("en-US", { maximumFractionDigits: 0 });
  },
  signed(cents) {
    const s = cents >= 0 ? "+" : "-";
    return s + "$" + fmt.usd(Math.abs(cents));
  },
};

function tabSwitch(name) {
  document.querySelectorAll("#surface-inst .tab").forEach(t => t.classList.toggle("active", t.dataset.tab === name));
  document.querySelectorAll("#surface-inst .tabpanel").forEach(p => p.classList.toggle("active", p.id === "tab-" + name));
}

function adminTabSwitch(name) {
  document.querySelectorAll("#surface-adminsurface .tab").forEach(t => t.classList.toggle("active", t.dataset.admintab === name));
  document.querySelectorAll("#surface-adminsurface .tabpanel").forEach(p => p.classList.toggle("active", p.id === "atab-" + name));
}

function surfaceSwitch(name) {
  document.querySelectorAll(".surface-switcher .surface").forEach(s => s.classList.toggle("active", s.dataset.surface === name));
  document.querySelectorAll(".surface-pane").forEach(p => p.classList.toggle("active", p.id === "surface-" + name));
  document.body.classList.toggle("surface-admin", name === "adminsurface");
}

function setupPersona() {
  const sel = document.getElementById("persona");
  sel.addEventListener("change", () => {
    const persona = SEED.personas[sel.value];
    // CCO sees the read-only audit viewer tab; trader/controller hide it
    const ccoTab = document.querySelector('[data-tab="cco"]');
    if (ccoTab) ccoTab.style.display = sel.value === "cco" ? "" : "none";
    tabSwitch(persona.default_tab);
  });
}

function renderKPIs() {
  const k = SEED.kpis;
  const headroomCls = k.egrrcpa_headroom_pct >= 40 ? "good" : k.egrrcpa_headroom_pct >= 20 ? "warn" : "bad";
  const el = document.getElementById("kpis");
  el.innerHTML = `
    <div class="kpi good">
      <div class="label">Total Deposits</div>
      <div class="value">$${fmt.usd(k.total_deposits_cents)}</div>
      <div class="delta">across 12,400 accounts</div>
    </div>
    <div class="kpi">
      <div class="label">Reciprocal Placed</div>
      <div class="value">$${fmt.usd(k.reciprocal_placed_cents)}</div>
      <div class="delta">22.6% of deposits on network</div>
    </div>
    <div class="kpi bad">
      <div class="label">At-Risk Uninsured</div>
      <div class="value">$${fmt.usd(k.at_risk_uninsured_cents)}</div>
      <div class="delta neg">6 depositors above 80% of ceiling</div>
    </div>
    <div class="kpi warn">
      <div class="label">Intraday Net Flow</div>
      <div class="value">${fmt.signed(k.intraday_net_cents)}</div>
      <div class="delta neg">accelerating outflow last 90m</div>
    </div>
    <div class="kpi ${headroomCls}">
      <div class="label">EGRRCPA Headroom</div>
      <div class="value">$${fmt.usd(k.egrrcpa_headroom_cents)}</div>
      <div class="delta">${k.egrrcpa_headroom_pct}% of cap · lesser of $5B / 20% liab.</div>
    </div>
  `;
}

function renderCompliance() {
  const el = document.getElementById("compliance-lane");
  if (!el) return;
  const rows = SEED.compliance.map(c => `
    <tr>
      <td>${c.item}</td>
      <td><span class="pill ${c.color}">${c.status}</span></td>
    </tr>
  `).join("");
  el.innerHTML = `<table><tbody>${rows}</tbody></table>`;
}

function renderSparkline() {
  const data = SEED.intraday;
  const w = 720, h = 80, pad = 4;
  const min = Math.min(...data), max = Math.max(...data);
  const rng = (max - min) || 1;
  const stepX = (w - pad * 2) / (data.length - 1);
  const pts = data.map((v, i) => {
    const x = pad + i * stepX;
    const y = pad + (1 - (v - min) / rng) * (h - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const zeroY = pad + (1 - (0 - min) / rng) * (h - pad * 2);
  document.getElementById("spark").innerHTML = `
    <svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}">
      <line x1="0" y1="${zeroY}" x2="${w}" y2="${zeroY}" stroke="#1f2c4a" stroke-dasharray="2,3"/>
      <polyline points="${pts}" fill="none" stroke="#fbbf24" stroke-width="1.6"/>
    </svg>
  `;
}

function renderAtRisk() {
  const rows = SEED.accounts_at_risk.map(r => {
    const netGap = r.bal - r.network_ins;
    const action = r.action === "sweep_to_network" ? "Sweep to network"
                  : r.action === "split_account" ? "Split account" : "—";
    const gapColor = netGap > 0 ? "var(--red)" : "var(--green)";
    const gapDisplay = netGap > 0 ? fmt.usdFull(netGap) : "0";
    return `<tr>
      <td>${r.depositor}</td>
      <td class="num">${fmt.usdFull(r.bal)}</td>
      <td class="num">${fmt.usdFull(r.ins)}</td>
      <td class="num">${fmt.usdFull(r.network_ins)}<div class="muted" style="font-size:10px">across ${r.network_insts} inst</div></td>
      <td class="num" style="color:${gapColor}">${gapDisplay}</td>
      <td><span class="pill amber">${action}</span></td>
    </tr>`;
  }).join("");
  document.getElementById("at-risk").innerHTML = `
    <table>
      <thead><tr>
        <th>Depositor</th>
        <th class="num">Balance</th>
        <th class="num">Insured (this inst)</th>
        <th class="num">Network Insured</th>
        <th class="num">Net Gap</th>
        <th>Suggested action</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="muted mt">
      Tier 2.1 unblocked the network-aggregated insured column (gap #1 in
      <code>07-known-gaps.md</code>) — coverage is now per-depositor across every
      institution in the network, not per-account on this institution.
    </div>
  `;
}

function renderPositionGraph() {
  const el = document.getElementById("position-graph");
  if (!el) return;
  const g = SEED.position_graph;
  const w = 640, h = 380;

  // Build node lookup
  const nodes = {};
  g.nodes.forEach(n => { nodes[n.id] = n; });

  // Render edges as curved arrows. Bidirectional pairs get separated curves.
  const edgeSvg = g.edges.map((e, i) => {
    const from = nodes[e.from], to = nodes[e.to];
    // Curve offset: alternate sides for parallel/reverse edges
    const dx = to.x - from.x, dy = to.y - from.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const nx = -dy / dist, ny = dx / dist; // normal
    const offset = 18;
    const cx = (from.x + to.x) / 2 + nx * offset;
    const cy = (from.y + to.y) / 2 + ny * offset;
    // Shrink endpoints so arrow doesn't overlap node box
    const shrinkF = 56, shrinkT = 64;
    const ux = (to.x - from.x) / dist, uy = (to.y - from.y) / dist;
    const sx = from.x + ux * shrinkF, sy = from.y + uy * shrinkF;
    const ex = to.x - ux * shrinkT, ey = to.y - uy * shrinkT;
    const path = `M ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}`;
    const labelX = cx, labelY = cy - 4;
    return `
      <path d="${path}" class="edge-line"/>
      <text x="${labelX}" y="${labelY}" class="edge-label">$${fmt.usd(e.amount_cents)} @ ${(e.rate_bps/100).toFixed(2)}% · ${e.term_days}d</text>
    `;
  }).join("");

  const nodeSvg = g.nodes.map(n => {
    const cls = n.regulator === "FDIC" ? "fdic" : "ncua";
    const lines = n.label.split("\n");
    const labelSvg = lines.map((line, i) =>
      `<text x="${n.x}" y="${n.y - 8 + i * 14}" class="node-label">${line}</text>`
    ).join("");
    return `
      <rect class="node-bg ${cls}" x="${n.x - 60}" y="${n.y - 32}" width="120" height="64" rx="6"/>
      ${labelSvg}
      <text x="${n.x}" y="${n.y + 22}" class="node-sub">${n.regulator}</text>
    `;
  }).join("");

  el.classList.add("position-graph");
  el.innerHTML = `
    <svg viewBox="0 0 ${w} ${h}">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#5eead4"/>
        </marker>
      </defs>
      ${edgeSvg}
      ${nodeSvg}
    </svg>
  `;
}

function renderNettedTable() {
  const el = document.getElementById("netted-table");
  if (!el) return;
  const rows = SEED.position_graph.netted.map(n => `
    <tr>
      <td>${n.a}</td>
      <td class="num">${n.gross}</td>
      <td class="num" style="color:var(--accent)">$${fmt.usd(n.net_cents)}</td>
    </tr>
  `).join("");
  el.innerHTML = `
    <table>
      <thead><tr><th>Pair</th><th class="num">Gross (each direction)</th><th class="num">Net</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderSettlementRouting() {
  const el = document.getElementById("settlement-routing");
  if (!el) return;
  const r = SEED.settlement_routing;
  const partner = `
    <div class="partner-bank-card">
      <div>
        <div class="pb-title">${r.partner_bank.legal_name}</div>
        <div class="pb-meta">ABA ${r.partner_bank.aba} · ${r.partner_bank.master_account}</div>
      </div>
      <div class="pb-meta">${r.partner_bank.role}</div>
    </div>
  `;
  const rows = r.routes.map(rt => {
    const isVia = rt.path === "via_partner";
    const cls = isVia ? "via" : "direct";
    const middle = isVia
      ? `<div class="arrow">→</div><div class="partner-bank">via ${r.partner_bank.legal_name.split(" ")[0]}</div>`
      : `<div class="arrow">────────────</div><div></div>`;
    return `
      <div class="routing-row ${cls}">
        <div>
          <div class="inst-name">${rt.institution}</div>
          <div class="inst-meta">${rt.type === "bank" ? "Bank" : "Credit Union"} · ${rt.regulator}</div>
        </div>
        ${middle}
        <div class="rail">${rt.rail}</div>
      </div>
    `;
  }).join("");
  el.innerHTML = `
    ${partner}
    <div class="settlement-routing">${rows}</div>
  `;
}

function subtabSwitch(name) {
  document.querySelectorAll(".subtab").forEach(t => t.classList.toggle("active", t.dataset.subtab === name));
  document.querySelectorAll(".subtabpanel").forEach(p => p.classList.toggle("active", p.id === "subtab-" + name));
}

function renderIntegrations() {
  const cards = SEED.integrations.map(i => {
    const color = i.status === "live" ? (i.open_breaks === 0 ? "green" : i.open_breaks < 3 ? "amber" : "red")
                : i.status === "testing" ? "amber" : "gray";
    const pillCls = color;
    return `<div class="card ${color}">
      <div class="title">
        <h3>${i.provider}</h3>
        <span class="pill ${pillCls}">${i.status}</span>
      </div>
      <div class="meta">${i.reachable} · last sync ${i.last_sync}</div>
      <div class="stats">
        <div><div class="lbl">Health</div><div class="val">${i.health || "—"}</div></div>
        <div><div class="lbl">Throughput</div><div class="val">${i.throughput}</div></div>
        <div><div class="lbl">Open Breaks</div><div class="val" style="color:${i.open_breaks > 0 ? "var(--amber)" : "var(--green)"}">${i.open_breaks}</div></div>
      </div>
    </div>`;
  }).join("");
  document.getElementById("int-cards").innerHTML = cards;
}

function renderBreaks() {
  const rows = SEED.recon_breaks.map(b => {
    const sevColor = b.severity === "critical" ? "red" : b.severity === "warn" ? "amber" : "gray";
    const predPill = b.predicted ? ' <span class="pill gray">predicted</span>' : "";
    return `<tr>
      <td>${b.inst}</td>
      <td>${b.provider}</td>
      <td>${b.kind}</td>
      <td class="num">${b.delta}</td>
      <td><span class="pill ${sevColor}">${b.severity}</span>${predPill}</td>
      <td class="muted">${b.age}</td>
      <td><button class="btn ghost">Triage</button></td>
    </tr>`;
  }).join("");
  const meta = document.getElementById("breaks-meta");
  if (meta) {
    meta.innerHTML = `<b style="color:var(--green)">${SEED.suppressed_break_count} expected breaks suppressed</b> by the timing classifier · <a style="color:var(--accent);cursor:pointer">review →</a>`;
  }
  document.getElementById("breaks").innerHTML = `
    <table>
      <thead><tr><th>Institution</th><th>Provider</th><th>Kind</th><th class="num">Delta</th><th>Severity</th><th>Age</th><th></th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderBook() {
  const maxDepth = Math.max(
    ...SEED.book.asks.map(o => o.depth_cents),
    ...SEED.book.bids.map(o => o.depth_cents)
  );
  const askRows = SEED.book.asks.map(o => `
    <tr class="ask">
      <td>${o.rate.toFixed(2)}%</td>
      <td class="num">$${fmt.usd(o.depth_cents)}</td>
      <td><div class="depthbar"><div class="fill" style="width:${(o.depth_cents/maxDepth*100).toFixed(0)}%"></div></div></td>
    </tr>
  `).join("");
  const bidRows = SEED.book.bids.map(o => `
    <tr class="bid">
      <td>${o.rate.toFixed(2)}%</td>
      <td class="num">$${fmt.usd(o.depth_cents)}</td>
      <td><div class="depthbar"><div class="fill" style="width:${(o.depth_cents/maxDepth*100).toFixed(0)}%"></div></div></td>
    </tr>
  `).join("");
  document.getElementById("book").innerHTML = `
    <div class="side">
      <h3>Sources (asks)</h3>
      <table><thead><tr><th>Rate</th><th class="num">Depth</th><th>Visual</th></tr></thead><tbody>${askRows}</tbody></table>
    </div>
    <div class="side">
      <h3>Places (bids)</h3>
      <table><thead><tr><th>Rate</th><th class="num">Depth</th><th>Visual</th></tr></thead><tbody>${bidRows}</tbody></table>
    </div>
  `;
}

function renderTermCurve() {
  const data = SEED.term_curve;
  const w = 360, h = 140, pad = 28;
  const max = Math.max(...data.map(d => d.bps));
  const min = Math.min(...data.map(d => d.bps));
  const rng = (max - min) || 1;
  const stepX = (w - pad * 2) / (data.length - 1);
  const pts = data.map((d, i) => {
    const x = pad + i * stepX;
    const y = pad + (1 - (d.bps - min) / rng) * (h - pad * 2);
    return [x, y, d];
  });
  const poly = pts.map(p => `${p[0]},${p[1]}`).join(" ");
  const dots = pts.map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="#5eead4"/>`).join("");
  const labels = pts.map(p => `<text x="${p[0]}" y="${h - 6}" text-anchor="middle" font-size="9" fill="#8094bd">${p[2].term}</text>`).join("");
  const valLabels = pts.map(p => `<text x="${p[0]}" y="${p[1] - 8}" text-anchor="middle" font-size="9" fill="#e5edff">${(p[2].bps/100).toFixed(2)}%</text>`).join("");
  document.getElementById("curve").innerHTML = `
    <svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}">
      <polyline points="${poly}" fill="none" stroke="#5eead4" stroke-width="1.5"/>
      ${dots}${valLabels}${labels}
    </svg>
  `;
}

function renderCounterparties() {
  const rows = SEED.counterparties.map(c => {
    const display = c.settled
      ? `<b>${c.alias}</b> <span class="pill green">settled</span>`
      : `<code>${c.alias}</code>`;
    return `<tr><td>${display}</td><td>${c.rating}</td><td class="num">$${fmt.usd(c.vol_30d_cents)}</td></tr>`;
  }).join("");
  document.getElementById("cps").innerHTML = `
    <table><thead><tr><th>Counterparty</th><th>Rating</th><th class="num">30d Vol</th></tr></thead><tbody>${rows}</tbody></table>
  `;
}

function setupOrderForm() {
  const amt = document.getElementById("ord-amount");
  const out = document.getElementById("ord-coverage");
  const update = () => {
    const v = parseFloat(amt.value || "0") * 1e6;
    if (!v) { out.innerHTML = '<span class="muted">Enter an amount to preview insurance coverage impact.</span>'; out.classList.remove("warn"); return; }
    // Tier 2.1 / gap #1 unblocked: coverage is per-depositor aggregated across
    // every institution in the network. Mock numbers for the assigned depositor:
    const ceilingM = 15;                    // $15M target (NCUA reciprocal ceiling)
    const currentNetworkM = 8.4;            // $8.4M already insured across 6 institutions
    const wouldBecomeM = currentNetworkM + v / 1e6;
    const breach = wouldBecomeM > ceilingM;
    const breakdown = `
      <div class="net-breakdown">
        <div class="row"><span>Network insured (current)</span><b>$${currentNetworkM.toFixed(1)}M</b></div>
        <div class="row"><span>+ this order</span><b>$${(v/1e6).toFixed(1)}M</b></div>
        <div class="row"><span>= would-become</span><b>$${wouldBecomeM.toFixed(1)}M</b></div>
        <div class="row"><span>Target ceiling</span><b>$${ceilingM.toFixed(1)}M</b></div>
        <div class="row" style="margin-top:4px"><span>Aggregated across</span><b>6 institutions</b></div>
      </div>
    `;
    if (breach) {
      out.classList.add("warn");
      out.innerHTML = `Order of <b>$${(v/1e6).toFixed(1)}M</b> would breach the <b>$${ceilingM}M target ceiling</b> for the assigned depositor (network-aggregated). Refused with <code>422 coverage_ceiling_breach</code>.${breakdown}`;
    } else {
      out.classList.remove("warn");
      out.innerHTML = `Order of <b>$${(v/1e6).toFixed(1)}M</b> places within network coverage. Estimated match: <b>~$${(v/1e6 * 0.94).toFixed(1)}M @ 5.27%</b> · 4 ledger entries across 2 sub-ledgers.${breakdown}`;
    }
  };
  amt.addEventListener("input", update);
  update();
}

function setupSweep() {
  const open = document.getElementById("sweep-btn");
  const bg = document.getElementById("modal");
  const close = document.getElementById("modal-close");
  const confirm = document.getElementById("modal-confirm");
  open.addEventListener("click", () => bg.classList.add("show"));
  close.addEventListener("click", () => bg.classList.remove("show"));
  confirm.addEventListener("click", () => {
    confirm.textContent = "Confirmed ✓";
    confirm.disabled = true;
    setTimeout(() => { bg.classList.remove("show"); confirm.textContent = "Confirm sweep"; confirm.disabled = false; }, 900);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderKPIs();
  renderSparkline();
  renderAtRisk();
  renderCompliance();
  renderIntegrations();
  renderSettlementRouting();   // Tier 2.2
  renderBreaks();
  renderBook();
  renderTermCurve();
  renderCounterparties();
  renderPositionGraph();       // Tier 2.1
  renderNettedTable();         // Tier 2.1
  setupOrderForm();
  setupSweep();
  setupPersona();

  // Institution tab clicks
  document.querySelectorAll("#surface-inst .tab").forEach(t =>
    t.addEventListener("click", () => tabSwitch(t.dataset.tab)));
  // Admin tab clicks
  document.querySelectorAll("#surface-adminsurface .tab").forEach(t =>
    t.addEventListener("click", () => adminTabSwitch(t.dataset.admintab)));
  // Surface switcher
  document.querySelectorAll(".surface-switcher .surface").forEach(s =>
    s.addEventListener("click", () => surfaceSwitch(s.dataset.surface)));
  // Marketplace sub-tabs (Term Funding / NBID) — Tier 2.1
  document.querySelectorAll(".subtab").forEach(s =>
    s.addEventListener("click", () => subtabSwitch(s.dataset.subtab)));

  // Render the admin module up front (cheap, all static)
  if (window.AdminUI) AdminUI.renderAll();
});
