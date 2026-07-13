import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CrumbLabz Social Engine",
  description: "Internal social media planning and publishing dashboard"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
