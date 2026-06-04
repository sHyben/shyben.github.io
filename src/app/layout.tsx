import type { Metadata } from 'next';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/nav/Navbar';
import Footer from '@/components/footer/Footer';
import { personalInfo } from '@/data/projects';
import './globals.css';

export const metadata: Metadata = {
  title: `${personalInfo.name} — ${personalInfo.tagline}`,
  description: personalInfo.bio.split('\n\n')[0],
  authors: [{ name: personalInfo.name }],
  openGraph: {
    type: 'website',
    title: `${personalInfo.name} — ${personalInfo.tagline}`,
    description: personalInfo.bio.split('\n\n')[0],
  },
};

/* Anti-FOWT: sets data-theme BEFORE first paint to prevent theme flash */
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', t);
  } catch(e){}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="canonical" href={`https://shyben.github.io`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <a href="#main-content" className="sr-only">
          Skip to content
        </a>
        <ThemeProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
