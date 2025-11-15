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
          <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center space-x-8">
                  <Link href="/" className="flex items-center space-x-2 group">
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                      <span className="text-primary-foreground font-bold text-sm">G</span>
                    </div>
                    <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">GitGud</span>
                  </Link>
                  <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
                    <SignedIn>
                      <Link
                        href="/"
                        className="px-4 py-2 rounded-lg transition-all duration-200 hover:bg-accent/80 hover:text-accent-foreground text-foreground/70 hover:text-foreground"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/problems"
                        className="px-4 py-2 rounded-lg transition-all duration-200 hover:bg-accent/80 hover:text-accent-foreground text-foreground/70 hover:text-foreground"
                      >
                        Problems
                      </Link>
                    </SignedIn>
                  </nav>
                </div>
                <div className="flex items-center space-x-4">
                  <SignedOut>
                    <SignInButton>
                      <Button variant="ghost" size="sm">
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton>
                      <Button size="sm">
                        Sign Up
                      </Button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
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
