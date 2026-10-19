import type { Job, Professional, Message, Role } from '@/types';

interface GenerateReplyParams {
  job: Job | null;
  opponent: Professional | { fullName?: string; subCity?: string; phone?: string } | null;
  history: Message[];
  userRole: Role;
  latestUserMessage: string;
}

const FALLBACK_PRO_RESPONSES = [
  'Selam, I received your message. I am currently reviewing the details and getting tools ready.',
  'Understood. I will inspect the fittings closely once on site and make sure everything is sealed properly.',
  'I am on my way across Bole now. I should be at your location in about 15-20 minutes.',
  'Thanks for the update! Please make sure the work area has clear access so we can begin promptly.',
];

const FALLBACK_CUSTOMER_RESPONSES = [
  'Thanks for the update! Looking forward to having this resolved.',
  'Sounds good, please let me know when you arrive downstairs.',
  'Perfect, the main water valve is accessible right next to the entrance.',
  'Thank you, please proceed as agreed.',
];

function getApiKey(): string {
  // Vite client environment variable
  const key =
    import.meta.env.VITE_GEMINI_API_KEY ||
    (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
    '';
  return (key as string).trim();
}

export async function generateGeminiChatReply({
  job,
  opponent,
  history,
  userRole,
  latestUserMessage,
}: GenerateReplyParams): Promise<string> {
  const apiKey = getApiKey();

  // If no API key configured, use intelligent mock response
  if (!apiKey) {
    const list = userRole === 'customer' ? FALLBACK_PRO_RESPONSES : FALLBACK_CUSTOMER_RESPONSES;
    return list[Math.floor(Math.random() * list.length)];
  }

  const isUserCustomer = userRole === 'customer';
  const opponentName = opponent?.fullName || (isUserCustomer ? 'Abebe Bikila' : 'Customer');
  const jobTitle = job?.title || job?.category || 'Service Request';
  const jobDescription = job?.description || 'Residential repair work';
  const subCity = opponent?.subCity || job?.subCity || 'Bole, Addis Ababa';
  const trade = job?.category || 'Plumbing';

  const systemInstruction = isUserCustomer
    ? `You are ${opponentName}, an experienced and licensed ${trade} professional in Addis Ababa (${subCity}), Ethiopia, communicating via the Etcom mini-app.
The customer has contacted you regarding: "${jobTitle}" (Details: "${jobDescription}").
Rules:
1. Speak respectfully and realistically as an Ethiopian tradesperson. You may use common Ethiopian polite conventions (e.g., "Selam", "Tenayistillign", "Betam tiru") or standard English. If the user writes in Amharic, reply in Amharic.
2. Answer their question or respond to their update directly. Be helpful, concise, and professional.
3. Keep your reply strictly under 3 short sentences. This is a real-time mobile messaging screen.
4. Never break character. Never state or hint that you are an AI or language model.`
    : `You are ${opponentName}, a homeowner / client in Addis Ababa (${subCity}), Ethiopia, communicating with your service professional via the Etcom mini-app.
Job context: "${jobTitle}" ("${jobDescription}").
Rules:
1. Speak realistically as a customer in Addis Ababa.
2. Keep your reply strictly under 2 sentences.
3. Never break character. Never state that you are an AI.`;

  // Build message history for context (last 6 messages max)
  const recentHistory = history.slice(-6).map((m) => {
    const isFromUser = m.senderRole === userRole;
    return `${isFromUser ? 'User' : opponentName}: ${m.text}`;
  });

  const conversationContext = recentHistory.length > 0
    ? `Recent conversation:\n${recentHistory.join('\n')}\nUser: ${latestUserMessage}`
    : `User: ${latestUserMessage}`;

  const promptText = `${systemInstruction}\n\n${conversationContext}\n\n${opponentName}:`;

  const models = ['gemini-3.8-flash', 'gemini-flash-latest'];

  for (const model of models) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: promptText }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 150,
          },
        }),
      });

      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (candidateText) {
        // Strip out leading "Abebe Bikila: " if model includes its own name prefix
        return candidateText.replace(new RegExp(`^${opponentName}:\\s*`, 'i'), '').trim();
      }
    } catch {
      // Continue to next model fallback
    }
  }

  // Graceful fallback if API fails or times out
  const fallbackList = isUserCustomer ? FALLBACK_PRO_RESPONSES : FALLBACK_CUSTOMER_RESPONSES;
  return fallbackList[Math.floor(Math.random() * fallbackList.length)];
}

