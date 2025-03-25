import { auth } from "@/app/auth"
import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export async function GET(req) {
    const session = await auth()
    if(!session){
        return NextResponse.json({message : "unauthorized"}, {status : 401})
    }
    const docRef =  doc(db, "users", session?.user.email)
    const userSnap = await getDoc(docRef)
    return NextResponse.json(userSnap.data())
}