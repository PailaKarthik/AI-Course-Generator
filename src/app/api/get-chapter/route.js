import { db } from "@/lib/firebase";
import { setDoc, doc } from "firebase/firestore";
import { auth } from "@/app/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { roadmapId, chapter, content } = await req.json();
        const { tasks, ...chapterNew } = content;
        const docRef = doc(
            db,
            "users",
            session.user.email,
            "roadmaps",
            roadmapId,
            "chapters",
            chapter
        );

        await setDoc(docRef, { content: chapterNew });
        const taskDocRef = doc(
            db,
            "users",
            session.user.email,
            "roadmaps",
            roadmapId,
            "chapters",
            chapter,
            "tasks",
            "task"
        );
        await setDoc(taskDocRef, { ...tasks });

        return NextResponse.json({ message: "Chapter added successfully" });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
