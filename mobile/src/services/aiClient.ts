import Constants from 'expo-constants';

export interface AskOptions {
  prompt: string;
  model?: string;
  signal?: AbortSignal;
}

const defaultModel = 'gpt-3.5-turbo';

const resolveCredentials = () => {
  const { openAiApiKey, openAiBaseUrl } = (Constants.expoConfig?.extra as Record<string, string | undefined>) ?? {};

  return {
    apiKey: openAiApiKey ?? process.env.EXPO_PUBLIC_OPENAI_API_KEY ?? process.env.OPENAI_API_KEY ?? '',
    baseUrl: openAiBaseUrl ?? process.env.EXPO_PUBLIC_OPENAI_BASE_URL ?? 'https://api.openai.com/v1'
  };
};

const createMockAnswer = (prompt: string) => {
  const preview = prompt.slice(0, 120).trim();
  return `\u26a0\ufe0f Yapay zekâ API anahtarı bulunamadı. Örnek yanıt: ${preview} ...`; 
};

const ask = async ({ prompt, model = defaultModel, signal }: AskOptions): Promise<string> => {
  const { apiKey, baseUrl } = resolveCredentials();

  if (!apiKey) {
    console.warn('OPENAI_API_KEY is not set. Returning a mock response for development.');
    return createMockAnswer(prompt);
  }

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    }),
    signal
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI servisi hata döndürdü: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  if (typeof content !== 'string') {
    throw new Error('AI servisi beklenen formatta yanıt üretmedi.');
  }

  return content.trim();
};

export default {
  ask,
  defaultModel
};
