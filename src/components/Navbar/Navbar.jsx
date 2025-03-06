"use client"
import { use, useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { Button } from "../ui/button";
import Link from "next/link";
import { User } from "lucide-react";
import { CgDetailsMore } from 'react-icons/cg';
import { authenti, signOuting } from './new';

const Navbar = () => {
  const [session, setSession] = useState(null);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      let session =  authenti();
      setSession(session);
    };
    fetchSession();
  }, []);
  

  const signOutUser = async () => {
    signOuting();
    setSession(null);
  };

  return (
    <div className="p-2 w-full border-b fixed top-0 left-0 bg-background z-50">
      <div className="flex w-full justify-between items-center">
        {sidebar && (
          <div className="w-64 h-screen bg-black text-white fixed top-0 left-0 flex flex-col gap-4 p-4">
            <button className='items-center' onClick={() => setSidebar(false)}><IoClose /></button>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/profile">Profile</Link>
            <button onClick={signOutUser}>Logout</button>
          </div>
        )}
        <button onClick={() => setSidebar(true)}><CgDetailsMore /></button>
        <div className="flex items-center gap-1">
          <img src="/YUKTHI_LOGO-removebg-preview.png" alt="png" width={"35px"} />
          <Link href="/">
            <h2 className="text-md font-semibold">Yukthi</h2>
          </Link>
        </div>
        <div>
          {session ? (
            <User className="w-5" />
          ) : (
            <Link href="/login">
              <Button size="sm">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
