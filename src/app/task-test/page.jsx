import TaskDecider from "@/components/Tasks/TaskDecider"
import { chapter } from "@/lib/sampleChapter"
const Page = () => {
  
  return (
    <div className="w-full mt-10 ">
      <TaskDecider task={chapter.task}></TaskDecider>
    </div>
  )
}

export default Page