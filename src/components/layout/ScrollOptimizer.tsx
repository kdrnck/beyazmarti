"use client";

import { useEffect } from "react";

export function ScrollOptimizer() {
  useEffect(() => {
    let isScrolling: NodeJS.Timeout;

    const handleScroll = () => {
      // Add class when scrolling starts
      if (!document.body.classList.contains("is-scrolling")) {
        document.body.classList.add("is-scrolling");
      }

      // Clear existing timeout
      clearTimeout(isScrolling);

      // Remove class when scrolling stops (after 150ms of no scroll events)
      isScrolling = setTimeout(() => {
        document.body.classList.remove("is-scrolling");
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(isScrolling);
      document.body.classList.remove("is-scrolling");
    };
  }, []);

  return null;
}


