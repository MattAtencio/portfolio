// Plausible-looking but entirely fabricated seed data.
// Cents everywhere; formatting happens at render time.

window.SEED = {
  me: {
    id: "inst-cascadia",
    legal_name: "Cascadia Community Bank",
    type: "bank",
    regulator: "FDIC",
    core_provider: "fiserv",
  },

  kpis: {
    total_deposits_cents: 184_320_000_000,    // $1.843B
    reciprocal_placed_cents: 41_750_000_000,  // $417.5M
    at_risk_uninsured_cents: 12_840_000_000,  // $128.4M
    intraday_net_cents: -3_120_000_000,       // -$31.2M
    // EGRRCPA: lesser of $5B or 20% of total liabilities. For Cascadia
    // ($1.843B deposits ≈ $1.92B liabilities), the cap is min($5B, $384M) = $384M.
    // Currently $417.5M placed > $384M cap → already over. Realistic seed for the demo
    // would have a smaller institution; we'll bend reality and show $1.21B headroom by
    // pretending Cascadia is larger for the KPI. Real production: this number is computed.
    egrrcpa_cap_cents: 1_628_000_000,         // $1.628B cap (display-only)
    egrrcpa_headroom_cents: 1_210_500_000,    // $1.2105B headroom
    egrrcpa_headroom_pct: 74,
  },

  // 24 buckets — fake intraday flow
  intraday: [
    0, 120, 80, -40, -160, -220, -180, -240, -310, -280,
    -260, -220, -180, -140, -120, -160, -200, -260, -300,
    -340, -312, -312, -312, -312
  ],

  // amounts in cents — $8.4M = 840_000_000
  // network_ins is the Tier 2.1 / gap-#1 aggregate: insured amount summed across
  // every institution in the network where the depositor holds an account.
  // Phase 1 only had `ins` (single-institution); Tier 2.1 unblocks the network sum.
  accounts_at_risk: [
    { depositor: "Northwest Timber Holdings LLC",   bal: 840_000_000, ins:  25_000_000, network_ins: 1_500_000_000, network_insts: 6, action: "sweep_to_network" },
    { depositor: "Puget Sound School District #4",  bal: 620_000_000, ins:  25_000_000, network_ins:   825_000_000, network_insts: 4, action: "sweep_to_network" },
    { depositor: "Olympic Peninsula Hospital Fdn",  bal: 490_000_000, ins: 100_000_000, network_ins: 1_200_000_000, network_insts: 5, action: "sweep_to_network" },
    { depositor: "Cascade Brewing Co-op",           bal: 210_000_000, ins:  25_000_000, network_ins:   210_000_000, network_insts: 1, action: "split_account" },
    { depositor: "Rainier Title & Escrow",          bal: 185_000_000, ins:  75_000_000, network_ins:   185_000_000, network_insts: 1, action: "sweep_to_network" },
    { depositor: "Mt Baker Outdoor Equipment Inc",  bal: 124_000_000, ins:  25_000_000, network_ins:   124_000_000, network_insts: 1, action: "sweep_to_network" },
  ],

  integrations: [
    {
      provider: "Fiserv DNA",
      key: "fiserv",
      status: "live",
      health: 97,
      last_sync: "32s ago",
      throughput: "1,840 events/min",
      open_breaks: 1,
      reachable: "~1,400 banks",
    },
    {
      provider: "Jack Henry SilverLake",
      key: "jack_henry",
      status: "live",
      health: 91,
      last_sync: "1m 12s ago",
      throughput: "920 events/min",
      open_breaks: 3,
      reachable: "~1,000 banks · CU footprint",
    },
    {
      provider: "FIS Horizon",
      key: "fis",
      status: "testing",
      health: 72,
      last_sync: "4m 08s ago",
      throughput: "210 events/min",
      open_breaks: 0,
      reachable: "regional + larger banks",
    },
    {
      provider: "Alkami",
      key: "alkami",
      status: "draft",
      health: 0,
      last_sync: "—",
      throughput: "—",
      open_breaks: 0,
      reachable: "digital banking layer",
    },
  ],

  recon_breaks: [
    { inst: "Cascadia Community Bank",   provider: "Fiserv DNA",          kind: "timing",  delta: "+$0",         severity: "info",     age: "4m",  predicted: true },
    { inst: "Three Rivers FCU",          provider: "Jack Henry SilverLake", kind: "amount", delta: "-$1,240.00",  severity: "warn",     age: "11m", predicted: false },
    { inst: "Lakeshore Federal CU",      provider: "Jack Henry SilverLake", kind: "missing",delta: "-$84,500.00", severity: "critical", age: "2m",  predicted: false },
    { inst: "Sunbelt Heritage Bank",     provider: "Jack Henry SilverLake", kind: "timing", delta: "+$0",         severity: "info",     age: "8m",  predicted: true },
  ],
  // ~95% of breaks in production are timing-related and self-resolve. The classifier
  // suppresses predictable timing breaks so the panel only surfaces breaks needing humans.
  suppressed_break_count: 12,

  // Compliance & onboarding lifecycle for the current institution (institution-facing view)
  compliance: [
    { item: "BSA/AML questionnaire", status: "approved 2025-11-04", color: "green" },
    { item: "Master Services Agreement", status: "executed 2025-12-12", color: "green" },
    { item: "SOC 2 Type II reattestation", status: "due 2026-09-01", color: "amber" },
    { item: "Annual penetration test", status: "scheduled 2026-05-15", color: "gray" },
  ],

  // Multi-role personas for the institution console
  personas: {
    trader:     { email: "trader@cascadia.bank",     default_tab: "market", label: "Trader" },
    controller: { email: "controller@cascadia.bank", default_tab: "admin",  label: "Controller" },
    cco:        { email: "cco@cascadia.bank",        default_tab: "cco",    label: "CCO / Compliance" },
  },
  observe_mode: { active: true, day: 47, of: 90 },

  // Marketplace — order book depth
  book: {
    asks: [ // sources of funding
      { rate: 5.32, depth_cents:  8_500_000_000 },
      { rate: 5.30, depth_cents: 14_200_000_000 },
      { rate: 5.28, depth_cents: 22_800_000_000 },
      { rate: 5.27, depth_cents: 31_400_000_000 },
    ],
    bids: [ // places of liquidity
      { rate: 5.25, depth_cents: 27_900_000_000 },
      { rate: 5.23, depth_cents: 19_600_000_000 },
      { rate: 5.21, depth_cents: 12_300_000_000 },
      { rate: 5.18, depth_cents:  6_800_000_000 },
    ],
  },

  term_curve: [
    { term: "1d",   bps: 525 },
    { term: "7d",   bps: 528 },
    { term: "30d",  bps: 532 },
    { term: "90d",  bps: 540 },
    { term: "180d", bps: 548 },
    { term: "1y",   bps: 555 },
  ],

  // vol_30d in cents — $184M = 18_400_000_000
  // Pacific NW Credit Union is shown by legal name because it's a settled
  // counterparty visible to Cascadia under the existing privacy rules
  // (legal_name is exposed via GET /v1/matches/{id}/counterparty after
  // settlement). The other 4 are still anonymized.
  counterparties: [
    { alias: "Pacific NW Credit Union", rating: "A+", vol_30d_cents: 18_400_000_000, settled: true },
    { alias: "INST-3C18",               rating: "A",   vol_30d_cents: 12_200_000_000, settled: false },
    { alias: "INST-9D44",               rating: "AA-", vol_30d_cents:  9_800_000_000, settled: false },
    { alias: "INST-5B91",               rating: "A",   vol_30d_cents:  7_600_000_000, settled: false },
    { alias: "INST-2E07",               rating: "A-",  vol_30d_cents:  5_400_000_000, settled: false },
  ],

  // ============================================================
  // TIER 2.1 — Position graph (NBID Marketplace sub-tab)
  // ============================================================
  // The canonical state of the network. Edges are directional cents-of-exposure
  // from placing institution to sourcing institution. Renders as a 3-node graph
  // in the NBID sub-tab. See backend/internal/matching/network_position.go for
  // the in-code primitive that produces this view.
  position_graph: {
    nodes: [
      { id: "cascadia", label: "Cascadia\nCommunity Bank", type: "bank",        regulator: "FDIC", x: 120, y: 200 },
      { id: "pacificnw", label: "Pacific NW\nCredit Union", type: "credit_union", regulator: "NCUA", x: 480, y: 90  },
      { id: "tworivers", label: "Three Rivers\nFCU",         type: "credit_union", regulator: "NCUA", x: 480, y: 320 },
    ],
    edges: [
      { from: "cascadia",  to: "pacificnw", amount_cents: 18_400_000_000, rate_bps: 525, term_days: 1  },
      { from: "pacificnw", to: "cascadia",  amount_cents:  6_200_000_000, rate_bps: 520, term_days: 7  },
      { from: "cascadia",  to: "tworivers", amount_cents:  9_800_000_000, rate_bps: 528, term_days: 30 },
      { from: "tworivers", to: "pacificnw", amount_cents:  4_100_000_000, rate_bps: 530, term_days: 30 },
    ],
    // pre-netted view used by the NBID sub-tab summary table
    netted: [
      { a: "Cascadia → Pacific NW",   gross: "$184M / $62M", net_cents: 12_200_000_000, direction: "cascadia_long" },
      { a: "Cascadia → Three Rivers", gross: "$98M / $0",    net_cents:  9_800_000_000, direction: "cascadia_long" },
      { a: "Pacific NW ↔ Three Rivers", gross: "$0 / $41M",  net_cents:  4_100_000_000, direction: "tworivers_long" },
    ],
  },

  // ============================================================
  // TIER 2.2 — CUSO partner-bank settlement routing
  // ============================================================
  // The architectural fact gap #7 missed: credit unions don't have direct
  // Fedwire access. They settle via a partner bank that holds the CUSO's
  // master account. Cascadia (FDIC) settles direct; Pacific NW (NCUA) and
  // Three Rivers (NCUA) route via Cornerstone.
  settlement_routing: {
    partner_bank: {
      legal_name: "Cornerstone National Bank",
      aba: "071000301",
      master_account: "DepositNet CUSO Settlement (Cornerstone)",
      role: "FDIC partner bank for the NCUA-side of the network",
    },
    routes: [
      { institution: "Cascadia Community Bank",        type: "bank",         regulator: "FDIC", path: "direct",      rail: "Fedwire" },
      { institution: "Pacific Northwest Credit Union", type: "credit_union", regulator: "NCUA", path: "via_partner", rail: "Fedwire (via Cornerstone)" },
      { institution: "Three Rivers FCU",               type: "credit_union", regulator: "NCUA", path: "via_partner", rail: "Fedwire (via Cornerstone)" },
      { institution: "Olympic Peninsula Savings",      type: "bank",         regulator: "FDIC", path: "direct",      rail: "Fedwire" },
      { institution: "Mountain West CU",               type: "credit_union", regulator: "NCUA", path: "via_partner", rail: "ACH SameDay (via Cornerstone)" },
    ],
  },

  // ============================================================
  // TIER 2.3 — Merkle commitment ledger integrity
  // ============================================================
  // Per-institution daily Merkle roots over ledger_entry.ref_hash, committed
  // to S3 Object Lock and a notary log. The merkle-roller cmd writes these
  // overnight. Verification recomputes from the live DB and compares to all
  // three sources (DB row, S3 object, notary).
  merkle_roots: {
    last_run: "2026-04-07 03:00:14 UTC",
    duration_ms: 1842,
    institutions_processed: 156,
    roots: [
      { inst: "Cascadia Community Bank",        date: "2026-04-06", entries:  4_127, root: "8c7f3a2e9d144b910ab2c4e6f8d3b1...", s3: true,  notary: true,  verified: true },
      { inst: "Pacific Northwest Credit Union", date: "2026-04-06", entries:  2_840, root: "9d44b17fe2085ac3741fa20b8c6e91...", s3: true,  notary: true,  verified: true },
      { inst: "Three Rivers FCU",               date: "2026-04-06", entries:  1_653, root: "2e18c48a917d35e60bf9a4c81d72e0...", s3: true,  notary: true,  verified: true },
      { inst: "Olympic Peninsula Savings",      date: "2026-04-06", entries:    928, root: "7f3a2c9d1e8b44910ab2c4e6f8d3b1...", s3: true,  notary: true,  verified: true },
      { inst: "Mountain West CU",               date: "2026-04-06", entries:    412, root: "5b91c8a47f3e2d09b1c64e8a791d44...", s3: true,  notary: false, verified: true },
      { inst: "Sunbelt Heritage Bank",          date: "2026-04-06", entries:  3_201, root: "3c180a44b97f2e1c8d65b3e0a82f91...", s3: false, notary: false, verified: false, reason: "S3 commit pending — Object Lock retry queued" },
    ],
  },

  // ============================================================
  // TIER 2.4 — Settlement state machine
  // ============================================================
  // settlement_instruction rows in flight. Each match produces one or two
  // instructions (depending on routing — partner-bank routes have a separate
  // CU-leg and bank-leg instruction). The state machine advances them.
  settlement_pipeline: {
    states: ["pending", "queued_for_window", "sent", "confirmed", "broken", "expired"],
    instructions: [
      { id: "si:7f3a", match: "m:8c2a", inst: "Cascadia → Pacific NW",          rail: "Fedwire (via Cornerstone)", state: "queued_for_window", cutoff_at: "2026-04-08 18:00 ET", note: "Missed today's 6pm cutoff · queued for tomorrow 9am window" },
      { id: "si:9d44", match: "m:8c2a", inst: "Cornerstone → Pacific NW (CU leg)", rail: "ACH SameDay",            state: "queued_for_window", cutoff_at: "2026-04-08 14:45 ET", note: "Bound to si:7f3a · advances together" },
      { id: "si:2e18", match: "m:9d31", inst: "Cascadia → Three Rivers",         rail: "Fedwire (via Cornerstone)", state: "sent",              cutoff_at: "2026-04-07 16:30 ET", note: "fed_ref FRB-20260407-7F3A-9D44 · awaiting confirmation" },
      { id: "si:5b91", match: "m:7c4e", inst: "Olympic → Cascadia",              rail: "Fedwire",                   state: "confirmed",         cutoff_at: "2026-04-07 14:00 ET", note: "Confirmed at 14:02 ET · ledger updated" },
      { id: "si:3c18", match: "m:6b22", inst: "Mountain West → Cascadia",        rail: "ACH SameDay",               state: "broken",            cutoff_at: "2026-04-07 11:00 ET", note: "Counterparty insufficient funds · paged netops · investigating" },
      { id: "si:1a05", match: "m:5a11", inst: "Sunbelt → Pacific NW",            rail: "Fedwire (via Cornerstone)", state: "expired",           cutoff_at: "2026-04-04 18:00 ET", note: "Match too old · auto-expired by state machine · regenerated as m:9e88" },
    ],
  },

  // ============================================================
  // ADMIN MODULE — internal network operator surface
  // ============================================================
  admin: {
    pipeline: [
      { name: "Cascadia Community Bank",      type: "Bank",         regulator: "FDIC", stage: "live",             owner: "kelly.z",  days_in_stage: 142, blocker: null,                              expected_arr: 184_000 },
      { name: "Three Rivers FCU",             type: "Credit Union", regulator: "NCUA", stage: "live",             owner: "kelly.z",  days_in_stage: 89,  blocker: null,                              expected_arr: 92_000 },
      { name: "Olympic Peninsula Savings",    type: "Bank",         regulator: "FDIC", stage: "integration_test", owner: "marcus.t", days_in_stage: 12,  blocker: "47 of 60 events syncing",         expected_arr: 220_000 },
      { name: "Mountain West CU",             type: "Credit Union", regulator: "NCUA", stage: "msa",              owner: "kelly.z",  days_in_stage: 23,  blocker: "redlines with counsel",           expected_arr: 78_000 },
      { name: "Heartland Federal CU",         type: "Credit Union", regulator: "NCUA", stage: "bsa_aml",          owner: "gale.s",   days_in_stage: 47,  blocker: "questionnaire with counsel",      expected_arr: 145_000 },
      { name: "Coastal Trust Bank",           type: "Bank",         regulator: "FDIC", stage: "bsa_aml",          owner: "gale.s",   days_in_stage: 31,  blocker: "OFAC screening",                  expected_arr: 310_000 },
      { name: "First Plains Bank",            type: "Bank",         regulator: "FDIC", stage: "lead",             owner: "sales",    days_in_stage: 8,   blocker: null,                              expected_arr: 410_000 },
      { name: "Northern Lights CU",           type: "Credit Union", regulator: "NCUA", stage: "degraded",         owner: "alice.c",  days_in_stage: 4,   blocker: "core banking sync paused",        expected_arr: 56_000 },
    ],

    internal_breaks: [
      { inst: "Lakeshore Federal CU",      kind: "missing", delta: "-$84,500.00", severity: "critical", age: "2m",  predicted: false, predicted_kind: null,    assignee: "alice.c", sla: "13m left" },
      { inst: "Three Rivers FCU",          kind: "amount",  delta: "-$1,240.00",  severity: "warn",     age: "11m", predicted: false, predicted_kind: null,    assignee: null,      sla: "49m left" },
      { inst: "Cascadia Community Bank",   kind: "timing",  delta: "+$0",         severity: "info",     age: "4m",  predicted: true,  predicted_kind: "info",  assignee: null,      sla: "auto"      },
      { inst: "Sunbelt Heritage Bank",     kind: "timing",  delta: "+$0",         severity: "info",     age: "8m",  predicted: true,  predicted_kind: "info",  assignee: null,      sla: "auto"      },
      { inst: "Olympic Peninsula Savings", kind: "amount",  delta: "+$3,400.00",  severity: "warn",     age: "27m", predicted: false, predicted_kind: null,    assignee: "marcus.t",sla: "33m left" },
    ],

    inspector_result: {
      depositor: "Northwest Timber Holdings LLC",
      institutions: 7,
      events: [
        { ts: "2026-04-07 14:32:18", event: "order.placed",         inst: "Cascadia Community Bank", amount: "$2,500,000",  verified: true, audit_id: "ae:7f3a..." },
        { ts: "2026-04-07 14:32:19", event: "coverage.checked",     inst: "Cascadia Community Bank", amount: "—",            verified: true, audit_id: "ae:7f3b..." },
        { ts: "2026-04-07 14:32:20", event: "order.matched",        inst: "Cascadia Community Bank", amount: "$2,500,000",  verified: true, audit_id: "ae:7f3c..." },
        { ts: "2026-04-07 14:32:21", event: "ledger.entry.debit",   inst: "Cascadia Community Bank", amount: "$2,500,000",  verified: true, audit_id: "ae:7f3d..." },
        { ts: "2026-04-07 14:32:21", event: "ledger.entry.credit",  inst: "INST-7F2A (anonymized)",  amount: "$2,500,000",  verified: true, audit_id: "ae:7f3e..." },
        { ts: "2026-04-07 14:32:22", event: "settlement.queued",    inst: "Cascadia Community Bank", amount: "$2,500,000",  verified: true, audit_id: "ae:7f3f..." },
        { ts: "2026-04-07 14:34:01", event: "settlement.confirmed", inst: "Fedwire",                 amount: "$2,500,000",  verified: true, audit_id: "ae:7f40..." },
      ],
    },

    network_kpis: {
      volume_30d: 1_840_000_000_000,    // $18.4B in cents
      active: 142,
      total: 156,
      banks: 67,
      cus: 75,
      top_concentration_pct: 18,
      near_cap_count: 4,
    },

    // Headroom amounts in cents.
    headroom_watch: [
      { name: "Sunbelt Heritage Bank",      liabilities: 142_000_000_000, current_reciprocal:  26_500_000_000, cap: 28_400_000_000, headroom:  1_900_000_000, pct: 7  },
      { name: "Mountain West CU",           liabilities:  84_000_000_000, current_reciprocal:  14_200_000_000, cap: 16_800_000_000, headroom:  2_600_000_000, pct: 15 },
      { name: "Coastal Trust Bank",         liabilities: 310_000_000_000, current_reciprocal:  48_000_000_000, cap: 62_000_000_000, headroom: 14_000_000_000, pct: 23 },
      { name: "Three Rivers FCU",           liabilities:  62_000_000_000, current_reciprocal:   9_400_000_000, cap: 12_400_000_000, headroom:  3_000_000_000, pct: 24 },
      { name: "Cascadia Community Bank",    liabilities: 192_000_000_000, current_reciprocal:  10_295_000_000, cap: 38_400_000_000, headroom: 28_105_000_000, pct: 73 },
      { name: "Olympic Peninsula Savings",  liabilities: 218_000_000_000, current_reciprocal:   8_200_000_000, cap: 43_600_000_000, headroom: 35_400_000_000, pct: 81 },
    ],

    users: [
      { email: "trader@cascadia.bank",     role: "trader",     institution: "Cascadia Community Bank", last_login: "12s ago" },
      { email: "controller@cascadia.bank", role: "controller", institution: "Cascadia Community Bank", last_login: "47m ago" },
      { email: "cco@cascadia.bank",        role: "cco",        institution: "Cascadia Community Bank", last_login: "yesterday" },
      { email: "ops@cascadia.bank",        role: "read-only",  institution: "Cascadia Community Bank", last_login: "3d ago" },
    ],

    certs: [
      { cn: "cascadia-prod.depositnet.example",    fingerprint: "7f:3a:2c:9d:1e:8b:44:91:0a:b2", issued: "2025-11-04T09:00:00Z", expires: "2026-11-04T09:00:00Z", last_used: "12s ago",  status: "active" },
      { cn: "cascadia-staging.depositnet.example", fingerprint: "9d:44:b1:7f:e2:08:5a:c3:74:1f", issued: "2025-11-04T09:00:00Z", expires: "2026-05-04T09:00:00Z", last_used: "47m ago",  status: "expiring" },
      { cn: "cascadia-prod.depositnet.example",    fingerprint: "2e:18:c4:8a:91:7d:35:e6:0b:f9", issued: "2024-11-04T09:00:00Z", expires: "2025-11-04T09:00:00Z", last_used: "2025-11-04", status: "rotated" },
    ],
  },
};
