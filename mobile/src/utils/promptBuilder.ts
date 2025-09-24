import type { FeedItem } from '@models/feed';

const baseInstruction = `Sen bir ürün keşif asistanısın. Kullanıcının karttaki içeriği anlamasına yardım et.`;

export const buildQuestionPrompt = (card: FeedItem, question: string): string => {
  const context = `# Başlık\n${card.title}\n\n# Özet\n${card.summary}\n\n# İçerik\n${card.body}`;
  const formattedQuestion = question.trim() || 'İçeriği kısaca açıkla.';

  return [baseInstruction, context, `# Kullanıcı Sorusu\n${formattedQuestion}`, '# Yanıtı Türkçe ver ve 120 kelimeyi geçme.'].join('\n\n');
};

export const buildFollowUpPrompt = (card: FeedItem, answer: string, followUp: string): string => {
  return [
    baseInstruction,
    '# Önceki Yanıt',
    answer,
    '# Kart İçeriği',
    `${card.title}\n${card.body}`,
    '# Yeni Soru',
    followUp
  ].join('\n\n');
};
