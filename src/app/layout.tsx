import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitGud - Coding Interview Journal",
  description: "Track your coding interview preparation with brutal honesty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
        >
          <header className="sticky top-0 z-50 w-full border-b-4 border-black dark:border-white bg-primary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-20 items-center justify-between">
                <div className="flex items-center space-x-8">
                  <Link href="/" className="flex items-center space-x-3 group">
                    <div className="h-12 w-12 border-4 border-black dark:border-white bg-black dark:bg-white flex items-center justify-center brutal-shadow">
                      <span className="text-white dark:text-black font-black text-xl">G</span>
                    </div>
                    <span className="font-black text-3xl text-black dark:text-white uppercase tracking-tighter">GitGud</span>
                  </Link>
                  <nav className="hidden md:flex items-center space-x-2 text-sm font-black">
                    <SignedIn>
                      <Link
                        href="/"
                        className="px-4 py-2 border-2 border-black dark:border-white brutal-shadow-sm bg-white dark:bg-black text-black dark:text-white transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 uppercase tracking-tight"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/problems"
                        className="px-4 py-2 border-2 border-black dark:border-white brutal-shadow-sm bg-white dark:bg-black text-black dark:text-white transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 uppercase tracking-tight"
                      >
                        Problems
                      </Link>
                    </SignedIn>
                  </nav>
                </div>
                <div className="flex items-center space-x-3">
                  <SignedOut>
                    <SignInButton>
                      <Button variant="outline" size="sm">
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton>
                      <Button variant="secondary" size="sm">
                        Sign Up
                      </Button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <div className="border-4 border-black dark:border-white brutal-shadow p-1 bg-white dark:bg-black">
                      <UserButton />
                    </div>
                  </SignedIn>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
