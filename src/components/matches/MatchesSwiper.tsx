"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MatchCard, Match } from "./MatchCard";

export type MatchesSwiperProps = {
  upcoming: Match[];
  past: Match[];
  initialTab?: 'upcoming' | 'past';
  onTabChange?: (tab: 'upcoming' | 'past') => void;
};

export function MatchesSwiper({
  upcoming,
  past,
  initialTab = 'upcoming',
  onTabChange,
}: MatchesSwiperProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>(initialTab);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const upcomingPaneRef = useRef<HTMLDivElement>(null);
  const pastPaneRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // Scroll to specific pane
  const scrollToPane = useCallback((tab: 'upcoming' | 'past', animated = true) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const targetPane = tab === 'upcoming' ? upcomingPaneRef.current : pastPaneRef.current;
    
    if (!targetPane) return;

    isScrollingRef.current = true;
    const targetLeft = targetPane.offsetLeft - container.offsetLeft;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    container.scrollTo({
      left: targetLeft,
      behavior: animated && !prefersReducedMotion ? 'smooth' : 'auto',
    });

    setActiveTab(tab);
    onTabChange?.(tab);

    // Reset scrolling flag after animation
    if (animated) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 500);
      } else {
        isScrollingRef.current = false;
      }
    } else {
      isScrollingRef.current = false;
    }
  }, [onTabChange]);

  // Track active pane via IntersectionObserver
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observerOptions = {
      root: container,
      rootMargin: '0px',
      threshold: 0.6, // When 60% of pane is visible, consider it active
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Only update if user is not actively scrolling (to avoid conflicts)
      if (isScrollingRef.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          const tab = entry.target === upcomingPaneRef.current ? 'upcoming' : 'past';
          setActiveTab(tab);
          onTabChange?.(tab);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    if (upcomingPaneRef.current) observer.observe(upcomingPaneRef.current);
    if (pastPaneRef.current) observer.observe(pastPaneRef.current);

    return () => {
      observer.disconnect();
    };
  }, [onTabChange]);

  // Initial scroll to initialTab (without animation)
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollToPane(initialTab, false);
    }
  }, []); // Only run on mount

  // Keyboard navigation
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if container is focused or has no other focusable element
      if (document.activeElement !== container && !container.contains(document.activeElement)) {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          if (activeTab === 'past') {
            scrollToPane('upcoming');
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (activeTab === 'upcoming') {
            scrollToPane('past');
          }
          break;
        case 'Home':
          e.preventDefault();
          scrollToPane('upcoming');
          break;
        case 'End':
          e.preventDefault();
          scrollToPane('past');
          break;
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, scrollToPane]);

  // Handle scroll event (fallback for manual scrolling)
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || isScrollingRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    const scrollRatio = scrollLeft / containerWidth;

    // Determine active pane based on scroll position
    if (scrollRatio < 0.5) {
      if (activeTab !== 'upcoming') {
        setActiveTab('upcoming');
        onTabChange?.('upcoming');
      }
    } else {
      if (activeTab !== 'past') {
        setActiveTab('past');
        onTabChange?.('past');
      }
    }
  }, [activeTab, onTabChange]);

  return (
    <div className="w-full">
      {/* Swipeable Content Area */}
      <div className="relative">
        {/* Pane Header Badges - Tek set, pane'lerin üstünde */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-start z-20 px-4 mb-2">
          {/* Sol üst: Gelecek Maçlar */}
          {activeTab === 'upcoming' ? (
            <div className="px-3 py-1.5 bg-primary/30 border border-primary/50 rounded-lg text-sm font-semibold text-white">
              Gelecek Maçlar
            </div>
          ) : (
            <button
              onClick={() => scrollToPane('upcoming')}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-lg text-sm font-medium text-text transition-colors"
            >
              Gelecek Maçlar
            </button>
          )}

          {/* Sağ üst: Geçmiş Maçlar */}
          {activeTab === 'past' ? (
            <div className="px-3 py-1.5 bg-primary/30 border border-primary/50 rounded-lg text-sm font-semibold text-white">
              Geçmiş Maçlar
            </div>
          ) : (
            <button
              onClick={() => scrollToPane('past')}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-lg text-sm font-medium text-text transition-colors"
            >
              Geçmiş Maçlar
            </button>
          )}
        </div>

        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto snap-x snap-mandatory no-scrollbar flex pt-16"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={handleScroll}
          tabIndex={0}
          role="region"
          aria-label="Maçlar listesi"
          aria-live="polite"
        >
          {/* Upcoming Matches Pane */}
          <div
            ref={upcomingPaneRef}
            id="upcoming-pane"
            role="tabpanel"
            className="min-w-full flex-shrink-0 snap-start px-1"
          >
            {upcoming.length > 0 ? (
              <div className="space-y-4">
                {upcoming.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg font-medium mb-2">Henüz gelecek maç yok</p>
                <p className="text-sm">Yaklaşan maçlar burada görünecek</p>
              </div>
            )}
          </div>

          {/* Past Matches Pane */}
          <div
            ref={pastPaneRef}
            id="past-pane"
            role="tabpanel"
            className="min-w-full flex-shrink-0 snap-start px-1"
          >
            {past.length > 0 ? (
              <div className="space-y-4">
                {past.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p className="text-lg font-medium mb-2">Henüz geçmiş maç yok</p>
                <p className="text-sm">Tamamlanan maçlar burada görünecek</p>
              </div>
            )}
          </div>
        </div>

        {/* Screen reader status */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {activeTab === 'upcoming' ? 'Gelecek Maçlar görüntüleniyor' : 'Geçmiş Maçlar görüntüleniyor'}
        </div>
      </div>
    </div>
  );
}

