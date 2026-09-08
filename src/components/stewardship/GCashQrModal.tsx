import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { CHURCH_INFO } from '../../data/churchInfo';

interface GCashQrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GCashQrModal: React.FC<GCashQrModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText('09178421982');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0c192c] rounded-3xl p-6 sm:p-8 shadow-2xl border border-dpc-gold-500/50 max-h-[90vh] overflow-y-auto text-center">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider mb-2">
            <span>GCash Scan To Pay</span>
          </div>
          <h3 className="text-2xl font-bold text-white font-serif">
            DPC Digital Stewardship
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Scan using the GCash app or send to the registered church mobile number.
          </p>
        </div>

        {/* QR Code Container Graphic */}
        <div className="bg-white p-6 rounded-2xl shadow-2xl mx-auto max-w-[260px] mb-6 relative group border-4 border-dpc-gold-400">
          {/* Stylized SVG QR Code */}
          <div className="w-full aspect-square flex flex-col items-center justify-center bg-slate-50 p-2 rounded-lg border border-slate-200">
            <svg viewBox="0 0 200 200" className="w-full h-full text-slate-900">
              {/* Corner Position Detection Patterns */}
              <rect x="10" y="10" width="50" height="50" fill="currentColor" rx="4" />
              <rect x="18" y="18" width="34" height="34" fill="white" rx="2" />
              <rect x="26" y="26" width="18" height="18" fill="currentColor" rx="2" />

              <rect x="140" y="10" width="50" height="50" fill="currentColor" rx="4" />
              <rect x="148" y="18" width="34" height="34" fill="white" rx="2" />
              <rect x="156" y="26" width="18" height="18" fill="currentColor" rx="2" />

              <rect x="10" y="140" width="50" height="50" fill="currentColor" rx="4" />
              <rect x="18" y="148" width="34" height="34" fill="white" rx="2" />
              <rect x="26" y="156" width="18" height="18" fill="currentColor" rx="2" />

              {/* Data QR matrix bars */}
              <rect x="70" y="15" width="15" height="15" fill="currentColor" />
              <rect x="95" y="15" width="30" height="10" fill="currentColor" />
              <rect x="70" y="40" width="40" height="15" fill="currentColor" />
              <rect x="120" y="40" width="10" height="25" fill="currentColor" />
              
              <rect x="15" y="70" width="20" height="15" fill="currentColor" />
              <rect x="45" y="70" width="35" height="15" fill="currentColor" />
              <rect x="90" y="65" width="20" height="20" fill="currentColor" />
              <rect x="120" y="75" width="30" height="15" fill="currentColor" />
              <rect x="160" y="70" width="25" height="20" fill="currentColor" />

              {/* Center Church Emblem Overlay */}
              <circle cx="100" cy="100" r="24" fill="#0a192f" stroke="#d4af37" strokeWidth="3" />
              <path d="M100 84 L100 116 M88 94 L112 94" stroke="#d4af37" strokeWidth="4" strokeLinecap="round" />

              <rect x="15" y="95" width="30" height="30" fill="currentColor" />
              <rect x="55" y="95" width="15" height="35" fill="currentColor" />
              <rect x="135" y="105" width="25" height="15" fill="currentColor" />
              <rect x="170" y="100" width="15" height="30" fill="currentColor" />

              <rect x="70" y="130" width="25" height="15" fill="currentColor" />
              <rect x="105" y="125" width="20" height="30" fill="currentColor" />
              <rect x="135" y="130" width="50" height="20" fill="currentColor" />

              <rect x="70" y="155" width="20" height="30" fill="currentColor" />
              <rect x="100" y="165" width="45" height="20" fill="currentColor" />
              <rect x="155" y="160" width="30" height="25" fill="currentColor" />
            </svg>
          </div>

          <p className="text-[10px] font-bold text-slate-700 tracking-wider uppercase mt-2">
            DAET PRESBYTERIAN CHURCH
          </p>
        </div>

        {/* Account text */}
        <div className="bg-dpc-navy-950/90 rounded-2xl p-4 border border-dpc-gold-500/30 text-xs text-slate-300 mb-6 space-y-1">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Account Name</p>
          <p className="font-bold text-white text-sm">{CHURCH_INFO.giving.gcash.accountName}</p>
          <p className="font-mono text-dpc-gold-300 font-bold text-base mt-1">{CHURCH_INFO.giving.gcash.accountNumber}</p>
        </div>

        {/* Action button */}
        <div className="space-y-2">
          <button
            onClick={handleCopy}
            className="w-full py-3 rounded-xl text-xs font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 to-dpc-gold-300 hover:from-dpc-gold-300 hover:to-dpc-gold-200 shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-dpc-navy-950" />
                <span>GCash Number Copied (0917-842-1982)!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy GCash Mobile Number</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
