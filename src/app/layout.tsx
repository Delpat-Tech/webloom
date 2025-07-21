import "../styles/globals.css";
import { Inter, Manrope } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/layout/LenisProvider";

export const metadata = {
  title: 'Delpat - Empowering Businesses Through Innovation',
  description: 'Delpat delivers innovative solutions and strategic partnerships to empower businesses. We deliver excellence in every project we undertake.',
  keywords: 'Delpat, business solutions, innovation, strategic partnerships, technology',
  authors: [{ name: 'Delpat' }],
  creator: 'Delpat',
  publisher: 'Delpat',
  robots: 'index, follow',
  openGraph: {
    title: 'Delpat - Empowering Businesses Through Innovation',
    description: 'Delpat delivers innovative solutions and strategic partnerships to empower businesses.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delpat - Empowering Businesses Through Innovation',
    description: 'Delpat delivers innovative solutions and strategic partnerships to empower businesses.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
};

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
        <LenisProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
