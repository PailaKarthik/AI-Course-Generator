"use client";

import { CalendarDays, CheckCircle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProblemSolvedChart } from "@/components/ui/problem-sloved-chart";
import { RecentCourses } from "@/components/ui/recent-submissions";
import { useState } from "react";

const sampleData = {
  name: "John Doe",
  email: "ejhiejj@gmail.com",
  image:
    "https://th.bing.com/th/id/OIP.Pf2p3qw7OLntwU0Ld4tWewHaFj?rs=1&pid=ImgDetMain",
  rank: 24567,
  numberofcourses_completed: 3,
  joined: "Jan 2023",
  number_of_easy: 3,
  number_of_medium: 2,
  number_of_hard: 1,
  recent_courses: [
    {
      id: "1",
      courseName: "JavaScript Basics",
      progress: "In Progress",
      category: "Web Development",
      lastActivity: "2 hours ago",
    },
    {
      id: "2",
      courseName: "Introduction to Python",
      progress: "Completed",
      category: "Programming",
      lastActivity: "5 hours ago",
    },
    {
      id: "3",
      courseName: "React Essentials",
      progress: "In Progress",
      category: "Web Development",
      lastActivity: "Yesterday",
    },
    {
      id: "4",
      courseName: "Data Structures in C++",
      progress: "Incomplete",
      category: "Computer Science",
      lastActivity: "2 days ago",
    },
    {
      id: "5",
      courseName: "Machine Learning Intro",
      progress: "Incomplete",
      category: "Artificial Intelligence",
      lastActivity: "3 days ago",
    },
  ],
  completed_courses: [
    {
      id: "1",
      courseName: "JavaScript Basics",
      progress: "completed",
      category: "Web Development",
      lastActivity: "2 hours ago",
    },
    {
      id: "2",
      courseName: "Introduction to Python",
      progress: "completed",
      category: "Programming",
      lastActivity: "5 hours ago",
    },
    {
      id: "3",
      courseName: "React Essentials",
      progress: "completed",
      category: "Web Development",
      lastActivity: "Yesterday",
    },
    {
      id: "4",
      courseName: "Data Structures in C++",
      progress: "completed",
      category: "Computer Science",
      lastActivity: "2 days ago",
    },
    {
      id: "5",
      courseName: "Machine Learning Intro",
      progress: "completed",
      category: "Artificial Intelligence",
      lastActivity: "3 days ago",
    },
  ],
  total_courses: ["Java", "Python", "C++"],
  total_number_of_question_solved: 244,
  total_number_of_question_attempted: 244,
  number_of_question_solved_in_months: [10, 2, 3, 4, 1, 6, 7, 8, 9, 10, 11, 12],
};

export default function Page() {
  const [data, setData] = useState(sampleData);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-6">
          <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
            {/* Left Sidebar */}
            <div className="space-y-6">
              {/* User Profile Card */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <img
                      src={data.image}
                      width={80}
                      height={80}
                      alt="Avatar"
                      className="rounded-full border"
                    />
                    <div>
                      <CardTitle>{data.name}</CardTitle>
                      <CardDescription>{data.email}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Trophy className="h-4 w-4" />
                    <span>Rank: {data.rank}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span>Joined: {data.joined}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button className="w-full" size="sm">
                    Edit Profile
                  </Button>
                </CardFooter>
              </Card>

           
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Roadmap Level</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Easy</span>
                        <span className="text-muted-foreground">
                          {data.number_of_easy}
                        </span>
                      </div>
                      <Progress
                        value={data.number_of_easy * 10}
                        className="h-2 bg-muted"
                      />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Medium</span>
                        <span className="text-muted-foreground">
                          {data.number_of_medium}
                        </span>
                      </div>
                      <Progress
                        value={data.number_of_medium * 10}
                        className="h-2 bg-muted"
                      />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Hard</span>
                        <span className="text-muted-foreground">
                          {data.number_of_hard}
                        </span>
                      </div>
                      <Progress
                        value={data.number_of_hard * 10}
                        className="h-2 bg-muted"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <div className="grid w-full grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <div className="font-medium">
                        {data.total_number_of_question_solved}
                      </div>
                      <div className="text-xs text-muted-foreground">Solved</div>
                    </div>
                    <div>
                      <div className="font-medium">
                        {data.total_number_of_question_attempted}
                      </div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    <div>
                      <div className="font-medium">
                        {Math.round(
                          (data.total_number_of_question_solved /
                            data.total_number_of_question_attempted) *
                            100
                        )}
                        %
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Completion
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* Main Content */}
            <div className="space-y-6 h-screen overflow-y-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Problems Solved</CardTitle>
                  <CardDescription>
                    Your problem-solving activity over the last year
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProblemSolvedChart
                    questions={data.number_of_question_solved_in_months}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentCourses courses={data.recent_courses} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Completed Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentCourses courses={data.completed_courses} />
                </CardContent>
              </Card>
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
