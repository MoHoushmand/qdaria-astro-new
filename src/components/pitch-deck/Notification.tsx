'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
}

const Notification: React.FC<NotificationProps> = ({ message, type, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed top-4 right-4 z-50",
            "flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg",
            "backdrop-blur-sm",
            type === 'success' 
              ? "bg-green-500/80 text-white border border-green-400"
              : "bg-red-500/80 text-white border border-red-400"
          )}
        >
          {type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          <span className="font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Notification };
export default Notification;
