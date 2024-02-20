import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/theme-provider";
import { Footer, NavBar } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:
    "GIVACO - Unleash Your Style with Creative and Diverse Printed T-Shirts",
  description: `Discover the ultimate online destination for t-shirt lovers at GIVACO.
  Explore a curated collection of high-quality printed t-shirts featuring unique and creative designs for every occasion.
  From anime and nature themes to dark and gothic styles, GIVACO offers more choices, more value, and more fun.
  Elevate your wardrobe with the art of t-shirts. Fast delivery, easy returns, and a commitment to giving back make GIVACO the go-to brand for those who want to express themselves and support causes.
  Join us in the world where t-shirts meet creativity – GIVACO, your canvas of expression.`,
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
