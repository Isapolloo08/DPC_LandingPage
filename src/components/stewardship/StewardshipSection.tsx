import React, { useState } from 'react';
import { HeartHandshake, QrCode, Building2, Copy, Check, BookOpen } from 'lucide-react';
import { CHURCH_INFO } from '../../data/churchInfo';
import { ScriptureReveal } from '../ui/ScriptureReveal';

interface StewardshipSectionProps {
  onOpenGCashModal: () => void;
}

export const StewardshipSection: React.FC<StewardshipSectionProps> = ({ onOpenGCashModal }) => {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(label);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  return (
    <section id="stewardship" className="py-20 bg-gradient-to-b from-dpc-navy-950 via-dpc-navy-900 to-dpc-navy-950 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dpc-gold-500/10 border border-dpc-gold-500/30 text-xs font-semibold uppercase tracking-wider text-dpc-gold-400 mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Biblical Stewardship & Generosity</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-tight">
            Tithes, Offerings & Giving
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-light">
            Supporting the work of the Gospel, youth ministry, community benevolence, and campus outreach across Camarines Norte.
          </p>
        </div>

        {/* Biblical Stewardship Scripture Banner (2 Corinthians 9:7) */}
        <div className="max-w-3xl mx-auto glass-panel-gold rounded-3xl p-6 sm:p-8 mb-12 text-center relative overflow-hidden shadow-2xl">
          <div className="w-10 h-10 rounded-xl bg-dpc-gold-500/20 border border-dpc-gold-500/40 flex items-center justify-center mx-auto mb-3 text-dpc-gold-300">
            <BookOpen className="w-5 h-5" />
          </div>

          <ScriptureReveal
            quote={CHURCH_INFO.stewardshipVerse}
            reference={CHURCH_INFO.stewardshipRef}
            version="ESV"
            showQuoteMarks={true}
            highlightWords={['heart', 'cheerful', 'giver', 'God', 'loves']}
            quoteClassName="text-sm sm:text-base md:text-lg italic text-white font-serif leading-relaxed max-w-2xl mx-auto"
            referenceClassName="!mt-2"
            align="center"
            staggerDelay={0.035}
            initialDelay={0.15}
          />
        </div>

        {/* Giving Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
          
          {/* GCash Channel (Featured) */}
          <div className="glass-panel-gold rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-dpc-gold-500/60 shadow-gold-glow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all"></div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Instant Mobile Giving
                </span>
                <span className="text-xs font-bold text-dpc-gold-400">GCash Verified</span>
              </div>

              <h3 className="text-xl font-bold text-white font-serif mb-1">
                GCash Scan-To-Give
              </h3>
              <p className="text-xs text-slate-300 font-light mb-5">
                Convenient and secure giving directly via your GCash mobile app.
              </p>

              {/* Account details box */}
              <div className="bg-dpc-navy-950/90 rounded-2xl p-4 border border-dpc-gold-500/30 space-y-2 text-xs mb-6">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Account Name:</span>
                  <span className="font-semibold text-white">{CHURCH_INFO.giving.gcash.accountName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">GCash Mobile No.:</span>
                  <span className="font-mono font-bold text-dpc-gold-300 text-sm">{CHURCH_INFO.giving.gcash.accountNumber}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={onOpenGCashModal}
                className="w-full py-3 rounded-xl text-xs font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 via-dpc-gold-300 to-dpc-gold-400 hover:from-dpc-gold-300 hover:to-dpc-gold-200 shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <QrCode className="w-4 h-4" />
                <span>View GCash QR Code</span>
              </button>

              <button
                onClick={() => copyToClipboard('09178421982', 'gcash')}
                className="w-full py-2 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedBank === 'gcash' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">GCash Number Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy GCash Number (0917-842-1982)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Bank Transfer BDO */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-white/10 hover:border-dpc-gold-500/40 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-500/30">
                  Bank Transfer / Online
                </span>
                <Building2 className="w-4 h-4 text-dpc-gold-400" />
              </div>

              <h3 className="text-xl font-bold text-white font-serif mb-1">
                Banco De Oro (BDO)
              </h3>
              <p className="text-xs text-slate-400 font-light mb-5">
                {CHURCH_INFO.giving.bankBDO.bankName}
              </p>

              <div className="bg-dpc-navy-950/90 rounded-2xl p-4 border border-white/10 space-y-2 text-xs mb-6">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Account Name:</span>
                  <span className="font-semibold text-white">{CHURCH_INFO.giving.bankBDO.accountName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Account Number:</span>
                  <span className="font-mono font-bold text-dpc-gold-300 text-sm">{CHURCH_INFO.giving.bankBDO.accountNumber}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(CHURCH_INFO.giving.bankBDO.accountNumber.replace(/-/g, ''), 'bdo')}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-dpc-navy-800 hover:bg-dpc-navy-700 border border-white/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copiedBank === 'bdo' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Account Number Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-dpc-gold-400" />
                  <span>Copy BDO Account Number</span>
                </>
              )}
            </button>
          </div>

          {/* Bank Transfer BPI */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-white/10 hover:border-dpc-gold-500/40 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-500/30">
                  Bank Transfer / Online
                </span>
                <Building2 className="w-4 h-4 text-dpc-gold-400" />
              </div>

              <h3 className="text-xl font-bold text-white font-serif mb-1">
                Bank of the PI (BPI)
              </h3>
              <p className="text-xs text-slate-400 font-light mb-5">
                {CHURCH_INFO.giving.bankBPI.bankName}
              </p>

              <div className="bg-dpc-navy-950/90 rounded-2xl p-4 border border-white/10 space-y-2 text-xs mb-6">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Account Name:</span>
                  <span className="font-semibold text-white">{CHURCH_INFO.giving.bankBPI.accountName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Account Number:</span>
                  <span className="font-mono font-bold text-dpc-gold-300 text-sm">{CHURCH_INFO.giving.bankBPI.accountNumber}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => copyToClipboard(CHURCH_INFO.giving.bankBPI.accountNumber.replace(/-/g, ''), 'bpi')}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-dpc-navy-800 hover:bg-dpc-navy-700 border border-white/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copiedBank === 'bpi' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Account Number Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-dpc-gold-400" />
                  <span>Copy BPI Account Number</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Designated Funds Breakdown */}
        <div className="bg-dpc-navy-900/60 rounded-3xl p-6 sm:p-8 border border-white/10">
          <h4 className="text-sm font-bold uppercase tracking-wider text-dpc-gold-400 mb-4 text-center sm:text-left">
            Designated Giving Funds (Indicate in Remarks / Slip)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CHURCH_INFO.giving.funds.map((fund) => (
              <div key={fund.id} className="p-4 rounded-2xl bg-dpc-navy-950/80 border border-white/5 space-y-1">
                <p className="text-xs font-bold text-white font-serif">{fund.name}</p>
                <p className="text-[11px] text-slate-400 font-light leading-relaxed">{fund.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
