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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-0 shadow-xl backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="h-4 w-20 bg-muted animate-pulse rounded"></div>
              <div className="h-12 w-12 bg-muted animate-pulse rounded-xl"></div>
            </CardHeader>
            <CardContent>
              <div className="h-10 w-16 bg-muted animate-pulse rounded mb-1"></div>
              <div className="h-3 w-32 bg-muted animate-pulse rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50/80 to-blue-100/80 dark:from-blue-950/30 dark:to-blue-900/30 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-blue-700 dark:text-blue-300">Total Problems</CardTitle>
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-blue-700 dark:text-blue-300 mb-1">{stats.totalProblems}</div>
          <p className="text-sm text-blue-600/80 dark:text-blue-400/80">Problems in your collection</p>
        </CardContent>
      </Card>
      
      <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50/80 to-green-100/80 dark:from-green-950/30 dark:to-green-900/30 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-green-700 dark:text-green-300">Solved</CardTitle>
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
            <Trophy className="h-6 w-6 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-green-700 dark:text-green-300 mb-1">{stats.solved}</div>
          <p className="text-sm text-green-600/80 dark:text-green-400/80">Successfully completed</p>
        </CardContent>
      </Card>
      
      <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50/80 to-orange-100/80 dark:from-orange-950/30 dark:to-orange-900/30 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-orange-700 dark:text-orange-300">In Progress</CardTitle>
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
            <Clock className="h-6 w-6 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-orange-700 dark:text-orange-300 mb-1">{stats.inProgress}</div>
          <p className="text-sm text-orange-600/80 dark:text-orange-400/80">Currently working on</p>
        </CardContent>
      </Card>
      
      <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50/80 to-purple-100/80 dark:from-purple-950/30 dark:to-purple-900/30 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-purple-700 dark:text-purple-300">Success Rate</CardTitle>
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-purple-700 dark:text-purple-300 mb-1">{stats.successRate}%</div>
          <p className="text-sm text-purple-600/80 dark:text-purple-400/80">Overall success rate</p>
        </CardContent>
      </Card>
    </div>
  );
}