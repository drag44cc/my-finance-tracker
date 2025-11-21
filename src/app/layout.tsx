import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MobileNav } from "@/components/layout/MobileNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keuangan Pribadi",
  description: "Aplikasi pencatat keuangan pribadi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased`}>
        <main className="pb-20 min-h-screen">
          {children}
        </main>
        <MobileNav />
      </body>
    </html>
  );
}
