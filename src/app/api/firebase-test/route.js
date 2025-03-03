import { db } from "@/lib/firebase";
import { doc, collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";


// function to check if the firebase is working
export async function POST(req) {
    let data = await req.json();
    let docRef = await addDoc(collection(db, "tests"), data);
    console.log("success");

    return NextResponse.json({ message: "test success", id: docRef.id });
}
//successfully working