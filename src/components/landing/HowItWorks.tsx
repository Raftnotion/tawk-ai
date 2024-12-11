import React from 'react';
import { Bot, Brain, MessageSquare, BarChart } from 'lucide-react';

const steps = [
  {
    icon: Bot,
    title: 'Connect Your Tawk.to',
    description: 'Easily integrate TawkAI with your existing Tawk.to chat widget in just a few clicks.',
    color: 'blue',
  },
  {
    icon: Brain,
    title: 'Train Your AI',
    description: 'Import your knowledge base or let AI learn from past conversations automatically.',
    color: 'purple',
  },
  {
    icon: MessageSquare,
    title: 'Automate Responses',
    description: 'Let AI handle common queries while maintaining human oversight for complex issues.',
    color: 'green',
  },
  {
    icon: BarChart,
    title: 'Monitor & Improve',
    description: 'Track performance metrics and continuously improve AI responses over time.',
    color: 'orange',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How TawkAI Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in minutes with our simple setup process
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center p-6"
              >
                {/* Connector Lines */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-1/2 w-full h-px bg-gray-200 -translate-y-1/2" />
                )}
                
                {/* Icon */}
                <div className={`relative z-10 w-16 h-16 bg-${step.color}-100 rounded-full flex items-center justify-center mb-6`}>
                  <step.icon className={`h-8 w-8 text-${step.color}-600`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>

                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}