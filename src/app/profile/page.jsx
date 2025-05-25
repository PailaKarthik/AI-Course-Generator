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

export default function Page() {
    const [userData, setUserData] = useState({});
    const [recentRoadmaps, setRecentRoamdaps] = useState([]);
    const [completedRoadmaps, setcompletedRoadmaps] = useState([]);
    const [rank, setRank] = useState(0)
    const [loading, setLoading] = useState(false)
    const [difficultyLevel, setDifficultyLevel] = useState([])
    const [leaderboard, setLeaderboard] = useState([])

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch("/api/getuser");
            const data = await res.json();
            if (res.ok) {
                setUserData(data);
            }
        }

        async function fetchRoadmaps() {
            setLoading(true)
            const res = await fetch("/api/roadmap/all");
            const data = await res.json();
            const diffLevel = data.difficultyArray
            let docs = data.docs.length > 4 ? data.docs.slice(0, 4) : data.docs;
            docs = docs.filter((e) => e.process === 'completed');
            const completed =
                data.docs.filter((roadmap) => roadmap.completed) || [];
            setcompletedRoadmaps(completed);
            setDifficultyLevel(diffLevel)
            setRecentRoamdaps(docs);
            console.log(docs)
            setLoading(false)
        }

        async function fetchRank() {
            const res = await fetch("/api/getrank");
            const data = await res.json();
            setRank(data.rank)
            setLeaderboard(data.leaderboard)
        }

        fetchUser();
        fetchRank();
        fetchRoadmaps();
    }, []);

    return (
        <div className="flex min-h-screen max-w-6xl pt-4 mx-auto flex-col">
            <main className="flex-1">
                <div className="container mx-auto max-md:pb-6 md:py-6">
                    <div className="grid gap-6 mx-4 relative md:grid-cols-[1fr_3fr]">
                        <Sidebar user={userData} rank={rank} leaderboard={leaderboard} difficultyLevel= {difficultyLevel} />

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
                                    <RecentCourses courses={recentRoadmaps} loading={loading}/>
                                </CardContent>
                            </Card>
                            <Card className={"border-0 shadow-none p-0"}>
                                <CardHeader>
                                    <CardTitle>Completed Courses</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <RecentCourses
                                        courses={completedRoadmaps}
                                        loading={loading}
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
