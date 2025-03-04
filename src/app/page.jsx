// import MarkDown from "@/components/MarkDown";
// const content="home Page"

// export default function Home() {
//     return (
//         <div className="max-w-2xl p-4 mx-auto">
//             <MarkDown content={content}></MarkDown>
//         </div>
//     );
// }


import { signIn,auth } from "./auth"
 
export default async function SignIn() {
    let session = await auth()
    console.log(session);
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <button type="submit">Signin with GitHub</button>
    </form>
  )
} 