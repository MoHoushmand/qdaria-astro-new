import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { prompt } = body as { prompt: string };

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return new Response(
        JSON.stringify({ error: 'prompt is required' }),
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

    const model = import.meta.env.GEMINI_MODEL || 'gemini-2.5-flash';

    const geminiPayload = {
      system_instruction: {
        parts: [
          {
            text: 'You are a prompt engineering expert. Improve the given prompt to be more clear, specific, and effective. Return ONLY the improved prompt, no explanations.',
          },
        ],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiPayload),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini improve-prompt error:', geminiResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: `Gemini API error: ${geminiResponse.status}` }),
        { status: geminiResponse.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await geminiResponse.json();
    const improved =
      result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? prompt;

    return new Response(
      JSON.stringify({ improved }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('Improve prompt error:', err);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
