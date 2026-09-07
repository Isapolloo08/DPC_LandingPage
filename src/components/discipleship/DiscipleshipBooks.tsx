import React from 'react';
import { BookMarked, Clock, Users } from 'lucide-react';
import { DISCIPLESHIP_BOOKS_DATA } from '../../data/lifeGroupsData';

export const DiscipleshipBooks: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-white flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-dpc-gold-400" />
            <span>Current Discipleship Books of Study</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-light">
            Rooted in historical Reformed theology, systematic catechisms, and practical Christian living.
          </p>
        </div>

        <span className="text-xs text-dpc-gold-400 font-semibold bg-dpc-gold-500/10 px-3 py-1 rounded-full border border-dpc-gold-500/30">
          Churchwide Curriculum
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {DISCIPLESHIP_BOOKS_DATA.map((book) => (
          <div
            key={book.id}
            className="glass-panel rounded-2xl p-5 border-white/10 hover:border-dpc-gold-500/50 hover:shadow-gold-glow transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Cover Mockup Header */}
              <div className={`w-full h-28 rounded-xl bg-gradient-to-br ${book.coverAccent} p-4 flex flex-col justify-between border border-white/10 mb-4 relative overflow-hidden shadow-inner`}>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 text-white self-start">
                  {book.badge}
                </span>
                <p className="text-xs font-bold text-white line-clamp-2 font-serif">
                  {book.title}
                </p>
              </div>

              {/* Title & Author */}
              <h4 className="text-sm font-bold text-white font-serif group-hover:text-dpc-gold-300 transition-colors">
                {book.title}
              </h4>
              <p className="text-xs text-dpc-gold-400/90 font-medium mb-2">
                By {book.author}
              </p>
              <p className="text-xs text-slate-300 font-light leading-relaxed mb-4 line-clamp-3">
                {book.description}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-1.5 text-[11px] text-slate-400">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-dpc-gold-400" />
                  <span>Duration</span>
                </span>
                <span className="font-semibold text-slate-200">{book.studyDurationWeeks} Weeks</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-dpc-gold-400" />
                  <span>Recommended</span>
                </span>
                <span className="font-medium text-slate-200 truncate max-w-[130px]">{book.recommendedFor}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
