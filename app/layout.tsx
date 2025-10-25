import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mariyas-portfolio.vercel.app'),
  title: "Mariya Baig - AI Terminal Portfolio",
  description: "14-year-old full-stack developer and youngest certified TensorFlow developer. Explore my projects through an interactive terminal interface with AI chat integration.",
  keywords: [
    "Mariya Baig",
    "Full-stack Developer",
    "TensorFlow",
    "Next.js",
    "React",
    "TypeScript",
    "AI Developer",
    "iOS Developer",
    "Portfolio",
    "Terminal Interface",
    "IconLab",
    "Tasbihly"
  ],
  authors: [{ name: "Mariya Baig" }],
  creator: "Mariya Baig",
  publisher: "Mariya Baig",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mariyas-portfolio.vercel.app/",
    title: "Mariya Baig - AI Terminal Portfolio",
    description: "14-year-old full-stack developer and youngest certified TensorFlow developer. Explore my projects through an interactive terminal interface.",
    siteName: "Mariya Baig Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mariya Baig - AI Terminal Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mariya Baig - AI Terminal Portfolio",
    description: "14-year-old full-stack developer and youngest certified TensorFlow developer. Explore my projects through an interactive terminal interface.",
    images: ["/og-image.png"],
    creator: "@mariyabaig",
  },
  category: "technology",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} font-mono antialiased bg-terminal-bg text-terminal-text`}>
        {children}
      </body>
    </html>
  );
}
