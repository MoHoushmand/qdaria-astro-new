import { ndaTemplate } from "../data/admin/nda-template";

const NAVY = { r: 15, g: 23, b: 42 };
const CYAN = { r: 0, g: 210, b: 211 };
const DARK = { r: 30, g: 30, b: 30 };
const MID_GRAY = { r: 100, g: 100, b: 100 };
const LIGHT_GRAY = { r: 150, g: 150, b: 150 };

async function buildNdaDoc() {
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  let y = margin;
  let pageNum = 1;

  const origText = doc.text.bind(doc);
  doc.text = ((text: unknown, x: unknown, yPos: unknown, options?: unknown) => {
    if (
      text == null ||
      text === "" ||
      (typeof text === "string" && text.trim() === "")
    ) {
      return doc;
    }
    if (
      typeof x !== "number" ||
      typeof yPos !== "number" ||
      !isFinite(x) ||
      !isFinite(yPos)
    ) {
      return doc;
    }
    return origText(
      text as string,
      x,
      yPos,
      options as Parameters<typeof origText>[3],
    );
  }) as typeof doc.text;

  const addFooter = () => {
    doc.setFontSize(8);
    doc.setTextColor(LIGHT_GRAY.r, LIGHT_GRAY.g, LIGHT_GRAY.b);
    doc.setFont("helvetica", "normal");
    doc.text(`Page ${pageNum}`, pageWidth / 2, pageHeight - 10, {
      align: "center",
    });
    doc.text("CONFIDENTIAL", pageWidth - margin, pageHeight - 10, {
      align: "right",
    });
    doc.text("QDaria Holdings AS", margin, pageHeight - 10);
  };

  const addLetterhead = () => {
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
    doc.text("QDaria Holdings AS", margin, 12);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(MID_GRAY.r, MID_GRAY.g, MID_GRAY.b);
    doc.text("Oslo, Norway", margin, 16);
    doc.setDrawColor(CYAN.r, CYAN.g, CYAN.b);
    doc.setLineWidth(0.6);
    doc.line(margin, 18, pageWidth - margin, 18);
    doc.setLineWidth(0.2);
  };

  const newPage = () => {
    addFooter();
    doc.addPage();
    pageNum++;
    y = margin;
    addLetterhead();
    if (y < 24) y = 24;
  };

  const checkBreak = (required: number) => {
    if (y + required > pageHeight - 20) {
      newPage();
    }
  };

  const writeParagraph = (text: string, indent = 0) => {
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(DARK.r, DARK.g, DARK.b);
    const wrapped = doc.splitTextToSize(text, contentWidth - indent);
    for (const line of wrapped) {
      checkBreak(6);
      doc.text(line, margin + indent, y);
      y += 5;
    }
  };

  const renderSectionBody = (body: string) => {
    const lines = body.split("\n");
    for (const raw of lines) {
      if (raw.trim() === "") {
        y += 2.5;
        continue;
      }
      const bullet = raw.match(/^\(([a-z]+)\)\s+(.*)$/i);
      if (bullet) {
        checkBreak(6);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(MID_GRAY.r, MID_GRAY.g, MID_GRAY.b);
        doc.text(`(${bullet[1]})`, margin + 4, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(DARK.r, DARK.g, DARK.b);
        const wrapped = doc.splitTextToSize(bullet[2], contentWidth - 14);
        for (const w of wrapped) {
          checkBreak(6);
          doc.text(w, margin + 14, y);
          y += 5;
        }
        continue;
      }
      writeParagraph(raw);
    }
  };

  addLetterhead();
  y = 32;

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
  doc.text(ndaTemplate.title, pageWidth / 2, y, { align: "center" });
  y += 4;
  doc.setDrawColor(CYAN.r, CYAN.g, CYAN.b);
  doc.setLineWidth(1);
  const titleWidth = doc.getTextWidth(ndaTemplate.title);
  doc.line(
    pageWidth / 2 - titleWidth / 2,
    y,
    pageWidth / 2 + titleWidth / 2,
    y,
  );
  doc.setLineWidth(0.2);
  y += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(MID_GRAY.r, MID_GRAY.g, MID_GRAY.b);
  doc.text(ndaTemplate.effectiveDateLabel, pageWidth / 2, y, {
    align: "center",
  });
  y += 10;

  writeParagraph(ndaTemplate.preamble);
  y += 3;

  ndaTemplate.sections.forEach((section, index) => {
    checkBreak(18);
    y += 3;
    doc.setDrawColor(200, 210, 220);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;

    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
    const headingText = `${index + 1}. ${section.heading}`;
    doc.text(headingText, margin, y);
    y += 2;
    doc.setDrawColor(CYAN.r, CYAN.g, CYAN.b);
    doc.setLineWidth(0.7);
    doc.line(
      margin,
      y,
      margin + Math.min(doc.getTextWidth(headingText) + 4, contentWidth),
      y,
    );
    doc.setLineWidth(0.2);
    y += 6;

    renderSectionBody(section.body);
    y += 2;
  });

  checkBreak(70);
  y += 8;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
  doc.text("SIGNATURES", margin, y);
  y += 2;
  doc.setDrawColor(CYAN.r, CYAN.g, CYAN.b);
  doc.setLineWidth(0.7);
  doc.line(margin, y, margin + 40, y);
  doc.setLineWidth(0.2);
  y += 8;

  const blocks = ndaTemplate.signatureBlocks;
  const colWidth = contentWidth / 2 - 5;
  const blockStartY = y;
  let maxBlockY = y;

  blocks.forEach((block, i) => {
    const colX = margin + i * (colWidth + 10);
    let by = blockStartY;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(NAVY.r, NAVY.g, NAVY.b);
    doc.text(block.party, colX, by);
    by += 8;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(DARK.r, DARK.g, DARK.b);
    for (const line of block.lines) {
      doc.text(line, colX, by);
      by += 7;
    }
    if (by > maxBlockY) maxBlockY = by;
  });
  y = maxBlockY + 4;

  addFooter();

  return doc;
}

export async function generateNdaPdfBuffer(): Promise<Uint8Array> {
  const doc = await buildNdaDoc();
  const out = doc.output("arraybuffer");
  return new Uint8Array(out);
}

export async function downloadNdaPdfInBrowser(
  fileName = "QDaria-Mutual-NDA-2026.pdf",
): Promise<void> {
  const doc = await buildNdaDoc();
  doc.save(fileName);
}
