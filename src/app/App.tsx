import { useState, useEffect, useRef, useCallback, type FormEvent } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  Code2, Globe, Smartphone, Palette, PenTool, Calendar, Megaphone,
  Video, TrendingUp, Users, Trophy, BookOpen, Lightbulb, Network,
  Briefcase, Star, ChevronDown, Menu, X, Mail, MapPin, Phone,
  Github, Instagram, Linkedin, ArrowRight, Play, ExternalLink,
  Terminal, Cpu, Layers, Zap, Target, Award, Coffee, Shield, LogOut, Eye, Download
} from "lucide-react";

const DEFAULT_TEAM = "Technical Team";

type ApplicationFormState = {
  fullName: string;
  registrationNumber: string;
  year: string;
  department: string;
  phoneNumber: string;
  personalEmail: string;
  collegeEmail: string;
  linkedinProfileLink: string;
  role: string;
  preference1: string;
  preference2: string;
  preference3: string;
  fitParagraph: string;
  anythingToShare: string;
  resumeFile: File | null;
};

type ApplicationRecord = {
  _id: string;
  fullName: string;
  registrationNumber: string;
  year: string;
  department: string;
  phoneNumber: string;
  personalEmail: string;
  collegeEmail: string;
  linkedinProfileLink: string;
  role: string;
  preference1: string;
  preference2: string;
  preference3: string;
  fitParagraph: string;
  anythingToShare?: string;
  createdAt?: string;
  resume?: {
    fileName?: string;
    mimeType?: string;
    size?: number;
  };
};

type AdminState = {
  username: string;
  token: string;
};

const INITIAL_FORM_STATE: ApplicationFormState = {
  fullName: "",
  registrationNumber: "",
  year: "",
  department: "",
  phoneNumber: "",
  personalEmail: "",
  collegeEmail: "",
  linkedinProfileLink: "",
  role: DEFAULT_TEAM,
  preference1: "",
  preference2: "",
  preference3: "",
  fitParagraph: "",
  anythingToShare: "",
  resumeFile: null,
};

const YEAR_OPTIONS = ["I", "II", "III", "IV", "Other"];
const ADMIN_STORAGE_KEY = "gfg-admin-session";
const ADMIN_CREDENTIALS = { username: "Sushmitha", password: "Sushmitha27" };

function getCurrentPath() {
  if (typeof window === "undefined") return "/";
  return window.location.pathname || "/";
}

// ─── Particles ───────────────────────────────────────────────────────────────
function Particles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 10,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-green-500/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [-20, 20, -20], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {/* Gradient blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-green-600/5 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute top-3/4 left-1/2 w-64 h-64 rounded-full bg-green-400/5 blur-3xl animate-pulse" style={{ animationDelay: "4s" }} />
    </div>
  );
}

// ─── Typewriter ───────────────────────────────────────────────────────────────
const ROLES = ["Developer", "Designer", "Leader", "Creator", "Innovator", "Problem Solver"];

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = ROLES[idx];
    if (!deleting && displayed.length < word.length) {
      const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 100);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === word.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 60);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % ROLES.length);
    }
  }, [displayed, deleting, idx]);

  return (
    <span className="text-green-400">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

// ─── Counter ──────────────────────────────────────────────────────────────────
function Counter({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl lg:text-5xl font-bold font-display text-green-400 tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-sm text-green-200/60 mt-1 font-medium tracking-wide uppercase">{label}</div>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative z-10 ${className}`}
    >
      {children}
    </motion.section>
  );
}

// ─── Glow card ────────────────────────────────────────────────────────────────
function GlowCard({ children, className = "", glowColor = "green" }: {
  children: React.ReactNode; className?: string; glowColor?: "green" | "blue";
}) {
  const color = glowColor === "green" ? "hover:shadow-green-500/20 hover:border-green-500/40" : "hover:shadow-blue-500/20 hover:border-blue-500/40";
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 ${color} ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
const NAV_ITEMS = ["Home", "About", "Teams", "Gallery", "Why Join", "Recruitment", "FAQ", "Contact"];

function Navbar({ onApply, onAdminLogin, isAdmin }: { onApply: () => void; onAdminLogin: () => void; isAdmin: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id.toLowerCase().replace(/ /g, "-"));
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setOpen(false);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/70 backdrop-blur-xl border-b border-green-500/10 shadow-lg shadow-black/30" : "bg-transparent"}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center overflow-hidden">
            <img
              src="/images/logo.jpeg"
              alt="GFG KARE logo"
              className="w-8 h-8 object-contain"
            />
          </div>
          <span className="font-display font-bold text-white text-lg tracking-tight">
            GFG <span className="text-green-400">KARE</span>
          </span>
        </div>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <button
                onClick={() => scrollTo(item)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 relative group ${active === item ? "text-green-400" : "text-white/70 hover:text-white"}`}
              >
                {item}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-green-400 rounded transition-all duration-300 ${active === item ? "w-4/5" : "w-0 group-hover:w-4/5"}`} />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <motion.button
            type="button"
            onClick={onAdminLogin}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`hidden sm:flex items-center gap-2 font-semibold text-sm px-4 py-2 rounded-lg transition-colors border ${isAdmin ? "bg-green-500/15 border-green-500/30 text-green-300" : "bg-white/5 border-white/10 text-white/80 hover:text-white hover:border-green-500/30"}`}
          >
            <Shield size={14} /> {isAdmin ? "Admin" : "Admin Login"}
          </motion.button>
          <motion.button
            type="button"
            onClick={onApply}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold text-sm px-4 py-2 rounded-lg transition-colors shadow-lg shadow-green-500/25"
          >
            Apply Now <ArrowRight size={14} />
          </motion.button>
          <button onClick={() => setOpen(!open)} className="lg:hidden text-white/80 hover:text-white p-1">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/90 backdrop-blur-xl border-b border-green-500/10 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button key={item} onClick={() => scrollTo(item)} className="text-left px-3 py-2.5 text-white/80 hover:text-green-400 hover:bg-green-500/5 rounded-lg transition-all text-sm font-medium">
                  {item}
                </button>
              ))}
              <button type="button" onClick={onAdminLogin} className="mt-2 bg-white/5 border border-white/10 text-white font-semibold text-sm px-4 py-2.5 rounded-lg text-center">
                {isAdmin ? "Admin Dashboard" : "Admin Login"}
              </button>
              <button type="button" onClick={onApply} className="mt-2 bg-green-500 text-black font-semibold text-sm px-4 py-2.5 rounded-lg text-center">
                Apply Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ onApply }: { onApply: () => void }) {
  const codeSnippets = [
    "const future = await build();",
    "git commit -m 'join GFG'",
    "npm run innovate --flag",
    "def solve_problem():",
    "SELECT * FROM talent;",
    "docker run gfg-kare",
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated grid bg */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(47,141,70,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(47,141,70,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(47,141,70,0.08) 0%, transparent 70%)" }} />

      {/* Floating code snippets */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {codeSnippets.map((snippet, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-xs text-green-500/20 whitespace-nowrap"
            style={{ left: `${10 + i * 14}%`, top: `${15 + (i % 3) * 25}%` }}
            animate={{ y: [-15, 15, -15], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 6 + i * 1.5, delay: i * 0.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {snippet}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-sm font-medium tracking-wide">Recruitment Open 2026</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-tight tracking-tight mb-4"
        >
          Build.{" "}
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #2F8D46, #4ade80)" }}>
            Learn.
          </span>{" "}
          Lead.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl text-white/60 mb-3 font-display"
        >
          Join the GFG Campus Body KARE
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-lg sm:text-xl text-white/50 mb-12 h-8"
        >
          Be the <Typewriter />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            type="button"
            onClick={onApply}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(47,141,70,0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-3.5 rounded-xl text-base transition-colors shadow-xl shadow-green-500/30"
          >
            Join Our Team <ArrowRight size={18} />
          </motion.button>
          <motion.button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-green-500/40 text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-all"
          >
            <Play size={16} /> Explore Club
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-20 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-green-400 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
const WHAT_WE_DO = [
  { icon: <Terminal size={16} />, text: "Coding Culture & CP" },
  { icon: <Trophy size={16} />, text: "Hackathons" },
  { icon: <BookOpen size={16} />, text: "Workshops" },
  { icon: <Globe size={16} />, text: "Open Source" },
  { icon: <Network size={16} />, text: "Networking" },
  { icon: <Award size={16} />, text: "Leadership" },
];

function About() {
  return (
    <Section id="about" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left – visual */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-square max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/10 rounded-2xl" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                {/* Terminal window */}
                <div className="w-full bg-black/80 border border-green-500/20 rounded-xl overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-green-500/10 bg-black/50">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="text-white/30 text-xs ml-3 font-mono">gfg-kare ~ terminal</span>
                  </div>
                  <div className="p-4 font-mono text-sm space-y-1">
                    <p><span className="text-green-400">➜</span> <span className="text-blue-400">gfg-kare</span> <span className="text-white/70">git:(main)</span></p>
                    <p className="text-white/50">$ join --team=tech --passion=true</p>
                    <p className="text-green-400">✓ Application submitted!</p>
                    <p className="text-white/50">$ npm run build-future</p>
                    <motion.p
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-green-300"
                    >▋</motion.p>
                  </div>
                </div>
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  {[
                    { v: "20+", l: "Events" },
                    { v: "12+", l: "Core Members" },
                  ].map(({ v, l }) => (
                    <div key={l} className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
                      <div className="text-xl font-bold font-display text-green-400">{v}</div>
                      <div className="text-xs text-white/50">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-green-500/10 blur-2xl" />
          </div>

          {/* Right – text */}
          <div>
            <p className="text-green-400 text-sm font-mono uppercase tracking-widest mb-3">// Who We Are</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              The GFG Campus Body{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #2F8D46, #4ade80)" }}>
                KARE
              </span>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-4">
              We are the official GeeksforGeeks Campus Body at Kalasalingam Academy of Research and Education — a community of passionate developers, designers, and innovators committed to building a thriving tech culture on campus.
            </p>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              Our mission is to bridge the gap between academic learning and industry-ready skills through hands-on projects, competitive programming, hackathons, and mentorship.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
              {WHAT_WE_DO.map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2 bg-green-500/8 border border-green-500/15 rounded-lg px-3 py-2">
                  <span className="text-green-400">{icon}</span>
                  <span className="text-white/70 text-xs font-medium">{text}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <Counter end={20} suffix="+" label="Events" />
              <Counter end={12} suffix="+" label="Core Members" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── Why Join ─────────────────────────────────────────────────────────────────
const WHY_ITEMS = [
  { icon: <Users size={22} />, title: "Learn from Seniors", desc: "Get mentored by experienced members who've been where you are." },
  { icon: <Briefcase size={22} />, title: "Real-world Experience", desc: "Work on live projects and build a portfolio that stands out." },
  { icon: <Trophy size={22} />, title: "Leadership Skills", desc: "Lead teams, manage events, and grow as a professional." },
  { icon: <Network size={22} />, title: "Networking", desc: "Connect with industry professionals, alumni, and peers." },
  { icon: <Code2 size={22} />, title: "Build Projects", desc: "Collaborate on impactful tech projects from day one." },
  { icon: <Zap size={22} />, title: "Hackathons", desc: "Compete in national-level hackathons with club support." },
  { icon: <Star size={22} />, title: "Resume Building", desc: "Add meaningful experience and achievements to your profile." },
  { icon: <Layers size={22} />, title: "Teamwork", desc: "Develop collaboration and communication skills that last." },
  { icon: <Award size={22} />, title: "Certificates", desc: "Earn recognition for your contributions and participation." },
  { icon: <Coffee size={22} />, title: "Fun & Community", desc: "Be part of a vibrant community that shares your passion for tech." },  
];

function WhyJoin() {
  return (
    <Section id="why-join" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-green-400 text-sm font-mono uppercase tracking-widest mb-3">// Why Join Us</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            10 Reasons to Join GFG KARE
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            More than a club — a launchpad for your tech career.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {WHY_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <GlowCard className="h-full">
                <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center text-green-400 mb-4">
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Teams / Recruitment ──────────────────────────────────────────────────────
const TEAMS = [
  {
    icon: <Cpu size={24} />, name: "Technical Team", color: "green",
    desc: "Maintain club infrastructure, support technical events, and solve technical challenges.",
    skills: ["Linux", "Networking", "DevOps", "Scripting"],
  },
  {
    icon: <Globe size={24} />, name: "Web Dev Team", color: "blue",
    desc: "Develop and maintain the club website. Build full-stack web applications.",
    skills: ["React", "Node.js", "TypeScript", "CSS"],
  },
  {
    icon: <Smartphone size={24} />, name: "App Dev Team", color: "green",
    desc: "Build Android and cross-platform apps using modern mobile frameworks.",
    skills: ["Flutter", "React Native", "Firebase", "Kotlin"],
  },
  {
    icon: <Palette size={24} />, name: "UI/UX Team", color: "blue",
    desc: "Design beautiful interfaces, wireframes, and improve user experiences.",
    skills: ["Figma", "Adobe XD", "Prototyping", "Design Systems"],
  },
  {
    icon: <PenTool size={24} />, name: "Content Writing", color: "green",
    desc: "Write blogs, event reports, social captions, and creative documentation.",
    skills: ["SEO", "Copywriting", "Markdown", "Storytelling"],
  },
  {
    icon: <Calendar size={24} />, name: "Event Management", color: "blue",
    desc: "Organize workshops, hackathons, coding contests, and guest lectures.",
    skills: ["Planning", "Logistics", "Coordination", "Leadership"],
  },
  {
    icon: <Megaphone size={24} />, name: "PR & Outreach", color: "green",
    desc: "Drive collaborations, sponsorships, and campus engagement campaigns.",
    skills: ["Communication", "Marketing", "Partnerships", "Strategy"],
  },
  {
    icon: <Video size={24} />, name: "Video Editing", color: "blue",
    desc: "Create event videos, reels, and promotional content with motion graphics.",
    skills: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Motion"],
  },
  {
    icon: <TrendingUp size={24} />, name: "Marketing Team", color: "green",
    desc: "Build brand presence through social campaigns and digital marketing strategies.",
    skills: ["Social Media", "Campaigns", "Analytics", "Branding"],
  },
  {
    icon: <Smartphone size={24} />, name: "Social Media Team", color: "blue",
    desc: "Manage our social media presence and engage with our community.",
    skills: ["Instagram", "Twitter", "LinkedIn", "Content Creation"],
  },
];

function Recruitment({ onApply }: { onApply: (teamName?: string) => void }) {
  return (
    <Section id="recruitment" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-green-400 text-sm font-mono uppercase tracking-widest mb-3">// Open Positions</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            We're{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #2F8D46, #4ade80)" }}>
              Recruiting!
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Choose the team where your passion belongs.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAMS.map((team, i) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
            >
              <GlowCard glowColor={team.color as "green" | "blue"} className="flex flex-col h-full group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${team.color === "green" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"}`}>
                  {team.icon}
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{team.name}</h3>
                <p className="text-white/55 text-sm leading-relaxed mb-4 flex-1">{team.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {team.skills.map((s) => (
                    <span key={s} className={`text-xs px-2 py-0.5 rounded-full border ${team.color === "green" ? "border-green-500/25 text-green-300/70 bg-green-500/8" : "border-blue-500/25 text-blue-300/70 bg-blue-500/8"}`}>
                      {s}
                    </span>
                  ))}
                </div>
                <motion.button
                  type="button"
                  onClick={() => onApply(team.name)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${team.color === "green" ? "bg-green-500/15 hover:bg-green-500 border border-green-500/30 hover:border-green-500 text-green-400 hover:text-black" : "bg-blue-500/15 hover:bg-blue-500 border border-blue-500/30 hover:border-blue-500 text-blue-400 hover:text-white"}`}
                >
                  Apply Now <ExternalLink size={13} />
                </motion.button>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
const GALLERY_CATEGORIES = ["All", "Competitions", "Hackathons", "Coding Contests", "Club Activities"];

const GALLERY_ITEMS = [
  { id: 1, cat: "Hackathons", title: "Hack Heist", date: "March 2025", img: "/images/Hack heist.jpg", tall: false },
  { id: 2, cat: "Competitions", title: "Agorithmist", date: "Jan 2024", img: "/images/round1.JPG.jpeg", tall: true },
  { id: 3, cat: "Competitions", title: "Algorithmist26", date: "Feb 2026", img:"/images/round2.jpg", tall: false },
  { id: 4, cat: "Coding Contests", title: "Geek fest", date: "Feb 2026", img: "/images/geekfest.jpeg", tall: false },
  { id: 5, cat: "Club Activities", title: "National Skill Up", date: "Sep 2025", img: "/images/nationalskillup2.jpeg", tall: true },
  { id: 6, cat: "Competitions", title: "Algorithmist", date: "Feb 2026", img: "/images/round3.jpg", tall: false },
  { id: 7, cat: "Hackathons", title: "Hack Heist", date: "March 2025", img: "/images/Hack Heisst.jpg", tall: false },
  { id: 8, cat: "Club Activities", title: "National Skill up", date: "Feb 2026", img: "/images/nationalskillup.jpeg", tall: false },
  { id: 9, cat: "Competitions", title: "Algorithmist", date: "Sep 2024", img:"/images/round.jpg", tall: false },
  { id: 10, cat: "Hackathons", title: "Hack Heist", date: "March 2025", img: "/images/heist.jpg", tall: false },
];

function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState<typeof GALLERY_ITEMS[number] | null>(null);

  const filtered = activeFilter === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.cat === activeFilter);

  return (
    <Section id="gallery" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-green-400 text-sm font-mono uppercase tracking-widest mb-3">// Memories</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Event Gallery</h2>
          <p className="text-white/50 max-w-lg mx-auto">A glimpse into our community in action.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeFilter === cat ? "bg-green-500 text-black shadow-lg shadow-green-500/25" : "bg-white/5 border border-white/10 text-white/60 hover:border-green-500/30 hover:text-white"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="break-inside-avoid mb-4 group cursor-pointer relative rounded-2xl overflow-hidden bg-green-900/10"
                onClick={() => setLightbox(item)}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-green-400 text-xs font-mono mb-1">{item.cat}</span>
                  <p className="text-white font-semibold text-sm">{item.title}</p>
                  <p className="text-white/50 text-xs">{item.date}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="relative max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.img} alt={lightbox.title} className="w-full object-cover max-h-[70vh]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 p-6">
                <span className="text-green-400 text-xs font-mono">{lightbox.cat} · {lightbox.date}</span>
                <p className="text-white font-bold text-lg mt-1">{lightbox.title}</p>
              </div>
              <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

// ─── Timeline ─────────────────────────────────────────────────────────────────
const TIMELINE_EVENTS = [
  { date: "Sep 2025", title: "National Skill Up", desc: "we explored 15+ Job-Ready Roadmaps, played exciting games, won cool prizes", img: "/images/nationalskillup.jpeg" },
  { date: "Oct 2025", title: "Hack Heist", desc: "Creativity, coding skills, and problem-solving mindset to build impactful solutions.", img:"/images/Hack-Heist.jpeg" },
  { date: "Oct 2025", title: "Geek Fest", desc: "The event witnessed an amazing response with 130+ registrations , where participants showcased their coding talent, creativity, and problem-solving skills!", img: "/images/geekfest.jpeg" },
  { date: "Mar 2026", title: "UI-DOPPLE GANGER", desc: "An intercollegiate front-end UI design competition as part of Euphoria 2026.", img: "/images/uidoopler.jpeg" },
  { date: "Mar 2026", title: "Algorithmist’26", desc: "where logic meets innovation and algorithms take center stage! ", img: "/images/algorithm.jpeg" },
];

function Timeline() {
  return (
    <Section id="events" className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-green-400 text-sm font-mono uppercase tracking-widest mb-3">// Our Journey</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Event Highlights</h2>
        </div>
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-green-500/50 via-green-500/20 to-transparent -translate-x-1/2" />

          <div className="space-y-12">
            {TIMELINE_EVENTS.map((ev, i) => (
              <motion.div
                key={ev.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className={`relative flex flex-col sm:flex-row gap-6 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
              >
                {/* Dot */}
                <div className="absolute left-4 sm:left-1/2 top-6 w-3 h-3 rounded-full bg-green-400 border-2 border-green-400/30 -translate-x-1/2 shadow-lg shadow-green-400/50 z-10" />

                <div className={`sm:w-1/2 pl-12 sm:pl-0 ${i % 2 === 0 ? "sm:pr-10" : "sm:pl-10"}`}>
                  <GlowCard className="overflow-hidden p-0">
                    <img src={ev.img} alt={ev.title} className="w-full h-40 object-cover" />
                    <div className="p-5">
                      <span className="text-green-400 font-mono text-xs">{ev.date}</span>
                      <h3 className="font-display font-bold text-white text-lg mt-1 mb-2">{ev.title}</h3>
                      <p className="text-white/55 text-sm leading-relaxed">{ev.desc}</p>
                    </div>
                  </GlowCard>
                </div>
                <div className="hidden sm:block sm:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: "Anirudh", dept: "CSE, 4th Year", quote: "Joining GFG KARE was the best decision of my college life. I got to work on real projects, Organizing hackathons" },
  { name: "Sushmitha N", dept: "CSE, 3rd Year", quote: "The seniors here are incredibly supportive.and grown beyond what any classroom could have taught me." },
  { name: "Deepa", dept: "CSE, 4th Year", quote: "The UI/UX team gave me hands-on Figma experience. My portfolio improved massively and I love the collaborative environment here." },
  { name: "Rakshan Ananth", dept: "CSE, 4th Year", quote: "GFG KARE shaped who I am. I've led events, mentored juniors." },
];

function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[idx];

  return (
    <Section id="teams" className="py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-green-400 text-sm font-mono uppercase tracking-widest mb-3">// Student Voices</p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-12">What Members Say</h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white/5 backdrop-blur-md border border-green-500/15 rounded-2xl p-8 shadow-xl"
          >
            <div className="text-4xl text-green-400/40 font-display mb-4">"</div>
            <p className="text-white/80 text-lg leading-relaxed italic mb-8">"{t.quote}"</p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold font-display">
                {t.name[0]}
              </div>
              <div className="text-left">
                <p className="font-semibold text-white text-sm">{t.name}</p>
                <p className="text-white/40 text-xs">{t.dept}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`transition-all duration-300 rounded-full ${i === idx ? "w-6 h-2 bg-green-400" : "w-2 h-2 bg-white/20"}`} />
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  { q: "How do I apply?", a: "Click any 'Apply Now' button on this page, fill in the built-in form, and submit your details directly on the website. We’ll reach out within 48 hours." },
  { q: "Who can join GFG KARE?", a: "Any student enrolled at Kalasalingam Academy of Research and Education can apply, regardless of branch or year." },
  { q: "Do I need coding experience?", a: "Not necessarily! We have teams for design, content, event management, PR, and more. Non-technical roles are equally valued and impactful." },
  { q: "What are the benefits of joining?", a: "You get mentorship, real project experience, certificates, network access,and friendships that last a lifetime." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section id="faq" className="py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-green-400 text-sm font-mono uppercase tracking-widest mb-3">// FAQ</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-green-500/20 transition-colors">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-semibold text-white text-sm">{faq.q}</span>
                <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={16} className="text-green-400" />
                </motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-6 pb-5 text-white/55 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
const CONTACT_PERSONS = [
  { name: "L Harsha Vardhan", phone: "9100550609"},
  { name: "Sushmitha N", phone: "8688205314"},
  { name: "Harshika", phone: "9502795304" },
];

function Contact() {
  return (
    <Section id="contact" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-green-400 text-sm font-mono uppercase tracking-widest mb-3">// Reach Us</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-white/50 max-w-lg mx-auto">Have questions? We'd love to hear from you.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left – info */}
          <div className="space-y-6">
            {/* Club contact */}
            <GlowCard>
              <h3 className="font-display font-bold text-white text-lg mb-5">Club Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-green-500/15 flex items-center justify-center text-green-400 shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs">Email</p>
                    <p className="text-white text-sm font-medium">gfgkarestudentchapter@klu.ac.in</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-green-500/15 flex items-center justify-center text-green-400 shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs">Location</p>
                    <p className="text-white text-sm font-medium">Kalasalingam Academy of Research and Education, Tamil Nadu</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/8">
                <p className="text-white/50 text-xs mb-3 uppercase tracking-wide">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { icon: <Instagram size={16} />, label: "Instagram", href: "https://www.instagram.com/gfg_campus_body_kare/" },
                    { icon: <Linkedin size={16} />, label: "LinkedIn", href: "https://www.linkedin.com/company/gfg-kare-student-chapter/" },
                  ].map(({ icon, label, href }) => (
                    <motion.a
                      key={label}
                      href={href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-9 h-9 rounded-lg bg-white/8 border border-white/10 hover:border-green-500/30 hover:bg-green-500/10 flex items-center justify-center text-white/60 hover:text-green-400 transition-colors"
                      aria-label={label}
                    >
                      {icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </GlowCard>

                            {/* Middle – faculty coordinators */}
                            <div>
                              <GlowCard>
                                <h3 className="font-display font-bold text-white text-lg mb-5 flex items-center gap-2">
                                  <Award size={18} className="text-green-400" /> Faculty Coordinators
                                </h3>
                                <div className="space-y-4">
                                  {[
                                    {
                                      name: "Dr. R. Raja Sekar",
                                      role: "Assistant Professor / CSE",
                                    },
                                    {
                                      name: "MRS. S. Shanmuga Priya",
                                      role: "Assistant Professor / CSE",
                                    },
                                  ].map((person) => (
                                    <div key={person.name} className="p-4 bg-white/4 border border-white/8 rounded-xl">
                                      <p className="text-white font-semibold text-sm">{person.name}</p>
                                      <p className="text-white/40 text-xs mt-1">{person.role}</p>
                                    </div>
                                  ))}
                                </div>
                              </GlowCard>
                            </div>

          </div>

          {/* Right – contact persons */}
          <div>
            <GlowCard>
              <h3 className="font-display font-bold text-white text-lg mb-5 flex items-center gap-2">
                <Phone size={18} className="text-green-400" /> Contact Persons
              </h3>
              <div className="space-y-4">
                {CONTACT_PERSONS.map((person, i) => (
                  <motion.div
                    key={person.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center justify-between p-4 bg-white/4 border border-white/8 hover:border-green-500/20 rounded-xl transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/15 border border-green-500/20 flex items-center justify-center text-green-400 font-bold font-display text-sm">
                        {person.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{person.name}</p>
                        <p className="text-white/40 text-xs">{person.role}</p>
                      </div>
                    </div>
                    <a
                      href={`tel:${person.phone}`}
                      className="flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-mono transition-colors group-hover:scale-105 transform"
                    >
                      <Phone size={13} />
                      {person.phone}
                    </a>
                  </motion.div>
                ))}
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA({ onApply }: { onApply: () => void }) {
  return (
    <Section className="py-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center relative">
        <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(47,141,70,0.12) 0%, transparent 70%)" }} />
        <p className="text-green-400 text-sm font-mono uppercase tracking-widest mb-6">// Join Us</p>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
          🚀 Ready to Build the{" "}
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #2F8D46, #4ade80)" }}>
            Future
          </span>{" "}
          with GFG?
        </h2>
        <p className="text-white/55 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Become a part of an amazing community of developers, designers, creators, innovators, and leaders. Your journey starts here.
        </p>
        <motion.button
          type="button"
          onClick={onApply}
          whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(47,141,70,0.5)" }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-black font-bold text-lg px-10 py-4 rounded-2xl shadow-2xl shadow-green-500/30 transition-colors"
        >
          Apply Now <ArrowRight size={20} />
        </motion.button>
        <p className="text-white/25 text-sm mt-4">Limited seats available · Recruitment closes soon</p>
      </div>
    </Section>
  );
}

function ApplicationModal({
  open,
  defaultTeam,
  onClose,
}: {
  open: boolean;
  defaultTeam: string;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ApplicationFormState>(INITIAL_FORM_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) return;
    setForm((current) => ({ ...INITIAL_FORM_STATE, role: defaultTeam || current.role || DEFAULT_TEAM }));
    setMessage(null);
    setSuccess(false);
  }, [open, defaultTeam]);

  const updateField = <K extends keyof ApplicationFormState>(field: K, value: ApplicationFormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      if (!form.resumeFile) {
        throw new Error('Please upload your resume before submitting.');
      }

      const selectedPreferences = [form.preference1, form.preference2, form.preference3].map((value) => value.trim());
      if (new Set(selectedPreferences).size !== selectedPreferences.length) {
        throw new Error('Please choose three different role preferences.');
      }

      const submission = new FormData();
      submission.append('fullName', form.fullName);
      submission.append('registrationNumber', form.registrationNumber);
      submission.append('year', form.year);
      submission.append('department', form.department);
      submission.append('phoneNumber', form.phoneNumber);
      submission.append('personalEmail', form.personalEmail);
      submission.append('collegeEmail', form.collegeEmail);
      submission.append('linkedinProfileLink', form.linkedinProfileLink);
      submission.append('role', form.role);
      submission.append('preference1', form.preference1);
      submission.append('preference2', form.preference2);
      submission.append('preference3', form.preference3);
      submission.append('fitParagraph', form.fitParagraph);
      submission.append('anythingToShare', form.anythingToShare);
      submission.append('resume', form.resumeFile);

      const response = await fetch('/api/applications', {
        method: 'POST',
        body: submission,
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || 'Unable to submit application.');
      }

      setSuccess(true);
      setMessage(`${payload.message} Your application ID is ${payload.applicationId}.`);
      setForm({ ...INITIAL_FORM_STATE, role: form.role });
    } catch (error) {
      setSuccess(false);
      setMessage(error instanceof Error ? error.message : 'Unable to submit application.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-green-500/20 bg-[#08110d] shadow-2xl shadow-black/60"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-[#08110d]/95 px-6 py-4">
          <div>
            <p className="text-green-400 text-xs font-mono uppercase tracking-[0.3em]">// Application</p>
            <h3 className="text-white font-display text-2xl font-bold">Apply to GFG KARE</h3>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors" type="button">
            <X size={18} className="mx-auto" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
          <label>
            <span className="block text-sm text-white/70 mb-2">Full Name *</span>
            <input required value={form.fullName} onChange={(e) => updateField('fullName', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-green-400" placeholder="Your full name" />
          </label>
          <label>
            <span className="block text-sm text-white/70 mb-2">Registration Number *</span>
            <input required value={form.registrationNumber} onChange={(e) => updateField('registrationNumber', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-green-400" placeholder="Registration number" />
          </label>
          <label>
            <span className="block text-sm text-white/70 mb-2">Year *</span>
            <select required value={form.year} onChange={(e) => updateField('year', e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0c1713] px-4 py-3 text-white outline-none transition-colors focus:border-green-400">
              <option value="">Select year</option>
              {YEAR_OPTIONS.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
          </label>
          <label>
            <span className="block text-sm text-white/70 mb-2">Department *</span>
            <input required value={form.department} onChange={(e) => updateField('department', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-green-400" placeholder="CSE / IT / ECE / other" />
          </label>
          <label>
            <span className="block text-sm text-white/70 mb-2">Phone Number *</span>
            <input required value={form.phoneNumber} onChange={(e) => updateField('phoneNumber', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-green-400" placeholder="+91 98765 43210" />
          </label>
          <label>
            <span className="block text-sm text-white/70 mb-2">Mail Id (personal) *</span>
            <input required type="email" value={form.personalEmail} onChange={(e) => updateField('personalEmail', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-green-400" placeholder="name@example.com" />
          </label>
          <label>
            <span className="block text-sm text-white/70 mb-2">Mail Id (college) *</span>
            <input required type="email" value={form.collegeEmail} onChange={(e) => updateField('collegeEmail', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-green-400" placeholder="name@college.edu" />
          </label>
          <label>
            <span className="block text-sm text-white/70 mb-2">LinkedIn Profile Link *</span>
            <input required value={form.linkedinProfileLink} onChange={(e) => updateField('linkedinProfileLink', e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-green-400" placeholder="https://linkedin.com/in/your-profile" />
          </label>
          <label className="lg:col-span-3">
            <span className="block text-sm text-white/70 mb-2">Role *</span>
            <select required value={form.role} onChange={(e) => updateField('role', e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0c1713] px-4 py-3 text-white outline-none transition-colors focus:border-green-400">
              {TEAMS.map((team) => <option key={team.name} value={team.name}>{team.name}</option>)}
            </select>
          </label>
          <div className="lg:col-span-3 grid gap-4 sm:grid-cols-3">
            {([
              ['preference1', 'Preference 1 *'],
              ['preference2', 'Preference 2 *'],
              ['preference3', 'Preference 3 *'],
            ] as const).map(([field, label]) => (
              <label key={field}>
                <span className="block text-sm text-white/70 mb-2">{label}</span>
                <select required value={form[field]} onChange={(e) => updateField(field, e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0c1713] px-4 py-3 text-white outline-none transition-colors focus:border-green-400">
                  <option value="">Select role</option>
                  {TEAMS.map((team) => <option key={team.name} value={team.name}>{team.name}</option>)}
                </select>
              </label>
            ))}
          </div>
          <label className="lg:col-span-3">
            <span className="block text-sm text-white/70 mb-2">Give short paragraph why do you think you are fit for the selected roles *</span>
            <textarea required value={form.fitParagraph} onChange={(e) => updateField('fitParagraph', e.target.value)} rows={5} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-green-400" placeholder="Tell us what you want to learn and contribute" />
          </label>
          <label className="lg:col-span-3">
            <span className="block text-sm text-white/70 mb-2">Upload your resume here! *</span>
            <input required type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e) => updateField('resumeFile', e.target.files?.[0] ?? null)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors file:mr-4 file:rounded-lg file:border-0 file:bg-green-500 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-black hover:border-green-400" />
            <p className="mt-2 text-xs text-white/40">Upload 1 supported file: PDF or document. Max 10 MB.</p>
          </label>
          <label className="lg:col-span-3">
            <span className="block text-sm text-white/70 mb-2">Anything you want to share?</span>
            <textarea value={form.anythingToShare} onChange={(e) => updateField('anythingToShare', e.target.value)} rows={4} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-colors focus:border-green-400" placeholder="Share anything extra that helps us know you better" />
          </label>
          <div className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            <p className="font-semibold text-white mb-2">WhatsApp group</p>
            <a href="https://chat.whatsapp.com/K639kkXCgb32VabOkkC1UO?mode=gi_t" target="_blank" rel="noreferrer" className="text-green-400 hover:text-green-300 break-all">
              https://chat.whatsapp.com/K639kkXCgb32VabOkkC1UO?mode=gi_t
            </a>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-3 pt-2">
            {message && (
              <div className={`rounded-xl border px-4 py-3 text-sm ${success ? 'border-green-500/30 bg-green-500/10 text-green-200' : 'border-red-500/30 bg-red-500/10 text-red-200'}`}>
                {message}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button type="button" onClick={onClose} className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/70 hover:text-white hover:border-white/20 transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black hover:bg-green-400 disabled:opacity-70 disabled:cursor-not-allowed transition-colors">
                {submitting ? 'Submitting...' : 'Submit application'}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function AdminLoginModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: (session: AdminState) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setUsername("");
    setPassword("");
    setError(null);
  }, [open]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || 'Unable to login.');
      }

      onSuccess({ username: payload.username, token: payload.token });
      onClose();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Unable to login.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
      <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="w-full max-w-md rounded-3xl border border-green-500/20 bg-[#08110d] shadow-2xl shadow-black/60 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-green-500/15 text-green-400 flex items-center justify-center">
            <Shield size={18} />
          </div>
          <div>
            <p className="text-green-400 text-xs font-mono uppercase tracking-[0.3em]">// Admin Access</p>
            <h3 className="text-white font-display text-2xl font-bold">Admin Login</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="block text-sm text-white/70 mb-2">Username</span>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-green-400" placeholder="******" />
          </label>
          <label className="block">
            <span className="block text-sm text-white/70 mb-2">Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-green-400" placeholder="******" />
          </label>
          {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/70 hover:text-white">Cancel</button>
            <button type="submit" disabled={loading} className="rounded-xl bg-green-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-green-400 disabled:opacity-70">{loading ? 'Signing in...' : 'Sign in'}</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function AdminDashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [selected, setSelected] = useState<ApplicationRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resumePreview, setResumePreview] = useState<{ url: string; fileName: string } | null>(null);

  const openProtectedResume = useCallback(async (mode: 'view' | 'download') => {
    if (!selected) return;

    const response = await fetch(`/api/applications/${selected._id}/resume${mode === 'download' ? '/download' : ''}`, {
      headers: { 'x-admin-token': token },
    });

    if (!response.ok) {
      throw new Error('Unable to load resume.');
    }

    const contentType = response.headers.get('content-type') || selected.resume?.mimeType || 'application/octet-stream';
    const arrayBuffer = await response.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: contentType });
    const objectUrl = URL.createObjectURL(blob);

    if (mode === 'view') {
      setResumePreview({ url: objectUrl, fileName: selected.resume?.fileName || 'resume.pdf' });
      return;
    }

    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = selected.resume?.fileName || 'resume';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 10_000);
  }, [selected, token]);

  useEffect(() => {
    const loadApplications = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/applications', {
          headers: { 'x-admin-token': token },
        });

        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.message || 'Unable to load applications.');
        }

        setApplications(payload.applications || []);
        setSelected((payload.applications || [])[0] || null);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load applications.');
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [token]);

  return (
    <Section id="admin" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-green-400 text-sm font-mono uppercase tracking-widest mb-3">// Admin Console</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Applications Dashboard</h2>
          </div>
          <button onClick={onLogout} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/80 hover:text-white hover:border-green-500/30 transition-colors">
            <LogOut size={14} /> Logout
          </button>
        </div>

        {loading ? (
          <GlowCard>
            <p className="text-white/60">Loading applications...</p>
          </GlowCard>
        ) : error ? (
          <GlowCard>
            <p className="text-red-200">{error}</p>
          </GlowCard>
        ) : applications.length === 0 ? (
          <GlowCard>
            <p className="text-white/60">No applications submitted yet.</p>
          </GlowCard>
        ) : (
          <div className="grid lg:grid-cols-[320px_1fr] gap-6">
            <GlowCard className="p-0 overflow-hidden">
              <div className="border-b border-white/10 px-5 py-4">
                <p className="text-white font-semibold">Submitted Applications</p>
                <p className="text-white/40 text-sm">{applications.length} record(s)</p>
              </div>
              <div className="max-h-[70vh] overflow-y-auto">
                {applications.map((application) => (
                  <button
                    key={application._id}
                    onClick={() => setSelected(application)}
                    className={`w-full text-left px-5 py-4 border-b border-white/5 transition-colors ${selected?._id === application._id ? 'bg-green-500/10' : 'hover:bg-white/5'}`}
                  >
                    <p className="text-white font-semibold text-sm">{application.fullName}</p>
                    <p className="text-white/40 text-xs mt-1">{application.registrationNumber} · {application.role}</p>
                  </button>
                ))}
              </div>
            </GlowCard>

            {selected && (
              <GlowCard className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    <p className="text-green-400 text-xs font-mono uppercase tracking-[0.3em]">Selected Application</p>
                    <h3 className="text-white font-display text-3xl font-bold mt-2">{selected.fullName}</h3>
                    <p className="text-white/45 text-sm mt-1">{selected.registrationNumber} · Year {selected.year} · {selected.department}</p>
                  </div>
                  <div className="flex gap-3">
                    <a href={`mailto:${selected.personalEmail}`} className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-green-400">
                      <Mail size={14} /> Email
                    </a>
                    <a href={`tel:${selected.phoneNumber}`} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/80 hover:text-white">
                      <Phone size={14} /> Call
                    </a>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-white/40 text-xs mb-1">Personal Email</p><p className="text-white text-sm break-all">{selected.personalEmail}</p></div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-white/40 text-xs mb-1">College Email</p><p className="text-white text-sm break-all">{selected.collegeEmail}</p></div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-white/40 text-xs mb-1">Phone Number</p><p className="text-white text-sm">{selected.phoneNumber}</p></div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-white/40 text-xs mb-1">LinkedIn</p><a href={selected.linkedinProfileLink} target="_blank" rel="noreferrer" className="text-green-400 text-sm break-all hover:text-green-300">{selected.linkedinProfileLink}</a></div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    ['Role', selected.role],
                    ['Preference 1', selected.preference1],
                    ['Preference 2', selected.preference2],
                    ['Preference 3', selected.preference3],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-white/40 text-xs mb-1">{label}</p>
                      <p className="text-white text-sm">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-white/40 text-xs mb-2">Fit Paragraph</p>
                    <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{selected.fitParagraph}</p>
                  </div>
                  {selected.anythingToShare && (
                    <div>
                      <p className="text-white/40 text-xs mb-2">Anything to Share</p>
                      <p className="text-white/80 leading-relaxed whitespace-pre-wrap">{selected.anythingToShare}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => openProtectedResume('view').catch((resumeError) => setError(resumeError instanceof Error ? resumeError.message : 'Unable to load resume.'))} className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-sm font-semibold text-black hover:bg-green-400">
                    <Eye size={14} /> View Resume
                  </button>
                  <button type="button" onClick={() => openProtectedResume('download').catch((resumeError) => setError(resumeError instanceof Error ? resumeError.message : 'Unable to load resume.'))} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/80 hover:text-white">
                    <Download size={14} /> Download Resume
                  </button>
                </div>
              </GlowCard>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {resumePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => {
              URL.revokeObjectURL(resumePreview.url);
              setResumePreview(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.96, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 16 }}
              className="relative w-full max-w-5xl h-[90vh] rounded-3xl overflow-hidden border border-green-500/20 bg-[#08110d] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-green-400 text-xs font-mono uppercase tracking-widest">// Resume Preview</p>
                  <p className="text-white font-semibold text-sm mt-1">{resumePreview.fileName}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    URL.revokeObjectURL(resumePreview.url);
                    setResumePreview(null);
                  }}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <X size={18} className="mx-auto" />
                </button>
              </div>
              <iframe title="Resume preview" src={resumePreview.url} className="w-full h-[calc(90vh-73px)] bg-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

function AdminAccessPage({
  onOpenLogin,
  onLogout,
  session,
}: {
  onOpenLogin: () => void;
  onLogout: () => void;
  session: AdminState | null;
}) {
  if (!session) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
        <GlowCard className="w-full max-w-xl text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-green-500/15 text-green-400 flex items-center justify-center mx-auto">
            <Shield size={24} />
          </div>
          <div>
            <p className="text-green-400 text-sm font-mono uppercase tracking-widest mb-2">// Admin Access</p>
            <h1 className="font-display text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-white/55 mt-3">Log in to review applications, open resumes, and download candidate files.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button onClick={onOpenLogin} className="rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-black hover:bg-green-400 transition-colors">
              Admin Login
            </button>
            <button onClick={() => window.location.assign('/')} className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 hover:text-white transition-colors">
              Back to site
            </button>
          </div>
        </GlowCard>
      </div>
    );
  }

  return <AdminDashboard token={session.token} onLogout={onLogout} />;
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative z-10 border-t border-green-500/10 bg-black/50 backdrop-blur-xl">
      {/* Wave */}
      <div className="h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent mb-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center">
                <Code2 size={14} className="text-black" strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-white">GFG <span className="text-green-400">KARE</span></span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">Building the next generation of tech leaders at KARE University.</p>
          </div>
          {/* Quick Links */}
          <div>
            <p className="text-white/70 font-semibold text-sm mb-3 uppercase tracking-wide">Quick Links</p>
            <ul className="space-y-2">
              {["About", "Teams", "Gallery", "Recruitment", "FAQ", "Contact"].map((l) => (
                <li key={l}>
                  <button
                    onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                    className="text-white/40 hover:text-green-400 text-sm transition-colors"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Social */}
          <div>
            <p className="text-white/70 font-semibold text-sm mb-3 uppercase tracking-wide">Follow Us</p>
            <div className="flex flex-col gap-2">
              {[
                { icon: <Instagram size={14} />, label: "Instagram", href: "https://www.instagram.com/gfg_campus_body_kare/" },
                { icon: <Linkedin size={14} />, label: "LinkedIn", href: "https://www.linkedin.com/company/gfg-kare-student-chapter/" },
              ].map(({ icon, label, href }) => (
                <a key={label} href={href} className="flex items-center gap-2 text-white/40 hover:text-green-400 text-sm transition-colors">
                  {icon} {label}
                </a>
              ))}
            </div>
          </div>
          {/* Contact */}
          <div>
            <p className="text-white/70 font-semibold text-sm mb-3 uppercase tracking-wide">Contact</p>
            <div className="space-y-2">
              <p className="text-white/40 text-sm flex items-center gap-2"><Mail size={13} /> gfgkarestudentchapter@klu.ac.in</p>
              <p className="text-white/40 text-sm flex items-center gap-2"><MapPin size={13} /> KARE University, TN</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">© 2026 GFG Campus Body KARE. All rights reserved.</p>
          <p className="text-white/25 text-xs flex items-center gap-1">
            Made with <span className="text-red-400">❤️</span> by GFG Campus Body KARE
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-0.5 bg-transparent">
      <div className="h-full bg-green-400 shadow-lg shadow-green-400/50 transition-all duration-100" style={{ width: `${progress}%` }} />
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [applicationTeam, setApplicationTeam] = useState(DEFAULT_TEAM);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminSession, setAdminSession] = useState<AdminState | null>(() => {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [path, setPath] = useState(getCurrentPath);

  useEffect(() => {
    const onPopState = () => setPath(getCurrentPath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigateTo = useCallback((nextPath: string) => {
    if (getCurrentPath() !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
    setPath(nextPath);
  }, []);

  const openApplication = useCallback((teamName?: string) => {
    setApplicationTeam(teamName || DEFAULT_TEAM);
    setApplicationOpen(true);
  }, []);

  const closeApplication = useCallback(() => {
    setApplicationOpen(false);
  }, []);

  const openAdminLogin = useCallback(() => {
    setAdminOpen(true);
  }, []);

  const handleAdminSuccess = useCallback((session: AdminState) => {
    setAdminSession(session);
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(session));
    navigateTo('/admin');
  }, []);

  const handleAdminLogout = useCallback(() => {
    setAdminSession(null);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    navigateTo('/');
  }, []);

  const openAdminRoute = useCallback(() => {
    navigateTo('/admin');
  }, [navigateTo]);

  if (path === '/admin') {
    return (
      <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
        <style>{`
          * { scrollbar-width: none; }
          *::-webkit-scrollbar { display: none; }
          .font-display { font-family: 'Exo 2', sans-serif; }
          .font-mono { font-family: 'JetBrains Mono', monospace; }
        `}</style>
        <ScrollProgress />
        <Particles />
        <Navbar onApply={() => openApplication()} onAdminLogin={openAdminRoute} isAdmin={Boolean(adminSession)} />
        <AdminAccessPage onOpenLogin={openAdminLogin} onLogout={handleAdminLogout} session={adminSession} />
        <AdminLoginModal open={adminOpen} onClose={() => setAdminOpen(false)} onSuccess={handleAdminSuccess} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        * { scrollbar-width: none; }
        *::-webkit-scrollbar { display: none; }
        .font-display { font-family: 'Exo 2', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>
      <ScrollProgress />
      <Particles />
      <Navbar onApply={() => openApplication()} onAdminLogin={openAdminRoute} isAdmin={Boolean(adminSession)} />
      <main>
        <Hero onApply={() => openApplication()} />
        <About />
        <WhyJoin />
        <Recruitment onApply={(teamName) => openApplication(teamName)} />
        <Gallery />
        <Timeline />
        <Testimonials />
        <FAQ />
        <Contact />
        <CTA onApply={() => openApplication()} />
      </main>
      <Footer />
      <ApplicationModal open={applicationOpen} defaultTeam={applicationTeam} onClose={closeApplication} />
      <AdminLoginModal open={adminOpen} onClose={() => setAdminOpen(false)} onSuccess={handleAdminSuccess} />
    </div>
  );
}
