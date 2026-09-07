import React, { useState } from 'react';
import { Heart, Send, Lock, CheckCircle2, BookOpen } from 'lucide-react';

export const PrayerRequestBox: React.FC = () => {
  const [category, setCategory] = useState<string>('Healing & Health');
  const [name, setName] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [requestText, setRequestText] = useState<string>('');
  const [isConfidential, setIsConfidential] = useState<boolean>(true);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [comfortVerse, setComfortVerse] = useState<{ text: string; ref: string } | null>(null);

  const categories = [
    'Healing & Health',
    'Family & Marriage',
    'Spiritual Growth',
    'Guidance & Career',
    'Thanksgiving & Praise',
    'Grief & Comfort'
  ];

  const scripturePromises: Record<string, { text: string; ref: string }> = {
    'Healing & Health': {
      text: 'He heals the brokenhearted and binds up their wounds.',
      ref: 'Psalm 147:3'
    },
    'Family & Marriage': {
      text: 'Unless the LORD builds the house, the builders labor in vain. The LORD watches over you.',
      ref: 'Psalm 127:1'
    },
    'Spiritual Growth': {
      text: 'Being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus.',
      ref: 'Philippians 1:6'
    },
    'Guidance & Career': {
      text: 'Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
      ref: 'Proverbs 3:5-6'
    },
    'Thanksgiving & Praise': {
      text: 'Give thanks to the LORD, for he is good; his love endures forever.',
      ref: '1 Chronicles 16:34'
    },
    'Grief & Comfort': {
      text: 'The LORD is close to the brokenhearted and saves those who are crushed in spirit.',
      ref: 'Psalm 34:18'
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;

    setComfortVerse(scripturePromises[category] || scripturePromises['Spiritual Growth']);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setRequestText('');
    setName('');
    setContact('');
  };

  return (
    <section id="prayer" className="py-20 bg-dpc-navy-950 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-white/5">
      {/* Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 radial-cross-glow opacity-30 blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dpc-gold-500/10 border border-dpc-gold-500/30 text-xs font-semibold uppercase tracking-wider text-dpc-gold-400 mb-3">
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            <span>Pastoral Prayer Ministry</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-tight">
            Online Prayer Request Box
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-light">
            “Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.” (Philippians 4:6)
          </p>
        </div>

        {/* Box Card */}
        <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 shadow-2xl border-dpc-gold-500/40 relative">
          {submitted ? (
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-dpc-gold-400">
                  Received in Faith
                </span>
                <h3 className="text-2xl font-bold text-white font-serif mt-1">
                  Our Pastoral Prayer Team Is Interceding for You
                </h3>
                <p className="text-sm text-slate-300 max-w-lg mx-auto mt-2 leading-relaxed font-light">
                  Your prayer petition regarding <strong className="text-white">{category}</strong> has been logged. Our pastoral staff and Wednesday prayer gathering will lift this before the Throne of Grace.
                </p>
              </div>

              {/* Promised Comfort Scripture */}
              {comfortVerse && (
                <div className="bg-dpc-navy-950/90 rounded-2xl p-6 border border-dpc-gold-500/40 text-left max-w-xl mx-auto">
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-6 h-6 text-dpc-gold-400 shrink-0 mt-1" />
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-dpc-gold-400 mb-1">
                        A Promise for Your Heart Today
                      </p>
                      <blockquote className="text-sm sm:text-base italic text-white font-serif leading-relaxed">
                        “{comfortVerse.text}”
                      </blockquote>
                      <span className="text-xs font-bold text-dpc-gold-300 mt-2 block">
                        — {comfortVerse.ref}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-xl text-xs font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 to-dpc-gold-300 shadow-gold-glow cursor-pointer hover:from-dpc-gold-300 hover:to-dpc-gold-200 transition-all"
              >
                Submit Another Prayer Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Category selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                  1. Select Prayer Category *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`p-2.5 rounded-xl text-xs font-medium transition-all text-left flex items-center justify-between border cursor-pointer ${
                        category === cat
                          ? 'bg-dpc-gold-500 text-dpc-navy-950 font-bold border-dpc-gold-400 shadow-sm'
                          : 'bg-dpc-navy-950/80 text-slate-300 hover:text-white border-white/10 hover:border-dpc-gold-500/30'
                      }`}
                    >
                      <span className="truncate">{cat}</span>
                      {category === cat && <CheckCircle2 className="w-3.5 h-3.5 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prayer Text */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  2. Share Your Prayer Need or Praise *
                </label>
                <textarea
                  rows={4}
                  required
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  placeholder="Tell us what you are walking through. We consider it an honor to bring this before our Heavenly Father..."
                  className="w-full px-4 py-3 rounded-xl bg-dpc-navy-950/90 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-dpc-gold-400"
                ></textarea>
              </div>

              {/* Name & Contact (Optional / Anonymous toggle) */}
              {!isAnonymous && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sister Grace"
                      className="w-full px-4 py-2.5 rounded-xl bg-dpc-navy-950/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-dpc-gold-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Contact Phone / Email (Optional)
                    </label>
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="For pastoral follow-up"
                      className="w-full px-4 py-2.5 rounded-xl bg-dpc-navy-950/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-dpc-gold-400"
                    />
                  </div>
                </div>
              )}

              {/* Toggles */}
              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-dpc-gold-500/30 transition-colors">
                  <input
                    type="checkbox"
                    checked={isConfidential}
                    onChange={(e) => setIsConfidential(e.target.checked)}
                    className="w-4 h-4 rounded text-dpc-gold-500 focus:ring-dpc-gold-400 bg-dpc-navy-900 border-white/20"
                  />
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <Lock className="w-3.5 h-3.5 text-dpc-gold-400" />
                    <span><strong>Keep Confidential</strong> — For Pastoral Team & Elders only (Not shared with congregation prayer chain)</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-dpc-gold-500/30 transition-colors">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 rounded text-dpc-gold-500 focus:ring-dpc-gold-400 bg-dpc-navy-900 border-white/20"
                  />
                  <span className="text-xs text-slate-200">
                    Submit as <strong>Anonymous</strong> (Hide my name and personal identity completely)
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl text-sm font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 via-dpc-gold-300 to-dpc-gold-400 hover:from-dpc-gold-300 hover:to-dpc-gold-200 shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Prayer Request to Pastoral Team</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
