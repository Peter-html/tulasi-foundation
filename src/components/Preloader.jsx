import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const LOGO = '/tulasi-logo-full.jpeg';

const Preloader = ({ onFinish }) => {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(onFinish, reduceMotion ? 700 : 3800);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [onFinish, reduceMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#fffdf8]"
      style={{ perspective: '1400px' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.015, filter: 'blur(2px)' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div className="absolute h-[650px] w-[650px] rounded-full bg-green-200/20 blur-[120px]" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: [0, .8, .3], scale: [.5, 1, 1.35] }} transition={{ duration: 3 }} />

      {!reduceMotion && (
        <>
          <motion.div
            className="absolute left-[-70vw] top-[24%] h-[165px] w-[125vw] rounded-[100%] blur-[18px]"
            style={{ background: 'linear-gradient(90deg,transparent 0%,#14532d 20%,#16a34a 55%,#9de7ad 80%,transparent 100%)', transformStyle: 'preserve-3d' }}
            initial={{ x: '-15vw', y: 150, rotateZ: -20, rotateX: 62, rotateY: 35, scale: .5, opacity: 0 }}
            animate={{ x: '150vw', y: [-80,30,-60], rotateZ: [20,-12,18], rotateX: [62,25,10], rotateY: [35,-15,-35], scale: [.5,.9,1.65], opacity: [0,.65,0] }}
            transition={{ duration: 3, ease: [0.16,1,.3,1] }}
          />
          <motion.div
            className="absolute left-[-80vw] top-[44%] h-[100px] w-[135vw] rounded-[100%] blur-[9px]"
            style={{ background: 'linear-gradient(90deg,transparent 0%,#22c55e 18%,#16a34a 45%,#bbf7d0 73%,transparent 100%)', transformStyle: 'preserve-3d' }}
            initial={{ x: '-20vw', y: 100, rotateZ: 18, rotateY: 58, scale: .45, opacity: 0 }}
            animate={{ x: '155vw', y: [100,-60,20], rotateZ: [18,-18,10], rotateY: [58,5,-48], scale: [.45,1,2], opacity: [0,.9,0] }}
            transition={{ duration: 2.6, delay: .2, ease: [0.16,1,.3,1] }}
          />
          <motion.div
            className="absolute left-[-40vw] top-[55%] h-[4px] w-[70vw] rounded-full blur-[2px]"
            style={{ background: 'linear-gradient(90deg,transparent,#fde68a,#eab308,#fde68a,transparent)', boxShadow: '0 0 20px rgba(234,179,8,.38)' }}
            initial={{ x: '-30vw', rotateZ: -15, scaleX: .4, opacity: 0 }}
            animate={{ x: '180vw', rotateZ: [12,-10,5], scaleX: [.4,1.1,1.6], opacity: [0,1,0] }}
            transition={{ duration: 2, delay: .65, ease: [0.22,1,.36,1] }}
          />
        </>
      )}

      <motion.div
        className="relative z-20 flex w-[88vw] max-w-[820px] items-center justify-center"
        initial={{ opacity: 0, scale: .84, y: 18, filter: 'blur(11px)' }}
        animate={{ opacity: 1, scale: [.84,1.025,1], y: 0, filter: 'blur(0px)' }}
        transition={{ opacity: { duration: .7, delay: 1.12 }, scale: { duration: 1, delay: 1.08, ease: [0.22,1,.36,1] }, y: { duration: .9, delay: 1.08 }, filter: { duration: .8, delay: 1.08 } }}
      >
        <motion.div className="absolute h-[65%] w-[70%] rounded-full bg-green-300/20 blur-[70px]" initial={{ opacity: 0, scale: .5 }} animate={{ opacity: [0,.75,.2], scale: [.5,1,1.2] }} transition={{ duration: 2, delay: 1 }} />
        <img src={LOGO} alt="Tulasi Foundation" className="relative z-10 block h-auto w-full object-contain mix-blend-multiply" />
      </motion.div>

      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute z-30 top-0 h-full w-[120px] rotate-[18deg] bg-gradient-to-r from-transparent via-white/55 to-transparent blur-[10px]"
          initial={{ left: '-25%', opacity: 0 }}
          animate={{ left: '125%', opacity: [0,.75,0] }}
          transition={{ duration: 1.15, delay: 1.75, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  );
};

export default Preloader;
