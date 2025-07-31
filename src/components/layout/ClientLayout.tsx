"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/layout/LenisProvider";
import CookieConsent from "@/components/ui/CookieConsent";
import { TranslationProvider } from "@/components/layout/TranslationProvider";
import { useGeoLocation } from "@/hooks/useGeoLocation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { geoLocation, isLoading } = useGeoLocation();

  return (
    <TranslationProvider geoLocation={geoLocation}>
      <LenisProvider>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </LenisProvider>
    </TranslationProvider>
  );
} 