import { db } from "@/lib/firebase";
import { getDoc } from "firebase/firestore";
import { auth } from "@/app/auth";
import { NextResponse } from "next/server";

//post route to check roadmap in the database
export async function POST(req) {
    const { roadmapId } = await req.json();
    const session = await auth();
    const docRef = doc(db, "users", session.user.email, "roadmaps", roadmapId);
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        return NextResponse.json({ ...docSnap.data() });
    }
    return NextResponse.json({process : "Not found"}, {status : 404})
}
