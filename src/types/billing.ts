export interface PaymentGateway {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  supportedMethods: string[];
  isDefault: boolean;
  config?: {
    stripe?: {
      publicKey: string;
      secretKey: string;
      webhookSecret: string;
    };
    paypal?: {
      clientId: string;
      clientSecret: string;
      environment: 'sandbox' | 'production';
    };
  };
}

export interface GatewayConfigProps {
  config?: any;
  onSave: (config: any) => void;
  onTest: () => void;
  loading: boolean;
  error: string | null;
}