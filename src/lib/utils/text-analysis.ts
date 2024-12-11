interface Phrase {
  text: string;
  score: number;
}

export async function extractKeyPhrases(text: string): Promise<string[]> {
  // Split text into sentences
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Extract candidate phrases from each sentence
  const phrases = sentences.flatMap(sentence => extractPhrasesFromSentence(sentence));
  
  // Score and rank phrases
  const scoredPhrases = phrases.map(phrase => ({
    text: phrase,
    score: calculatePhraseScore(phrase, text)
  }));

  // Sort by score and take top phrases
  return scoredPhrases
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(p => p.text);
}

function extractPhrasesFromSentence(sentence: string): string[] {
  const words = sentence.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => !stopWords.has(word));

  const phrases: string[] = [];
  
  // Extract 1-3 word phrases
  for (let i = 0; i < words.length; i++) {
    phrases.push(words[i]);
    if (i + 1 < words.length) {
      phrases.push(`${words[i]} ${words[i + 1]}`);
    }
    if (i + 2 < words.length) {
      phrases.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
    }
  }

  return phrases;
}

function calculatePhraseScore(phrase: string, fullText: string): number {
  let score = 0;
  
  // Frequency score
  const frequency = (fullText.toLowerCase().match(new RegExp(phrase, 'g')) || []).length;
  score += frequency;

  // Position score (phrases appearing earlier get higher scores)
  const position = fullText.toLowerCase().indexOf(phrase);
  score += 1 / (position + 1);

  // Length score (prefer 2-3 word phrases)
  const wordCount = phrase.split(/\s+/).length;
  score += wordCount === 2 ? 2 : wordCount === 3 ? 1.5 : 1;

  return score;
}

// Common English stop words to filter out
const stopWords = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
]);