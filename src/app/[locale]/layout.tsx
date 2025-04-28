import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ".././globals.css";

import { QueryProvider } from "@/providers/QueryProvider";
import { ThemeProvider } from "@/context/ThemeContext";
import { SidebarProvider } from "@/context/SidebarContext";
import ToastContainerClient from "@/components/toast/ToastContainer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fulfillment System",
  description: "Fulfillment System",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </QueryProvider>
        <ToastContainerClient />
      </body>
    </html>
  );
}
