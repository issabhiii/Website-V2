import React, { useEffect, useState } from 'react'
import ClickSpark from './components/ClickSpark'
import LiquidEther from './components/LiquidEther';
import './App.css'
import GlassSurface from './components/GlassSurface';
import './components/GlassSurface.css';
import ProfileCard from './components/ProfileCard';
import MagicBento from './components/MagicBento';
import GlassBento from './components/GlassBento';
import ExperienceTimeline from './components/ExperienceTimeline';
import './components/FluidGlass.css';

const CONTACT_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbz6fDFs2rlqcbz2kFElsCAtBDFB7ZZcb8ZUATaQR1jtwbgKax58mal9vlV6bZmsXtcX/exec';

async function sendContactMessage({ name, email, message, website }) {
  // Apps Script web apps 302 the POST; `no-cors` lets the write succeed
  // without the browser blocking on the redirect / missing doGet.
  await fetch(CONTACT_ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      name,
      email,
      message,
      website,
    }),
  });
}



const LINKEDIN_URL = "https://www.linkedin.com/in/abhinav-jain-9881b8296/";
const GITHUB_URL = "https://github.com/issabhiii";
const RESUME_URL = "/Abhinav Jain-Resume.pdf";

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (window.feather) window.feather.replace();
  }, [status]);

  useEffect(() => {
    if (window.AOS) window.AOS.init({ duration: 800, once: true });

    if (window.VANTA) {
      window.VANTA.GLOBE({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x6366f1,
        backgroundColor: 0x111827,
      });
    }

    if (window.feather) window.feather.replace();
  }, []);

  return (
    <div className="relative z-[9999]">
      <ClickSpark
        sparkColor="#fff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <div className="min-h-screen">
          {/* Navigation */}
          <div className="fixed w-full z-50 flex justify-center pt-4">
            <GlassSurface
              width="80%"
              height={72}
              borderRadius={50}
              displace={10}
              distortionScale={250}
              brightness={85}
              opacity={0.1}
              blur={18}
              className="flex items-center px-6 md:px-12 border border-white/30 shadow-[0_0_25px_rgba(255,255,255,0.15)] w-[80%] md:w-[69%]"
              style={{
                boxShadow:
                  "0 0 15px rgba(255,255,255,0.3), 0 0 30px rgba(255,255,255,0.1) inset",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
            >
              <div className="flex justify-between items-center w-full">
                <a
                  href="#hero"
                  className="text-xl md:text-2xl font-bold gradient-text whitespace-nowrap hover:scale-105 transition-transform"
                >
                  Abhinav Jain
                </a>

                <div className="hidden md:flex items-center space-x-5 lg:space-x-8 text-sm lg:text-base">
                  <a href="#experience" className="hover:text-purple-400 transition-colors">
                    Experience
                  </a>
                  <a href="#projects" className="hover:text-purple-400 transition-colors">
                    Projects
                  </a>
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-400 transition-colors"
                  >
                    Resume
                  </a>
                  <a href="#contact" className="hover:text-purple-400 transition-colors">
                    Contact
                  </a>
                </div>
              </div>
            </GlassSurface>
          </div>


     {/* Hero Section */}
<section
  id="hero"
  className="relative min-h-screen overflow-x-hidden px-4 md:px-8"
>
  <div className="absolute inset-0">
  <LiquidEther
    colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
    mouseForce={20}
    cursorSize={100}
    isViscous={false}
    viscous={30}
    iterationsViscous={20}
    iterationsPoisson={20}
    resolution={0.5}
    isBounce={false}
    autoDemo={true}
    autoSpeed={0.5}
    autoIntensity={2.2}
    takeoverDuration={0.25}
    autoResumeDelay={3000}
    autoRampDuration={0.6}
  />
</div>


  <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center gap-6 pt-28 pb-10">
    <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-stretch lg:gap-12">
    <div className="hero-profile flex shrink-0 items-center">
      <ProfileCard
        name="Abhinav Jain"
        title="Software Engineer"
        subtitle="Building AI systems, developer tools & infrastructure"
        handle="abhinav-jain"
        status="LinkedIn"
        contactText="Contact Me"
        avatarUrl="/me.png"
        showUserInfo
        enableTilt
        enableMobileTilt={false}
        behindGlowEnabled
        behindGlowColor="rgba(139, 92, 246, 0.35)"
        innerGradient="none"
        onContactClick={() => window.open(LINKEDIN_URL, '_blank', 'noopener,noreferrer')}
      />
    </div>
    <div id="projects" className="hero-bento relative flex w-full min-w-0 flex-1 items-center">
      <MagicBento
        textAutoHide
        enableStars={false}
        enableSpotlight
        enableBorderGlow
        enableTilt={false}
        enableMagnetism={false}
        clickEffect
        spotlightRadius={170}
        particleCount={8}
        glowColor="139, 92, 246"
        cards={[
          {
            title: 'AgentForge',
            description:
              'Internal LLM-agent orchestration system for turning feature requests into tested, review-ready code.',
            label: 'Experience · Ooredoo Qatar',
            
            stack: 'C# · .NET · Azure · LLM Agents · Static Analysis',
            href: '#experience'
          },
          {
            title: 'Wisconsin Robotics',
            description:
              'Website & Outreach Automation Developer. React/Supabase website infrastructure and automated member/sponsor outreach.',
            label: 'Current',
            stack: 'React · Supabase · Automation',
            href: '#experience'
          },
          {
            title: 'Bhasha',
            description:
              'Built and launched an AI-powered language learning platform and cross-platform Flutter app used by 200+ users.',
            label: 'Founding Engineer',
            stack: 'Flutter · Dart · Supabase',
            href: '#experience'
          },
          {
            title: 'Snap',
            description:
              'Immutable execution history for code. Tracks user and AI-agent changes against exact Git tree states so every run is reproducible and traceable.',
            label: 'Developer Tool',
            stack: 'TypeScript · Git · Node.js',
            href: '#experience'
          },
          {
            title: 'PrivacyGuard',
            description: 'Real-time browser tracking detection and blocking using Chrome network APIs.',
            label: 'Security',
            stack: 'JavaScript · Chrome APIs · DOM',
            href: '#experience'
          },
          {
            title: 'Homelab',
            description:
              'Self-hosted Linux infrastructure with Docker, authenticated telemetry, DNS filtering, remote development, and monitoring.',
            label: 'Infrastructure',
            stack: 'Linux · Docker · Networking · HMAC',
            href: '#experience'
          }
        ]}
      />
      <div className="fluid-glass-overlay">
        <GlassBento
          ior={1.3}
          thickness={3}
          chromaticAberration={0.23}
          anisotropy={0.05}
        />
      </div>
    </div>
    </div>
    <div className="hero-actions flex flex-wrap items-center justify-center gap-3">
      <a
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:border-purple-400/70 hover:bg-white/10"
      >
        View Resume
      </a>
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:border-purple-400/70 hover:bg-white/10"
      >
        GitHub
      </a>
      <a
        href="#contact"
        className="rounded-full border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:border-purple-400/70 hover:bg-white/10"
      >
        Contact Me
      </a>
    </div>
    <div className="hero-skills w-full text-center">
      <p className="text-sm font-medium tracking-wide text-white/85 md:text-[0.95rem]">
        Python · TypeScript · C# · Dart · React · .NET · Flutter · Node.js · Docker · Linux · Azure · PostgreSQL
      </p>
      <p className="mt-2 text-xs tracking-wide text-white/55 md:text-sm">
        LLM Agents · Tool Calling · Model Routing · Static Analysis · Git · REST APIs · Networking
      </p>
    </div>
  </div>
</section>

      <ExperienceTimeline />

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-12 py-16 space-y-8 md:space-y-0 md:space-x-12 relative overflow-hidden bg-[#111827]">
        
        {/* Left: Spline Animation (Scaled Down) */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="relative w-full" style={{transform: 'scale(1)', transformOrigin: 'center'}}>
            <iframe 
              src="https://my.spline.design/particleaibrain-F8MDOwDO24zpIUGj0AaI4vny/"
              frameBorder="0"
              loading="lazy"
              className="w-full aspect-[4/3] md:aspect-[16/9]"
              style={{background: 'transparent', pointerEvents: 'auto'}}>
            </iframe>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 w-full md:w-1/2 shadow-2xl" data-aos="zoom-in" data-aos-duration="800">
          <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left text-white mb-2">Get In Touch</h1>
          <p className="text-center md:text-left text-gray-300 mb-10">We'd love to hear from you</p>

          <form
            id="contactForm"
            className="space-y-6 relative"
            onSubmit={async (e) => {
              e.preventDefault();

              const extra = [
                phone.trim() && `Phone: ${phone.trim()}`,
                company.trim() && `Company: ${company.trim()}`
              ]
                .filter(Boolean)
                .join('\n');
              const fullMessage = extra ? `${message.trim()}\n\n${extra}` : message.trim();

              try {
                setStatus('sending');
                await sendContactMessage({
                  name: name.trim(),
                  email: email.trim(),
                  message: fullMessage,
                  website
                });
                setStatus('success');
                setName('');
                setEmail('');
                setPhone('');
                setCompany('');
                setMessage('');
                setWebsite('');
              } catch (error) {
                console.error(error);
                setStatus('error');
              }
            }}
          >
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-9999px'
              }}
            />

            <div className="relative">
              <input
                type="text"
                id="name"
                required
                autoComplete="off"
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="peer w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <label htmlFor="name" className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-purple-400 peer-focus:text-sm peer-[&:not(:placeholder-shown)]:top-[-10px] peer-[&:not(:placeholder-shown)]:text-purple-400 peer-[&:not(:placeholder-shown)]:text-sm">
                Your Name <span className="text-red-400">*</span>
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                required
                autoComplete="off"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <label htmlFor="email" className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-purple-400 peer-focus:text-sm peer-[&:not(:placeholder-shown)]:top-[-10px] peer-[&:not(:placeholder-shown)]:text-purple-400 peer-[&:not(:placeholder-shown)]:text-sm">
                Email Address <span className="text-red-400">*</span>
              </label>
            </div>

            <div className="relative">
              <input
                type="tel"
                id="phone"
                autoComplete="off"
                placeholder=" "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="peer w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <label htmlFor="phone" className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-purple-400 peer-focus:text-sm peer-[&:not(:placeholder-shown)]:top-[-10px] peer-[&:not(:placeholder-shown)]:text-purple-400 peer-[&:not(:placeholder-shown)]:text-sm">
                Phone Number (Optional)
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                id="company"
                autoComplete="off"
                placeholder=" "
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="peer w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <label htmlFor="company" className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-purple-400 peer-focus:text-sm peer-[&:not(:placeholder-shown)]:top-[-10px] peer-[&:not(:placeholder-shown)]:text-purple-400 peer-[&:not(:placeholder-shown)]:text-sm">
                Company Name (Optional)
              </label>
            </div>

            <div className="relative">
              <textarea
                id="message"
                rows="4"
                required
                placeholder=" "
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="peer w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <label htmlFor="message" className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-purple-400 peer-focus:text-sm peer-[&:not(:placeholder-shown)]:top-[-10px] peer-[&:not(:placeholder-shown)]:text-purple-400 peer-[&:not(:placeholder-shown)]:text-sm">
                Message <span className="text-red-400">*</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-semibold py-3 rounded-full transition-all duration-300 flex items-center justify-center"
            >
              <i data-feather="send" className="w-5 h-5 mr-2"></i>
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
          </form>

          {status === 'success' ? (
            <div className="mt-8 text-center text-green-400">
              <i data-feather="check-circle" className="w-8 h-8 mx-auto mb-2"></i>
              <p>Thank you! Your message has been sent successfully.</p>
            </div>
          ) : null}
          {status === 'error' ? (
            <p className="mt-6 text-center text-red-400">Something went wrong. Please try again.</p>
          ) : null}
        </div>
      </section>
      

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://github.com/issabhiii" target="_blank" className="text-gray-400 hover:text-purple-400 transition-colors">
              <i data-feather="github" className="w-6 h-6"></i>
            </a>
            <a href="https://www.linkedin.com/in/abhinav-jain-9881b8296/" target="_blank" className="text-gray-400 hover:text-purple-400 transition-colors">
              <i data-feather="linkedin" className="w-6 h-6"></i>
            </a>
            <a href="mailto:abhinav.jain.0461@gmail.com" className="text-gray-400 hover:text-purple-400 transition-colors">
              <i data-feather="mail" className="w-6 h-6"></i>
            </a>
          </div>
          <p className="text-gray-400">&copy; 2024 Abhinav Jain. All rights reserved.</p>
        </div>
      </footer>
      </div>
    </ClickSpark>
    </div>
  )
}

export default App
