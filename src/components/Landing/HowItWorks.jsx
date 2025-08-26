import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-16 md:py-24 min-h-[calc(100vh-64px)]"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              How InnoVision Works
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Creating your personalized learning experience is simple and fast.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 mt-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                1
              </div>
              <h3 className="mt-4 text-xl font-bold">Enter Your Topic</h3>
              <p className="mt-2 text-muted-foreground">
                Simply type in what you want to learn about, from programming to
                philosophy.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                2
              </div>
              <h3 className="mt-4 text-xl font-bold">AI Generates Roadmap</h3>
              <p className="mt-2 text-muted-foreground">
                The AI analyzes the topic and creates a structured, chapter-wise
                roadmap tailored to you.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                3
              </div>
              <h3 className="mt-4 text-xl font-bold">
                AI Generates Chapter Content
              </h3>
              <p className="mt-2 text-muted-foreground">
                The AI analyzes the roadmap and creates the content of the
                chapter.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                4
              </div>
              <h3 className="mt-4 text-xl font-bold">Start Learning</h3>
              <p className="mt-2 text-muted-foreground">
                Begin your learning journey through interactive chapters,
                exercises, and assessments.
              </p>
            </div>
          </div>
          <div className="mt-8 rounded-xl border bg-card p-6 shadow-sm">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Try it now</h3>
                <p className="text-muted-foreground">
                  Enter a topic you'd like to learn about and see how InnoVision
                  works.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="e.g., Machine Learning, Web Development, Digital Marketing..."
                  />
                </div>

                <AlertDialog>
                  <AlertDialogTrigger className="flex bg-foreground text-background items-center border px-2 py-2 rounded-md cursor-pointer hover:bg-accent-foreground transition">
                    Generate Course <ChevronRight className="ml-1 h-4 w-4" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Login to continue</AlertDialogTitle>
                      <AlertDialogDescription>
                        You must be logged in to generate the course, login to
                        continue.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>
                        <Link href={"/login"}>Login </Link>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
