import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "@/app/auth";
import { NextResponse } from "next/server";

//post route to save roadmap in the database
export async function POST(req) {
    const { roadmap, difficulty } = await req.json();
    const session = await auth();
    const docRef = await addDoc(
        collection(db, "users", session.user.email, "roadmaps"), {...roadmap.text, createdAt : Date.now(), difficulty}
    );
    return NextResponse.json({text : docRef.id})
}

