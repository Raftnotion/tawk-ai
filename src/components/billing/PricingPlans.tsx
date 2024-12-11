import React from 'react';
import { Check, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { StripeService, type PriceInfo } from '../../lib/services/payment/stripe';
import { cn } from '../../lib/utils';

export function PricingPlans() {
  const { user } = useAuth();
  const [prices, setPrices] = React.useState<PriceInfo[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadPrices = async () => {
      try {
        const stripeService = StripeService.getInstance();
        const prices = await stripeService.getPrices();
        setPrices(prices);
      } catch (err) {
        setError('Failed to load pricing information');
      }
    };

    loadPrices();
  }, []);

  const handleSubscribe = async (priceId: string) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);

    try {
      const stripeService = StripeService.getInstance();
      await stripeService.createCheckoutSession(priceId, user.id);
    } catch (err) {
      setError('Failed to start checkout process');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
          {prices.map((price) => (
            <div
              key={price.id}
              className={cn(
                "rounded-lg shadow-sm divide-y divide-gray-200 bg-white",
                price.name === 'Pro' && "border-2 border-blue-500"
              )}
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {price.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {price.description}
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${price.amount}
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /month
                  </span>
                </p>
                <button
                  onClick={() => handleSubscribe(price.id)}
                  disabled={loading || !user}
                  className={cn(
                    "mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium",
                    price.name === 'Pro'
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-50 text-blue-700 hover:bg-blue-100",
                    (loading || !user) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5 mx-auto" />
                  ) : !user ? (
                    'Sign in to subscribe'
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide">
                  What's included
                </h4>
                <ul className="mt-6 space-y-4">
                  {price.features.map((feature, index) => (
                    <li key={index} className="flex space-x-3">
                      <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}