import "../styles/globals.css";
import { Inter, Manrope } from "next/font/google";
import ClientLayout from "@/components/layout/ClientLayout";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import { generateMetadata } from "@/lib/metadata";
import { Suspense } from "react";

export const metadata = generateMetadata('home');

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`bg-background dark:bg-background-dark ${inter.className} ${manrope.className}`}>
        <ClientLayout>{children}</ClientLayout>
        <Suspense fallback={null}>
          <AnalyticsProvider />
        </Suspense>
      </body>
    </html>
  );
}
