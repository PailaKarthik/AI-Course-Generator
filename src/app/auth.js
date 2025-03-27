import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [GitHub],
    session: {
        strategy: "jwt",
      },
    callbacks: {
        async signIn({ user }) {
            try {
                const userRef = doc(db, "users", user.email);
                const userSnap = await getDoc(userRef);
                if (!userSnap.exists()) {
                    await setDoc(userRef, {
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        xp: 0,
                        roadmapLevel: {
                            fast: 0,
                            inDepth: 0,
                            balanced: 0,
                        },
                        xptrack: Object.fromEntries(
                            Array(12)
                                .fill(0)
                                .map((value, index) => [index, value])
                        ),
                        createdAt: Date.now(),
                    });
                }
                return true;
            } catch (error) {
                console.error("Error saving user information", error);
                return false;
            }
        },
        async session({ session }) {
            try {
                const userRef = doc(db, "users", session.user.email);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    session.user = userSnap.data();
                }
                return session;
            } catch (error) {
                console.error("Error saving user information", error);
                return session;
            }
        },
    },
});
