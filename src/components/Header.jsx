import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const onHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const solid = !onHome || scrolled;
  const text = solid ? 'text-[#102c1c]' : 'text-white';

  const links = [
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/#about' },
    { label: 'Living', href: '/#living' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <motion.nav
        layout
        className={`mx-auto flex max-w-[1500px] items-center justify-between rounded-full px-4 py-3 transition-all duration-500 md:px-6 ${
          solid ? 'bg-[#fffdf8]/95 shadow-[0_12px_40px_rgba(16,44,28,0.08)] backdrop-blur-xl' : 'bg-white/5 backdrop-blur-[2px]'
        }`}
      >
        <Link to="/" className={`flex items-center gap-3 ${text}`}>
          <span className={`grid h-9 w-9 place-items-center rounded-full ${solid ? 'bg-[#eef2ec]' : 'bg-white'}`}>
            <img src="/tulasi-logo-icon.png" alt="Tulasi Foundation" className="h-6 w-6 object-contain" />
          </span>
          <span className="leading-none">
            <span className="block text-[13px] font-semibold tracking-[0.22em]">TULASI</span>
            <span className="mt-1 block text-[8px] tracking-[0.34em] opacity-70">FOUNDATION</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((item) => (
            <a key={item.label} href={item.href} className={`text-sm font-medium transition-opacity hover:opacity-55 ${text}`}>
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/#contact"
            className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all sm:flex ${
              solid ? 'bg-[#102c1c] text-white hover:bg-[#1d6b3e]' : 'bg-white text-[#102c1c] hover:bg-[#edf6ef]'
            }`}
          >
            Enquire <ArrowUpRight size={15} />
          </a>
          <button
            className={`grid h-10 w-10 place-items-center rounded-full lg:hidden ${solid ? 'bg-[#eef2ec] text-[#102c1c]' : 'bg-white/15 text-white'}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="mx-auto mt-2 max-w-[1500px] rounded-[28px] bg-[#fffdf8] p-6 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col">
              {links.map((item) => (
                <a key={item.label} href={item.href} className="border-b border-black/10 py-4 text-2xl font-medium text-[#102c1c]">
                  {item.label}
                </a>
              ))}
              <a href="/#contact" className="mt-5 flex items-center justify-between rounded-full bg-[#1d6b3e] px-5 py-4 font-semibold text-white">
                Schedule a site visit <ArrowUpRight size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
