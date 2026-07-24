import { useState } from 'react';
import {
  Shield, Heart, Facebook, Twitter, Instagram, Linkedin, Phone, Mail,
  MapPin, ChevronDown, Siren, Ambulance, HeartPulse,
} from 'lucide-react';
import { useToast, Modal } from '@/lib/ui';

const emergencyNumbers = [
  { label: 'Elder Shield Helpline', number: '1800-200-1234', icon: Shield, gradient: 'from-blue-500 to-cyan-600' },
  { label: 'Ambulance', number: '108', icon: Ambulance, gradient: 'from-rose-500 to-red-600' },
  { label: 'Police', number: '100', icon: Siren, gradient: 'from-blue-600 to-indigo-600' },
  { label: 'Senior Citizen Helpline', number: '14567', icon: HeartPulse, gradient: 'from-emerald-500 to-teal-600' },
];

const faqs = [
  { q: 'Is Elder Shield free for senior citizens?', a: 'Yes! The core platform — SOS, medicine reminders, daily check-ins, and family connectivity — is completely free for all senior citizens in India. Premium features like doctor video consultations may have nominal fees.' },
  { q: 'How do I become a volunteer?', a: 'Click "Volunteer" in the navigation, fill out the registration form, and complete a short online orientation. Once verified by our team (usually within 48 hours), you can start accepting nearby requests.' },
  { q: 'Which cities does Elder Shield operate in?', a: 'We are currently active in 250+ cities across 28 states and 8 union territories, and expanding rapidly. New cities are added every month based on volunteer availability.' },
  { q: 'Is my health data secure?', a: 'Absolutely. All health records are encrypted with bank-grade AES-256 encryption. We are ISO 27001 certified and comply with India\'s Digital Personal Data Protection Act. Your data is never shared without consent.' },
  { q: 'Can I use Elder Shield in my regional language?', a: 'Yes. The platform supports 12+ Indian languages including Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi, Gujarati, Punjabi, and more. You can switch languages anytime from settings.' },
  { q: 'What happens when I press the SOS button?', a: 'Pressing SOS instantly sends your live GPS location to your family members, the nearest verified volunteers, and emergency services. A countdown timer gives you 5 seconds to cancel if pressed accidentally.' },
];

const legalPages = [
  { title: 'Privacy Policy', body: 'Elder Shield India is committed to protecting your privacy. We collect only the information necessary to provide our services — your name, contact details, health data, and location during emergencies. All data is encrypted with AES-256 and stored on secure servers in India. We never sell your data to third parties. You can request data deletion at any time by contacting privacy@eldershield.in. We comply fully with the Digital Personal Data Protection Act, 2023.' },
  { title: 'Terms & Conditions', body: 'By using Elder Shield India, you agree to use the platform responsibly and lawfully. Volunteers must complete verification before accepting tasks. SOS should be used only in genuine emergencies — false alerts may result in account suspension. Health information is provided for general guidance only and does not replace professional medical advice. The platform is provided "as is" without warranty of any kind.' },
  { title: 'Accessibility', body: 'Elder Shield India is designed to be accessible to all users, including seniors with visual, motor, or cognitive impairments. We follow WCAG 2.1 AA guidelines: large touch targets (min 44px), high contrast ratios (4.5:1+), full keyboard navigation, screen reader compatibility, and adjustable text sizes. Dark mode is available for users with light sensitivity. If you encounter accessibility barriers, please write to access@eldershield.in.' },
  { title: 'Careers', body: 'We are always looking for passionate individuals to join our mission of protecting India\'s elders. Current openings: Community Manager (Bengaluru), Mobile App Developer (Remote), Healthcare Partnerships Lead (Mumbai), Volunteer Coordinator (Delhi), and UX Designer (Remote). Send your resume to careers@eldershield.in with the role in the subject line.' },
];

export function EnhancedFooter() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [legalModal, setLegalModal] = useState<string | null>(null);
  const [faqModal, setFaqModal] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { toast('Please enter your email', 'error'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast('Please enter a valid email', 'error'); return; }
    setSubscribed(true);
    setEmail('');
    toast('Subscribed to Elder Shield newsletter!', 'success');
    setTimeout(() => setSubscribed(false), 4000);
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const linkGroups = [
    { title: 'Platform', links: [['Home', '#home'], ['About', '#about'], ['Services', '#services'], ['Impact', '#impact'], ['Partners', '#partners']] },
    { title: 'Community', links: [['Volunteer', '#volunteer'], ['Stories', '#stories'], ['Community Impact', '#community'], ['Events', '#events'], ['Blog', '#blog']] },
    { title: 'Company', links: [['Contact', '#contact'], ['Newsletter', '#newsletter'], ['FAQ', '#faq'], ['Helpline', '#helpline']] },
  ];

  const legalLinks = ['Privacy Policy', 'Terms & Conditions', 'Accessibility', 'Careers'];

  return (
    <>
      <footer className="relative bg-gradient-to-b from-transparent to-slate-100 dark:to-slate-900/60 pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Emergency Numbers Banner */}
          <div className="mb-10 glass rounded-3xl p-5 shadow-lg shadow-rose-500/5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-md">
                <Siren className="w-5 h-5 text-white" />
              </div>
              <p className="font-display font-bold text-slate-800 text-sm">Emergency Numbers</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {emergencyNumbers.map((en) => {
                const Icon = en.icon;
                return (
                  <a
                    key={en.label}
                    href={`tel:${en.number.replace(/[-\s]/g, '')}`}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/40 border border-white/50 hover:bg-white/60 hover:-translate-y-0.5 transition-all group"
                  >
                    <div className={`shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br ${en.gradient} flex items-center justify-center shadow-md`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-400 font-medium truncate">{en.label}</p>
                      <p className="text-sm font-bold text-slate-700 group-hover:text-rose-600 transition">{en.number}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-display font-extrabold text-lg text-slate-800 tracking-tight">Elder Shield</p>
                  <p className="text-xs text-slate-500">Protecting India's elders, together.</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500 max-w-sm leading-relaxed">
                A community-driven platform empowering seniors with emergency support,
                health monitoring, and compassionate care — across 250+ cities in India.
              </p>
              {/* Contact details */}
              <div className="mt-5 space-y-2">
                <p className="text-xs text-slate-500 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-500" /> support@eldershield.in
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" /> 1800-200-1234 (Toll Free)
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" /> #42, MG Road, Bengaluru — 560001
                </p>
              </div>
              <div className="mt-5 flex items-center gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" onClick={(e) => { e.preventDefault(); toast('Social link (demo)', 'info'); }} aria-label="Social link" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-500 hover:text-blue-600 hover:-translate-y-0.5 transition">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {linkGroups.map((g) => (
              <div key={g.title}>
                <p className="font-display font-bold text-slate-800 text-sm">{g.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {g.links.map(([label, href]) => (
                    <li key={label}>
                      <button onClick={() => href === '#faq' ? setFaqModal(true) : scrollTo(href)} className="text-sm text-slate-500 hover:text-blue-600 transition text-left">
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Legal links */}
          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {legalLinks.map((l) => (
                <button key={l} onClick={() => setLegalModal(l)} className="text-xs font-medium text-slate-500 hover:text-blue-600 transition">
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-400">© {new Date().getFullYear()} Elder Shield India. All rights reserved.</p>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-400" /> for India's elders
            </p>
          </div>
        </div>
      </footer>

      {/* Legal modal */}
      <Modal open={!!legalModal} onClose={() => setLegalModal(null)} title={legalModal || ''} icon={Shield} iconColor="from-blue-500 to-cyan-600" maxWidth="max-w-lg">
        {legalModal && (
          <div className="space-y-3">
            <p className="text-sm text-slate-600 leading-relaxed">{legalPages.find((p) => p.title === legalModal)?.body}</p>
            <button onClick={() => { setLegalModal(null); toast('Thank you for reviewing!', 'info'); }} className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md hover:shadow-lg transition">
              I Understand
            </button>
          </div>
        )}
      </Modal>

      {/* FAQ modal */}
      <Modal open={faqModal} onClose={() => setFaqModal(false)} title="Frequently Asked Questions" icon={Shield} iconColor="from-purple-500 to-indigo-600" maxWidth="max-w-xl">
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl bg-white/40 border border-white/50 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 p-4 text-left"
              >
                <span className="text-sm font-bold text-slate-700">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
