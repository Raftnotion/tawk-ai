import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Globe, MessageSquare, Power, ExternalLink } from 'lucide-react';
import { formatDate } from '../../lib/utils';
import { AgentDeployment } from './AgentDeployment';
import type { AIAgent } from '../../types';

interface AgentCardProps {
  agent: AIAgent;
  onStatusChange?: (agentId: string, status: AIAgent['status']) => void;
}

export function AgentCard({ agent, onStatusChange }: AgentCardProps) {
  const [showDeployment, setShowDeployment] = useState(false);
  
  const statusColor = agent.status === 'active'
    ? 'bg-green-100 text-green-800'
    : 'bg-gray-100 text-gray-800';

  const toggleStatus = () => {
    const newStatus = agent.status === 'active' ? 'inactive' : 'active';
    onStatusChange?.(agent.id, newStatus);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <motion.div
                whileHover={{ rotate: 15 }}
                className="p-2 bg-blue-100 rounded-lg"
              >
                <Bot className="h-6 w-6 text-blue-600" />
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold">{agent.name}</h3>
                <p className="text-gray-600 mt-1">{agent.description}</p>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Globe className="h-4 w-4 mr-1" />
                    <span className="capitalize">{agent.language}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span className="capitalize">{agent.tone}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">
                    Created {formatDate(agent.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDeployment(true)}
                className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Deploy
              </motion.button>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
              >
                {agent.status}
              </motion.span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleStatus}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                title={agent.status === 'active' ? 'Deactivate' : 'Activate'}
              >
                <Power className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showDeployment && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <AgentDeployment
                agent={agent}
                onClose={() => setShowDeployment(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}