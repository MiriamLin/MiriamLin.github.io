import type { Metadata } from "next";
import { Nunito, DM_Mono } from "next/font/google";
import "./globals.css";
import MainNav from "./components/main-nav";

const sans = Nunito({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const mono = DM_Mono({
  variable: "--font-geist-mono",
  weight: ["400", "500"],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${sans.variable} ${mono.variable} antialiased`}
      >
        <MainNav />
        {children}
        <footer className="mx-auto mt-16 w-full max-w-3xl px-6 pb-12">
          <p className="border-t border-zinc-200 pt-6 text-center font-mono text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            © {new Date().getFullYear()} Miriam Lin
          </p>
        </footer>
      </body>
    </html>
  );
}
