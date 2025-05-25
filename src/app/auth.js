import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";



export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                const userRef = doc(db, "users", user.email);
                const userSnap = await getDoc(userRef);
                
                if (!userSnap.exists()) {
                    await setDoc(userRef, {
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        provider: account.provider,
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
                console.error("Error saving user information:", error);
                return false;
            }
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            try {
                const userRef = doc(db, "users", session.user.email);
                const userSnap = await getDoc(userRef);
                
                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    session.user = {
                        ...session.user, 
                        ...userData,     
                    };
                }
                return session;
            } catch (error) {
                console.error("Error fetching user information:", error);
                return session;
            }
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            if (new URL(url).origin === baseUrl) return url;
            return `${baseUrl}/roadmap`;
        },
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
});