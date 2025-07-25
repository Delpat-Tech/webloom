"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/layout/LenisProvider";
import Loader from "@/components/ui/Loader";
import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Always show loader for 1.5s on any route
  const [showLoader, setShowLoader] = useState(true);
  const [loaderGone, setLoaderGone] = useState(false);

  useEffect(() => {
    setShowLoader(true);
    setLoaderGone(false);
    const timer = setTimeout(() => setShowLoader(false), 1500);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleFadeOut = useCallback(() => setLoaderGone(true), []);

  return (
    <LenisProvider>
      <Header />
      {/* Loader overlay */}
      {!loaderGone && (
        <Loader show={showLoader} onFadeOut={handleFadeOut} />
      )}
      {/* Main content, animated in after loader is gone */}
      <main className={loaderGone ? "animate-fade-in" : "opacity-0 pointer-events-none select-none"}>
        {children}
      </main>
      {loaderGone && <Footer />}
    </LenisProvider>
  );
} 