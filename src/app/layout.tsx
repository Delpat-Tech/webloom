import "../styles/globals.css";
import { Inter, Manrope } from "next/font/google";
import ClientLayout from "@/components/layout/ClientLayout";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import PerformanceMonitor from "@/components/analytics/PerformanceMonitor";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { generateMetadata } from "@/lib/metadata";
import { Suspense } from "react";

export const metadata = generateMetadata("");

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body
        className={`bg-background dark:bg-background-dark ${inter.className} ${manrope.className}`}
      >
        <ClientLayout>{children}</ClientLayout>
        <ScrollToTop />
        <Suspense fallback={null}>
          <AnalyticsProvider />
          <PerformanceMonitor />
        </Suspense>
      </body>
    </html>
  );
}
