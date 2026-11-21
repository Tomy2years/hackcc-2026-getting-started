/**
 * HackCC Sample AI Service
 * Works out-of-the-box with instant mock responses for zero-friction hackathon demos,
 * or switches to live Google Gemini / OpenAI when an API key is placed in .env
 */

export interface AiPromptRequest {
  prompt: string;
  systemContext?: string;
}

export interface AiPromptResponse {
  content: string;
  isMock: boolean;
  latencyMs: number;
}

const MOCK_PROJECT_IDEAS = [
  "⚡ **StudyBridge**: An AI peer-tutoring matcher connecting California Community College students preparing to transfer to UC/CSU programs.",
  "🌱 **CampusFoodShare**: Real-time pantry alert and food rescue app for community college campuses to eliminate food insecurity.",
  "💼 **ResumeReady**: AI tool tailored specifically for community college non-traditional students and career switchers to translate coursework into resume bullets.",
  "🚍 **TransitSync**: Ride-pooling and transit optimization app for commuter students attending multi-campus community college districts."
];

export async function generateIdeaOrPitch(request: AiPromptRequest): Promise<AiPromptResponse> {
  const startTime = performance.now();
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const openAiKey = import.meta.env.VITE_OPENAI_API_KEY;

  // 1. Live Gemini API if key is present
  if (geminiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${request.systemContext || ''}\n\nUser: ${request.prompt}` }] }],
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            content: text,
            isMock: false,
            latencyMs: Math.round(performance.now() - startTime),
          };
        }
      }
    } catch (e) {
      console.warn('Gemini API call failed, falling back to mock response:', e);
    }
  }

  // 2. Live OpenAI API if key is present
  if (openAiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: request.systemContext || 'You are an energetic HackCC hackathon assistant.' },
            { role: 'user', content: request.prompt },
          ],
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) {
          return {
            content: text,
            isMock: false,
            latencyMs: Math.round(performance.now() - startTime),
          };
        }
      }
    } catch (e) {
      console.warn('OpenAI API call failed, falling back to mock response:', e);
    }
  }

  // 3. Instant mock response fallback (Guarantees zero demo failures during judging!)
  await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate realistic network latency
  const randomMock = MOCK_PROJECT_IDEAS[Math.floor(Math.random() * MOCK_PROJECT_IDEAS.length)];
  return {
    content: `[Demo Mode / Mock Response]\n\nBased on your prompt "${request.prompt}", here is an MVP concept:\n\n${randomMock}\n\n*(Add your VITE_GEMINI_API_KEY in .env to enable live generation!)*`,
    isMock: true,
    latencyMs: Math.round(performance.now() - startTime),
  };
}
