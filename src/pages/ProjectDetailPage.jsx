import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  MousePointer2,
  Rotate3D,
  ZoomIn,
} from 'lucide-react';
import { motion } from 'framer-motion';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ConceptVillaViewer from '../components/ConceptVillaViewer';
import { mockProjects } from '../data/mockProjects';

const ProjectDetailPage = () => {
  const { projectId } = useParams();

  const project = mockProjects.find(
    (item) => item.id === projectId
  );

  // Default concept model used for every project
  const conceptModelUrl =
    project?.conceptModel || '/models/concept-villa.glb';

  const conceptModelRotation =
    project?.conceptModelRotationY ?? 0;

  // =========================================================
  // PROJECT NOT FOUND
  // =========================================================

  if (!project) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f7f4ed] px-6 text-center text-[#102c1c]">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#1d6b3e]">
            404
          </p>

          <h1 className="font-display mt-3 text-6xl font-light">
            Project not found.
          </h1>

          <Link
            to="/projects"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#102c1c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d6b3e]"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  const gallery = project.galleryImages || [];

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#102c1c]">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <Header />

      <main>

        {/* =====================================================
            PROJECT HERO
        ====================================================== */}

        <section className="relative h-[92svh] min-h-[700px] overflow-hidden bg-[#102c1c] text-white">

          <motion.img
            initial={{
              scale: 1.08,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              duration: 1.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            src={project.coverImage}
            alt={project.name}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Hero overlay */}

          <div
            className="
              absolute
              inset-0
              bg-[linear-gradient(
                90deg,
                rgba(6,25,14,.74)_0%,
                rgba(6,25,14,.2)_55%,
                transparent
              ),
              linear-gradient(
                0deg,
                rgba(6,25,14,.65)_0%,
                transparent_45%
              )]
            "
          />

          <div className="relative mx-auto flex h-full max-w-[1500px] flex-col justify-end px-6 pb-8 md:px-10 md:pb-10 lg:px-14">

            {/* Back */}

            <Link
              to="/projects"
              className="
                absolute
                left-6
                top-32
                inline-flex
                items-center
                gap-2
                text-xs
                uppercase
                tracking-[0.18em]
                text-white/70
                transition
                hover:text-white
                md:left-10
                lg:left-14
              "
            >
              <ArrowLeft size={14} />
              Projects
            </Link>

            {/* Hero information */}

            <div className="grid gap-7 lg:grid-cols-[1fr_370px] lg:items-end">

              <div>

                <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-white/60">
                  {project.status}
                </p>

                <h1
                  className="
                    font-display
                    text-[clamp(5rem,11vw,11rem)]
                    font-light
                    leading-[0.8]
                    tracking-[-0.07em]
                  "
                >
                  {project.name}
                </h1>

              </div>

              <div className="lg:pb-2">

                <p className="flex items-center gap-2 text-sm text-white/70">
                  <MapPin size={15} />
                  {project.location}
                </p>

                <p className="mt-4 text-sm leading-6 text-white/68">
                  {project.shortDescription}
                </p>

                <a
                  href="#enquire"
                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-3
                    rounded-full
                    bg-white
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-[#102c1c]
                    transition
                    hover:bg-[#dce8dd]
                  "
                >
                  Book a site visit
                  <ArrowUpRight size={16} />
                </a>

              </div>

            </div>

            {/* Project facts */}

            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] bg-white/15 sm:grid-cols-4">

              {[
                ['Type', project.projectType],
                ['Scale', project.totalArea],
                ['Availability', project.status],
                ['Pricing', project.priceRange],
              ].map(([label, value]) => (

                <div
                  key={label}
                  className="bg-black/15 p-4 backdrop-blur-md md:p-5"
                >

                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">
                    {label}
                  </p>

                  <p className="mt-1 text-sm text-white/90">
                    {value || 'Enquire for details'}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* =====================================================
            PROJECT OVERVIEW
        ====================================================== */}

        <section className="px-6 py-24 md:px-10 md:py-32 lg:px-14">

          <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[.65fr_1.35fr] lg:gap-24">

            <div>

              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1d6b3e]">
                Project overview
              </p>

            </div>

            <div>

              <h2
                className="
                  font-display
                  text-balance
                  text-[clamp(3rem,5vw,5.8rem)]
                  font-light
                  leading-[0.94]
                  tracking-[-0.055em]
                "
              >
                A place designed around the way you want to live.
              </h2>

              <p className="mt-8 max-w-3xl text-base leading-7 text-[#637067] md:text-lg">
                {project.description}
              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            PROJECT GALLERY
        ====================================================== */}

        {gallery.length > 0 && (

          <section className="px-4 pb-24 md:px-6 md:pb-32">

            <div className="mx-auto max-w-[1560px]">

              <div className="mb-10 flex items-end justify-between px-2">

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1d6b3e]">
                    Explore the project
                  </p>

                  <h2 className="font-display mt-3 text-4xl font-light tracking-[-0.04em] md:text-6xl">
                    Views from the site.
                  </h2>

                </div>

              </div>

              <div className="grid gap-4 md:grid-cols-12">

                {gallery.slice(0, 6).map(
                  (image, index) => {

                    const className =
                      index === 0
                        ? 'md:col-span-8 aspect-[16/10]'
                        : index === 1
                          ? 'md:col-span-4 aspect-[4/5]'
                          : index === 2
                            ? 'md:col-span-5 aspect-[4/3]'
                            : index === 3
                              ? 'md:col-span-7 aspect-[16/9]'
                              : 'md:col-span-6 aspect-[4/3]';

                    return (

                      <motion.div
                        key={`${image}-${index}`}
                        initial={{
                          opacity: 0,
                          y: 24,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.15,
                        }}
                        transition={{
                          duration: 0.7,
                        }}
                        className={`overflow-hidden rounded-[24px] ${className}`}
                      >

                        <img
                          src={image}
                          alt={`${project.name} view ${index + 1}`}
                          loading="lazy"
                          className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-[1200ms]
                            hover:scale-[1.035]
                          "
                        />

                      </motion.div>

                    );
                  }
                )}

              </div>

            </div>

          </section>

        )}

        {/* =====================================================
            INTERACTIVE CONCEPT VILLA

            IMPORTANT:
            This section now appears on EVERY project.
            It is an inspiration model, not an actual built villa.
        ====================================================== */}

        <section className="overflow-hidden bg-[#0e2418] px-6 py-24 text-white md:px-10 md:py-32 lg:px-14">

          <div className="mx-auto max-w-[1500px]">

            {/* Heading */}

            <div className="mb-12 grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end lg:gap-20">

              <div>

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-[#a8d8b5]
                  "
                >
                  Design inspiration · Interactive concept
                </motion.p>

                <motion.h2
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="
                    font-display
                    mt-5
                    text-[clamp(3.8rem,7vw,7.4rem)]
                    font-light
                    leading-[0.86]
                    tracking-[-0.06em]
                  "
                >
                  {project.conceptModelTitle ||
                    'Build what you imagine.'}
                </motion.h2>

              </div>

              {/* Description */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                }}
                className="max-w-2xl lg:pb-2"
              >

                <p className="text-base leading-7 text-white/68 md:text-lg">
                  {project.conceptModelDescription ||
                    `Explore an interactive sample villa and imagine what your future home at ${project.name} could become. This model is provided purely for design inspiration and does not represent an actual completed Tulasi Foundation villa or a fixed construction specification.`}
                </p>

                {/* Controls */}

                <div className="mt-7 flex flex-wrap gap-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/70">

                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2">
                    <MousePointer2 size={12} />
                    Drag with cursor
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2">
                    <Rotate3D size={12} />
                    180° orbit
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2">
                    <ZoomIn size={12} />
                    Exterior zoom
                  </span>

                </div>

              </motion.div>

            </div>

            {/* =================================================
                3D VIEWER
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.1,
              }}
              transition={{
                duration: 0.9,
              }}
            >

              <ConceptVillaViewer
                modelUrl={conceptModelUrl}
                rotationY={conceptModelRotation}
              />

            </motion.div>

            {/* Disclaimer */}

            <div className="mt-5 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 text-xs leading-5 text-white/45 md:flex-row">

              <span>
                Illustrative concept model · For visualisation and design
                inspiration only.
              </span>

              <span>
                Final design may vary based on requirements, approvals and
                specifications.
              </span>

            </div>

          </div>

        </section>

        {/* =====================================================
            SITE VISIT CTA
        ====================================================== */}

        <section
          id="enquire"
          className="bg-[#102c1c] px-6 py-24 text-white md:px-10 md:py-28 lg:px-14"
        >

          <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1fr_auto] lg:items-end">

            <div>

              <p className="mb-5 text-[11px] uppercase tracking-[0.25em] text-[#a9d4b5]">
                Interested in {project.name}?
              </p>

              <h2
                className="
                  font-display
                  max-w-4xl
                  text-[clamp(3.8rem,7vw,7rem)]
                  font-light
                  leading-[0.88]
                  tracking-[-0.06em]
                "
              >
                See the place for yourself.
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-6 text-white/60 md:text-base">
                Visit the project, explore the surroundings and speak with
                our team about the possibilities available to you.
              </p>

            </div>

            <a
              href="tel:+919443349064"
              className="
                inline-flex
                items-center
                justify-between
                gap-12
                rounded-full
                bg-[#dce8dd]
                px-6
                py-4
                font-semibold
                text-[#102c1c]
                transition
                duration-300
                hover:scale-[1.02]
                hover:bg-white
              "
            >
              Schedule a visit
              <ArrowUpRight size={18} />
            </a>

          </div>

        </section>

      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />

    </div>
  );
};

export default ProjectDetailPage;