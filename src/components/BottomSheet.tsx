import React from 'react';
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" 
            onClick={onClose} 
          />
          <motion.div 
            initial={{ y: "100%" }} 
            animate={{ y: 0 }} 
            exit={{ y: "100%" }} 
            transition={{ type: "spring", bounce: 0, duration: 0.4 }} 
            className="fixed bottom-0 left-0 right-0 bg-[#1E1E1E] text-white z-50 rounded-t-3xl max-h-[90vh] overflow-y-auto safe-bottom"
          >
            <div className="sticky top-0 right-0 p-4 flex justify-end bg-gradient-to-b from-[#1E1E1E] to-transparent">
              <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="px-6 pb-8">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
