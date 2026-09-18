import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Calendar,
  Check,
  ChevronDown,
  CornerDownLeft,
  Headphones,
  MapPin,
  MessageCircle,
  MoreVertical,
  Phone,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from 'lucide-react';
import { mockProjects } from '../data/mockProjects';

const INITIAL_OPTIONS = [
  'Plotted Developments',
  'Luxury Villas',
  'Book Site Visit',
  'Ongoing Projects',
  'Price & Loan Assistance',
  'Customer Support',
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userName, setUserName] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'A Warm Welcome!\nWe are delighted to have you here at Tulasi Foundation. I am here to answer all your queries about our projects and assist you with any concerns.',
      time: getCurrentTime(),
    },
    {
      id: 2,
      sender: 'bot',
      text: 'Before we start, could you please share your good name? 😊',
      time: getCurrentTime(),
      isNamePrompt: true,
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages, isTyping]);

  const addBotMessage = (text, options = null) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'bot',
          text,
          time: getCurrentTime(),
          options,
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleSend = (textToSend = null) => {
    const text = (textToSend !== null ? textToSend : inputValue).trim();
    if (!text) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (textToSend === null) setInputValue('');

    // Handle bot logic
    handleBotLogic(text);
  };

  const handleBotLogic = (input) => {
    const lower = input.toLowerCase();

    // 1. Check if user is answering the name prompt
    if (!userName && messages.length <= 3) {
      // Clean up common prefixes like "My name is John", "I am John", "This is John"
      let detectedName = input
        .replace(/^(my name is|i am|i'm|this is|call me)\s+/i, '')
        .trim();
      detectedName = detectedName.split(' ')[0]; // Pick first name
      detectedName = detectedName.charAt(0).toUpperCase() + detectedName.slice(1);

      setUserName(detectedName);
      addBotMessage(
        `Thank you, ${detectedName}!\nHow can I help you with today?`,
        INITIAL_OPTIONS
      );
      return;
    }

    // 2. Options and keyword matching
    if (lower.includes('plotted') || lower.includes('plot')) {
      addBotMessage(
        'Our plotted developments offer serene surroundings, DTCP/RERA approvals, asphalted internal roads, and underground utility conduits.\n\nWhich location would you like to explore?',
        ['Limelight - Tamil Nadu', 'Project 03 - Plotted', 'Book a Site Visit', 'Main Menu']
      );
    } else if (lower.includes('villa') || lower.includes('villas')) {
      addBotMessage(
        'Tulasi luxury villas feature contemporary architecture, private garden space, and high-end civil craftsmanship.\n\nExplore our villa developments:',
        ['Project 02 - Villas', 'Tulasi Enclave - Hillside', 'Enquire Pricing', 'Main Menu']
      );
    } else if (lower.includes('site visit') || lower.includes('visit') || lower.includes('book')) {
      addBotMessage(
        'We would be delighted to host you for a private site tour! 🚗\n\nPlease share your preferred date or mobile number, and our relationship manager will confirm your pickup/meeting arrangements.',
        ['Today / Tomorrow', 'This Weekend', 'Speak to Executive', 'Main Menu']
      );
    } else if (lower.includes('ongoing') || lower.includes('stages')) {
      addBotMessage(
        'Our active developments currently underway:\n\n• Limelight – Plotted community framed by lush greenery.\n• Project 02 – Contemporary luxury villas.\n• Tulasi Enclave – Masterplanned hillside community.\n\nWhich one would you like details on?',
        ['Limelight', 'Project 02', 'Tulasi Enclave', 'Main Menu']
      );
    } else if (lower.includes('price') || lower.includes('loan') || lower.includes('cost') || lower.includes('budget')) {
      addBotMessage(
        'All Tulasi projects offer flexible payment plans and tie-ups with leading banks (SBI, HDFC, ICICI, etc.) for up to 80% loan assistance.\n\nWould you like a customized cost sheet or loan eligibility check?',
        ['Request Cost Sheet', 'Check Loan Options', 'Talk to Sales', 'Main Menu']
      );
    } else if (lower.includes('limelight')) {
      addBotMessage(
        'Limelight is a tranquil residential plotted layout with internal roads, close proximity to schools, colleges, and medical care.\n\nPrice: Available on request\nStatus: Ongoing development',
        ['Book Limelight Visit', 'View More Projects', 'Main Menu']
      );
    } else if (lower.includes('enclave')) {
      addBotMessage(
        'Tulasi Enclave is our signature completed masterplanned hillside development with panoramic mountain views and luxury villas.\n\nStatus: Completed & Handed Over',
        ['Explore Details', 'Main Menu']
      );
    } else if (lower.includes('contact') || lower.includes('support') || lower.includes('call') || lower.includes('phone')) {
      addBotMessage(
        'You can reach our sales & client support team directly:\n\n📞 Phone: +91 98765 43210\n📧 Email: enquiry@tulasifoundation.com\n🏢 Office: Tamil Nadu, India\n\nWe are available Mon-Sat, 9:30 AM to 6:30 PM.',
        ['Book Site Visit', 'Main Menu']
      );
    } else if (lower.includes('main menu') || lower.includes('menu') || lower.includes('help')) {
      addBotMessage('Here is how I can assist you:', INITIAL_OPTIONS);
    } else {
      // General friendly response with contact link
      addBotMessage(
        `Thank you for asking! Our property advisors have full details regarding "${input}".\n\nWould you like to book a site visit, view our projects, or speak with an executive?`,
        ['Book Site Visit', 'Ongoing Projects', 'Price & Loan Assistance', 'Main Menu']
      );
    }
  };

  const handleReset = () => {
    setUserName('');
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: 'A Warm Welcome!\nWe are delighted to have you here at Tulasi Foundation. I am here to answer all your queries about our projects and assist you with any concerns.',
        time: getCurrentTime(),
      },
      {
        id: 2,
        sender: 'bot',
        text: 'Before we start, could you please share your good name? 😊',
        time: getCurrentTime(),
        isNamePrompt: true,
      },
    ]);
    setShowMenu(false);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              className="relative"
            >
              {/* Pulsing notification ring */}
              {hasUnread && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-500 border-2 border-white" />
                </span>
              )}

              <button
                onClick={() => setIsOpen(true)}
                aria-label="Open Tulasi Help Desk"
                className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#102c1c] text-white shadow-[0_10px_35px_rgba(16,44,28,0.35)] transition-all duration-300 hover:scale-105 hover:bg-[#1d6b3e] active:scale-95"
              >
                <div className="relative flex items-center justify-center">
                  <img
                    src="/tulasi-logo-icon.png"
                    alt="Tulasi Bot"
                    className="h-7 w-7 object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-[#102c1c] bg-emerald-400" />
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Window Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="fixed bottom-6 right-6 z-50 flex h-[580px] max-h-[calc(100vh-48px)] w-[390px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-[26px] border border-[#102c1c]/15 bg-white shadow-[0_24px_70px_rgba(16,44,28,0.22)]"
          >
            {/* Header: Adissia / Tulasi style dark header */}
            <div className="relative flex items-center justify-between bg-[#102c1c] px-4 py-3.5 text-white">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-white/10 p-1.5 backdrop-blur-md">
                  <img
                    src="/tulasi-logo-icon.png"
                    alt="Tulasi Foundation"
                    className="h-6 w-6 object-contain brightness-0 invert"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-wide text-[#f7f4ed]">
                    Tulasi Developers Help Desk
                  </h3>
                  <p className="flex items-center gap-1.5 text-[11px] font-normal text-[#86efac]">
                    <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
                    We are online to assist you
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <div className="relative">
                  <button
                    onClick={() => setShowMenu((prev) => !prev)}
                    aria-label="Chat options"
                    className="grid h-8 w-8 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {/* Dropdown Menu */}
                  {showMenu && (
                    <div className="absolute right-0 top-10 z-30 w-44 rounded-xl border border-[#102c1c]/10 bg-white p-1 text-xs text-[#102c1c] shadow-lg">
                      <button
                        onClick={handleReset}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-[#102c1c]/5"
                      >
                        <RotateCcw size={13} />
                        Restart Conversation
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="grid h-8 w-8 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Conversation Window Body */}
            <div className="flex-1 space-y-4 overflow-y-auto bg-[#faf8f5] p-4 text-xs leading-relaxed">
              <div className="text-center">
                <span className="rounded-full bg-[#102c1c]/5 px-3 py-1 text-[10px] font-medium text-[#102c1c]/60">
                  AI Agent conversation window
                </span>
              </div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {/* Sender line */}
                  <span className="mb-1 text-[10px] text-[#78857d]">
                    {msg.sender === 'user'
                      ? `you ${msg.time}`
                      : `Tulasi Assistant ${msg.time}`}
                  </span>

                  {/* Message bubble */}
                  <div
                    className={`max-w-[84%] rounded-2xl p-3.5 whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'rounded-tr-sm bg-[#102c1c] text-white shadow-sm'
                        : 'rounded-tl-sm border border-[#102c1c]/8 bg-white text-[#102c1c] shadow-[0_2px_8px_rgba(0,0,0,0.03)]'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Optional Interactive Pills */}
                  {msg.options && (
                    <div className="mt-2.5 flex max-w-[95%] flex-wrap gap-1.5">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSend(opt)}
                          className="rounded-full border border-[#102c1c]/20 bg-white px-3.5 py-1.5 text-[11px] font-medium text-[#102c1c] shadow-xs transition-all hover:border-[#102c1c] hover:bg-[#102c1c] hover:text-white active:scale-95"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start">
                  <div className="rounded-2xl rounded-tl-sm border border-[#102c1c]/8 bg-white p-3 shadow-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#102c1c]/60 animate-bounce" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#102c1c]/60 animate-bounce [animation-delay:0.2s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#102c1c]/60 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Bar */}
            <div className="border-t border-[#102c1c]/10 bg-white p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full rounded-full border border-[#102c1c]/15 bg-[#faf8f5] py-2.5 pl-4 pr-10 text-xs text-[#102c1c] placeholder:text-[#102c1c]/40 focus:border-[#102c1c] focus:bg-white focus:outline-none"
                  />
                  {inputValue.trim() && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-[#102c1c]/40">
                      ↵
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  aria-label="Send message"
                  className={`grid h-9 w-9 place-items-center rounded-full transition-all ${
                    inputValue.trim()
                      ? 'bg-[#102c1c] text-white shadow-sm hover:bg-[#1d6b3e] active:scale-95'
                      : 'bg-[#102c1c]/10 text-[#102c1c]/30 cursor-not-allowed'
                  }`}
                >
                  <Send size={14} className="translate-x-[1px]" />
                </button>
              </form>

              <div className="mt-2 flex items-center justify-between px-1 text-[9px] text-[#102c1c]/40">
                <span>Tulasi Foundation Support</span>
                <span className="flex items-center gap-1 font-medium text-[#1d6b3e]">
                  <Sparkles size={10} /> Instant AI Assistant
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
