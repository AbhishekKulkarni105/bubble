import type { QuoteDetail, QuoteSummaryField } from "../types/quote";

/* ------------------------------------------------------------------ *
 * Dependency-free multi-page vector PDF generator for the quote.
 *  Page 1  : branded summary (header, estimate, account, coverage,
 *            premium breakdown).
 *  Then    : Drivers, Vehicles and Application Form sections, flowing
 *            across as many A4 pages as needed.
 * The header / estimate / total bars use a real axial (linear)
 * gradient built from the brand colors #1e3a8a -> #2563eb -> #1e40af.
 * ------------------------------------------------------------------ */

type RGB = [number, number, number];

// --- Brand + UI colors (0..1 RGB) -------------------------------------------
const NAVY1: RGB = [0.118, 0.227, 0.541]; // #1e3a8a
const BLUE: RGB = [0.145, 0.388, 0.922]; // #2563eb
const NAVY2: RGB = [0.118, 0.251, 0.686]; // #1e40af
const WHITE: RGB = [1, 1, 1];
const LIGHTBLUE: RGB = [0.64, 0.72, 0.9];
const DARK: RGB = [0.06, 0.12, 0.2];
const MUTED: RGB = [0.42, 0.47, 0.53];
const MUTED2: RGB = [0.55, 0.59, 0.64];
const CARD_BG: RGB = [0.968, 0.974, 0.982];
const CARD_BORDER: RGB = [0.9, 0.92, 0.94];
const DIVIDER: RGB = [0.85, 0.88, 0.91];
const ROW_ALT: RGB = [0.945, 0.957, 0.97];
const ROW_LINE: RGB = [0.91, 0.93, 0.95];
const GROUP_BG: RGB = [0.93, 0.95, 0.97];
const SUBBG: RGB = [0.925, 0.937, 0.953];
const GREEN: RGB = [0.13, 0.55, 0.33];
const GREEN_BG: RGB = [0.86, 0.95, 0.89];
const GREY: RGB = [0.55, 0.58, 0.62];
const GREY_BG: RGB = [0.9, 0.92, 0.94];

const PW = 595; // A4 width
const PH = 842; // A4 height
const CX = 40; // left margin
const CW = 515; // content width
const RX = CX + CW; // right edge (555)
const TOP_CONT = 50; // top of continuation pages
const BOTTOM_LIMIT = PH - 56; // content must stop above the footer

// --- Helvetica / Helvetica-Bold advance widths (chars 32..126, per 1000) ----
const HW = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556, 556,
  556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556, 1015, 667, 667, 722, 722, 667,
  611, 778, 722, 278, 500, 667, 556, 833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667,
  667, 611, 278, 278, 278, 469, 556, 333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500,
  222, 833, 556, 556, 556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584,
];
const BW = [
  278, 333, 474, 556, 556, 889, 722, 238, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556, 556,
  556, 556, 556, 556, 556, 556, 556, 333, 333, 584, 584, 584, 611, 975, 722, 722, 722, 722, 667,
  611, 778, 722, 278, 556, 722, 611, 833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667,
  667, 611, 333, 278, 333, 584, 556, 333, 556, 611, 556, 611, 556, 333, 611, 611, 278, 278, 556,
  278, 889, 611, 611, 611, 611, 389, 556, 333, 611, 556, 778, 556, 556, 500, 389, 280, 389, 584,
];

const f = (n: number): string => n.toFixed(2);
const col = (c: RGB): string => `${c[0]} ${c[1]} ${c[2]}`;

function esc(s: string): string {
  let out = "";
  for (const ch of s) {
    const code = ch.codePointAt(0) ?? 63;
    if (ch === "\\") out += "\\\\";
    else if (ch === "(") out += "\\(";
    else if (ch === ")") out += "\\)";
    else if (code < 128) out += ch;
    else if (code === 0xb7) out += "\\267"; // middle dot
    else if (code === 0x2014) out += "\\227"; // em dash
    else if (code === 0x2013) out += "\\226"; // en dash
    else if (code === 0x2192) out += "->"; // arrow
    else if (code < 256) out += "\\" + code.toString(8).padStart(3, "0");
    else out += "?";
  }
  return out;
}

function widthOf(s: string, size: number, bold: boolean): number {
  const W = bold ? BW : HW;
  let t = 0;
  for (const ch of s) {
    const c = ch.codePointAt(0) ?? 32;
    if (c >= 32 && c <= 126) t += W[c - 32];
    else if (c === 0xb7) t += 278;
    else t += 500;
  }
  return (t / 1000) * size;
}

function wrapLines(s: string, width: number, size: number, bold: boolean): string[] {
  const words = s.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (widthOf(test, size, bold) > width && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** Rounded-rectangle path ops (bottom-left origin). r<=0 gives a plain rect. */
function rrPath(x: number, yLL: number, w: number, h: number, r: number): string {
  if (r <= 0) return `${f(x)} ${f(yLL)} ${f(w)} ${f(h)} re`;
  const k = 0.5523 * r;
  return [
    `${f(x + r)} ${f(yLL)} m`,
    `${f(x + w - r)} ${f(yLL)} l`,
    `${f(x + w - r + k)} ${f(yLL)} ${f(x + w)} ${f(yLL + r - k)} ${f(x + w)} ${f(yLL + r)} c`,
    `${f(x + w)} ${f(yLL + h - r)} l`,
    `${f(x + w)} ${f(yLL + h - r + k)} ${f(x + w - r + k)} ${f(yLL + h)} ${f(x + w - r)} ${f(yLL + h)} c`,
    `${f(x + r)} ${f(yLL + h)} l`,
    `${f(x + r - k)} ${f(yLL + h)} ${f(x)} ${f(yLL + h - r + k)} ${f(x)} ${f(yLL + h - r)} c`,
    `${f(x)} ${f(yLL + r)} l`,
    `${f(x)} ${f(yLL + r - k)} ${f(x + r - k)} ${f(yLL)} ${f(x + r)} ${f(yLL)} c`,
  ].join(" ");
}

interface TextOpts {
  bold?: boolean;
  color?: RGB;
  align?: "left" | "center" | "right";
  rightX?: number;
}
interface Page {
  ops: string[];
  shadings: { name: string; x: number; top: number; w: number; h: number }[];
}
interface Row {
  label: string;
  value: string;
  badge?: boolean;
  badgeBg?: RGB;
  badgeColor?: RGB;
}

function buildQuotePdf(quote: QuoteDetail): Blob {
  const pages: Page[] = [];
  let cur: Page;
  let top = 0; // cursor (distance from top of page)
  const Y = (t: number) => PH - t;

  function newPage(firstPage = false) {
    cur = { ops: [], shadings: [] };
    pages.push(cur);
    top = firstPage ? 0 : TOP_CONT;
  }
  function ensureSpace(h: number) {
    if (top + h > BOTTOM_LIMIT) newPage();
  }

  // ---- primitive drawers (emit into `cur`) ---------------------------------
  function text(x: number, t: number, s: string, size: number, opts: TextOpts = {}) {
    const { bold = false, color = DARK, align = "left", rightX = 0 } = opts;
    const w = widthOf(s, size, bold);
    let dx = x;
    if (align === "right") dx = rightX - w;
    else if (align === "center") dx = x - w / 2;
    cur.ops.push(
      `BT /${bold ? "F2" : "F1"} ${size} Tf ${col(color)} rg 1 0 0 1 ${f(dx)} ${f(
        Y(t + size * 0.72)
      )} Tm (${esc(s)}) Tj ET\n`
    );
  }
  function labelValueRight(
    rightX: number,
    t: number,
    label: string,
    value: string,
    size: number,
    labelColor: RGB,
    valueColor: RGB
  ) {
    const vw = widthOf(value, size, true);
    const lw = widthOf(label, size, false);
    const vy = Y(t + size * 0.72);
    const vx = rightX - vw;
    const lx = vx - 6 - lw;
    cur.ops.push(
      `BT /F1 ${size} Tf ${col(labelColor)} rg 1 0 0 1 ${f(lx)} ${f(vy)} Tm (${esc(label)}) Tj ET ` +
        `BT /F2 ${size} Tf ${col(valueColor)} rg 1 0 0 1 ${f(vx)} ${f(vy)} Tm (${esc(value)}) Tj ET\n`
    );
  }
  function roundRect(x: number, t: number, w: number, h: number, r: number, fill: RGB, stroke?: RGB) {
    const p = rrPath(x, Y(t + h), w, h, r);
    let s = `${col(fill)} rg ${p} f\n`;
    if (stroke) s += `${col(stroke)} RG 0.7 w ${p} S\n`;
    cur.ops.push(s);
  }
  function gradientRect(x: number, t: number, w: number, h: number, r: number) {
    const name = `Sh${cur.shadings.length + 1}`;
    cur.shadings.push({ name, x, top: t, w, h });
    cur.ops.push(`q ${rrPath(x, Y(t + h), w, h, r)} W n /${name} sh Q\n`);
  }
  function hline(x1: number, t: number, x2: number, color: RGB, width = 1) {
    cur.ops.push(`${col(color)} RG ${width} w ${f(x1)} ${f(Y(t))} m ${f(x2)} ${f(Y(t))} l S\n`);
  }
  function badge(rightX: number, t: number, label: string, textColor: RGB, bg: RGB, size = 8) {
    const tw = widthOf(label, size, true);
    const pw = tw + 16;
    const ph = size + 7;
    const x = rightX - pw;
    const p = rrPath(x, Y(t + ph), pw, ph, ph / 2);
    const ty = Y(t + (ph - size) / 2 + size * 0.72);
    cur.ops.push(
      `${col(bg)} rg ${p} f BT /F2 ${size} Tf ${col(textColor)} rg 1 0 0 1 ${f(x + 8)} ${f(
        ty
      )} Tm (${esc(label)}) Tj ET\n`
    );
  }
  function paragraph(x: number, width: number, s: string, size: number, color: RGB, bold = false) {
    const lh = size * 1.4;
    for (const line of wrapLines(s, width, size, bold)) {
      ensureSpace(lh);
      text(x, top, line, size, { color, bold });
      top += lh;
    }
  }

  // ---- data lookups --------------------------------------------------------
  const fieldOf = (label: string): QuoteSummaryField | undefined =>
    quote.summaryFields.find((s) => s.label === label);
  const sf = (label: string): string => fieldOf(label)?.value ?? "N/A";
  const premMap = new Map(quote.premiums.map((p) => [p.label, p.value]));
  const pm = (label: string): string => premMap.get(label) ?? "N/A";
  const shortDate = (d: string) =>
    d.replace(
      /^(January|February|March|April|May|June|July|August|September|October|November|December)/,
      (m) => m.slice(0, 3)
    );
  const formatPhone = (p: string) => {
    const digits = p.replace(/\D/g, "");
    return digits.length === 10
      ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
      : p;
  };

  // ---- composite blocks ----------------------------------------------------
  function drawCard(x: number, t: number, w: number, title: string, rows: Row[]): number {
    const rowH = 22;
    const cardH = 34 + rows.length * rowH + 10;
    roundRect(x, t, w, cardH, 8, CARD_BG, CARD_BORDER);
    text(x + 16, t + 13, title.toUpperCase(), 8.5, { bold: true, color: MUTED });
    hline(x + 16, t + 30, x + w - 16, DIVIDER, 0.6);
    let ry = t + 34;
    rows.forEach((r, i) => {
      if (i % 2 === 1) roundRect(x + 8, ry, w - 16, rowH, 3, ROW_ALT);
      text(x + 16, ry + 6, r.label, 9, { color: MUTED });
      if (r.badge) {
        badge(x + w - 16, ry + (rowH - 15) / 2, r.value, r.badgeColor ?? GREY, r.badgeBg ?? GREY_BG);
      } else {
        text(0, ry + 6, r.value, 9, { bold: true, color: DARK, align: "right", rightX: x + w - 16 });
      }
      ry += rowH;
    });
    return t + cardH;
  }

  function sectionHeader(num: number, title: string) {
    ensureSpace(46);
    roundRect(CX, top, 20, 20, 5, NAVY1);
    text(CX + 10, top + 5, String(num), 10, { bold: true, color: WHITE, align: "center" });
    const upper = title.toUpperCase();
    text(CX + 28, top + 3, upper, 12.5, { bold: true, color: DARK });
    const tw = widthOf(upper, 12.5, true);
    hline(CX + 28 + tw + 14, top + 10, RX, DIVIDER, 1);
    top += 36;
  }

  /** Record card with a title and a 2-column label/value grid (drivers/vehicles). */
  function recordCard(title: string, pairs: [string, string][]) {
    const perCol = Math.ceil(pairs.length / 2);
    const cardH = 28 + perCol * 18 + 12;
    ensureSpace(cardH + 8);
    roundRect(CX, top, CW, cardH, 8, CARD_BG, CARD_BORDER);
    text(CX + 16, top + 10, title, 10, { bold: true, color: NAVY1 });
    const innerX = CX + 16;
    const gap = 24;
    const colW = (CW - 32 - gap) / 2;
    const col0R = innerX + colW;
    const col1X = innerX + colW + gap;
    const col1R = col1X + colW;
    const rowY = top + 28;
    pairs.forEach(([k, v], i) => {
      const c = i < perCol ? 0 : 1;
      const r = i % perCol;
      const y = rowY + r * 18;
      const lx = c === 0 ? innerX : col1X;
      const rxc = c === 0 ? col0R : col1R;
      text(lx, y, k, 8, { color: MUTED });
      text(0, y, v || "N/A", 8.5, { bold: true, color: DARK, align: "right", rightX: rxc });
    });
    top += cardH + 8;
  }

  /** One-line "question .... Answer" row for the application form. */
  function ynRow(question: string, answer: string) {
    ensureSpace(18);
    text(CX + 2, top, question, 9, { color: DARK });
    badge(RX, top - 1.5, answer, answer === "Yes" ? GREEN : GREY, answer === "Yes" ? GREEN_BG : GREY_BG);
    top += 20;
  }
  function factLine(label: string, value: string) {
    ensureSpace(16);
    text(CX + 2, top, label, 9, { bold: true, color: DARK });
    const lw = widthOf(label, 9, true);
    text(CX + 6 + lw, top, value, 9, { color: MUTED });
    top += 16;
  }
  function flag(label: string) {
    ensureSpace(26);
    const w = widthOf(label, 9, true) + 24;
    roundRect(CX, top, w, 18, 4, NAVY1);
    text(CX + 12, top + 4, label, 9, { bold: true, color: WHITE });
    top += 26;
  }

  // ============================ PAGE 1 — SUMMARY ============================
  newPage(true);

  // HEADER (full-bleed gradient)
  gradientRect(0, 0, PW, 140, 0);
  roundRect(CX, 34, 46, 46, 9, WHITE);
  text(CX + 23, 46, "M", 26, { bold: true, color: NAVY1, align: "center" });
  text(100, 34, "Morpheus", 22, { bold: true, color: WHITE });
  text(100, 60, "Insurance", 22, { bold: true, color: WHITE });
  text(101, 90, "C O M M E R C I A L   T R U C K I N G", 6.5, { bold: true, color: LIGHTBLUE });
  text(101, 100, "C O V E R A G E", 6.5, { bold: true, color: LIGHTBLUE });
  text(0, 34, "Q U O T E", 8, { color: LIGHTBLUE, align: "right", rightX: RX });
  text(0, 45, `#${quote.quoteId}`, 20, { bold: true, color: WHITE, align: "right", rightX: RX });
  text(0, 74, `Proposal ${quote.proposal}`, 9, { color: LIGHTBLUE, align: "right", rightX: RX });

  // SUBHEADER strip
  roundRect(0, 140, PW, 32, 0, SUBBG);
  text(CX, 149, `${quote.insured}  ·  ${quote.state}`, 11, { bold: true, color: DARK });
  text(
    0,
    151,
    `Effective ${shortDate(quote.effectiveDate)}  →  Expires ${shortDate(quote.expirationDate)}`,
    9,
    { color: MUTED, align: "right", rightX: RX }
  );

  // ESTIMATE BAND
  top = 192;
  gradientRect(CX, top, CW, 84, 12);
  text(CX + 24, top + 18, "Y O U R   Q U O T E   E S T I M A T E", 9, { color: LIGHTBLUE });
  text(CX + 24, top + 32, quote.estimate, 32, { bold: true, color: WHITE });
  labelValueRight(RX - 24, top + 24, "Liability Limit", sf("Liability Limit"), 10, LIGHTBLUE, WHITE);
  labelValueRight(
    RX - 24,
    top + 46,
    "Legal Entity / Type",
    `${sf("Legal Entity")} · ${sf("Trucking Company Type")}`,
    10,
    LIGHTBLUE,
    WHITE
  );
  top += 84 + 24;

  // SECTION 1 — ACCOUNT DETAILS
  sectionHeader(1, "Account Details");
  let cardTop = top;
  const bizBottom = drawCard(CX, cardTop, 248, "Business", [
    { label: "Company Name", value: sf("Company Name") },
    { label: "DBA", value: sf("DBA") },
    { label: "Legal Entity", value: sf("Legal Entity") },
    { label: "Company Type", value: sf("Trucking Company Type") },
    { label: "Year Established", value: sf("Year Established") },
    { label: "Owner Experience", value: `${sf("Owner`s Experience")} yrs` },
  ]);
  const ownBottom = drawCard(307, cardTop, 248, "Owner & Contact", [
    { label: "Owner Name", value: quote.owner.name },
    { label: "Email", value: quote.owner.email },
    { label: "Phone", value: formatPhone(quote.owner.phone) },
    { label: "DOT Number", value: sf("DOT Number") },
    { label: "MC Number", value: sf("MC Number") },
    { label: "Has Terminal", value: sf("Has Terminal") },
  ]);
  top = Math.max(bizBottom, ownBottom) + 22;

  // SECTION 2 — COVERAGE & LOCATION
  sectionHeader(2, "Coverage & Location");
  cardTop = top;
  const coverageLabels = [
    "General Liability",
    "Un/Under Ins Motorist",
    "UIIA",
    "Personal Injury Protection",
    "Auto Medical Payments",
    "Medical Coverage",
  ];
  const coverageRows: Row[] = coverageLabels.map((label) => {
    const fld = fieldOf(label);
    const ok = fld?.tone === "ok";
    return {
      label,
      value: fld?.value ?? "Not selected",
      badge: true,
      badgeBg: ok ? GREEN_BG : GREY_BG,
      badgeColor: ok ? GREEN : GREY,
    };
  });
  const covBottom = drawCard(CX, cardTop, 248, "Selected Coverages", coverageRows);
  const limBottom = drawCard(307, cardTop, 248, "Limits & Endorsements", [
    { label: "Liability Limit", value: sf("Liability Limit") },
    { label: "UM Coverage", value: sf("UM Coverage") },
    { label: "UM Limits", value: sf("UM Limits") },
    { label: "UII Endorsement", value: sf("UII Endorsement") },
    { label: "State Insured", value: quote.state },
    { label: "Commodities", value: `${sf("Commodity 1")} · ${sf("Commodity 2")}` },
  ]);
  top = Math.max(covBottom, limBottom) + 22;

  // SECTION 3 — PREMIUM BREAKDOWN
  sectionHeader(3, "Premium Breakdown");
  text(CX + 4, top + 6, "LINE ITEM", 9, { bold: true, color: MUTED });
  text(0, top + 6, "AMOUNT", 9, { bold: true, color: MUTED, align: "right", rightX: RX - 4 });
  hline(CX, top + 22, RX, DIVIDER, 1);
  top += 26;
  const groupHeader = (label: string) => {
    roundRect(CX, top, CW, 20, 0, GROUP_BG);
    text(CX + 8, top + 6, label, 8.5, { bold: true, color: MUTED });
    top += 20;
  };
  const itemRow = (label: string, value: string, muted = false) => {
    text(CX + 8, top + 6, label, 9.5, { color: muted ? MUTED2 : DARK });
    text(0, top + 6, value, 9.5, {
      bold: true,
      color: muted ? MUTED2 : DARK,
      align: "right",
      rightX: RX - 8,
    });
    hline(CX + 4, top + 22, RX - 4, ROW_LINE, 0.5);
    top += 22;
  };
  groupHeader("PREMIUMS");
  itemRow("AL Premium", pm("AL Premium"));
  itemRow("GL Premium", pm("GL Premium"));
  itemRow("UII Endorsement Premium", pm("UII Endorsement Premium"));
  itemRow("UM Premium", pm("UM Premium"));
  itemRow("Med · PIP · Hired Auto · Non-Owned", pm("Med Premium"), true);
  groupHeader("FEES & TAXES");
  itemRow("Policy Fee", pm("Policy Fee"));
  itemRow("Capitalization", pm("Capitalization"));
  itemRow("Domicile Tax", pm("Domicile Tax"));
  itemRow("Processing Fee", sf("Processing Fee"));
  itemRow("State Tax", pm("State Tax"));
  top += 6;
  gradientRect(CX, top, CW, 34, 8);
  text(CX + 16, top + 11, "Total Amount", 12, { bold: true, color: WHITE });
  text(0, top + 11, quote.totalAmount, 13, { bold: true, color: WHITE, align: "right", rightX: RX - 16 });
  top += 34 + 26;

  // ============================ SECTION 4 — DRIVERS ============================
  sectionHeader(4, `Drivers (${quote.drivers.length})`);
  quote.drivers.forEach((d, i) => {
    recordCard(`Driver ${i + 1}`, [
      ["Driver Names", d.names],
      ["Age", d.age],
      ["State", d.state],
      ["License Number", d.licenseNumber],
      ["License Class", d.licenseClass],
      ["License Issue Date", d.licenseIssueDate],
      ["Violations", d.violations],
      ["Owner", d.owner],
    ]);
  });
  top += 8;

  // ============================ SECTION 5 — VEHICLES ============================
  sectionHeader(5, `Vehicles (${quote.vehicles.length})`);
  quote.vehicles.forEach((v, i) => {
    recordCard(`Vehicle ${i + 1}`, [
      ["VIN", v.vin],
      ["Year", v.year],
      ["Vehicle Type", v.type],
      ["Make", v.make],
      ["Physical Damage", v.physicalDamage],
      ["Operating Radius", v.operatingRadius],
      ["Team Driver", v.teamDriver],
    ]);
  });
  top += 8;

  // ============================ SECTION 6 — APPLICATION FORM ============================
  sectionHeader(6, "Application For Coverage");
  factLine("Agency:", quote.agency);
  factLine("Producer:", quote.agency);
  top += 6;

  recordCard("Applicant Details", [
    ["Company Name", quote.insured],
    ["DBA", quote.dba],
    ["Mailing State", quote.state],
    ["E-Mail", quote.owner.email],
    ["Phone Number", formatPhone(quote.owner.phone)],
    ["Target Effective", shortDate(quote.effectiveDate)],
    ["Owner / Executive", quote.owner.name],
    ["US DOT", sf("DOT Number")],
    ["MC Number", sf("MC Number")],
    ["Federal Tax ID", "N/A"],
  ]);

  factLine("Form of Business:", "LLC");
  factLine("Years in Business:", "5");
  factLine("Owner`s Experience:", `${sf("Owner`s Experience")} years`);
  top += 6;

  flag("Description of Operations");
  factLine("Carrier Type:", "Common");
  factLine("US DOT / MC:", `${sf("DOT Number")} / ${sf("MC Number")}`);
  factLine("Commodities:", `${sf("Commodity 1")} · ${sf("Commodity 2")}`);
  top += 4;

  ynRow("Has the company ever been under another name or DOT?", "No");
  ynRow("Have you been cancelled or non-renewed in the last 3 years?", "No");
  ynRow("Is Carrier involved in any non-trucking?", "No");
  ynRow("Do drivers complete employment applications for the job?", "No");
  ynRow("Does Carrier Team driver at all?", "No");
  ynRow("Do any operations occur in Canada or Mexico?", "No");
  ynRow("Any Subsidiaries?", "No");
  ynRow("Does the insured have a terminal or terminals?", "No");
  top += 6;

  flag("Coverages and Limits");
  factLine("Liability Limit:", sf("Liability Limit"));
  factLine("Supplementary Coverages:", "UIIA");
  factLine("UM-UIM BI Other Limit:", sf("UM Limits"));
  factLine("General Liability:", sf("General Liability"));
  top += 8;

  flag("Equipment Schedule");
  quote.vehicles.forEach((v, i) => {
    recordCard(`Unit ${i + 1}`, [
      ["Vehicle Type", v.type],
      ["VIN", v.vin],
      ["Year", v.year],
      ["Make", v.make],
    ]);
  });
  top += 4;

  flag("Driver Schedule");
  quote.drivers.forEach((d, i) => {
    recordCard(`Driver ${i + 1}`, [
      ["Driver Names", d.names],
      ["Date of Birth", "N/A"],
      ["License Number", d.licenseNumber],
      ["Years Experience", "N/A"],
    ]);
  });
  top += 8;

  ensureSpace(60);
  paragraph(
    CX,
    CW,
    "The statements and answers given on this application are true and accurate. The applicant has not wilfully concealed or misrepresented any material fact or circumstance concerning this application.",
    8.5,
    MUTED
  );
  top += 6;
  factLine("Date:", new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }));

  // ---- per-page footers ----------------------------------------------------
  const total = pages.length;
  pages.forEach((p, i) => {
    cur = p;
    const fy = PH - 42;
    hline(CX, fy - 6, RX, DIVIDER, 0.6);
    text(CX, fy, "Morpheus Insurance · Commercial Trucking Coverage", 7.5, { bold: true, color: MUTED });
    text(0, fy, `Quote #${quote.quoteId}  ·  Page ${i + 1} of ${total}`, 7.5, {
      color: MUTED2,
      align: "right",
      rightX: RX,
    });
  });

  // ============================ ASSEMBLE PDF ============================
  // Fixed objects: 1 catalog, 2 pages, 3 F1, 4 F2, 5 FnA, 6 FnB, 7 FnStitch.
  const objects: string[] = [];
  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
  objects[4] =
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";
  objects[5] = `<< /FunctionType 2 /Domain [0 1] /C0 [${col(NAVY1)}] /C1 [${col(BLUE)}] /N 1 >>`;
  objects[6] = `<< /FunctionType 2 /Domain [0 1] /C0 [${col(BLUE)}] /C1 [${col(NAVY2)}] /N 1 >>`;
  objects[7] =
    "<< /FunctionType 3 /Domain [0 1] /Functions [5 0 R 6 0 R] /Bounds [0.5] /Encode [0 1 0 1] >>";

  let nextId = 8;
  const meta = pages.map((p) => {
    const pageNum = nextId++;
    const contentNum = nextId++;
    const shadingNums = p.shadings.map(() => nextId++);
    return { p, pageNum, contentNum, shadingNums };
  });

  const kids = meta.map((m) => `${m.pageNum} 0 R`).join(" ");
  objects[2] = `<< /Type /Pages /Kids [${kids}] /Count ${pages.length} >>`;

  for (const m of meta) {
    const content = m.p.ops.join("");
    const shadingRefs = m.p.shadings
      .map((s, i) => `/${s.name} ${m.shadingNums[i]} 0 R`)
      .join(" ");
    objects[m.pageNum] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PW} ${PH}] ` +
      `/Resources << /Font << /F1 3 0 R /F2 4 0 R >> /Shading << ${shadingRefs} >> >> ` +
      `/Contents ${m.contentNum} 0 R >>`;
    objects[m.contentNum] = `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
    m.p.shadings.forEach((s, i) => {
      const y0 = PH - s.top; // top-left
      const y1 = PH - (s.top + s.h); // bottom-right
      objects[m.shadingNums[i]] =
        `<< /ShadingType 2 /ColorSpace /DeviceRGB ` +
        `/Coords [${f(s.x)} ${f(y0)} ${f(s.x + s.w)} ${f(y1)}] ` +
        `/Function 7 0 R /Extend [true true] >>`;
    });
  }

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  for (let i = 1; i < objects.length; i++) {
    offsets[i] = pdf.length;
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }
  const xrefStart = pdf.length;
  const count = objects.length;
  pdf += `xref\n0 ${count}\n0000000000 65535 f \n`;
  for (let i = 1; i < objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${count} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new Blob([pdf], { type: "application/pdf" });
}

/** Generates and triggers a browser download of the quote as a PDF. */
export function downloadQuotePdf(quote: QuoteDetail): void {
  const blob = buildQuotePdf(quote);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Quote-${quote.quoteId}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
