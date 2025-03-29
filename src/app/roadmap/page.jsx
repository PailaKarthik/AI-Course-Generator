"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import DeleteRoadmap from "@/components/Home/DeleteRoadmap";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { loader } from "@/components/ui/Custom/ToastLoader";

export default function page() {
    const [roadmaps, setRoadmaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const { hideLoader } = loader();

    async function fetchRoadmaps() {
        setLoading(true);
        const response = await fetch("/api/roadmap/all");
        const data = await response.json();
        setRoadmaps(data.docs);
        setLoading(false);
    }
    useEffect(() => {
        fetchRoadmaps();
    }, []);

    return (
        <div className="max-w-6xl flex flex-col gap-4 items-center p-4 mb-16 mx-auto">
            <h1 className="text-2xl font-semibold self-start">YOUR COURSES </h1>
            <div className="flex gap-6 justify-center flex-wrap">
                {loading ? (
                    Array(6)
                        .fill(0)
                        .map((_, i) => {
                            return (
                                <Skeleton
                                    key={i}
                                    className={"w-[320px] h-64"}
                                ></Skeleton>
                            );
                        })
                ) : (
                    <>
                        {roadmaps?.map((roadmap) => {
                            
                            if (roadmap.process === "completed") return (
                                <Card
                                    key={roadmap.id}
                                    className={"w-[320px] relative"}
                                >
                                    <CardHeader>
                                        <CardTitle>
                                            {roadmap?.courseTitle?.split(
                                                ":"
                                            )[0] || ""}
                                        </CardTitle>
                                        <div className="absolute z-10 top-0 right-0">
                                            <DeleteRoadmap
                                                id={roadmap.id}
                                                onDelete={() => {
                                                    fetchRoadmaps();
                                                    hideLoader();
                                                }}
                                            ></DeleteRoadmap>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {roadmap.courseDescription}
                                    </CardContent>

                                    <Link href={`/roadmap/${roadmap.id}`}>
                                        <span className="absolute inset-0"></span>
                                    </Link>
                                </Card>
                            );
                        })}
                        <Card
                            className={
                                "w-[320px] relative flex items-center justify-center border-3 border-dotted"
                            }
                        >
                            <div className="flex flex-col items-center text-accent-foreground/70">
                                <Plus
                                    strokeWidth={1}
                                    className="w-30 h-30"
                                ></Plus>
                                <p className="text-lg text-center">
                                    Create your course
                                </p>
                            </div>
                            <Link href={`/generate`} scroll={false}>
                                <span className="absolute inset-0"></span>
                            </Link>
                        </Card>
                    </>
                )}
            </div>
        </div>
    );
}
