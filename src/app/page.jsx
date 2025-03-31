"use client";
import Landing from "@/components/Landing/Landing";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
   const { data: session } = useSession();
   const router = useRouter();

   useEffect(() => {
      if (session?.user) {
         router.push("/roadmap");
      }
   }, [session, router]); 

   return (
      <div className="relative">
         <Landing />
      </div>
   );
};

export default Page;
