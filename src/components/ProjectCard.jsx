import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Play } from 'lucide-react';

const ProjectCard = ({ project, index = 0 }) => {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const hasPreviewVideo = Boolean(project.previewVideo) && !videoFailed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasPreviewVideo) return undefined;

    if (hovered) {
      const playPromise = video.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {
          // Keep the cover image visible if the browser cannot start playback.
        });
      }
    } else {
      video.pause();
      video.currentTime = 0;
    }

    return undefined;
  }, [hovered, hasPreviewVideo]);

  return (
    <Link
      to={`/project/${project.id}`}
      className="group block overflow-hidden rounded-[28px] bg-[#fffdf8]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#102c1c]">
        <img
          src={project.coverImage}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.045]"
        />

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
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              hovered && videoReady ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-[#fffdf8]/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#102c1c] backdrop-blur">
          {project.status}
        </span>

        {hasPreviewVideo && (
          <span className="absolute bottom-4 left-4 hidden items-center gap-2 rounded-full border border-white/20 bg-black/25 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md md:flex">
            <Play size={11} fill="currentColor" />
            {hovered ? 'Playing preview' : 'Hover to preview'}
          </span>
        )}

        <span className="font-display absolute bottom-4 right-5 text-5xl font-light text-white/70">
          0{index + 1}
        </span>
      </div>

      <div className="grid gap-5 p-6 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#738078]">
            {project.location} · {project.projectType}
          </p>
          <h3 className="font-display text-4xl font-light tracking-[-0.05em] text-[#102c1c]">
            {project.name}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#6c786f]">
            {project.shortDescription}
          </p>
        </div>

        <span className="grid h-11 w-11 place-items-center rounded-full border border-[#102c1c]/15 text-[#102c1c] transition-all group-hover:rotate-45 group-hover:bg-[#102c1c] group-hover:text-white">
          <ArrowUpRight size={17} />
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;
