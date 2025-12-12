import { Modal } from "@/components/Modal";
import TaskCreateForm from "@/components/TaskCreateForm";
import TaskList from "@/components/TaskList";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import useAuthStore from "@/stores/authStore";
import { FilterIcon, SortAscIcon, SortDescIcon } from "lucide-react";
import { useState } from "react";

const Tasks = () => {
  const [creatingTask, setCreatingTask] = useState<boolean>(false);
  const [tasksFilter, setTasksFilter] = useState<number|undefined>(undefined);
  const [tasksSortBy, setTasksSortBy] = useState<string>("desc");

  const handleCreate = () => {
    setCreatingTask(true);
  };

  const handleCreateFormSuccess = () => {
    setCreatingTask(false);
  };

  const clearToken = useAuthStore((state) => state.clearToken);

  const handleLogout = () => {
    clearToken();
  };

  const getAllStatuses = (): number[] => {
    const allStatuses = [0, 1, 2];
    return allStatuses;
  }

  const getStatusName = (status: number): string => {
    let result = "Unknown Status"
    switch (status) {
      case 0:
        result = "To Do"
        break;
      case 1:
        result = "In Progress"
        break;
      case 2:
        result = "Done"
        break;
      default:
        break;
    }
    return result;
  }

  return (
    <div>
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex justify-between">
          <Button variant="outline" size="sm" onClick={() => handleCreate()}>
            Create Task
          </Button>
          <div>
            <Button variant="outline" size="sm" onClick={() => { setTasksSortBy("asc"); }}><SortAscIcon/></Button>
            <Button variant="outline" size="sm" onClick={() => { setTasksSortBy("desc"); }}><SortDescIcon/></Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="mt-3">
                  <Button variant="outline"><FilterIcon/></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-4 flex flex-col justify-center" align="center">
                  {getAllStatuses().map((st) => (
                    <DropdownMenuItem key={st} asChild>
                      <Button onClick={() => { setTasksFilter(st) }} variant="outline">
                        {getStatusName(st)}
                      </Button>
                    </DropdownMenuItem>))}
                    <DropdownMenuItem asChild>
                      <Button onClick={() => { setTasksFilter(undefined) }} variant="outline">
                        Clear
                      </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            <Button className="ml-10" variant="outline" size="sm" onClick={() => handleLogout()}>
              Logout
            </Button>
          </div>
        </div>
      </div>
      <TaskList filter={tasksFilter} sortBy={tasksSortBy}/>
      <Modal
        open={creatingTask}
        onOpenChange={setCreatingTask}
        title="Create task"
        description="Fill in task details."
      >
        <TaskCreateForm onSuccess={handleCreateFormSuccess} />
      </Modal>
    </div>
  )
}

export default Tasks;