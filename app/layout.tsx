import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

import { ThemeProvider } from "@/theme-provider";
import { NavBar } from "@/components";
import { NextAuthProvider } from "@/NextAuthProvider";
import React, { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });
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
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${golos.variable} bg-white font-golos duration-200 dark:bg-[#0d1117]`}
      >
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
      </body>
    </html>
  );
}
