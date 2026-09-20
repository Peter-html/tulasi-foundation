import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, index = 0 }) => {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  // Project 04 intentionally has NO previewVideo field.
  // When previewVideo is absent or fails, no video element is rendered.
  const hasPreviewVideo = Boolean(project.previewVideo) && !videoFailed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasPreviewVideo) return undefined;

    if (hovered) {
      // Start video from the beginning on desktop hover
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {
          // Gracefully fallback to cover image if browser blocks autoplay
        });
      }
    } else {
      // Pause and reset playback time to 0 when mouse leaves
      video.pause();
      video.currentTime = 0;
    }

    return undefined;
  }, [hovered, hasPreviewVideo]);

  const displayNumber = String(index + 1).padStart(2, '0');
  const statusBadgeText = (project.statusCategory || 'ongoing').toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.015, y: -4 }}
      className="group h-full"
    >
      <Link
        to={`/project/${project.id}`}
        className="flex h-full flex-col overflow-hidden rounded-[26px] bg-[#fffdf8] shadow-[0_4px_24px_rgba(16,44,28,0.04)] border border-[#102c1c]/8 transition-shadow duration-500 hover:shadow-[0_16px_40px_rgba(16,44,28,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d6b3e]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Large Image / Video Media Area */}
        <div className="relative aspect-[16/10] sm:aspect-[16/11] overflow-hidden bg-[#102c1c]">
          <img
            src={project.coverImage}
            alt={`${project.name} - ${project.projectType} in ${project.location}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />

          {/* Video element only rendered for projects with valid previewVideo (Projects 01, 02, 03) */}
          {hasPreviewVideo && (
            <video
              ref={videoRef}
              src={project.previewVideo}
              muted
              loop
              playsInline
              preload="metadata"
              poster={project.coverImage}
              onCanPlay={() => setVideoReady(true)}
              onError={() => setVideoFailed(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 pointer-events-none ${
                hovered && videoReady ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          {/* Subtle gradient overlay for legibility */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />

          {/* Status Badges: ONGOING / UPCOMING / COMPLETED (plus optional Featured badge) */}
          <div className="absolute left-4 top-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#fffdf8]/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#102c1c] shadow-sm backdrop-blur-md">
                {statusBadgeText}
              </span>
              {project.status === 'Featured Project' && (
                <span className="rounded-full border border-white/25 bg-[#102c1c]/80 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#d8f1dc] backdrop-blur-md">
                  Featured
                </span>
              )}
            </div>
            <span className="font-display text-2xl font-light tracking-tight text-white/90 drop-shadow-sm">
              {displayNumber}
            </span>
          </div>

          {/* Desktop Hover Indicator for Video Projects */}
          {hasPreviewVideo && (
            <span className="absolute bottom-4 left-4 hidden items-center gap-2 rounded-full border border-white/25 bg-black/40 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-opacity duration-300 md:flex">
              <Play size={10} fill="currentColor" />
              {hovered ? 'Site footage' : 'Hover to preview'}
            </span>
          )}
        </div>

        {/* Card Content & Details */}
        <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1d6b3e]">
              <span>{project.location}</span>
              <span className="h-1 w-1 rounded-full bg-[#1d6b3e]/40" />
              <span>{project.projectType}</span>
            </div>

            <h3 className="font-display text-3xl font-light tracking-[-0.04em] text-[#102c1c] sm:text-4xl">
              {project.name}
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#5c6860] line-clamp-2">
              {project.shortDescription}
            </p>
          </div>

          {/* View Project CTA */}
          <div className="mt-6 flex items-center justify-between border-t border-[#102c1c]/10 pt-4">
            <span className="text-sm font-semibold text-[#102c1c] group-hover:text-[#1d6b3e] transition-colors">
              Explore Project
            </span>
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#102c1c]/15 text-[#102c1c] transition-all duration-300 group-hover:rotate-45 group-hover:border-[#1d6b3e] group-hover:bg-[#1d6b3e] group-hover:text-white">
              <ArrowUpRight size={17} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
