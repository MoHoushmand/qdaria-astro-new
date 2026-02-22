import type { APIRoute } from 'astro';

const MODEL_MAP: Record<string, string> = {
  'gemini-2.5-flash': 'gemini-2.5-flash',
  'gemini-2.5-pro': 'gemini-2.5-pro',
  'gemini-2.5-flash-lite': 'gemini-2.5-flash-lite',
  'gemini-2.0-flash': 'gemini-2.0-flash',
  'gemini-2.0-flash-lite': 'gemini-2.0-flash-lite',
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      messages,
      model = 'gemini-2.5-flash',
      systemPrompt = 'You are a helpful AI assistant.',
      temperature = 0.7,
      maxTokens = 4096,
    } = body as {
      messages: { role: string; content: string }[];
      model?: string;
      systemPrompt?: string;
      temperature?: number;
      maxTokens?: number;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'messages array is required and must not be empty' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = import.meta.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'GEMINI_API_KEY is not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Resolve model name
    const geminiModel = MODEL_MAP[model] || import.meta.env.GEMINI_MODEL || 'gemini-2.5-flash';

    // Map messages to Gemini format
    const contents = messages.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const geminiPayload = {
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: {
        temperature,
        maxOutputTokens: maxTokens,
      },
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:streamGenerateContent?key=${apiKey}&alt=sse`;

    const geminiResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiPayload),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', geminiResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: `Gemini API error: ${geminiResponse.status}`, details: errorText }),
        { status: geminiResponse.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!geminiResponse.body) {
      return new Response(
        JSON.stringify({ error: 'No response body from Gemini' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Stream the SSE response through to the client, extracting text chunks
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const transformStream = new TransformStream({
      transform(chunk, controller) {
        const text = decoder.decode(chunk, { stream: true });
        const lines = text.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6).trim();
            if (!jsonStr || jsonStr === '[DONE]') {
              if (jsonStr === '[DONE]') {
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
              }
              continue;
            }
            try {
              const parsed = JSON.parse(jsonStr);
              const textContent =
                parsed?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
              if (textContent) {
                const sseData = JSON.stringify({ text: textContent });
                controller.enqueue(encoder.encode(`data: ${sseData}\n\n`));
              }
              // Check if the stream is finished
              const finishReason = parsed?.candidates?.[0]?.finishReason;
              if (finishReason && finishReason !== 'STOP') {
                const sseData = JSON.stringify({ finishReason });
                controller.enqueue(encoder.encode(`data: ${sseData}\n\n`));
              }
            } catch {
              // Skip malformed JSON lines
            }
          }
        }
      },
      flush(controller) {
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      },
    });

    const readableStream = geminiResponse.body.pipeThrough(transformStream);

    return new Response(readableStream, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('Playground chat error:', err);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
