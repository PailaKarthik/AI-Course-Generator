import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import LoaderProvider from "@/components/ui/Custom/ToastLoader";
import { SessionProvider } from "next-auth/react";
import { XpProvider } from "@/contexts/xp";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: ["400", "700"], // Specify font weights if needed
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "InnoVision",
  description: "Ultimate platform to master any concept",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
      >
        <SessionProvider>
          <XpProvider>
            <LoaderProvider>
              <Navbar />
              <main className="pt-16 relative">{children}</main>
              <Toaster richColors />
            </LoaderProvider>
          </XpProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
