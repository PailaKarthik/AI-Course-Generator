import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Testimonials = () => {
  return (
    <section className=" py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              What Our Users Say
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of satisfied learners who have transformed their
              knowledge with InnoVision.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    SV
                  </div>
                </div>
                <div>
                  <CardTitle className="text-lg">Shree Vishnu</CardTitle>
                  <CardDescription>Student</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                "InnoVision helped me learn React in half the time it would have
                taken with traditional courses. The chapter-wise approach made
                complex concepts easy to understand."
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    KA
                  </div>
                </div>
                <div>
                  <CardTitle className="text-lg">Karthik AN</CardTitle>
                  <CardDescription>Student</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                "I needed to quickly learn about SEO strategies for my new role.
                InnoVision created a perfect course that covered everything I
                needed to know."
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    AV
                  </div>
                </div>
                <div>
                  <CardTitle className="text-lg">Amrutha Varshini</CardTitle>
                  <CardDescription>Student</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                "As a student, I use InnoVision to supplement my university
                courses. It breaks down difficult subjects into manageable
                chapters that are easy to follow."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
