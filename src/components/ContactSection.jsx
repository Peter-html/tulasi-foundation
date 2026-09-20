import React, { useState } from 'react';
import { ArrowUpRight, Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import { contactConfig, getWhatsAppUrl, formatSiteVisitMessage } from '../config/contact';
import { mockProjects } from '../data/mockProjects';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    project: mockProjects[0]?.name || 'Limelight',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = formatSiteVisitMessage({
      name: formData.name,
      phone: formData.phone,
      project: formData.project,
    });
    const url = getWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="scroll-mt-28 md:scroll-mt-32 bg-[#dce8dd] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-[1560px] overflow-hidden rounded-[34px] bg-[#163a25] text-white">
        <div className="grid lg:grid-cols-[1.08fr_.92fr]">
          <div className="p-7 md:p-12 lg:p-16 xl:p-20">
            <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a9d4b5]">
              04 · Start a conversation
            </p>
            <h2 className="font-display max-w-4xl text-[clamp(3.2rem,6.5vw,6.5rem)] font-light leading-[0.9] tracking-[-0.05em]">
              See the project. Feel the place.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-7 text-white/75">
              Tell us what you are looking for and our team will help you with project details, site walkthroughs, and clear pricing information.
            </p>

            <div className="mt-14 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-3">
              <a href={`tel:${contactConfig.phoneRaw}`} className="group">
                <Phone size={18} className="mb-3 text-[#a9d4b5]" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Call Directly</p>
                <p className="mt-1 text-sm text-white group-hover:text-[#a9d4b5] transition-colors">
                  {contactConfig.phone}
                </p>
              </a>
              <a href={`mailto:${contactConfig.email}`} className="group">
                <Mail size={18} className="mb-3 text-[#a9d4b5]" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Email Us</p>
                <p className="mt-1 break-all text-sm text-white group-hover:text-[#a9d4b5] transition-colors">
                  {contactConfig.email}
                </p>
              </a>
              <div>
                <MapPin size={18} className="mb-3 text-[#a9d4b5]" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Head Office</p>
                <p className="mt-1 text-sm text-white">{contactConfig.address}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#fffdf8] p-7 text-[#102c1c] md:p-12 lg:p-16">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#102c1c]">
                Schedule a Site Visit
              </p>
              <span className="rounded-full bg-[#1d6b3e]/10 px-3 py-1 text-[10px] font-semibold text-[#1d6b3e]">
                No Obligation
              </span>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <label className="block border-b border-[#102c1c]/18 pb-2">
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6e7a72]">
                  Your Name
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent text-base text-[#102c1c] outline-none placeholder:text-[#102c1c]/30"
                />
              </label>

              <label className="block border-b border-[#102c1c]/18 pb-2">
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6e7a72]">
                  Phone Number
                </span>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent text-base text-[#102c1c] outline-none placeholder:text-[#102c1c]/30"
                />
              </label>

              <label className="block border-b border-[#102c1c]/18 pb-2">
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6e7a72]">
                  Email Address (Optional)
                </span>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent text-base text-[#102c1c] outline-none placeholder:text-[#102c1c]/30"
                />
              </label>

              <label className="block border-b border-[#102c1c]/18 pb-2">
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6e7a72]">
                  Interested In
                </span>
                <select
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full appearance-none bg-transparent text-base text-[#102c1c] outline-none cursor-pointer"
                >
                  {mockProjects.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.projectType} · {p.location})
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-between rounded-full bg-[#1d6b3e] px-6 py-4 font-semibold text-white transition-colors hover:bg-[#102c1c] shadow-md"
              >
                <span>Continue on WhatsApp</span>
                <MessageSquare size={18} />
              </button>

              <p className="text-xs leading-5 text-[#7a857e]">
                Direct connection to sales: details will open in WhatsApp so our team can immediately confirm your appointment.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
