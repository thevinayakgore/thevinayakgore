import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/utility/theme-provider";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import SocialMedia from "@/components/sections/socialmedia";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thevinayakgore.vercel.app"),
  title: {
    default: "Frontend Engineer, Vinayak Gore & Creator of Venumity",
    template: "%s | Vinayak Gore",
  },
  description:
    "Frontend Engineer specializing in Next.js, React, TypeScript, and modern web technologies.",
  keywords: [
    "Vinayak Gore",
    "Frontend Engineer",
    "Frontend Developer",
    "Web Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Portfolio",
    "Software Engineer",
    "UI Developer",
  ],
  authors: [
    {
      name: "Vinayak Gore",
      url: "https://github.com/thevinayakgore",
    },
  ],
  creator: "Vinayak Gore",
  publisher: "Vinayak Gore",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thevinayakgore.vercel.app",
    siteName: "Vinayak Gore | Portfolio",
    title: "Vinayak Gore | Frontend Engineer & Creative Technologist",
    description:
      "Frontend Engineer specializing in Next.js, React, TypeScript, and modern web technologies.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vinayak Gore - Frontend Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinayak Gore | Frontend Engineer",
    description:
      "Frontend Engineer specializing in Next.js, React, TypeScript, and modern web technologies.",
    images: ["/og-image.jpg"],
    creator: "@vinayakgore",
    site: "@vinayakgore",
  },
  alternates: {
    canonical: "https://thevinayakgore.vercel.app",
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
  classification:
    "Personal Portfolio, Frontend Engineer Portfolio, UI Developer",
  applicationName: "Vinayak Gore Portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/shortcut-icon.png"],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/manifest.json",
  other: {
    "msapplication-TileColor": "#0a0a0a",
    "msapplication-config": "/browserconfig.xml",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        instrumentSans.variable,
      )}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <meta name="author" content="Vinayak Gore" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="General" />

        <meta property="og:email" content="vinayak@example.com" />
        <meta property="og:country-name" content="India" />

        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Vinayak Gore" />
        <meta name="twitter:label2" content="Est. reading time" />
        <meta name="twitter:data2" content="5 minutes" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Vinayak Gore",
              url: "https://thevinayakgore.vercel.app",
              image: "https://thevinayakgore.vercel.app/profile.jpg",
              sameAs: [
                "https://github.com/thevinayakgore",
                "https://linkedin.com/in/vinayakgore",
                "https://twitter.com/vinayakgore",
                "https://instagram.com/vinayakgore",
                "https://youtube.com/@vinayakgore",
              ],
              jobTitle: "Frontend Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
              description:
                "Frontend Engineer specializing in Next.js, React, TypeScript, and modern web technologies.",
              email: "vinayak@example.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "India",
              },
              knowsAbout: [
                "Next.js",
                "React",
                "TypeScript",
                "Tailwind CSS",
                "Framer Motion",
                "Shadcn UI",
              ],
              hasOccupation: {
                "@type": "Occupation",
                name: "Frontend Engineer",
                description:
                  "Building modern web applications with cutting-edge frontend technologies",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://thevinayakgore.vercel.app",
              name: "Vinayak Gore Portfolio",
              description: "Frontend Engineer & Creative Technologist",
              author: {
                "@type": "Person",
                name: "Vinayak Gore",
              },
            }),
          }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Navbar />
            <SocialMedia />
            {children}
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
