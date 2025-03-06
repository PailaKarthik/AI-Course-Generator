import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { getDocs, query, collection, select } from "firebase/firestore";
import { auth } from "./auth";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

async function getRoadmaps() {
    const session = await auth();
    if (!session?.user?.email) return [];

    const q = query(collection(db, "users", session.user.email, "roadmaps"));

    const querySnapshot = await getDocs(q);

    const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        courseTitle: doc.data().courseTitle,
        courseDescription: doc.data().courseDescription,
    }));

    return docs;
}

export default async function page() {
    const roadmaps = await getRoadmaps();

    return (
        <div className="max-w-6xl flex flex-col gap-4 items-center p-4 mx-auto">
            <h1 className="text-2xl font-semibold self-start">YOUR COURSES </h1>
            <div className="flex gap-6 justify-center flex-wrap">
                {roadmaps.map((roadmap) => (
                    <Card key={roadmap.id} className={"w-[320px] relative"}>
                        <CardHeader>
                            <CardTitle>{roadmap.courseTitle}</CardTitle>
                        </CardHeader>
                        <CardContent>{roadmap.courseDescription}</CardContent>

                        <Link href={`/roadmap/${roadmap.id}`}>
                            <span className="absolute inset-0"></span>
                        </Link>
                    </Card>
                ))}
                <Card
                    className={
                        "w-[320px] relative flex items-center justify-center"
                    }
                >
                    <div className="flex flex-col items-center">
                        <Plus strokeWidth={1} className="w-36 h-36"></Plus>
                        <p className="text-2xl text-center">
                            Create your course
                        </p>
                    </div>
                    <Link href={`/generate`}>
                        <span className="absolute inset-0"></span>
                    </Link>
                </Card>
            </div>
            Generate your own course now!!
            <Button>
                <Link href={"/generate"}>Generate</Link>
            </Button>
        </div>
    );
}
