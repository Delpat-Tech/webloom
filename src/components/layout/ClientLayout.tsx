"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/layout/LenisProvider";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </LenisProvider>
  );
} 