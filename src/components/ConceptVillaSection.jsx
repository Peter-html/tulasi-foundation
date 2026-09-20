import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, Rotate3D, ZoomIn, Sparkles } from 'lucide-react';
import ConceptVillaViewer from './ConceptVillaViewer';

/**
 * Modular 3D Concept Villa Section
 * 
 * IMPORTANT:
 * This model is strictly an architectural concept and design inspiration tool.
 * It is NOT an actual delivered or completed Tulasi Foundation villa.
 */
const ConceptVillaSection = ({
  modelUrl = '/models/concept-villa.glb',
  rotationY = 0,
  projectName = 'Tulasi Foundation',
}) => {
  return (
    <section className="relative overflow-hidden bg-[#0e2418] px-6 py-24 text-white md:px-10 md:py-32 lg:px-14">
      <div className="mx-auto max-w-[1500px]">
        {/* Section Header */}
        <div className="mb-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
          <div>
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="rounded-full border border-[#a8d8b5]/30 bg-[#a8d8b5]/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#a8d8b5]">
                Concept Model
              </span>
              <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/80">
                Design Inspiration
              </span>
              <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/80">
                180° Exterior View
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display mt-6 text-[clamp(2.8rem,5.5vw,6rem)] font-light leading-[0.92] tracking-[-0.05em]"
            >
              BUILD WHAT YOU IMAGINE
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-2xl lg:pb-2"
          >
            <p className="text-base leading-7 text-white/75 md:text-lg">
              Explore an interactive sample villa and imagine how your future home could take shape.
            </p>

            {/* Viewer Interaction Controls Guide */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2">
                <MousePointer2 size={13} className="text-[#a8d8b5]" />
                Drag with cursor
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2">
                <Rotate3D size={13} className="text-[#a8d8b5]" />
                180° rotation
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2">
                <ZoomIn size={13} className="text-[#a8d8b5]" />
                Exterior zoom
              </span>
            </div>
          </motion.div>
        </div>

        {/* 3D Interactive Canvas Viewer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85 }}
        >
          <ConceptVillaViewer
            modelUrl={modelUrl}
            rotationY={rotationY}
          />
        </motion.div>

        {/* Mandatory Explicit Disclaimer */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-5 text-xs leading-6 text-white/60 backdrop-blur-sm sm:p-6">
          <p className="flex items-start gap-2">
            <span className="font-semibold text-white/85 uppercase tracking-wider text-[10px] whitespace-nowrap">
              Note:
            </span>
            <span>
              This interactive model is provided for design inspiration only. It is not an actual completed Tulasi Foundation villa and the final design, dimensions, finishes and specifications may vary.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ConceptVillaSection;
