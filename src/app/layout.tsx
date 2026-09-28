import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Shibani Pradhan — Software Engineer & Full-Stack Developer",
  description: "Software Engineer specializing in modern full-stack web applications, distributed systems, and scalable cloud architectures.",
  openGraph: {
    title: "Shibani Pradhan — Software Engineer & Full-Stack Developer",
    description: "Architecting resilient, high-performance web systems and full-stack software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden max-w-full">
      <body className="antialiased selection:bg-[#111] selection:text-[#faf7f3] overflow-x-hidden max-w-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
