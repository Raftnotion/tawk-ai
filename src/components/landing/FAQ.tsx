import React from 'react';

const faqs = [
  {
    question: 'How does TawkAI integrate with my existing Tawk.to setup?',
    answer: 'TawkAI seamlessly integrates with your Tawk.to widget through our simple API. Just add your Tawk.to credentials, and our AI will start learning from your conversations immediately.',
  },
  {
    question: 'Can I customize the AI responses?',
    answer: 'Yes! You can train the AI with your specific knowledge base, set custom response templates, and define the tone and style of communication to match your brand voice.',
  },
  {
    question: 'What languages are supported?',
    answer: 'TawkAI supports over 50 languages with automatic language detection and translation capabilities. The AI can seamlessly switch between languages during conversations.',
  },
  {
    question: 'How accurate are the AI responses?',
    answer: 'Our AI typically achieves 95%+ accuracy in understanding and responding to customer queries. The system continuously learns and improves from interactions and your feedback.',
  },
  {
    question: 'Do I need to replace my human support team?',
    answer: 'Not at all! TawkAI is designed to augment your human support team, handling routine queries automatically while allowing your team to focus on complex issues and building relationships.',
  },
  {
    question: 'What kind of analytics and reporting is available?',
    answer: 'You get comprehensive analytics including response times, customer satisfaction scores, common queries, AI performance metrics, and detailed conversation analytics.',
  },
];

export function FAQ() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about TawkAI and how it works.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}