import FillUps from "./FillUps";
import Quiz from "./Quiz";
import Code from "./Code";

const TaskDecider = ({ task }) => {
    return (
        <div className="mx-auto w-max">
            {task.type === "fill-in-the-blank" ? (
                <Quiz task={task} />
            ) : task.type === "multiple-choice" ? (
                <Quiz task={task} />
            ) : task.type === "code " ? (
                <Code task={task} />
            ) : (
                ""
            )}
        </div>
    );
};

export default TaskDecider;
