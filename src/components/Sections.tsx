import { useRef, useState, useEffect } from 'react';
import {
  Building2, HeartPulse, Award, ArrowRight, Quote, TrendingUp,
  Calendar, MapPin, Clock, Users, Stethoscope, HandHeart, Star,
  BookOpen, Sparkles, ArrowUpRight,
} from 'lucide-react';
import { useToast, Modal } from '@/lib/ui';

/* ----------------------------- Healthcare Partners ----------------------------- */
const partners = [
  { name: 'Apollo Hospitals', city: 'Chennai', icon: Stethoscope, gradient: 'from-blue-500 to-cyan-500' },
  { name: 'AIIMS', city: 'New Delhi', icon: Building2, gradient: 'from-red-500 to-rose-500' },
  { name: 'Fortis Healthcare', city: 'Mumbai', icon: HeartPulse, gradient: 'from-purple-500 to-indigo-500' },
  { name: 'Manipal Health', city: 'Bengaluru', icon: Award, gradient: 'from-emerald-500 to-teal-500' },
  { name: 'Tata Memorial', city: 'Mumbai', icon: Stethoscope, gradient: 'from-amber-500 to-orange-500' },
  { name: 'Narayana Health', city: 'Bengaluru', icon: Building2, gradient: 'from-cyan-500 to-blue-500' },
  { name: 'Max Healthcare', city: 'New Delhi', icon: HeartPulse, gradient: 'from-rose-500 to-pink-500' },
  { name: 'Medanta', city: 'Gurugram', icon: Award, gradient: 'from-violet-500 to-purple-500' },
];

export function HealthcarePartnersSection() {
  return (
    <section id="partners" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold text-slate-700 shadow-sm">
            <Building2 className="w-4 h-4 text-blue-500" />
            Trusted by India's leading hospitals
          </div>
          <h2 className="reveal reveal-delay-1 mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            Our Healthcare{' '}
            <span className="text-gradient gradient-animate">Partners</span>
          </h2>
          <p className="reveal reveal-delay-2 mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            We collaborate with India's most respected hospitals and medical
            institutions to ensure every senior gets quality care when they need it.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {partners.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className={`reveal reveal-delay-${(i % 4) + 1} group glass rounded-3xl p-5 sm:p-6 text-center hover:-translate-y-1.5 transition-all duration-500 shadow-lg shadow-blue-500/5 hover:shadow-2xl`}
              >
                <div className={`mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition`}>
                  <Icon className="w-7 h-7 text-white" strokeWidth={2.2} />
                </div>
                <p className="mt-4 font-bold text-slate-800 text-sm">{p.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{p.city}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Success Stories ----------------------------- */
const stories = [
  {
    name: 'Lakshmi Devi',
    age: 72,
    city: 'Jaipur, Rajasthan',
    title: 'Saved by a single tap',
    text: 'I felt dizzy one evening and couldn\'t reach my phone. The SOS button on my wristband alerted my son and a volunteer within seconds. Help arrived in 8 minutes.',
    gradient: 'from-rose-500 to-pink-600',
    avatar: 'L',
  },
  {
    name: 'Rajesh Mehta',
    age: 68,
    city: 'Pune, Maharashtra',
    title: 'Never misses medicine now',
    text: 'The voice assistant reminds me in Hindi every day. My daughter sees my medicine tracker from London and feels reassured. I haven\'t missed a single dose in 4 months.',
    gradient: 'from-blue-500 to-cyan-600',
    avatar: 'R',
  },
  {
    name: 'Kamala Nair',
    age: 75,
    city: 'Kochi, Kerala',
    title: 'My volunteer is family',
    text: 'Arun visits me every week, helps with groceries and bank work. He\'s not just a volunteer — he\'s family now. Elder Shield gave me a companion when I felt alone.',
    gradient: 'from-emerald-500 to-teal-600',
    avatar: 'K',
  },
];

export function SuccessStoriesSection() {
  const [openStory, setOpenStory] = useState<typeof stories[number] | null>(null);
  const toast = useToast();

  return (
    <section id="stories" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold text-slate-700 shadow-sm">
            <HeartPulse className="w-4 h-4 text-rose-500" />
            Real lives, real impact
          </div>
          <h2 className="reveal reveal-delay-1 mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            Success{' '}
            <span className="text-gradient gradient-animate">Stories</span>
          </h2>
          <p className="reveal reveal-delay-2 mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            Hear from the seniors and families whose lives have been transformed
            by Elder Shield India.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <div
              key={s.name}
              className={`reveal reveal-delay-${i + 1} group glass rounded-3xl p-6 sm:p-7 hover:-translate-y-2 transition-all duration-500 shadow-lg shadow-blue-500/5 hover:shadow-2xl`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center font-bold text-white text-lg shadow-md`}>
                  {s.avatar}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{s.name}</p>
                  <p className="text-xs text-slate-400">{s.age} yrs · {s.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <h3 className="font-display font-bold text-slate-800 text-base mb-2">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{s.text}</p>
              <button
                onClick={() => setOpenStory(s)}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:gap-2.5 transition-all"
              >
                Read full story <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal open={!!openStory} onClose={() => setOpenStory(null)} title={openStory?.title} icon={Quote} iconColor="from-rose-500 to-pink-600" maxWidth="max-w-xl">
        {openStory && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${openStory.gradient} flex items-center justify-center font-bold text-white text-xl shadow-md`}>
                {openStory.avatar}
              </div>
              <div>
                <p className="font-display font-bold text-slate-800">{openStory.name}</p>
                <p className="text-sm text-slate-400">{openStory.age} years · {openStory.city}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-slate-600 leading-relaxed text-sm">{openStory.text}</p>
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
              <p className="text-sm text-slate-600">
                <span className="font-bold text-blue-700">Impact:</span> This story represents one of thousands of seniors across India who now feel safer, more connected, and never alone — thanks to Elder Shield's community-driven platform.
              </p>
            </div>
            <button onClick={() => { setOpenStory(null); toast('Thank you for reading!', 'info'); }} className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-pink-600 shadow-md hover:shadow-lg transition">
              Share this story
            </button>
          </div>
        )}
      </Modal>
    </section>
  );
}

/* ----------------------------- Community Impact ----------------------------- */
const communityStats = [
  { icon: Users, label: 'Active Community Members', value: 21000, suffix: '+', gradient: 'from-blue-500 to-cyan-500' },
  { icon: HandHeart, label: 'Volunteer Hours Contributed', value: 145000, suffix: '+', gradient: 'from-emerald-500 to-teal-500' },
  { icon: Stethoscope, label: 'Free Health Check-ups', value: 32000, suffix: '+', gradient: 'from-purple-500 to-indigo-500' },
  { icon: Award, label: 'NGO Partnerships', value: 180, suffix: '+', gradient: 'from-amber-500 to-orange-500' },
];

const ngos = [
  { name: 'HelpAge India', focus: 'Elder Care', city: 'Pan-India', gradient: 'from-blue-500 to-cyan-500' },
  { name: 'Dignity Foundation', focus: 'Senior Dignity', city: 'Mumbai', gradient: 'from-emerald-500 to-teal-500' },
  { name: 'Agewell Foundation', focus: 'Rural Elders', city: 'New Delhi', gradient: 'from-purple-500 to-indigo-500' },
  { name: 'Nightingales Medical Trust', focus: 'Dementia Care', city: 'Bengaluru', gradient: 'from-rose-500 to-pink-500' },
  { name: 'Samarpan', focus: 'Mental Health', city: 'Kolkata', gradient: 'from-amber-500 to-orange-500' },
  { name: 'Vridha Seva Trust', focus: 'Old Age Homes', city: 'Hyderabad', gradient: 'from-cyan-500 to-blue-500' },
];

export function CommunityImpactSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const toast = useToast();

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.25 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="community" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold text-slate-700 shadow-sm">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            Together we are stronger
          </div>
          <h2 className="reveal reveal-delay-1 mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            Community{' '}
            <span className="text-gradient gradient-animate">Impact</span>
          </h2>
          <p className="reveal reveal-delay-2 mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            Our growing network of NGOs, volunteers, and healthcare partners is
            building a safety net for India's seniors — one city at a time.
          </p>
        </div>

        <div ref={ref} className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {communityStats.map((stat, i) => {
            const Icon = stat.icon;
            const display = inView ? stat.value : 0;
            return (
              <div key={stat.label} className={`reveal reveal-delay-${(i % 4) + 1} group glass rounded-3xl p-6 text-center hover:-translate-y-1.5 transition-all duration-500 shadow-lg shadow-blue-500/5 hover:shadow-2xl`}>
                <div className={`mx-auto mb-4 w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition`}>
                  <Icon className="w-7 h-7 text-white" strokeWidth={2.2} />
                </div>
                <div className="text-3xl font-extrabold font-display text-slate-800 tracking-tight">
                  {display.toLocaleString('en-IN')}<span className="text-gradient">{stat.suffix}</span>
                </div>
                <p className="mt-1.5 text-sm font-medium text-slate-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-14">
          <h3 className="reveal text-center font-display font-bold text-xl text-slate-800 mb-6">Our NGO Partners</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ngos.map((ngo, i) => (
              <div key={ngo.name} className={`reveal reveal-delay-${(i % 3) + 1} group glass rounded-2xl p-5 hover:-translate-y-1 transition-all duration-500 shadow-lg shadow-blue-500/5`}>
                <div className="flex items-center gap-3">
                  <div className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${ngo.gradient} flex items-center justify-center shadow-md`}>
                    <HandHeart className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-sm">{ngo.name}</p>
                    <p className="text-xs text-slate-400">{ngo.focus} · {ngo.city}</p>
                  </div>
                  <button onClick={() => toast(`Learn more about ${ngo.name} (demo)`, 'info')} className="shrink-0 w-8 h-8 rounded-lg bg-white/60 flex items-center justify-center text-slate-400 hover:text-blue-600 transition">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center reveal">
          <button
            onClick={() => toast('Partnership enquiry sent! We\'ll be in touch soon.', 'success')}
            className="group inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:-translate-y-0.5 transition-all"
          >
            <HandHeart className="w-5 h-5" />
            Partner With Us
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Blog / Health Tips ----------------------------- */
const blogPosts = [
  {
    title: '5 Foods That Boost Immunity in Seniors',
    excerpt: 'From turmeric milk to amla, discover everyday Indian foods that strengthen the immune system naturally.',
    category: 'Nutrition',
    date: 'Jul 15, 2026',
    readTime: '4 min',
    gradient: 'from-amber-500 to-orange-600',
    icon: Sparkles,
  },
  {
    title: 'Managing Hypertension After 60',
    excerpt: 'Simple lifestyle changes and daily habits that help keep blood pressure in a healthy range — backed by cardiologists.',
    category: 'Heart Health',
    date: 'Jul 10, 2026',
    readTime: '6 min',
    gradient: 'from-rose-500 to-pink-600',
    icon: HeartPulse,
  },
  {
    title: 'Yoga for Joint Pain: A Gentle Guide',
    excerpt: 'Five easy yoga asanas that improve flexibility and reduce joint stiffness — perfect for seniors of all fitness levels.',
    category: 'Fitness',
    date: 'Jul 5, 2026',
    readTime: '5 min',
    gradient: 'from-emerald-500 to-teal-600',
    icon: BookOpen,
  },
  {
    title: 'Recognising Stroke Symptoms Early',
    excerpt: 'The FAST method can save a life. Learn to identify stroke signs in seconds and what to do immediately.',
    category: 'Emergency',
    date: 'Jun 28, 2026',
    readTime: '3 min',
    gradient: 'from-blue-500 to-cyan-600',
    icon: Stethoscope,
  },
  {
    title: 'Digital Safety Tips for Seniors',
    excerpt: 'How to spot online scams, phishing attempts, and fraud calls targeting elders — stay safe in the digital world.',
    category: 'Safety',
    date: 'Jun 20, 2026',
    readTime: '7 min',
    gradient: 'from-purple-500 to-indigo-600',
    icon: Award,
  },
  {
    title: 'Staying Socially Connected After Retirement',
    excerpt: 'Practical ways to combat loneliness — from community groups to video calls with family across the world.',
    category: 'Mental Health',
    date: 'Jun 15, 2026',
    readTime: '5 min',
    gradient: 'from-cyan-500 to-blue-600',
    icon: Users,
  },
];

export function BlogSection() {
  const toast = useToast();

  return (
    <section id="blog" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold text-slate-700 shadow-sm">
            <BookOpen className="w-4 h-4 text-purple-500" />
            Health tips & insights
          </div>
          <h2 className="reveal reveal-delay-1 mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            Health Tips &{' '}
            <span className="text-gradient gradient-animate">Blog</span>
          </h2>
          <p className="reveal reveal-delay-2 mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            Expert articles, practical health tips, and wellness guidance
            curated for India's seniors and their families.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => {
            const Icon = post.icon;
            return (
              <article
                key={post.title}
                className={`reveal reveal-delay-${(i % 3) + 1} group glass rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-lg shadow-blue-500/5 hover:shadow-2xl cursor-pointer`}
                onClick={() => toast(`Opening: ${post.title}`, 'info')}
              >
                <div className={`relative h-32 bg-gradient-to-br ${post.gradient} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%), linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }} />
                  <Icon className="relative w-12 h-12 text-white" strokeWidth={1.8} />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>
                  <h3 className="font-display font-bold text-slate-800 text-base leading-snug group-hover:text-blue-600 transition">{post.title}</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:gap-2.5 transition-all">
                    Read more <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 text-center reveal">
          <button
            onClick={() => toast('Loading all articles… (demo)', 'info')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-slate-700 glass shadow-lg hover:-translate-y-0.5 transition-all"
          >
            View all articles <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Upcoming Volunteer Events ----------------------------- */
const events = [
  {
    title: 'Free Health Check-up Camp',
    date: 'Aug 3, 2026',
    time: '9:00 AM – 1:00 PM',
    location: 'Jayanagar 4th Block, Bengaluru',
    spots: 45,
    filled: 32,
    gradient: 'from-blue-500 to-cyan-600',
    icon: Stethoscope,
  },
  {
    title: 'Senior Digital Literacy Workshop',
    date: 'Aug 10, 2026',
    time: '10:00 AM – 12:00 PM',
    location: 'Connaught Place, New Delhi',
    spots: 30,
    filled: 18,
    gradient: 'from-emerald-500 to-teal-600',
    icon: BookOpen,
  },
  {
    title: 'Community Walk for Elder Care',
    date: 'Aug 17, 2026',
    time: '6:30 AM – 8:00 AM',
    location: 'Marine Drive, Mumbai',
    spots: 100,
    filled: 67,
    gradient: 'from-rose-500 to-pink-600',
    icon: Users,
  },
  {
    title: 'Dementia Awareness Session',
    date: 'Aug 24, 2026',
    time: '4:00 PM – 6:00 PM',
    location: 'Banjara Hills, Hyderabad',
    spots: 50,
    filled: 41,
    gradient: 'from-purple-500 to-indigo-600',
    icon: HeartPulse,
  },
];

export function EventsSection() {
  const toast = useToast();

  return (
    <section id="events" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-semibold text-slate-700 shadow-sm">
            <Calendar className="w-4 h-4 text-emerald-500" />
            Join us in your city
          </div>
          <h2 className="reveal reveal-delay-1 mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-slate-900">
            Upcoming Volunteer{' '}
            <span className="text-gradient gradient-animate">Events</span>
          </h2>
          <p className="reveal reveal-delay-2 mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
            Health camps, workshops, and community drives across India.
            Register and make a difference in your neighbourhood.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {events.map((ev, i) => {
            const Icon = ev.icon;
            const pct = Math.round((ev.filled / ev.spots) * 100);
            return (
              <div key={ev.title} className={`reveal reveal-delay-${(i % 2) + 1} group glass rounded-3xl p-6 hover:-translate-y-1.5 transition-all duration-500 shadow-lg shadow-blue-500/5 hover:shadow-2xl`}>
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${ev.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" strokeWidth={2.2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-slate-800 text-base">{ev.title}</h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-slate-500 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {ev.date} · {ev.time}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {ev.location}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5">
                    <span>{ev.filled} registered</span>
                    <span>{ev.spots - ev.filled} spots left</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200/60 overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r ${ev.gradient} transition-all duration-700`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <button
                  onClick={() => toast(`Registered for "${ev.title}"! We'll send details to your email.`, 'success')}
                  className="mt-4 w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Register for this event
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
