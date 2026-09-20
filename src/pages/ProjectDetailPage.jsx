import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  Building,
  Calendar,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'framer-motion';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ConceptVillaSection from '../components/ConceptVillaSection';
import { mockProjects } from '../data/mockProjects';
import { contactConfig, getWhatsAppUrl, formatProjectInquiryMessage } from '../config/contact';

const ProjectDetailPage = () => {
  const { projectId } = useParams();

  const project = mockProjects.find((item) => item.id === projectId);

  useEffect(() => {
    if (project?.name) {
      document.title = `${project.name} | Tulasi Foundation`;
    }
  }, [project?.name]);

  // Default concept model path for interactive 3D villa
  const conceptModelUrl = project?.conceptModel || '/models/concept-villa.glb';
  const conceptModelRotation = project?.conceptModelRotationY ?? 0;

  // 404 handler
  if (!project) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f7f4ed] px-6 text-center text-[#102c1c]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1d6b3e]">
            404 Error
          </p>
          <h1 className="font-display mt-3 text-5xl font-light md:text-6xl">
            Project not found.
          </h1>
          <p className="mt-3 text-sm text-[#5c6860]">
            The development you are looking for might have been moved or updated.
          </p>
          <Link
            to="/projects"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#102c1c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1d6b3e]"
          >
            <ArrowLeft size={16} />
            Back to all projects
          </Link>
        </div>
      </div>
    );
  }

  const gallery = project.galleryImages || [];
  const features = project.surroundingFeatures || {};
  const hasSurroundingFeatures =
    features.schools?.list?.length ||
    features.colleges?.list?.length ||
    features.hospitals?.list?.length ||
    features.companies?.list?.length;

  const whatsappInquiryUrl = getWhatsAppUrl(formatProjectInquiryMessage(project.name));

  return (
    <div className="min-h-screen bg-[#f7f4ed] text-[#102c1c]">
      <Header />

      <main>
        {/* =====================================================
            1. PROJECT HERO
        ====================================================== */}
        <section className="relative h-[88svh] min-h-[660px] overflow-hidden bg-[#102c1c] text-white">
          <motion.img
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            src={project.coverImage}
            alt={`${project.name} preview`}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Gradients */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,25,14,0.78)_0%,rgba(6,25,14,0.35)_55%,rgba(6,25,14,0.15)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(6,25,14,0.72)_0%,rgba(6,25,14,0.2)_40%,transparent_70%)]" />

          <div className="relative mx-auto flex h-full max-w-[1500px] flex-col justify-end px-6 pb-12 md:px-10 md:pb-16 lg:px-14">
            {/* Back to Projects */}
            <Link
              to="/projects"
              className="absolute left-6 top-28 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white md:left-10 lg:left-14"
            >
              <ArrowLeft size={14} />
              All Projects
            </Link>

            {/* Hero Main Content */}
            <div className="grid gap-8 lg:grid-cols-[1fr_390px] lg:items-end">
              <div>
                <span className="mb-4 inline-block rounded-full bg-white/20 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                  {project.status || 'Active Project'}
                </span>

                <h1 className="font-display text-[clamp(4.2rem,9.5vw,9.5rem)] font-light leading-[0.84] tracking-[-0.06em]">
                  {project.name}
                </h1>

                <p className="mt-4 flex items-center gap-2 text-sm text-white/80 md:text-base">
                  <MapPin size={16} className="text-[#a9d4b5]" />
                  <span>{project.location}</span>
                  <span className="opacity-50">·</span>
                  <span>{project.projectType}</span>
                </p>
              </div>

              <div className="lg:pb-2">
                <p className="text-sm leading-6 text-white/80 md:text-base">
                  {project.shortDescription}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#site-visit"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#102c1c] shadow-md transition-all hover:bg-[#d8f1dc] hover:scale-[1.02]"
                  >
                    Book Site Visit
                    <ArrowUpRight size={16} />
                  </a>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/25 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/15"
                  >
                    <MessageSquare size={16} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            2. BASIC PROJECT FACTS
        ====================================================== */}
        <section className="border-b border-[#102c1c]/10 bg-[#fffdf8] px-6 py-12 md:px-10 lg:px-14">
          <div className="mx-auto max-w-[1500px]">
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1d6b3e]">
              Project At A Glance
            </p>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { label: 'Project Type', value: project.projectType },
                { label: 'Status', value: project.status },
                { label: 'Total Layout', value: project.totalArea || 'Layout details on request' },
                { label: 'Units', value: project.units || 'Multiple options' },
                { label: 'Pricing', value: project.priceRange || 'Price on request' },
                { label: 'Loan Facility', value: project.loan || 'Assistance on request' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[#102c1c]/8 bg-[#f7f4ed] p-4 md:p-5"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#748078]">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-[#102c1c] md:text-base">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            3. PROJECT OVERVIEW
        ====================================================== */}
        <section className="px-6 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#1d6b3e]">
                About {project.name}
              </p>
              <h2 className="font-display mt-4 text-[clamp(2.4rem,4.5vw,4.8rem)] font-light leading-[0.96] tracking-[-0.04em]">
                Practical planning for lasting living value.
              </h2>
            </div>

            <div>
              <p className="text-base leading-7 text-[#5c6860] md:text-lg">
                {project.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl bg-[#fffdf8] p-4 border border-[#102c1c]/6">
                  <CheckCircle2 size={18} className="mt-0.5 text-[#1d6b3e] flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#102c1c]">Clear Title Documentation</h4>
                    <p className="mt-0.5 text-xs text-[#6e7a72]">Verified layouts with legal transparency.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-[#fffdf8] p-4 border border-[#102c1c]/6">
                  <CheckCircle2 size={18} className="mt-0.5 text-[#1d6b3e] flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#102c1c]">Strategic Location</h4>
                    <p className="mt-0.5 text-xs text-[#6e7a72]">Growing neighbourhood with road connectivity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            4. REAL SITE PHOTOS / GALLERY
        ====================================================== */}
        {gallery.length > 0 && (
          <section className="border-t border-[#102c1c]/8 bg-[#fffdf8] px-6 py-20 md:px-10 md:py-28 lg:px-14">
            <div className="mx-auto max-w-[1500px]">
              <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1d6b3e]">
                    Site Photography
                  </p>
                  <h2 className="font-display mt-2 text-3xl font-light tracking-[-0.04em] md:text-5xl">
                    Views from the development.
                  </h2>
                </div>
                <p className="max-w-md text-sm text-[#5c6860]">
                  Real site visuals showing road accessibility, layout planning, and surrounding greenery.
                </p>
              </div>

              {/* Responsive Gallery Grid */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((image, index) => (
                  <motion.div
                    key={`${image}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: index * 0.06 }}
                    className="group relative aspect-[4/3] overflow-hidden rounded-[22px] bg-[#102c1c]"
                  >
                    <img
                      src={image}
                      alt={`${project.name} site photo ${index + 1}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-wider text-white/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Site View {String(index + 1).padStart(2, '0')}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* =====================================================
            5. BUILD WHAT YOU IMAGINE / 3D CONCEPT VILLA
        ====================================================== */}
        <ConceptVillaSection
          modelUrl={conceptModelUrl}
          rotationY={conceptModelRotation}
          projectName={project.name}
        />

        {/* =====================================================
            6. LOCATION & CONNECTIVITY (If data exists)
        ====================================================== */}
        {hasSurroundingFeatures ? (
          <section className="border-b border-[#102c1c]/10 bg-[#f7f4ed] px-6 py-20 md:px-10 md:py-28 lg:px-14">
            <div className="mx-auto max-w-[1500px]">
              <div className="mb-12 max-w-2xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#1d6b3e]">
                  Neighbourhood & Connectivity
                </p>
                <h2 className="font-display mt-2 text-3xl font-light tracking-[-0.04em] md:text-5xl">
                  Connected to what matters.
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#5c6860]">
                  Essential infrastructure, schools, and healthcare within comfortable driving distance.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { title: 'Schools & Education', data: features.schools },
                  { title: 'Colleges & Universities', data: features.colleges },
                  { title: 'Hospitals & Healthcare', data: features.hospitals },
                  { title: 'Commercial & Transport', data: features.companies },
                ]
                  .filter((item) => item.data && item.data.list?.length)
                  .map((item) => (
                    <div
                      key={item.title}
                      className="overflow-hidden rounded-[22px] border border-[#102c1c]/10 bg-[#fffdf8] shadow-sm"
                    >
                      {item.data.image && (
                        <div className="aspect-[16/9] overflow-hidden bg-[#102c1c]">
                          <img
                            src={item.data.image}
                            alt={item.title}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <h4 className="text-sm font-semibold text-[#102c1c]">
                          {item.title}
                        </h4>
                        <ul className="mt-3 space-y-1.5 text-xs text-[#5c6860]">
                          {item.data.list.map((pt, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#1d6b3e] mt-1.5 flex-shrink-0" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* =====================================================
            7. BOOK SITE VISIT CTA
        ====================================================== */}
        <section
          id="site-visit"
          className="bg-[#102c1c] px-6 py-20 text-white md:px-10 md:py-28 lg:px-14"
        >
          <div className="mx-auto max-w-[1500px]">
            <div className="grid gap-10 rounded-[32px] border border-white/12 bg-[#163a25] p-8 md:p-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <span className="rounded-full bg-white/10 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a9d4b5]">
                  Plan A Visit
                </span>

                <h2 className="font-display mt-5 text-[clamp(2.5rem,5vw,5.2rem)] font-light leading-[0.92] tracking-[-0.05em]">
                  See {project.name} in person.
                </h2>

                <p className="mt-4 max-w-xl text-base leading-7 text-white/70">
                  Walk through the layout, inspect internal roads, and understand plot dimensions with our on-ground team.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={`tel:${contactConfig.phoneRaw}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#102c1c] shadow-lg transition-all hover:bg-[#d8f1dc] hover:scale-[1.02]"
                  >
                    <Phone size={16} />
                    Call {contactConfig.phone}
                  </a>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/25 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/15"
                  >
                    <MessageSquare size={16} />
                    WhatsApp Us
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-6 md:p-8 backdrop-blur-md">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a9d4b5]">
                  Site Visit Highlights
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="mt-0.5 text-[#a9d4b5] flex-shrink-0" />
                    <span>Free on-site walkthrough with an experienced Tulasi representative</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="mt-0.5 text-[#a9d4b5] flex-shrink-0" />
                    <span>Direct access to survey plans, approvals, and plot boundary details</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="mt-0.5 text-[#a9d4b5] flex-shrink-0" />
                    <span>Clear guidance on bank loan eligibility and custom villa planning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetailPage;