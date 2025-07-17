import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '64px' }}>{children}</main>
      <Footer />
    </>
  );
} 