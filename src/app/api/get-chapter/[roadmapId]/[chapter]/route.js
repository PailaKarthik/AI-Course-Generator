import { db } from "@/lib/firebase";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { auth } from "@/app/auth";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { roadmapId, chapter } = await params;
        const docRef = doc(
            db,
            "users",
            session.user.email,
            "roadmaps",
            roadmapId,
            "chapters",
            chapter
        );

        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            return NextResponse.json({ message: "Chapter not found" }, { status: 404 });
        }

        return NextResponse.json({ chapter: docSnap.data() });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 }); 
    }
}

