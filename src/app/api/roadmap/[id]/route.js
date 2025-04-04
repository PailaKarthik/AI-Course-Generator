import { db } from "@/lib/firebase";
import {
    doc,
    getDoc,
    deleteDoc,
    collection,
    getDocs,
} from "firebase/firestore";
import { auth } from "@/app/auth";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const session = await auth();
        const { id } = await params;
        const docRef = doc(db, "users", session.user.email, "roadmaps", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return NextResponse.json(
                { process: "Roadmap not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(docSnap.data());
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const session = await auth();

        const { id } = await params;
        const docRef = doc(db, "users", session.user.email, "roadmaps", id);
        const chaptersRef = collection(
            db,
            "users",
            session.user.email,
            "roadmaps",
            id,
            "chapters"
        );

        const chapterSnapshot = await getDocs(chaptersRef);
        const deletePromises = chapterSnapshot.docs.map(async (chapterdoc) => {
            const tasksRef = doc(
                db,
                "users",
                session.user.email,
                "roadmaps",
                id,
                "chapters",
                chapterdoc.id,
                "tasks",
                "task"
            );
            deleteDoc(tasksRef);
            deleteDoc(chapterdoc.ref);
        });
        await Promise.all(deletePromises);
        await deleteDoc(docRef);

        return NextResponse.json({ message: "Roadmap deleted successfully" });
    } catch (error) {
        
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
