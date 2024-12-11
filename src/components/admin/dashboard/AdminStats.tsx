import React from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, Bot, Brain } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../../lib/utils';
import type { AdminStats as AdminStatsType } from '../../../types';

const stats = [
  {
    title: 'Total Users',
    value: '1,234',
    icon: <Users className="h-6 w-6" />,
    trend: '+12.5%',
    color: 'blue'
  },
  {
    title: 'Monthly Revenue',
    value: '$45,678',
    icon: <DollarSign className="h-6 w-6" />,
    trend: '+8.2%',
    color: 'green'
  },
  {
    title: 'Active AI Agents',
    value: '234',
    icon: <Bot className="h-6 w-6" />,
    trend: '+15.3%',
    color: 'purple'
  },
  {
    title: 'Knowledge Bases',
    value: '567',
    icon: <Brain className="h-6 w-6" />,
    trend: '+10.1%',
    color: 'indigo'
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
};

export function AdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.title}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className={`text-${stat.color}-600`}>{stat.icon}</div>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-sm font-medium ${
                stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.trend}
            </motion.span>
          </div>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.2 }}
            className="text-2xl font-bold mt-4"
          >
            {stat.value}
          </motion.h3>
          <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
        </motion.div>
      ))}
    </div>
  );
}