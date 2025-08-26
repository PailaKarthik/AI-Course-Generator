import { auth } from "@/app/auth"
import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export async function GET(req) {
    try {
        const session = await auth()
        if(!session || !session.user || !session.user.email){
            return NextResponse.json({message : "unauthorized"}, {status : 401})
        }
        const docRef =  doc(db, "users", session.user.email)
        const userSnap = await getDoc(docRef)
        
        if (!userSnap.exists()) {
            return NextResponse.json({message : "user not found"}, {status : 404})
        }
        
        return NextResponse.json(userSnap.data())
    } catch (error) {
        console.error("Error in getuser route:", error)
        return NextResponse.json({message : "internal server error"}, {status : 500})
    }
}