import "./globals.css";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@/theme-provider";
import { NavBar } from "@/components";
import React, { Suspense } from "react";
import LocalStorage from "@/components/LocalStorage";
import { NextAuthProvider } from "@/NextAuthProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const { SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME! + " | Made just for YOU.",
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
  "p:domain_verify": "41c125c5f6a54ece8129399596b0a264",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} bg-primary_bg font-golos duration-200 dark:bg-dark_bg `}
      >
        <LocalStorage />
        <Suspense>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <NextAuthProvider>
              <NavBar />
              <main>{children}</main>
            </NextAuthProvider>
          </ThemeProvider>
        </Suspense>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
