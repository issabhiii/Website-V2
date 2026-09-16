import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import DotGrid from './DotGrid';
import './ExperienceTimeline.css';

const EXPERIENCES = [
  {
    id: 'wisconsin',
    date: 'Sep 2026 — Present',
    org: 'Wisconsin Robotics',
    role: 'Website & Outreach Automation Developer',
    blurb: 'Building the next public-facing Wisconsin Robotics website.',
    chips: ['React', 'Three.js', 'Framer Motion'],
    kicker: 'Current',
    headline: 'Wisconsin Robotics',
    logo: '/experiencecards/WRlogo.png',
    logoHref: 'https://wisconsinrobotics-website.vercel.app/',
    subhead: 'Next public website',
    metrics: [
      { value: 'React 18', label: 'Vite 5' },
      { value: 'Three.js', label: 'visuals' },
      { value: 'Motion', label: 'framer' }
    ],
    surfaces: [
      {
        title: 'Website',
        note: 'In development',
        image: '/experiencecards/wisconsinroboticsheropage.png',
        href: 'https://wisconsinrobotics-website.vercel.app/',
        featured: true,
        imageOnly: true
      }
    ],
    sections: [
      {
        title: 'Wisconsin Robotics Website',
        subtitle: 'React 18 + Vite 5 · Three.js · Framer Motion',
        bullets: [
          'Building the next website for Wisconsin Robotics, designed to serve as the organization’s primary public-facing platform.',
          'Currently in active development and hosted on my personal Vercel account, with a full public launch planned for Fall 2026.',
          'Built with React and Vite, with Three.js and Framer Motion used for interactive visuals, motion, and a more polished browsing experience.',
          'Designed to showcase the team’s projects, subteams, sponsors, and organization to prospective members and external partners.'
        ]
      }
    ],
    stack: ['React 18', 'Vite 5', 'Three.js', 'Framer Motion'],
    links: [{ href: 'https://wisconsinrobotics-website.vercel.app/', label: 'Visit Site →' }]
  },
  {
    id: 'agentforge',
    date: 'Summer 2026',
    org: 'AgentForge',
    role: 'Software Engineering Intern — Ooredoo Qatar',
    blurb: 'Internal AI workflow engine that turns feature requests into tested, review-ready code.',
    chips: ['60+ steps', '500+ files', '−60% context', '−35% cost'],
    kicker: 'Ooredoo Qatar · Software Engineering Internship',
    headline: 'AgentForge',
    product: 'AgentForge',
    subhead: 'Summer 2026',
    intro:
      'Built AgentForge, an internal AI development workflow engine at Ooredoo Qatar designed to turn feature requirements into tested, review-ready code proposals.',
    metrics: [
      { value: '60+', label: 'steps' },
      { value: '500+', label: 'files' },
      { value: '↓60%', label: 'context' },
      { value: '↓35%', label: 'AI cost' }
    ],
    surfaces: [
      {
        title: 'Ooredoo Qatar',
        image: '/experiencecards/ooredoo.png',
        featured: true,
        imageOnly: true,
        fit: 'contain'
      }
    ],
    sections: [
      {
        title: 'What I built',
        bullets: [
          'Built a configurable LLM-agent orchestration system that decomposes feature requests into multi-step development workflows; validated across 2 workflows and 60+ execution steps.',
          'Indexed 500+ files, symbols, dependencies, and tests with a static-analysis pipeline that ranked relevant repository context, reducing irrelevant context sent to models by up to 60%.',
          'Implemented per-step routing across Copilot CLI, locally hosted models, and deterministic tools, reducing AI execution costs by 35%+ while allowing models, prompts, tools, and settings to be configured independently.',
          'Added automated testing, security scanning, requirement validation, quality gates, and bounded retry loops, plus structured telemetry for prompts, costs, retries, failures, and step-level recovery.'
        ]
      }
    ],
    stackLabel: 'Technologies',
    stack: ['C#', '.NET', 'Git', 'LLMs', 'Static Analysis', 'GitHub Copilot', 'Qwen']
  },
  {
    id: 'bhasha',
    date: 'May 2025 — Sep 2025',
    org: 'Bhasha',
    role: 'Founding Engineer',
    blurb: 'AI-powered language learning platform used by 200+ users.',
    chips: ['200+ users', 'Flutter', 'Supabase'],
    kicker: 'Founding Engineer',
    headline: 'Bhasha',
    subhead: 'AI-powered language learning',
    metrics: [
      { value: '200+', label: 'users' },
      { value: 'Flutter', label: 'app' },
      { value: 'Offline', label: 'Isar' }
    ],
    surfaces: [
      { title: 'Lessons', note: 'Modules' },
      { title: 'XP', note: 'Progression' },
      { title: 'Quizzes', note: 'Engines' },
      { title: 'Analytics', note: 'Realtime' }
    ],
    sections: [
      {
        title: 'What I built',
        body: 'Modules, XP, offline-first Isar caching, and quiz engines on Supabase across web and mobile.'
      }
    ],
    stack: ['Flutter', 'Dart', 'Supabase', 'Isar'],
    links: [{ href: 'https://www.learnwithbhasha.com', label: 'Visit Bhasha →' }]
  },
  {
    id: 'snap',
    org: 'Snap',
    role: 'Immutable execution history for code',
    blurb: 'Git-backed provenance across user edits, agent changes, and runs.',
    chips: ['TypeScript', 'Git', 'Node.js'],
    kicker: 'Developer Tool',
    headline: 'Snap',
    subhead: 'Execution provenance for code',
    metrics: [
      { value: 'Git', label: 'tree-state' },
      { value: 'Local', label: 'no telemetry' },
      { value: 'Diff', label: 'viewer' }
    ],
    surfaces: [
      { title: 'Diff viewer', note: 'Unified diffs' },
      { title: 'Snapshots', note: 'Deduped episodes' }
    ],
    flows: [
      {
        title: 'Snapshot lifecycle',
        steps: ['Edit / agent / run', 'Tree hash', 'Dedup', 'Episode', 'Diff viewer']
      }
    ],
    sections: [
      {
        title: 'What I built',
        body: 'Deterministic snapshot dedup for user edits, agent changes, and stable runs, with a local unified-diff dashboard.'
      }
    ],
    stack: ['TypeScript', 'Git', 'Node.js']
  },
  {
    id: 'privacyguard',
    org: 'PrivacyGuard',
    role: 'Real-time tracker inspection + blocking',
    blurb: 'Classifies first- and third-party tracking from Chrome network APIs.',
    chips: ['JavaScript', 'Chrome APIs'],
    kicker: 'Browser Security',
    headline: 'PrivacyGuard',
    subhead: 'Tracker inspection and blocking',
    metrics: [
      { value: 'Live', label: 'headers' },
      { value: 'Block', label: 'cookies' },
      { value: 'Log', label: 'domains' }
    ],
    surfaces: [
      { title: 'Analytics', note: 'Blocked domains' },
      { title: 'Extension', note: 'Live inspection' }
    ],
    flows: [
      {
        title: 'Blocking flow',
        steps: ['Request', 'Classify', 'First vs third party', 'Block', 'Analytics']
      }
    ],
    sections: [
      {
        title: 'What I built',
        body: 'Inspects headers and cookie domains in real time, then intercepts tracking requests before they run.'
      }
    ],
    stack: ['JavaScript', 'Chrome APIs', 'DOM']
  },
  {
    id: 'homelab',
    org: 'Homelab / Telemetry',
    role: 'Self-hosted Linux environment + telemetry',
    blurb: 'Docker, authenticated metrics, DNS filtering, and remote development.',
    chips: ['Linux', 'Docker', 'HMAC', 'Networking'],
    kicker: 'Infrastructure',
    headline: 'Homelab / Telemetry',
    subhead: 'Self-hosted infrastructure & telemetry',
    metrics: [
      { value: 'HMAC', label: 'auth' },
      { value: 'Docker', label: 'services' },
      { value: 'DNS', label: 'filtering' }
    ],
    surfaces: [
      { title: 'Dashboard', note: 'Realtime telemetry' },
      { title: 'Immich / DNS', note: 'Self-hosted services' }
    ],
    flows: [
      {
        title: 'Telemetry path',
        steps: ['Host metrics', 'HMAC pipeline', 'Ingest', 'Dashboard']
      }
    ],
    sections: [
      {
        title: '7760 architecture',
        body: 'Linux homelab with HMAC telemetry, DNS filtering, Immich, and a realtime browser dashboard.'
      }
    ],
    stack: ['Linux', 'Docker', 'HMAC', 'Networking']
  }
];

function FlowDiagram({ steps }) {
  return (
    <p className="exp-flow-line">
      {steps.map((step, index) => (
        <span key={step}>
          {step}
          {index < steps.length - 1 ? <span className="exp-flow-line__arrow"> → </span> : null}
        </span>
      ))}
    </p>
  );
}

function getLayoutMode() {
  if (typeof window === 'undefined') return 'desktop';
  if (window.matchMedia('(max-width: 767px)').matches) return 'phone';
  if (window.matchMedia('(max-width: 1099px)').matches) return 'tablet';
  return 'desktop';
}

function IslandBody({ job }) {
  const title = job.logo ? (
    job.logoHref ? (
      <a
        className="exp-island__logo-link"
        href={job.logoHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="exp-island__logo" src={job.logo} alt={job.headline} />
      </a>
    ) : (
      <img className="exp-island__logo" src={job.logo} alt={job.headline} />
    )
  ) : job.product ? (
    <>
      <h3 className="exp-island__title exp-island__title--role">{job.kicker}</h3>
      {job.subhead ? <p className="exp-island__sub">{job.subhead}</p> : null}
      <h4 className="exp-island__product">{job.product}</h4>
    </>
  ) : (
    <h3 className="exp-island__title">{job.headline}</h3>
  );

  return (
    <>
      {job.product ? null : <p className="exp-island__kicker">{job.kicker}</p>}
      {title}
      {!job.product && job.subhead ? <p className="exp-island__sub">{job.subhead}</p> : null}
      {job.intro ? <p className="exp-island__intro">{job.intro}</p> : null}

      {job.metrics?.length ? (
        <div className={`exp-metrics exp-metrics--chips${job.metrics.length > 3 ? ' exp-metrics--four' : ''}`}>
          {job.metrics.map((metric) => (
            <div key={metric.label} className="exp-metric">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      ) : null}

      {job.surfaces ? (
        <div
          className={`exp-surfaces${job.surfaces.length === 1 ? ' exp-surfaces--one' : ''}${
            job.surfaces.length > 2 ? ' exp-surfaces--four' : ''
          }`}
        >
          {job.surfaces.map((surface) => {
            const media = surface.image ? (
              <img
                className={`exp-surface__image${surface.fit === 'contain' ? ' exp-surface__image--contain' : ''}`}
                src={surface.image}
                alt={surface.title}
              />
            ) : (
              <div className="exp-surface__screen">
                <span className="exp-surface__bar" />
                <span className="exp-surface__bar exp-surface__bar--short" />
                <span className="exp-surface__chip" />
              </div>
            );

            const body = (
              <>
                {media}
                {surface.title && !surface.imageOnly ? <p>{surface.title}</p> : null}
                {surface.note && !surface.imageOnly ? <span>{surface.note}</span> : null}
              </>
            );

            return surface.href ? (
              <a
                key={surface.title}
                className={`exp-surface${surface.featured ? ' exp-surface--featured' : ''}`}
                href={surface.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {body}
              </a>
            ) : (
              <div
                key={surface.title}
                className={`exp-surface${surface.featured ? ' exp-surface--featured' : ''}`}
              >
                {body}
              </div>
            );
          })}
        </div>
      ) : null}

      {job.techLine ? <p className="exp-tech-line">{job.techLine}</p> : null}

      {job.flows?.map((flow) => (
        <div key={flow.title} className="exp-island__block">
          <p className="exp-island__label">{flow.title}</p>
          <FlowDiagram steps={flow.steps} />
        </div>
      ))}

      {job.sections.map((section) => (
        <div key={section.title} className="exp-island__block">
          {section.bullets?.length || section.subtitle ? (
            section.title === 'What I built' ? (
              <p className="exp-island__label">{section.title}</p>
            ) : (
              <h4 className="exp-island__heading">{section.title}</h4>
            )
          ) : (
            <p className="exp-island__label">{section.title}</p>
          )}
          {section.subtitle ? <p className="exp-island__subtitle">{section.subtitle}</p> : null}
          {section.bullets?.length ? (
            <ul className="exp-island__bullets">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
          {section.body ? <p className="exp-island__copy">{section.body}</p> : null}
        </div>
      ))}

      {job.stack?.length ? (
        <div className="exp-island__block">
          {job.stackLabel ? <p className="exp-island__label">{job.stackLabel}</p> : null}
          <div className="exp-island__stack">
            {job.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      ) : null}

      {job.links?.length ? (
        <div className="exp-island__actions">
          {job.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      ) : null}

      {job.footnote ? <p className="exp-island__footnote">{job.footnote}</p> : null}
    </>
  );
}

export default function ExperienceTimeline() {
  const reduceMotion = useReducedMotion();
  const nodeRefs = useRef([]);
  const slotRef = useRef(null);
  const sectionRef = useRef(null);
  const autoIdRef = useRef(null);
  const dismissedIdRef = useRef(null);
  const pinnedIdRef = useRef(null);
  const layoutModeRef = useRef(getLayoutMode());
  const pulseTimerRef = useRef(0);
  const [layoutMode, setLayoutMode] = useState(getLayoutMode);
  const [progress, setProgress] = useState(0);
  const [activated, setActivated] = useState(() => EXPERIENCES.map(() => false));
  const [selectedId, setSelectedId] = useState(null);
  const [pulseId, setPulseId] = useState(null);
  const [slotBox, setSlotBox] = useState({ left: 0, width: 0 });

  layoutModeRef.current = layoutMode;

  const selected = EXPERIENCES.find((job) => job.id === selectedId) ?? null;
  const currentIndex = activated.lastIndexOf(true);
  const isDesktop = layoutMode === 'desktop';
  const isPhone = layoutMode === 'phone';
  const isTablet = layoutMode === 'tablet';

  const closeIsland = useCallback(() => {
    dismissedIdRef.current = pinnedIdRef.current || autoIdRef.current;
    pinnedIdRef.current = null;
    setSelectedId(null);
    setPulseId(null);
  }, []);

  const openDetail = useCallback(
    (id) => {
      window.clearTimeout(pulseTimerRef.current);
      setPulseId(id);
      const apply = () => {
        pinnedIdRef.current = id;
        dismissedIdRef.current = null;
        setSelectedId(id);
      };
      if (reduceMotion || layoutModeRef.current === 'desktop') {
        apply();
        return;
      }
      pulseTimerRef.current = window.setTimeout(apply, 180);
    },
    [reduceMotion]
  );

  const toggleDetail = useCallback(
    (id) => {
      if (selectedId === id) {
        closeIsland();
        return;
      }
      openDetail(id);
    },
    [closeIsland, openDetail, selectedId]
  );

  useEffect(() => {
    const sync = () => setLayoutMode(getLayoutMode());
    const phone = window.matchMedia('(max-width: 767px)');
    const tablet = window.matchMedia('(max-width: 1099px)');
    phone.addEventListener('change', sync);
    tablet.addEventListener('change', sync);
    return () => {
      phone.removeEventListener('change', sync);
      tablet.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (isDesktop) return;
    autoIdRef.current = null;
    pinnedIdRef.current = null;
    dismissedIdRef.current = null;
    setSelectedId(null);
    setPulseId(null);
  }, [isDesktop]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') closeIsland();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeIsland]);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const nodes = nodeRefs.current.filter(Boolean);
      if (nodes.length < 2) return;

      const focusY = window.innerHeight * 0.45;
      const lastLine = window.innerHeight * 0.62;
      const centers = nodes.map((node) => {
        const rect = node.getBoundingClientRect();
        return rect.top + rect.height / 2;
      });
      const firstCenter = centers[0];
      const lastCenter = centers[centers.length - 1];
      const lastIdx = centers.length - 1;
      const span = lastCenter - firstCenter;
      if (span <= 0) return;

      const section = sectionRef.current?.getBoundingClientRect();
      const leftSection =
        !section ||
        section.bottom < window.innerHeight * 0.28 ||
        section.top > window.innerHeight * 0.78;

      if (leftSection || firstCenter > window.innerHeight * 0.78) {
        setProgress(leftSection ? 1 : 0);
        setActivated(nodes.map(() => false));
        if (layoutModeRef.current === 'desktop' && (leftSection || !pinnedIdRef.current)) {
          pinnedIdRef.current = leftSection ? null : pinnedIdRef.current;
          autoIdRef.current = null;
          setSelectedId(null);
        }
        return;
      }

      let closestIdx = 0;
      let closestDist = Infinity;
      centers.forEach((center, index) => {
        const dist = Math.abs(center - focusY);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = index;
        }
      });

      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;
      if (lastCenter <= lastLine || atBottom) closestIdx = lastIdx;

      setProgress(Math.min(1, Math.max(0, (focusY - firstCenter) / span)));
      setActivated(centers.map((_, index) => index <= closestIdx));

      if (layoutModeRef.current !== 'desktop') return;

      const nextId = EXPERIENCES[closestIdx].id;
      if (nextId !== autoIdRef.current) {
        autoIdRef.current = nextId;
        dismissedIdRef.current = null;
        pinnedIdRef.current = null;
      }
      const shownId = pinnedIdRef.current || nextId;
      setSelectedId(dismissedIdRef.current === shownId ? null : shownId);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => () => window.clearTimeout(pulseTimerRef.current), []);

  useEffect(() => {
    if (!isDesktop) return undefined;
    const syncSlot = () => {
      const slot = slotRef.current;
      if (!slot) return;
      const rect = slot.getBoundingClientRect();
      setSlotBox({ left: rect.left, width: rect.width });
    };
    syncSlot();
    window.addEventListener('resize', syncSlot);
    return () => window.removeEventListener('resize', syncSlot);
  }, [isDesktop]);

  useEffect(() => {
    if (!(isTablet && selected)) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isTablet, selected]);

  return (
    <section id="experience" className="exp-section" ref={sectionRef}>
      <div className="exp-bg" aria-hidden>
        <DotGrid
          dotSize={3}
          gap={22}
          baseColor="#4c1d95"
          activeColor="#a78bfa"
          proximity={120}
          shockRadius={369}
          shockStrength={6.9}
          resistance={469}
          returnDuration={1.69}
        />
      </div>

      <div className="exp-shell">
        <div className={`exp-layout${selected && isDesktop ? ' exp-layout--open' : ''}`} data-mode={layoutMode}>
          <div className="exp-left">
            <h2 className="exp-heading">Experience</h2>
            <div className="exp-list">
            <div className="exp-rail" aria-hidden>
              <div className="exp-rail__idle" />
              <div
                className="exp-rail__fill"
                style={{
                  transform: `scaleY(${progress})`,
                  transition: reduceMotion ? 'none' : 'transform 120ms linear'
                }}
              />
            </div>

            {EXPERIENCES.map((job, index) => {
              const isOn = activated[index];
              const isCurrent = index === currentIndex && isOn;
              const isSelected = selectedId === job.id;
              const nodeLive = isOn || isSelected || pulseId === job.id;

              return (
                <div key={job.id} className="exp-item">
                  <span
                    ref={(el) => {
                      nodeRefs.current[index] = el;
                    }}
                    className={`exp-node${nodeLive ? ' is-on' : ''}${isCurrent ? ' is-current' : ''}${
                      pulseId === job.id ? ' is-tapped' : ''
                    }`}
                  />

                  <motion.article
                    className={`exp-card${isSelected ? ' is-selected' : ''}${isOn ? ' is-revealed' : ''}`}
                    initial={false}
                    animate={
                      reduceMotion
                        ? { opacity: 1, y: 0 }
                        : {
                            opacity: isOn || isSelected ? 1 : isDesktop ? 0.28 : 0.62,
                            y: isOn || isSelected ? 0 : 8
                          }
                    }
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="exp-card__date">{job.date || job.kicker}</span>
                    <strong className="exp-card__org">{job.org}</strong>
                    <span className="exp-card__role">{job.role}</span>
                    <p className="exp-card__blurb">{job.blurb}</p>
                    <div className="exp-card__chips">
                      {job.chips.map((chip) => (
                        <span key={chip}>{chip}</span>
                      ))}
                    </div>
                    {isDesktop && isSelected ? <span className="exp-card__cta">Now showing</span> : null}
                    {!isDesktop ? (
                      <button
                        type="button"
                        className="exp-card__more"
                        aria-expanded={isSelected}
                        onClick={() => toggleDetail(job.id)}
                      >
                        {isSelected ? 'Show less' : 'Learn more'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="exp-card__hit"
                        aria-pressed={isSelected}
                        aria-controls="exp-island"
                        onClick={() => openDetail(job.id)}
                      >
                        <span className="sr-only">Show {job.headline} details</span>
                      </button>
                    )}
                  </motion.article>

                  {isPhone ? (
                    <AnimatePresence initial={false}>
                      {isSelected ? (
                        <motion.div
                          className="exp-island exp-island--inline"
                          initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="exp-island__inner">
                            <IslandBody job={job} />
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  ) : null}
                </div>
              );
            })}
            </div>
          </div>

          {isDesktop ? <div ref={slotRef} className="exp-island-slot" aria-hidden /> : null}
        </div>

        {isDesktop && typeof document !== 'undefined' && slotBox.width
          ? createPortal(
              <div className="exp-island-fixed" style={{ left: slotBox.left, width: slotBox.width }}>
                <AnimatePresence mode="wait">
                  {selected ? (
                    <motion.aside
                      key={selected.id}
                      id="exp-island"
                      className="exp-island"
                      initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.99 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <button
                        type="button"
                        className="exp-island__close"
                        onClick={(event) => {
                          event.stopPropagation();
                          closeIsland();
                        }}
                        aria-label="Close experience"
                      >
                        <X size={18} />
                      </button>
                      <IslandBody job={selected} />
                    </motion.aside>
                  ) : null}
                </AnimatePresence>
              </div>,
              document.body
            )
          : null}

        {isTablet && typeof document !== 'undefined'
          ? createPortal(
              <AnimatePresence>
                {selected ? (
                  <motion.div
                    className="exp-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeIsland}
                  >
                    <motion.aside
                      className="exp-island exp-island--overlay"
                      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <button
                        type="button"
                        className="exp-island__close"
                        onClick={closeIsland}
                        aria-label="Close experience"
                      >
                        <X size={18} />
                      </button>
                      <IslandBody job={selected} />
                    </motion.aside>
                  </motion.div>
                ) : null}
              </AnimatePresence>,
              document.body
            )
          : null}
      </div>
    </section>
  );
}
