import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Bot, Brain } from 'lucide-react';

const stats = [
  {
    title: 'Total Chats',
    value: '1,234',
    icon: <BarChart3 className="h-6 w-6" />,
    trend: '+12.5%',
    color: 'blue'
  },
  {
    title: 'Active Users',
    value: '456',
    icon: <Users className="h-6 w-6" />,
    trend: '+5.2%',
    color: 'green'
  },
  {
    title: 'AI Agents',
    value: '8',
    icon: <Bot className="h-6 w-6" />,
    trend: '+2',
    color: 'purple'
  },
  {
    title: 'Knowledge Bases',
    value: '12',
    icon: <Brain className="h-6 w-6" />,
    trend: '+3',
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

export function DashboardStats() {
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
              className="text-sm text-green-600 font-medium"
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