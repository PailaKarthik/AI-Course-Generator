import FillUps from "./FillUps";
import Quiz from "./Quiz";
import Match from "./Match";

const TaskDecider = ({ task }) => {
    return (
        <div>
            {task.type === "fill-in-the-blank" ? (
                <FillUps task={task} />
            ) : task.type === "multiple-choice" ? (
                <Quiz task={task} />
            ) : task.type === "match-the-following" ? (
                <Match task={task} />
            ) : (
                ""
            )}

        </div>
    );
};

export default TaskDecider;
