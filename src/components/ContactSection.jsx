import React from 'react';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="bg-[#dce8dd] px-4 py-4 md:px-6 md:py-6">
      <div className="mx-auto max-w-[1560px] overflow-hidden rounded-[34px] bg-[#163a25] text-white">
        <div className="grid lg:grid-cols-[1.08fr_.92fr]">
          <div className="p-7 md:p-12 lg:p-16 xl:p-20">
            <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a9d4b5]">04 · Start a conversation</p>
            <h2 className="font-display max-w-4xl text-[clamp(3.5rem,7vw,7rem)] font-light leading-[0.88] tracking-[-0.06em]">See the project. Feel the place.</h2>
            <p className="mt-8 max-w-xl text-base leading-7 text-white/60">Tell us what you are looking for and our team can help with project details, availability and a site visit.</p>

            <div className="mt-14 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-3">
              <a href="tel:+919443349064" className="group">
                <Phone size={18} className="mb-3 text-[#a9d4b5]" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">Call</p>
                <p className="mt-1 text-sm group-hover:text-[#a9d4b5]">+91 94433 49064</p>
              </a>
              <a href="mailto:contact@tulasifoundation.com" className="group">
                <Mail size={18} className="mb-3 text-[#a9d4b5]" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">Email</p>
                <p className="mt-1 break-all text-sm group-hover:text-[#a9d4b5]">contact@tulasifoundation.com</p>
              </a>
              <div>
                <MapPin size={18} className="mb-3 text-[#a9d4b5]" />
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">Office</p>
                <p className="mt-1 text-sm">Nagercoil · Tamil Nadu</p>
              </div>
            </div>
          </div>

          <div className="bg-[#fffdf8] p-7 text-[#102c1c] md:p-12 lg:p-16">
            <p className="mb-7 text-sm font-semibold">Schedule a site visit</p>
            <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
              {[
                ['Name', 'Your name', 'text'],
                ['Phone', '+91', 'tel'],
                ['Email', 'you@example.com', 'email'],
              ].map(([label, placeholder, type]) => (
                <label key={label} className="block border-b border-[#102c1c]/18 pb-3">
                  <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6e7a72]">{label}</span>
                  <input type={type} placeholder={placeholder} className="w-full bg-transparent text-lg outline-none placeholder:text-[#102c1c]/25" />
                </label>
              ))}
              <label className="block border-b border-[#102c1c]/18 pb-3">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6e7a72]">Interested in</span>
                <select className="w-full appearance-none bg-transparent text-lg outline-none">
                  <option>Limelight</option>
                  <option>Project 02</option>
                  <option>Project 03</option>
                  <option>Project 04</option>
                </select>
              </label>
              <button type="submit" className="mt-4 flex w-full items-center justify-between rounded-full bg-[#1d6b3e] px-6 py-4 font-semibold text-white transition-colors hover:bg-[#102c1c]">
                Send enquiry <ArrowUpRight size={18} />
              </button>
              <p className="text-xs leading-5 text-[#7a857e]">Demo form only. Backend submission can be connected when the API is ready.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
