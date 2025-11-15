"use client";

import { useEffect, useState } from "react";
import { BookOpen, Trophy, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStatsData {
  totalProblems: number;
  solved: number;
  inProgress: number;
  successRate: number;
}

export function DashboardStats() {
  const [stats, setStats] = useState<DashboardStatsData>({
    totalProblems: 0,
    solved: 0,
    inProgress: 0,
    successRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="h-4 w-20 bg-muted animate-pulse"></div>
              <div className="h-8 w-8 bg-muted animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-12 bg-muted animate-pulse mb-1"></div>
              <div className="h-3 w-32 bg-muted animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-primary brutal-hover cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-xs font-black uppercase">Total Problems</CardTitle>
          <div className="h-10 w-10 border-2 border-black dark:border-white bg-black dark:bg-white flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-white dark:text-black" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-black mb-1">{stats.totalProblems}</div>
          <p className="text-xs font-bold uppercase">In Collection</p>
        </CardContent>
      </Card>

      <Card className="bg-secondary brutal-hover cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-xs font-black uppercase">Solved</CardTitle>
          <div className="h-10 w-10 border-2 border-black dark:border-white bg-black dark:bg-white flex items-center justify-center">
            <Trophy className="h-5 w-5 text-white dark:text-black" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-black mb-1">{stats.solved}</div>
          <p className="text-xs font-bold uppercase">Completed</p>
        </CardContent>
      </Card>

      <Card className="bg-accent brutal-hover cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-xs font-black uppercase">In Progress</CardTitle>
          <div className="h-10 w-10 border-2 border-black dark:border-white bg-black dark:bg-white flex items-center justify-center">
            <Clock className="h-5 w-5 text-white dark:text-black" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-black mb-1">{stats.inProgress}</div>
          <p className="text-xs font-bold uppercase">Working On</p>
        </CardContent>
      </Card>

      <Card className="bg-destructive brutal-hover cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-xs font-black uppercase">Success Rate</CardTitle>
          <div className="h-10 w-10 border-2 border-black dark:border-white bg-black dark:bg-white flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white dark:text-black" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-black mb-1">{stats.successRate}%</div>
          <p className="text-xs font-bold uppercase">Success</p>
        </CardContent>
      </Card>
    </div>
  );
}
