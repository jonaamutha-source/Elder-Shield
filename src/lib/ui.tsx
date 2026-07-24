import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X, ArrowUp, Loader2 } from 'lucide-react';

/* ----------------------------- Toast system ----------------------------- */
type ToastType = 'success' | 'error' | 'info';
interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

const ToastContext = createContext<(message: string, type?: ToastType) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

const toastIcons: Record<ToastType, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const toastStyles: Record<ToastType, string> = {
  success: 'from-emerald-500 to-teal-600',
  error: 'from-rose-500 to-red-600',
  info: 'from-blue-500 to-cyan-600',
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const show = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => dismiss(id), 4000);
  }, [dismiss]);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="fixed bottom-6 right-4 sm:right-6 z-[100] flex flex-col gap-2.5 pointer-events-none">
        {toasts.map((t) => {
          const Icon = toastIcons[t.type];
          return (
            <div
              key={t.id}
              className="pointer-events-auto flex items-center gap-3 pl-3.5 pr-4 py-3 rounded-2xl glass shadow-2xl border border-white/50 max-w-sm animate-[toastIn_0.3s_ease-out]"
            >
              <div className={`shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br ${toastStyles[t.type]} flex items-center justify-center shadow-md`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-slate-700 flex-1">{t.message}</p>
              <button onClick={() => dismiss(t.id)} className="shrink-0 text-slate-400 hover:text-slate-600 transition">
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

/* ----------------------------- Modal ----------------------------- */
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  icon?: typeof CheckCircle2;
  iconColor?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({ open, onClose, title, icon: Icon, iconColor = 'from-blue-500 to-cyan-600', children, maxWidth = 'max-w-lg' }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    setTimeout(() => {
      const first = modalRef.current?.querySelector<HTMLElement>('button, [href], input, select, textarea');
      first?.focus();
    }, 100);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title || 'Dialog'}>
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" onClick={onClose} />
      <div ref={modalRef} className={`relative w-full ${maxWidth} glass rounded-3xl shadow-2xl border border-white/50 animate-[modalIn_0.3s_ease-out] max-h-[90vh] overflow-y-auto`}>
        {(title || Icon) && (
          <div className="flex items-center gap-3 p-5 border-b border-white/40 sticky top-0 glass z-10">
            {Icon && (
              <div className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${iconColor} flex items-center justify-center shadow-md`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
            )}
            {title && <h3 className="font-display font-bold text-slate-800 text-lg">{title}</h3>}
            <button onClick={onClose} aria-label="Close dialog" className="ml-auto w-9 h-9 rounded-xl bg-white/60 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-white/80 transition">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

/* ----------------------------- Back to Top + Scroll Spy ----------------------------- */
export function BackToTop({ sections }: { sections: string[] }) {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            current = id;
            break;
          }
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  return (
    <>
      {visible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-6 left-4 sm:left-6 z-50 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/30 flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 transition-all animate-[fadeIn_0.3s_ease-out]"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
      <span className="sr-only" data-active-section={active} />
    </>
  );
}

/* ----------------------------- Loading overlay ----------------------------- */
export function LoadingButton({ loading, children, className }: { loading: boolean; children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center gap-2 ${className || ''}`}>
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </span>
  );
}
