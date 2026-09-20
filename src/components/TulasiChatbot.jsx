import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Minus,
  RotateCcw,
  Send,
  ArrowUpRight,
  Phone,
  Check,
  ChevronRight,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
} from 'lucide-react';
import { mockProjects } from '../data/mockProjects';
import {
  contactConfig,
  getWhatsAppUrl,
  formatSiteVisitMessage,
  formatProjectInquiryMessage,
} from '../config/contact';

const SESSION_NAME_KEY = 'tulasi_visitor_name';

const TulasiChatbot = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [activeStep, setActiveStep] = useState('ask_name'); // 'ask_name' | 'main_menu' | 'select_project' | 'booking_form' | 'booking_ready' | etc.
  const [selectedProject, setSelectedProject] = useState(null);
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    project: '',
    date: '',
    time: 'Morning (10 AM - 1 PM)',
  });

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen && !isMinimized) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Handle escape key to close chatbot
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Initial welcome message
  const startConversation = () => {
    let savedName = '';
    try {
      savedName = sessionStorage.getItem(SESSION_NAME_KEY) || '';
    } catch {
      // Storage unavailable
    }

    if (savedName) {
      setBookingData((prev) => ({ ...prev, name: savedName }));
      setActiveStep('main_menu');
      setMessages([
        {
          id: 1,
          sender: 'bot',
          text: `Welcome back to Tulasi Foundation, ${savedName}! 👋\nHow can our Help Desk assist you today?`,
        },
      ]);
    } else {
      setActiveStep('ask_name');
      setMessages([
        {
          id: 1,
          sender: 'bot',
          text: "Welcome to Tulasi Foundation 👋\nI'm here to help you explore our residential projects and plan a site visit.",
        },
        {
          id: 2,
          sender: 'bot',
          text: 'May I know your name?',
        },
      ]);
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startConversation();
    }
  }, [isOpen]);

  const addBotMessage = (text, delay = 350) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: Date.now(), sender: 'bot', text }]);
    }, delay);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text }]);
  };

  // Submit name
  const handleNameSubmit = (enteredName) => {
    const trimmed = (enteredName || inputValue).trim();
    if (!trimmed) return;

    try {
      sessionStorage.setItem(SESSION_NAME_KEY, trimmed);
    } catch {
      // ignore
    }

    setBookingData((prev) => ({ ...prev, name: trimmed }));
    addUserMessage(trimmed);
    setInputValue('');

    addBotMessage(`Thank you, ${trimmed}!\nHow can we help you today?`);
    setActiveStep('main_menu');
  };

  // Main menu handlers
  const handleMenuSelect = (action) => {
    switch (action) {
      case 'explore_projects':
        addUserMessage('Explore Projects');
        addBotMessage('Here are our current developments across Tamil Nadu. Select any project to view details:');
        setActiveStep('select_project_details');
        break;

      case 'plots': {
        addUserMessage('Plots');
        const plots = mockProjects.filter(
          (p) => p.projectType.toLowerCase().includes('plot') || p.projectType.toLowerCase().includes('development')
        );
        if (plots.length > 0) {
          addBotMessage(`We have ${plots.length} plotted residential project(s) available:`);
          setActiveStep('select_project_details');
        } else {
          addBotMessage('We currently do not have a listed project in this category. Would you like our team to contact you?');
          setActiveStep('no_category_fallback');
        }
        break;
      }

      case 'villas': {
        addUserMessage('Villas');
        const villas = mockProjects.filter((p) => p.projectType.toLowerCase().includes('villa'));
        if (villas.length > 0) {
          addBotMessage(`We have ${villas.length} villa development(s) available:`);
          setActiveStep('select_project_details');
        } else {
          addBotMessage('We currently do not have a listed project in this category. Would you like our team to contact you?');
          setActiveStep('no_category_fallback');
        }
        break;
      }

      case 'apartments': {
        addUserMessage('Apartments');
        const apts = mockProjects.filter((p) => p.projectType.toLowerCase().includes('apartment'));
        if (apts.length > 0) {
          addBotMessage(`We have ${apts.length} apartment development(s) available:`);
          setActiveStep('select_project_details');
        } else {
          addBotMessage('We currently do not have a listed project in this category. Would you like our team to contact you?');
          setActiveStep('no_category_fallback');
        }
        break;
      }

      case 'book_site_visit':
        addUserMessage('Book a Site Visit');
        addBotMessage('Great! Which project would you like to visit?');
        setActiveStep('booking_pick_project');
        break;

      case 'price_availability':
        addUserMessage('Price & Availability');
        addBotMessage('Please select a project to view its pricing details:');
        setActiveStep('price_pick_project');
        break;

      case 'location_directions':
        addUserMessage('Location & Directions');
        addBotMessage('Please select a project to view its location:');
        setActiveStep('location_pick_project');
        break;

      case 'talk_to_team':
        addUserMessage('Talk to Our Team');
        addBotMessage('Our sales and customer advisory team is available to assist you directly:');
        setActiveStep('talk_to_team_options');
        break;

      default:
        break;
    }
  };

  // Handle project detail selection
  const handleProjectSelected = (project) => {
    setSelectedProject(project);
    addUserMessage(project.name);
    addBotMessage(
      `📍 ${project.name.toUpperCase()}\nLocation: ${project.location}\nType: ${project.projectType}\nStatus: ${project.status}\n\n${project.shortDescription}`
    );
    setActiveStep('project_actions');
  };

  // Handle free text query
  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (activeStep === 'ask_name') {
      handleNameSubmit(inputValue);
      return;
    }

    if (activeStep === 'booking_phone_input') {
      const phone = inputValue.trim();
      setBookingData((prev) => ({ ...prev, phone }));
      addUserMessage(phone);
      setInputValue('');
      addBotMessage('What is your preferred date for the site visit? (e.g., Tomorrow, This Saturday, or DD/MM/YYYY)');
      setActiveStep('booking_date_input');
      return;
    }

    if (activeStep === 'booking_date_input') {
      const date = inputValue.trim();
      setBookingData((prev) => ({ ...prev, date }));
      addUserMessage(date);
      setInputValue('');
      addBotMessage('Select your preferred time slot:');
      setActiveStep('booking_time_select');
      return;
    }

    // Unsupported general question fallback
    const query = inputValue.trim();
    addUserMessage(query);
    setInputValue('');
    addBotMessage('Thanks for your message. Our sales team can help you with that right away.');
    setActiveStep('unsupported_fallback');
  };

  // Complete booking flow
  const completeBooking = (finalBooking) => {
    const bookingSummary = formatSiteVisitMessage(finalBooking);
    addBotMessage(
      `Thank you, ${finalBooking.name || 'there'}!\nYour site visit request has been prepared.\n\nProject: ${finalBooking.project}\nDate: ${finalBooking.date || 'Flexible'}\nTime: ${finalBooking.time}\n\nYour site visit details are ready. Please send them to our team on WhatsApp to confirm the appointment.`
    );
    setActiveStep('booking_ready');
  };

  const resetConversation = () => {
    try {
      sessionStorage.removeItem(SESSION_NAME_KEY);
    } catch {
      // ignore
    }
    setBookingData({
      name: '',
      phone: '',
      project: '',
      date: '',
      time: 'Morning (10 AM - 1 PM)',
    });
    setSelectedProject(null);
    setMessages([]);
    startConversation();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">
      {/* Launcher Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="group relative flex items-center gap-3 rounded-full bg-[#102c1c] px-5 py-3.5 text-white shadow-[0_8px_30px_rgba(16,44,28,0.25)] border border-white/20 transition-all hover:bg-[#1d6b3e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d6b3e]"
          aria-label="Open Tulasi Foundation Help Desk chat"
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a8d8b5] opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#a8d8b5]" />
          </span>
          <MessageSquare size={18} className="text-[#d8f1dc]" />
          <span className="text-xs font-semibold uppercase tracking-[0.14em]">Help Desk</span>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? 'auto' : '580px',
            }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="flex w-[calc(100vw-32px)] max-w-[400px] flex-col overflow-hidden rounded-[26px] border border-[#102c1c]/15 bg-[#fffdf8] shadow-[0_20px_50px_rgba(16,44,28,0.22)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#102c1c] px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-white/10 border border-white/15">
                  <img src="/tulasi-logo-green.svg" alt="" className="h-5 w-5 brightness-200" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
                      Tulasi Help Desk
                    </h3>
                    <span className="h-2 w-2 rounded-full bg-[#a8d8b5]" />
                  </div>
                  <p className="text-[10px] text-white/60">We're here to help</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-white/70">
                <button
                  onClick={resetConversation}
                  title="Start New Conversation"
                  aria-label="Restart chat"
                  className="rounded-full p-1.5 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  onClick={() => setIsMinimized((v) => !v)}
                  aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
                  className="rounded-full p-1.5 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Minus size={15} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="rounded-full p-1.5 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Body (Hidden when minimized) */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f7f4ed]/50 text-xs">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-[18px] px-4 py-3 whitespace-pre-wrap leading-5 ${
                          msg.sender === 'user'
                            ? 'bg-[#102c1c] text-white rounded-br-sm shadow-sm'
                            : 'bg-white text-[#102c1c] border border-[#102c1c]/8 rounded-bl-sm shadow-[0_2px_8px_rgba(16,44,28,0.04)]'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-1.5 rounded-[18px] bg-white border border-[#102c1c]/8 px-4 py-3 shadow-[0_2px_8px_rgba(16,44,28,0.04)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#1d6b3e] animate-bounce" />
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-[#1d6b3e] animate-bounce"
                          style={{ animationDelay: '0.15s' }}
                        />
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-[#1d6b3e] animate-bounce"
                          style={{ animationDelay: '0.3s' }}
                        />
                      </div>
                    </div>
                  )}

                  {/* GUIDED CHOICES & BUTTONS */}
                  {!isTyping && (
                    <div className="pt-2 space-y-2">
                      {/* Step: Main Menu */}
                      {activeStep === 'main_menu' && (
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleMenuSelect('explore_projects')}
                            className="flex items-center justify-between rounded-xl border border-[#102c1c]/12 bg-white p-2.5 text-left font-semibold text-[#102c1c] hover:border-[#1d6b3e] hover:bg-[#1d6b3e]/5 transition-colors"
                          >
                            <span>Explore Projects</span>
                            <ChevronRight size={13} className="text-[#1d6b3e]" />
                          </button>
                          <button
                            onClick={() => handleMenuSelect('plots')}
                            className="flex items-center justify-between rounded-xl border border-[#102c1c]/12 bg-white p-2.5 text-left font-semibold text-[#102c1c] hover:border-[#1d6b3e] hover:bg-[#1d6b3e]/5 transition-colors"
                          >
                            <span>Plots</span>
                            <ChevronRight size={13} className="text-[#1d6b3e]" />
                          </button>
                          <button
                            onClick={() => handleMenuSelect('villas')}
                            className="flex items-center justify-between rounded-xl border border-[#102c1c]/12 bg-white p-2.5 text-left font-semibold text-[#102c1c] hover:border-[#1d6b3e] hover:bg-[#1d6b3e]/5 transition-colors"
                          >
                            <span>Villas</span>
                            <ChevronRight size={13} className="text-[#1d6b3e]" />
                          </button>
                          <button
                            onClick={() => handleMenuSelect('apartments')}
                            className="flex items-center justify-between rounded-xl border border-[#102c1c]/12 bg-white p-2.5 text-left font-semibold text-[#102c1c] hover:border-[#1d6b3e] hover:bg-[#1d6b3e]/5 transition-colors"
                          >
                            <span>Apartments</span>
                            <ChevronRight size={13} className="text-[#1d6b3e]" />
                          </button>
                          <button
                            onClick={() => handleMenuSelect('book_site_visit')}
                            className="col-span-2 flex items-center justify-between rounded-xl bg-[#102c1c] p-3 text-left font-semibold text-white hover:bg-[#1d6b3e] transition-colors shadow-sm"
                          >
                            <span>Book a Site Visit</span>
                            <Calendar size={14} />
                          </button>
                          <button
                            onClick={() => handleMenuSelect('price_availability')}
                            className="flex items-center justify-between rounded-xl border border-[#102c1c]/12 bg-white p-2.5 text-left font-semibold text-[#102c1c] hover:border-[#1d6b3e] hover:bg-[#1d6b3e]/5 transition-colors"
                          >
                            <span>Price & Availability</span>
                            <ChevronRight size={13} className="text-[#1d6b3e]" />
                          </button>
                          <button
                            onClick={() => handleMenuSelect('location_directions')}
                            className="flex items-center justify-between rounded-xl border border-[#102c1c]/12 bg-white p-2.5 text-left font-semibold text-[#102c1c] hover:border-[#1d6b3e] hover:bg-[#1d6b3e]/5 transition-colors"
                          >
                            <span>Location & Directions</span>
                            <ChevronRight size={13} className="text-[#1d6b3e]" />
                          </button>
                          <button
                            onClick={() => handleMenuSelect('talk_to_team')}
                            className="col-span-2 flex items-center justify-between rounded-xl border border-[#102c1c]/20 bg-[#fffdf8] p-2.5 text-left font-semibold text-[#102c1c] hover:bg-[#102c1c] hover:text-white transition-colors"
                          >
                            <span>Talk to Our Team</span>
                            <Phone size={13} />
                          </button>
                        </div>
                      )}

                      {/* Step: Select Project Details */}
                      {activeStep === 'select_project_details' && (
                        <div className="space-y-1.5">
                          {mockProjects.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => handleProjectSelected(p)}
                              className="flex w-full items-center justify-between rounded-xl border border-[#102c1c]/10 bg-white p-2.5 text-left hover:border-[#1d6b3e] hover:bg-[#1d6b3e]/5 transition-colors"
                            >
                              <div>
                                <p className="font-semibold text-[#102c1c]">{p.name}</p>
                                <p className="text-[10px] text-[#748078]">{p.location} · {p.projectType}</p>
                              </div>
                              <ChevronRight size={14} className="text-[#1d6b3e]" />
                            </button>
                          ))}
                          <button
                            onClick={() => setActiveStep('main_menu')}
                            className="mt-2 text-[11px] font-semibold text-[#1d6b3e] hover:underline"
                          >
                            ← Back to Main Menu
                          </button>
                        </div>
                      )}

                      {/* Step: Project Actions (View Project, Book Site Visit, WhatsApp, Back) */}
                      {activeStep === 'project_actions' && selectedProject && (
                        <div className="space-y-2">
                          <button
                            onClick={() => {
                              navigate(`/project/${selectedProject.id}`);
                              setIsOpen(false);
                            }}
                            className="flex w-full items-center justify-between rounded-xl bg-[#102c1c] p-2.5 text-white hover:bg-[#1d6b3e] transition-colors"
                          >
                            <span>View Project Page</span>
                            <ArrowUpRight size={14} />
                          </button>

                          <button
                            onClick={() => {
                              setBookingData((prev) => ({
                                ...prev,
                                project: selectedProject.name,
                              }));
                              addUserMessage(`Book Site Visit for ${selectedProject.name}`);
                              addBotMessage(`Please provide your phone number so we can prepare your site visit pass:`);
                              setActiveStep('booking_phone_input');
                            }}
                            className="flex w-full items-center justify-between rounded-xl border border-[#102c1c]/15 bg-white p-2.5 font-semibold text-[#102c1c] hover:bg-[#1d6b3e]/5 transition-colors"
                          >
                            <span>Book Site Visit for {selectedProject.name}</span>
                            <Calendar size={14} />
                          </button>

                          <a
                            href={getWhatsAppUrl(formatProjectInquiryMessage(selectedProject.name))}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-between rounded-xl border border-[#25d366]/40 bg-[#25d366]/10 p-2.5 font-semibold text-[#102c1c] hover:bg-[#25d366]/20 transition-colors"
                          >
                            <span>WhatsApp Us About {selectedProject.name}</span>
                            <MessageSquare size={14} className="text-[#128c7e]" />
                          </a>

                          <button
                            onClick={() => setActiveStep('select_project_details')}
                            className="text-[11px] font-semibold text-[#1d6b3e] hover:underline"
                          >
                            ← Back to Projects
                          </button>
                        </div>
                      )}

                      {/* Step: Booking Flow - Pick Project */}
                      {activeStep === 'booking_pick_project' && (
                        <div className="space-y-1.5">
                          {mockProjects.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => {
                                setBookingData((prev) => ({ ...prev, project: p.name }));
                                addUserMessage(p.name);
                                addBotMessage(`Selected: ${p.name}.\nPlease enter your contact phone number:`);
                                setActiveStep('booking_phone_input');
                              }}
                              className="flex w-full items-center justify-between rounded-xl border border-[#102c1c]/10 bg-white p-2.5 text-left font-semibold text-[#102c1c] hover:border-[#1d6b3e] transition-colors"
                            >
                              <span>{p.name} ({p.projectType})</span>
                              <ChevronRight size={14} className="text-[#1d6b3e]" />
                            </button>
                          ))}
                          <button
                            onClick={() => setActiveStep('main_menu')}
                            className="mt-2 text-[11px] font-semibold text-[#1d6b3e] hover:underline"
                          >
                            ← Back to Main Menu
                          </button>
                        </div>
                      )}

                      {/* Step: Booking Flow - Time Selection */}
                      {activeStep === 'booking_time_select' && (
                        <div className="space-y-2">
                          {[
                            'Morning (10:00 AM - 1:00 PM)',
                            'Afternoon (2:00 PM - 5:00 PM)',
                            'Evening (5:00 PM - 6:30 PM)',
                          ].map((timeSlot) => (
                            <button
                              key={timeSlot}
                              onClick={() => {
                                const updated = { ...bookingData, time: timeSlot };
                                setBookingData(updated);
                                addUserMessage(timeSlot);
                                completeBooking(updated);
                              }}
                              className="flex w-full items-center justify-between rounded-xl border border-[#102c1c]/10 bg-white p-2.5 text-left font-semibold text-[#102c1c] hover:border-[#1d6b3e] hover:bg-[#1d6b3e]/5 transition-colors"
                            >
                              <span>{timeSlot}</span>
                              <Clock size={14} className="text-[#1d6b3e]" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Step: Booking Ready (Pre-filled WhatsApp message) */}
                      {activeStep === 'booking_ready' && (
                        <div className="space-y-2 pt-1">
                          <a
                            href={getWhatsAppUrl(formatSiteVisitMessage(bookingData))}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25d366] p-3 font-semibold text-white hover:bg-[#20ba59] transition-colors shadow-md"
                          >
                            <MessageSquare size={16} />
                            <span>WhatsApp Details to Sales</span>
                          </a>

                          <a
                            href={`tel:${contactConfig.phoneRaw}`}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#102c1c]/20 bg-white p-2.5 font-semibold text-[#102c1c] hover:bg-[#102c1c]/5 transition-colors"
                          >
                            <Phone size={14} />
                            <span>Call Tulasi ({contactConfig.phone})</span>
                          </a>

                          <button
                            onClick={() => setActiveStep('main_menu')}
                            className="w-full text-center text-[11px] font-semibold text-[#1d6b3e] hover:underline pt-1"
                          >
                            ← Return to Main Menu
                          </button>
                        </div>
                      )}

                      {/* Step: Price Pick Project */}
                      {activeStep === 'price_pick_project' && (
                        <div className="space-y-1.5">
                          {mockProjects.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => {
                                addUserMessage(p.name);
                                addBotMessage(
                                  `🏷️ ${p.name}\nPrice: ${p.priceRange || 'Price on request'}\nPlot Pricing: ${p.plotPrice || 'Details on request'}\n\nPrices and availability may change. Please contact our sales team for the latest confirmation.`
                                );
                                setSelectedProject(p);
                                setActiveStep('price_selected_options');
                              }}
                              className="flex w-full items-center justify-between rounded-xl border border-[#102c1c]/10 bg-white p-2.5 text-left font-semibold text-[#102c1c] hover:border-[#1d6b3e] transition-colors"
                            >
                              <span>{p.name}</span>
                              <ChevronRight size={14} className="text-[#1d6b3e]" />
                            </button>
                          ))}
                          <button
                            onClick={() => setActiveStep('main_menu')}
                            className="text-[11px] font-semibold text-[#1d6b3e] hover:underline"
                          >
                            ← Back to Main Menu
                          </button>
                        </div>
                      )}

                      {/* Step: Price Selected Options */}
                      {activeStep === 'price_selected_options' && (
                        <div className="space-y-2">
                          <a
                            href={getWhatsAppUrl(
                              selectedProject
                                ? `Hello Tulasi Foundation, please share the latest price sheet for ${selectedProject.name}.`
                                : 'Hello Tulasi Foundation, please share the latest pricing details.'
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25d366] p-2.5 font-semibold text-white hover:bg-[#20ba59] transition-colors"
                          >
                            <MessageSquare size={14} />
                            <span>Confirm Price on WhatsApp</span>
                          </a>

                          <button
                            onClick={() => handleMenuSelect('book_site_visit')}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#102c1c]/15 bg-white p-2.5 font-semibold text-[#102c1c] hover:bg-[#102c1c]/5 transition-colors"
                          >
                            <Calendar size={14} />
                            <span>Book Site Visit</span>
                          </button>

                          <button
                            onClick={() => setActiveStep('main_menu')}
                            className="w-full text-center text-[11px] font-semibold text-[#1d6b3e] hover:underline"
                          >
                            ← Back to Main Menu
                          </button>
                        </div>
                      )}

                      {/* Step: Location Pick Project */}
                      {activeStep === 'location_pick_project' && (
                        <div className="space-y-1.5">
                          {mockProjects.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => {
                                addUserMessage(p.name);
                                addBotMessage(`📍 ${p.name}\nLocation: ${p.location}\nOffice: ${contactConfig.address}`);
                                setSelectedProject(p);
                                setActiveStep('location_selected_options');
                              }}
                              className="flex w-full items-center justify-between rounded-xl border border-[#102c1c]/10 bg-white p-2.5 text-left font-semibold text-[#102c1c] hover:border-[#1d6b3e] transition-colors"
                            >
                              <span>{p.name} ({p.location})</span>
                              <ChevronRight size={14} className="text-[#1d6b3e]" />
                            </button>
                          ))}
                          <button
                            onClick={() => setActiveStep('main_menu')}
                            className="text-[11px] font-semibold text-[#1d6b3e] hover:underline"
                          >
                            ← Back to Main Menu
                          </button>
                        </div>
                      )}

                      {/* Step: Location Selected Options */}
                      {activeStep === 'location_selected_options' && (
                        <div className="space-y-2">
                          <a
                            href={getWhatsAppUrl(`Hello Tulasi Foundation, please share the exact location and directions for ${selectedProject?.name || 'your projects'}.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25d366] p-2.5 font-semibold text-white hover:bg-[#20ba59] transition-colors"
                          >
                            <MessageSquare size={14} />
                            <span>Request Location Pin on WhatsApp</span>
                          </a>

                          <button
                            onClick={() => setActiveStep('main_menu')}
                            className="w-full text-center text-[11px] font-semibold text-[#1d6b3e] hover:underline"
                          >
                            ← Back to Main Menu
                          </button>
                        </div>
                      )}

                      {/* Step: Talk to Team Options */}
                      {activeStep === 'talk_to_team_options' && (
                        <div className="space-y-2">
                          <a
                            href={`tel:${contactConfig.phoneRaw}`}
                            className="flex w-full items-center justify-between rounded-xl bg-[#102c1c] p-2.5 font-semibold text-white hover:bg-[#1d6b3e] transition-colors"
                          >
                            <span>Call {contactConfig.phone}</span>
                            <Phone size={14} />
                          </a>

                          <a
                            href={getWhatsAppUrl('Hello Tulasi Foundation, I would like to speak with your customer advisory team.')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-between rounded-xl border border-[#25d366]/40 bg-[#25d366]/10 p-2.5 font-semibold text-[#102c1c] hover:bg-[#25d366]/20 transition-colors"
                          >
                            <span>WhatsApp Sales Team</span>
                            <MessageSquare size={14} className="text-[#128c7e]" />
                          </a>

                          <button
                            onClick={() => handleMenuSelect('book_site_visit')}
                            className="flex w-full items-center justify-between rounded-xl border border-[#102c1c]/15 bg-white p-2.5 font-semibold text-[#102c1c] hover:bg-[#102c1c]/5 transition-colors"
                          >
                            <span>Schedule Site Visit</span>
                            <Calendar size={14} />
                          </button>

                          <button
                            onClick={() => setActiveStep('main_menu')}
                            className="text-[11px] font-semibold text-[#1d6b3e] hover:underline"
                          >
                            ← Back to Main Menu
                          </button>
                        </div>
                      )}

                      {/* Step: Fallback options */}
                      {(activeStep === 'no_category_fallback' || activeStep === 'unsupported_fallback') && (
                        <div className="space-y-2">
                          <a
                            href={getWhatsAppUrl('Hello Tulasi Foundation, I am inquiring about your projects and upcoming availability.')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25d366] p-2.5 font-semibold text-white hover:bg-[#20ba59] transition-colors"
                          >
                            <MessageSquare size={14} />
                            <span>WhatsApp Us</span>
                          </a>

                          <a
                            href={`tel:${contactConfig.phoneRaw}`}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#102c1c]/20 bg-white p-2.5 font-semibold text-[#102c1c] hover:bg-[#102c1c]/5 transition-colors"
                          >
                            <Phone size={14} />
                            <span>Call {contactConfig.phone}</span>
                          </a>

                          <button
                            onClick={() => handleMenuSelect('book_site_visit')}
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#102c1c]/15 bg-white p-2.5 font-semibold text-[#102c1c] hover:bg-[#102c1c]/5 transition-colors"
                          >
                            <Calendar size={14} />
                            <span>Book Site Visit</span>
                          </button>

                          <button
                            onClick={() => setActiveStep('main_menu')}
                            className="w-full text-center text-[11px] font-semibold text-[#1d6b3e] hover:underline"
                          >
                            ← Back to Main Menu
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Input Bar */}
                <form
                  onSubmit={handleTextSubmit}
                  className="flex items-center gap-2 border-t border-[#102c1c]/10 bg-white p-3"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={
                      activeStep === 'ask_name'
                        ? 'Enter your name...'
                        : activeStep === 'booking_phone_input'
                        ? 'Enter your phone number...'
                        : activeStep === 'booking_date_input'
                        ? 'Enter preferred date...'
                        : 'Type your message...'
                    }
                    className="flex-1 bg-transparent px-2 text-xs text-[#102c1c] placeholder:text-[#748078] focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    aria-label="Send message"
                    className="grid h-8 w-8 place-items-center rounded-full bg-[#102c1c] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#1d6b3e] transition-colors"
                  >
                    <Send size={13} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TulasiChatbot;
