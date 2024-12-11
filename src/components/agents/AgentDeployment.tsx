import React, { useState } from 'react';
import { AlertCircle, Loader2, Code } from 'lucide-react';
import { TawktoWidgetService } from '../../lib/api/tawkto-widget';
import { cn } from '../../lib/utils';
import type { AIAgent } from '../../types';

interface AgentDeploymentProps {
  agent: AIAgent;
  onClose: () => void;
}

export function AgentDeployment({ agent, onClose }: AgentDeploymentProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState({
    propertyId: '',
    widgetId: '',
  });
  const [deployed, setDeployed] = useState(false);

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      TawktoWidgetService.injectChatWidget({
        ...config,
        agentId: agent.id,
      });
      setDeployed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to deploy chat widget');
    } finally {
      setLoading(false);
    }
  };

  const embedCode = `
<!-- Start of Tawk.to Script with AI Agent Integration -->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
Tawk_API.onLoad = function() {
    Tawk_API.setAttributes({
        'agentId': '${agent.id}'
    });
};
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/${config.propertyId}/${config.widgetId}';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!-- End of Tawk.to Script -->
  `.trim();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Deploy AI Agent to Tawk.to</h2>
      
      {!deployed ? (
        <form onSubmit={handleDeploy} className="space-y-4">
          <div>
            <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700">
              Tawk.to Property ID
            </label>
            <input
              type="text"
              id="propertyId"
              value={config.propertyId}
              onChange={(e) => setConfig(prev => ({ ...prev, propertyId: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              placeholder="e.g., 64f5e9c3f2439e2743432255"
            />
          </div>

          <div>
            <label htmlFor="widgetId" className="block text-sm font-medium text-gray-700">
              Widget ID
            </label>
            <input
              type="text"
              id="widgetId"
              value={config.widgetId}
              onChange={(e) => setConfig(prev => ({ ...prev, widgetId: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              placeholder="e.g., 1gc8l3bm2"
            />
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600",
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
              )}
            >
              {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
              Deploy Agent
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-green-50 text-green-800 rounded-lg">
            AI Agent has been successfully deployed to your Tawk.to widget!
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Installation Code</h3>
            <p className="text-sm text-gray-600 mb-4">
              Add this code to your website to integrate the AI-powered chat widget:
            </p>
            <div className="relative">
              <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto">
                <code>{embedCode}</code>
              </pre>
              <button
                onClick={() => navigator.clipboard.writeText(embedCode)}
                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
                title="Copy to clipboard"
              >
                <Code className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}