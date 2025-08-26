import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Brain,
  CheckCircle,
  Compass,
  Layers,
  Sparkles,
} from "lucide-react";

const Features = () => {
  return (
    <section
      id="features"
      className="bg-zinc-50 w-screen min-h-[calc(100vh-64px)] dark:bg-zinc-900/60 py-16 md:py-24"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Why Choose InnoVision?
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform combines cutting-edge AI with proven learning
              methodologies to create the most effective learning experience.
            </p>
          </div>
        </div>
        <div className="mx-auto flex gap-6 flex-wrap max-w-5xl items-center justify-center md:mt-12 mt-6">
          <Card className={"max-md:sticky top-18 w-[320px]"}>
            <CardHeader>
              <Sparkles className="h-10 w-10 text-primary mb-2" />
              <CardTitle>AI-Powered Generation</CardTitle>
              <CardDescription>
                Our advanced AI creates comprehensive courses on any topic in
                seconds.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className={"max-md:sticky top-22 w-[320px]"}>
            <CardHeader>
              <Layers className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Chapter-wise Learning</CardTitle>
              <CardDescription>
                Structured content organized into logical chapters for better
                understanding.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className={"max-md:sticky top-26 w-[320px]"}>
            <CardHeader>
              <Compass className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Personalized Path</CardTitle>
              <CardDescription>
                Courses adapt to your learning style, pace, and existing
                knowledge.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className={"max-md:sticky top-30 w-[320px]"}>
            <CardHeader>
              <BookOpen className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Interactive Exercises</CardTitle>
              <CardDescription>
                Reinforce learning with quizzes, challenges, and practical
                exercises.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className={"max-md:sticky top-34 w-[320px]"}>
            <CardHeader>
              <CheckCircle className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Monitor your learning journey with detailed analytics and
                insights.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className={"max-md:sticky top-38 w-[320px]"}>
            <CardHeader>
              <Brain className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Any Topic, Any Level</CardTitle>
              <CardDescription>
                From beginner to advanced, learn anything you're interested in.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
