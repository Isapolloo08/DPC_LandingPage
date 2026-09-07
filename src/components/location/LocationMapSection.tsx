import React from 'react';
import { Phone, Mail, Clock, ExternalLink, Navigation, Compass, Church } from 'lucide-react';
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

              {/* Contact Information */}
              <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-dpc-gold-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Church Office:</span>
                    <a href={`tel:${CHURCH_INFO.contact.phone}`} className="text-white hover:text-dpc-gold-300 font-medium">
                      {CHURCH_INFO.contact.phone} / {CHURCH_INFO.contact.mobile}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">24/7 Pastoral Hotline:</span>
                    <a href={`tel:${CHURCH_INFO.contact.pastoralHotline}`} className="text-white hover:text-dpc-gold-300 font-medium">
                      {CHURCH_INFO.contact.pastoralHotline}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-dpc-gold-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Email:</span>
                    <a href={`mailto:${CHURCH_INFO.contact.email}`} className="text-white hover:text-dpc-gold-300 font-medium">
                      {CHURCH_INFO.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-dpc-gold-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Office Hours:</span>
                    <span className="text-white font-light">{CHURCH_INFO.contact.officeHours}</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Connect on Socials & Livestreams
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={CHURCH_INFO.contact.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-xs font-semibold text-white transition-colors"
                  >
                    <svg className="w-4 h-4 text-blue-400 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook Page</span>
                  </a>

                  <a
                    href={CHURCH_INFO.contact.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-600/30 hover:bg-red-600/50 border border-red-500/40 text-xs font-semibold text-white transition-colors"
                  >
                    <svg className="w-4 h-4 text-red-400 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span>YouTube Live</span>
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
              googleMapsUrl={CHURCH_INFO.address?.mapCoordinates?.googleMapsUrl ?? "https://maps.google.com/?q=Daet+Presbyterian+Church+Camarines+Norte"}
              mapEmbedUrl={CHURCH_INFO.address?.mapCoordinates?.embedUrl ?? "https://maps.google.com/maps?q=Daet,+Camarines+Norte,+Philippines&t=&z=16&ie=UTF8&iwloc=&output=embed"}
              coordinates="14.1167° N, 122.9556° E"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
