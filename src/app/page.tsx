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
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/5 rounded-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.7_0.15_280_/_0.1)_0px,transparent_50%)] rounded-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,oklch(0.65_0.2_320_/_0.1)_0px,transparent_50%)] rounded-3xl"></div>
          <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center space-y-8 px-4 py-16">
            <div className="space-y-8">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex items-center justify-center shadow-2xl border border-primary/20">
                  <Code className="h-8 w-8 text-primary-foreground" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                  GitGud
                </h1>
              </div>
              <h2 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl/none">
                Master Coding
                <br />
                <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent">
                  Interviews
                </span>
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground text-xl md:text-2xl leading-relaxed">
                Your personal coding interview journal. Track problems, document solutions, 
                and measure your progress with precision analytics.
              </p>
            </div>
            <div className="max-w-[800px] mx-auto space-y-8">
              <p className="text-lg text-foreground/80 leading-relaxed">
                Turn your coding practice into real progress. Our platform helps you track your practice sessions so you can learn from your mistakes. Because the difference between developers who land their dream jobs and those who don&apos;t isn&apos;t just talent—it&apos;s the discipline to learn from every mistake, understand every solution, and never stumble on the same problem twice. It&apos;s time to just GitGud.
              </p>
              <SignInButton>
                <Button size="lg" className="text-lg px-10 py-6 shadow-2xl">
                  <Zap className="mr-3 h-6 w-6" />
                  Start Your Journey
                </Button>
              </SignInButton>
            </div>
          </div>
        </div>


        {/* CTA Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90 rounded-3xl p-12 text-center text-primary-foreground shadow-2xl border border-primary/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,oklch(1_0_0_/_0.1)_0px,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,oklch(1_0_0_/_0.1)_0px,transparent_50%)]"></div>
          <div className="relative">
            <h3 className="text-4xl font-bold mb-6">Ready to Level Up?</h3>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
              Join developers who are acing their interviews with structured practice
            </p>
            <SignInButton>
              <Button size="lg" variant="secondary" className="text-lg px-10 py-6 shadow-xl">
                <Trophy className="mr-3 h-6 w-6" />
                Get Started Free
              </Button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        {/* Dashboard Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-secondary/5 rounded-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,oklch(0.7_0.15_280_/_0.1)_0px,transparent_50%)] rounded-3xl"></div>
          <div className="relative flex items-center justify-between p-10">
            <div className="space-y-3">
              <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Welcome back!</h2>
              <p className="text-muted-foreground text-lg">
                Ready to tackle some coding challenges?
              </p>
            </div>
            <AddProblemDialog>
              <Button size="lg" className="shadow-2xl">
                <Plus className="mr-3 h-5 w-5" />
                Add Problem
              </Button>
            </AddProblemDialog>
          </div>
        </div>

        {/* Stats Overview */}
        <DashboardStats />

        {/* Quick Actions */}
        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                Recent Activity
              </CardTitle>
              <CardDescription className="text-base">
                Your latest problem attempts and progress
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="flex items-center justify-center h-[220px] text-center">
                <div className="space-y-6">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex items-center justify-center mx-auto shadow-xl">
                    <BookOpen className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <div className="space-y-3">
                    <p className="font-semibold text-lg">Ready to start your journey?</p>
                    <p className="text-muted-foreground">
                      Add your first problem to begin tracking your progress
                    </p>
                  </div>
                  <AddProblemDialog>
                    <Button className="shadow-lg">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Your First Problem
                    </Button>
                  </AddProblemDialog>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                Quick Actions
              </CardTitle>
              <CardDescription className="text-base">
                Jump right into your coding practice
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <AddProblemDialog>
                <Button className="w-full justify-start h-14 text-left" variant="outline">
                  <Plus className="mr-4 h-5 w-5" />
                  <div>
                    <div className="font-semibold">Add New Problem</div>
                    <div className="text-sm text-muted-foreground">Start with a coding challenge</div>
                  </div>
                </Button>
              </AddProblemDialog>
              <Button asChild className="w-full justify-start h-14 text-left" variant="outline">
                <Link href="/problems">
                  <BookOpen className="mr-4 h-5 w-5" />
                  <div>
                    <div className="font-semibold">View All Problems</div>
                    <div className="text-sm text-muted-foreground">Browse your collection</div>
                  </div>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </SignedIn>
    </div>
  );
}