import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Plus, BookOpen, Trophy, Clock, Code, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AddProblemDialog } from "@/components/add-problem-dialog";
import { DashboardStats } from "@/components/dashboard-stats";


export default function Home() {
  return (
    <div className="flex-1 space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SignedOut>
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-primary border-4 border-black dark:border-white brutal-shadow-xl py-20">
          <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-300px)] text-center space-y-12 px-4">
            <div className="space-y-8">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="h-20 w-20 border-4 border-black dark:border-white bg-black dark:bg-white flex items-center justify-center brutal-shadow-lg">
                  <Code className="h-10 w-10 text-white dark:text-black" />
                </div>
                <h1 className="text-5xl font-black text-black dark:text-white">
                  GITGUD
                </h1>
              </div>
              <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter">
                MASTER CODING
                <br />
                <span className="bg-accent text-black dark:text-white border-4 border-black dark:border-white px-4 inline-block brutal-shadow-lg">
                  INTERVIEWS
                </span>
              </h2>
              <p className="mx-auto max-w-[700px] text-foreground text-xl md:text-2xl font-bold leading-tight">
                Your personal coding interview journal. Track problems, document solutions,
                and measure your progress.
              </p>
            </div>
            <div className="max-w-[900px] mx-auto space-y-10">
              <div className="bg-secondary border-4 border-black dark:border-white brutal-shadow-lg p-8">
                <p className="text-lg text-foreground font-bold leading-relaxed uppercase tracking-tight">
                  Turn practice into progress. Learn from every mistake. Never stumble on the same problem twice. It&apos;s time to just GitGud.
                </p>
              </div>
              <SignInButton>
                <Button size="lg" className="text-xl px-12 py-8">
                  <Zap className="mr-3 h-8 w-8" />
                  Start Your Journey
                </Button>
              </SignInButton>
            </div>
          </div>
        </div>


        {/* CTA Section */}
        <div className="relative overflow-hidden bg-accent border-4 border-black dark:border-white brutal-shadow-xl p-12 text-center mt-6">
          <div className="relative space-y-8">
            <h3 className="text-5xl font-black uppercase tracking-tighter">Ready to Level Up?</h3>
            <p className="text-xl font-bold max-w-2xl mx-auto uppercase tracking-tight">
              Join developers who are acing their interviews with structured practice
            </p>
            <SignInButton>
              <Button size="lg" variant="destructive" className="text-xl px-12 py-8">
                <Trophy className="mr-3 h-8 w-8" />
                Get Started Free
              </Button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        {/* Dashboard Header */}
        <div className="bg-card border-4 border-black dark:border-white brutal-shadow-lg p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h2 className="text-4xl font-black tracking-tighter">WELCOME BACK!</h2>
              <p className="text-foreground font-bold uppercase tracking-tight">
                Ready to tackle some coding challenges?
              </p>
            </div>
            <AddProblemDialog>
              <Button size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Add Problem
              </Button>
            </AddProblemDialog>
          </div>
        </div>

        {/* Stats Overview */}
        <DashboardStats />

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-6 w-6" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Your latest problem attempts and progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-48 text-center">
                <div className="space-y-4">
                  <div className="h-16 w-16 border-4 border-black dark:border-white bg-primary flex items-center justify-center brutal-shadow mx-auto">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-black uppercase">Ready to start?</p>
                    <p className="text-sm font-medium">
                      Add your first problem to begin tracking
                    </p>
                  </div>
                  <AddProblemDialog>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Add First Problem
                    </Button>
                  </AddProblemDialog>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-6 w-6" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Jump into your coding practice
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <AddProblemDialog>
                <Button className="w-full h-14" variant="outline">
                  <Plus className="mr-3 h-5 w-5" />
                  <span className="font-black uppercase text-sm">Add New Problem</span>
                </Button>
              </AddProblemDialog>
              <Button asChild className="w-full h-14" variant="outline">
                <Link href="/problems">
                  <BookOpen className="mr-3 h-5 w-5" />
                  <span className="font-black uppercase text-sm">View All Problems</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </SignedIn>
    </div>
  );
}