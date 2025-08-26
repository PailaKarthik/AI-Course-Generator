import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="bg-primary w-screen text-primary-foreground py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Transform Your Learning?
            </h2>
            <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Take your learning to the next level and master new skills with
              InnoVision!
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href={"/login"}>
              <Button size="lg" variant="secondary" className="gap-1">
                Get Started <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:text-primary-foreground/75 hover:bg-primary-foreground/10"
            >
              <Link href={"/demo"}>See Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
