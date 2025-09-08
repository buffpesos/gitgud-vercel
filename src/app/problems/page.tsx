"use client";

import { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Plus, BookOpen, Search, ExternalLink, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AddProblemDialog } from "@/components/add-problem-dialog";
import { DeleteProblemDialog } from "@/components/delete-problem-dialog";
import { uiLogger } from "@/lib/logger";

type Problem = {
  id: string;
  title: string;
  description: string | null;
  url: string | null;
  platform: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[] | null;
  createdAt: string;
  updatedAt: string;
};

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");

  useEffect(() => {
    uiLogger.debug("ProblemsPage component mounted, fetching problems");
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    uiLogger.debug("Starting to fetch problems");
    try {
      const response = await fetch("/api/problems");
      if (response.ok) {
        const data = await response.json();
        uiLogger.info("Problems fetched successfully", { count: data.length });
        setProblems(data);
      } else {
        uiLogger.warn("Failed to fetch problems", { status: response.status });
      }
    } catch (error) {
      uiLogger.error("Error fetching problems", { error: error instanceof Error ? error.message : error });
    } finally {
      setLoading(false);
      uiLogger.debug("Loading state set to false");
    }
  };

  const handleDeleteProblem = async (problemId: string) => {
    console.log("ProblemsPage - Deleting problem", { problemId });
    try {
      const response = await fetch(`/api/problems/${problemId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("ProblemsPage - Problem deleted successfully", { problemId });
        // Refetch problems after deletion
        fetchProblems();
      } else {
        const error = await response.json();
        console.log("ProblemsPage - Failed to delete problem", { problemId, error: error.error });
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Error deleting problem:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "default";
      case "medium":
        return "secondary";
      case "hard":
        return "destructive";
      default:
        return "outline";
    }
  };

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = searchTerm === "" || 
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (problem.description?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (problem.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesDifficulty = difficultyFilter === "" || problem.difficulty === difficultyFilter;
    const matchesPlatform = platformFilter === "" || problem.platform.toLowerCase() === platformFilter.toLowerCase();
    
    return matchesSearch && matchesDifficulty && matchesPlatform;
  });
  return (
    <div className="flex-1 space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SignedOut>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter">
              Sign in to view your problems
            </h1>
          </div>
          <SignInButton>
            <Button size="lg">Sign In</Button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">Problems</h2>
          <div className="flex items-center space-x-2">
            <AddProblemDialog>
              <Button className="shadow-xl">
                <Plus className="mr-2 h-4 w-4" />
                Add Problem
              </Button>
            </AddProblemDialog>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <Search className="h-4 w-4 text-primary" />
              </div>
              Search & Filter
            </CardTitle>
            <CardDescription className="text-base">Find problems in your collection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search problems..." 
                  className="pl-10 h-12 rounded-xl border-2 focus:border-primary/50" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="flex h-12 w-full items-center justify-between rounded-xl border-2 border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-[180px]"
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
              >
                <option value="">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <select 
                className="flex h-12 w-full items-center justify-between rounded-xl border-2 border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-[180px]"
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
              >
                <option value="">All Platforms</option>
                <option value="leetcode">LeetCode</option>
                <option value="hackerrank">HackerRank</option>
                <option value="codewars">CodeWars</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Problems List */}
        {loading ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center space-y-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-sm text-muted-foreground">Loading problems...</p>
              </div>
            </CardContent>
          </Card>
        ) : filteredProblems.length === 0 && problems.length > 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <Search className="h-16 w-16 text-muted-foreground mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">No problems found</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    Try adjusting your search terms or filters to find what you&apos;re looking for.
                  </p>
                </div>
                <Button onClick={() => { setSearchTerm(""); setDifficultyFilter(""); setPlatformFilter(""); }} variant="outline">
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : problems.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <BookOpen className="h-16 w-16 text-muted-foreground mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">No problems yet</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    Start building your problem collection by adding your first coding challenge.
                  </p>
                </div>
                <AddProblemDialog>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Problem
                  </Button>
                </AddProblemDialog>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredProblems.map((problem) => (
              <Card key={problem.id} className="hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] border-2 hover:border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-4">
                        <h3 className="text-xl font-bold">
                          <Link href={`/problems/${problem.id}`} className="hover:text-primary transition-colors bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent hover:from-primary hover:to-primary/80">
                            {problem.title}
                          </Link>
                        </h3>
                        {problem.url && (
                          <a 
                            href={problem.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors flex items-center gap-1 text-sm text-muted-foreground p-2 rounded-lg hover:bg-accent/50"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        <Badge variant={getDifficultyVariant(problem.difficulty) as "default" | "secondary" | "destructive" | "outline"} className="px-3 py-1 text-xs font-semibold">
                          {problem.difficulty}
                        </Badge>
                      </div>
                      
                      {problem.description && (
                        <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
                      )}
                      
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        {problem.tags && problem.tags.length > 0 && (
                          <div className="flex gap-2">
                            {problem.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs px-2 py-1">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <span className="font-medium">{new Date(problem.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="ml-8 flex items-center gap-3">
                      <Button asChild variant="outline" size="sm" className="shadow-md">
                        <Link href={`/problems/${problem.id}`}>
                          View Details
                        </Link>
                      </Button>
                      <DeleteProblemDialog
                        problemId={problem.id}
                        problemTitle={problem.title}
                        onConfirmDelete={() => handleDeleteProblem(problem.id)}
                      >
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="shadow-md"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DeleteProblemDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </SignedIn>
    </div>
  );
}