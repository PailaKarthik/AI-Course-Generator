import { db } from "@/lib/firebase";
import { query, collection, getDocs , deleteDoc} from "firebase/firestore";
import { auth } from "@/app/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const q = query(
            collection(db, "users", session.user.email, "roadmaps")
        );

        const querySnapshot = await getDocs(q);

        const docs = querySnapshot.docs
            .map((doc) => ({
                id: doc.id,
                courseTitle: doc.data().courseTitle,
                courseDescription: doc.data().courseDescription,
                completed: doc.data().completed,
                createdAt: doc.data().createdAt,
                process: doc.data().process,
                difficulty: doc.data().difficulty,
            }))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        let difficultyArray =[0, 0 , 0]
        docs.forEach((e)=>{
            if(e.difficulty === "inDepth"){
                difficultyArray[2] += 1 
            }else if(e.difficulty === "fast"){
                difficultyArray[0] += 1 
            }else if( e.difficulty === "balanced"){
                difficultyArray[1] += 1 
            }
        })
        return NextResponse.json({ docs, difficultyArray });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
