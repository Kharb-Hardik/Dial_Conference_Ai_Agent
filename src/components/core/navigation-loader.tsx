"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LoadingState } from "./loading-state";

export const NavigationLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[href]");

      if (link) {
        const href = link.getAttribute("href");

        if (href && href.startsWith("/") && href !== pathname) {
          setIsLoading(true);
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [pathname]);

  if (!isLoading) return null;

  // Loader UI centered absolutely inside the relative container
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <LoadingState
        title="Loading..."
        description="Please wait while we load the data."
      />
    </div>
  );
};
