import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/auth";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JiraSync",
  description: "Sync Jira between two projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-sidebar text-primary py-4 px-6 shadow-md fixed top-0 w-full z-20">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="flex items-center space-x-2">
                {/* Example Icon: You can replace this with your actual logo or icon */}
                <Image
                  src="/icon.jpeg" // Path to your image inside the public folder
                  alt="Logo"
                  width={32} // Adjust size
                  height={32} // Adjust size
                  className="rounded-full" // Optional styling for rounded image
                />
                <h1 className="text-lg font-bold">JiraSync</h1>
              </Link>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow pt-16 container">
            <AuthProvider>{children}</AuthProvider>
          </main>

          {/* Footer */}
          <footer className="bg-gray-100 text-primary py-4 px-6 shadow-md text-center mt-auto z-20">
            <p>
              &copy; {new Date().getFullYear()} JiraSync - Developed By Sathees.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
