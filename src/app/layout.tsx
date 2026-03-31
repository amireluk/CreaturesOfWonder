import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ספר היצורים המופלאים",
  description: "ספר יצורים מופלאים לילדים סקרנים",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
