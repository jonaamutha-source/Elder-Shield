import { useEffect, useRef, useState } from 'react';
import { ToastProvider, Modal, useToast, BackToTop } from '@/lib/ui';
import { Auth, type AuthRole } from '@/components/Auth';
import { HealthcarePartnersSection, SuccessStoriesSection, CommunityImpactSection, BlogSection, EventsSection } from '@/components/Sections';
import { EnhancedFooter } from '@/components/Footer';
import {
  Shield,
  HeartPulse,
  Users,
  HandHeart,
  Menu,
  X,
  ArrowRight,
  Stethoscope,
  Phone,
  Sparkles,
  Activity,
  Siren,
  Truck,
  HelpCircle,
  Mic,
  Pill,
  MapPin,
  FileText,
  CalendarClock,
  Video,
  Contact,
  ClipboardCheck,
  ShieldAlert,
  Languages,
  UserPlus,
  UsersRound,
  CalendarCheck,
  AlertTriangle,
  BellRing,
  Target,
  TrendingUp,
  Award,
  Globe2,
  HeartHandshake,
  Building2,
  CheckCircle2,
  CloudSun,
  Quote,
  Thermometer,
  Droplet,
  Wind,
  Plus,
  Home,
  CalendarDays,
  UserCircle,
  Settings,
  ChevronRight,
  Bell,
  AlertOctagon,
  Navigation2,
  PhoneOff,
  Clock,
  ChevronLeft,
  Footprints,
  Moon,
  Sun,
  Mail,
  PhoneCall,
  MoreVertical,
  Check,
  LayoutDashboard,
  Search,
  Dot,
  Gauge,
  TrendingDown,
  Trophy,
  Medal,
  Star,
  Gift,
  Route,
  Zap,
  Heart,
  BadgeCheck,
  Compass,
  Crown,
  Flame,
  ShieldCheck,
  ShieldX,
  Filter,
  Download,
  BarChart3,
  Eye,
  Lock,
  UserCog,
  Radio,
  Send,
  Trash2,
  Loader2,
  ArrowUpRight,
  Building,
  CircleDot,
  PieChart,
  FileBarChart,
  Megaphone,
  Calendar,
  CheckCircle,
  XCircle,
  SlidersHorizontal,
} from 'lucide-react';

/* ----------------------------- Scroll reveal hook ----------------------------- */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const els = document.querySelectorAll('.reveal');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ----------------------------- Animated counter ----------------------------- */
function useCountUp(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return value;
}

/* ----------------------------- Navbar ----------------------------- */
const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Volunteer', href: '#volunteer' },
  { label: 'Contact', href: '#contact' },
];

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('elder-shield-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('elder-shield-theme', theme);
  }, [theme]);

  return { theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) };
}

function Navbar({ onOpenDashboard, onOpenAuth }: { onOpenDashboard: () => void; onOpenAuth: (page: 'signin' | 'signup' | 'role', role?: AuthRole) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { theme, toggle } = useTheme();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      let current = '';
      for (const link of navLinks) {
        const el = document.querySelector(link.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom > 140) {
            current = link.href.slice(1);
            break;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <nav
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
          scrolled
            ? 'glass rounded-2xl shadow-lg shadow-blue-500/5'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-md opacity-60 group-hover:opacity-90 transition" />
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" strokeWidth={2.4} />
              </div>
            </div>
            <div className="leading-tight">
              <span className="block font-display font-extrabold text-lg text-slate-800 tracking-tight">
                Elder Shield
              </span>
              <span className="block text-[11px] font-semibold tracking-[0.2em] text-gradient uppercase">
                India
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${isActive ? 'text-blue-600 bg-blue-50/60' : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/60'}`}
                  >
                    {link.label}
                    {isActive && <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-500" />}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="w-10 h-10 flex items-center justify-center rounded-xl glass text-slate-700 hover:text-blue-600 transition"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => onOpenAuth('signin')}
              className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition px-4 py-2"
            >
              Sign In
            </button>
            <button
              onClick={() => onOpenAuth('signin', 'family')}
              className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition px-4 py-2"
            >
              For Family
            </button>
            <button
              onClick={() => onOpenAuth('signin', 'volunteer')}
              className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition px-4 py-2"
            >
              Volunteer
            </button>
            <button
              onClick={() => onOpenAuth('signin', 'admin')}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 transition px-4 py-2"
            >
              Admin
            </button>
            <button
              onClick={() => onOpenAuth('role')}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl glass text-slate-700"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ${
            open ? 'max-h-96 pb-4' : 'max-h-0'
          }`}
        >
          <ul className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'}`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
            <li>
              <button
                onClick={toggle}
                className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-white/60"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenAuth('signin', 'family')}
                className="block w-full text-center px-5 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-white/60"
              >
                For Family
              </button>
            </li>
            <li className="mt-1">
              <button
                onClick={() => onOpenAuth('signin', 'volunteer')}
                className="block w-full text-center px-5 py-3 rounded-xl text-sm font-semibold text-emerald-700 bg-emerald-50"
              >
                Volunteer
              </button>
            </li>
            <li className="mt-1">
              <button
                onClick={() => onOpenAuth('signin', 'admin')}
                className="block w-full text-center px-5 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100"
              >
                Admin
              </button>
            </li>
            <li className="mt-2">
              <button
                onClick={() => onOpenAuth('role')}
                className="block w-full text-center px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Get Started
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

/* ----------------------------- Hero illustration (animated SVG) ----------------------------- */
function HeroIllustration() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Glow */}
      <div className="absolute -inset-6 bg-gradient-to-br from-blue-300/40 via-cyan-200/30 to-purple-300/40 rounded-[3rem] blur-3xl" />

      {/* Main card */}
      <div className="relative glass rounded-[2.5rem] p-6 sm:p-8 shadow-2xl shadow-blue-500/10">
        <svg
          viewBox="0 0 400 360"
          className="w-full h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="g-sky" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#dbeafe" />
              <stop offset="100%" stopColor="#ede9fe" />
            </linearGradient>
            <linearGradient id="g-blue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="g-green" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="g-purple" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="g-cyan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
            <linearGradient id="g-skin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>

          {/* Background rounded scene */}
          <rect x="20" y="20" width="360" height="320" rx="32" fill="url(#g-sky)" opacity="0.6" />

          {/* Sun / circle accent */}
          <circle cx="330" cy="60" r="22" fill="#fbbf24" opacity="0.5" className="animate-float-slow" />
          <circle cx="60" cy="70" r="14" fill="#22d3ee" opacity="0.4" className="animate-float-medium" />

          {/* Ground */}
          <path d="M40 280 Q200 250 360 280 L360 340 L40 340 Z" fill="#dcfce7" opacity="0.7" />

          {/* Heart pulse line */}
          <path
            d="M40 150 L90 150 L105 120 L120 180 L138 110 L155 150 L360 150"
            stroke="url(#g-blue)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="600"
            strokeDashoffset="600"
            className="[animation:draw-line_3s_ease-out_0.5s_forwards]"
          />

          {/* Grandfather */}
          <g className="animate-float-medium" style={{ transformOrigin: '130px 240px' }}>
            {/* body */}
            <path d="M100 250 Q100 210 130 210 Q160 210 160 250 L160 300 L100 300 Z" fill="url(#g-blue)" />
            {/* head */}
            <circle cx="130" cy="190" r="22" fill="url(#g-skin)" />
            {/* glasses */}
            <circle cx="122" cy="188" r="6" stroke="#1e3a8a" strokeWidth="2" fill="none" />
            <circle cx="138" cy="188" r="6" stroke="#1e3a8a" strokeWidth="2" fill="none" />
            <line x1="128" y1="188" x2="132" y2="188" stroke="#1e3a8a" strokeWidth="2" />
            {/* hair */}
            <path d="M112 178 Q130 165 148 178 Q148 170 130 168 Q112 170 112 178 Z" fill="#e5e7eb" />
            {/* smile */}
            <path d="M124 198 Q130 203 136 198" stroke="#92400e" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* cane */}
            <line x1="165" y1="250" x2="172" y2="310" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
            <circle cx="172" cy="312" r="4" fill="#92400e" />
          </g>

          {/* Grandmother */}
          <g className="animate-float-slow" style={{ transformOrigin: '230px 240px' }}>
            {/* saree */}
            <path d="M200 250 Q200 205 230 205 Q260 205 260 250 L262 300 L198 300 Z" fill="url(#g-purple)" />
            {/* head */}
            <circle cx="230" cy="188" r="21" fill="url(#g-skin)" />
            {/* hair bun */}
            <circle cx="230" cy="168" r="9" fill="#4b5563" />
            <path d="M212 180 Q230 165 248 180 Q248 172 230 170 Q212 172 212 180 Z" fill="#4b5563" />
            {/* bindi */}
            <circle cx="230" cy="184" r="2.5" fill="#dc2626" />
            {/* smile */}
            <path d="M224 196 Q230 200 236 196" stroke="#92400e" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* eyes */}
            <circle cx="223" cy="188" r="1.8" fill="#1e3a8a" />
            <circle cx="237" cy="188" r="1.8" fill="#1e3a8a" />
          </g>

          {/* Young family member */}
          <g className="animate-float-fast" style={{ transformOrigin: '320px 250px' }}>
            <path d="M298 255 Q298 225 320 225 Q342 225 342 255 L342 295 L298 295 Z" fill="url(#g-green)" />
            <circle cx="320" cy="210" r="17" fill="url(#g-skin)" />
            <path d="M306 200 Q320 188 334 200 Q334 192 320 190 Q306 192 306 200 Z" fill="#1f2937" />
            <path d="M314 214 Q320 218 326 214" stroke="#92400e" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="315" cy="208" r="1.6" fill="#1e3a8a" />
            <circle cx="325" cy="208" r="1.6" fill="#1e3a8a" />
          </g>

          {/* Child */}
          <g className="animate-bounce-soft" style={{ transformOrigin: '50px 290px' }}>
            <path d="M35 300 Q35 282 50 282 Q65 282 65 300 L65 320 L35 320 Z" fill="url(#g-cyan)" />
            <circle cx="50" cy="272" r="12" fill="url(#g-skin)" />
            <path d="M40 266 Q50 258 60 266 Q60 260 50 258 Q40 260 40 266 Z" fill="#1f2937" />
            <path d="M45 276 Q50 280 55 276" stroke="#92400e" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          </g>

          {/* Floating hearts */}
          <g className="animate-float-medium">
            <path
              d="M180 130 C175 122, 165 122, 165 132 C165 140, 180 150, 180 150 C180 150, 195 140, 195 132 C195 122, 185 122, 180 130 Z"
              fill="#f472b6"
              opacity="0.85"
            />
          </g>
          <g className="animate-float-slow">
            <path
              d="M280 110 C277 105, 270 105, 270 112 C270 117, 280 124, 280 124 C280 124, 290 117, 290 112 C290 105, 283 105, 280 110 Z"
              fill="#f9a8d4"
              opacity="0.7"
            />
          </g>
        </svg>

        {/* Floating mini cards */}
        <div className="absolute -left-4 top-10 glass rounded-2xl px-4 py-3 shadow-xl animate-float-medium hidden sm:flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
            <HeartPulse className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500 font-medium">Health Monitor</p>
            <p className="text-sm font-bold text-slate-800">Active</p>
          </div>
        </div>

        <div className="absolute -right-4 bottom-16 glass rounded-2xl px-4 py-3 shadow-xl animate-float-slow hidden sm:flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[11px] text-slate-500 font-medium">Emergency</p>
            <p className="text-sm font-bold text-slate-800">24/7 Ready</p>
          </div>
        </div>

        <div className="absolute -right-2 top-2 glass rounded-2xl px-3 py-2 shadow-lg animate-float-fast hidden sm:flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
            <Stethoscope className="w-4 h-4 text-white" />
          </div>
          <p className="text-xs font-bold text-slate-800">Doctor Online</p>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Stats ----------------------------- */
const stats = [
  { icon: Users, label: 'Senior Citizens Protected', value: 12500, suffix: '+', gradient: 'from-blue-500 to-cyan-500' },
  { icon: HandHeart, label: 'Active Volunteers', value: 8400, suffix: '+', gradient: 'from-emerald-500 to-teal-500' },
  { icon: Stethoscope, label: 'Verified Doctors', value: 1200, suffix: '+', gradient: 'from-purple-500 to-indigo-500' },
  { icon: Phone, label: 'Emergency Response', value: 98, suffix: '%', gradient: 'from-rose-500 to-pink-500' },
];

function StatsSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => {
          const count = useCountUp(stat.value, 2200, inView);
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`reveal reveal-delay-${i + 1} group relative glass rounded-3xl p-5 sm:p-6 text-center hover:-translate-y-1.5 transition-all duration-500 shadow-lg shadow-blue-500/5 hover:shadow-2xl hover:shadow-blue-500/10`}
            >
              <div
                className={`mx-auto mb-4 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition`}
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.2} />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-slate-800 tracking-tight">
                {count.toLocaleString('en-IN')}
                <span className="text-gradient">{stat.suffix}</span>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm font-medium text-slate-500 leading-snug">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------- Hero ----------------------------- */
function Hero({ onGetStarted }: { onGetStarted: () => void }) {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <section id="home" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left */}
          <div className="text-center lg:text-left">
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold text-slate-700 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-500" />
              India's trusted senior care network
            </div>

            <h1 className="reveal reveal-delay-1 mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.1] tracking-tight text-slate-900">
              Protecting India's{' '}
              <span className="text-gradient gradient-animate">Senior Citizens</span>{' '}
              with Care, Technology &amp; Community.
            </h1>

            <p className="reveal reveal-delay-2 mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              A national platform connecting elders with families, volunteers,
              doctors, and emergency services — so every senior feels safe,
              supported, and never alone.
            </p>

            <div className="reveal reveal-delay-3 mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onGetStarted}
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-600 to-purple-600 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              <button
                onClick={() => scrollTo('#volunteer')}
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold text-slate-800 glass shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all"
              >
                <HandHeart className="w-5 h-5 text-emerald-600" />
                Become a Volunteer
              </button>
            </div>

            {/* trust row */}
            <div className="reveal reveal-delay-4 mt-10 flex items-center gap-6 justify-center lg:justify-start text-slate-500">
              <div className="flex -space-x-2">
                {['from-blue-500 to-cyan-500', 'from-emerald-500 to-teal-500', 'from-purple-500 to-indigo-500', 'from-rose-500 to-pink-500'].map((g, i) => (
                  <div key={i} className={`w-9 h-9 rounded-full bg-gradient-to-br ${g} ring-2 ring-white flex items-center justify-center`}>
                    <Users className="w-4 h-4 text-white" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium">
                <span className="font-bold text-slate-800">20,000+</span> members &amp; growing
              </p>
            </div>
          </div>

          {/* Right - illustration */}
          <div className="reveal reveal-delay-2">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Background shapes ----------------------------- */
function BackgroundShapes() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Soft gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50/50 to-purple-50" />

      {/* Big blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-300/40 to-cyan-300/30 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/3 -right-32 w-[28rem] h-[28rem] bg-gradient-to-br from-purple-300/30 to-pink-300/20 rounded-full blur-3xl animate-float-medium" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-br from-emerald-300/30 to-teal-300/20 rounded-full blur-3xl animate-float-fast" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Floating geometric shapes */}
      <div className="absolute top-32 left-1/2 w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400/30 to-blue-400/20 rotate-12 animate-float-slow" />
      <div className="absolute top-1/2 left-10 w-14 h-14 rounded-full bg-gradient-to-br from-purple-400/30 to-indigo-400/20 animate-float-medium" />
      <div className="absolute bottom-40 right-1/4 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400/30 to-teal-400/20 -rotate-6 animate-float-fast" />
    </div>
  );
}

/* ----------------------------- Features ----------------------------- */
const features = [
  {
    icon: Siren,
    title: 'Emergency SOS',
    desc: 'One-tap SOS instantly alerts family, volunteers & nearest emergency services.',
    gradient: 'from-rose-500 to-red-600',
    glow: 'shadow-rose-500/40',
  },
  {
    icon: Mic,
    title: 'AI Voice Assistant',
    desc: 'Conversational AI helper in regional languages for reminders, queries & companionship.',
    gradient: 'from-violet-500 to-purple-600',
    glow: 'shadow-purple-500/40',
  },
  {
    icon: Pill,
    title: 'Medicine Reminder',
    desc: 'Smart pill reminders with dosage tracking so no medication is ever missed.',
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/40',
  },
  {
    icon: MapPin,
    title: 'Live GPS Tracking',
    desc: 'Real-time location sharing with family for safety during outings & emergencies.',
    gradient: 'from-blue-500 to-cyan-600',
    glow: 'shadow-blue-500/40',
  },
  {
    icon: FileText,
    title: 'Health Records',
    desc: 'Securely store medical history, prescriptions & reports accessible anytime.',
    gradient: 'from-indigo-500 to-blue-600',
    glow: 'shadow-indigo-500/40',
  },
  {
    icon: CalendarClock,
    title: 'Doctor Appointment',
    desc: 'Book verified doctors nearby with instant confirmation & reminders.',
    gradient: 'from-cyan-500 to-sky-600',
    glow: 'shadow-cyan-500/40',
  },
  {
    icon: Video,
    title: 'Video Calling',
    desc: 'Face-to-face video calls with family & doctors — simple, one-tap, secure.',
    gradient: 'from-fuchsia-500 to-pink-600',
    glow: 'shadow-fuchsia-500/40',
  },
  {
    icon: Contact,
    title: 'Emergency Contacts',
    desc: 'A prioritized contact circle always reachable with a single tap.',
    gradient: 'from-amber-500 to-orange-600',
    glow: 'shadow-amber-500/40',
  },
  {
    icon: HandHeart,
    title: 'Volunteer Assistance',
    desc: 'Trained nearby volunteers ready to help with errands, visits & support.',
    gradient: 'from-teal-500 to-emerald-600',
    glow: 'shadow-teal-500/40',
  },
  {
    icon: ClipboardCheck,
    title: 'Daily Wellness Check',
    desc: 'Automated daily check-ins tracking mood, vitals & overall wellbeing.',
    gradient: 'from-green-500 to-lime-600',
    glow: 'shadow-green-500/40',
  },
  {
    icon: ShieldAlert,
    title: 'Scam Protection',
    desc: 'AI-powered fraud & scam detection shielding elders from financial threats.',
    gradient: 'from-red-500 to-rose-600',
    glow: 'shadow-red-500/40',
  },
  {
    icon: Languages,
    title: 'Multilingual Support',
    desc: 'Full platform experience in 12+ Indian regional languages & dialects.',
    gradient: 'from-sky-500 to-indigo-600',
    glow: 'shadow-sky-500/40',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[number]; index: number }) {
  const Icon = feature.icon;
  return (
    <div
      className={`reveal reveal-delay-${(index % 4) + 1} group relative glass rounded-3xl p-6 sm:p-7 hover:-translate-y-2 transition-all duration-500 shadow-lg shadow-blue-500/5 hover:shadow-2xl ${feature.glow} overflow-hidden`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500`}
      />
      <div
        className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${feature.gradient} opacity-10 blur-2xl group-hover:opacity-25 group-hover:scale-125 transition-all duration-500`}
      />

      <div className="relative">
        <div
          className={`inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} items-center justify-center shadow-lg ${feature.glow} group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500`}
        >
          <Icon className="w-7 h-7 text-white" strokeWidth={2.2} />
        </div>

        <h3 className="mt-5 text-lg font-bold font-display text-slate-800 group-hover:text-slate-900 transition">
          {feature.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 group-hover:text-slate-600 transition">
          {feature.desc}
        </p>

        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </div>
      </div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold text-slate-700 shadow-sm">
            <Activity className="w-4 h-4 text-purple-500" />
            Everything they need, in one place
          </div>
          <h2 className="reveal reveal-delay-1 mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            Powerful Features,{' '}
            <span className="text-gradient gradient-animate">Built with Love</span>
          </h2>
          <p className="reveal reveal-delay-2 mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            Twelve thoughtfully crafted tools that keep India's seniors safe,
            healthy, and connected — every single day.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- About ----------------------------- */
const aboutPoints = [
  'Nationwide network of trained volunteers & verified doctors',
  'Privacy-first health records with bank-grade encryption',
  'Available in 12+ regional Indian languages',
  '24/7 emergency response with real-time GPS coordination',
];

function AboutSection() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left visual */}
          <div className="reveal relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-300/30 via-purple-300/20 to-emerald-300/30 rounded-[3rem] blur-2xl" />
            <div className="relative glass rounded-[2.5rem] p-8 shadow-2xl shadow-blue-500/10">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Target className="w-7 h-7 text-white" strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-800">Our Mission</h3>
                  <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
                    To ensure every senior citizen in India lives with dignity,
                    safety, and the support of a caring community.
                  </p>
                </div>
              </div>

              <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              <div className="flex items-start gap-4">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Globe2 className="w-7 h-7 text-white" strokeWidth={2.2} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-800">Our Vision</h3>
                  <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
                    A future where technology bridges generations and no elder
                    ever feels isolated or unprotected.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: Building2, label: '28 States', grad: 'from-blue-500 to-indigo-500' },
                  { icon: HeartHandshake, label: '250+ Cities', grad: 'from-emerald-500 to-teal-500' },
                  { icon: Award, label: 'ISO Certified', grad: 'from-purple-500 to-fuchsia-500' },
                ].map((m) => {
                  const I = m.icon;
                  return (
                    <div key={m.label} className="text-center p-3 rounded-2xl bg-white/40 border border-white/50">
                      <div className={`mx-auto w-10 h-10 rounded-xl bg-gradient-to-br ${m.grad} flex items-center justify-center mb-2`}>
                        <I className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-xs font-bold text-slate-700">{m.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="reveal reveal-delay-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold text-slate-700 shadow-sm">
              <HeartHandshake className="w-4 h-4 text-emerald-500" />
              Who we are
            </div>
            <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900 leading-tight">
              A movement to protect{' '}
              <span className="text-gradient gradient-animate">India's elders</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
              Elder Shield India is a national platform dedicated to safeguarding
              senior citizens by connecting them with families, volunteers,
              doctors, and emergency services. We blend compassionate human
              support with modern technology so that help is always just a tap
              away — whether it's a daily wellness check or a critical emergency.
            </p>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              From bustling metros to remote villages, our growing network ensures
              that dignity, safety, and care reach every corner of the country.
            </p>

            <ul className="mt-7 space-y-3">
              {aboutPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </span>
                  <span className="text-sm sm:text-base text-slate-600 font-medium">{point}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => { const el = document.querySelector('#contact'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
              className="group mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Get in touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- How It Works ----------------------------- */
const steps = [
  {
    icon: UserPlus,
    title: 'Register',
    desc: 'Create a free account in minutes with basic details and a verified phone number.',
    gradient: 'from-blue-500 to-cyan-600',
    glow: 'shadow-blue-500/40',
  },
  {
    icon: UsersRound,
    title: 'Connect Family',
    desc: 'Add family members and trusted contacts to your care circle instantly.',
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/40',
  },
  {
    icon: HeartPulse,
    title: 'Add Health Details',
    desc: 'Securely store medical history, conditions, allergies & prescriptions.',
    gradient: 'from-purple-500 to-indigo-600',
    glow: 'shadow-purple-500/40',
  },
  {
    icon: CalendarCheck,
    title: 'Daily Check-in',
    desc: 'Automated daily wellness prompts track mood, vitals & medication.',
    gradient: 'from-cyan-500 to-sky-600',
    glow: 'shadow-cyan-500/40',
  },
  {
    icon: AlertTriangle,
    title: 'Emergency Detection',
    desc: 'AI monitors patterns & SOS signals to detect emergencies in real time.',
    gradient: 'from-amber-500 to-orange-600',
    glow: 'shadow-amber-500/40',
  },
  {
    icon: BellRing,
    title: 'Family & Volunteers Alerted',
    desc: 'Instant alerts with live location sent to family, volunteers & doctors.',
    gradient: 'from-rose-500 to-red-600',
    glow: 'shadow-rose-500/40',
  },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold text-slate-700 shadow-sm">
            <Activity className="w-4 h-4 text-blue-500" />
            Simple & seamless
          </div>
          <h2 className="reveal reveal-delay-1 mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            How It{' '}
            <span className="text-gradient gradient-animate">Works</span>
          </h2>
          <p className="reveal reveal-delay-2 mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            Six thoughtful steps from sign-up to emergency response — designed
            to be effortless for seniors and reassuring for families.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-rose-400 rounded-full opacity-30" />

          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={step.title}
                  className={`reveal reveal-delay-${(i % 4) + 1} relative lg:flex lg:items-center lg:gap-8 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className="lg:w-[calc(50%-3rem)]">
                    <div className={`group relative glass rounded-3xl p-6 sm:p-7 hover:-translate-y-1.5 transition-all duration-500 shadow-lg shadow-blue-500/5 hover:shadow-2xl ${step.glow}`}>
                      <div
                        className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${step.gradient} opacity-10 blur-2xl group-hover:opacity-25 group-hover:scale-125 transition-all duration-500`}
                      />
                      <div className="relative flex items-start gap-4">
                        <div
                          className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg ${step.glow} group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500`}
                        >
                          <Icon className="w-7 h-7 text-white" strokeWidth={2.2} />
                        </div>
                        <div>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-br ${step.gradient} text-white`}>
                            Step {i + 1}
                          </span>
                          <h3 className="mt-2 text-lg font-bold font-display text-slate-800">{step.title}</h3>
                          <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex items-center justify-center w-16 shrink-0 relative z-10">
                    <div className={`relative w-5 h-5 rounded-full bg-gradient-to-br ${step.gradient} ring-4 ring-white shadow-lg ${step.glow}`}>
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} pulse-ring`} />
                    </div>
                  </div>

                  <div className="hidden lg:block lg:w-[calc(50%-3rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Impact ----------------------------- */
const impactStats = [
  { icon: Users, label: 'Lives Touched', value: 125000, suffix: '+', gradient: 'from-blue-500 to-cyan-500' },
  { icon: HandHeart, label: 'Volunteers Onboard', value: 8400, suffix: '+', gradient: 'from-emerald-500 to-teal-500' },
  { icon: Stethoscope, label: 'Doctors Network', value: 1200, suffix: '+', gradient: 'from-purple-500 to-indigo-500' },
  { icon: Phone, label: 'Emergencies Resolved', value: 15600, suffix: '+', gradient: 'from-rose-500 to-pink-500' },
  { icon: Building2, label: 'Cities Covered', value: 250, suffix: '+', gradient: 'from-amber-500 to-orange-500' },
  { icon: TrendingUp, label: 'Response Rate', value: 98, suffix: '%', gradient: 'from-green-500 to-lime-500' },
];

function ImpactSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="impact" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold text-slate-700 shadow-sm">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            Real change, real numbers
          </div>
          <h2 className="reveal reveal-delay-1 mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            Our{' '}
            <span className="text-gradient gradient-animate">Impact</span> Across India
          </h2>
          <p className="reveal reveal-delay-2 mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            Every number represents a life made safer, a family reassured, and a
            community strengthened.
          </p>
        </div>

        <div ref={ref} className="mt-14 grid grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {impactStats.map((stat, i) => {
            const count = useCountUp(stat.value, 2400, inView);
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`reveal reveal-delay-${(i % 3) + 1} group relative glass rounded-3xl p-6 sm:p-8 text-center hover:-translate-y-1.5 transition-all duration-500 shadow-lg shadow-blue-500/5 hover:shadow-2xl`}
              >
                <div
                  className={`absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 blur-2xl group-hover:opacity-25 transition`}
                />
                <div className="relative">
                  <div
                    className={`mx-auto mb-4 w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition`}
                  >
                    <Icon className="w-7 h-7 text-white" strokeWidth={2.2} />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold font-display text-slate-800 tracking-tight">
                    {count.toLocaleString('en-IN')}
                    <span className="text-gradient">{stat.suffix}</span>
                  </div>
                  <p className="mt-1.5 text-sm font-medium text-slate-500">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Testimonials ----------------------------- */
const testimonials = [
  { name: 'Lakshmi Rao', role: 'Elder · Bengaluru', avatar: 'L', color: 'from-rose-400 to-pink-500', text: 'Elder Shield gave me my independence back. The SOS button brought help in minutes when I fell last month. I feel safe even when my children are far away.' },
  { name: 'Arjun Kumar', role: 'Volunteer · Bengaluru', avatar: 'A', color: 'from-blue-400 to-cyan-500', text: 'Volunteering through Elder Shield is incredibly rewarding. I have helped 28 elders in my neighborhood and earned rewards while making a real difference.' },
  { name: 'Meera Krishnan', role: 'Family · Chennai', avatar: 'M', color: 'from-purple-400 to-fuchsia-500', text: 'Living abroad, I worried constantly about my mother. Now I can see her health updates, medicine reminders, and daily check-ins in real time. Peace of mind at last.' },
  { name: 'Dr. Vikram Singh', role: 'Doctor Network · Pune', avatar: 'V', color: 'from-emerald-400 to-teal-500', text: 'The platform connects elders to verified doctors seamlessly. Telemedicine and visit pickups have improved adherence for my elderly patients significantly.' },
  { name: 'Sunita Sharma', role: 'Elder · Bengaluru', avatar: 'S', color: 'from-amber-400 to-orange-500', text: 'The voice assistant is a blessing. I just speak in Kannada and it sets my reminders, calls my son, and even reads me the news. Technology that finally understands me.' },
];

function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const go = (dir: number) => setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold text-slate-700 shadow-sm">
            <Quote className="w-4 h-4 text-blue-500" />
            Stories from our community
          </div>
          <h2 className="reveal reveal-delay-1 mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            Loved by{' '}
            <span className="text-gradient gradient-animate">Families</span> Across India
          </h2>
        </div>

        <div
          className="mt-14 max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative glass rounded-3xl p-8 sm:p-12 shadow-2xl shadow-blue-500/10 overflow-hidden">
            <Quote className="absolute top-6 left-6 w-16 h-16 text-blue-100 dark:text-slate-700/40" />
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className={`shrink-0 w-14 h-14 rounded-full bg-gradient-to-br ${testimonials[index].color} flex items-center justify-center font-bold text-white text-lg shadow-lg`}>
                  {testimonials[index].avatar}
                </div>
                <div>
                  <p className="font-display font-bold text-slate-800">{testimonials[index].name}</p>
                  <p className="text-sm text-slate-500">{testimonials[index].role}</p>
                </div>
              </div>
              <p key={index} className="text-lg sm:text-xl text-slate-600 leading-relaxed animate-[fadeIn_0.5s_ease-out]">
                "{testimonials[index].text}"
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={() => go(-1)} aria-label="Previous testimonial" className="w-11 h-11 rounded-xl glass flex items-center justify-center text-slate-600 hover:text-blue-600 transition">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500' : 'w-2 bg-slate-300 dark:bg-slate-600'}`}
                />
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Next testimonial" className="w-11 h-11 rounded-xl glass flex items-center justify-center text-slate-600 hover:text-blue-600 transition">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- FAQ ----------------------------- */
const faqs = [
  { q: 'How does the SOS emergency button work?', a: 'Pressing the SOS button instantly alerts your family members, nearby verified volunteers, and our emergency response team with your live GPS location. Help typically arrives within minutes in covered cities.' },
  { q: 'Is Elder Shield free to use?', a: 'Yes. Core features for elders — SOS, medicine reminders, daily check-ins, and family connectivity — are completely free. Premium add-ons like telemedicine consultations may have nominal fees.' },
  { q: 'How are volunteers verified?', a: 'Every volunteer undergoes a three-step verification: government ID proof, address verification, and a background check. Only after admin approval can they accept help requests. You can see the verification badge on every volunteer profile.' },
  { q: 'Which cities are currently covered?', a: 'Elder Shield is active in 250+ cities across India including Bengaluru, Chennai, Mumbai, Delhi, Pune, Kochi, and Hyderabad. We are expanding to new cities every month.' },
  { q: 'Can my family monitor my health remotely?', a: 'Absolutely. Family members get a dedicated dashboard with real-time health metrics, medicine adherence, daily check-in status, and emergency alerts — perfect for families living abroad or in another city.' },
  { q: 'Does the voice assistant support regional languages?', a: 'Yes. The voice assistant understands and speaks Hindi, Kannada, Tamil, Telugu, Marathi, Bengali, and English. You can set your preferred language in the profile settings.' },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold text-slate-700 shadow-sm">
            <HelpCircle className="w-4 h-4 text-blue-500" />
            Questions answered
          </div>
          <h2 className="reveal reveal-delay-1 mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            Frequently Asked{' '}
            <span className="text-gradient gradient-animate">Questions</span>
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="glass rounded-2xl overflow-hidden shadow-lg shadow-blue-500/5">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-slate-800">{f.q}</span>
                  <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition ${isOpen ? 'bg-blue-500 text-white rotate-45' : 'bg-white/60 text-slate-500'}`}>
                    <Plus className="w-4 h-4" />
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-slate-600 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Volunteer Registration ----------------------------- */
const volunteerSkills = ['Medicine Delivery', 'Grocery Help', 'Doctor Visit Pickup', 'Daily Wellness Check', 'Emergency Response', 'Companionship'];

function VolunteerRegistrationSection() {
  const toast = useToast();
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', age: '', skills: [] as string[], consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid 10-digit Indian mobile';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.age) e.age = 'Age is required';
    else if (Number(form.age) < 18) e.age = 'Must be 18 or older';
    if (form.skills.length === 0) e.skills = 'Select at least one skill';
    if (!form.consent) e.consent = 'You must consent to background verification';
    return e;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setLoading(true);
      setTimeout(() => { setLoading(false); setSubmitted(true); toast('Volunteer application submitted!', 'success'); }, 1200);
    }
  };

  const toggleSkill = (s: string) => {
    setForm((f) => ({ ...f, skills: f.skills.includes(s) ? f.skills.filter((x) => x !== s) : [...f.skills, s] }));
  };

  const fieldClass = (key: string) =>
    `w-full px-4 py-3 rounded-xl bg-white/60 border text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition ${errors[key] ? 'border-rose-300 focus:ring-rose-400' : 'border-white/60 focus:ring-blue-400'}`;

  if (submitted) {
    return (
      <section id="volunteer" className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-10 text-center shadow-2xl shadow-blue-500/10">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg mb-5">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-display font-bold text-slate-800">Application Received!</h3>
            <p className="mt-3 text-slate-600">Thank you, {form.name}. Our team will verify your details and background check within 3–5 business days. You will receive an email at {form.email} once approved.</p>
            <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', city: '', age: '', skills: [], consent: false }); toast('Ready for another application', 'info'); }} className="mt-6 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md">
              Submit another
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="volunteer" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold text-slate-700 shadow-sm">
            <HandHeart className="w-4 h-4 text-emerald-500" />
            Join the movement
          </div>
          <h2 className="reveal reveal-delay-1 mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            Become a{' '}
            <span className="text-gradient gradient-animate">Volunteer</span>
          </h2>
          <p className="reveal reveal-delay-2 mt-5 text-slate-600">Help elders in your neighborhood. A few hours a week can save a life.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-12 glass rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-500/10 space-y-5" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={fieldClass('name')} placeholder="Your full name" />
              {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={fieldClass('email')} placeholder="you@example.com" />
              {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mobile Number</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={fieldClass('phone')} placeholder="98xxxxxxxx" />
              {errors.phone && <p className="mt-1 text-xs text-rose-500">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">City</label>
              <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={fieldClass('city')} placeholder="Your city" />
              {errors.city && <p className="mt-1 text-xs text-rose-500">{errors.city}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Age</label>
            <input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className={fieldClass('age')} placeholder="Must be 18+" />
            {errors.age && <p className="mt-1 text-xs text-rose-500">{errors.age}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Skills (select all that apply)</label>
            <div className="flex flex-wrap gap-2">
              {volunteerSkills.map((s) => {
                const sel = form.skills.includes(s);
                return (
                  <button key={s} type="button" onClick={() => toggleSkill(s)} className={`text-xs font-semibold px-3.5 py-2 rounded-full transition ${sel ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md' : 'bg-white/60 text-slate-600 border border-white/60'}`}>
                    {s}
                  </button>
                );
              })}
            </div>
            {errors.skills && <p className="mt-1 text-xs text-rose-500">{errors.skills}</p>}
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1 w-5 h-5 rounded accent-blue-600" />
            <span className="text-sm text-slate-600">I consent to a background verification check and agree to Elder Shield's volunteer code of conduct.</span>
          </label>
          {errors.consent && <p className="text-xs text-rose-500">{errors.consent}</p>}

          <button type="submit" disabled={loading} className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all ${loading ? 'opacity-70 cursor-wait' : ''}`}>
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />} {loading ? 'Submitting…' : 'Submit Application'}
          </button>
        </form>
      </div>
    </section>
  );
}

/* ----------------------------- Emergency Helpline ----------------------------- */
function EmergencyHelplineSection() {
  const helplines = [
    { label: 'Elder Shield Emergency', number: '1800-200-1234', desc: '24x7 SOS response & volunteer dispatch', icon: Siren, color: 'from-rose-500 to-red-600' },
    { label: 'Elder Helpline (Govt)', number: '14567', desc: 'National toll-free senior helpline', icon: Phone, color: 'from-blue-500 to-cyan-500' },
    { label: 'Ambulance', number: '108', desc: 'Free emergency ambulance service', icon: Truck, color: 'from-amber-500 to-orange-500' },
    { label: 'Police', number: '100', desc: 'Law enforcement emergency', icon: Shield, color: 'from-slate-600 to-slate-800' },
  ];

  return (
    <section id="helpline" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold text-rose-700 shadow-sm">
            <Siren className="w-4 h-4 text-rose-500" />
            We are here, 24x7
          </div>
          <h2 className="reveal reveal-delay-1 mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            Emergency{' '}
            <span className="text-gradient gradient-animate">Helpline</span> Numbers
          </h2>
          <p className="reveal reveal-delay-2 mt-5 text-slate-600">Save these numbers. Share them with your loved ones. Help is always one call away.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {helplines.map((h) => {
            const Icon = h.icon;
            return (
              <a
                key={h.label}
                href={`tel:${h.number.replace(/[-\s]/g, '')}`}
                className="group glass rounded-3xl p-6 shadow-lg shadow-blue-500/5 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-500"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${h.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition`}>
                  <Icon className="w-7 h-7 text-white" strokeWidth={2.2} />
                </div>
                <p className="mt-4 font-display font-bold text-slate-800">{h.label}</p>
                <p className="mt-1 text-2xl font-extrabold text-gradient">{h.number}</p>
                <p className="mt-1 text-xs text-slate-500">{h.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition">
                  Tap to call <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Contact ----------------------------- */
function ContactSection() {
  const toast = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.name.trim()) err.name = 'Name is required';
    if (!form.email.trim()) err.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Enter a valid email';
    if (!form.message.trim()) err.message = 'Message is required';
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false); setSent(true); toast('Message sent! We will get back to you soon.', 'success');
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setSent(false), 4000);
      }, 1200);
    }
  };

  const fieldClass = (key: string) =>
    `w-full px-4 py-3 rounded-xl bg-white/60 border text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition ${errors[key] ? 'border-rose-300 focus:ring-rose-400' : 'border-white/60 focus:ring-blue-400'}`;

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'care@eldershield.in', href: 'mailto:care@eldershield.in', color: 'from-blue-500 to-cyan-500' },
    { icon: Phone, label: 'Phone', value: '1800-200-1234', href: 'tel:18002001234', color: 'from-emerald-500 to-teal-500' },
    { icon: MapPin, label: 'Address', value: '4th Floor, Jayanagar 4th Block, Bengaluru 560011', href: '#', color: 'from-purple-500 to-fuchsia-500' },
  ];

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold text-slate-700 shadow-sm">
            <Mail className="w-4 h-4 text-blue-500" />
            Get in touch
          </div>
          <h2 className="reveal reveal-delay-1 mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            Contact{' '}
            <span className="text-gradient gradient-animate">Us</span>
          </h2>
          <p className="reveal reveal-delay-2 mt-5 text-slate-600">Have a question, partnership idea, or need help? Reach out and our team will respond within 24 hours.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div className="space-y-3">
              {contactInfo.map((c) => {
                const Icon = c.icon;
                return (
                  <a key={c.label} href={c.href} className="flex items-center gap-4 glass rounded-2xl p-4 shadow-lg shadow-blue-500/5 hover:-translate-y-0.5 transition-all">
                    <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center shadow-md`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-400">{c.label}</p>
                      <p className="text-sm font-bold text-slate-700 truncate">{c.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
            <div className="glass rounded-2xl overflow-hidden shadow-lg shadow-blue-500/5 border border-white/50 h-56">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 via-cyan-50 to-emerald-50 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <div className="relative text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg mb-2">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-bold text-slate-700">Elder Shield HQ</p>
                  <p className="text-xs text-slate-500">Jayanagar, Bengaluru</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-500/10 space-y-4" noValidate>
            {sent && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-bold text-emerald-700">Message sent! We will get back to you soon.</span>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={fieldClass('name')} placeholder="Full name" />
              {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={fieldClass('email')} placeholder="you@example.com" />
              {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message</label>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className={`${fieldClass('message')} resize-none`} placeholder="How can we help you?" />
              {errors.message && <p className="mt-1 text-xs text-rose-500">{errors.message}</p>}
            </div>
            <button type="submit" disabled={loading} className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all ${loading ? 'opacity-70 cursor-wait' : ''}`}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />} {loading ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Newsletter ----------------------------- */
function NewsletterSection() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError('Email is required'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Enter a valid email'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false); setDone(true); toast('Subscribed! Check your inbox to confirm.', 'success');
      setEmail('');
      setTimeout(() => setDone(false), 4000);
    }, 1000);
  };

  return (
    <section id="newsletter" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden glass rounded-3xl p-8 sm:p-12 shadow-2xl shadow-blue-500/10 text-center">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 opacity-10 blur-3xl" />
          <div className="relative">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg mb-4">
              <Mail className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">Stay Updated</h2>
            <p className="mt-3 text-slate-600 max-w-md mx-auto">Subscribe to our newsletter for community stories, new city launches, and elder care tips.</p>
            {done ? (
              <div className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-bold text-emerald-700">Subscribed! Check your inbox to confirm.</span>
              </div>
            ) : (
              <form onSubmit={subscribe} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" noValidate>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-xl bg-white/60 border border-white/60 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <button type="submit" disabled={loading} className={`px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all whitespace-nowrap flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-wait' : ''}`}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null} {loading ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
            )}
            {error && <p className="mt-2 text-xs text-rose-500">{error}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Dashboard ----------------------------- */
const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'reminders', label: 'Reminders', icon: Pill },
  { id: 'visits', label: 'Visits', icon: CalendarDays },
  { id: 'health', label: 'Health', icon: HeartPulse },
  { id: 'profile', label: 'Profile', icon: UserCircle },
];

const medicineReminders = [
  { name: 'Metformin', dose: '500mg', time: '8:00 AM', taken: true, color: 'from-blue-500 to-cyan-500' },
  { name: 'Amlodipine', dose: '5mg', time: '8:00 AM', taken: true, color: 'from-emerald-500 to-teal-500' },
  { name: 'Vitamin D3', dose: '60K IU', time: '12:30 PM', taken: false, color: 'from-amber-500 to-orange-500' },
  { name: 'Aspirin', dose: '75mg', time: '6:00 PM', taken: false, color: 'from-rose-500 to-pink-500' },
];

const upcomingVisits = [
  { doctor: 'Dr. Anjali Rao', specialty: 'Cardiologist', date: 'Tomorrow, 10:30 AM', location: 'Apollo Clinic', gradient: 'from-purple-500 to-indigo-500' },
  { doctor: 'Dr. Vikram Singh', specialty: 'General Physician', date: 'Sat, 4:00 PM', location: 'City Hospital', gradient: 'from-cyan-500 to-blue-500' },
];

const emergencyContacts = [
  { name: 'Rahul (Son)', phone: '+91 98xxx xxx12', gradient: 'from-blue-500 to-cyan-500' },
  { name: 'Priya (Daughter)', phone: '+91 98xxx xxx45', gradient: 'from-emerald-500 to-teal-500' },
  { name: 'Dr. Anjali Rao', phone: '+91 98xxx xxx78', gradient: 'from-purple-500 to-indigo-500' },
  { name: 'Volunteer (Asha)', phone: '+91 98xxx xxx90', gradient: 'from-rose-500 to-pink-500' },
];

const healthMetrics = [
  { label: 'Heart Rate', value: '72', unit: 'bpm', icon: HeartPulse, gradient: 'from-rose-500 to-red-500', status: 'Normal' },
  { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', icon: Activity, gradient: 'from-blue-500 to-cyan-500', status: 'Normal' },
  { label: 'Blood Sugar', value: '110', unit: 'mg/dL', icon: Droplet, gradient: 'from-purple-500 to-indigo-500', status: 'Normal' },
  { label: 'Temperature', value: '98.4', unit: '°F', icon: Thermometer, gradient: 'from-amber-500 to-orange-500', status: 'Normal' },
];

const quotes = [
  'Every day is a new beginning. Take a deep breath and smile.',
  'You are loved, you are valued, and you are never alone.',
  'Age is merely the number of years the world has been enjoying you.',
  'The greatest wealth is health, and the greatest gift is care.',
];

function Dashboard({ onExit }: { onExit: () => void }) {
  const toast = useToast();
  const [activeNav, setActiveNav] = useState('home');
  const [sosActive, setSosActive] = useState(false);
  const [voiceListening, setVoiceListening] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [checkInDone, setCheckInDone] = useState(false);
  const [sosModal, setSosModal] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(5);
  const [medicines, setMedicines] = useState(medicineReminders);
  const [addMedModal, setAddMedModal] = useState(false);
  const [newMed, setNewMed] = useState({ name: '', dose: '', time: '' });
  const [healthModal, setHealthModal] = useState(false);
  const [contactsModal, setContactsModal] = useState(false);
  const [voiceModal, setVoiceModal] = useState(false);
  const [visitModal, setVisitModal] = useState<null | typeof upcomingVisits[number]>(null);
  const [bookVisitModal, setBookVisitModal] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setQuoteIndex((i) => (i + 1) % quotes.length), 8000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!sosModal) return;
    setSosCountdown(5);
    const t = setInterval(() => {
      setSosCountdown((c) => {
        if (c <= 1) { clearInterval(t); return 0; }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [sosModal]);

  const confirmSOS = () => {
    setSosModal(false);
    setSosActive(true);
    toast('Emergency alert sent to family & volunteers!', 'success');
    setTimeout(() => setSosActive(false), 4000);
  };

  const triggerSOS = () => setSosModal(true);

  const markMedicine = (name: string) => {
    setMedicines((ms) => ms.map((m) => m.name === name ? { ...m, taken: true } : m));
    toast(`${name} marked as taken`, 'success');
  };

  const addMedicine = () => {
    if (!newMed.name.trim() || !newMed.dose.trim() || !newMed.time.trim()) {
      toast('Please fill all medicine fields', 'error');
      return;
    }
    setMedicines((ms) => [...ms, { ...newMed, taken: false, color: 'from-violet-500 to-purple-500' }]);
    setNewMed({ name: '', dose: '', time: '' });
    setAddMedModal(false);
    toast('Medicine reminder added', 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30 page-enter">
      <header className="sticky top-0 z-40 glass border-b border-white/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-slate-800 leading-none">Elder Shield</p>
                <p className="text-xs text-slate-400">Senior Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700">Safe & Connected</span>
              </div>
              <button onClick={onExit} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-white/60 transition">
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Exit</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/40 px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeNav === item.id;
            return (
              <button key={item.id} onClick={() => setActiveNav(item.id)} className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition ${active ? 'text-blue-600' : 'text-slate-400'}`}>
                <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
                <span className="text-[10px] font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <p className="text-sm text-slate-500">Good morning,</p>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-800">Sunita Sharma</h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl glass text-sm">
            <CalendarDays className="w-4 h-4 text-blue-500" />
            <span className="font-semibold text-slate-600">{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
          </div>
        </div>

        <div className="mb-6 flex flex-col items-center">
          <button
            onClick={triggerSOS}
            className={`relative w-44 h-44 sm:w-52 sm:h-52 rounded-full font-display font-bold text-white text-xl shadow-2xl transition-all duration-300 ${sosActive ? 'scale-110 bg-gradient-to-br from-red-600 to-rose-700 shadow-red-500/50' : 'bg-gradient-to-br from-rose-500 to-red-600 shadow-rose-500/40 hover:scale-105'}`}
          >
            {sosActive && <span className="absolute inset-0 rounded-full bg-red-500 pulse-ring" />}
            <span className="relative flex flex-col items-center gap-2">
              <Siren className="w-12 h-12" strokeWidth={2.2} />
              <span className="text-lg">{sosActive ? 'Alerting…' : 'SOS'}</span>
              <span className="text-xs font-medium opacity-90">Press for help</span>
            </span>
          </button>
          <p className="mt-3 text-sm text-slate-500 text-center max-w-md">
            {sosActive ? 'Family & volunteers have been alerted with your location.' : 'One tap alerts your family, volunteers & emergency services.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="space-y-5">
            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md">
                    <Pill className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-slate-800">Medicine Reminder</h3>
                </div>
                <button onClick={() => setAddMedModal(true)} className="w-9 h-9 rounded-xl bg-white/60 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:scale-110 transition">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                {medicines.map((m) => (
                  <div key={m.name} className="flex items-center gap-3 p-3 rounded-2xl bg-white/40 border border-white/50">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center shrink-0`}>
                      <Pill className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-700 text-sm">{m.name} <span className="text-slate-400 font-normal">{m.dose}</span></p>
                      <p className="text-xs text-slate-400">{m.time}</p>
                    </div>
                    {m.taken ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg">
                        <CheckCircle2 className="w-4 h-4" /> Taken
                      </span>
                    ) : (
                      <button onClick={() => markMedicine(m.name)} className="text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1.5 rounded-lg shadow-sm hover:shadow-md transition">Mark</button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-md">
                  <CalendarDays className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-bold text-slate-800">Upcoming Doctor Visits</h3>
              </div>
              <div className="space-y-3">
                {upcomingVisits.map((v) => (
                  <button key={v.doctor} onClick={() => setVisitModal(v)} className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white/40 border border-white/50 hover:-translate-y-0.5 hover:shadow-md transition text-left">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${v.gradient} flex items-center justify-center shrink-0`}>
                      <Stethoscope className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-700 text-sm">{v.doctor}</p>
                      <p className="text-xs text-slate-400">{v.specialty} · {v.location}</p>
                    </div>
                    <p className="text-xs font-bold text-slate-600">{v.date}</p>
                  </button>
                ))}
              </div>
              <button onClick={() => setBookVisitModal(true)} className="mt-4 w-full py-2.5 rounded-2xl text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition flex items-center justify-center gap-1.5">
                Book another visit <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md">
                  <Mic className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-bold text-slate-800">Voice Assistant</h3>
              </div>
              <button
                onClick={() => setVoiceModal(true)}
                className="relative mx-auto w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 bg-gradient-to-br from-violet-500 to-purple-600 shadow-purple-500/30 hover:scale-105"
              >
                <Mic className="relative w-10 h-10 text-white" strokeWidth={2.2} />
              </button>
              <p className="mt-4 text-sm font-semibold text-slate-600">Tap to speak</p>
              <p className="mt-1 text-xs text-slate-400">Ask me anything in your language</p>
            </div>

            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-500 flex items-center justify-center shadow-md">
                  <ClipboardCheck className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-bold text-slate-800">Daily Check-in</h3>
              </div>
              {checkInDone ? (
                <div className="py-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-3">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-semibold text-slate-700">Today's check-in complete!</p>
                  <p className="text-xs text-slate-400 mt-1">See you tomorrow morning</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-slate-500 mb-4">How are you feeling today?</p>
                  <div className="flex items-center justify-center gap-3">
                    {[
                      { emoji: '😊', label: 'Great', color: 'from-emerald-400 to-teal-500' },
                      { emoji: '🙂', label: 'Okay', color: 'from-blue-400 to-cyan-500' },
                      { emoji: '😔', label: 'Low', color: 'from-amber-400 to-orange-500' },
                    ].map((m) => (
                      <button key={m.label} onClick={() => { setCheckInDone(true); toast(`Check-in recorded: feeling ${m.label.toLowerCase()}`, 'success'); }} className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-gradient-to-br ${m.color} text-white shadow-md hover:scale-110 hover:-rotate-3 transition-all`}>
                        <span className="text-2xl">{m.emoji}</span>
                        <span className="text-xs font-bold">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 opacity-15 blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                    <Quote className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-slate-800">Daily Motivation</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed italic transition-all duration-500">"{quotes[quoteIndex]}"</p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 opacity-15 blur-2xl" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Bengaluru</p>
                  <p className="text-3xl font-display font-extrabold text-slate-800">28°C</p>
                  <p className="text-sm text-slate-500">Partly Cloudy</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
                  <CloudSun className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-xl bg-white/40">
                  <Droplet className="w-4 h-4 text-blue-500 mx-auto" />
                  <p className="text-xs font-bold text-slate-600 mt-1">62%</p>
                  <p className="text-[10px] text-slate-400">Humidity</p>
                </div>
                <div className="p-2 rounded-xl bg-white/40">
                  <Wind className="w-4 h-4 text-cyan-500 mx-auto" />
                  <p className="text-xs font-bold text-slate-600 mt-1">12 km/h</p>
                  <p className="text-[10px] text-slate-400">Wind</p>
                </div>
                <div className="p-2 rounded-xl bg-white/40">
                  <Thermometer className="w-4 h-4 text-orange-500 mx-auto" />
                  <p className="text-xs font-bold text-slate-600 mt-1">31°C</p>
                  <p className="text-[10px] text-slate-400">High</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center shadow-md">
                  <Contact className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-bold text-slate-800">Emergency Contacts</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {emergencyContacts.map((c) => (
                  <button key={c.name} onClick={() => toast(`Calling ${c.name}…`, 'info')} className="flex items-center gap-2 p-3 rounded-2xl bg-white/40 border border-white/50 hover:-translate-y-0.5 hover:shadow-md transition text-left">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center shrink-0`}>
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-700 truncate">{c.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{c.phone}</p>
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={() => setContactsModal(true)} className="mt-3 w-full py-2.5 rounded-2xl text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition flex items-center justify-center gap-1.5">
                <Phone className="w-4 h-4" /> View All Contacts
              </button>
            </div>

            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
                  <HeartPulse className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-bold text-slate-800">Health Summary</h3>
                <button onClick={() => setHealthModal(true)} className="ml-auto text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition">View Report</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {healthMetrics.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className="p-3 rounded-2xl bg-white/40 border border-white/50">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${m.gradient} flex items-center justify-center mb-2`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-lg font-display font-bold text-slate-800">{m.value} <span className="text-xs text-slate-400 font-normal">{m.unit}</span></p>
                      <p className="text-[10px] text-slate-400">{m.label}</p>
                      <p className="text-[10px] font-bold text-emerald-600">{m.status}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={sosModal} onClose={() => setSosModal(false)} title="Confirm Emergency" icon={Siren} iconColor="from-rose-500 to-red-600">
        <div className="text-center">
          <p className="text-slate-600">Hold on! This will alert your family, nearby volunteers, and emergency services with your live location.</p>
          <div className="my-5">
            <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center text-3xl font-display font-bold ${sosCountdown > 0 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
              {sosCountdown > 0 ? sosCountdown : <CheckCircle2 className="w-8 h-8" />}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setSosModal(false)} className="flex-1 py-3 rounded-xl text-sm font-bold text-slate-600 bg-white/60 border border-white/60 hover:bg-white/80 transition">Cancel</button>
            <button onClick={confirmSOS} disabled={sosCountdown > 0} className={`flex-1 py-3 rounded-xl text-sm font-bold text-white transition ${sosCountdown > 0 ? 'bg-slate-300 cursor-not-allowed' : 'bg-gradient-to-r from-rose-500 to-red-600 shadow-lg hover:shadow-xl'}`}>
              {sosCountdown > 0 ? `Wait ${sosCountdown}s` : 'Send SOS Now'}
            </button>
          </div>
        </div>
      </Modal>

      <Modal open={addMedModal} onClose={() => setAddMedModal(false)} title="Add Medicine Reminder" icon={Pill} iconColor="from-emerald-500 to-teal-500">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Medicine Name</label>
            <input type="text" value={newMed.name} onChange={(e) => setNewMed({ ...newMed, name: e.target.value })} placeholder="e.g. Crocin" className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/60 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Dosage</label>
            <input type="text" value={newMed.dose} onChange={(e) => setNewMed({ ...newMed, dose: e.target.value })} placeholder="e.g. 500mg" className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/60 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Time</label>
            <input type="text" value={newMed.time} onChange={(e) => setNewMed({ ...newMed, time: e.target.value })} placeholder="e.g. 2:00 PM" className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/60 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <button onClick={addMedicine} className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg hover:shadow-xl transition">Add Reminder</button>
        </div>
      </Modal>

      <Modal open={healthModal} onClose={() => setHealthModal(false)} title="Detailed Health Report" icon={HeartPulse} iconColor="from-rose-500 to-pink-500" maxWidth="max-w-2xl">
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {healthMetrics.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="p-4 rounded-2xl bg-white/50 border border-white/60">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center mb-2`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-xl font-display font-bold text-slate-800">{m.value}</p>
                  <p className="text-[10px] text-slate-400">{m.unit}</p>
                  <p className="text-xs font-bold text-emerald-600">{m.status}</p>
                </div>
              );
            })}
          </div>
          <div className="p-4 rounded-2xl bg-white/50 border border-white/60">
            <h4 className="font-display font-bold text-slate-800 text-sm mb-3">Weekly Heart Rate Trend</h4>
            <Sparkline data={weeklyHeart} color="#f43f5e" height={80} />
          </div>
          <div className="p-4 rounded-2xl bg-white/50 border border-white/60">
            <h4 className="font-display font-bold text-slate-800 text-sm mb-3">Weekly Steps</h4>
            <BarChart data={weeklySteps} color="from-blue-500 to-cyan-400" height={100} />
          </div>
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
            <p className="text-sm text-slate-600"><span className="font-bold text-blue-700">Doctor's Note:</span> All vitals are within normal range. Continue current medication schedule. Next check-up recommended in 3 months.</p>
          </div>
          <button onClick={() => { setHealthModal(false); toast('Health report downloaded (demo)', 'success'); }} className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md hover:shadow-lg transition flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Download Full Report
          </button>
        </div>
      </Modal>

      <Modal open={contactsModal} onClose={() => setContactsModal(false)} title="Emergency Contacts" icon={Phone} iconColor="from-rose-500 to-red-500">
        <div className="space-y-3">
          {emergencyContacts.map((c) => (
            <div key={c.name} className="flex items-center gap-3 p-3 rounded-2xl bg-white/50 border border-white/60">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center shadow-md`}>
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-800 text-sm">{c.name}</p>
                <p className="text-xs text-slate-400">{c.phone}</p>
              </div>
              <button onClick={() => toast(`Calling ${c.name}…`, 'info')} className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-sm hover:shadow-md transition">Call</button>
            </div>
          ))}
        </div>
      </Modal>

      <Modal open={!!visitModal} onClose={() => setVisitModal(null)} title="Appointment Details" icon={CalendarDays} iconColor="from-purple-500 to-indigo-500">
        {visitModal && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${visitModal.gradient} flex items-center justify-center shadow-md`}>
                <Stethoscope className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-slate-800 text-lg">{visitModal.doctor}</p>
                <p className="text-sm text-slate-500">{visitModal.specialty}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/50 border border-white/60">
                <p className="text-xs text-slate-400">When</p>
                <p className="text-sm font-bold text-slate-700">{visitModal.date}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/50 border border-white/60">
                <p className="text-xs text-slate-400">Where</p>
                <p className="text-sm font-bold text-slate-700">{visitModal.location}</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
              <p className="text-xs text-slate-600"><span className="font-bold">Preparation:</span> Please carry your previous prescription and arrive 15 minutes early. Fasting may be required — confirm with the clinic.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setVisitModal(null); toast('Appointment cancelled', 'error'); }} className="flex-1 py-3 rounded-xl text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition">Cancel Visit</button>
              <button onClick={() => { setVisitModal(null); toast('Reminder set for appointment', 'success'); }} className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md hover:shadow-lg transition">Set Reminder</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={bookVisitModal} onClose={() => setBookVisitModal(false)} title="Book a Doctor Visit" icon={CalendarDays} iconColor="from-blue-500 to-cyan-500">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Select Doctor</label>
            <select className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/60 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option>Dr. Anjali Rao (Cardiologist)</option>
              <option>Dr. Vikram Singh (General Physician)</option>
              <option>Dr. Meena Iyer (Orthopedist)</option>
              <option>Dr. Rajesh Kumar (Neurologist)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Preferred Date</label>
            <input type="date" className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/60 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Preferred Time</label>
            <select className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/60 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option>9:00 AM</option><option>10:30 AM</option><option>12:00 PM</option><option>2:00 PM</option><option>4:00 PM</option>
            </select>
          </div>
          <button onClick={() => { setBookVisitModal(false); toast('Appointment request sent! Clinic will confirm via SMS.', 'success'); }} className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg hover:shadow-xl transition">Request Appointment</button>
        </div>
      </Modal>

      <Modal open={voiceModal} onClose={() => { setVoiceModal(false); setVoiceListening(false); }} title="Voice Assistant" icon={Mic} iconColor="from-violet-500 to-purple-600">
        <div className="text-center py-4">
          <button
            onClick={() => setVoiceListening((v) => !v)}
            className={`relative mx-auto w-28 h-28 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${voiceListening ? 'scale-110 bg-gradient-to-br from-violet-600 to-purple-700 shadow-purple-500/40' : 'bg-gradient-to-br from-violet-500 to-purple-600 shadow-purple-500/30 hover:scale-105'}`}
          >
            {voiceListening && <span className="absolute inset-0 rounded-full bg-purple-500 pulse-ring" />}
            <Mic className="relative w-12 h-12 text-white" strokeWidth={2.2} />
          </button>
          <p className="mt-5 text-sm font-semibold text-slate-700">{voiceListening ? 'Listening… speak now' : 'Tap to speak'}</p>
          <p className="mt-1 text-xs text-slate-400">Hindi · Kannada · Tamil · Telugu · English</p>
          {voiceListening && (
            <div className="mt-4 p-3 rounded-xl bg-violet-50 border border-violet-200">
              <p className="text-xs text-slate-500">Try saying: "Remind me to take my medicine" or "Call my son"</p>
            </div>
          )}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button onClick={() => { setVoiceModal(false); setVoiceListening(false); toast('Reminder set: Take medicine at 2:00 PM', 'success'); }} className="py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-white/60 border border-white/60 hover:bg-white/80 transition">Set Reminder</button>
            <button onClick={() => { setVoiceModal(false); setVoiceListening(false); toast('Calling Rahul (Son)…', 'info'); }} className="py-2.5 rounded-xl text-xs font-bold text-slate-600 bg-white/60 border border-white/60 hover:bg-white/80 transition">Call Family</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

/* ----------------------------- Family Dashboard ----------------------------- */
type FamilyView = 'overview' | 'location' | 'health' | 'calendar';

const familyNavItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'location', label: 'Location', icon: Navigation2 },
  { id: 'health', label: 'Health', icon: HeartPulse },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
];

const familyNotifications = [
  { type: 'sos', title: 'Emergency SOS Triggered', desc: 'Sunita pressed SOS near Jayanagar 4th Block', time: '2 min ago', icon: AlertOctagon, color: 'from-rose-500 to-red-600' },
  { type: 'missed', title: 'Missed Medicine', desc: 'Vitamin D3 (12:30 PM) was not taken', time: '1 hr ago', icon: Pill, color: 'from-amber-500 to-orange-600' },
  { type: 'checkin', title: 'Daily Check-in Complete', desc: 'Sunita reported feeling "Great" today', time: '3 hrs ago', icon: ClipboardCheck, color: 'from-emerald-500 to-teal-600' },
  { type: 'visit', title: 'Upcoming Visit Reminder', desc: 'Dr. Anjali Rao tomorrow at 10:30 AM', time: '5 hrs ago', icon: CalendarDays, color: 'from-blue-500 to-cyan-600' },
];

const familyAlerts = [
  { level: 'critical', title: 'Emergency SOS Active', desc: 'Live location shared. Volunteers dispatched.', icon: AlertOctagon, ring: 'ring-rose-400/40', chip: 'bg-rose-500' },
  { level: 'warning', title: 'Blood Pressure Elevated', desc: 'Last reading 138/88 — monitor closely.', icon: Gauge, ring: 'ring-amber-400/40', chip: 'bg-amber-500' },
];

const familyMedicines = [
  { name: 'Metformin', dose: '500mg', time: '8:00 AM', status: 'taken', color: 'from-blue-500 to-cyan-500' },
  { name: 'Amlodipine', dose: '5mg', time: '8:00 AM', status: 'taken', color: 'from-emerald-500 to-teal-500' },
  { name: 'Vitamin D3', dose: '60K IU', time: '12:30 PM', status: 'missed', color: 'from-amber-500 to-orange-500' },
  { name: 'Aspirin', dose: '75mg', time: '6:00 PM', status: 'pending', color: 'from-rose-500 to-pink-500' },
];

const weeklyHeart = [68, 72, 75, 70, 74, 78, 72];
const weeklySteps = [3200, 4100, 2800, 5200, 3900, 4600, 4300];

function Sparkline({ data, color, height = 48 }: { data: number[]; color: string; height?: number }) {
  const w = 100;
  const h = height;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((d - min) / range) * (h - 8) - 4;
    return [x, y];
  });
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
  const area = `${path} L${w},${h} L0,${h} Z`;
  const id = `grad-${color.replace(/[^a-z]/gi, '')}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 2.5 : 1.5} fill={color} />
      ))}
    </svg>
  );
}

function BarChart({ data, color, height = 120 }: { data: number[]; color: string; height?: number }) {
  const max = Math.max(...data) || 1;
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <div className="flex items-end justify-between gap-1.5" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
          <div className={`w-full rounded-t-md bg-gradient-to-t ${color} transition-all duration-500 hover:opacity-80`} style={{ height: `${(d / max) * 100}%` }} title={`${d}`} />
          <span className="text-[10px] font-semibold text-slate-400">{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

function RingStat({ label, value, max, color, unit }: { label: string; value: number; max: number; color: string; unit: string }) {
  const pct = Math.min(value / max, 1);
  const r = 42;
  const circ = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#e2e8f0" strokeWidth="9" />
          <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)} className="transition-all duration-700" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-display font-bold text-slate-800">{value}{unit}</span>
        </div>
      </div>
      <p className="mt-1.5 text-xs font-semibold text-slate-500">{label}</p>
    </div>
  );
}

function FamilyDashboard({ onExit }: { onExit: () => void }) {
  const toast = useToast();
  const [activeNav, setActiveNav] = useState<FamilyView>('overview');
  const [alertModal, setAlertModal] = useState<null | typeof familyAlerts[number]>(null);
  const [mapModal, setMapModal] = useState(false);
  const [callModal, setCallModal] = useState<null | 'video' | 'voice'>(null);
  const [notifModal, setNotifModal] = useState(false);
  const [healthModal, setHealthModal] = useState(false);
  const [medModal, setMedModal] = useState(false);
  const [calMonth, setCalMonth] = useState(6); // July (0-indexed)
  const [calYear, setCalYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState<null | number>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [callActive, setCallActive] = useState(false);

  useEffect(() => {
    if (!callActive) return;
    const t = setInterval(() => setCallDuration((d) => d + 1), 1000);
    return () => clearInterval(t);
  }, [callActive]);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); } else setCalMonth(calMonth - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); } else setCalMonth(calMonth + 1);
  };
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const eventDays: Record<number, string> = { 12: 'Dr. Anjali Rao, 10:30 AM', 18: 'Blood test, 8:00 AM', 24: 'Dr. Vikram Singh, 4:00 PM', 27: 'Eye checkup, 11:00 AM' };

  const fmtTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const startCall = (type: 'video' | 'voice') => {
    setCallModal(type);
    setCallDuration(0);
    setCallActive(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30 page-enter">
      <header className="sticky top-0 z-40 glass border-b border-white/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-slate-800 leading-none">Elder Shield</p>
                <p className="text-xs text-slate-400">Family Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-white/50 cursor-pointer hover:bg-white/80 transition" onClick={() => toast('Search coming soon!', 'info')}>
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs text-slate-400">Search…</span>
              </div>
              <button onClick={() => setNotifModal(true)} className="relative w-9 h-9 rounded-xl bg-white/60 flex items-center justify-center text-slate-500 hover:text-blue-600 transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>
              <button onClick={onExit} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-white/60 transition">
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Exit</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/40 px-2 py-2">
        <div className="flex items-center justify-around">
          {familyNavItems.map((item) => {
            const Icon = item.icon;
            const active = activeNav === item.id;
            return (
              <button key={item.id} onClick={() => setActiveNav(item.id as FamilyView)} className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition ${active ? 'text-blue-600' : 'text-slate-400'}`}>
                <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
                <span className="text-[10px] font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <p className="text-sm text-slate-500">Welcome back,</p>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-800">Rahul Sharma</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 px-3 py-2 rounded-2xl glass">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center font-bold text-white text-sm">S</div>
              <div className="leading-tight">
                <p className="text-xs font-bold text-slate-700">Sunita Sharma</p>
                <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active now
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 space-y-3">
          {familyAlerts.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.title} className={`glass rounded-2xl p-4 ring-2 ${a.ring} flex items-center gap-4`}>
                <div className={`shrink-0 w-11 h-11 rounded-xl ${a.chip} flex items-center justify-center shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-sm">{a.title}</p>
                  <p className="text-xs text-slate-500">{a.desc}</p>
                </div>
                <button onClick={() => setAlertModal(a)} className="shrink-0 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition">View</button>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="space-y-5">
            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
                    <Navigation2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-slate-800">Live Location</h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
                </span>
              </div>
              <div className="relative h-44 rounded-2xl bg-gradient-to-br from-blue-100 via-cyan-50 to-emerald-50 overflow-hidden border border-white/50">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <div className="absolute top-1/3 left-0 right-0 h-2 bg-white/70" />
                <div className="absolute top-0 bottom-0 left-2/3 w-2 bg-white/70" />
                <div className="absolute top-2/3 left-0 right-2/3 h-1.5 bg-white/50" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute inset-0 w-10 h-10 rounded-full bg-rose-400/40 pulse-ring" />
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/40">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <div>
                  <p className="font-semibold text-slate-700">Jayanagar 4th Block</p>
                  <p className="text-xs text-slate-400">Bengaluru · Updated 1 min ago</p>
                </div>
                <button onClick={() => setMapModal(true)} className="flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition">
                  <Navigation2 className="w-3.5 h-3.5" /> Navigate
                </button>
              </div>
            </div>

            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-md">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-bold text-slate-800">Notifications</h3>
              </div>
              <div className="space-y-3">
                {familyNotifications.map((n, i) => {
                  const Icon = n.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-white/40 border border-white/50">
                      <div className={`shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br ${n.color} flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-700">{n.title}</p>
                        <p className="text-xs text-slate-400">{n.desc}</p>
                        <p className="text-[10px] text-slate-300 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-md">
                    <HeartPulse className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-slate-800">Health Status</h3>
                </div>
                <button onClick={() => setHealthModal(true)} className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full hover:bg-blue-100 transition">View Analytics</button>
              </div>
              <div className="flex items-center justify-around py-2">
                <RingStat label="Heart Rate" value={72} max={100} color="#f43f5e" unit="" />
                <RingStat label="Steps" value={4300} max={6000} color="#3b82f6" unit="" />
                <RingStat label="Sleep" value={7.4} max={8} color="#8b5cf6" unit="h" />
              </div>
            </div>

            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-display font-bold text-slate-800 text-sm">Heart Rate · Weekly</h4>
                  <p className="text-xs text-slate-400">Average 72 bpm · Normal</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-rose-600">
                  <Activity className="w-3.5 h-3.5" /> 72 bpm
                </div>
              </div>
              <Sparkline data={weeklyHeart} color="#f43f5e" />
              <div className="flex justify-between mt-1 text-[10px] text-slate-400 font-semibold">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => <span key={d}>{d}</span>)}
              </div>
            </div>

            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-display font-bold text-slate-800 text-sm">Steps · This Week</h4>
                  <p className="text-xs text-slate-400">Goal 6,000 / day</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-blue-600">
                  <Footprints className="w-3.5 h-3.5" /> 4,300
                </div>
              </div>
              <BarChart data={weeklySteps} color="from-blue-500 to-cyan-400" />
            </div>
          </div>

          <div className="space-y-5">
            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md">
                  <Pill className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-bold text-slate-800">Medicine Tracker</h3>
                <button onClick={() => setMedModal(true)} className="ml-auto text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full hover:bg-blue-100 transition">Full Schedule</button>
              </div>
              <div className="space-y-3">
                {familyMedicines.map((m) => (
                  <div key={m.name} className="flex items-center gap-3 p-3 rounded-2xl bg-white/40 border border-white/50">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center shrink-0`}>
                      <Pill className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-700">{m.name} <span className="text-slate-400 font-normal">{m.dose}</span></p>
                      <p className="text-xs text-slate-400">{m.time}</p>
                    </div>
                    {m.status === 'taken' ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1.5 rounded-lg">
                        <Check className="w-3.5 h-3.5" /> Taken
                      </span>
                    ) : m.status === 'missed' ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1.5 rounded-lg">
                        <TrendingDown className="w-3.5 h-3.5" /> Missed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1.5 rounded-lg">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-slate-400">Adherence this week</span>
                <span className="font-bold text-emerald-600">85%</span>
              </div>
              <div className="mt-1.5 h-2 rounded-full bg-slate-200/60 overflow-hidden">
                <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
              </div>
            </div>

            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-bold text-slate-800">Video Calling</h3>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/40 border border-white/50 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center font-bold text-white">S</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-700">Sunita Sharma</p>
                  <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => startCall('video')} className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  <Video className="w-4 h-4" /> Video
                </button>
                <button onClick={() => startCall('voice')} className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  <PhoneCall className="w-4 h-4" /> Voice
                </button>
              </div>
            </div>

            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-500 flex items-center justify-center shadow-md">
                    <CalendarDays className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-slate-800">Calendar</h3>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={prevMonth} className="w-7 h-7 rounded-lg bg-white/60 flex items-center justify-center text-slate-400 hover:text-blue-600 transition">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-600 px-1">{monthNames[calMonth]} {calYear}</span>
                  <button onClick={nextMonth} className="w-7 h-7 rounded-lg bg-white/60 flex items-center justify-center text-slate-400 hover:text-blue-600 transition">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={i}>{d}</span>)}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }, (_, i) => <span key={`b${i}`} />)}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
                  const isToday = d === 23 && calMonth === 6 && calYear === 2026;
                  const hasEvent = calMonth === 6 && calYear === 2026 && eventDays[d];
                  return (
                    <button key={d} onClick={() => { if (hasEvent) { setSelectedDay(d); toast(`Event on ${d} ${monthNames[calMonth]}: ${eventDays[d]}`, 'info'); } }} className={`aspect-square rounded-lg text-xs font-semibold flex flex-col items-center justify-center transition ${isToday ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md' : hasEvent ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' : 'text-slate-500 hover:bg-white/60'}`}>
                      {d}
                      {hasEvent && !isToday && <span className="w-1 h-1 rounded-full bg-blue-500 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-purple-50">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <p className="text-xs text-slate-600"><span className="font-bold">Tomorrow</span> · Dr. Anjali Rao, 10:30 AM</p>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-cyan-50">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <p className="text-xs text-slate-600"><span className="font-bold">Sat</span> · Dr. Vikram Singh, 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal open={!!alertModal} onClose={() => setAlertModal(null)} title="Alert Details" icon={alertModal?.icon} iconColor={alertModal?.chip?.replace('bg-', 'from-').split(' ')[0] || 'from-blue-500 to-cyan-600'}>
        {alertModal && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl ${alertModal.chip} flex items-center justify-center shadow-md`}>
                <alertModal.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-slate-800">{alertModal.title}</p>
                <p className="text-xs text-slate-400">{alertModal.desc}</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/50 border border-white/60">
              <p className="text-sm text-slate-600">This alert was triggered by Sunita Sharma's device. Location and vitals have been shared with emergency contacts. Recommended action: Call to confirm wellbeing.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setAlertModal(null); toast('Alert dismissed', 'info'); }} className="flex-1 py-3 rounded-xl text-sm font-bold text-slate-600 bg-white/60 border border-white/60 hover:bg-white/80 transition">Dismiss</button>
              <button onClick={() => { setAlertModal(null); startCall('voice'); }} className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md hover:shadow-lg transition">Call Now</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={mapModal} onClose={() => setMapModal(false)} title="Live Location" icon={MapPin} iconColor="from-rose-500 to-red-600" maxWidth="max-w-2xl">
        <div className="space-y-4">
          <div className="relative h-64 rounded-2xl bg-gradient-to-br from-blue-100 via-cyan-50 to-emerald-50 overflow-hidden border border-white/50">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            <div className="absolute top-1/3 left-0 right-0 h-2 bg-white/70" />
            <div className="absolute top-0 bottom-0 left-2/3 w-2 bg-white/70" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 w-12 h-12 rounded-full bg-rose-400/40 pulse-ring" />
                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/40">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/50 border border-white/60">
            <p className="font-bold text-slate-800">Sunita Sharma's current location</p>
            <p className="text-sm text-slate-500 mt-1">Jayanagar 4th Block, Bengaluru, Karnataka 560011</p>
            <p className="text-xs text-slate-400 mt-1">Last updated: 1 min ago · GPS accuracy: ±5m</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => { setMapModal(false); toast('Opening navigation in Maps…', 'info'); }} className="py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md hover:shadow-lg transition flex items-center justify-center gap-2">
              <Navigation2 className="w-4 h-4" /> Open in Maps
            </button>
            <button onClick={() => { setMapModal(false); startCall('voice'); }} className="py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md hover:shadow-lg transition flex items-center justify-center gap-2">
              <PhoneCall className="w-4 h-4" /> Call
            </button>
          </div>
        </div>
      </Modal>

      <Modal open={!!callModal} onClose={() => { setCallModal(null); setCallActive(false); setCallDuration(0); }} title={callModal === 'video' ? 'Video Call' : 'Voice Call'} icon={callModal === 'video' ? Video : PhoneCall} iconColor="from-violet-500 to-purple-600" maxWidth="max-w-md">
        <div className="text-center py-6">
          <div className="relative mx-auto w-28 h-28 mb-4">
            {callActive && <div className="absolute inset-0 rounded-full bg-rose-400/30 pulse-ring" />}
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center font-bold text-white text-4xl shadow-xl">S</div>
          </div>
          <p className="font-display font-bold text-slate-800 text-lg">Sunita Sharma</p>
          <p className="text-sm text-slate-400 mt-1">{callActive ? `Connected · ${fmtTime(callDuration)}` : callModal === 'video' ? 'Video calling…' : 'Voice calling…'}</p>
          {callModal === 'video' && (
            <div className="mt-4 h-32 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
              {callActive ? <span className="text-white/60 text-sm">Live video feed</span> : <span className="text-white/40 text-sm">Waiting for response…</span>}
            </div>
          )}
          <div className="mt-6 flex items-center justify-center gap-4">
            {!callActive ? (
              <button onClick={() => setCallActive(true)} className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition">
                <PhoneCall className="w-6 h-6" />
              </button>
            ) : (
              <button onClick={() => { setCallModal(null); setCallActive(false); setCallDuration(0); toast('Call ended', 'info'); }} className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition">
                <PhoneOff className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </Modal>

      <Modal open={notifModal} onClose={() => setNotifModal(false)} title="All Notifications" icon={Bell} iconColor="from-purple-500 to-fuchsia-500" maxWidth="max-w-lg">
        <div className="space-y-3">
          {familyNotifications.map((n, i) => {
            const Icon = n.icon;
            return (
              <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-white/50 border border-white/60">
                <div className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${n.color} flex items-center justify-center shadow-sm`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700">{n.title}</p>
                  <p className="text-xs text-slate-400">{n.desc}</p>
                  <p className="text-[10px] text-slate-300 mt-0.5">{n.time}</p>
                </div>
              </div>
            );
          })}
          <button onClick={() => { setNotifModal(false); toast('All notifications marked as read', 'success'); }} className="w-full py-3 rounded-xl text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition">Mark all as read</button>
        </div>
      </Modal>

      <Modal open={healthModal} onClose={() => setHealthModal(false)} title="Health Analytics" icon={HeartPulse} iconColor="from-rose-500 to-pink-500" maxWidth="max-w-2xl">
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-white/50 border border-white/60 text-center">
              <p className="text-2xl font-display font-bold text-rose-500">72</p>
              <p className="text-xs text-slate-400">Heart Rate (bpm)</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/50 border border-white/60 text-center">
              <p className="text-2xl font-display font-bold text-blue-500">4,300</p>
              <p className="text-xs text-slate-400">Steps</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/50 border border-white/60 text-center">
              <p className="text-2xl font-display font-bold text-purple-500">7.4h</p>
              <p className="text-xs text-slate-400">Sleep</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/50 border border-white/60 text-center">
              <p className="text-2xl font-display font-bold text-emerald-500">120/80</p>
              <p className="text-xs text-slate-400">Blood Pressure</p>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/50 border border-white/60">
            <h4 className="font-display font-bold text-slate-800 text-sm mb-3">Heart Rate · Weekly Trend</h4>
            <Sparkline data={weeklyHeart} color="#f43f5e" height={80} />
          </div>
          <div className="p-4 rounded-2xl bg-white/50 border border-white/60">
            <h4 className="font-display font-bold text-slate-800 text-sm mb-3">Steps · Weekly</h4>
            <BarChart data={weeklySteps} color="from-blue-500 to-cyan-400" height={100} />
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <p className="text-sm text-slate-600"><span className="font-bold text-emerald-700">Summary:</span> All vitals within normal range. Medicine adherence at 85%. Recommend continuing current routine.</p>
          </div>
        </div>
      </Modal>

      <Modal open={medModal} onClose={() => setMedModal(false)} title="Full Medicine Schedule" icon={Pill} iconColor="from-emerald-500 to-teal-500">
        <div className="space-y-3">
          {familyMedicines.map((m) => (
            <div key={m.name} className="flex items-center gap-3 p-3 rounded-2xl bg-white/50 border border-white/60">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center shrink-0`}>
                <Pill className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-700">{m.name} {m.dose}</p>
                <p className="text-xs text-slate-400">{m.time}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${m.status === 'taken' ? 'text-emerald-600 bg-emerald-50' : m.status === 'missed' ? 'text-rose-600 bg-rose-50' : 'text-amber-600 bg-amber-50'}`}>{m.status}</span>
            </div>
          ))}
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
            <p className="text-sm text-slate-600"><span className="font-bold">Weekly Adherence:</span> 85% (17 of 21 doses taken)</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

/* ----------------------------- Volunteer Dashboard ----------------------------- */
type VolunteerView = 'overview' | 'requests' | 'rewards' | 'profile';

const volunteerNavItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'requests', label: 'Requests', icon: HeartHandshake },
  { id: 'rewards', label: 'Rewards', icon: Gift },
  { id: 'profile', label: 'Profile', icon: UserCircle },
];

const nearbyRequests = [
  { id: 1, elder: 'Sunita Sharma', age: 68, need: 'Emergency SOS', distance: '0.4 km', time: '2 min ago', urgency: 'critical', location: 'Jayanagar 4th Block', icon: AlertOctagon, color: 'from-rose-500 to-red-600' },
  { id: 2, elder: 'Ramesh Iyer', age: 72, need: 'Medicine Delivery', distance: '1.1 km', time: '12 min ago', urgency: 'moderate', location: 'JP Nagar 7th Phase', icon: Pill, color: 'from-amber-500 to-orange-600' },
  { id: 3, elder: 'Lakshmi Rao', age: 65, need: 'Grocery Help', distance: '1.8 km', time: '25 min ago', urgency: 'low', location: 'Banashankari 2nd Stage', icon: HeartHandshake, color: 'from-blue-500 to-cyan-600' },
  { id: 4, elder: 'Govind Nair', age: 70, need: 'Doctor Visit Pickup', distance: '2.3 km', time: '40 min ago', urgency: 'moderate', location: 'BTM Layout 1st Stage', icon: Stethoscope, color: 'from-purple-500 to-indigo-600' },
];

const completedTasks = [
  { elder: 'Sunita Sharma', task: 'Medicine Delivery', date: 'Today', points: 50, color: 'from-emerald-500 to-teal-500' },
  { elder: 'Ramesh Iyer', task: 'Grocery Help', date: 'Today', points: 30, color: 'from-blue-500 to-cyan-500' },
  { elder: 'Lakshmi Rao', task: 'Daily Wellness Check', date: 'Yesterday', points: 25, color: 'from-purple-500 to-indigo-500' },
  { elder: 'Govind Nair', task: 'Doctor Visit Pickup', date: 'Yesterday', points: 45, color: 'from-amber-500 to-orange-500' },
];

const leaderboard = [
  { rank: 1, name: 'Asha Reddy', points: 2840, city: 'Bengaluru', avatar: 'A', color: 'from-amber-400 to-yellow-500' },
  { rank: 2, name: 'Vikram Patel', points: 2610, city: 'Ahmedabad', avatar: 'V', color: 'from-slate-300 to-slate-400' },
  { rank: 3, name: 'Meena Iyer', points: 2480, city: 'Chennai', avatar: 'M', color: 'from-orange-400 to-amber-600' },
  { rank: 4, name: 'You (Arjun K.)', points: 2120, city: 'Bengaluru', avatar: 'Y', color: 'from-blue-500 to-purple-600', isYou: true },
  { rank: 5, name: 'Kavya Nair', points: 1980, city: 'Kochi', avatar: 'K', color: 'from-rose-400 to-pink-500' },
];

const certificates = [
  { title: 'Guardian Angel', desc: '50+ elders helped', date: 'Jun 2026', icon: ShieldAlert, color: 'from-blue-500 to-purple-600' },
  { title: 'Rapid Responder', desc: '10 emergency responses', date: 'May 2026', icon: Zap, color: 'from-amber-500 to-orange-600' },
  { title: 'Care Champion', desc: '100 hours of service', date: 'Apr 2026', icon: Trophy, color: 'from-emerald-500 to-teal-600' },
];

const rewards = [
  { name: 'Free Health Checkup', cost: 500, icon: HeartPulse, color: 'from-rose-500 to-pink-600' },
  { name: 'Amazon Voucher ₹500', cost: 800, icon: Gift, color: 'from-amber-500 to-orange-600' },
  { name: 'Movie Tickets', cost: 1200, icon: Star, color: 'from-purple-500 to-indigo-600' },
  { name: 'Premium Volunteer Badge', cost: 2000, icon: BadgeCheck, color: 'from-blue-500 to-cyan-600' },
];

const weeklyTasks = [3, 5, 2, 6, 4, 7, 5];
const monthlyImpact = [12, 18, 15, 22, 19, 25, 21, 28];

function VolunteerRadial({ value, max, label, color }: { value: number; max: number; label: string; color: string }) {
  const pct = Math.min(value / max, 1);
  const r = 36;
  const circ = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#e2e8f0" strokeWidth="9" />
          <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)} className="transition-all duration-700" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-display font-bold text-slate-800">{value}</span>
        </div>
      </div>
      <p className="mt-1 text-[10px] font-semibold text-slate-500 text-center">{label}</p>
    </div>
  );
}

function VolunteerDashboard({ onExit }: { onExit: () => void }) {
  const toast = useToast();
  const [activeNav, setActiveNav] = useState<VolunteerView>('overview');
  const [acceptedIds, setAcceptedIds] = useState<number[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [viewReq, setViewReq] = useState<null | typeof nearbyRequests[number]>(null);
  const [mapModal, setMapModal] = useState(false);
  const [rewardModal, setRewardModal] = useState<null | typeof rewards[number]>(null);
  const [certModal, setCertModal] = useState<null | typeof certificates[number]>(null);
  const [points, setPoints] = useState(2120);

  const acceptTask = (id: number) => {
    setAcceptedIds((prev) => [...prev, id]);
    toast('Task accepted! Navigate to elder location.', 'success');
  };

  const completeTask = (id: number) => {
    if (!completedIds.includes(id)) {
      setCompletedIds((prev) => [...prev, id]);
      setPoints((p) => p + 150);
      toast('Task completed! +150 points earned.', 'success');
    }
  };

  const redeemReward = () => {
    if (!rewardModal) return;
    if (points < rewardModal.cost) { toast('Not enough points', 'error'); return; }
    setPoints((p) => p - rewardModal.cost);
    setRewardModal(null);
    toast(`${rewardModal.name} redeemed successfully!`, 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30 page-enter">
      <header className="sticky top-0 z-40 glass border-b border-white/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-slate-800 leading-none">Elder Shield</p>
                <p className="text-xs text-slate-400">Volunteer Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span className="text-xs font-bold text-amber-700">2,120 pts</span>
              </div>
              <button onClick={onExit} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-white/60 transition">
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Exit</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-white/40 px-2 py-2">
        <div className="flex items-center justify-around">
          {volunteerNavItems.map((item) => {
            const Icon = item.icon;
            const active = activeNav === item.id;
            return (
              <button key={item.id} onClick={() => setActiveNav(item.id as VolunteerView)} className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition ${active ? 'text-blue-600' : 'text-slate-400'}`}>
                <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 2} />
                <span className="text-[10px] font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <p className="text-sm text-slate-500">Welcome back,</p>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-800">Arjun Kumar</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl glass">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm">A</div>
              <div className="leading-tight">
                <p className="text-xs font-bold text-slate-700">Level 4 Volunteer</p>
                <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <Flame className="w-3 h-3" /> 12-day streak
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Tasks Done', value: '32', icon: ClipboardCheck, color: 'from-blue-500 to-cyan-500' },
            { label: 'Lives Touched', value: '28', icon: Heart, color: 'from-rose-500 to-pink-500' },
            { label: 'Hours Served', value: '120', icon: Clock, color: 'from-emerald-500 to-teal-500' },
            { label: 'Current Rank', value: '#4', icon: Trophy, color: 'from-amber-500 to-orange-500' },
          ].map((s) => {
            const I = s.icon;
            return (
              <div key={s.label} className="glass rounded-2xl p-4 shadow-lg shadow-blue-500/5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-md mb-2`}>
                  <I className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-display font-bold text-slate-800">{s.value}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="space-y-5 lg:col-span-2">
            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center shadow-md">
                    <HeartHandshake className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-slate-800">Nearby Help Requests</h3>
                    <p className="text-xs text-slate-400">{nearbyRequests.length} requests within 3 km</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> LIVE
                </span>
              </div>
              <div className="space-y-3">
                {nearbyRequests.map((req) => {
                  const Icon = req.icon;
                  const accepted = acceptedIds.includes(req.id);
                  const urgencyStyle = req.urgency === 'critical' ? 'border-rose-200 bg-rose-50/50' : req.urgency === 'moderate' ? 'border-amber-200 bg-amber-50/50' : 'border-blue-200 bg-blue-50/50';
                  return (
                    <div key={req.id} className={`rounded-2xl p-4 border ${urgencyStyle} transition-all`}>
                      <div className="flex items-start gap-3">
                        <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${req.color} flex items-center justify-center shadow-md`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-bold text-slate-800 text-sm">{req.elder}</p>
                            <span className="text-[10px] text-slate-400">· {req.age} yrs</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${req.color}`}>{req.need}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {req.location}</span>
                            <span className="flex items-center gap-1"><Navigation2 className="w-3 h-3" /> {req.distance}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {req.time}</span>
                          </div>
                        </div>
                        <button onClick={() => setViewReq(req)} className="shrink-0 w-9 h-9 rounded-lg bg-white/60 flex items-center justify-center text-slate-400 hover:text-blue-600 transition" aria-label="View details">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                      {accepted ? (
                        completedIds.includes(req.id) ? (
                          <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                            <CheckCircle2 className="w-4 h-4" /> Task Completed — Thank you!
                          </div>
                        ) : (
                          <div className="mt-3 flex items-center justify-between gap-2">
                            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                              <Check className="w-4 h-4" /> Accepted — On the way
                            </span>
                            <div className="flex gap-2">
                              <button onClick={() => setMapModal(true)} className="flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition">
                                <Route className="w-3.5 h-3.5" /> Open Map
                              </button>
                              <button onClick={() => completeTask(req.id)} className="flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                              </button>
                            </div>
                          </div>
                        )
                      ) : (
                        <button onClick={() => acceptTask(req.id)} className={`mt-3 w-full py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${req.color} shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all`}>
                          Accept Task
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
                    <Compass className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-slate-800">Navigation Map</h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Tracking
                </span>
              </div>
              <div className="relative h-56 rounded-2xl bg-gradient-to-br from-blue-100 via-cyan-50 to-emerald-50 overflow-hidden border border-white/50">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                <div className="absolute top-1/4 left-0 right-0 h-2.5 bg-white/70" />
                <div className="absolute top-0 bottom-0 left-1/3 w-2.5 bg-white/70" />
                <div className="absolute top-2/3 left-0 right-0 h-2 bg-white/60" />
                <div className="absolute top-0 bottom-0 left-3/4 w-2 bg-white/60" />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 224" preserveAspectRatio="none">
                  <path d="M60,180 Q150,140 140,100 T280,60" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="8 6" strokeLinecap="round" />
                </svg>
                <div className="absolute" style={{ left: '15%', top: '80%' }}>
                  <div className="relative">
                    <div className="absolute inset-0 w-9 h-9 rounded-full bg-blue-400/40 pulse-ring" />
                    <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/40 ring-2 ring-white">
                      <Compass className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="mt-1 text-[10px] font-bold text-blue-700 bg-white/80 px-1.5 py-0.5 rounded">You</p>
                </div>
                <div className="absolute" style={{ left: '70%', top: '25%' }}>
                  <div className="relative">
                    <div className="absolute inset-0 w-9 h-9 rounded-full bg-rose-400/40 pulse-ring" />
                    <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/40 ring-2 ring-white">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="mt-1 text-[10px] font-bold text-rose-700 bg-white/80 px-1.5 py-0.5 rounded">Sunita S.</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                <div className="p-2.5 rounded-xl bg-white/40">
                  <p className="text-sm font-bold text-slate-700">0.4 km</p>
                  <p className="text-[10px] text-slate-400">Distance</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/40">
                  <p className="text-sm font-bold text-slate-700">~3 min</p>
                  <p className="text-[10px] text-slate-400">ETA by walk</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/40">
                  <p className="text-sm font-bold text-slate-700">Jayanagar</p>
                  <p className="text-[10px] text-slate-400">Destination</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-slate-800">Rewards</h3>
                </div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">2,120 pts</span>
              </div>
              <div className="space-y-3">
                {rewards.map((r) => {
                  const Icon = r.icon;
                  const canAfford = 2120 >= r.cost;
                  return (
                    <div key={r.name} className="flex items-center gap-3 p-3 rounded-2xl bg-white/40 border border-white/50">
                      <div className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center shadow-md`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-700 truncate">{r.name}</p>
                        <p className="text-xs font-bold text-amber-600 flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400" /> {r.cost} pts</p>
                      </div>
                      <button onClick={() => setRewardModal(r)} className={`text-xs font-bold px-3 py-2 rounded-lg transition ${canAfford ? 'text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-sm hover:shadow-md' : 'text-slate-400 bg-slate-100 cursor-not-allowed'}`} disabled={!canAfford}>
                        {canAfford ? 'Redeem' : 'Locked'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-md">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-bold text-slate-800">Leaderboard</h3>
              </div>
              <div className="space-y-2.5">
                {leaderboard.map((p) => {
                  const crownColors: Record<number, string> = { 1: 'text-amber-500', 2: 'text-slate-400', 3: 'text-orange-500' };
                  return (
                    <div key={p.rank} className={`flex items-center gap-3 p-2.5 rounded-2xl transition ${p.isYou ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200' : 'bg-white/40 border border-white/50'}`}>
                      <div className="flex items-center justify-center w-7 shrink-0">
                        {p.rank <= 3 ? <Crown className={`w-5 h-5 ${crownColors[p.rank]}`} fill="currentColor" /> : <span className="text-sm font-bold text-slate-400">#{p.rank}</span>}
                      </div>
                      <div className={`shrink-0 w-9 h-9 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center font-bold text-white text-sm`}>{p.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold truncate ${p.isYou ? 'text-blue-700' : 'text-slate-700'}`}>{p.name}</p>
                        <p className="text-[10px] text-slate-400">{p.city}</p>
                      </div>
                      <span className="text-sm font-bold text-slate-700 flex items-center gap-1 shrink-0">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" /> {p.points.toLocaleString('en-IN')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md">
                  <BadgeCheck className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-bold text-slate-800">Certificates</h3>
              </div>
              <div className="space-y-3">
                {certificates.map((c) => {
                  const Icon = c.icon;
                  return (
                    <button key={c.title} onClick={() => setCertModal(c)} className="relative overflow-hidden rounded-2xl p-4 bg-white/40 border border-white/50 hover:-translate-y-0.5 hover:shadow-md transition-all text-left w-full">
                      <div className={`absolute -top-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-br ${c.color} opacity-10 blur-xl`} />
                      <div className="relative flex items-center gap-3">
                        <div className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center shadow-md`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-800">{c.title}</p>
                          <p className="text-xs text-slate-400">{c.desc}</p>
                          <p className="text-[10px] text-slate-300 mt-0.5">Earned · {c.date}</p>
                        </div>
                        <Medal className="w-5 h-5 text-amber-500 shrink-0" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display font-bold text-slate-800">Completed Tasks</h3>
            </div>
            <div className="space-y-3">
              {completedTasks.map((t, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/40 border border-white/50">
                  <div className={`shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center`}>
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate">{t.task}</p>
                    <p className="text-xs text-slate-400">{t.elder} · {t.date}</p>
                  </div>
                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1 shrink-0">
                    <Star className="w-3 h-3 fill-amber-400" /> +{t.points}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-800 text-sm">Tasks · This Week</h4>
                  <p className="text-xs text-slate-400">32 total completed</p>
                </div>
              </div>
            </div>
            <BarChart data={weeklyTasks} color="from-blue-500 to-cyan-400" height={140} />
          </div>

          <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-md">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-800 text-sm">Monthly Impact</h4>
                <p className="text-xs text-slate-400">8-month trend</p>
              </div>
            </div>
            <Sparkline data={monthlyImpact} color="#a855f7" height={60} />
            <div className="mt-4 flex items-center justify-around">
              <VolunteerRadial value={28} max={50} label="Lives" color="#f43f5e" />
              <VolunteerRadial value={120} max={200} label="Hours" color="#3b82f6" />
              <VolunteerRadial value={2120} max={3000} label="Points" color="#a855f7" />
            </div>
          </div>
        </div>
      </div>

      <Modal open={!!viewReq} onClose={() => setViewReq(null)} title="Request Details" icon={viewReq?.icon} iconColor={viewReq ? `from-${viewReq.color.split('-')[1]}-500 to-${viewReq.color.split('-')[3]}-600` : 'from-blue-500 to-cyan-600'}>
        {viewReq && (() => {
          const Icon = viewReq.icon;
          return (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${viewReq.color} flex items-center justify-center shadow-md`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-display font-bold text-slate-800 text-lg">{viewReq.elder}</p>
                  <p className="text-sm text-slate-400">{viewReq.age} years · {viewReq.need}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/50 border border-white/60">
                  <p className="text-xs text-slate-400">Location</p>
                  <p className="text-sm font-bold text-slate-700">{viewReq.location}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/50 border border-white/60">
                  <p className="text-xs text-slate-400">Distance</p>
                  <p className="text-sm font-bold text-slate-700">{viewReq.distance}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/50 border border-white/60">
                  <p className="text-xs text-slate-400">Posted</p>
                  <p className="text-sm font-bold text-slate-700">{viewReq.time}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/50 border border-white/60">
                  <p className="text-xs text-slate-400">Urgency</p>
                  <p className={`text-sm font-bold capitalize ${viewReq.urgency === 'critical' ? 'text-rose-600' : viewReq.urgency === 'moderate' ? 'text-amber-600' : 'text-blue-600'}`}>{viewReq.urgency}</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                <p className="text-sm text-slate-600"><span className="font-bold">Note from family:</span> Please call on arrival. Medicine is on the kitchen counter. Thank you for helping!</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setViewReq(null); toast('Calling elder…', 'info'); }} className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md hover:shadow-lg transition flex items-center justify-center gap-2">
                  <PhoneCall className="w-4 h-4" /> Call Elder
                </button>
                {!acceptedIds.includes(viewReq.id) ? (
                  <button onClick={() => { acceptTask(viewReq.id); setViewReq(null); }} className={`flex-1 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${viewReq.color} shadow-md hover:shadow-lg transition`}>
                    Accept Task
                  </button>
                ) : (
                  <button onClick={() => { completeTask(viewReq.id); setViewReq(null); }} className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md hover:shadow-lg transition">
                    Mark Complete
                  </button>
                )}
              </div>
            </div>
          );
        })()}
      </Modal>

      <Modal open={mapModal} onClose={() => setMapModal(false)} title="Navigation Map" icon={Compass} iconColor="from-blue-500 to-cyan-500" maxWidth="max-w-2xl">
        <div className="space-y-4">
          <div className="relative h-64 rounded-2xl bg-gradient-to-br from-blue-100 via-cyan-50 to-emerald-50 overflow-hidden border border-white/50">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="absolute top-1/4 left-0 right-0 h-2.5 bg-white/70" />
            <div className="absolute top-0 bottom-0 left-1/3 w-2.5 bg-white/70" />
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 256" preserveAspectRatio="none">
              <path d="M60,200 Q150,150 140,100 T280,60" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="8 6" strokeLinecap="round" />
            </svg>
            <div className="absolute" style={{ left: '15%', top: '78%' }}>
              <div className="relative">
                <div className="absolute inset-0 w-10 h-10 rounded-full bg-blue-400/40 pulse-ring" />
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg ring-2 ring-white">
                  <Compass className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="mt-1 text-[10px] font-bold text-blue-700 bg-white/80 px-1.5 py-0.5 rounded">You</p>
            </div>
            <div className="absolute" style={{ left: '70%', top: '22%' }}>
              <div className="relative">
                <div className="absolute inset-0 w-10 h-10 rounded-full bg-rose-400/40 pulse-ring" />
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg ring-2 ring-white">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="mt-1 text-[10px] font-bold text-rose-700 bg-white/80 px-1.5 py-0.5 rounded">Destination</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-white/50 border border-white/60">
              <p className="text-lg font-bold text-slate-700">0.4 km</p>
              <p className="text-xs text-slate-400">Distance</p>
            </div>
            <div className="p-3 rounded-xl bg-white/50 border border-white/60">
              <p className="text-lg font-bold text-slate-700">~3 min</p>
              <p className="text-xs text-slate-400">ETA by walk</p>
            </div>
            <div className="p-3 rounded-xl bg-white/50 border border-white/60">
              <p className="text-lg font-bold text-slate-700">Jayanagar</p>
              <p className="text-xs text-slate-400">Destination</p>
            </div>
          </div>
          <button onClick={() => { setMapModal(false); toast('Opening turn-by-turn navigation…', 'info'); }} className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md hover:shadow-lg transition flex items-center justify-center gap-2">
            <Navigation2 className="w-4 h-4" /> Start Navigation
          </button>
        </div>
      </Modal>

      <Modal open={!!rewardModal} onClose={() => setRewardModal(null)} title="Redeem Reward" icon={Gift} iconColor="from-amber-500 to-orange-500">
        {rewardModal && (() => {
          const Icon = rewardModal.icon;
          return (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${rewardModal.color} flex items-center justify-center shadow-md`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-display font-bold text-slate-800 text-lg">{rewardModal.name}</p>
                  <p className="text-sm font-bold text-amber-600 flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400" /> {rewardModal.cost} points</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/50 border border-white/60">
                <p className="text-sm text-slate-600">Your balance: <span className="font-bold text-slate-800">{points.toLocaleString('en-IN')} points</span></p>
                <p className="text-xs text-slate-400 mt-1">After redemption: <span className="font-bold">{(points - rewardModal.cost).toLocaleString('en-IN')} points</span></p>
              </div>
              <button onClick={redeemReward} className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg hover:shadow-xl transition">Confirm Redemption</button>
            </div>
          );
        })()}
      </Modal>

      <Modal open={!!certModal} onClose={() => setCertModal(null)} title="Certificate Preview" icon={Award} iconColor="from-emerald-500 to-teal-500" maxWidth="max-w-xl">
        {certModal && (() => {
          const Icon = certModal.icon;
          return (
            <div className="space-y-4">
              <div className={`relative rounded-2xl p-8 bg-gradient-to-br ${certModal.color} text-white text-center overflow-hidden`}>
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%), linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }} />
                <div className="relative">
                  <Award className="w-12 h-12 mx-auto mb-3" />
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80">Certificate of Achievement</p>
                  <p className="mt-2 text-2xl font-display font-extrabold">{certModal.title}</p>
                  <p className="mt-2 text-sm opacity-90">Awarded to Arjun Kumar</p>
                  <p className="mt-1 text-xs opacity-70">{certModal.desc} · {certModal.date}</p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span className="text-xs font-bold">Elder Shield India</span>
                  </div>
                </div>
              </div>
              <button onClick={() => { setCertModal(null); toast('Certificate downloaded (demo)', 'success'); }} className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md hover:shadow-lg transition flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download Certificate
              </button>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}

/* ----------------------------- Admin Dashboard ----------------------------- */
type AdminTab = 'overview' | 'users' | 'volunteers' | 'emergency' | 'analytics' | 'reports' | 'notifications';

const adminTabs: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'volunteers', label: 'Volunteers', icon: ShieldCheck },
  { id: 'emergency', label: 'Emergency', icon: AlertOctagon },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'notifications', label: 'Notifications', icon: Megaphone },
];

const adminUsers = [
  { id: 'U-1042', name: 'Sunita Sharma', role: 'Elder', city: 'Bengaluru', status: 'active', joined: 'Jan 2026', avatar: 'S', color: 'from-rose-400 to-pink-500' },
  { id: 'U-1043', name: 'Ramesh Iyer', role: 'Elder', city: 'Bengaluru', status: 'active', joined: 'Feb 2026', avatar: 'R', color: 'from-blue-400 to-cyan-500' },
  { id: 'U-1044', name: 'Meera Krishnan', role: 'Family', city: 'Chennai', status: 'active', joined: 'Feb 2026', avatar: 'M', color: 'from-purple-400 to-fuchsia-500' },
  { id: 'U-1045', name: 'Arjun Kumar', role: 'Volunteer', city: 'Bengaluru', status: 'active', joined: 'Mar 2026', avatar: 'A', color: 'from-emerald-400 to-teal-500' },
  { id: 'U-1046', name: 'Kavya Nair', role: 'Volunteer', city: 'Kochi', status: 'pending', joined: 'Mar 2026', avatar: 'K', color: 'from-amber-400 to-orange-500' },
  { id: 'U-1047', name: 'Govind Nair', role: 'Elder', city: 'Bengaluru', status: 'inactive', joined: 'Apr 2026', avatar: 'G', color: 'from-slate-400 to-slate-500' },
];

const pendingVolunteers = [
  { id: 'V-501', name: 'Kavya Nair', age: 26, city: 'Kochi', requests: 0, submitted: '2 days ago', docs: ['ID Proof', 'Address', 'Background Check'], color: 'from-amber-400 to-orange-500' },
  { id: 'V-502', name: 'Rahul Verma', age: 31, city: 'Pune', requests: 0, submitted: '5 days ago', docs: ['ID Proof', 'Address'], color: 'from-blue-400 to-cyan-500' },
  { id: 'V-503', name: 'Sneha Reddy', age: 24, city: 'Hyderabad', requests: 0, submitted: '1 week ago', docs: ['ID Proof', 'Address', 'Background Check', 'Medical Cert'], color: 'from-purple-400 to-fuchsia-500' },
];

const emergencies = [
  { id: 'SOS-9001', elder: 'Sunita Sharma', type: 'Fall Detected', time: '2 min ago', location: 'Jayanagar, Bengaluru', status: 'active', volunteer: 'Arjun Kumar', color: 'from-rose-500 to-red-600' },
  { id: 'SOS-9002', elder: 'Ramesh Iyer', type: 'Panic Button', time: '18 min ago', location: 'JP Nagar, Bengaluru', status: 'dispatched', volunteer: 'Unassigned', color: 'from-amber-500 to-orange-600' },
  { id: 'SOS-9003', elder: 'Lakshmi Rao', type: 'Heart Rate Alert', time: '1 hr ago', location: 'Banashankari, Bengaluru', status: 'resolved', volunteer: 'Meena Iyer', color: 'from-emerald-500 to-teal-600' },
  { id: 'SOS-9004', elder: 'Govind Nair', type: 'Missed Check-in', time: '3 hr ago', location: 'BTM Layout, Bengaluru', status: 'resolved', volunteer: 'Arjun Kumar', color: 'from-blue-500 to-cyan-600' },
];

const reports = [
  { title: 'Monthly Impact Report', desc: 'Volunteer hours, lives touched, response times', date: 'Jun 2026', size: '2.4 MB', icon: FileBarChart, color: 'from-blue-500 to-cyan-600' },
  { title: 'Emergency Response Audit', desc: 'All SOS events with resolution status', date: 'Jun 2026', size: '1.1 MB', icon: ShieldAlert, color: 'from-rose-500 to-red-600' },
  { title: 'Volunteer Verification Log', desc: 'Background checks and approvals', date: 'May 2026', size: '840 KB', icon: ShieldCheck, color: 'from-emerald-500 to-teal-600' },
  { title: 'User Growth Analysis', desc: 'Signups, retention, churn by city', date: 'May 2026', size: '1.8 MB', icon: TrendingUp, color: 'from-purple-500 to-fuchsia-600' },
];

const adminNotifications = [
  { title: 'System Update Scheduled', desc: 'Maintenance window tonight 2–4 AM IST', time: '1 hr ago', type: 'system', icon: SlidersHorizontal },
  { title: 'New Volunteer Applications', desc: '3 applications awaiting verification', time: '3 hr ago', type: 'verify', icon: ShieldCheck },
  { title: 'Emergency Spike Detected', desc: 'Response times up 12% in Bengaluru zone', time: '6 hr ago', type: 'alert', icon: AlertOctagon },
];

const signupsData = [18, 24, 19, 31, 27, 35, 29, 42, 38, 46, 51, 48];
const responseTimes = [4.2, 3.8, 3.5, 3.1, 2.9, 2.6, 2.4];
const roleDistribution = [
  { label: 'Elders', value: 1240, color: '#3b82f6' },
  { label: 'Family', value: 860, color: '#a855f7' },
  { label: 'Volunteers', value: 540, color: '#10b981' },
];

function DonutChart({ data, size = 140 }: { data: { label: string; value: number; color: string }[]; size?: number }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 38;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-5">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {data.map((d, i) => {
            const pct = d.value / total;
            const dash = circ * pct;
            const seg = (
              <circle
                key={i}
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke={d.color}
                strokeWidth="14"
                strokeDasharray={`${dash} ${circ - dash}`}
                strokeDashoffset={-offset}
                className="transition-all duration-700"
              />
            );
            offset += dash;
            return seg;
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-display font-bold text-slate-800">{total.toLocaleString('en-IN')}</span>
          <span className="text-[10px] text-slate-400">Total Users</span>
        </div>
      </div>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
            <span className="text-xs font-semibold text-slate-600">{d.label}</span>
            <span className="text-xs font-bold text-slate-800 ml-auto">{d.value.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminDashboard({ onExit }: { onExit: () => void }) {
  const toast = useToast();
  const [tab, setTab] = useState<AdminTab>('overview');
  const [verified, setVerified] = useState<Record<string, boolean>>({});
  const [rejected, setRejected] = useState<Record<string, boolean>>({});
  const [notifSent, setNotifSent] = useState(false);
  const [audience, setAudience] = useState('All Users');
  const [emergModal, setEmergModal] = useState<null | typeof emergencies[number]>(null);
  const [userModal, setUserModal] = useState<null | typeof adminUsers[number]>(null);
  const [deleteModal, setDeleteModal] = useState<null | typeof adminUsers[number]>(null);
  const [chartRange, setChartRange] = useState<'6m' | '12m' | 'all'>('12m');
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMsg, setNotifMsg] = useState('');

  const verify = (id: string) => { setVerified((p) => ({ ...p, [id]: true })); toast('Volunteer approved successfully', 'success'); };
  const reject = (id: string) => { setRejected((p) => ({ ...p, [id]: true })); toast('Application rejected', 'error'); };

  const sendBroadcast = () => {
    if (!notifTitle.trim() || !notifMsg.trim()) { toast('Please enter title and message', 'error'); return; }
    setNotifSent(true);
    toast(`Broadcast sent to ${audience}`, 'success');
    setNotifTitle(''); setNotifMsg('');
    setTimeout(() => setNotifSent(false), 4000);
  };

  const stats = [
    { label: 'Total Users', value: '2,640', delta: '+12%', up: true, icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Active Emergencies', value: '1', delta: 'Live', up: false, icon: AlertOctagon, color: 'from-rose-500 to-red-500' },
    { label: 'Pending Verifications', value: '3', delta: 'Review', up: false, icon: ShieldCheck, color: 'from-amber-500 to-orange-500' },
    { label: 'Avg Response Time', value: '2.4 min', delta: '-18%', up: true, icon: Clock, color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50/30">
      <header className="sticky top-0 z-40 glass border-b border-white/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-lg shadow-slate-900/20">
                <UserCog className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-slate-800 leading-none">Elder Shield</p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Admin Console
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200">
                <CircleDot className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-700">All Systems Operational</span>
              </div>
              <button onClick={onExit} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-white/60 transition">
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Exit</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar (desktop) + tabs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-5">
          <aside className="lg:w-56 shrink-0">
            <nav className="hidden lg:flex flex-col gap-1 glass rounded-2xl p-3 sticky top-24">
              {adminTabs.map((t) => {
                const Icon = t.icon;
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${active ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-white/60'}`}
                  >
                    <Icon className="w-4 h-4" strokeWidth={active ? 2.5 : 2} />
                    {t.label}
                  </button>
                );
              })}
            </nav>
            {/* mobile tabs */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {adminTabs.map((t) => {
                const Icon = t.icon;
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${active ? 'bg-slate-800 text-white' : 'glass text-slate-600'}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            {tab === 'overview' && (
              <div className="space-y-5">
                <div>
                  <h1 className="text-2xl font-display font-extrabold text-slate-800">Overview</h1>
                  <p className="text-sm text-slate-500">Platform health and key metrics at a glance</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((s) => {
                    const I = s.icon;
                    return (
                      <div key={s.label} className="glass rounded-2xl p-5 shadow-lg shadow-blue-500/5">
                        <div className="flex items-center justify-between">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-md`}>
                            <I className="w-5 h-5 text-white" />
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${s.up ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'}`}>
                            {s.delta}
                          </span>
                        </div>
                        <p className="mt-3 text-2xl font-display font-bold text-slate-800">{s.value}</p>
                        <p className="text-xs text-slate-400">{s.label}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5 lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-display font-bold text-slate-800 text-sm">User Signups · 12 months</h3>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full">+12% YoY</span>
                    </div>
                    <BarChart data={signupsData} color="from-blue-500 to-cyan-400" height={160} />
                  </div>
                  <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center">
                        <PieChart className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-display font-bold text-slate-800 text-sm">User Roles</h3>
                    </div>
                    <DonutChart data={roleDistribution} />
                  </div>
                </div>

                <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center">
                        <AlertOctagon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-display font-bold text-slate-800 text-sm">Live Emergency Monitor</h3>
                    </div>
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> 1 ACTIVE
                    </span>
                  </div>
                  <div className="space-y-3">
                    {emergencies.filter((e) => e.status !== 'resolved').map((e) => (
                      <div key={e.id} className={`flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-2xl border ${e.status === 'active' ? 'border-rose-200 bg-rose-50/50' : 'border-amber-200 bg-amber-50/50'}`}>
                        <div className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${e.color} flex items-center justify-center shadow-md`}>
                          <AlertOctagon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-bold text-slate-800 text-sm">{e.elder}</p>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${e.color}`}>{e.type}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${e.status === 'active' ? 'bg-rose-600 text-white' : 'bg-amber-500 text-white'}`}>{e.status.toUpperCase()}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {e.location}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {e.time}</span>
                            <span className="flex items-center gap-1"><UserCircle className="w-3 h-3" /> {e.volunteer}</span>
                          </div>
                        </div>
                        <button onClick={() => setEmergModal(e)} className="flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-slate-800 to-slate-900 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition">
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'users' && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h1 className="text-2xl font-display font-extrabold text-slate-800">Manage Users</h1>
                    <p className="text-sm text-slate-500">{adminUsers.length} users across all roles</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => toast('Filter panel opened (demo)', 'info')} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 glass hover:bg-white/80 transition">
                      <Filter className="w-3.5 h-3.5" /> Filter
                    </button>
                    <button onClick={() => toast('Exporting user data as CSV (demo)', 'success')} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-slate-800 to-slate-900 shadow-md hover:shadow-lg transition">
                      <Download className="w-3.5 h-3.5" /> Export
                    </button>
                  </div>
                </div>
                <div className="glass rounded-3xl p-2 sm:p-4 shadow-lg shadow-blue-500/5 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-slate-400 border-b border-slate-200/60">
                        <th className="px-3 py-3 font-semibold">User</th>
                        <th className="px-3 py-3 font-semibold">Role</th>
                        <th className="px-3 py-3 font-semibold">City</th>
                        <th className="px-3 py-3 font-semibold">Status</th>
                        <th className="px-3 py-3 font-semibold">Joined</th>
                        <th className="px-3 py-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminUsers.map((u) => (
                        <tr key={u.id} className="border-b border-slate-100/80 hover:bg-white/40 transition">
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-3">
                              <div className={`shrink-0 w-9 h-9 rounded-full bg-gradient-to-br ${u.color} flex items-center justify-center font-bold text-white text-xs`}>{u.avatar}</div>
                              <div className="min-w-0">
                                <p className="font-semibold text-slate-700 truncate">{u.name}</p>
                                <p className="text-[10px] text-slate-400">{u.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-3">
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${u.role === 'Elder' ? 'bg-blue-50 text-blue-700' : u.role === 'Family' ? 'bg-purple-50 text-purple-700' : 'bg-emerald-50 text-emerald-700'}`}>{u.role}</span>
                          </td>
                          <td className="px-3 py-3 text-slate-600">{u.city}</td>
                          <td className="px-3 py-3">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${u.status === 'active' ? 'bg-emerald-50 text-emerald-700' : u.status === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'active' ? 'bg-emerald-500' : u.status === 'pending' ? 'bg-amber-500' : 'bg-slate-400'}`} />
                              {u.status}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-slate-500 text-xs">{u.joined}</td>
                          <td className="px-3 py-3">
                            <div className="flex items-center justify-end gap-1.5">
                              <button onClick={() => setUserModal(u)} className="p-1.5 rounded-lg text-slate-500 hover:bg-white/70 hover:text-blue-600 transition"><Eye className="w-4 h-4" /></button>
                              <button onClick={() => setUserModal(u)} className="p-1.5 rounded-lg text-slate-500 hover:bg-white/70 hover:text-amber-600 transition"><UserCog className="w-4 h-4" /></button>
                              <button onClick={() => setDeleteModal(u)} className="p-1.5 rounded-lg text-slate-500 hover:bg-white/70 hover:text-rose-600 transition"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === 'volunteers' && (
              <div className="space-y-5">
                <div>
                  <h1 className="text-2xl font-display font-extrabold text-slate-800">Verify Volunteers</h1>
                  <p className="text-sm text-slate-500">{pendingVolunteers.length} applications awaiting review</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {pendingVolunteers.map((v) => {
                    const isVerified = verified[v.id];
                    const isRejected = rejected[v.id];
                    return (
                      <div key={v.id} className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
                        <div className="flex items-start gap-4">
                          <div className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center font-bold text-white text-lg shadow-md`}>
                            {v.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-display font-bold text-slate-800">{v.name}</p>
                              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{v.id}</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">{v.age} yrs · {v.city} · Submitted {v.submitted}</p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {v.docs.map((d) => (
                                <span key={d} className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-white/60 px-2 py-1 rounded-lg border border-white/60">
                                  <Check className="w-3 h-3 text-emerald-500" /> {d}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        {isVerified ? (
                          <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                            <span className="text-sm font-bold text-emerald-700">Verified — volunteer can now accept tasks</span>
                          </div>
                        ) : isRejected ? (
                          <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200">
                            <XCircle className="w-5 h-5 text-rose-600" />
                            <span className="text-sm font-bold text-rose-700">Application rejected</span>
                          </div>
                        ) : (
                          <div className="mt-4 flex items-center gap-2">
                            <button onClick={() => verify(v.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                              <ShieldCheck className="w-4 h-4" /> Approve
                            </button>
                            <button onClick={() => reject(v.id)} className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition">
                              <ShieldX className="w-4 h-4" /> Reject
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {tab === 'emergency' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-display font-extrabold text-slate-800">Emergency Monitoring</h1>
                    <p className="text-sm text-slate-500">Real-time SOS events and response status</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1.5 rounded-full">
                    <Radio className="w-3.5 h-3.5 animate-pulse" /> LIVE FEED
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center"><AlertOctagon className="w-4 h-4 text-white" /></div>
                      <p className="text-xs font-semibold text-slate-500">Active</p>
                    </div>
                    <p className="text-3xl font-display font-bold text-rose-600">1</p>
                    <p className="text-xs text-slate-400 mt-1">Requires immediate attention</p>
                  </div>
                  <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center"><Loader2 className="w-4 h-4 text-white" /></div>
                      <p className="text-xs font-semibold text-slate-500">Dispatched</p>
                    </div>
                    <p className="text-3xl font-display font-bold text-amber-600">1</p>
                    <p className="text-xs text-slate-400 mt-1">Volunteer on the way</p>
                  </div>
                  <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                      <p className="text-xs font-semibold text-slate-500">Resolved (24h)</p>
                    </div>
                    <p className="text-3xl font-display font-bold text-emerald-600">2</p>
                    <p className="text-xs text-slate-400 mt-1">Closed successfully</p>
                  </div>
                </div>
                <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
                  <h3 className="font-display font-bold text-slate-800 text-sm mb-4">All Events</h3>
                  <div className="space-y-3">
                    {emergencies.map((e) => (
                      <div key={e.id} className={`flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-2xl border ${e.status === 'active' ? 'border-rose-200 bg-rose-50/40' : e.status === 'dispatched' ? 'border-amber-200 bg-amber-50/40' : 'border-slate-200 bg-white/40'}`}>
                        <div className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${e.color} flex items-center justify-center shadow-md`}>
                          <AlertOctagon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-bold text-slate-800 text-sm">{e.elder}</p>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${e.color}`}>{e.type}</span>
                            <span className="text-[10px] text-slate-400">{e.id}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {e.location}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {e.time}</span>
                            <span className="flex items-center gap-1"><UserCircle className="w-3 h-3" /> {e.volunteer}</span>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${e.status === 'active' ? 'bg-rose-600 text-white' : e.status === 'dispatched' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'}`}>{e.status.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'analytics' && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h1 className="text-2xl font-display font-extrabold text-slate-800">Analytics</h1>
                    <p className="text-sm text-slate-500">Platform performance and trends</p>
                  </div>
                  <div className="flex items-center gap-1.5 p-1 rounded-xl glass">
                    {(['6m', '12m', 'all'] as const).map((r) => (
                      <button key={r} onClick={() => { setChartRange(r); toast(`Showing ${r === 'all' ? 'all time' : r + ' data'}`, 'info'); }} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${chartRange === r ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>
                        {r === 'all' ? 'All Time' : r.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-white" /></div>
                      <h3 className="font-display font-bold text-slate-800 text-sm">Monthly Signups</h3>
                    </div>
                    <BarChart data={signupsData} color="from-blue-500 to-cyan-400" height={180} />
                  </div>
                  <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center"><Activity className="w-4 h-4 text-white" /></div>
                      <h3 className="font-display font-bold text-slate-800 text-sm">Avg Response Time (min)</h3>
                    </div>
                    <Sparkline data={responseTimes} color="#10b981" height={90} />
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded-lg bg-white/40"><p className="text-sm font-bold text-slate-700">2.4m</p><p className="text-[10px] text-slate-400">Current</p></div>
                      <div className="p-2 rounded-lg bg-white/40"><p className="text-sm font-bold text-slate-700">3.5m</p><p className="text-[10px] text-slate-400">Avg 7d</p></div>
                      <div className="p-2 rounded-lg bg-white/40"><p className="text-sm font-bold text-emerald-600">-43%</p><p className="text-[10px] text-slate-400">Trend</p></div>
                    </div>
                  </div>
                  <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center"><PieChart className="w-4 h-4 text-white" /></div>
                      <h3 className="font-display font-bold text-slate-800 text-sm">User Role Distribution</h3>
                    </div>
                    <DonutChart data={roleDistribution} size={160} />
                  </div>
                  <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center"><Building className="w-4 h-4 text-white" /></div>
                      <h3 className="font-display font-bold text-slate-800 text-sm">Top Cities by Users</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        { city: 'Bengaluru', users: 980, pct: 90 },
                        { city: 'Chennai', users: 620, pct: 64 },
                        { city: 'Kochi', users: 410, pct: 42 },
                        { city: 'Pune', users: 330, pct: 34 },
                      ].map((c) => (
                        <div key={c.city}>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-semibold text-slate-600">{c.city}</span>
                            <span className="font-bold text-slate-700">{c.users.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-200/60 overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500" style={{ width: `${c.pct}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === 'reports' && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h1 className="text-2xl font-display font-extrabold text-slate-800">Reports</h1>
                    <p className="text-sm text-slate-500">Generate and download platform reports</p>
                  </div>
                  <button onClick={() => toast('Generating report… (demo)', 'info')} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-slate-800 to-slate-900 shadow-md hover:shadow-lg transition">
                    <FileText className="w-3.5 h-3.5" /> Generate New
                  </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {reports.map((r) => {
                    const Icon = r.icon;
                    return (
                      <div key={r.title} className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5 hover:-translate-y-0.5 hover:shadow-md transition-all">
                        <div className="flex items-start gap-4">
                          <div className={`shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br ${r.color} flex items-center justify-center shadow-md`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-display font-bold text-slate-800">{r.title}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{r.desc}</p>
                            <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-400">
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {r.date}</span>
                              <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {r.size}</span>
                            </div>
                          </div>
                        </div>
                        <button onClick={() => toast(`Downloading ${r.title} (demo)`, 'success')} className="mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold text-slate-700 bg-white/60 hover:bg-white transition border border-white/60">
                          <Download className="w-4 h-4 text-slate-600" /> Download PDF
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {tab === 'notifications' && (
              <div className="space-y-5">
                <div>
                  <h1 className="text-2xl font-display font-extrabold text-slate-800">Notifications</h1>
                  <p className="text-sm text-slate-500">Broadcast alerts and system messages</p>
                </div>
                <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center"><Megaphone className="w-4 h-4 text-white" /></div>
                    <h3 className="font-display font-bold text-slate-800 text-sm">Compose Broadcast</h3>
                  </div>
                  <div className="space-y-3">
                    <input type="text" value={notifTitle} onChange={(e) => setNotifTitle(e.target.value)} placeholder="Notification title" className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/60 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    <textarea value={notifMsg} onChange={(e) => setNotifMsg(e.target.value)} placeholder="Message to all users…" rows={3} className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/60 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
                    <div className="flex items-center gap-2 flex-wrap">
                      {['All Users', 'Elders', 'Volunteers', 'Family'].map((g) => (
                        <button key={g} onClick={() => setAudience(g)} className={`text-xs font-semibold px-3 py-1.5 rounded-full transition ${audience === g ? 'bg-slate-800 text-white' : 'bg-white/60 text-slate-600 border border-white/60 hover:bg-white/80'}`}>{g}</button>
                      ))}
                    </div>
                    <button
                      onClick={sendBroadcast}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-slate-800 to-slate-900 shadow-md hover:shadow-lg transition"
                    >
                      <Send className="w-4 h-4" /> Send Broadcast
                    </button>
                    {notifSent && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span className="text-sm font-bold text-emerald-700">Broadcast sent to {audience}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="glass rounded-3xl p-6 shadow-lg shadow-blue-500/5">
                  <h3 className="font-display font-bold text-slate-800 text-sm mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {adminNotifications.map((n) => {
                      const Icon = n.icon;
                      const colorMap: Record<string, string> = { system: 'from-blue-500 to-cyan-500', verify: 'from-emerald-500 to-teal-500', alert: 'from-rose-500 to-red-500' };
                      return (
                        <div key={n.title} className="flex items-start gap-3 p-3 rounded-2xl bg-white/40 border border-white/50">
                          <div className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${colorMap[n.type]} flex items-center justify-center shadow-md`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-700">{n.title}</p>
                            <p className="text-xs text-slate-400">{n.desc}</p>
                            <p className="text-[10px] text-slate-300 mt-0.5">{n.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <Modal open={!!emergModal} onClose={() => setEmergModal(null)} title="Emergency Details" icon={AlertOctagon} iconColor="from-rose-500 to-red-600" maxWidth="max-w-lg">
        {emergModal && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${emergModal.color} flex items-center justify-center shadow-md`}>
                <AlertOctagon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-slate-800">{emergModal.elder}</p>
                <p className="text-xs text-slate-400">{emergModal.id} · {emergModal.type}</p>
              </div>
              <span className={`ml-auto text-[10px] font-bold px-2.5 py-1 rounded-full ${emergModal.status === 'active' ? 'bg-rose-600 text-white' : emergModal.status === 'dispatched' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'}`}>{emergModal.status.toUpperCase()}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/50 border border-white/60">
                <p className="text-xs text-slate-400">Location</p>
                <p className="text-sm font-bold text-slate-700">{emergModal.location}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/50 border border-white/60">
                <p className="text-xs text-slate-400">Time</p>
                <p className="text-sm font-bold text-slate-700">{emergModal.time}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/50 border border-white/60">
                <p className="text-xs text-slate-400">Assigned Volunteer</p>
                <p className="text-sm font-bold text-slate-700">{emergModal.volunteer}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/50 border border-white/60">
                <p className="text-xs text-slate-400">Type</p>
                <p className="text-sm font-bold text-slate-700">{emergModal.type}</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200">
              <p className="text-sm text-slate-600"><span className="font-bold text-rose-700">Live Status:</span> Volunteer dispatched and en route. ETA 3 minutes. Family has been notified.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setEmergModal(null); toast('Calling volunteer…', 'info'); }} className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md hover:shadow-lg transition">Contact Volunteer</button>
              <button onClick={() => { setEmergModal(null); toast('Emergency resolved', 'success'); }} className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md hover:shadow-lg transition">Mark Resolved</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!userModal} onClose={() => setUserModal(null)} title="User Details" icon={UserCog} iconColor="from-blue-500 to-cyan-500">
        {userModal && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${userModal.color} flex items-center justify-center font-bold text-white text-lg shadow-md`}>{userModal.avatar}</div>
              <div>
                <p className="font-display font-bold text-slate-800 text-lg">{userModal.name}</p>
                <p className="text-xs text-slate-400">{userModal.id} · {userModal.role}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/50 border border-white/60">
                <p className="text-xs text-slate-400">City</p>
                <p className="text-sm font-bold text-slate-700">{userModal.city}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/50 border border-white/60">
                <p className="text-xs text-slate-400">Status</p>
                <p className="text-sm font-bold text-slate-700 capitalize">{userModal.status}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/50 border border-white/60">
                <p className="text-xs text-slate-400">Joined</p>
                <p className="text-sm font-bold text-slate-700">{userModal.joined}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/50 border border-white/60">
                <p className="text-xs text-slate-400">Role</p>
                <p className="text-sm font-bold text-slate-700">{userModal.role}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setUserModal(null); toast('User profile updated (demo)', 'success'); }} className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md hover:shadow-lg transition">Save Changes</button>
              <button onClick={() => setUserModal(null)} className="flex-1 py-3 rounded-xl text-sm font-bold text-slate-600 bg-white/60 border border-white/60 hover:bg-white/80 transition">Close</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!deleteModal} onClose={() => setDeleteModal(null)} title="Confirm Deletion" icon={Trash2} iconColor="from-rose-500 to-red-600">
        {deleteModal && (
          <div className="space-y-4">
            <p className="text-slate-600">Are you sure you want to delete <span className="font-bold text-slate-800">{deleteModal.name}</span>? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal(null)} className="flex-1 py-3 rounded-xl text-sm font-bold text-slate-600 bg-white/60 border border-white/60 hover:bg-white/80 transition">Cancel</button>
              <button onClick={() => { setDeleteModal(null); toast('User deleted (demo)', 'error'); }} className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-red-600 shadow-md hover:shadow-lg transition">Delete User</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

/* ----------------------------- App ----------------------------- */
export default function App() {
  const [view, setView] = useState<'landing' | 'auth' | 'senior' | 'family' | 'volunteer' | 'admin'>('landing');
  const [authPage, setAuthPage] = useState<'signin' | 'signup' | 'forgot' | 'role'>('signin');
  const [authRole, setAuthRole] = useState<AuthRole | null>(null);
  const [session, setSession] = useState<AuthRole | null>(null);
  useReveal();

  const handleAuthSuccess = (role: AuthRole) => {
    setSession(role);
    setView(role === 'senior' ? 'senior' : role === 'family' ? 'family' : role === 'volunteer' ? 'volunteer' : 'admin');
  };

  const handleLogout = () => {
    setSession(null);
    setView('landing');
  };

  const openAuth = (page: 'signin' | 'signup' | 'forgot' | 'role', role: AuthRole | null = null) => {
    setAuthPage(page);
    setAuthRole(role);
    setView('auth');
  };

  if (view === 'auth') {
    return (
      <ToastProvider>
        <Auth initialPage={authPage} presetRole={authRole} onBack={() => setView('landing')} onSuccess={handleAuthSuccess} />
      </ToastProvider>
    );
  }
  if (view === 'senior' && session === 'senior') {
    return (
      <ToastProvider>
        <Dashboard onExit={handleLogout} />
      </ToastProvider>
    );
  }
  if (view === 'family' && session === 'family') {
    return (
      <ToastProvider>
        <FamilyDashboard onExit={handleLogout} />
      </ToastProvider>
    );
  }
  if (view === 'volunteer' && session === 'volunteer') {
    return (
      <ToastProvider>
        <VolunteerDashboard onExit={handleLogout} />
      </ToastProvider>
    );
  }
  if (view === 'admin' && session === 'admin') {
    return (
      <ToastProvider>
        <AdminDashboard onExit={handleLogout} />
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        <a href="#home" className="skip-link">Skip to content</a>
        <BackgroundShapes />
        <Navbar
          onOpenDashboard={() => openAuth('signin', 'senior')}
          onOpenAuth={(page, role) => openAuth(page, role ?? null)}
        />
        <main className="page-enter" id="main-content">
          <Hero onGetStarted={() => openAuth('role')} />
          <StatsSection />
          <FeaturesSection />
          <AboutSection />
          <HowItWorksSection />
          <ImpactSection />
          <HealthcarePartnersSection />
          <SuccessStoriesSection />
          <CommunityImpactSection />
          <TestimonialsSection />
          <BlogSection />
          <EventsSection />
          <FaqSection />
          <VolunteerRegistrationSection />
          <EmergencyHelplineSection />
          <ContactSection />
          <NewsletterSection />
        </main>
        <EnhancedFooter />
        <BackToTop sections={['home', 'about', 'services', 'how-it-works', 'impact', 'partners', 'stories', 'community', 'testimonials', 'blog', 'events', 'faq', 'volunteer', 'helpline', 'contact', 'newsletter']} />
      </div>
    </ToastProvider>
  );
}
