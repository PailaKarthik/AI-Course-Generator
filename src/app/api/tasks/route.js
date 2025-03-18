import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "@/app/auth";

export async function POST(req) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { task, roadmap, chapter, isCorrect, userAnswer } =
            await req.json();

        if (!task || !roadmap || !chapter || typeof isCorrect  === "undefined" || !userAnswer) {
            return NextResponse.json(
                {
                    message:
                        "Missing or invalid required fields: task, roadmap, chapter, or isCorrect",
                },
                { status: 400 }
            );
        }

        const taskRef = doc(
            db,
            "users",
            session.user.email,
            "roadmaps",
            roadmap,
            "chapters",
            chapter,
            "tasks",
            "task"
        );

        const allTasksSnap = await getDoc(taskRef);
        let allTasks = allTasksSnap.exists()
            ? Object.values(allTasksSnap.data())
            : [];

        const taskIndex = allTasks.findIndex(
            (e) => e.question === task.question
        );

        if (taskIndex !== -1) {
            allTasks[taskIndex] = {
                ...task,
                isAnswered: true,
                isCorrect: isCorrect,
                userAnswer,
            };
        } else {
            return NextResponse.json(
                { message: "Task not found" },
                { status: 404 }
            );
        }

        await setDoc(taskRef, { ...allTasks });

        return NextResponse.json(
            { message: "Task updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
