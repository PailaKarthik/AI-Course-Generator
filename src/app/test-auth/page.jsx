import { signIn, signOut, auth } from "@/app/auth"

export default async function TestAuth() {
    const session = await auth()
    
    if (session) {
        return (
            <div style={{ padding: '20px' }}>
                <h1>✅ Authentication Working!</h1>
                <p>Signed in as: {session.user?.email}</p>
                <p>Name: {session.user?.name}</p>
                <img src={session.user?.image} alt="Profile" style={{ width: '50px', borderRadius: '50%' }} />
                <br />
                <form
                    action={async () => {
                        "use server"
                        await signOut()
                    }}
                >
                    <button type="submit">Sign out</button>
                </form>
            </div>
        )
    }
    
    return (
        <div style={{ padding: '20px' }}>
            <h1>🔐 Test Authentication</h1>
            <p>Not signed in</p>
            <form
                action={async () => {
                    "use server"
                    await signIn("google")
                }}
            >
                <button type="submit">Sign in with Google</button>
            </form>
            <br />
            <form
                action={async () => {
                    "use server"
                    await signIn("github")
                }}
            >
                <button type="submit">Sign in with GitHub</button>
            </form>
        </div>
    )
}
