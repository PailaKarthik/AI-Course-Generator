import { Badge } from "@/components/ui/badge";
import { Clock, XCircle } from "lucide-react";
import Link from "next/link";

export function RecentCourses({ courses }) {
    return (
        <div className="space-y-4">
            {courses.map((course) => (
                <div
                    key={course.id}
                    className="flex flex-col gap-2 rounded-lg border p-3"
                >
                    <div className="flex items-center justify-between">
                        <Link
                            href={`/roadmap/${course.id}`}
                            className="font-medium hover:underline"
                        >
                            {course.courseTitle}
                        </Link>
                        <Badge
                            variant={
                                course.progress === "In Progress"
                                    ? "secondary"
                                    : "destructive"
                            }
                            className={
                                course.progress === "In Progress"
                                    ? "text-yellow-500 bg-yellow-50"
                                    : "text-red-500 bg-red-50"
                            }
                        >
                            {course.progress}
                        </Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                        <div className=" text-muted-foreground">
                            Created At:{" "}
                            {new Date(course.createdAt).toLocaleDateString(
                                "en-US",
                                { month: "long", year: "numeric" }
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
