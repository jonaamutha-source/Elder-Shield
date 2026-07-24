import { useEffect, useRef, useState } from 'react';
import {
  Shield, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, UserPlus,
  HeartPulse, Users, HandHeart, Settings, CheckCircle2, Loader2,
  Phone, Sparkles,
} from 'lucide-react';
import { useToast } from '@/lib/ui';

export type AuthRole = 'senior' | 'family' | 'volunteer' | 'admin';
type AuthPage = 'signin' | 'signup' | 'forgot' | 'role';

interface AuthProps {
  initialPage?: AuthPage;
  presetRole?: AuthRole | null;
  onBack: () => void;
  onSuccess: (role: AuthRole) => void;
}

const roles: { id: AuthRole; label: string; desc: string; icon: typeof Shield; gradient: string }[] = [
  { id: 'senior', label: 'Senior Citizen', desc: 'Access SOS, medicine reminders, health tracking & doctor visits', icon: HeartPulse, gradient: 'from-rose-500 to-pink-600' },
  { id: 'family', label: 'Family Member', desc: 'Monitor your loved ones, get alerts & stay connected', icon: Users, gradient: 'from-blue-500 to-cyan-600' },
  { id: 'volunteer', label: 'Volunteer', desc: 'Help nearby elders, earn rewards & build community', icon: HandHeart, gradient: 'from-emerald-500 to-teal-600' },
  { id: 'admin', label: 'Administrator', desc: 'Manage users, verify volunteers & monitor emergencies', icon: Settings, gradient: 'from-slate-700 to-slate-900' },
];

export function Auth({ initialPage = 'signin', presetRole = null, onBack, onSuccess }: AuthProps) {
  const toast = useToast();
  const [page, setPage] = useState<AuthPage>(initialPage);
  const [role, setRole] = useState<AuthRole | null>(presetRole);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [resetSent, setResetSent] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setErrors({});
    setResetSent(false);
    setTimeout(() => firstInputRef.current?.focus(), 100);
  }, [page]);

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.email.trim()) err.email = 'Email is required';
    else if (!validateEmail(form.email)) err.email = 'Enter a valid email';
    if (!form.password) err.password = 'Password is required';
    if (!role) err.role = 'Please select a role';
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        const r = roles.find((x) => x.id === role)!;
        toast(`Welcome back! Signed in as ${r.label}.`, 'success');
        onSuccess(role!);
      }, 1200);
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.name.trim()) err.name = 'Full name is required';
    if (!form.email.trim()) err.email = 'Email is required';
    else if (!validateEmail(form.email)) err.email = 'Enter a valid email';
    if (!form.phone.trim()) err.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, ''))) err.phone = 'Enter a valid 10-digit Indian mobile number';
    if (!form.password) err.password = 'Password is required';
    else if (form.password.length < 6) err.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) err.confirm = 'Passwords do not match';
    if (!role) err.role = 'Please select a role';
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        toast('Account created successfully!', 'success');
        onSuccess(role!);
      }, 1400);
    }
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.email.trim()) err.email = 'Email is required';
    else if (!validateEmail(form.email)) err.email = 'Enter a valid email';
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setResetSent(true);
        toast('Password reset link sent to your email', 'success');
      }, 1200);
    }
  };

  const inputCls = (field: string) =>
    `w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/60 border text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${
      errors[field] ? 'border-rose-300 bg-rose-50/50' : 'border-white/60'
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50/40 to-purple-50/30 p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-cyan-300/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 -right-32 w-[28rem] h-[28rem] bg-gradient-to-br from-purple-300/20 to-pink-300/10 rounded-full blur-3xl animate-float-medium" />
      </div>

      <div className="relative w-full max-w-md">
        <button
          onClick={onBack}
          className="mb-5 flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </button>

        <div className="glass rounded-3xl shadow-2xl shadow-blue-500/10 p-7 sm:p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-md opacity-60" />
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Shield className="w-7 h-7 text-white" strokeWidth={2.4} />
              </div>
            </div>
            <h1 className="mt-3 font-display font-extrabold text-xl text-slate-800">Elder Shield India</h1>
          </div>

          {/* Forgot password success */}
          {page === 'forgot' && resetSent ? (
            <div className="text-center py-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg mb-4">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-display font-bold text-lg text-slate-800">Check Your Email</h2>
              <p className="mt-2 text-sm text-slate-500">We've sent a password reset link to <span className="font-semibold text-slate-700">{form.email}</span>. Please check your inbox.</p>
              <button onClick={() => { setPage('signin'); setResetSent(false); }} className="mt-5 w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition">
                Back to Sign In
              </button>
            </div>
          ) : page === 'forgot' ? (
            <>
              <h2 className="font-display font-bold text-xl text-slate-800 text-center">Forgot Password</h2>
              <p className="mt-1.5 text-sm text-slate-500 text-center">Enter your email and we'll send you a reset link.</p>
              <form onSubmit={handleForgot} className="mt-6 space-y-4">
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input ref={firstInputRef} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className={inputCls('email')} aria-label="Email" />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.email}</p>}
                </div>
                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition disabled:opacity-70 disabled:cursor-wait">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mail className="w-4 h-4" />} {loading ? 'Sending…' : 'Send Reset Link'}
                </button>
              </form>
              <p className="mt-5 text-center text-sm text-slate-500">
                Remembered it? <button onClick={() => setPage('signin')} className="font-bold text-blue-600 hover:underline">Sign in</button>
              </p>
            </>

          /* Role selection (signup step 1) */
          ) : page === 'role' ? (
            <>
              <h2 className="font-display font-bold text-xl text-slate-800 text-center">Choose Your Role</h2>
              <p className="mt-1.5 text-sm text-slate-500 text-center">Select how you'd like to join Elder Shield.</p>
              <div className="mt-6 space-y-3">
                {roles.map((r) => {
                  const Icon = r.icon;
                  const selected = role === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition text-left ${selected ? 'border-blue-400 bg-blue-50/60 shadow-md' : 'border-white/60 bg-white/40 hover:bg-white/60'}`}
                    >
                      <div className={`shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${r.gradient} flex items-center justify-center shadow-md`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800 text-sm">{r.label}</p>
                        <p className="text-xs text-slate-400 leading-snug">{r.desc}</p>
                      </div>
                      {selected && <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
              {errors.role && <p className="mt-2 text-xs text-rose-500 font-medium text-center">{errors.role}</p>}
              <button
                onClick={() => { if (!role) { setErrors({ role: 'Please select a role' }); return; } setPage('signup'); }}
                className="mt-5 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
              <p className="mt-4 text-center text-sm text-slate-500">
                Already have an account? <button onClick={() => setPage('signin')} className="font-bold text-blue-600 hover:underline">Sign in</button>
              </p>
            </>

          /* Sign In */
          ) : page === 'signin' ? (
            <>
              <h2 className="font-display font-bold text-xl text-slate-800 text-center">Welcome Back</h2>
              <p className="mt-1.5 text-sm text-slate-500 text-center">Sign in to your Elder Shield account.</p>
              <div className="mt-5">
                <p className="text-xs font-bold text-slate-500 mb-2">Sign in as</p>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map((r) => {
                    const Icon = r.icon;
                    const selected = role === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => { setRole(r.id); setErrors((e) => { const { role, ...rest } = e; return rest; }); }}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border transition text-left ${selected ? 'border-blue-400 bg-blue-50/60 shadow-sm' : 'border-white/60 bg-white/40 hover:bg-white/60'}`}
                      >
                        <div className={`shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${r.gradient} flex items-center justify-center shadow-sm`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className={`text-xs font-bold ${selected ? 'text-slate-800' : 'text-slate-500'}`}>{r.label}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.role && <p className="mt-1.5 text-xs text-rose-500 font-medium">{errors.role}</p>}
              </div>
              <form onSubmit={handleSignIn} className="mt-5 space-y-4">
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input ref={firstInputRef} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className={inputCls('email')} aria-label="Email" />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.email}</p>}
                </div>
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" className={`${inputCls('password')} pr-11`} aria-label="Password" />
                    <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.password}</p>}
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-400" /> Remember me
                  </label>
                  <button type="button" onClick={() => setPage('forgot')} className="text-xs font-bold text-blue-600 hover:underline">Forgot password?</button>
                </div>
                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition disabled:opacity-70 disabled:cursor-wait">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-4 h-4" />} {loading ? 'Signing in…' : 'Sign In'}
                </button>
              </form>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-400 font-medium">or</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>
              <button onClick={() => setPage('role')} className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-slate-700 bg-white/60 border border-white/60 hover:bg-white/80 transition">
                <UserPlus className="w-4 h-4 text-blue-600" /> Create new account
              </button>
            </>

          /* Sign Up */
          ) : (
            <>
              <h2 className="font-display font-bold text-xl text-slate-800 text-center">Create Account</h2>
              <div className="mt-2 flex items-center justify-center gap-2">
                {roles.map((r) => r.id === role && (
                  <span key={r.id} className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full text-white bg-gradient-to-r ${r.gradient}`}>
                    <r.icon className="w-3 h-3" /> {r.label}
                  </span>
                ))}
                <button onClick={() => setPage('role')} className="text-xs font-bold text-blue-600 hover:underline">Change</button>
              </div>
              <form onSubmit={handleSignUp} className="mt-5 space-y-3.5">
                <div>
                  <div className="relative">
                    <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input ref={firstInputRef} type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className={inputCls('name')} aria-label="Full name" />
                  </div>
                  {errors.name && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.name}</p>}
                </div>
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className={inputCls('email')} aria-label="Email" />
                  </div>
                  {errors.email && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.email}</p>}
                </div>
                <div>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile number" maxLength={10} className={inputCls('phone')} aria-label="Phone number" />
                  </div>
                  {errors.phone && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.phone}</p>}
                </div>
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password (min 6 chars)" className={`${inputCls('password')} pr-11`} aria-label="Password" />
                    <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.password}</p>}
                </div>
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type={showPassword ? 'text' : 'password'} value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} placeholder="Confirm password" className={inputCls('confirm')} aria-label="Confirm password" />
                  </div>
                  {errors.confirm && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.confirm}</p>}
                </div>
                <label className="flex items-start gap-2 text-xs font-medium text-slate-600 cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-400" />
                  <span>I agree to the Terms & Conditions and Privacy Policy of Elder Shield India.</span>
                </label>
                <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg hover:shadow-xl transition disabled:opacity-70 disabled:cursor-wait">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-4 h-4" />} {loading ? 'Creating account…' : 'Create Account'}
                </button>
              </form>
              <p className="mt-4 text-center text-sm text-slate-500">
                Already have an account? <button onClick={() => setPage('signin')} className="font-bold text-blue-600 hover:underline">Sign in</button>
              </p>
            </>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          Demo authentication — no real account is created. Data stays on your device.
        </p>
      </div>
    </div>
  );
}
