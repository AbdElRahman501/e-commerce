import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/theme-provider";
import { Footer, NavBar, StoreContextProvider } from "@/components";
import { NextAuthProvider } from "@/NextAuthProvider";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

const { SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
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
        className={`${inter.className} bg-slate-50 duration-200 dark:bg-[#0d1117]`}
      >
        <Suspense>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextAuthProvider>
              <StoreContextProvider>
                <NavBar />
                <main>{children}</main>
              </StoreContextProvider>
            </NextAuthProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
