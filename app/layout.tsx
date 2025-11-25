import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainNav from "./components/main-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Miriam Lin | Personal Website",
  description: "Miriam Lin's personal website",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainNav />
        {children}
        <footer className="mx-auto my-12 w-full max-w-6xl border-t border-zinc-200 px-6 py-8 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} Miriam Lin. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
