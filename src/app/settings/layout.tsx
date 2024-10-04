import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Circle Dashboard - Settings",
  description: "Settings page of the dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
