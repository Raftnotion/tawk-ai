```typescript
import { StripeService } from './stripe';
import type { Invoice, InvoiceLineItem } from './types';

export class InvoiceGenerator {
  private static instance: InvoiceGenerator;
  private stripe: StripeService;

  private constructor() {
    this.stripe = StripeService.getInstance();
  }

  static getInstance(): InvoiceGenerator {
    if (!InvoiceGenerator.instance) {
      InvoiceGenerator.instance = new InvoiceGenerator();
    }
    return InvoiceGenerator.instance;
  }

  async generateInvoice(userId: string, items: InvoiceLineItem[]): Promise<Invoice> {
    try {
      // Create draft invoice
      const invoice = await this.stripe.createInvoice(userId, items);
      
      // Finalize invoice
      await this.stripe.finalizeInvoice(invoice.id);
      
      return invoice;
    } catch (error) {
      console.error('Failed to generate invoice:', error);
      throw error;
    }
  }

  async getInvoiceHistory(userId: string): Promise<Invoice[]> {
    try {
      return await this.stripe.getInvoices(userId);
    } catch (error) {
      console.error('Failed to get invoice history:', error);
      throw error;
    }
  }

  async downloadInvoice(invoiceId: string): Promise<string> {
    try {
      return await this.stripe.getInvoicePdfUrl(invoiceId);
    } catch (error) {
      console.error('Failed to download invoice:', error);
      throw error;
    }
  }
}
```