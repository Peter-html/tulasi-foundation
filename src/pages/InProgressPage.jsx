import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, CheckCircle2, MessageSquare, Phone, Mail, MapPin, Send } from 'lucide-react';
import Header from '../components/Header';
import FeaturedProjectsSection from '../components/FeaturedProjectsSection';
import AboutTeaserSection from '../components/AboutTeaserSection';
import Footer from '../components/Footer';
import { contactConfig, getWhatsAppUrl } from '../config/contact';

const InProgressPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Tulasi Foundation | Website Under Construction';
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.email.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Also generate direct WhatsApp inquiry url for convenience
      const text = [
        `*New Inquiry from Website (Under Construction)*`,
        `Name: ${formData.firstName} ${formData.lastName}`.trim(),
        `Email: ${formData.email}`,
        `Message: ${formData.message || 'Interested in upcoming projects & site visits.'}`,
      ].join('\n');

      const waUrl = getWhatsAppUrl(text);
      // Open in new tab if user wants direct messaging
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 600);
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f7f4ed] text-[#102c1c] selection:bg-[#1d6b3e] selection:text-white">
      {/* 1. Official Toolbar (Header) - Always solid white pill on this page matching Image 1 */}
      <Header forceSolid={true} />

      {/* 2. Hero Section - Exact NPI Architectural Archway Reference (Image 3) */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-between px-4 pb-10 pt-28 text-center sm:pt-36">
        {/* Background NPI Archway Image with subtle gradient for text contrast */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/photos/npi-archway.jpg"
            alt="Tulasi Foundation Architecture"
            className="h-full w-full object-cover object-center"
          />
          {/* Subtle soft white & shadow overlays ensuring text readability while keeping the architecture pristine */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[0.5px]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f7f4ed] via-[#f7f4ed]/70 to-transparent" />
        </div>

        {/* Top Monogram / Logo Mark (Matching Image 3 NPI crest style) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="grid h-14 w-14 place-items-center rounded-xl bg-[#102c1c] text-white shadow-lg sm:h-16 sm:w-16">
            <img
              src="/tulasi-logo-icon.png"
              alt="Tulasi Foundation Monogram"
              className="h-8 w-8 object-contain sm:h-9 sm:w-9"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <span className="mt-3 block text-[10px] font-bold uppercase tracking-[0.28em] text-[#102c1c]/90 sm:text-[11px]">
            TULASI FOUNDATION
          </span>
          <span className="mt-0.5 block text-[8px] uppercase tracking-[0.35em] text-[#1d6b3e] font-semibold">
            ARCHITECTURAL DEVELOPERS
          </span>
        </motion.div>

        {/* Center Typography: "Website is Under Construction" (Exact Image 3 Reference) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="relative z-10 my-auto max-w-4xl px-4 py-8"
        >
          <h1 className="font-display text-4xl font-light tracking-[-0.03em] text-[#102c1c] drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)] sm:text-6xl md:text-7xl lg:text-[5.2rem] leading-[1.06]">
            Website is Under
            <span className="block font-normal">Construction</span>
          </h1>

          {/* Subtitle / Locations matching Image 3 (ATHENS • MONACO • PARIS • NEW YORK) */}
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-[#102c1c]/80 sm:text-sm">
            NAGERCOIL &bull; KANYAKUMARI &bull; TAMIL NADU &bull; CHENNAI
          </p>

          <p className="mx-auto mt-4 max-w-xl text-xs sm:text-sm leading-relaxed text-[#404c45]">
            Crafting prime residential plots, bespoke nature-inspired villas, and masterplanned communities.
          </p>
        </motion.div>

        {/* Bottom Scroll Prompt */}
        <motion.button
          type="button"
          onClick={scrollToContact}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="group relative z-10 flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#102c1c]/75 transition-all hover:text-[#1d6b3e]"
          aria-label="Scroll to Contact Us section"
        >
          <span>Scroll to Contact Us</span>
          <span className="grid h-8 w-8 place-items-center rounded-full border border-[#102c1c]/20 bg-white/70 shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-1">
            <ArrowDown size={14} className="animate-bounce" />
          </span>
        </motion.button>
      </section>

      {/* 3. Contact Us Section (Exact Image 4 Reference) */}
      <section
        id="contact"
        className="scroll-mt-24 border-t border-[#102c1c]/10 bg-white px-6 py-20 md:px-12 md:py-28 lg:px-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-start">
            {/* Left Column: Title & Narrative */}
            <div className="lg:col-span-5">
              <p className="text-xl sm:text-2xl font-serif italic text-[#0096a6] md:text-3xl mb-2">
                We'd like to hear from you!
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#102c1c] mb-6">
                Contact Us
              </h2>

              <div className="space-y-4 text-sm leading-relaxed text-[#5c6860] md:text-base">
                <p>
                  Have questions about Tulasi Foundation projects or want to learn more about upcoming villa plots and
                  plotted layouts?
                </p>
                <p>
                  We're always looking to connect with homebuyers, families, and property investors in southern Tamil
                  Nadu. Whether you're interested in scheduling a site walkthrough, reserving a plot, or exploring custom
                  villa development, we'd love to hear from you.
                </p>
              </div>

              {/* Direct Touchpoints */}
              <div className="mt-8 space-y-3.5 border-t border-[#102c1c]/10 pt-6 text-sm">
                <a
                  href={`tel:${contactConfig.phoneRaw}`}
                  className="flex items-center gap-3 text-[#102c1c] hover:text-[#1d6b3e] transition-colors"
                >
                  <Phone size={16} className="text-[#0096a6]" />
                  <span className="font-medium">{contactConfig.phone}</span>
                </a>
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="flex items-center gap-3 text-[#102c1c] hover:text-[#1d6b3e] transition-colors"
                >
                  <Mail size={16} className="text-[#0096a6]" />
                  <span className="font-medium">{contactConfig.email}</span>
                </a>
                <div className="flex items-center gap-3 text-[#5c6860]">
                  <MapPin size={16} className="text-[#0096a6]" />
                  <span>{contactConfig.address}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form (Matching Image 4) */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-gray-200/80 bg-white p-6 sm:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-10 text-center"
                    >
                      <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-[#1d6b3e]/10 text-[#1d6b3e]">
                        <CheckCircle2 size={28} />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-[#102c1c]">
                        Message Sent Successfully!
                      </h3>
                      <p className="mx-auto mt-2 max-w-md text-sm text-[#5c6860]">
                        Thank you, {formData.firstName}. Our customer advisory team will get in touch with you shortly.
                      </p>
                      <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSubmitted(false);
                            setFormData({ firstName: '', lastName: '', email: '', message: '' });
                          }}
                          className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-xs font-semibold text-[#102c1c] hover:bg-gray-50"
                        >
                          Send Another Message
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* First Name & Last Name */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold text-[#102c1c] mb-1.5">
                            First Name<span className="text-[#0096a6]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder=""
                            className="w-full rounded-lg border border-gray-200 bg-[#f8fafc] px-3.5 py-2.5 text-sm text-[#102c1c] outline-none transition-all focus:border-[#0096a6] focus:bg-white focus:ring-2 focus:ring-[#0096a6]/20"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#102c1c] mb-1.5">
                            Last Name<span className="text-[#0096a6]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder=""
                            className="w-full rounded-lg border border-gray-200 bg-[#f8fafc] px-3.5 py-2.5 text-sm text-[#102c1c] outline-none transition-all focus:border-[#0096a6] focus:bg-white focus:ring-2 focus:ring-[#0096a6]/20"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-semibold text-[#102c1c] mb-1.5">
                          Email<span className="text-[#0096a6]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder=""
                          className="w-full rounded-lg border border-gray-200 bg-[#f8fafc] px-3.5 py-2.5 text-sm text-[#102c1c] outline-none transition-all focus:border-[#0096a6] focus:bg-white focus:ring-2 focus:ring-[#0096a6]/20"
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-semibold text-[#102c1c] mb-1.5">
                          Message
                        </label>
                        <textarea
                          rows={5}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder=""
                          className="w-full rounded-lg border border-gray-200 bg-[#f8fafc] px-3.5 py-2.5 text-sm text-[#102c1c] outline-none transition-all focus:border-[#0096a6] focus:bg-white focus:ring-2 focus:ring-[#0096a6]/20 resize-y"
                        />
                      </div>

                      {/* Submit Button (Image 4 Cyan Button) */}
                      <div>
                        <button
                          type="submit"
                          disabled={loading}
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#00a3c4] px-7 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#008ba8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a3c4] disabled:opacity-70"
                        >
                          {loading ? (
                            <span>Submitting...</span>
                          ) : (
                            <>
                              <span>Submit</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Next Other Pages Preview: Ongoing Projects ("and next other pages like") */}
      <div id="living">
        <FeaturedProjectsSection />
      </div>

      {/* 5. Next Other Pages Preview: About Us Teaser */}
      <div id="standard">
        <AboutTeaserSection />
      </div>

      {/* 6. Official Footer */}
      <Footer />
    </div>
  );
};

export default InProgressPage;
