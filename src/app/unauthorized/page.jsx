import { Button } from "@/components/ui/button";
import { MoveUpRight, Lock } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center p-4 text-center">
            <div className="w-full max-w-md rounded-xl bg-primary-foreground p-8 shadow-xl">
                <div className="mb-6 flex justify-center">
                    <div className="relative">
                        <div className="absolute -left-4 -top-4 h-16 w-16 rounded-full bg-red-100 dark:bg-red-600" />
                        <div className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full bg-red-400 dark:bg-red-400 text-white">
                            <Lock className="h-16 w-16" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full bg-yellow-200 dark:bg-yellow-700" />
                    </div>
                </div>

                <h1 className="mb-2 text-3xl font-bold ">
                    Not Authorized
                </h1>

                <p className="mb-8 ">
                    Unauthorized access! You must be logged in to view this
                    page. Please sign in to continue. If you believe this is a
                    mistake, contact support or try again later.
                </p>

                <Button
                    asChild
                    className="gap-2"
                    variant={"outline"}
                >
                    <Link href="/login" >
                        <span>Log in</span>
                        <MoveUpRight></MoveUpRight>
                    </Link>
                </Button>
            </div>
        </div>
    );
}
