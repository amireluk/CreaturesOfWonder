import type { Metadata } from "next";
import "./globals.css";
import { NikudProvider } from "@/contexts/NikudContext";

export const metadata: Metadata = {
  title: "ספר היצורים המופלאים",
  description: "מדריך לאיתור יצורים מסוכנים",
  manifest: "/CreaturesOfWonder/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "יצורים",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="min-h-screen antialiased">
        <NikudProvider>{children}</NikudProvider>
      </body>
    </html>
  );
}
