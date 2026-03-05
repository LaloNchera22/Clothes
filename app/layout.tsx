import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "A0_BADX | Entry Gate",
  description: "A0_BADX Entry Gate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen relative overflow-x-hidden selection:bg-primary selection:text-white bg-white`}
      >
        <div className="relative z-10 flex min-h-screen w-full flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
