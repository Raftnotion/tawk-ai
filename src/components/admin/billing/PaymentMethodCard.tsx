import React from 'react';
import { CreditCard, Settings } from 'lucide-react';
import { cn } from '../../../lib/utils';
import type { PaymentGateway } from '../../../types/billing';

interface PaymentMethodCardProps {
  gateway: PaymentGateway;
  onConfigure: (id: string) => void;
}

export function PaymentMethodCard({ gateway, onConfigure }: PaymentMethodCardProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          {gateway.name === 'PayPal' ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#00457C">
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.771.771 0 0 1 .761-.641h6.649c2.059 0 3.464.578 4.177 1.711.629 1.004.766 2.078.407 3.339-.029.106-.063.213-.099.316l-.008.021v.003c-.375 1.1-1.064 1.974-2.047 2.594-.942.593-2.135.891-3.552.891h-.497c-.301 0-.558.216-.605.51L8.242 20.6a.642.642 0 0 1-.633.738h-.533v-.001zm7.354-11.428c-.19.599-.53 1.016-1.01 1.238-.496.23-1.134.345-1.913.345h-.505l.787-4.943h.505c.819 0 1.419.195 1.79.586.364.383.464.935.346 1.529v.001zm6.784-3.5h3.695c.371 0 .694.259.776.622.099.437.149.896.149 1.374 0 2.719-.987 5.033-2.96 6.941-1.974 1.909-4.453 2.863-7.436 2.863h-1.251l-.972 6.129a.642.642 0 0 1-.633.738h-3.694a.641.641 0 0 1-.633-.738l3.106-16.877a.771.771 0 0 1 .761-.641h6.649c2.059 0 3.464.578 4.177 1.711.629 1.004.766 2.078.407 3.339-.029.106-.063.213-.099.316l-.008.021v.003c-.375 1.1-1.064 1.974-2.047 2.594-.942.593-2.135.891-3.552.891h-.497c-.301 0-.558.216-.605.51l-1.288 8.096a.642.642 0 0 1-.633.738h-.533v-.001z"/>
            </svg>
          ) : (
            <CreditCard className="h-5 w-5 text-gray-600" />
          )}
        </div>
        <div>
          <div className="font-medium">
            {gateway.name}
            {gateway.isDefault && (
              <span className="ml-2 text-xs text-blue-600 font-medium">
                Default Gateway
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500">
            Supports: {gateway.supportedMethods.join(', ')}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <span className={cn(
          "px-2 py-1 text-xs font-medium rounded-full",
          gateway.status === 'active' 
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        )}>
          {gateway.status}
        </span>
        <button 
          onClick={() => onConfigure(gateway.id)}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          title="Configure Gateway"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}