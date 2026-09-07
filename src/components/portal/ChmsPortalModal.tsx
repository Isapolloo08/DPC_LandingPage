import React, { useState } from 'react';
import { X, UserCheck, Lock, User, KeyRound, Calendar } from 'lucide-react';
import { CHURCH_INFO } from '../../data/churchInfo';

interface ChmsPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChmsPortalModal: React.FC<ChmsPortalModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'member' | 'leader' | 'pastor'>('member');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 600);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl glass-panel-gold rounded-3xl p-6 sm:p-8 shadow-2xl border-dpc-gold-500/50 max-h-[90vh] overflow-y-auto">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isLoggedIn ? (
          /* Logged In Mock ChMS Dashboard View */
          <div className="space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                  Authenticated: {activeTab.toUpperCase()} PORTAL
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
                  Welcome, Brother Juan Dela Cruz
                </h3>
                <p className="text-xs text-dpc-gold-300">
                  Daet Presbyterian Church • Member ID: #DPC-2026-0842
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                Sign Out
              </button>
            </div>

            {/* ChMS Modules Quick Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-dpc-navy-950/90 border border-dpc-gold-500/30 text-center">
                <p className="text-xs text-slate-400 font-medium">Life Group</p>
                <p className="text-sm font-bold text-white font-serif mt-0.5">Bagasbas Fellowship</p>
                <span className="inline-block mt-2 text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">Active Member</span>
              </div>

              <div className="p-4 rounded-2xl bg-dpc-navy-950/90 border border-dpc-gold-500/30 text-center">
                <p className="text-xs text-slate-400 font-medium">Ministry Assignment</p>
                <p className="text-sm font-bold text-white font-serif mt-0.5">Ushering & CNYC Tech</p>
                <span className="inline-block mt-2 text-[10px] text-dpc-gold-300 bg-dpc-navy-800 px-2 py-0.5 rounded">Serving This Sun</span>
              </div>

              <div className="p-4 rounded-2xl bg-dpc-navy-950/90 border border-dpc-gold-500/30 text-center">
                <p className="text-xs text-slate-400 font-medium">Giving Statement</p>
                <p className="text-sm font-bold text-dpc-gold-300 font-serif mt-0.5">Up to Date (Q1 2026)</p>
                <span className="inline-block mt-2 text-[10px] text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded">PDF Available</span>
              </div>
            </div>

            {/* Recent Church Roster & Activity Feed */}
            <div className="bg-dpc-navy-950/80 rounded-2xl p-5 border border-white/10 space-y-3 text-xs">
              <p className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-dpc-gold-400" />
                <span>Upcoming Roster & Discipleship Schedule</span>
              </p>
              
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white">Sunday Divine Worship Ushering</span>
                    <p className="text-slate-400 text-[11px]">Next Sunday • 8:30 AM Call Time</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold">Confirmed</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white">Bagasbas Life Group Study: The Gospel-Centered Life</span>
                    <p className="text-slate-400 text-[11px]">This Friday • 6:30 PM</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 text-[10px] font-bold">Lesson 4</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl text-xs font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 to-dpc-gold-300 hover:from-dpc-gold-300 hover:to-dpc-gold-200 shadow-gold-glow transition-all cursor-pointer"
            >
              Close Portal View
            </button>
          </div>
        ) : (
          /* Login Form */
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dpc-gold-500/10 border border-dpc-gold-500/30 text-xs font-semibold uppercase tracking-wider text-dpc-gold-400 mb-2">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Church Management System (ChMS)</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-serif">
                Sign In to DPC Portal
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-light">
                Access member directory, giving receipts, ministry serving rosters, and discipleship tracking.
              </p>
            </div>

            {/* Role Select Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-dpc-navy-950 border border-white/10 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('member')}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'member'
                    ? 'bg-dpc-gold-400 text-dpc-navy-950 shadow-gold-glow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Church Member
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('leader')}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'leader'
                    ? 'bg-dpc-gold-400 text-dpc-navy-950 shadow-gold-glow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Ministry Leader
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pastor')}
                className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'pastor'
                    ? 'bg-dpc-gold-400 text-dpc-navy-950 shadow-gold-glow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Pastoral / Elder
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Registered Email / Member ID
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={activeTab === 'member' ? 'member@daetpresbyterian.org or 0917...' : 'leader@daetpresbyterian.org'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dpc-navy-950/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-dpc-gold-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dpc-navy-950/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-dpc-gold-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-dpc-gold-500 bg-dpc-navy-950 border-white/20" />
                  <span>Remember this device</span>
                </label>
                <a href="#" onClick={(e) => { e.preventDefault(); alert('Please contact the DPC Church Office or Elder Clerk for password reset.'); }} className="text-dpc-gold-400 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 via-dpc-gold-300 to-dpc-gold-400 hover:from-dpc-gold-300 hover:to-dpc-gold-200 shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="inline-block w-5 h-5 border-2 border-dpc-navy-950 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Enter {activeTab.toUpperCase()} Portal</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 p-3.5 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-xs text-slate-400">
                Need to register your membership profile? Contact the <strong className="text-slate-200">DPC Secretariat</strong> at <span className="text-dpc-gold-300">{CHURCH_INFO.contact.phone}</span>
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
