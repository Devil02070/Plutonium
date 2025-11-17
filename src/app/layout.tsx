import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { Toaster } from "sonner";
import { AppKitProvider } from "@/context/AppkitProvider";

const font = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: "Plutonium",
  description: "Plutonium",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.variable} antialiased`}>
        <AppKitProvider>
          <Header />
          {children}
          <Toaster />
        </AppKitProvider>
      </body>
    </html>
  );
}
