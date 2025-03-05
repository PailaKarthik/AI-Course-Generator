import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { auth } from "@/app/auth";
import Roadmap from "@/components/Home/RoadMap";

async function getRoadmap(id) {
    const session = await auth();
    const docRef = doc(db, "users", session.user.email, "roadmaps", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists) {
        return false;
    }
    return docSnap.data();
}

const page = async ({ params }) => {
    const { id } = params;
    const roadmap = await getRoadmap(id);
    console.log(roadmap);

    if (!roadmap) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                {" "}
                <p className="text-lg font-semibold">Roadmap doesn't exist</p>
            </div>
        );
    }

    return (
        <div className="w-screen">
          
          <div className="mx-auto max-w-2xl p-4">
            <Roadmap roadMap={roadmap}></Roadmap>
          </div>
        </div>
    );
};

export default page;
