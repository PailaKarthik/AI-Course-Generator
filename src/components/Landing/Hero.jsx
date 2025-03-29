import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const Hero = () => {
    return (
        <section className="py-10 w-screen md:py-12 relative flex justify-center items-center">
            <div className="absolute inset-0 bg-gradient-radial  rounded-full w-[80%] h-[80%] mx-auto blur-3xl -z-10"></div>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-center items-center">
                    <div className="relative flex flex-col justify-center items-center max-w-2xl space-y-4 text-center p-8 rounded-xl border-2 border-transparent">
                        <div className="pr-6">
                            <Image
                                src={"/YUKTHI_LOGO-removebg-preview.png"}
                                className="scale-180 dark:invert-100"
                                alt="logo"
                                width={80}
                                height={80}
                            ></Image>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                            Learn Any Concept with AI-Generated Courses
                        </h1>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl">
                            Our AI-powered platform creates personalized,
                            chapter-wise courses on any topic you want to learn.
                            Master new skills at your own pace with interactive
                            content.
                        </p>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Link href={"/login"}>
                                <Button size="lg" className="gap-1">
                                    Get Started{" "}
                                    <ArrowUpRight className="h-4 w-4" />
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg">
                                See Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
