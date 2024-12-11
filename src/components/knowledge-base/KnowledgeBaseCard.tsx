import React from 'react';
import { motion } from 'framer-motion';
import { Brain, FileText, Globe, MessageSquare } from 'lucide-react';
import { formatDate } from '../../lib/utils';
import type { KnowledgeBase } from '../../types';

interface KnowledgeBaseCardProps {
  knowledgeBase: KnowledgeBase;
  onClick?: () => void;
}

export function KnowledgeBaseCard({ knowledgeBase, onClick }: KnowledgeBaseCardProps) {
  const sourceIcon = {
    tawkto: <MessageSquare className="h-5 w-5" />,
    scraper: <Globe className="h-5 w-5" />,
    upload: <FileText className="h-5 w-5" />
  }[knowledgeBase.source];

  const statusColor = {
    ready: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  }[knowledgeBase.status];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="p-2 bg-blue-100 rounded-lg"
          >
            <Brain className="h-6 w-6 text-blue-600" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold">{knowledgeBase.name}</h3>
            <p className="text-gray-600 mt-1">{knowledgeBase.description}</p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center text-gray-500 text-sm">
                {sourceIcon}
                <span className="ml-1 capitalize">{knowledgeBase.source}</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500">
                Updated {formatDate(knowledgeBase.updatedAt)}
              </span>
            </div>
          </div>
        </div>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
        >
          {knowledgeBase.status}
        </motion.div>
      </div>
    </motion.div>
  );
}