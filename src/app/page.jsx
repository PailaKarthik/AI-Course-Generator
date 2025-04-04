"use client";
import Landing from "@/components/Landing/Landing";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.user) {
            router.replace("/roadmap");
        }
    }, [session, router]);

    if (status === "loading") {
        return (
            <div className="w-screen h-[calc(100vh-64px)] bg-background flex items-center justify-center">
                <Loader2 className="animate-spin ease-in-out"></Loader2>
            </div>
        );
    }

    if (status === "authenticated") {
        return null;
    }

    return (
        <div className="relative">
            <Landing />
        </div>
    );
};

export default Page;
