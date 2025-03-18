import { Badge } from "@/components/ui/badge";
import { Clock, XCircle } from "lucide-react";
import Link from "next/link";


export function RecentCourses({courses}) {
  console.log(courses);
  
  return (
    <div className="space-y-4">
      {courses
        .filter(
          (course) =>
            course.progress === "In Progress" || course.progress === "Incomplete" || course.progress === "completed"
        ) // Display only "In Progress" or "Incomplete" courses
        .map((course) => (
          <div key={course.id} className="flex flex-col gap-2 rounded-lg border p-3">
            <div className="flex items-center justify-between">
              <Link href="#" className="font-medium hover:underline">
                {course.courseName}
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
              <div className="text-muted-foreground">{course.category}</div>
              {course.progress === "In Progress" && (
                <Clock className="h-4 w-4 text-yellow-500" />
              )}
              {course.progress === "Incomplete" && (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <div className="ml-auto text-muted-foreground">
                Last Activity: {course.lastActivity}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
