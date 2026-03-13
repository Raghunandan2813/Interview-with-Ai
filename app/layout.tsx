import type { Metadata } from "next";
import { Mona_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InterviewPrep",
  description: "Creating an Ai interview prep platform",
  icons: {
    icon: "/roboo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <link rel="manifest" href="/manifest.json" />
      <link rel="icon" href="/roboo.png" />
      <body className={`${monaSans.className} antialiased  pattern`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
