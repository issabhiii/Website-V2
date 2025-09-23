import React, { useEffect, useState, useRef } from 'react'
import DotGrid from './components/DotGrid'
import ShinyText from './components/ShinyText'
import GradientText from './components/GradientText'
import DecryptedText from './components/DecryptedText'
import ClickSpark from './components/ClickSpark'
import LiquidEther from './components/LiquidEther';
import LetterGlitch from './components/LetterGlitch';
import './App.css'
import GlassSurface from './components/GlassSurface';
import './components/GlassSurface.css';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://yaijmwhijxpjyifvsvlc.supabase.co", // your URL
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhaWptd2hpanhwanlpZnZzdmxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwOTA0MDUsImV4cCI6MjA3MzY2NjQwNX0.TI8gQUpK6vaXdWDri3P63pNJ286gGgQcqI5Rblfkoos" // anon key
);



function App() {
  const [nameText, setNameText] = useState("Hello, I'm Abhinav Jain");
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
// Inside your App component, add these states at the top:
const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);

// Add this useEffect so feather icons refresh when success overlay shows
useEffect(() => {
  if (window.feather) window.feather.replace();
}, [success]);

  const handleNameClick = () => {
    setNameText(
      nameText === "Hello, I'm Abhinav Jain"
        ? "you can call me Abhi"
        : "Hello, I'm Abhinav Jain"
    );
  };

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

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
          {/* Backdrop for mobile */}
          {isOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* Navigation */}
          <div className="fixed w-full z-50 flex justify-center pt-4">
            <GlassSurface
              ref={navRef}
              width="80%"
              height={isOpen ? 240 : 72}
              borderRadius={50}
              displace={10}
              distortionScale={250}
              brightness={85}
              opacity={0.1}
              blur={18}
              className="flex flex-col px-6 md:px-12 border border-white/30 shadow-[0_0_25px_rgba(255,255,255,0.15)] w-[80%] md:w-[69%] transition-all duration-300"
              style={{
                boxShadow:
                  "0 0 15px rgba(255,255,255,0.3), 0 0 30px rgba(255,255,255,0.1) inset",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
            >
              {/* Top Row */}
              <div className="flex justify-between items-center w-full">
                <a
                  href="https://www.linkedin.com/in/abhinav-jain-9881b8296/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl md:text-2xl font-bold gradient-text whitespace-nowrap hover:scale-105 transition-transform"
                >
                  Abhinav Jain | Dec 2027
                </a>

                {/* Desktop Links + Mobile Button */}
                <div className="flex items-center space-x-6">
                  <div className="hidden md:flex space-x-10">
                    <a href="#hero" className="hover:text-purple-400 transition-colors">
                      Home
                    </a>
                    <a href="#about" className="hover:text-purple-400 transition-colors">
                      About
                    </a>
                    <a href="#experience" className="hover:text-purple-400 transition-colors">
                      Experience
                    </a>
                    <a href="#contact" className="hover:text-purple-400 transition-colors">
                      Contact
                    </a>
                  </div>

                  {/* Mobile Hamburger / Close Icon */}
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-gray-100 pointer-events-auto focus:outline-none"
                  >
                    {isOpen ? (
                      <i data-feather="x" className="w-6 h-6"></i>
                    ) : (
                      <i data-feather="menu" className="w-6 h-6"></i>
                    )}
                  </button>
                </div>
              </div>

              {/* Mobile Menu */}
              <div
                className={`md:hidden flex flex-col items-start space-y-4 mt-4 overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4 pointer-events-none"
                }`}
              >
                <a href="#hero" onClick={() => setIsOpen(false)}>Home</a>
                <a href="#about" onClick={() => setIsOpen(false)}>About</a>
                <a href="#experience" onClick={() => setIsOpen(false)}>Experience</a>
                <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
              </div>
            </GlassSurface>
          </div>


     {/* Hero Section */}
<section
  id="hero"
  className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6"
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


  {/* Hero Content Container */}
  <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
    {/* Profile Image */}
    <div className="hero-img-wrapper mb-8">
      <img src="/me.png" alt="Abhinav Jain"
        className="hero-img w-40 h-40 md:w-60 md:h-60 rounded-full border-4 border-white/20 shadow-lg hover:scale-105 transition-transform"
      />
    </div>

    {/* Text + Buttons */}
    <h1 className="text-3xl md:text-5xl font-bold mb-4">
      <span
        onClick={handleNameClick}
        className="cursor-pointer transition-all duration-300 hover:scale-105 inline-block"
      >
        <GradientText
          colors={["#ffffff", "#8b5cf6", "#ffffff", "#6366f1", "#ffffff"]}
          animationSpeed={8}
          showBorder={false}
          className="text-3xl md:text-5xl font-bold"
        >
          {nameText}
        </GradientText>
      </span>
    </h1>

    <p className="text-xl md:text-2xl mb-3 text-gray-300">
      Computer Science Major & Full Stack Developer
    </p>
    <p className="text-lg md:text-xl mb-8 text-gray-400">
      Building innovative solutions with modern technologies
    </p>

    {/* Action Buttons */}
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
      <a
        href="#about"
        className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
      >
        <ShinyText text="Explore My Work" speed={5} />
      </a>
      <a
        href="mailto:abhinav.jain.0461@gmail.com"
        className="px-8 py-3 border border-purple-600 hover:bg-purple-600 rounded-lg transition-colors"
      >
        <ShinyText text="Get In Touch" speed={5} />
      </a>
    </div>

    {/* Social Buttons */}
   
<div className="flex justify-center space-x-6 mt-4">
  <a
    href="https://www.linkedin.com/in/abhinav-jain-9881b8296/"
    target="_blank"
    className="p-3 border-2 border-purple-400 rounded-full hover:bg-purple-600 hover:border-purple-600 transition-all"
  >
    <i data-feather="linkedin" className="w-5 h-5 text-purple-400 hover:text-white"></i>
  </a>

  <a
    href="https://github.com/issabhiii"
    target="_blank"
    className="p-3 border-2 border-purple-400 rounded-full hover:bg-purple-600 hover:border-purple-600 transition-all"
  >
    <i data-feather="github" className="w-5 h-5 text-purple-400 hover:text-white"></i>
  </a>

  {/* Email Copy Button */}
  {/* Email Button */}
<button
  onClick={(e) => {
    // 1. Copy email to clipboard
    const email = "abhinav.jain.0461@gmail.com";
    navigator.clipboard.writeText(email);

    // 2. Open default email app
    window.location.href = `mailto:${email}`;




  }}
  className="p-3 border-2 border-purple-400 rounded-full hover:bg-purple-600 hover:border-purple-600 transition-all"
>
  <i data-feather="mail" className="w-5 h-5 text-purple-400 hover:text-white"></i>
</button>
</div>



    {/* Resume Button */}
<div className="mt-6 flex justify-center">
  <a
    href="/Abhinav Jain-Resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="px-8 py-3 border-2 border-purple-400 text-purple-400 font-semibold text-center rounded-full hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all"
  >
    <ShinyText text="View Resume" speed={5} />
  </a>
</div>

  </div>
</section>

{/* About Section */}
<section id="about" className="relative z10 py-20 bg-gray-800">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">
      <DecryptedText 
        text="Skills & Expertise" 
        animateOn="view"
        speed={80}
        maxIterations={15}
        revealDirection="center"
        className="text-4xl font-bold text-center text-white"
        encryptedClassName="text-4xl font-bold text-center text-purple-300"
      />
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      {/* Tile 1 */}
      <div className="relative skill-tile glass-effect p-8 rounded-xl transition-all duration-300 overflow-hidden" data-aos="fade-up" data-aos-delay="100">
        {/* Background should not expand container */}
        <div className="absolute inset-0 z-0">
          <LetterGlitch
            glitchSpeed={50}
            className="w-full h-full opacity-30"
            centerVignette={true}
            outerVignette={false}
            smooth={true}
          />
        </div>

        {/* Foreground */}
        <div className="relative z-10">
          <div className="text-center mb-6">
            <i data-feather="layout" className="w-12 h-12 text-purple-400 mx-auto"></i>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-center">
            <DecryptedText 
              text="Frontend Development" 
              animateOn="view"
              speed={60}
              maxIterations={12}
              revealDirection="start"
              className="text-2xl font-bold text-center text-white"
              encryptedClassName="text-2xl font-bold text-center text-purple-200"
            />
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center"><i data-feather="check" className="w-4 h-4 text-green-400 mr-2"></i> React.js & Next.js</li>
            <li className="flex items-center"><i data-feather="check" className="w-4 h-4 text-green-400 mr-2"></i> Flutter SDK</li>
            <li className="flex items-center"><i data-feather="check" className="w-4 h-4 text-green-400 mr-2"></i> Tailwind CSS & SASS</li>
            <li className="flex items-center"><i data-feather="check" className="w-4 h-4 text-green-400 mr-2"></i> TypeScript</li>
            <li className="flex items-center"><i data-feather="check" className="w-4 h-4 text-green-400 mr-2"></i> UI/UX Design</li>
          </ul>
        </div>
      </div>

      {/* Repeat same pattern for other two tiles */}
      {/* Backend Development */}
      <div className="relative skill-tile glass-effect p-8 rounded-xl transition-all duration-300 overflow-hidden" data-aos="fade-up" data-aos-delay="200">
        <div className="absolute inset-0 z-0">
          <LetterGlitch
            glitchSpeed={50}
            className="w-full h-full opacity-30"
            centerVignette={true}
            outerVignette={false}
            smooth={true}
          />
        </div>

        <div className="relative z-10">
          <div className="text-center mb-6">
            <i data-feather="server" className="w-12 h-12 text-purple-400 mx-auto"></i>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-center">
            <DecryptedText text="Backend Development" animateOn="view" speed={60} maxIterations={12} revealDirection="start" className="text-2xl font-bold text-center text-white" encryptedClassName="text-2xl font-bold text-center text-purple-200"/>
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center"><i data-feather="check" className="w-4 h-4 text-green-400 mr-2"></i> Node.js & Express</li>
            <li className="flex items-center"><i data-feather="check" className="w-4 h-4 text-green-400 mr-2"></i> Python & Django</li>
            <li className="flex items-center"><i data-feather="check" className="w-4 h-4 text-green-400 mr-2"></i> PostgreSQL & Supabase</li>
            <li className="flex items-center"><i data-feather="check" className="w-4 h-4 text-green-400 mr-2"></i> Hive & Isar</li>
          </ul>
        </div>
      </div>

      {/* Other Expertise */}
      <div className="relative skill-tile glass-effect p-8 rounded-xl transition-all duration-300 overflow-hidden" data-aos="fade-up" data-aos-delay="300">
        <div className="absolute inset-0 z-0">
          <LetterGlitch
            glitchSpeed={50}
            className="w-full h-full opacity-30"
            centerVignette={true}
            outerVignette={false}
            smooth={true}
          />
        </div>

        <div className="relative z-10">
          <div className="text-center mb-6">
            <i data-feather="cpu" className="w-12 h-12 text-purple-400 mx-auto"></i>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-center">
            <DecryptedText text="Other Expertise" animateOn="view" speed={60} maxIterations={12} revealDirection="start" className="text-2xl font-bold text-center text-white" encryptedClassName="text-2xl font-bold text-center text-purple-200"/>
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center"><i data-feather="check" className="w-4 h-4 text-green-400 mr-2"></i> Machine Learning</li>
            <li className="flex items-center"><i data-feather="check" className="w-4 h-4 text-green-400 mr-2"></i> Data Structures</li>
            <li className="flex items-center"><i data-feather="check" className="w-4 h-4 text-green-400 mr-2"></i> Algorithms</li>
            <li className="flex items-center"><i data-feather="check" className="w-4 h-4 text-green-400 mr-2"></i> Complete App Planning and Development</li>
            <li className="flex items-center"><i data-feather="check" className="w-4 h-4 text-green-400 mr-2"></i> Leadership</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</section>



      {/* Experience Section */}
      <section id="experience" className="relative py-20 bg-gray-900">
      <div className="absolute inset-0 z-0">
            <DotGrid
              dotSize={8}
              gap={20}
              baseColor="#1e1b4b"
              activeColor="#8b5cf6"
              proximity={120}
              shockRadius={369}
              shockStrength={6.9}
              resistance={469}
              returnDuration={1.69}
            />
          </div>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">Professional Journey</h2>
          <div className="max-w-4xl mx-auto relative space-y-12">

            {/* App Developer */}
            <div className="ml-8 timeline-item relative glass-effect p-6 rounded-xl" data-aos="fade-right">
              <span className="text-sm text-purple-400">May 2025 – Present</span>
              <h3 className="text-xl font-bold mb-2">App Developer – <span className="italic">Bhasha</span></h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Initiated the development of an innovative learning platform dedicated to preserving and revitalizing underrepresented languages of the Indian subcontinent.</li>
                <li>Fully developed the company website with a React-based framework, implementing server-side rendering and using Supabase for backend services.</li>
                <li>Currently leveraging Flutter and Dart to build a cross-platform learning experience, with future plans to integrate AI-powered chatbots to personalize language learning.</li>
              </ul>
            </div>

            {/* Front Desk Assistant */}
            <div className="ml-8 timeline-item relative glass-effect p-6 rounded-xl" data-aos="fade-left">
              <span className="text-sm text-purple-400">Jan 2025 – May 2025</span>
              <h3 className="text-xl font-bold mb-2">Front Desk Office Assistant – <span className="italic">UMN Twin Cities Residence Halls</span></h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Worked the front desk at the University of Minnesota residence halls, ensuring smooth operations and student satisfaction.</li>
                <li>Provided around-the-clock customer service to residents, guests, and university staff by responding to inquiries, resolving concerns, and fostering a welcoming community.</li>
                <li>Enforced university housing policies with professionalism, reported incidents, and ensured safety protocols were followed.</li>
                <li>Managed key inventories, mail distribution, and secure handling of packages.</li>
                <li>Supported administrative tasks including data entry, room lockouts, incident documentation, and coordination with Resident Advisors and campus security.</li>
              </ul>
            </div>

            {/* Upcoming */}
            <div className="ml-8 timeline-item relative glass-effect p-6 rounded-xl" data-aos="fade-up">
              <h3 className="text-2xl font-bold mb-4 gradient-text">Upcoming</h3>
              <p className="text-gray-300 mb-3">
                🎯 Officially stepping in as <strong>Head of Website & Communications</strong> for the Wisconsin Robotics team. Leading a full redesign of the team's digital presence, building a responsive website and streamlining communication channels for team members and sponsors.
              </p>
              <p className="text-gray-300">
                🎶 Building a dedicated student portal for <strong>Cadenza School of Musica</strong> — complete with scheduling, payments, and teacher-student communication — to bring a seamless, modern experience to music education management.
              </p>
            </div>

          </div>
        </div>
      </section>

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
  className="space-y-6"
  onSubmit={async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const company = document.getElementById("company").value.trim();
    const feedback = document.getElementById("feedback").value.trim();

    // Insert to Supabase
    const { error } = await supabase.from("contact_submissions").insert([
      { name, email, phone, company, feedback },
    ]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("✅ Message sent successfully!");
      e.target.reset();
    }
  }}
>

            {/* Name */}
            <div className="relative">
              <input type="text" id="name" required autoComplete="off"
                className="peer w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"/>
              <label htmlFor="name" className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-purple-400 peer-focus:text-sm">
                Your Name <span className="text-red-400">*</span>
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input type="email" id="email" required autoComplete="off"
                className="peer w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"/>
              <label htmlFor="email" className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-purple-400 peer-focus:text-sm">
                Email Address <span className="text-red-400">*</span>
              </label>
            </div>

            {/* Phone */}
            <div className="relative">
              <input type="tel" id="phone" autoComplete="off"
                className="peer w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"/>
              <label htmlFor="phone" className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-purple-400 peer-focus:text-sm">
                Phone Number (Optional)
              </label>
            </div>

            {/* Company */}
            <div className="relative">
              <input type="text" id="company" autoComplete="off"
                className="peer w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"/>
              <label htmlFor="company" className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-purple-400 peer-focus:text-sm">
                Company Name (Optional)
              </label>
            </div>

            {/* Feedback */}
            <div className="relative">
              <textarea id="feedback" rows="4"
                className="peer w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
              <label htmlFor="feedback" className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-[-10px] peer-focus:text-purple-400 peer-focus:text-sm">
                Feedback (Optional)
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-full transition-all duration-300 flex items-center justify-center">
              <i data-feather="send" className="w-5 h-5 mr-2"></i> Send Message
            </button>
          </form>

          {/* Success Message */}
          <div className="mt-8 text-center text-green-400 opacity-0 transition-opacity duration-300" id="success-message">
            <i data-feather="check-circle" className="w-8 h-8 mx-auto mb-2"></i>
            <p>Thank you! Your message has been sent successfully.</p>
          </div>
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
