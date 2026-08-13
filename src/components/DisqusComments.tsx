import React, { useEffect } from 'react';
import { MessageSquare, Users, MessageCircle } from 'lucide-react';

export const DisqusComments: React.FC = () => {
  useEffect(() => {
    // 1. Configure disqus_config globally before embed script executes
    (window as any).disqus_config = function (this: any) {
      this.page.url = window.location.href;
      this.page.identifier = window.location.pathname || 'market-terminal-landing-page';
    };

    // 2. Load Disqus Thread Embed script
    const embedScriptId = 'disqus-embed-script';
    if (!document.getElementById(embedScriptId)) {
      const d = document;
      const s = d.createElement('script');
      s.id = embedScriptId;
      s.src = 'https://ai-couse-learning.disqus.com/embed.js';
      s.setAttribute('data-timestamp', (+new Date()).toString());
      (d.head || d.body).appendChild(s);
    } else if ((window as any).DISQUS) {
      // Reload Disqus if already initialized (SPA handling)
      try {
        (window as any).DISQUS.reset({
          reload: true,
          config: function (this: any) {
            this.page.identifier = window.location.pathname || 'market-terminal-landing-page';
            this.page.url = window.location.href;
          },
        });
      } catch (e) {
        console.error('Disqus reset error:', e);
      }
    }

    // 3. Load Disqus Comment Count script
    const countScriptId = 'dsq-count-scr';
    if (!document.getElementById(countScriptId)) {
      const d = document;
      const s = d.createElement('script');
      s.id = countScriptId;
      s.src = '//ai-couse-learning.disqus.com/count.js';
      s.async = true;
      (d.head || d.body).appendChild(s);
    }
  }, []);

  return (
    <section id="community-discussion" className="mt-12 w-full">
      <div className="bg-[#0a0e19] border border-[#2a2e39] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2a2e39] pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#2962ff]/10 border border-[#2962ff]/30 rounded-xl text-[#2962ff]">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                Market Discussion Forum
              </h3>
              <p className="text-xs text-[#787b86] mt-0.5">
                Live community forum powered by Disqus — share insights, market forecasts, and trading strategies.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#d1d4dc] bg-[#171b26] px-3.5 py-1.5 rounded-lg border border-[#2a2e39] w-fit">
            <Users className="w-4 h-4 text-[#089981]" />
            <span>
              <a href="#disqus_thread" className="disqus-comment-count hover:text-[#2962ff] transition-colors" data-disqus-identifier="market-terminal-landing-page">
                Live Comments
              </a>
            </span>
          </div>
        </div>

        {/* Disqus Thread Embed Container */}
        <div className="bg-[#0f131e] p-4 sm:p-6 rounded-xl border border-[#1f2330] min-h-[280px]">
          <div id="disqus_thread"></div>
          <noscript>
            Please enable JavaScript to view the{' '}
            <a href="https://disqus.com/?ref_noscript" className="text-[#2962ff] underline" target="_blank" rel="noreferrer">
              comments powered by Disqus.
            </a>
          </noscript>
        </div>
      </div>
    </section>
  );
};
