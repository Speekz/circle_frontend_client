import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Circle Dashboard - Payments",
  description: "Payments page for the Circle Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
