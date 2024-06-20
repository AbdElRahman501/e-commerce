import "./globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/theme-provider";
import { NavBar } from "@/components";
import React, { Suspense } from "react";
import LocalStorage from "@/components/LocalStorage";
import { NextAuthProvider } from "@/NextAuthProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const golos = localFont({
  src: [
    {
      path: "../fonts/Golos-UI_Regular.ttf",
      weight: "400",
    },
    {
      path: "../fonts/Golos-UI_Medium.ttf",
      weight: "500",
    },
    {
      path: "../fonts/Golos-UI_Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-golos-ui",
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
        className={`${golos.variable} bg-primary_bg font-golos duration-200 dark:bg-dark_bg `}
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
