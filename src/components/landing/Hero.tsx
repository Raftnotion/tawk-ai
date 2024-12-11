import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, ArrowRight } from 'lucide-react';
import { Button } from '../shared/Button';

export function Hero() {
  return (
    <div className="relative pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 mb-8">
            <Bot className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered Customer Support</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Transform Your Customer Support with{' '}
            <span className="text-blue-600">AI Intelligence</span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Enhance your Tawk.to chat with AI-powered responses, automated knowledge base integration, and intelligent conversation handling.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="#how-it-works">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                See How It Works
              </Button>
            </Link>
          </div>

          <div className="mt-12 text-sm text-gray-600">
            <p>No credit card required • 14-day free trial • Cancel anytime</p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
              alt="TawkAI Dashboard"
              className="w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}