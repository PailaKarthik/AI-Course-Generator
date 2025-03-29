'use server';
import { auth,signOut } from "@/app/auth";
export const authenti = async () => {
  let session = await auth();
  return session;
  };
  
  export const signOuting = async () => {
    await signOut();
    return null
  };
  