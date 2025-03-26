import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, increment, updateDoc } from "firebase/firestore";
import { auth } from "@/app/auth";

async function completeChapter(chapter, roadmapId, user) {
    const docRef = doc(db, "users", user.email, "roadmaps", roadmapId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const roadmap = docSnap.data();
        const updatedChapters = roadmap.chapters.map((ch) =>
            ch.chapterNumber == chapter ? { ...ch, completed: true } : ch
        );
        const completedChapters = updatedChapters.filter((ch) => ch.completed);
        if (completedChapters.length === updatedChapters.length) {
            await updateDoc(docRef, {
                completed: true,
            });
        }
        await updateDoc(docRef, {
            chapters: updatedChapters,
        });
    }
}

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

        if (
            !task ||
            !roadmap ||
            !chapter ||
            typeof isCorrect === "undefined" ||
            !userAnswer
        ) {
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
            if (allTasks[taskIndex].isAnswered) {
                return NextResponse.json({
                    message: "Task is already answered",
                });
            }
            allTasks[taskIndex] = {
                ...task,
                isAnswered: true,
                isCorrect: isCorrect,
                userAnswer,
            };

            const date = new Date();
            const month = date.getMonth();

            if (isCorrect) {
                let points = 10;
                if (task.type === "match-the-following") {
                    points = isCorrect.filter((e) => e).length * 5;
                }

                await updateDoc(doc(db, "users", session.user.email), {
                    xp: increment(points),
                    [`xptrack.${month}`]: increment(points),
                });
            }

            const completedTasks = allTasks.filter((task) => task.isAnswered);

            if (completedTasks.length === allTasks.length) {
                completeChapter(chapter, roadmap, session.user);
            }
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
