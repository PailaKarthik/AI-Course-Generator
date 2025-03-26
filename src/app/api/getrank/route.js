import { db } from "@/lib/firebase";
import { doc, getDocs, collection } from "firebase/firestore";
import { auth } from "@/app/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth()
    const users = collection(db, "users");
    const userSnaps = await getDocs(users);
    let xps = userSnaps.docs.map((doc)=>({
        xp : doc.data().xp,
        email : doc.data().email
    }))
    xps = xps.sort((a, b)=> b.xp - a.xp)
    const rank = xps.indexOf(xps.find((e)=> e.email === session?.user.email)) + 1

    return NextResponse.json({rank})
}
