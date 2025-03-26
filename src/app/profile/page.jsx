"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ProblemSolvedChart } from "@/components/ui/problem-sloved-chart";
import { RecentCourses } from "@/components/ui/recent-submissions";
import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";

const sampleData = {
    name: "John Doe",
    email: "ejhiejj@gmail.com",
    image: "https://th.bing.com/th/id/OIP.Pf2p3qw7OLntwU0Ld4tWewHaFj?rs=1&pid=ImgDetMain",
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
    number_of_question_solved_in_months: [
        10, 2, 3, 4, 1, 6, 7, 8, 9, 10, 11, 12,
    ],
};

export default function Page() {
    const [data, setData] = useState(sampleData);
    const [userData, setUserData] = useState({});
    const [recentRoadmaps, setRecentRoamdaps] = useState([]);
    const [completedRoadmaps, setcompletedRoadmaps] = useState([])

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch("/api/getuser");
            const data = await res.json();
            if (res.ok) {
                setUserData(data);
            }
        }

        async function fetchRoadmaps() {
            const res = await fetch("/api/roadmap/all");
            const data = await res.json();
            let docs = data.docs.length > 4 ? data.docs.slice(0,4) : data.docs
            docs = docs.filter((e)=> !e.completed)
            const completed = data.docs.filter((roadmap)=> roadmap.completed) || []

            setcompletedRoadmaps(completed)
            setRecentRoamdaps(docs);
        }

        fetchUser();
        fetchRoadmaps();
    }, []);

    return (
        <div className="flex min-h-screen max-w-6xl pt-4 mx-auto flex-col">
            <main className="flex-1">
                <div className="container py-6">
                    <div className="grid gap-6 mx-4 relative md:grid-cols-[1fr_3fr]">
                        {/* Left Sidebar */}
                        <Sidebar user={userData} />

                        {/* Main Content */}
                        <div className="space-y-6 pt-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Xp earned</CardTitle>
                                    <CardDescription>
                                        your xp earned data over the last year
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ProblemSolvedChart
                                        questions={Object.values(
                                            userData?.xptrack || {}
                                        )}
                                    />
                                </CardContent>
                            </Card>
                            <Card className={"border-0 shadow-none p-0"}>
                                <CardHeader>
                                    <CardTitle>Recent Courses</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <RecentCourses
                                        courses={recentRoadmaps}
                                    />
                                </CardContent>
                            </Card>
                            <Card className={"border-0 shadow-none p-0"}>
                                <CardHeader>
                                    <CardTitle>Completed Courses</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <RecentCourses
                                        courses={completedRoadmaps}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
