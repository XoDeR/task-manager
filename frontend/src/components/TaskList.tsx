import { useTasks } from "@/hooks/useTasks";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { data: tasks, isLoading, isError } = useTasks();

  if (isLoading) return <div>Loading tasks...</div>;

  if (isError) return <div>Error fetching tasks.</div>;

  return (
    <div className="mx-auto max-w-6xl p-4">
        {tasks?.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
    </div>
  );
}

export default TaskList;