import { z } from 'zod';

const credentialSchema = z.object({
  openai: z.object({
    apiKey: z.string().min(1),
  }).optional(),
  tawkto: z.object({
    apiKey: z.string().min(1),
    email: z.string().email(),
    propertyId: z.string().min(1),
    widgetId: z.string().min(1),
  }).optional(),
});

type Credentials = z.infer<typeof credentialSchema>;

export class CredentialManager {
  private static instance: CredentialManager;
  private credentials: Partial<Credentials> = {};

  private constructor() {
    // Initialize with environment variables if available
    this.credentials = {
      openai: {
        apiKey: process.env.OPENAI_API_KEY || '',
      },
    };
  }

  static getInstance(): CredentialManager {
    if (!CredentialManager.instance) {
      CredentialManager.instance = new CredentialManager();
    }
    return CredentialManager.instance;
  }

  async setCredentials<T extends keyof Credentials>(
    service: T,
    credentials: Credentials[T]
  ): Promise<void> {
    try {
      // Validate credentials before storing
      const partialSchema = credentialSchema.pick({ [service]: true });
      partialSchema.parse({ [service]: credentials });

      this.credentials[service] = credentials;
    } catch (error) {
      throw new Error(`Invalid credentials for ${service}`);
    }
  }

  async getCredentials<T extends keyof Credentials>(
    service: T
  ): Promise<Credentials[T] | null> {
    return this.credentials[service] as Credentials[T] || null;
  }

  async validateCredentials(service: keyof Credentials): Promise<boolean> {
    const credentials = await this.getCredentials(service);
    if (!credentials) return false;

    try {
      const partialSchema = credentialSchema.pick({ [service]: true });
      partialSchema.parse({ [service]: credentials });
      return true;
    } catch {
      return false;
    }
  }

  async clearCredentials(service: keyof Credentials): Promise<void> {
    delete this.credentials[service];
  }
}