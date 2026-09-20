import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleLivingClick = (e) => {
    e.preventDefault();
    setOpen(false);
    if (onHome) {
      const element = document.querySelector('#living');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', '#living');
      }
    } else {
      navigate('/#living');
    }
  };

  const handleEnquireClick = (e) => {
    e.preventDefault();
    setOpen(false);
    if (onHome) {
      const element = document.querySelector('#contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', '#contact');
      }
    } else {
      navigate('/#contact');
    }
  };

  const handleHomeClick = (e) => {
    setOpen(false);
    if (onHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <motion.nav
        layout
        className={`mx-auto flex max-w-[1500px] items-center justify-between rounded-full px-4 py-3 transition-all duration-500 md:px-6 ${
          solid
            ? 'bg-[#fffdf8]/95 shadow-[0_12px_40px_rgba(16,44,28,0.08)] backdrop-blur-xl'
            : 'bg-white/5 backdrop-blur-[2px]'
        }`}
      >
        {/* Brand Logo - Navigates to / */}
        <Link
          to="/"
          onClick={handleHomeClick}
          className={`flex items-center gap-3 ${text} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d6b3e] rounded-full`}
        >
          <span
            className={`grid h-9 w-9 place-items-center rounded-full ${
              solid ? 'bg-[#eef2ec]' : 'bg-white'
            }`}
          >
            <img src="/tulasi-logo-icon.png" alt="Tulasi Foundation" className="h-6 w-6 object-contain" />
          </span>
          <span className="leading-none">
            <span className="block text-[13px] font-semibold tracking-[0.22em]">TULASI</span>
            <span className="mt-1 block text-[8px] tracking-[0.34em] opacity-70">FOUNDATION</span>
          </span>
        </Link>

        {/* Navigation - Visible on half-screen, tablet and desktop (sm and up) */}
        <div className="hidden items-center gap-3 sm:flex md:gap-6 lg:gap-8">
          <Link
            to="/"
            onClick={handleHomeClick}
            className={`text-xs sm:text-sm font-medium transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d6b3e] rounded-sm ${text} ${
              onHome ? 'font-semibold underline underline-offset-8 decoration-[#1d6b3e]' : ''
            }`}
          >
            Home
          </Link>

          <Link
            to="/projects"
            onClick={() => setOpen(false)}
            className={`text-xs sm:text-sm font-medium transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d6b3e] rounded-sm ${text} ${
              location.pathname === '/projects' ? 'font-semibold underline underline-offset-8 decoration-[#1d6b3e]' : ''
            }`}
          >
            Projects
          </Link>

          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className={`text-xs sm:text-sm font-medium transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d6b3e] rounded-sm ${text} ${
              location.pathname === '/about' ? 'font-semibold underline underline-offset-8 decoration-[#1d6b3e]' : ''
            }`}
          >
            About
          </Link>

          <a
            href={onHome ? '#living' : '/#living'}
            onClick={handleLivingClick}
            className={`text-xs sm:text-sm font-medium transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d6b3e] rounded-sm ${text}`}
          >
            Living
          </a>
        </div>

        {/* Action Controls & Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Quick-switch button visible on narrow mobile (<sm) to effortlessly jump between Home and Projects */}
          <Link
            to={onHome ? '/projects' : '/'}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-all sm:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d6b3e] ${
              solid
                ? 'bg-[#102c1c] text-white hover:bg-[#1d6b3e]'
                : 'bg-white text-[#102c1c] hover:bg-[#edf6ef]'
            }`}
          >
            <span>{onHome ? 'Projects' : 'Home'}</span>
            {onHome && <ArrowUpRight size={13} />}
          </Link>

          {/* Enquire CTA */}
          <a
            href={onHome ? '#contact' : '/#contact'}
            onClick={handleEnquireClick}
            className={`hidden items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all sm:flex md:px-5 md:py-2.5 md:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d6b3e] ${
              solid
                ? 'bg-[#102c1c] text-white hover:bg-[#1d6b3e]'
                : 'bg-white text-[#102c1c] hover:bg-[#edf6ef]'
            }`}
          >
            Enquire <ArrowUpRight size={15} />
          </a>

          {/* Hamburger Menu Toggle (visible on tablet & mobile) */}
          <button
            className={`grid h-9 w-9 place-items-center rounded-full sm:h-10 sm:w-10 lg:hidden ${
              solid ? 'bg-[#eef2ec] text-[#102c1c]' : 'bg-white/15 text-white'
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d6b3e]`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Responsive Menu Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="mx-auto mt-2 max-w-[1500px] rounded-[28px] bg-[#fffdf8] p-6 shadow-2xl lg:hidden"
          >
            <div className="flex flex-col">
              <Link
                to="/"
                onClick={handleHomeClick}
                className={`border-b border-black/10 py-4 text-2xl font-medium text-[#102c1c] flex items-center justify-between ${
                  onHome ? 'font-bold text-[#1d6b3e]' : ''
                }`}
              >
                <span>Home</span>
                <ArrowUpRight size={20} className="opacity-40" />
              </Link>

              <Link
                to="/projects"
                onClick={() => setOpen(false)}
                className={`border-b border-black/10 py-4 text-2xl font-medium text-[#102c1c] flex items-center justify-between ${
                  location.pathname === '/projects' ? 'font-bold text-[#1d6b3e]' : ''
                }`}
              >
                <span>Projects</span>
                <ArrowUpRight size={20} className="opacity-40" />
              </Link>

              <Link
                to="/about"
                onClick={() => setOpen(false)}
                className={`border-b border-black/10 py-4 text-2xl font-medium text-[#102c1c] flex items-center justify-between ${
                  location.pathname === '/about' ? 'font-bold text-[#1d6b3e]' : ''
                }`}
              >
                <span>About</span>
                <ArrowUpRight size={20} className="opacity-40" />
              </Link>

              <a
                href={onHome ? '#living' : '/#living'}
                onClick={handleLivingClick}
                className="border-b border-black/10 py-4 text-2xl font-medium text-[#102c1c] flex items-center justify-between"
              >
                <span>Living</span>
                <ArrowUpRight size={20} className="opacity-40" />
              </a>

              <a
                href={onHome ? '#contact' : '/#contact'}
                onClick={handleEnquireClick}
                className="mt-5 flex items-center justify-between rounded-full bg-[#1d6b3e] px-5 py-4 font-semibold text-white hover:bg-[#102c1c] transition-colors"
              >
                <span>Schedule a site visit</span> <ArrowUpRight size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
