/**
 * Standalone contract PDF generator.
 * Used by both ContractGenerator (wizard step 4) and ContractsList (direct download).
 * Generates a full employment agreement PDF with all clauses, equity tables,
 * salary progression, bar charts, signatures, and COO appendix.
 */
import { teamMembersSeed } from '../data/admin/team-seed';
import {
  employmentContractTemplate,
  fillTemplatePlaceholders,
  formatNok,
  nokToEur,
  getShareTypeLabel,
  getSeveranceMonths,
  getRoleDuties,
  roleAppendices,
} from '../data/admin/contract-templates';
import {
  spinoffCompanies,
  employeeEquityAllocations,
  fundingMilestoneBonuses,
} from '../data/admin/spinoff-equity-seed';
import {
  salaryProgression,
  fundingRounds,
  fundingRoundLabels,
} from '../data/admin/salary-seed';

const EUR_TO_NOK = 11.76;

const EMPLOYMENT_TYPE_LABELS: Record<string, string> = {
  'full-time': 'Full-Time',
  'part-time': 'Part-Time',
  flex: 'Flex',
  intern: 'Intern',
};

const BOARD_MEMBERS: Record<string, 'chair' | 'member'> = {
  'Daniel Mo Houshmand': 'chair',
  'Svein-Erik Nilsen': 'member',
  'Sharareh M. Shariat Panahi': 'member',
  'Caroline Woie': 'member',
  'Rajesh Chavan': 'member',
  'John Kristiansen': 'member',
  'Lindsay Sanner': 'member',
  'Lillian Kristiansen': 'member',
  'Yulia Ginzburg': 'member',
  'Daria Houshmand': 'member',
};

// Market salary benchmark data by tier: [qdaria, marketLow, marketMedian, marketHigh]
const MARKET_SALARY_BY_TIER: Record<string, { stage: string; values: [number, number, number, number] }[]> = {
  founder: [
    { stage: 'Pre-Seed', values: [160000, 55000, 71000, 85000] },
    { stage: 'Seed', values: [185000, 90000, 115000, 140000] },
    { stage: 'Series A', values: [220000, 140000, 163000, 200000] },
    { stage: 'Series B', values: [260000, 170000, 207000, 260000] },
    { stage: 'Series C', values: [310000, 200000, 258000, 340000] },
    { stage: 'IPO', values: [400000, 280000, 365000, 450000] },
  ],
  'c-suite': [
    { stage: 'Pre-Seed', values: [108000, 65000, 80000, 100000] },
    { stage: 'Seed', values: [120000, 85000, 110000, 115000] },
    { stage: 'Series A', values: [175000, 130000, 161000, 175000] },
    { stage: 'Series B', values: [200000, 155000, 184000, 230000] },
    { stage: 'Series C', values: [245000, 184000, 227000, 270000] },
    { stage: 'IPO', values: [300000, 210000, 265000, 310000] },
  ],
  senior: [
    { stage: 'Pre-Seed', values: [97000, 60000, 78000, 95000] },
    { stage: 'Seed', values: [105000, 75000, 90000, 110000] },
    { stage: 'Series A', values: [135000, 95000, 115000, 140000] },
    { stage: 'Series B', values: [155000, 110000, 135000, 165000] },
    { stage: 'Series C', values: [180000, 130000, 158000, 195000] },
    { stage: 'IPO', values: [220000, 160000, 195000, 240000] },
  ],
  mid: [
    { stage: 'Pre-Seed', values: [84000, 50000, 68000, 82000] },
    { stage: 'Seed', values: [92000, 60000, 78000, 95000] },
    { stage: 'Series A', values: [112000, 72000, 88000, 110000] },
    { stage: 'Series B', values: [128000, 85000, 105000, 130000] },
    { stage: 'Series C', values: [150000, 100000, 125000, 155000] },
    { stage: 'IPO', values: [182000, 125000, 155000, 190000] },
  ],
  junior: [
    { stage: 'Pre-Seed', values: [55000, 38000, 48000, 55000] },
    { stage: 'Seed', values: [60000, 45000, 55000, 65000] },
    { stage: 'Series A', values: [73000, 55000, 68000, 82000] },
    { stage: 'Series B', values: [84000, 65000, 78000, 95000] },
    { stage: 'Series C', values: [98000, 75000, 90000, 110000] },
    { stage: 'IPO', values: [120000, 90000, 110000, 135000] },
  ],
};

interface PdfOptions {
  employeeName: string;
  /** Override clause toggles. If omitted, all clauses are enabled. */
  enabledClauseIds?: Set<string>;
  /** Override form data fields */
  overrides?: Partial<{
    title: string;
    department: string;
    employmentType: string;
    startDate: string;
    salaryEur: number;
    equityPercentage: number;
    shareType: string;
    cliffMonths: number;
    tier: string;
  }>;
}

/**
 * Generate and download a full employment agreement PDF for any employee.
 */
export async function generateContractPdfForEmployee(opts: PdfOptions): Promise<void> {
  const { employeeName, enabledClauseIds, overrides } = opts;

  // --- Data lookups ---
  const member = teamMembersSeed.find((m) => m.name === employeeName);
  if (!member) throw new Error(`Employee not found: ${employeeName}`);

  const salaryEur = overrides?.salaryEur ?? member.salary_eur ?? 0;
  const salaryNok = Math.round(salaryEur * EUR_TO_NOK);
  const title = overrides?.title ?? member.title;
  const department = overrides?.department ?? member.department ?? '';
  const employmentType = overrides?.employmentType ?? member.employment_type;
  const startDate = overrides?.startDate ?? '2026-03-01';
  const equityPercentage = overrides?.equityPercentage ?? member.equity_percentage ?? 0;
  const shareType = overrides?.shareType ?? getShareTypeLabel(member.tier);
  const cliffMonths = overrides?.cliffMonths ?? member.vesting_cliff_months;
  const tier = overrides?.tier ?? member.tier;

  // Equity allocations across all companies
  const alloc = employeeEquityAllocations.find((e) => e.name === employeeName);
  const equityRows: { company: string; pct: number }[] = [];
  if (alloc) {
    const idToName: Record<string, string> = { 'qdaria-holding': 'QDaria Holdings AS' };
    for (const s of spinoffCompanies) idToName[s.id] = s.name;
    const orderedIds = ['qdaria-holding', ...spinoffCompanies.map((s) => s.id)];
    for (const id of orderedIds) {
      const pct = alloc.allocations[id];
      if (pct !== undefined && pct > 0) equityRows.push({ company: idToName[id] || id, pct });
    }
  } else {
    equityRows.push({ company: 'QDaria Holdings AS', pct: equityPercentage });
  }
  const equityTotal = equityRows.reduce((s, r) => s + r.pct, 0);

  // Salary progression
  const salaryEntry = salaryProgression.find((e) => e.name === employeeName);

  // Clauses
  const enabledIds = enabledClauseIds ?? new Set(employmentContractTemplate.clauses.map((c) => c.id));
  const activeClauses = employmentContractTemplate.clauses.filter((c) => enabledIds.has(c.id));

  const templateValues = {
    employeeName,
    title,
    department,
    employmentType: EMPLOYMENT_TYPE_LABELS[employmentType] || employmentType,
    startDate,
    salaryNok: formatNok(salaryNok),
    salaryEur: formatNok(salaryEur),
    equityPercentage: String(equityPercentage),
    shareType,
    cliffMonths: String(cliffMonths),
    seedSalary: salaryEntry ? formatNok(salaryEntry.salaries['seed']) : formatNok(Math.round(salaryEur * 1.25)),
    seriesASalary: salaryEntry ? formatNok(salaryEntry.salaries['round-a']) : formatNok(Math.round(salaryEur * 1.6)),
    seriesBSalary: salaryEntry ? formatNok(salaryEntry.salaries['round-b']) : formatNok(Math.round(salaryEur * 2.0)),
    seriesCSalary: salaryEntry ? formatNok(salaryEntry.salaries['round-c']) : formatNok(Math.round(salaryEur * 2.5)),
    ipoSalary: salaryEntry ? formatNok(salaryEntry.salaries['ipo']) : formatNok(Math.round(salaryEur * 3.0)),
    roleDuties: getRoleDuties(title),
    equityTable: '[EQUITY_TABLE_PLACEHOLDER]',
    totalEquityPct: equityTotal.toFixed(2),
  };

  const filledClauses = activeClauses.map((c) => ({
    ...c,
    filledContent: fillTemplatePlaceholders(c.content, templateValues),
  }));

  // --- COO appendix ---
  let getCooAppendixForEmployee: ((name: string) => string | null) | null = null;
  try {
    const cooModule = await import('../data/admin/coo-appendix');
    getCooAppendixForEmployee = cooModule.getCooAppendixForEmployee;
  } catch { /* not available */ }

  // --- PDF Generation ---
  const { default: jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;
  let pageNum = 1;
  let tableCounter = 0;

  // Colors
  const NAVY = { r: 15, g: 23, b: 42 };
  const CYAN = { r: 0, g: 210, b: 211 };
  const DARK = { r: 30, g: 30, b: 30 };
  const MID_GRAY = { r: 100, g: 100, b: 100 };
  const LIGHT_GRAY = { r: 150, g: 150, b: 150 };
  const STRIPE_ODD = { r: 248, g: 249, b: 252 };
  const STRIPE_EVEN = { r: 255, g: 255, b: 255 };
  const ALERT_RED = { r: 153, g: 27, b: 27 };
  const SEGMENT_COLORS = [
    { r: 0, g: 210, b: 211 },   // Cyan (Holdings)
    { r: 59, g: 130, b: 246 },  // Blue
    { r: 139, g: 92, b: 246 },  // Purple
    { r: 236, g: 72, b: 153 },  // Pink
    { r: 245, g: 158, b: 11 },  // Amber
    { r: 16, g: 185, b: 129 },  // Emerald
    { r: 239, g: 68, b: 68 },   // Red
    { r: 107, g: 114, b: 128 }, // Gray
    { r: 14, g: 165, b: 233 },  // Sky
  ];

  // Monkey-patch doc.text to guard against invalid arguments
  const origText = doc.text.bind(doc);
  doc.text = ((text: unknown, x: unknown, yPos: unknown, options?: unknown) => {
    if (text == null || text === '' || (typeof text === 'string' && text.trim() === '')) return doc;
    if (typeof x !== 'number' || typeof yPos !== 'number' || !isFinite(x) || !isFinite(yPos)) return doc;
    return origText(text as string, x, yPos, options as Parameters<typeof origText>[3]);
  }) as typeof doc.text;

  const addPageNumber = () => {
    doc.setFontSize(8);
    doc.setTextColor(LIGHT_GRAY.r, LIGHT_GRAY.g, LIGHT_GRAY.b);
    doc.text(`Page ${pageNum}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    doc.text('CONFIDENTIAL', pageWidth - margin, pageHeight - 10, { align: 'right' });
  };

  const checkPageBreak = (requiredHeight: number) => {
    if (y + requiredHeight > pageHeight - 25) {
      addPageNumber();
      doc.addPage();
      pageNum++;
      y = margin;
    }
  };

  // ── Rich text renderer ──
  const renderRichText = (text: string, x: number, startY: number, maxW: number): number => {
    y = startY;
    const lines = text.split('\n');
    for (const line of lines) {
      // Section header
      if (/^\d+\.\s+[A-Z][A-Z\s&,/]+$/.test(line.trim())) {
        checkPageBreak(16);
        y += 4;
        doc.setDrawColor(200, 210, 220);
        doc.line(x, y, x + maxW, y);
        y += 6;
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
        doc.text(line.trim(), x, y);
        y += 2;
        // Cyan underline accent
        doc.setDrawColor(CYAN.r, CYAN.g, CYAN.b);
        doc.setLineWidth(0.8);
        doc.line(x, y, x + Math.min(doc.getTextWidth(line.trim()) + 4, maxW), y);
        doc.setLineWidth(0.2);
        y += 5;
        continue;
      }
      // Sub-header
      if (/^\d+\.\d+\s+.+:?\s*$/.test(line.trim())) {
        checkPageBreak(8);
        y += 3;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(DARK.r, DARK.g, DARK.b);
        doc.text(line.trim(), x, y);
        y += 5.5;
        continue;
      }
      // Appendix sub-header (C.1, C.2, C.1.1, C.3.1, etc.)
      if (/^[A-Z]\.\d+(\.\d+)?\s+/.test(line.trim())) {
        checkPageBreak(8);
        y += 2;
        doc.setFontSize(10.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
        doc.text(line.trim(), x, y);
        y += 5.5;
        continue;
      }
      // IMPORTANT callout
      if (/^IMPORTANT:/i.test(line.trim())) {
        checkPageBreak(10);
        y += 1;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(ALERT_RED.r, ALERT_RED.g, ALERT_RED.b);
        for (const wl of doc.splitTextToSize(line.trim(), maxW)) {
          checkPageBreak(5);
          doc.text(wl, x, y);
          y += 4.2;
        }
        y += 1;
        continue;
      }
      // Lettered bullet
      if (/^\s*\([a-z]+\)\s+/.test(line) || /^\s*\([ivxlcdm]+\)\s+/i.test(line)) {
        checkPageBreak(6);
        const bi = 8;
        const m = line.match(/^(\s*\([a-z]+\)|\s*\([ivxlcdm]+\))\s+(.*)/i);
        if (m) {
          doc.setFontSize(8.5);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(MID_GRAY.r, MID_GRAY.g, MID_GRAY.b);
          doc.text(m[1].trim(), x + bi, y);
          doc.setTextColor(DARK.r, DARK.g, DARK.b);
          doc.setFontSize(9);
          for (const bl of doc.splitTextToSize(m[2], maxW - bi - 12)) {
            checkPageBreak(5);
            doc.text(bl, x + bi + 12, y);
            y += 4.2;
          }
        } else {
          doc.setFontSize(9);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(DARK.r, DARK.g, DARK.b);
          doc.text(line.trim(), x + bi, y);
          y += 4.2;
        }
        continue;
      }
      // Dash bullet
      if (/^\s+[-\u2022*]\s+/.test(line)) {
        checkPageBreak(6);
        const bi = 6;
        const bt = line.replace(/^\s+[-\u2022*]\s+/, '');
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(MID_GRAY.r, MID_GRAY.g, MID_GRAY.b);
        doc.text('\u2022', x + bi, y);
        doc.setTextColor(DARK.r, DARK.g, DARK.b);
        for (const bl of doc.splitTextToSize(bt, maxW - bi - 5)) {
          checkPageBreak(5);
          doc.text(bl, x + bi + 5, y);
          y += 4.2;
        }
        continue;
      }
      // Signature line (underscore pattern)
      if (/^_{10,}$/.test(line.trim())) {
        checkPageBreak(6);
        doc.setDrawColor(LIGHT_GRAY.r, LIGHT_GRAY.g, LIGHT_GRAY.b);
        doc.line(x, y, x + 70, y);
        y += 4;
        continue;
      }
      // SIGNATURES header in appendix
      if (line.trim() === 'SIGNATURES') {
        checkPageBreak(16);
        y += 6;
        doc.setDrawColor(200, 210, 220);
        doc.line(x, y, x + maxW, y);
        y += 8;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(DARK.r, DARK.g, DARK.b);
        doc.text('SIGNATURES', x, y);
        y += 10;
        continue;
      }
      // Empty line
      if (line.trim() === '') { y += 2.5; continue; }
      // Normal text (with inline **bold**)
      checkPageBreak(5);
      doc.setFontSize(9);
      doc.setTextColor(DARK.r, DARK.g, DARK.b);
      if (line.includes('**')) {
        const plainText = line.replace(/\*\*/g, '');
        const wrapped = doc.splitTextToSize(plainText, maxW);
        if (wrapped.length <= 1) {
          let curX = x;
          for (const seg of line.split(/(\*\*[^*]+\*\*)/)) {
            if (seg.startsWith('**') && seg.endsWith('**')) {
              const boldText = seg.slice(2, -2);
              doc.setFont('helvetica', 'bold');
              doc.text(boldText, curX, y);
              curX += doc.getTextWidth(boldText);
              doc.setFont('helvetica', 'normal');
            } else if (seg) {
              doc.text(seg, curX, y);
              curX += doc.getTextWidth(seg);
            }
          }
          y += 4.2;
        } else {
          doc.setFont('helvetica', 'normal');
          for (const wl of wrapped) { checkPageBreak(5); doc.text(wl, x, y); y += 4.2; }
        }
      } else {
        doc.setFont('helvetica', 'normal');
        for (const wl of doc.splitTextToSize(line.trimEnd(), maxW)) {
          checkPageBreak(5);
          doc.text(wl, x, y);
          y += 4.2;
        }
      }
    }
    return y;
  };

  // ── Table renderer ──
  const renderTable = (
    tTitle: string,
    headers: string[],
    rows: string[][],
    colWidths: number[],
  ) => {
    const rowH = 7;
    const headerH = 8;
    const tableW = colWidths.reduce((s, w) => s + w, 0);
    checkPageBreak(Math.min(headerH + rows.length * rowH + 16, 90));

    if (tTitle.trim()) {
      tableCounter++;
      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(DARK.r, DARK.g, DARK.b);
      doc.text(`Table ${tableCounter}: ${tTitle}`, margin, y);
      y += 7;
    } else {
      y += 2;
    }

    // Header
    doc.setFillColor(NAVY.r, NAVY.g, NAVY.b);
    doc.rect(margin, y, tableW, headerH, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    let xP = margin + 3;
    for (let i = 0; i < headers.length; i++) { doc.text(headers[i], xP, y + 5.5); xP += colWidths[i]; }
    y += headerH;

    // Rows
    for (let ri = 0; ri < rows.length; ri++) {
      checkPageBreak(rowH + 2);
      const row = rows[ri];
      const isTotal = row[0] === 'TOTAL';
      if (isTotal) doc.setFillColor(235, 240, 248);
      else if (ri % 2 === 0) doc.setFillColor(STRIPE_ODD.r, STRIPE_ODD.g, STRIPE_ODD.b);
      else doc.setFillColor(STRIPE_EVEN.r, STRIPE_EVEN.g, STRIPE_EVEN.b);
      doc.rect(margin, y, tableW, rowH, 'F');
      if (isTotal) {
        doc.setDrawColor(NAVY.r, NAVY.g, NAVY.b);
        doc.setLineWidth(0.5);
        doc.line(margin, y, margin + tableW, y);
        doc.setLineWidth(0.2);
      }
      if (isTotal) { doc.setFont('helvetica', 'bold'); doc.setTextColor(NAVY.r, NAVY.g, NAVY.b); }
      else { doc.setFont('helvetica', 'normal'); doc.setTextColor(40, 40, 40); }
      doc.setFontSize(8);
      xP = margin + 3;
      for (let i = 0; i < row.length; i++) { doc.text(row[i], xP, y + 5); xP += colWidths[i]; }
      y += rowH;
    }
    const tableTop = y - rows.length * rowH - headerH;
    doc.setDrawColor(200, 210, 220);
    doc.setLineWidth(0.3);
    doc.rect(margin, tableTop, tableW, rows.length * rowH + headerH, 'S');
    doc.setLineWidth(0.2);
    y += 5;
  };

  // ── Bar chart renderer ──
  const renderBarChart = (chartTitle: string, labels: string[], values: number[], unit: string) => {
    checkPageBreak(labels.length * 10 + 30);
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(DARK.r, DARK.g, DARK.b);
    doc.text(chartTitle, margin, y);
    y += 8;
    const lw = 28;
    const cax = margin + lw;
    const caw = contentWidth - lw - 10;
    const bh = 6;
    const bs = 10;
    const maxVal = Math.max(...values, 1);
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(MID_GRAY.r, MID_GRAY.g, MID_GRAY.b);
    for (let s = 0; s <= 5; s++) {
      const sv = Math.round((maxVal / 5) * s);
      const sx = cax + (caw * s) / 5;
      doc.text(sv >= 1000 ? `${Math.round(sv / 1000)}k` : String(sv), sx, y, { align: 'center' });
      doc.setDrawColor(230, 230, 230);
      doc.line(sx, y + 1, sx, y + 1 + labels.length * bs);
    }
    y += 3;
    for (let i = 0; i < labels.length; i++) {
      const by = y + i * bs;
      const bw = (values[i] / maxVal) * caw;
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(DARK.r, DARK.g, DARK.b);
      doc.text(labels[i], margin, by + 4.5);
      doc.setFillColor(CYAN.r, CYAN.g, CYAN.b);
      doc.roundedRect(cax, by + 1, Math.max(bw, 1), bh, 1, 1, 'F');
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
      doc.text(`${unit} ${formatNok(values[i])}`, Math.min(cax + bw + 2, cax + caw - 5), by + 5.5);
    }
    y += labels.length * bs + 6;
  };

  // ── Grouped bar chart renderer (side-by-side comparison) ──
  const renderGroupedBarChart = (
    chartTitle: string,
    labels: string[],
    values1: number[], label1: string, color1: { r: number; g: number; b: number },
    values2: number[], label2: string, color2: { r: number; g: number; b: number },
    unit: string,
  ) => {
    const rowH = 12;
    const barH = 4.5;
    checkPageBreak(labels.length * rowH + 40);
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(DARK.r, DARK.g, DARK.b);
    doc.text(chartTitle, margin, y);
    y += 6;
    // Legend
    const legendX = margin + contentWidth - 70;
    doc.setFillColor(color1.r, color1.g, color1.b);
    doc.rect(legendX, y - 3, 4, 4, 'F');
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(DARK.r, DARK.g, DARK.b);
    doc.text(label1, legendX + 6, y);
    doc.setFillColor(color2.r, color2.g, color2.b);
    doc.rect(legendX + 35, y - 3, 4, 4, 'F');
    doc.text(label2, legendX + 41, y);
    y += 6;
    const lw = 28;
    const cax = margin + lw;
    const caw = contentWidth - lw - 10;
    const allValues = [...values1, ...values2];
    const maxVal = Math.max(...allValues, 1);
    // Grid lines
    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(MID_GRAY.r, MID_GRAY.g, MID_GRAY.b);
    for (let s = 0; s <= 5; s++) {
      const sv = Math.round((maxVal / 5) * s);
      const sx = cax + (caw * s) / 5;
      doc.text(sv >= 1000 ? `${Math.round(sv / 1000)}k` : String(sv), sx, y, { align: 'center' });
      doc.setDrawColor(230, 230, 230);
      doc.line(sx, y + 1, sx, y + 1 + labels.length * rowH);
    }
    y += 3;
    for (let i = 0; i < labels.length; i++) {
      const by = y + i * rowH;
      const bw1 = (values1[i] / maxVal) * caw;
      const bw2 = (values2[i] / maxVal) * caw;
      // Label
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(DARK.r, DARK.g, DARK.b);
      doc.text(labels[i], margin, by + 4);
      // Bar 1
      doc.setFillColor(color1.r, color1.g, color1.b);
      doc.roundedRect(cax, by + 0.5, Math.max(bw1, 1), barH, 0.8, 0.8, 'F');
      // Bar 2
      doc.setFillColor(color2.r, color2.g, color2.b);
      doc.roundedRect(cax, by + barH + 1.5, Math.max(bw2, 1), barH, 0.8, 0.8, 'F');
      // Values
      doc.setFontSize(6);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
      doc.text(
        `${unit ? unit + ' ' : ''}${formatNok(values1[i])}`,
        Math.min(cax + bw1 + 2, cax + caw - 5), by + 4,
      );
      doc.setTextColor(MID_GRAY.r, MID_GRAY.g, MID_GRAY.b);
      doc.text(
        `${unit ? unit + ' ' : ''}${formatNok(values2[i])}`,
        Math.min(cax + bw2 + 2, cax + caw - 5), by + barH + 5,
      );
    }
    y += labels.length * rowH + 6;
  };

  // ── Stacked horizontal bar renderer ──
  const renderStackedBar = (
    chartTitle: string,
    segments: { label: string; value: number; color: { r: number; g: number; b: number } }[],
  ) => {
    const totalValue = segments.reduce((s, seg) => s + seg.value, 0);
    if (totalValue <= 0) return;
    const legendRows = Math.ceil(segments.length / 3);
    checkPageBreak(40 + legendRows * 8);
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(DARK.r, DARK.g, DARK.b);
    doc.text(chartTitle, margin, y);
    y += 8;
    // Stacked bar
    const barH = 14;
    const barW = contentWidth;
    let bx = margin;
    for (const seg of segments) {
      const segW = (seg.value / totalValue) * barW;
      if (segW < 0.5) { bx += segW; continue; }
      doc.setFillColor(seg.color.r, seg.color.g, seg.color.b);
      doc.rect(bx, y, segW, barH, 'F');
      // Percentage text inside segment if wide enough
      if (segW > 12) {
        const pctStr = `${seg.value.toFixed(1)}%`;
        doc.setFontSize(6);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(pctStr, bx + segW / 2, y + barH / 2 + 1.5, { align: 'center' });
      }
      bx += segW;
    }
    // Border around entire bar
    doc.setDrawColor(200, 210, 220);
    doc.setLineWidth(0.3);
    doc.rect(margin, y, barW, barH, 'S');
    doc.setLineWidth(0.2);
    y += barH + 6;
    // Legend (3 columns)
    const colW = contentWidth / 3;
    for (let i = 0; i < segments.length; i++) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const lx = margin + col * colW;
      const ly = y + row * 8;
      doc.setFillColor(segments[i].color.r, segments[i].color.g, segments[i].color.b);
      doc.rect(lx, ly - 3, 4, 4, 'F');
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(DARK.r, DARK.g, DARK.b);
      const segLabel = segments[i].label.length > 20
        ? segments[i].label.substring(0, 18) + '..'
        : segments[i].label;
      doc.text(`${segLabel}: ${segments[i].value.toFixed(2)}%`, lx + 6, ly);
    }
    y += legendRows * 8 + 4;
  };

  // ===== PAGE 1: COVER =====
  doc.setFillColor(7, 11, 20);
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setFontSize(18);
  doc.setTextColor(CYAN.r, CYAN.g, CYAN.b);
  doc.text('QDARIA HOLDINGS AS', margin, 18);
  doc.setFontSize(12);
  doc.setTextColor(200, 200, 200);
  doc.text('Employment Agreement', margin, 28);
  doc.setFontSize(9);
  doc.setTextColor(LIGHT_GRAY.r, LIGHT_GRAY.g, LIGHT_GRAY.b);
  doc.text('Org. Nr. 932 163 378', pageWidth - margin, 18, { align: 'right' });
  doc.text('Oslo, Norway', pageWidth - margin, 24, { align: 'right' });
  y = 50;

  // Document info
  doc.setFontSize(9);
  doc.setTextColor(MID_GRAY.r, MID_GRAY.g, MID_GRAY.b);
  const refNumber = `QD-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
  doc.text(`Reference: ${refNumber}`, margin, y);
  doc.text(
    `Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    pageWidth - margin, y, { align: 'right' },
  );
  y += 8;

  // Employee details box
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'F');
  doc.setDrawColor(200, 210, 220);
  doc.roundedRect(margin, y, contentWidth, 38, 2, 2, 'S');
  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);
  doc.setFont('helvetica', 'bold');
  doc.text('EMPLOYEE DETAILS', margin + 5, y + 8);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const c1 = margin + 5;
  const c2 = margin + contentWidth / 2;
  const dy = y + 15;
  doc.setTextColor(MID_GRAY.r, MID_GRAY.g, MID_GRAY.b);
  doc.text('Name:', c1, dy);
  doc.text('Position:', c1, dy + 6);
  doc.text('Tier:', c1, dy + 12);
  doc.text('Department:', c2, dy);
  doc.text('Employment:', c2, dy + 6);
  doc.text('Cliff:', c2, dy + 12);
  doc.setTextColor(DARK.r, DARK.g, DARK.b);
  doc.text(employeeName, c1 + 30, dy);
  doc.text(title, c1 + 30, dy + 6);
  doc.text(tier || 'N/A', c1 + 30, dy + 12);
  doc.text(department, c2 + 35, dy);
  doc.text(EMPLOYMENT_TYPE_LABELS[employmentType] || employmentType, c2 + 35, dy + 6);
  doc.text(`${cliffMonths} months`, c2 + 35, dy + 12);
  y += 46;
  doc.setDrawColor(200, 210, 220);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // ===== PAGE 2: TABLE OF CONTENTS =====
  addPageNumber();
  doc.addPage();
  pageNum++;
  y = margin;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
  doc.text('TABLE OF CONTENTS', margin, y);
  y += 10;
  doc.setDrawColor(CYAN.r, CYAN.g, CYAN.b);
  doc.setLineWidth(0.5);
  doc.line(margin, y, margin + 40, y);
  doc.setLineWidth(0.2);
  y += 8;

  const tocEntries: string[] = [];
  for (const cl of filledClauses) {
    const first = cl.filledContent.split('\n')[0].trim();
    if (first) tocEntries.push(first);
  }
  tocEntries.push('Appendix A: Equity Distribution');
  tocEntries.push('Appendix B: Salary Progression');
  tocEntries.push('Appendix D: Funding Milestone Bonuses');
  tocEntries.push('Appendix E: References & Market Benchmarks');
  if (employeeName === 'Svein-Erik Nilsen' && getCooAppendixForEmployee) {
    tocEntries.push('Appendix C: COO-Specific Terms');
  } else if (tier && roleAppendices[tier]) {
    tocEntries.push('Appendix C: Equity & Compensation Rationale');
  }
  const boardRole = BOARD_MEMBERS[employeeName];
  if (boardRole) {
    tocEntries.push('Board of Directors Appointment');
  }
  tocEntries.push('Signatures');

  doc.setFontSize(9);
  for (const entry of tocEntries) {
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(DARK.r, DARK.g, DARK.b);
    const tocText = entry.length > 80 ? entry.substring(0, 77) + '...' : entry;
    doc.text(tocText, margin + 4, y);
    const tw = doc.getTextWidth(tocText);
    const ls = margin + 4 + tw + 4;
    const le = margin + contentWidth - 4;
    if (le > ls + 10) {
      doc.setDrawColor(LIGHT_GRAY.r, LIGHT_GRAY.g, LIGHT_GRAY.b);
      doc.setLineWidth(0.3);
      for (let dx = ls; dx < le; dx += 2.5) doc.line(dx, y - 0.5, dx + 1, y - 0.5);
    }
    y += 5.5;
  }
  y += 5;

  // ===== CLAUSES =====
  addPageNumber();
  doc.addPage();
  pageNum++;
  y = margin;
  for (const clause of filledClauses) {
    let remaining = clause.filledContent;

    // Handle EQUITY_TABLE_PLACEHOLDER
    const eqParts = remaining.split('[EQUITY_TABLE_PLACEHOLDER]');
    if (eqParts.length > 1) {
      y = renderRichText(eqParts[0], margin, y, contentWidth);
      // Render equity as a proper table
      const eqHeaders = ['Company', 'Equity %', 'Share Type', 'Vesting'];
      const eqColWidths = [65, 25, 35, 35];
      const eqData = equityRows.map((r) => {
        const isHolding = r.company === 'QDaria Holdings AS';
        let triggerRound = 'Seed';
        if (!isHolding) {
          const sp = spinoffCompanies.find((s) => s.name === r.company);
          const emp = sp?.employees.find((e) => e.name === employeeName);
          if (emp?.triggerRound) triggerRound = emp.triggerRound;
        }
        return [r.company, `${r.pct.toFixed(2)}%`, isHolding ? shareType : 'Milestone', isHolding ? 'Immediate' : triggerRound];
      });
      eqData.push(['TOTAL', `${equityTotal.toFixed(2)}%`, '', '']);
      renderTable('', eqHeaders, eqData, eqColWidths);
      remaining = eqParts[1] || '';
    }

    // Handle SALARY_TABLE_PLACEHOLDER
    const salParts = remaining.split('[SALARY_TABLE_PLACEHOLDER]');
    if (salParts.length > 1) {
      if (salParts[0].trim()) {
        y = renderRichText(salParts[0], margin, y, contentWidth);
      }
      // Build salary table rows with funding stage, target, salary, and increase %
      const salHeaders = ['Funding Stage', 'Target (EUR)', 'Annual Salary', 'Increase'];
      const salColWidths = [35, 30, 40, 25];
      const salData: string[][] = [];
      const roundMeta: { key: typeof fundingRounds[number]; label: string; target: string }[] = [
        { key: 'pre-seed', label: 'Pre-Seed', target: '\u2014' },
        { key: 'seed', label: 'Seed', target: '12M' },
        { key: 'round-a', label: 'Series A', target: '40M' },
        { key: 'round-b', label: 'Series B', target: '120M' },
        { key: 'round-c', label: 'Series C', target: '300M' },
        { key: 'ipo', label: 'IPO', target: '1B+' },
      ];
      let prevSal = 0;
      for (let ri = 0; ri < roundMeta.length; ri++) {
        const rm = roundMeta[ri];
        const currSal = salaryEntry ? salaryEntry.salaries[rm.key] : 0;
        let increaseStr: string;
        if (ri === 0) {
          increaseStr = '\u2014 (current)';
        } else {
          const pct = prevSal > 0 ? Math.round(((currSal - prevSal) / prevSal) * 100) : 0;
          increaseStr = pct > 0 ? `+${pct}%` : `${pct}%`;
        }
        salData.push([rm.label, rm.target, currSal ? `EUR ${formatNok(currSal)}` : '\u2014', increaseStr]);
        prevSal = currSal;
      }
      renderTable('Salary Progression by Funding Stage', salHeaders, salData, salColWidths);
      remaining = salParts[1] || '';
    }

    // Handle FUNDING_BONUS_TABLE_PLACEHOLDER
    const fbParts = remaining.split('[FUNDING_BONUS_TABLE_PLACEHOLDER]');
    if (fbParts.length > 1) {
      if (fbParts[0].trim()) {
        y = renderRichText(fbParts[0], margin, y, contentWidth);
      }
      const fbHeaders = ['Round', 'Salary Bonus', 'Equity Accel.', 'Trigger', 'Target'];
      const fbColWidths = [30, 30, 30, 35, 25];
      const fbData = fundingMilestoneBonuses.map((b) => [
        b.round,
        `${b.salaryBonusPct}% of base`,
        `${b.equityAccelerationPct}% unvested`,
        b.trigger,
        b.fundingTarget,
      ]);
      renderTable('Funding Milestone Bonus Schedule', fbHeaders, fbData, fbColWidths);
      remaining = fbParts[1] || '';
    }

    // Handle MARKET_SALARY_BENCHMARK_TABLE_PLACEHOLDER
    const msbParts = remaining.split('[MARKET_SALARY_BENCHMARK_TABLE_PLACEHOLDER]');
    if (msbParts.length > 1) {
      if (msbParts[0].trim()) {
        y = renderRichText(msbParts[0], margin, y, contentWidth);
      }
      const tierLower = (tier || '').toLowerCase();
      const tierKey = tierLower.includes('founder') ? 'founder'
        : ['c-suite', 'coo', 'cto', 'cfo', 'cmo'].includes(tierLower) ? 'c-suite'
        : ['senior', 'leadership'].includes(tierLower) ? 'senior'
        : ['mid', 'specialist'].includes(tierLower) ? 'mid'
        : 'junior';
      const benchmarks = MARKET_SALARY_BY_TIER[tierKey] || MARKET_SALARY_BY_TIER['mid'];
      const msbHeaders = ['Stage', `QDaria (${title})`, 'Market Low', 'Market Median', 'Market High', 'vs Median'];
      const msbColWidths = [25, 30, 25, 25, 25, 25];
      const msbData = benchmarks.map((b) => {
        const vsMedian = b.values[2] > 0 ? Math.round(((b.values[0] - b.values[2]) / b.values[2]) * 100) : 0;
        const vsStr = vsMedian >= 0 ? `+${vsMedian}%` : `${vsMedian}%`;
        return [
          b.stage,
          `EUR ${formatNok(b.values[0])}`,
          `EUR ${formatNok(b.values[1])}`,
          `EUR ${formatNok(b.values[2])}`,
          `EUR ${formatNok(b.values[3])}`,
          vsStr,
        ];
      });
      renderTable(`Market Salary Comparison - ${title}`, msbHeaders, msbData, msbColWidths);
      // Market comparison grouped bar chart
      renderGroupedBarChart(
        `Salary: QDaria (${title}) vs Market Median`,
        benchmarks.map((b) => b.stage),
        benchmarks.map((b) => b.values[0]), 'QDaria', CYAN,
        benchmarks.map((b) => b.values[2]), 'Market Median', { r: 180, g: 180, b: 180 },
        'EUR',
      );
      remaining = msbParts[1] || '';
    }

    // Handle BENEFITS_TABLE_PLACEHOLDER
    const benParts = remaining.split('[BENEFITS_TABLE_PLACEHOLDER]');
    if (benParts.length > 1) {
      if (benParts[0].trim()) {
        y = renderRichText(benParts[0], margin, y, contentWidth);
      }
      const benHeaders = ['Benefit', 'QDaria Policy', 'Annual Value', 'Norwegian Norm'];
      const benColWidths = [40, 40, 30, 40];
      const benData = [
        ['Vacation', '6 weeks (30 days)', 'Full pay', '5 weeks statutory'],
        ['Working Hours', '30 hrs/week (6h day)', '-', '37.5 hrs statutory'],
        ['COLA', '3-5% annually', 'Varies', '3.3-3.4% (2025-26)'],
        ['Wellness Bonus', 'NOK 2,000/month', 'NOK 24,000/yr', 'Not standard'],
        ['Pension (OTP)', '2% mandatory', 'Varies', '2% statutory min'],
        ['Holiday Pay', '14% of prior year', 'Varies', '10.2% (12% for 60+)'],
        ['Prof. Development', 'EUR 5,000/yr budget', 'EUR 5,000', 'Not standard'],
        ['Reading Program', '1 book/month', '-', 'Not standard'],
      ];
      renderTable('Benefits and Additional Compensation', benHeaders, benData, benColWidths);
      remaining = benParts[1] || '';
    }

    // Handle CAP_TABLE_PLACEHOLDER
    const capParts = remaining.split('[CAP_TABLE_PLACEHOLDER]');
    if (capParts.length > 1) {
      if (capParts[0].trim()) {
        y = renderRichText(capParts[0], margin, y, contentWidth);
      }
      const capHeaders = ['Category', 'Percentage'];
      const capColWidths = [80, 40];
      const capData = [
        ['Founder (CEO)', '70.0%'],
        ['Employee Option Pool', '13.0%'],
        ['Investor Pool', '12.0%'],
        ['Advisory', '3.0%'],
        ['Reserve', '2.0%'],
        ['TOTAL', '100.0%'],
      ];
      renderTable('QDaria Holdings Cap Table (Fully Diluted)', capHeaders, capData, capColWidths);
      remaining = capParts[1] || '';
    }

    // Handle SEVERANCE_TABLE_PLACEHOLDER
    const sevParts = remaining.split('[SEVERANCE_TABLE_PLACEHOLDER]');
    if (sevParts.length > 1) {
      if (sevParts[0].trim()) {
        y = renderRichText(sevParts[0], margin, y, contentWidth);
      }
      const sevHeaders = ['Tier', 'Severance', 'Notice (Probation)', 'Notice (Post)', 'Change of Control'];
      const sevColWidths = [30, 25, 30, 30, 30];
      const sevData = [
        ['Founder', '12 months', '1 month', '3 months', '+3 months'],
        ['C-Suite', '6 months', '1 month', '3 months', '+3 months'],
        ['Senior', '4 months', '1 month', '3 months', '+3 months'],
        ['Mid', '3 months', '1 month', '3 months', '+3 months'],
        ['Junior/Board', '2 months', '1 month', '1 month', '+3 months'],
      ];
      renderTable('Severance and Termination Terms by Tier', sevHeaders, sevData, sevColWidths);
      remaining = sevParts[1] || '';
    }

    // Handle NOTICE_PERIOD_TABLE_PLACEHOLDER
    const notParts = remaining.split('[NOTICE_PERIOD_TABLE_PLACEHOLDER]');
    if (notParts.length > 1) {
      if (notParts[0].trim()) {
        y = renderRichText(notParts[0], margin, y, contentWidth);
      }
      const notHeaders = ['Tenure', 'Notice Period'];
      const notColWidths = [60, 60];
      const notData = [
        ['0-5 years', '1 month (industry: 3 months)'],
        ['5-10 years', '2 months'],
        ['10+ years', '3 months'],
        ['10+ years, age 50+', '4 months'],
        ['10+ years, age 55+', '5 months'],
        ['10+ years, age 60+', '6 months'],
      ];
      renderTable('Norwegian Statutory Notice Periods', notHeaders, notData, notColWidths);
      remaining = notParts[1] || '';
    }

    // Handle NON_COMPETE_TABLE_PLACEHOLDER
    const ncParts = remaining.split('[NON_COMPETE_TABLE_PLACEHOLDER]');
    if (ncParts.length > 1) {
      if (ncParts[0].trim()) {
        y = renderRichText(ncParts[0], margin, y, contentWidth);
      }
      const ncHeaders = ['Rule', 'Value', 'Notes'];
      const ncColWidths = [45, 40, 45];
      const ncData = [
        ['Max non-compete', '12 months', 'Arbeidsmiljoloven Ch.14A'],
        ['Compensation (to 8G)', '100% of salary', 'Mandatory'],
        ['Compensation (8G-12G)', '70% above 8G', 'Mandatory'],
        ['Compensation cap', '12G total', '~EUR 135,819'],
        ['1G (2025)', 'NOK 130,160', '~EUR 11,318'],
        ['Non-solicitation max', '12 months', 'No compensation req.'],
      ];
      renderTable('Non-Compete and Non-Solicitation (Norwegian Law)', ncHeaders, ncData, ncColWidths);
      remaining = ncParts[1] || '';
    }

    // Handle STOCK_OPTION_TAX_TABLE_PLACEHOLDER
    const sotParts = remaining.split('[STOCK_OPTION_TAX_TABLE_PLACEHOLDER]');
    if (sotParts.length > 1) {
      if (sotParts[0].trim()) {
        y = renderRichText(sotParts[0], margin, y, contentWidth);
      }
      const sotHeaders = ['Criteria', 'Limit', 'QDaria Status'];
      const sotColWidths = [40, 40, 45];
      const sotData = [
        ['Company age', 'Max 12 years', 'Qualifies'],
        ['Employee count', 'Max 150 FTEs', 'Qualifies (14)'],
        ['Balance sheet', 'Max NOK 200M', 'Qualifies'],
        ['Revenue cap', 'Max NOK 80M', 'Qualifies (pre-rev)'],
        ['Max ownership', '5% direct/indirect', 'Qualifies (1.0%)'],
        ['Min hours', '25 hrs/week', 'Qualifies (30h)'],
        ['Tax treatment', 'Cap gains 37.84%', 'Deferred to sale'],
        ['Employer NIC', 'None on option', 'Major cost saving'],
      ];
      renderTable('Norwegian Stock Option Tax Incentive (March 2025)', sotHeaders, sotData, sotColWidths);
      remaining = sotParts[1] || '';
    }

    // Handle VESTING_NORMS_TABLE_PLACEHOLDER
    const vnParts = remaining.split('[VESTING_NORMS_TABLE_PLACEHOLDER]');
    if (vnParts.length > 1) {
      if (vnParts[0].trim()) {
        y = renderRichText(vnParts[0], margin, y, contentWidth);
      }
      const vnHeaders = ['Component', 'QDaria', 'Market Standard', 'Adoption Rate'];
      const vnColWidths = [40, 40, 40, 30];
      const vnData = [
        ['Vesting period', '48 months (4 yrs)', '4 years', '~90%'],
        ['Cliff', '12 months (CEO: 0)', '1 year', '~80%'],
        ['Frequency', 'Monthly after cliff', 'Monthly', '62%'],
        ['Acceleration', 'Single-trigger (CoC)', 'Single: 15-20%', '-'],
      ];
      renderTable('Vesting Schedule Norms (Market Comparison)', vnHeaders, vnData, vnColWidths);
      remaining = vnParts[1] || '';
    }

    // Handle BONUS_COMPARISON_TABLE_PLACEHOLDER
    const bcParts = remaining.split('[BONUS_COMPARISON_TABLE_PLACEHOLDER]');
    if (bcParts.length > 1) {
      if (bcParts[0].trim()) {
        y = renderRichText(bcParts[0], margin, y, contentWidth);
      }
      const bcHeaders = ['Level', 'QDaria', 'Market Typical'];
      const bcColWidths = [50, 35, 35];
      const bcData = [
        ['Junior/Entry', '0-15%', '0-5%'],
        ['Mid-Level', '0-15%', '5-10%'],
        ['Senior/Lead', '0-15%', '10-15%'],
        ['Director', '0-15%', '10-20%'],
        ['C-Suite (non-CEO)', '0-15%', '15-30%'],
        ['CEO (Founder)', '0-15%', '0-15%'],
      ];
      renderTable('Bonus by Level: QDaria vs Market', bcHeaders, bcData, bcColWidths);
      remaining = bcParts[1] || '';
    }

    // Render any remaining text
    if (remaining.trim()) {
      y = renderRichText(remaining, margin, y, contentWidth);
    }
    y += 6;
  }

  // ===== APPENDIX A: EQUITY =====
  checkPageBreak(30);
  y += 4;
  doc.setDrawColor(200, 210, 220);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
  doc.text('APPENDIX A: EQUITY DISTRIBUTION', margin, y);
  y += 3;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(MID_GRAY.r, MID_GRAY.g, MID_GRAY.b);
  doc.text(`Equity allocation for ${employeeName} across QDaria Holdings and spin-off companies`, margin, y + 4);
  y += 10;

  const eqH = ['Company', 'Equity %', 'Share Type', 'Vesting Trigger'];
  const eqCW = [65, 25, 40, 40];
  const eqR = equityRows.map((r) => {
    const isHolding = r.company === 'QDaria Holdings AS';
    let triggerRound = 'Seed';
    if (!isHolding) {
      const sp = spinoffCompanies.find((s) => s.name === r.company);
      const emp = sp?.employees.find((e) => e.name === employeeName);
      if (emp?.triggerRound) triggerRound = emp.triggerRound;
    }
    return [r.company, `${r.pct.toFixed(2)}%`, isHolding ? shareType : 'Milestone', isHolding ? 'Immediate' : triggerRound];
  });
  eqR.push(['TOTAL', `${equityTotal.toFixed(2)}%`, '', '']);
  renderTable('Equity Allocation by Company', eqH, eqR, eqCW);

  // Equity stacked bar visualization
  renderStackedBar(
    'Equity Distribution Across Companies',
    equityRows.map((r, i) => ({
      label: r.company.replace('QDaria Holdings AS', 'Holdings').replace(/\s+AS$/, ''),
      value: r.pct,
      color: SEGMENT_COLORS[i % SEGMENT_COLORS.length],
    })),
  );

  // ===== APPENDIX B: SALARY =====
  checkPageBreak(30);
  y += 4;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
  doc.text('APPENDIX B: SALARY PROGRESSION', margin, y);
  y += 3;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(MID_GRAY.r, MID_GRAY.g, MID_GRAY.b);
  doc.text('Indicative annual base salary (EUR) per funding round, subject to Board approval', margin, y + 4);
  y += 10;

  const sH = ['Funding Round', 'Annual Salary (EUR)', 'Status'];
  const sCW = [50, 55, 45];
  const sR: string[][] = fundingRounds.map((round) => {
    const sal = salaryEntry ? salaryEntry.salaries[round] : 0;
    return [fundingRoundLabels[round], sal ? `EUR ${formatNok(sal)}` : '-', round === 'pre-seed' ? 'Current' : 'Projected'];
  });
  renderTable('Salary by Funding Round', sH, sR, sCW);

  y += 4;
  renderBarChart(
    'Salary Growth by Funding Round',
    fundingRounds.map((r) => fundingRoundLabels[r]),
    fundingRounds.map((r) => (salaryEntry ? salaryEntry.salaries[r] : 0)),
    'EUR',
  );

  // Total compensation projection (salary + estimated equity value)
  const stageValuations = [2000000, 12000000, 40000000, 120000000, 300000000, 1000000000];
  const totalCompValues = fundingRounds.map((r, i) => {
    const sal = salaryEntry ? salaryEntry.salaries[r] : 0;
    const eqValue = Math.round((equityTotal / 100) * stageValuations[i]);
    return sal + eqValue;
  });
  renderBarChart(
    'Total Compensation Projection (Salary + Equity Value)',
    fundingRounds.map((r) => fundingRoundLabels[r]),
    totalCompValues,
    'EUR',
  );

  // ===== APPENDIX D: FUNDING MILESTONE BONUSES =====
  checkPageBreak(30);
  y += 4;
  doc.setDrawColor(200, 210, 220);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
  doc.text('APPENDIX D: FUNDING MILESTONE BONUSES', margin, y);
  y += 3;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(MID_GRAY.r, MID_GRAY.g, MID_GRAY.b);
  doc.text('One-time bonuses triggered upon successful completion of each funding round', margin, y + 4);
  y += 10;

  const mbH = ['Funding Round', 'Salary Bonus', 'Equity Accel.', 'Trigger', 'Target'];
  const mbCW = [35, 30, 30, 35, 30];
  const mbR = fundingMilestoneBonuses.map((b) => [
    b.round,
    `${b.salaryBonusPct}% of base`,
    `${b.equityAccelerationPct}% unvested`,
    b.trigger,
    b.fundingTarget,
  ]);
  renderTable('Milestone Bonus Schedule', mbH, mbR, mbCW);

  // Salary bonus percentage bar chart
  renderBarChart(
    'Salary Bonus by Funding Round (%)',
    fundingMilestoneBonuses.map((b) => b.round),
    fundingMilestoneBonuses.map((b) => b.salaryBonusPct),
    '',
  );

  y += 4;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(MID_GRAY.r, MID_GRAY.g, MID_GRAY.b);
  const bonusNote = 'Note: The Employee must be actively employed at the time of the triggering event. Salary bonuses are paid within 30 days. Equity acceleration applies to total unvested equity across all QDaria companies.';
  for (const wl of doc.splitTextToSize(bonusNote, contentWidth)) {
    checkPageBreak(5);
    doc.text(wl, margin, y);
    y += 4;
  }
  y += 4;

  // ===== APPENDIX E: REFERENCES =====
  checkPageBreak(30);
  y += 4;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
  doc.text('APPENDIX E: REFERENCES & MARKET BENCHMARKS', margin, y);
  y += 3;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(MID_GRAY.r, MID_GRAY.g, MID_GRAY.b);
  doc.text('Industry sources used to benchmark compensation and equity allocations', margin, y + 4);
  y += 10;

  const refLines = [
    '1. XAnge / Coulter Partners 2024 European Deep-Tech Compensation Survey',
    '2. Glassdoor / Levels.fyi European startup data (2024-2025)',
    '3. Hunt Club 2024 Compensation Report — Non-founder executive equity benchmarks',
    '4. Y Combinator standard guidance — Equity allocation for hired executives',
    '5. Numbeo Cost of Living Index 2025 — Norway at 69.0 (highest Nordic)',
    '6. Quantum Computing VC data: USD 1.9B across 62 rounds in 2024',
    '7. Comparable companies: IQM (EUR 200M B), PsiQuantum (USD 7B), QuantWare (EUR 20M A)',
  ];
  doc.setFontSize(8.5);
  doc.setTextColor(DARK.r, DARK.g, DARK.b);
  for (const ref of refLines) {
    checkPageBreak(5);
    doc.text(ref, margin + 4, y);
    y += 5;
  }
  y += 6;

  // ===== BOARD OF DIRECTORS APPOINTMENT (conditional) =====
  if (boardRole) {
    checkPageBreak(90);
    y += 4;
    doc.setDrawColor(200, 210, 220);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
    doc.text('BOARD OF DIRECTORS APPOINTMENT', margin, y);
    y += 3;
    doc.setDrawColor(CYAN.r, CYAN.g, CYAN.b);
    doc.setLineWidth(0.8);
    doc.line(margin, y, margin + 60, y);
    doc.setLineWidth(0.2);
    y += 8;

    const boardTitle = boardRole === 'chair'
      ? 'Chair of the Board of Directors'
      : 'Member of the Board of Directors';

    // Appointment statement
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(DARK.r, DARK.g, DARK.b);
    const appointmentText = `In addition to the employment terms set forth in this Agreement, ${employeeName} is hereby appointed as ${boardTitle} of QDaria Holdings AS, effective March 1, 2026.`;
    for (const wl of doc.splitTextToSize(appointmentText, contentWidth)) {
      checkPageBreak(5);
      doc.text(wl, margin, y);
      y += 4.5;
    }
    y += 4;

    // Board Responsibilities sub-header
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(DARK.r, DARK.g, DARK.b);
    doc.text('Board Responsibilities', margin, y);
    y += 6;

    const responsibilities = [
      'Fiduciary Duty: The Board Member shall exercise their duties with the care, diligence, and skill that a reasonably prudent person would exercise in comparable circumstances, acting in the best interests of QDaria Holdings AS and its shareholders at all times.',
      'Attendance at Board Meetings: The Board Member shall attend all scheduled board meetings, whether in person or via electronic communication. The Board shall convene at least four (4) times per calendar year, with additional meetings as required by company affairs.',
      'Voting Rights: The Board Member shall have full voting rights on all matters brought before the Board, including but not limited to strategic direction, annual budgets, major investments, executive appointments, and corporate governance policies.',
    ];

    doc.setFontSize(9);
    for (const resp of responsibilities) {
      checkPageBreak(18);
      doc.setTextColor(MID_GRAY.r, MID_GRAY.g, MID_GRAY.b);
      doc.text('\u2022', margin + 4, y);
      doc.setTextColor(DARK.r, DARK.g, DARK.b);
      doc.setFont('helvetica', 'normal');
      for (const wl of doc.splitTextToSize(resp, contentWidth - 12)) {
        checkPageBreak(5);
        doc.text(wl, margin + 10, y);
        y += 4.5;
      }
      y += 2;
    }
    y += 3;

    // Concurrent with Employment
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(DARK.r, DARK.g, DARK.b);
    doc.text('Terms of Board Membership', margin, y);
    y += 6;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(DARK.r, DARK.g, DARK.b);
    const concurrentText = 'Board membership is concurrent with and contingent upon the continued employment of the Board Member with QDaria Holdings AS. Should the employment relationship terminate for any reason, the Board membership shall be subject to review by the remaining Board members in accordance with applicable Norwegian corporate law (Aksjeloven).';
    for (const wl of doc.splitTextToSize(concurrentText, contentWidth)) {
      checkPageBreak(5);
      doc.text(wl, margin, y);
      y += 4.5;
    }
    y += 4;

    const compensationText = 'Compensation for Board membership duties is included in the employment compensation package detailed in this Agreement. No separate board fees shall be payable unless otherwise resolved by the General Meeting of Shareholders.';
    for (const wl of doc.splitTextToSize(compensationText, contentWidth)) {
      checkPageBreak(5);
      doc.text(wl, margin, y);
      y += 4.5;
    }
    y += 6;
  }

  // ===== SIGNATURES =====
  checkPageBreak(60);
  y += 5;
  doc.setDrawColor(200, 210, 220);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(DARK.r, DARK.g, DARK.b);
  doc.text('SIGNATURES', margin, y);
  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(MID_GRAY.r, MID_GRAY.g, MID_GRAY.b);
  doc.text('Employee:', margin, y);
  y += 15;
  doc.setDrawColor(LIGHT_GRAY.r, LIGHT_GRAY.g, LIGHT_GRAY.b);
  doc.line(margin, y, margin + 70, y);
  y += 5;
  doc.setTextColor(50, 50, 50);
  doc.text(employeeName, margin, y);
  y += 4;
  doc.setTextColor(120, 120, 120);
  doc.text('Date: _______________', margin, y);
  const rc = pageWidth / 2 + 10;
  y -= 24;
  doc.setTextColor(MID_GRAY.r, MID_GRAY.g, MID_GRAY.b);
  doc.text('For QDaria Holdings AS:', rc, y);
  y += 15;
  doc.line(rc, y, rc + 70, y);
  y += 5;
  doc.setTextColor(50, 50, 50);
  doc.text('Daniel Mo Houshmand, CEO', rc, y);
  y += 4;
  doc.setTextColor(120, 120, 120);
  doc.text('Date: _______________', rc, y);
  y += 20;

  // ===== APPENDIX C: ROLE-SPECIFIC TERMS =====
  if (employeeName === 'Svein-Erik Nilsen' && getCooAppendixForEmployee) {
    const cooText = getCooAppendixForEmployee(employeeName);
    if (cooText) {
      addPageNumber();
      doc.addPage();
      pageNum++;
      y = margin;
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
      doc.text('APPENDIX C: COO-SPECIFIC TERMS', margin, y);
      y += 3;
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(MID_GRAY.r, MID_GRAY.g, MID_GRAY.b);
      doc.text('Competitive Analysis & Equity Justification - Svein-Erik Nilsen', margin, y + 4);
      y += 12;

      // Split COO appendix on table sentinels and render proper tables
      let cooRemaining = cooText;

      // Handle COO_EQUITY_TABLE_PLACEHOLDER
      const cooEqParts = cooRemaining.split('[COO_EQUITY_TABLE_PLACEHOLDER]');
      if (cooEqParts.length > 1) {
        y = renderRichText(cooEqParts[0], margin, y, contentWidth);
        // Render the COO equity table using the same data as the main contract
        const cooEqHeaders = ['Company', 'Equity (%)'];
        const cooEqColWidths = [80, 40];
        const cooEqData = equityRows.map(r => [r.company, `${r.pct.toFixed(2)}%`]);
        cooEqData.push(['TOTAL', `${equityTotal.toFixed(2)}%`]);
        renderTable('COO Equity Allocation', cooEqHeaders, cooEqData, cooEqColWidths);
        cooRemaining = cooEqParts[1] || '';
      }

      // Handle COO_SALARY_TABLE_PLACEHOLDER
      const cooSalParts = cooRemaining.split('[COO_SALARY_TABLE_PLACEHOLDER]');
      if (cooSalParts.length > 1) {
        if (cooSalParts[0].trim()) {
          y = renderRichText(cooSalParts[0], margin, y, contentWidth);
        }
        // Render the COO salary progression table
        const cooSalHeaders = ['Funding Round', 'Salary (EUR)', 'Multiplier'];
        const cooSalColWidths = [45, 40, 35];
        const cooSalData: string[][] = [];
        const cooRoundMeta: { key: typeof fundingRounds[number]; label: string }[] = [
          { key: 'pre-seed', label: 'Pre-Seed' },
          { key: 'seed', label: 'Seed' },
          { key: 'round-a', label: 'Series A' },
          { key: 'round-b', label: 'Series B' },
          { key: 'round-c', label: 'Series C' },
          { key: 'ipo', label: 'IPO' },
        ];
        const baseSal = salaryEntry ? salaryEntry.salaries['pre-seed'] : salaryEur;
        for (const rm of cooRoundMeta) {
          const currSal = salaryEntry ? salaryEntry.salaries[rm.key] : 0;
          const mult = baseSal > 0 ? (currSal / baseSal).toFixed(1) + 'x' : '-';
          cooSalData.push([rm.label, currSal ? `EUR ${formatNok(currSal)}` : '-', mult]);
        }
        renderTable('COO Salary Progression', cooSalHeaders, cooSalData, cooSalColWidths);
        cooRemaining = cooSalParts[1] || '';
      }

      // Render any remaining text
      if (cooRemaining.trim()) {
        y = renderRichText(cooRemaining, margin, y, contentWidth);
      }
    }
  } else if (tier && roleAppendices[tier]) {
    addPageNumber();
    doc.addPage();
    pageNum++;
    y = margin;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
    doc.text('APPENDIX C: EQUITY & COMPENSATION RATIONALE', margin, y);
    y += 3;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(MID_GRAY.r, MID_GRAY.g, MID_GRAY.b);
    doc.text(`Compensation rationale for ${employeeName} — ${tier} tier`, margin, y + 4);
    y += 12;
    y = renderRichText(roleAppendices[tier], margin, y, contentWidth);
  }

  addPageNumber();

  const fileName = `QDaria_Employment_Agreement_${employeeName.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
}

/**
 * Convenience: generate contracts for ALL employees in sequence.
 * Each one triggers a browser download.
 */
export async function generateAllContractPdfs(): Promise<void> {
  for (const member of teamMembersSeed) {
    await generateContractPdfForEmployee({ employeeName: member.name });
    // Small delay between downloads to avoid browser blocking
    await new Promise((r) => setTimeout(r, 300));
  }
}
