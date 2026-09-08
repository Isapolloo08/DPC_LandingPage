import React from 'react';
import { Mail, Compass, Church, Calendar } from 'lucide-react';
import { CHURCH_INFO } from '../../data/churchInfo';
import { ExpandMap } from '@/components/ui/expand-map';

interface LocationMapSectionProps {
  onPlanVisitClick: () => void;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = ({ onPlanVisitClick }) => {
  return (
    <section id="location" className="py-20 bg-dpc-navy-950 px-4 sm:px-6 lg:px-8 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dpc-gold-500/10 border border-dpc-gold-500/30 text-xs font-semibold uppercase tracking-wider text-dpc-gold-400 mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Visit Us in Camarines Norte</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-tight">
            Location, Map & Socials
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 font-light">
            Conveniently situated in the provincial capital of Daet, easily accessible by tricycle, jeepney, or private vehicle.
          </p>
        </div>

        {/* Content Split: Details & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Contact and Address Details Panel */}
          <div className="lg:col-span-5 glass-panel-gold rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-dpc-gold-500/40 shadow-2xl">
            <div className="space-y-6">

              {/* Church Name & Landmark */}
              <div>
                <div className="flex items-center gap-2 text-dpc-gold-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Church className="w-4 h-4" />
                  <span>Physical Address</span>
                </div>
                <h3 className="text-xl font-bold text-white font-serif">
                  {CHURCH_INFO.name}
                </h3>
                <p className="text-xs text-dpc-gold-300 font-semibold mb-2">
                  {CHURCH_INFO.centerName}
                </p>
                <p className="text-sm text-slate-200 leading-relaxed font-light">
                  {CHURCH_INFO.address.street}, {CHURCH_INFO.address.barangay}, {CHURCH_INFO.address.municipality}, {CHURCH_INFO.address.province} {CHURCH_INFO.address.zipCode}
                </p>
                <p className="text-xs text-slate-400 mt-1 italic">
                  📍 Landmark: {CHURCH_INFO.address.landmark}
                </p>
              </div>

              {/* Worship Gathering Schedule */}
              <div className="space-y-2.5 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-dpc-gold-400 text-xs font-bold uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Worship Gathering Schedule</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    Open for All
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {/* Main Sunday Worship */}
                  <div className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 transition-colors flex items-start justify-between gap-2">
                    <div>
                      <span className="text-white font-semibold block text-[12px]">Sunday Main Worship Service</span>
                      <span className="text-slate-400 text-[10px]">Expository Preaching, Praise & Fellowship</span>
                    </div>
                    <span className="text-[11px] font-bold text-dpc-gold-300 bg-dpc-gold-500/15 border border-dpc-gold-500/30 px-2 py-1 rounded-lg shrink-0">
                      9:40 AM – 11:30 AM
                    </span>
                  </div>

                  {/* Sunday School & Bible Study */}
                  <div className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 transition-colors flex items-start justify-between gap-2">
                    <div>
                      <span className="text-white font-semibold block text-[12px]">Sunday School & Bible Study</span>
                      <span className="text-slate-400 text-[10px]">Kids, Youth, Adults & Discipleship</span>
                    </div>
                    <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/15 border border-cyan-500/30 px-2 py-1 rounded-lg shrink-0">
                      8:00 AM – 9:30 AM
                    </span>
                  </div>

                  {/* Midweek Prayer */}
                  <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-[11px] text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-dpc-gold-400" />
                      <span>Midweek Wedsneday Prayer Meeting</span>
                    </span>
                    <span className="text-slate-400 font-mono text-[10px]">Wednesday 5:30 PM</span>
                  </div>
                </div>
              </div>

              {/* Direct Digital Connect & Social Channels */}
              <div className="pt-3 border-t border-white/10 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-dpc-gold-400 shrink-0" />
                    <span className="text-[11px] text-slate-400">Email:</span>
                    <a href={`mailto:${CHURCH_INFO.contact.email}`} className="text-white hover:text-dpc-gold-300 text-xs font-medium truncate">
                      {CHURCH_INFO.contact.email}
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Connect & Message Us Directly
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Facebook Messenger Button */}
                    <a
                      href="https://m.me/DaetPresbyterianChurch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#0084FF]/20 hover:bg-[#0084FF]/35 border border-[#0084FF]/40 hover:border-[#0084FF]/70 text-xs font-bold text-white transition-all shadow-sm"
                      title="Send a message to our welcome team on Messenger"
                    >
                      <svg className="w-4 h-4 fill-current text-[#0084FF]" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.908 1.454 5.512 3.737 7.18V22l3.415-1.874c.904.25 1.86.386 2.848.386 5.523 0 10-4.145 10-9.254C22 6.145 17.523 2 12 2zm1.066 12.453l-2.673-2.852-5.215 2.852 5.736-6.09 2.74 2.852 5.148-2.852-5.736 6.09z" />
                      </svg>
                      <span>Chat Messenger</span>
                    </a>

                    {/* YouTube Live Button */}
                    <a
                      href={CHURCH_INFO.contact.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-red-600/20 hover:bg-red-600/35 border border-red-500/40 hover:border-red-500/70 text-xs font-bold text-white transition-all shadow-sm"
                      title="Watch our Sunday Livestream on YouTube"
                    >
                      <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      <span>YouTube Live</span>
                    </a>
                  </div>

                  {/* Facebook Page link sub-bar */}
                  <a
                    href={CHURCH_INFO.contact.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 w-full py-1.5 px-3 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 flex items-center justify-center gap-2 text-[11px] font-medium text-blue-300 hover:text-white transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 text-blue-400 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Visit Facebook Page: @DaetPresbyterianChurch ↗</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Quick action button */}
            <div className="pt-6 border-t border-white/10">
              <button
                onClick={onPlanVisitClick}
                className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 via-dpc-gold-300 to-dpc-gold-400 hover:from-dpc-gold-300 hover:to-dpc-gold-200 shadow-gold-glow text-center cursor-pointer transition-all"
              >
                Plan a Visit to DPC
              </button>
            </div>
          </div>

          {/* Interactive Expandable Map Visual Container */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <ExpandMap
              label="CURRENT LOCATION"
              title={CHURCH_INFO.name}
              subtitle={CHURCH_INFO.centerName}
              location="Daet, Camarines Norte"
              address={`${CHURCH_INFO.address.street}, ${CHURCH_INFO.address.barangay}, ${CHURCH_INFO.address.municipality}, ${CHURCH_INFO.address.province} ${CHURCH_INFO.address.zipCode}`}
              landmark={CHURCH_INFO.address.landmark}
              googleMapsUrl={CHURCH_INFO.address?.mapCoordinates?.googleMapsUrl ?? "https://maps.google.com/?q=14.108300,122.959450"}
              mapEmbedUrl={CHURCH_INFO.address?.mapCoordinates?.embedUrl ?? "https://maps.google.com/maps?q=14.108300,122.959450&t=&z=18&ie=UTF8&iwloc=&output=embed"}
              lat={CHURCH_INFO.address.mapCoordinates.lat}
              lng={CHURCH_INFO.address.mapCoordinates.lng}
              coordinates={`${CHURCH_INFO.address.mapCoordinates.lat.toFixed(4)}° N, ${CHURCH_INFO.address.mapCoordinates.lng.toFixed(4)}° E`}
            />
          </div>

        </div>

      </div>
    </section>
  );
};
