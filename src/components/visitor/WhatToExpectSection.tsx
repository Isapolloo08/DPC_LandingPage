import React, { useState } from 'react';
import { Car, Shirt, ShieldCheck, UtensilsCrossed, Music, Heart, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

interface WhatToExpectSectionProps {
  onPlanVisitClick: () => void;
}

export const WhatToExpectSection: React.FC<WhatToExpectSectionProps> = ({ onPlanVisitClick }) => {
  const [activeTab, setActiveTab] = useState(0);

  const guideItems = [
    {
      id: 'parking',
      icon: Car,
      title: 'Dedicated Parking & Arrival',
      tagline: 'Stress-free arrival in Daet, Camarines Norte',
      summary: 'Convenient on-site parking at DPC premises in Purok 2, Brgy. Cobangbang.',
      details: [
        'Friendly volunteer parking marshals will guide you safely to open slots upon arrival.',
        'Designated accessible spots for senior saints and families with small infants right in front of the main entrance.',
        'Arrive at 8:00 AM for Adult Bible Study / High School Worship / Kids Sunday School, or by 9:30 AM for the 9:40 AM Main Worship Service.'
      ],
      badge: 'Arrival Guide'
    },
    {
      id: 'attire',
      icon: Shirt,
      title: 'What Should I Wear?',
      tagline: 'Warmth, modesty, and grace over formality',
      summary: 'Come as you are! You will see everything from smart-casual and polo shirts to Sunday dresses and Barong.',
      details: [
        'There is no strict dress code; our focus is on genuine worship of our Lord in spirit and in truth.',
        'Most members and college youth wear smart-casual, denim, or Sunday semi-formal.',
        'Our sanctuary and youth hall are well-ventilated and air-conditioned for your comfort.'
      ],
      badge: 'Attire'
    },
    {
      id: 'kids',
      icon: ShieldCheck,
      title: 'Children’s Sunday School & Care (DPC Kids)',
      tagline: 'Clean, secure, and Christ-centered care',
      summary: 'Dedicated Bible classes from 8:00 AM to 9:30 AM, followed by supervised fun playtime, crafts, and Christian movies.',
      details: [
        'Safe parent check-in ensures your children are safe and well-cared for by loving, background-checked teachers.',
        'Age-tailored Bible story lessons, crafts, and memory verses from 8:00 AM to 9:30 AM.',
        'After 9:30 AM (while adults attend Main Worship), kids enjoy supervised playtime, interactive games, and inspiring Christian animations in our kids hall.'
      ],
      badge: 'Family & Children'
    },
    {
      id: 'lunch',
      icon: UtensilsCrossed,
      title: 'Post-Service Agape Fellowship Lunch',
      tagline: 'Free hearty lunch for all first-time guests',
      summary: 'Every Sunday after the 11:30 AM benediction, our church family gathers for a warm community meal.',
      details: [
        'Enjoy local Bicolano dishes and refreshments at the CNYC Fellowship Courtyard.',
        'As our first-time guest, lunch is completely on us! No need to bring anything.',
        'An easy, no-pressure opportunity to chat with our pastoral team, elders, and young adults.'
      ],
      badge: 'Community Meal'
    },
    {
      id: 'worship',
      icon: Music,
      title: 'The Worship & Preaching Style',
      tagline: 'Scripture-soaked, Christ-exalting, and reformed',
      summary: 'A reverent yet joyful liturgy featuring historic hymns, contemporary acoustic praise, and expository preaching.',
      details: [
        'We practice verse-by-verse expository preaching through books of the Old and New Testaments.',
        'Congregational singing blending majestic hymns with contemporary praise songs led by our youth and music teams.',
        'Celebration of the Lord’s Supper (Holy Communion) on designated Lord’s Days for all baptized believers in good standing.'
      ],
      badge: 'Sunday Liturgy'
    }
  ];

  return (
    <section id="what-to-expect" className="py-20 bg-dpc-navy-950 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 radial-cross-glow opacity-30 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dpc-gold-500/10 border border-dpc-gold-500/30 text-xs font-semibold uppercase tracking-wider text-dpc-gold-400 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>First-Time Visitor Guide</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-tight">
            What to Expect at DPC
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3 font-light">
            Visiting a church for the first time can be intimidating. Here is everything you need to know before walking through our doors.
          </p>
        </div>

        {/* Interactive Step Navigator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {guideItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === index;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(index)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 flex items-start gap-4 border cursor-pointer ${
                    isActive
                      ? 'glass-panel-gold border-dpc-gold-500/60 shadow-gold-glow scale-[1.02]'
                      : 'glass-panel border-white/5 hover:border-dpc-gold-500/30 hover:bg-white/5 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? 'bg-dpc-gold-500 text-dpc-navy-950 shadow-md shadow-dpc-gold-500/30'
                        : 'bg-dpc-navy-800 text-dpc-gold-400 border border-dpc-gold-500/20'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3
                        className={`text-sm sm:text-base font-bold font-serif truncate ${
                          isActive ? 'text-dpc-gold-300' : 'text-white'
                        }`}
                      >
                        {item.title}
                      </h3>
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-white/10 text-slate-300 shrink-0">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 font-light">
                      {item.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Active Details Panel */}
          <div className="lg:col-span-7">
            <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 relative overflow-hidden border-dpc-gold-500/40 shadow-2xl animate-in fade-in duration-300">
              
              {/* Top Accent Icon & Title */}
              <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  {React.createElement(guideItems[activeTab].icon, {
                    className: "w-8 h-8 text-dpc-gold-400"
                  })}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-dpc-gold-400">
                      Step {activeTab + 1} of {guideItems.length}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">
                      {guideItems[activeTab].title}
                    </h3>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-400">
                  <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                  <span>Visitor Friendly</span>
                </span>
              </div>

              {/* Summary Statement */}
              <p className="text-base sm:text-lg text-slate-200 font-medium mb-6 leading-relaxed">
                {guideItems[activeTab].summary}
              </p>

              {/* Bulleted Insights */}
              <div className="space-y-4 mb-8">
                {guideItems[activeTab].details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-dpc-gold-500/20 border border-dpc-gold-500/40 flex items-center justify-center shrink-0 mt-0.5 text-dpc-gold-300 text-xs font-bold">
                      ✓
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>

              {/* Prompt CTA Card */}
              <div className="bg-dpc-navy-950/80 rounded-2xl p-4 sm:p-5 border border-dpc-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">
                    Ready to visit us this coming Sunday?
                  </p>
                  <p className="text-xs text-slate-400 font-light">
                    We would love to reserve a seat and prepare a welcome gift for you.
                  </p>
                </div>
                <button
                  onClick={onPlanVisitClick}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-dpc-navy-950 bg-gradient-to-r from-dpc-gold-400 to-dpc-gold-300 hover:from-dpc-gold-300 hover:to-dpc-gold-200 shadow-gold-glow shrink-0 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Plan a Visit Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
