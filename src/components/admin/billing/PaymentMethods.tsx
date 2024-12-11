import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { Card } from '../../shared/Card';
import { Button } from '../../shared/Button';
import { PaymentMethodCard } from './PaymentMethodCard';
import { StripeConfig } from './gateway-configs/StripeConfig';
import { PayPalConfig } from './gateway-configs/PayPalConfig';
import type { PaymentGateway } from '../../../types/billing';

const initialGateways: PaymentGateway[] = [
  {
    id: '1',
    name: 'Stripe',
    status: 'active',
    supportedMethods: ['credit_card', 'ach', 'sepa'],
    isDefault: true,
    config: {
      stripe: {
        publicKey: '',
        secretKey: '',
        webhookSecret: '',
      },
    },
  },
  {
    id: '2',
    name: 'PayPal',
    status: 'inactive',
    supportedMethods: ['paypal', 'credit_card'],
    isDefault: false,
    config: {
      paypal: {
        clientId: '',
        clientSecret: '',
        environment: 'sandbox',
      },
    },
  },
];

export function PaymentMethods() {
  const [gateways, setGateways] = useState<PaymentGateway[]>(initialGateways);
  const [configuring, setConfiguring] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSaveConfig = async (gatewayId: string, config: any) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement API call to save gateway configuration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setGateways(prev => prev.map(gateway => {
        if (gateway.id === gatewayId) {
          return {
            ...gateway,
            config,
            status: 'active',
          };
        }
        return gateway;
      }));

      setConfiguring(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save configuration');
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async (gatewayId: string) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Implement API call to test gateway connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Connection test successful!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection test failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Payment Gateway Settings</h2>
        <Button
          variant="outline"
          size="sm"
          icon={<Plus className="h-4 w-4" />}
        >
          Add Gateway
        </Button>
      </div>

      <div className="space-y-4">
        {gateways.map((gateway) => (
          <div key={gateway.id}>
            <PaymentMethodCard
              gateway={gateway}
              onConfigure={setConfiguring}
            />

            <AnimatePresence>
              {configuring === gateway.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 border rounded-lg bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium">Configure {gateway.name}</h3>
                    <button
                      onClick={() => setConfiguring(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {gateway.name === 'Stripe' ? (
                    <StripeConfig
                      config={gateway.config?.stripe}
                      onSave={(config) => handleSaveConfig(gateway.id, { stripe: config })}
                      onTest={() => handleTestConnection(gateway.id)}
                      loading={loading}
                      error={error}
                    />
                  ) : (
                    <PayPalConfig
                      config={gateway.config?.paypal}
                      onSave={(config) => handleSaveConfig(gateway.id, { paypal: config })}
                      onTest={() => handleTestConnection(gateway.id)}
                      loading={loading}
                      error={error}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-2">
          Platform Payment Settings
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <span>Default Currency</span>
            <span className="font-medium">USD</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Auto-charge enabled</span>
            <span className="font-medium">Yes</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Payment retry attempts</span>
            <span className="font-medium">3</span>
          </div>
        </div>
      </div>
    </Card>
  );
}