import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Munchies",
  description: "A food delivery app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-offwhite"
      >
        {children}
      </body>
    </html>
  );
}
