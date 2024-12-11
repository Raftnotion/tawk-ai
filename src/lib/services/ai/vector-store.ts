import { OpenAIService } from './openai';

interface VectorEntry {
  id: string;
  vector: number[];
  metadata: Record<string, any>;
}

export class VectorStore {
  private vectors: VectorEntry[] = [];
  private openai: OpenAIService;

  constructor(openai: OpenAIService) {
    this.openai = openai;
  }

  async addEntry(
    id: string,
    text: string,
    metadata: Record<string, any>
  ): Promise<void> {
    const vector = await this.openai.generateEmbedding(text);
    this.vectors.push({ id, vector, metadata });
  }

  async findSimilar(
    text: string,
    limit: number = 3
  ): Promise<Array<{ id: string; similarity: number; metadata: Record<string, any> }>> {
    const queryVector = await this.openai.generateEmbedding(text);
    
    return this.vectors
      .map(entry => ({
        id: entry.id,
        similarity: this.cosineSimilarity(queryVector, entry.vector),
        metadata: entry.metadata,
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }
}