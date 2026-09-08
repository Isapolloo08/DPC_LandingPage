import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, User, CheckCircle2, Send, Ticket } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ChurchEvent } from '../../types/church';

interface EventRsvpModalProps {
  event: ChurchEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EventRsvpModal: React.FC<EventRsvpModalProps> = ({ event, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guestsCount: '1',
    dietaryOrRemarks: '',
  });
  const [isRegistered, setIsRegistered] = useState(false);

  if (!isOpen || !event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#60a5fa', '#34d399', '#ffffff']
      });
    } catch {
      // fallback
    }
  };

  const handleReset = () => {
    setIsRegistered(false);
    setFormData({ name: '', phone: '', email: '', guestsCount: '1', dietaryOrRemarks: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0c192c] rounded-3xl p-6 sm:p-8 shadow-2xl border border-dpc-gold-500/50 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isRegistered ? (
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-dpc-gold-400">
                Registration Confirmed!
              </span>
              <h3 className="text-2xl font-bold text-white font-serif mt-1">
                See You at {event.title}!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed font-light">
                We have reserved <strong className="text-white">{formData.guestsCount} seat(s)</strong> under <strong className="text-dpc-gold-300">{formData.name}</strong>. A confirmation SMS will be sent to your mobile.
              </p>
            </div>

            {/* Mock Digital Event Ticket */}
            <div className="bg-dpc-navy-950/90 rounded-2xl p-5 border border-dpc-gold-500/30 text-left space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-dpc-gold-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    DPC Event Pass
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-dpc-gold-500/20 text-dpc-gold-300 px-2 py-0.5 rounded border border-dpc-gold-500/30">
                  REF-#{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <div>
                  <span className="text-slate-400 block text-[10px]">Date:</span>
                  <span className="font-semibold text-white">{event.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Time:</span>
                  <span className="font-semibold text-white">{event.time}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-[10px]">Venue:</span>
                  <span className="font-semibold text-white">{event.location}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl text-sm font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 to-dpc-gold-300 hover:from-dpc-gold-300 hover:to-dpc-gold-200 shadow-gold-glow transition-all cursor-pointer"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-dpc-gold-500/20 text-dpc-gold-300 border border-dpc-gold-500/30">
                {event.category} Event
              </span>
              <h3 className="text-2xl font-bold text-white font-serif mt-2">
                {event.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 font-light leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Logistics summary */}
            <div className="bg-dpc-navy-950/80 rounded-2xl p-4 border border-white/10 space-y-2 text-xs text-slate-300 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-dpc-gold-400 shrink-0" />
                <span>{event.date} • {event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-dpc-gold-400 shrink-0" />
                <span>{event.location}</span>
              </div>
              {event.speakerOrLeader && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-dpc-gold-400 shrink-0" />
                  <span>Led by: {event.speakerOrLeader}</span>
                </div>
              )}
            </div>

            {/* RSVP Form */}
            {event.registrationOpen ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-dpc-gold-400">
                  Register / Reserve Your Seat
                </h4>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maria Santos"
                    className="w-full px-4 py-2.5 rounded-xl bg-dpc-navy-950/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-dpc-gold-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Mobile Number *
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
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Number of Attendees
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.guestsCount}
                      onChange={(e) => setFormData({ ...formData, guestsCount: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-dpc-navy-950/90 border border-white/10 text-white text-sm focus:outline-none focus:border-dpc-gold-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 via-dpc-gold-300 to-dpc-gold-400 hover:from-dpc-gold-300 hover:to-dpc-gold-200 shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Confirm Event Registration</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-4 text-slate-300 text-sm">
                <p>This is an open churchwide event. No pre-registration required. Everyone is warmly invited!</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
