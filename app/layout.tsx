import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ weight: "400", subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Mariya Baig",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${roboto.className} bg-white dark:bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
