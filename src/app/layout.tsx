import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://carlux-inventory.vercel.app"),

  title: {
    default: "Carlux Inventory | Luxury Vehicle Dashboard",
    template: "%s | Carlux Inventory",
  },

  description:
    "Carlux Inventory is a high-performance luxury vehicle dashboard built with Next.js and TypeScript. Explore, filter, and sort premium automotive inventory in a fast, modern interface.",

  keywords: [
    "Carlux",
    "Luxury Vehicles",
    "Automotive Dashboard",
    "Vehicle Inventory",
    "Next.js Dashboard",
    "React Inventory Grid",
    "High Performance UI",
  ],

  authors: [
    {
      name: "Tushar Biswas",
      url: "https://asynctushar.vercel.app",
    },
  ],

  creator: "Tushar Biswas",

  openGraph: {
    title: "Carlux Inventory | Luxury Vehicle Dashboard",
    description:
      "A premium, high-performance automotive inventory interface built with Next.js, TypeScript, and Tailwind.",
    url: "https://carlux-inventory.vercel.app",
    siteName: "Carlux Inventory",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Carlux Inventory | Luxury Vehicle Dashboard",
    description:
      "Explore luxury automotive inventory in a sleek, high-performance dashboard built with Next.js.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
