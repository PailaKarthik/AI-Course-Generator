"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CalendarDays, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Sidebar = ({ data }) => {
    const [user, setUser] = useState(null);
    const { data: session } = useSession();

    useEffect(() => {
        setUser(session?.user);
    }, [session]);

    return (
        <div className="space-y-6 h-[calc(100vh-120px)] pt-3 sticky top-16">
            <Card className="gap-3">
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-4">
                        {user ? (
                            <img
                                src={user.image || "/default-avatar.png"}
                                width={64}
                                height={64}
                                alt="Avatar"
                                className="rounded-full border"
                            />
                        ) : (
                            <Skeleton className="w-16 h-16 rounded-full" />
                        )}
                        {user ? (
                            <div>
                                <CardTitle>{user.name}</CardTitle>
                                <CardDescription className="text-[14px] mt-1">
                                    {user.email}
                                </CardDescription>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-3.5 w-16" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Trophy className="h-4 w-4" />
                        <span>Rank: {data?.rank || "N/A"}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4" />
                        <span>Joined: {data?.joined || "N/A"}</span>
                    </div>
                </CardContent>
                <CardFooter className="pt-2">
                    <Button className="w-full" size="sm">
                        Edit Profile
                    </Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Roadmap Level</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                    <div className="space-y-4">
                        {["fast", "balanced", "inDepth"].map((level) => (
                            <div key={level}>
                                <div className="mb-1 flex items-center justify-between text-sm">
                                    <span className="capitalize">
                                        {level.replace(/([A-Z])/g, " $1")}
                                    </span>
                                    <span className="text-muted-foreground">
                                        {user?.roadmapLevel?.[level] ?? 0}
                                    </span>
                                </div>
                                <Progress
                                    value={
                                        (user?.roadmapLevel?.[level] ?? 0) * 10
                                    }
                                    className="h-2 bg-muted"
                                />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Sidebar;
