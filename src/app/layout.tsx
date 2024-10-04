import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryClientProvider } from "@/components/providers/ReactQueryClientProvider";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "@/components/molecules/Navbar";

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
    <ReactQueryClientProvider>
      <html lang="en">
        <body>
          <div className="pt-16 relative w-full h-full">
            <Navbar />
            {children}
            <ToastContainer />
          </div>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
