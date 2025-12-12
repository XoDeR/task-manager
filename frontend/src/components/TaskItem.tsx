import type { Task } from "@/types";

interface Props {
  task: Task;
}

const TaskItem = ({ task }: Props) => {
  return (
    <div>{task.title}</div>
  )
}

export default TaskItem;