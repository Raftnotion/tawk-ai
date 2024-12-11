import React from 'react';
import { Brain, Bot, Zap, Database, MessageSquare, BarChart } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Responses',
    description: 'Intelligent responses powered by advanced language models for natural conversations.',
  },
  {
    icon: Database,
    title: 'Smart Knowledge Base',
    description: 'Automatically build and maintain your knowledge base from chat interactions.',
  },
  {
    icon: Bot,
    title: 'Custom AI Agents',
    description: 'Create specialized AI agents for different departments or use cases.',
  },
  {
    icon: Zap,
    title: 'Real-time Processing',
    description: 'Process and respond to customer inquiries instantly with AI assistance.',
  },
  {
    icon: MessageSquare,
    title: 'Multi-language Support',
    description: 'Communicate with customers in their preferred language automatically.',
  },
  {
    icon: BarChart,
    title: 'Analytics & Insights',
    description: 'Track performance and gain insights to improve customer satisfaction.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything you need to supercharge your customer support
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features to help you manage, automate, and improve your customer interactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border hover:border-blue-500 hover:shadow-lg transition-all duration-200"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}