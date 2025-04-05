"use client";
import Landing from "@/components/Landing/Landing";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "./loading";
const thoughts = [
    "The brain uses 20% of your body's energy.",
    "Success comes from consistency, not luck.",
    "Octopuses have three hearts and blue blood.",
    "Start moving, and motivation will follow.",
    "Fold paper 42 times and it could reach the moon.",
    "Learning daily adds up over time.",
    "Bamboo can grow 3 feet in a day.",
    "You don't have to be great to start.",
    "Bees can recognize human faces.",
    "Discipline outworks raw talent.",
];

const Page = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    let [text, setText] = useState(thoughts[Math.floor(Math.random() * 10)]);

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/roadmap");
        }
    }, [session, status]);

    if (status === "loading") {
        return (
            <div className="relative">
                <Loading />
                <p className="absolute z-[5] top-1/2 left-1/2 translate-y-1/2 -translate-x-1/2">
                    {thoughts[Math.floor(Math.random() * 10)]}
                </p>
            </div>
        );
    }

    if (status === "authenticated" || true) {
        setTimeout(() => {
            setText("Please wait while we load your data.");
        }, 4000);
        setTimeout(() => {
            setText("Almost there...")
        }, 8000);
        return (
            <div className="relative">
                <Loading />
                <p className="absolute z-[5] top-1/2 left-1/2 translate-y-1/2 -translate-x-1/2">
                    {text}
                </p>
            </div>
        );
    }

    return (
        <div className="relative">
            <Landing />
        </div>
    );
};

export default Page;
