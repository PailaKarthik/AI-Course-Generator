import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { getDocs, query, collection } from "firebase/firestore";
import { auth } from "./auth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import DeleteRoadmap from "@/components/Home/DeleteRoadmap";
import Link from "next/link";

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

async function deleteRoadmap() {
    const session = await auth();
}

export default async function page() {
    const roadmaps = await getRoadmaps();

    return (
        <div className="max-w-6xl flex flex-col mb-96 gap-4 items-center p-4 mx-auto">
            <h1 className="text-2xl font-semibold self-start">YOUR COURSES </h1>
            <div className="flex gap-6 justify-center flex-wrap">
                {roadmaps.map((roadmap) => (
                    <Card key={roadmap.id} className={"w-[320px] relative"}>
                        <CardHeader>
                            <CardTitle>
                                {roadmap.courseTitle.split(":")[0]}
                            </CardTitle>
                            <div className="absolute z-10 top-0 right-0">
                                <DeleteRoadmap id={roadmap.id}></DeleteRoadmap>
                            </div>
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
                    <div className="flex flex-col items-center text-accent-foreground/70">
                        <Plus strokeWidth={1} className="w-32 h-32"></Plus>
                        <p className="text-lg text-center">
                            Create your course
                        </p>
                    </div>
                    <Link href={`/generate`} scroll={false}>
                        <span className="absolute inset-0"></span>
                    </Link>
                </Card>
            </div>
        </div>
    );
}
