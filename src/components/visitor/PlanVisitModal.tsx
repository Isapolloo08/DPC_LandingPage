import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PlanVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlanVisitModal: React.FC<PlanVisitModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    visitDate: 'This Coming Sunday (9:00 AM)',
    adultsCount: '1',
    childrenCount: '0',
    needsKidsCheckIn: false,
    specialNotes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#fcd34d', '#1d3557', '#ffffff']
        });
      } catch {
        // fallback if canvas-confetti is not loaded
      }
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl glass-panel-gold rounded-3xl p-6 sm:p-8 shadow-2xl border-dpc-gold-500/50 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-dpc-gold-400">
                You're All Set!
              </span>
              <h3 className="text-2xl font-bold text-white font-serif mt-1">
                We Can't Wait to Welcome You!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed font-light">
                Thank you, <strong className="text-white">{formData.fullName || 'Beloved Guest'}</strong>. Our hospitality team and greeters will have a welcome packet, reserved seats, and a gift waiting for you at the foyer.
              </p>
            </div>

            {/* Visit Summary Card */}
            <div className="bg-dpc-navy-950/90 rounded-2xl p-4 border border-dpc-gold-500/20 text-left space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Service:</span>
                <span className="font-semibold text-dpc-gold-300">{formData.visitDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Party Size:</span>
                <span className="font-semibold text-white">
                  {formData.adultsCount} Adult(s) {parseInt(formData.childrenCount) > 0 && `• ${formData.childrenCount} Child(ren)`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="font-semibold text-white">F. Pimentel Ave., Daet, CamNorte</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl text-sm font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 to-dpc-gold-300 shadow-gold-glow hover:from-dpc-gold-300 hover:to-dpc-gold-200 transition-all cursor-pointer"
              >
                Close & Return to Page
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dpc-gold-500/10 border border-dpc-gold-500/30 text-xs font-semibold uppercase tracking-wider text-dpc-gold-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>VIP Hospitality Experience</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-serif">
                Plan Your First Visit to DPC
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-light">
                Let us know you're coming so our pastoral team and greeters can roll out the red carpet for you.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Juan Dela Cruz"
                  className="w-full px-4 py-2.5 rounded-xl bg-dpc-navy-950/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-dpc-gold-400 focus:ring-1 focus:ring-dpc-gold-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0917 123 4567"
                    className="w-full px-4 py-2.5 rounded-xl bg-dpc-navy-950/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-dpc-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-dpc-navy-950/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-dpc-gold-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Service / Date *
                  </label>
                  <select
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dpc-navy-950/90 border border-white/10 text-white text-sm focus:outline-none focus:border-dpc-gold-400"
                  >
                    <option value="This Coming Sunday (9:00 AM)">This Coming Sunday (9:00 AM Worship)</option>
                    <option value="Next Sunday (9:00 AM)">Next Sunday (9:00 AM Worship)</option>
                    <option value="Sunday School (8:00 AM)">Sunday School (8:00 AM)</option>
                    <option value="Saturday Youth Fellowship (3:00 PM)">Saturday CNYC Youth (3:00 PM)</option>
                    <option value="Wednesday Midweek Prayer (6:30 PM)">Wednesday Midweek (6:30 PM)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Adults
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={formData.adultsCount}
                      onChange={(e) => setFormData({ ...formData, adultsCount: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-dpc-navy-950/90 border border-white/10 text-white text-sm text-center focus:outline-none focus:border-dpc-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Kids (0-12)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="15"
                      value={formData.childrenCount}
                      onChange={(e) => setFormData({ ...formData, childrenCount: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-dpc-navy-950/90 border border-white/10 text-white text-sm text-center focus:outline-none focus:border-dpc-gold-400"
                    />
                  </div>
                </div>
              </div>

              {/* Kids Check-In Checkbox */}
              <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-dpc-gold-500/30 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={formData.needsKidsCheckIn}
                  onChange={(e) => setFormData({ ...formData, needsKidsCheckIn: e.target.checked })}
                  className="w-4 h-4 rounded text-dpc-gold-500 focus:ring-dpc-gold-400 bg-dpc-navy-900 border-white/20"
                />
                <span className="text-xs text-slate-200">
                  I would like pre-registered safe check-in for my children in <strong>DPC Kids</strong>
                </span>
              </label>

              {/* Special Note */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Any Questions or Accessibility Needs?
                </label>
                <textarea
                  rows={2}
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  placeholder="e.g. Wheelchair ramp needed, dietary allergies for Agape lunch, etc."
                  className="w-full px-4 py-2 rounded-xl bg-dpc-navy-950/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-dpc-gold-400"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 via-dpc-gold-300 to-dpc-gold-400 hover:from-dpc-gold-300 hover:to-dpc-gold-200 shadow-gold-glow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="inline-block w-5 h-5 border-2 border-dpc-navy-950 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Confirm My Visit</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
