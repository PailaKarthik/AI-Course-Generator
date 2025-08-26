import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-10 w-screen md:py-12 overflow-y-hidden overflow-x-hidden relative flex justify-center items-center">
      <div className="container mx-auto px-4 md:px-6 ">
        <div className="flex justify-center relative items-center">
          <div className="absolute">
            <div className=" w-lg h-[512px] translate-x-10 border rounded-full absolute bg-[radial-gradient(100%_100%_at_bottom_right,white,white,rgb(9,113,232,.8))]  blur-3xl dark:opacity-20 opacity-20"></div>
            <div className=" w-lg h-[512px] -translate-x-130 -translate-y-150 border rounded-full absolute bg-[radial-gradient(100%_100%_at_top_left,white,white,rgb(9,113,232,.8))]  blur-3xl dark:opacity-20 opacity-20"></div>
          </div>
          <div className="relative flex flex-col justify-center items-center max-w-2xl space-y-4 text-center p-8 rounded-xl border-2 border-transparent">
            <div className="pr-6">
              <Image
                src={"/InnoVision_LOGO-removebg-preview.png"}
                className="scale-180 dark:invert-100"
                alt="logo"
                width={80}
                height={80}
              ></Image>
            </div>
            <h1
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl dark:bg-[radial-gradient(70%_70%_at_top_center,white,white,rgb(9,113,232,.5))] bg-[radial-gradient(60%_60%_at_top_center,black,black,rgb(9,113,232,.8))] bg-white text-transparent bg-clip-text"
              style={{ backgroundImage: "" }}
            >
              Learn Any Concept with AI-Generated Courses
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Our AI-powered platform creates personalized, chapter-wise courses
              on any topic you want to learn. Master new skills at your own pace
              with interactive content.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href={"/login"}>
                <Button size="lg" className="gap-1">
                  Get Started <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                <Link href={"/demo"}>See Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
