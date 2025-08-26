import Hero from "./Hero";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Image from "next/image";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import FAQ from "./FAQ";
export default function Landing() {
  return (
    <div className="flex h-screen overflow-y-scroll flex-col">
      <div className="flex flex-col items-center">
        <Hero></Hero>
        <Features></Features>
        <HowItWorks></HowItWorks>
        <FAQ></FAQ>
        <Testimonials></Testimonials>
        <CTA></CTA>
        <footer className="border-t py-6 px-10  md:py-0">
          <div className="container flex flex-col w-max items-center justify-center gap-4 md:h-24 md:flex-row">
            <div className="flex items-center justify-center gap-2 font-bold">
              <Image
                src={"/InnoVision_LOGO-removebg-preview.png"}
                className="scale-180 dark:invert-100"
                alt="logo"
                width={20}
                height={20}
              ></Image>
              <span>InnoVision</span>
            </div>
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2025 InnoVision. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
