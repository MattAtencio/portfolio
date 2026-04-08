// Admin module render functions. Called from app.js when the admin surface is active.
// Reuses fmt.* helpers from app.js (loaded first).

window.AdminUI = (function () {
  function renderPipeline() {
    const rows = SEED.admin.pipeline.map(p => {
      const stagePill = {
        lead: "gray", bsa_aml: "amber", msa: "amber",
        integration_test: "amber", live: "green",
        degraded: "red", churned: "gray",
      }[p.stage] || "gray";
      const stageLabel = {
        lead: "Lead", bsa_aml: "BSA/AML Review", msa: "MSA Redlines",
        integration_test: "Integration Testing", live: "Live",
        degraded: "Degraded", churned: "Churned",
      }[p.stage] || p.stage;
      return `<tr>
        <td><b>${p.name}</b><div class="muted" style="font-size:10px">${p.type} · ${p.regulator}</div></td>
        <td><span class="pill ${stagePill}">${stageLabel}</span></td>
        <td>${p.owner}</td>
        <td class="num">${p.days_in_stage}d</td>
        <td class="muted" style="font-size:11px">${p.blocker || "—"}</td>
        <td class="num">${p.expected_arr ? "$" + fmt.usd(p.expected_arr * 100) : "—"}</td>
      </tr>`;
    }).join("");
    document.getElementById("admin-pipeline").innerHTML = `
      <table>
        <thead><tr>
          <th>Institution</th><th>Stage</th><th>Owner</th>
          <th class="num">Days in stage</th><th>Blocker</th><th class="num">Expected ARR</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  function renderNetOps() {
    const breaks = SEED.admin.internal_breaks.map(b => {
      const sevColor = b.severity === "critical" ? "red" : b.severity === "warn" ? "amber" : "gray";
      const predPill = b.predicted ? `<span class="pill gray">predicted ${b.predicted_kind}</span>` : "";
      return `<tr>
        <td>${b.inst}</td>
        <td>${b.kind}</td>
        <td class="num">${b.delta}</td>
        <td><span class="pill ${sevColor}">${b.severity}</span> ${predPill}</td>
        <td>${b.assignee || '<span class="muted">unassigned</span>'}</td>
        <td class="muted">${b.sla}</td>
        <td>
          <button class="btn ghost" style="padding:4px 8px;font-size:10px">Force settle</button>
          <button class="btn ghost" style="padding:4px 8px;font-size:10px">Pause match</button>
        </td>
      </tr>`;
    }).join("");
    const suppressed = SEED.admin.internal_breaks.filter(b => b.predicted).length;
    document.getElementById("admin-netops").innerHTML = `
      <div style="margin-bottom:10px" class="muted">
        On-call: <b style="color:var(--text)">alice.chen@depositnet.example</b> · #netops-oncall ·
        <span style="color:var(--green)">${suppressed} expected breaks suppressed</span>
      </div>
      <table>
        <thead><tr>
          <th>Institution</th><th>Kind</th><th class="num">Delta</th>
          <th>Severity</th><th>Assignee</th><th>SLA</th><th>Actions</th>
        </tr></thead>
        <tbody>${breaks}</tbody>
      </table>
    `;
  }

  function renderInspector() {
    const r = SEED.admin.inspector_result;
    document.getElementById("admin-inspector").innerHTML = `
      <div style="margin-bottom:12px">
        <input type="text" placeholder="Search by order ID, match ID, ledger hash, depositor name..."
          value="depositor:Northwest Timber Holdings LLC"
          style="width:100%;background:var(--panel);border:1px solid var(--border);color:var(--text);padding:10px;border-radius:4px;font-family:inherit"/>
      </div>
      <div class="muted" style="margin-bottom:10px">
        Showing transactions for <b style="color:var(--text)">${r.depositor}</b> ·
        across <b style="color:var(--text)">${r.institutions} institutions</b> ·
        last 30 days · ${r.events.length} events
      </div>
      <table>
        <thead><tr>
          <th>Time</th><th>Event</th><th>Institution</th><th class="num">Amount</th>
          <th>Hash chain</th><th>Audit</th>
        </tr></thead>
        <tbody>${r.events.map(e => `
          <tr>
            <td class="muted">${e.ts}</td>
            <td>${e.event}</td>
            <td>${e.inst}</td>
            <td class="num">${e.amount}</td>
            <td><span class="pill ${e.verified ? "green" : "red"}">${e.verified ? "verified" : "BROKEN"}</span></td>
            <td><code style="font-size:10px">${e.audit_id}</code></td>
          </tr>
        `).join("")}</tbody>
      </table>
      <div style="margin-top:14px;display:flex;gap:8px">
        <button class="btn ghost">Export JSON</button>
        <button class="btn ghost">Export CSV (OCC 2017)</button>
        <button class="btn ghost">Export Parquet</button>
        <button class="btn">Verify Merkle root</button>
      </div>
    `;
  }

  function renderNetworkHealth() {
    const k = SEED.admin.network_kpis;
    const kpis = `
      <div class="kpi good">
        <div class="label">Network Volume (30d)</div>
        <div class="value">$${fmt.usd(k.volume_30d)}</div>
        <div class="delta pos">+12.4% MoM</div>
      </div>
      <div class="kpi">
        <div class="label">Active Institutions</div>
        <div class="value">${k.active}/${k.total}</div>
        <div class="delta">${k.banks} banks · ${k.cus} credit unions</div>
      </div>
      <div class="kpi warn">
        <div class="label">Largest Concentration</div>
        <div class="value">${k.top_concentration_pct}%</div>
        <div class="delta neg">INST-7F2A · single counterparty</div>
      </div>
      <div class="kpi bad">
        <div class="label">Institutions Near Cap</div>
        <div class="value">${k.near_cap_count}</div>
        <div class="delta neg">EGRRCPA headroom &lt; 25%</div>
      </div>
    `;
    const rows = SEED.admin.headroom_watch.map(h => {
      const pctColor = h.pct < 10 ? "red" : h.pct < 25 ? "amber" : "green";
      return `<tr>
        <td><b>${h.name}</b></td>
        <td class="num">$${fmt.usd(h.liabilities)}</td>
        <td class="num">$${fmt.usd(h.current_reciprocal)}</td>
        <td class="num">$${fmt.usd(h.cap)}</td>
        <td class="num">$${fmt.usd(h.headroom)}</td>
        <td class="num"><span class="pill ${pctColor}">${h.pct}%</span></td>
      </tr>`;
    }).join("");
    document.getElementById("admin-health").innerHTML = `
      <div class="kpis" style="margin-bottom:14px">${kpis}</div>
      <h2 style="margin:0 0 10px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted)">EGRRCPA Headroom Watch · sorted by % remaining</h2>
      <table>
        <thead><tr>
          <th>Institution</th>
          <th class="num">Total Liabilities</th>
          <th class="num">Current Reciprocal</th>
          <th class="num">Cap (lesser of $5B / 20%)</th>
          <th class="num">Headroom</th>
          <th class="num">% Remaining</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  function renderIdentity() {
    const users = SEED.admin.users.map(u => `
      <tr>
        <td>${u.email}</td>
        <td><span class="pill gray">${u.role}</span></td>
        <td>${u.institution}</td>
        <td class="muted">${u.last_login}</td>
        <td>
          <button class="btn ghost" style="padding:4px 8px;font-size:10px">Reset MFA</button>
          <button class="btn ghost" style="padding:4px 8px;font-size:10px">Suspend</button>
        </td>
      </tr>
    `).join("");
    const certs = SEED.admin.certs.map(c => {
      const statusColor = c.status === "active" ? "green" : c.status === "expiring" ? "amber" : "gray";
      const expWarn = c.status === "expiring" ? ' <span style="color:var(--amber)">· rotate before ' + c.expires.split("T")[0] + '</span>' : "";
      return `<tr>
        <td><code>${c.cn}</code></td>
        <td><code style="font-size:10px">${c.fingerprint}</code></td>
        <td class="muted">${c.issued.split("T")[0]}</td>
        <td class="muted">${c.expires.split("T")[0]}${expWarn}</td>
        <td class="muted">${c.last_used}</td>
        <td><span class="pill ${statusColor}">${c.status}</span></td>
        <td>
          <button class="btn ghost" style="padding:4px 8px;font-size:10px">Rotate</button>
          <button class="btn ghost" style="padding:4px 8px;font-size:10px">Revoke</button>
        </td>
      </tr>`;
    }).join("");
    document.getElementById("admin-identity").innerHTML = `
      <div class="panel">
        <h2>Users &amp; Roles · Cascadia Community Bank</h2>
        <table>
          <thead><tr><th>Email</th><th>Role</th><th>Institution</th><th>Last login</th><th>Actions</th></tr></thead>
          <tbody>${users}</tbody>
        </table>
        <div class="muted mt">
          Default mode for new institutions: <b style="color:var(--text)">observe</b> ·
          Graduation period: <b style="color:var(--text)">90 days</b>
        </div>
      </div>
      <div class="panel">
        <h2>mTLS Certificate Lifecycle · Cascadia Community Bank</h2>
        <table>
          <thead><tr>
            <th>CN</th><th>Fingerprint</th><th>Issued</th><th>Expires</th>
            <th>Last used</th><th>Status</th><th>Actions</th>
          </tr></thead>
          <tbody>${certs}</tbody>
        </table>
        <div class="muted mt">
          Certs auto-rotate at T-60d with a 7-day overlap window. Revocation broadcasts to gateway CRL within 30s.
          Rotation history is append-only and regulator-visible via the audit export.
        </div>
        <div style="margin-top:10px">
          <button class="btn">Issue new cert</button>
          <button class="btn ghost">Download CRL</button>
        </div>
      </div>
    `;
  }

  // Tier 2.4: settlement state machine pipeline
  function renderSettlementPipeline() {
    const el = document.getElementById("admin-settlement-pipeline");
    if (!el) return;
    const counts = {};
    SEED.settlement_pipeline.states.forEach(s => { counts[s] = 0; });
    SEED.settlement_pipeline.instructions.forEach(i => { counts[i.state] = (counts[i.state] || 0) + 1; });
    const summary = SEED.settlement_pipeline.states.map(s =>
      `<span class="state-pill ${s}">${s.replace(/_/g, " ")} · ${counts[s]}</span>`
    ).join(" ");

    const rows = SEED.settlement_pipeline.instructions.map(i => `
      <tr>
        <td><code>${i.id}</code></td>
        <td><code>${i.match}</code></td>
        <td>${i.inst}</td>
        <td><code style="font-size:10px">${i.rail}</code></td>
        <td><span class="state-pill ${i.state}">${i.state.replace(/_/g, " ")}</span></td>
        <td class="muted" style="font-size:11px">${i.cutoff_at}</td>
        <td class="muted" style="font-size:11px">${i.note}</td>
      </tr>
    `).join("");

    el.innerHTML = `
      <div style="margin-bottom:10px">${summary}</div>
      <table>
        <thead><tr>
          <th>Instruction</th><th>Match</th><th>Direction</th><th>Rail</th>
          <th>State</th><th>Cutoff</th><th>Note</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  // Tier 2.3: Merkle commitment roots — daily integrity panel
  function renderMerkleRoots() {
    const el = document.getElementById("merkle-roots");
    if (!el) return;
    const m = SEED.merkle_roots;
    const ok = m.roots.filter(r => r.verified).length;
    const total = m.roots.length;

    const rows = m.roots.map(r => {
      const s3Dot = `<span class="commit-dot ${r.s3 ? "ok" : "pending"}"></span>`;
      const notDot = `<span class="commit-dot ${r.notary ? "ok" : "pending"}"></span>`;
      const verifyDot = `<span class="commit-dot ${r.verified ? "ok" : "fail"}"></span>`;
      const verifyLabel = r.verified ? "verified" : `failed · ${r.reason || ""}`;
      return `<tr>
        <td><b>${r.inst}</b></td>
        <td class="muted">${r.date}</td>
        <td class="num">${r.entries.toLocaleString()}</td>
        <td><span class="merkle-hash">${r.root}</span></td>
        <td>${s3Dot}S3</td>
        <td>${notDot}Notary</td>
        <td>${verifyDot}${verifyLabel}</td>
        <td>
          <button class="btn ghost" style="padding:4px 8px;font-size:10px">Verify</button>
        </td>
      </tr>`;
    }).join("");

    el.innerHTML = `
      <div class="merkle-summary">
        Last roller run: <b>${m.last_run}</b> ·
        Duration: <b>${m.duration_ms}ms</b> ·
        Institutions processed: <b>${m.institutions_processed}</b> ·
        Roots verified today: <b style="color:var(--green)">${ok}/${total}</b>
      </div>
      <table>
        <thead><tr>
          <th>Institution</th><th>Date</th><th class="num">Entries</th>
          <th>Root (sha256)</th><th>S3</th><th>Notary</th><th>Verify</th><th></th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  function renderAll() {
    renderPipeline();
    renderNetOps();
    renderInspector();
    renderNetworkHealth();
    renderIdentity();
    renderSettlementPipeline();  // Tier 2.4
    renderMerkleRoots();          // Tier 2.3
  }

  return { renderAll };
})();
