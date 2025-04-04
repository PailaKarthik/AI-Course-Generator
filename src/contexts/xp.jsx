"use client";

import { createContext, useState, useEffect } from "react";

const xpContext = createContext();

export const XpProvider = ({ children }) => {
    const [xp, setXp] = useState(0);
    const [show, setShow] = useState(false);
    const [changed, setChanged] = useState(0)

    async function change() {
        setShow(true)
        setTimeout(() => {
            setShow(false)
            setChanged(0)
        }, 800);
    }

    async function getXp() {
        const res = await fetch("/api/getuser");
        const data = await res.json();
        
        setChanged(data.xp - xp)
        setXp(data.xp);
        change()
    }

    useEffect(() => {
        getXp();
    }, []);

    return (
        <xpContext.Provider value={{ getXp, xp , show, changed}}>
            {children}
        </xpContext.Provider>
    );
};

export default xpContext;
