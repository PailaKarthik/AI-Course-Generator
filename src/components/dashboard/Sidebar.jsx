"use client"
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
import LeaderBoard from "@/components/LeaderBoard";

const Sidebar = ({ user, rank, difficultyLevel, leaderboard }) => {
    return (
        <div className="space-y-6 min-w-72 md:min-h-[calc(100vh-120px)] pt-3 md:sticky top-16">
            <Card className="gap-3">
                <CardHeader className="pb-2">
                    <div className="flex items-center flex-wrap gap-4">
                        {user.image ? (
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
                        {user.name ? (
                            <div className="w-36">
                                <CardTitle>{user.name}</CardTitle>
                                <CardDescription className="text-[14px] w-full mt-1">
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
                        <span className="flex items-end gap-2">
                            Rank:{" "}
                            {rank ? (
                                rank
                            ) : (
                                <Skeleton className={"w-6 h-3.5"}></Skeleton>
                            )}
                        </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4" />
                        <span className="flex items-end gap-2">
                            Joined:{" "}
                            {user?.createdAt ? (
                                new Date(user.createdAt).toLocaleDateString(
                                    "en-US",
                                    { month: "long", year: "numeric" }
                                )
                            ) : (
                                <Skeleton className={"w-12 h-3.5"}></Skeleton>
                            )}
                        </span>
                    </div>
                </CardContent>
                <CardFooter className="pt-2">
                    <Button className="w-full" size="sm">
                        Edit Profile
                    </Button>
                </CardFooter>
            </Card>

            <LeaderBoard leaderboard={leaderboard}></LeaderBoard>
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Roadmap Level</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                    <div className="space-y-4">
                        {["fast", "balanced", "inDepth"].map((level, index) => (
                            <div key={level}>
                                <div className="mb-1 flex items-center justify-between text-sm">
                                    <span className="capitalize">
                                        {level.replace(/([A-Z])/g, " $1")}
                                    </span>
                                    <span className="text-muted-foreground">
                                        {difficultyLevel[index] ?? 0}
                                    </span>
                                </div>
                                <Progress
                                    value={(difficultyLevel[index] ?? 0) * 10}
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
