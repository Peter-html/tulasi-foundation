import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { getWhatsAppUrl, formatProjectInquiryMessage } from '../config/contact';

/**
 * Clean compact floating action button stack
 * Positioned slightly above the Help Desk chatbot in the bottom-right corner
 */
const FloatingActions = () => {
  const whatsappUrl = getWhatsAppUrl(formatProjectInquiryMessage());

  return (
    <div className="fixed bottom-[84px] right-6 z-40 print:hidden">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.35)] transition-all hover:bg-[#20ba59] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25d366]"
        aria-label="Chat with Tulasi Foundation on WhatsApp"
      >
        <MessageSquare size={19} className="fill-current text-white" />

        {/* Hover Tooltip (Desktop) */}
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-[#102c1c] px-2.5 py-1 text-[11px] font-medium text-white shadow-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:inline-block">
          WhatsApp Us
        </span>
      </motion.a>
    </div>
  );
};

export default FloatingActions;
