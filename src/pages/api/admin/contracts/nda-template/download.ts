import type { APIRoute } from "astro";
import { generateNdaPdfBuffer } from "../../../../../utils/generate-nda-pdf";

function jsonResponse(data: unknown, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

export const GET: APIRoute = async ({ request }) => {
  let session: { user?: unknown } | null = null;
  try {
    const { getSession } = await import("auth-astro/server");
    session = (await getSession(request)) as { user?: unknown } | null;
  } catch {
    session = null;
  }

  if (!session?.user) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  try {
    const pdfBytes = await generateNdaPdfBuffer();
    const body = pdfBytes.buffer.slice(
      pdfBytes.byteOffset,
      pdfBytes.byteOffset + pdfBytes.byteLength,
    ) as ArrayBuffer;
    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="QDaria-Mutual-NDA-2026.pdf"',
        "Cache-Control": "no-store",
        "Content-Length": String(pdfBytes.byteLength),
      },
    });
  } catch (error) {
    console.error("NDA template generation error:", error);
    return jsonResponse({ error: "Failed to generate NDA" }, 500);
  }
};
