import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./print.css";
import { AuthProvider } from "@/lib/firebase/auth-context";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV Builder - Create Professional Resumes",
  description: "Fast, intuitive CV builder with AI-powered refinement. Export to PDF and Word.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
