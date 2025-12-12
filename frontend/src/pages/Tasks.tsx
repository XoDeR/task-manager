import { Modal } from "@/components/Modal";
import TaskCreateForm from "@/components/TaskCreateForm";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/stores/authStore";
import { useState } from "react";

const Tasks = () => {
  const [creatingTask, setCreatingTask] = useState<boolean>(false);

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

  return (
    <div>
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex justify-between">
          <Button variant="outline" size="sm" onClick={() => handleCreate()}>
            Create Task
          </Button>
          <div>
            <Button className="ml-10" variant="outline" size="sm" onClick={() => handleLogout()}>
              Logout
            </Button>
          </div>
        </div>
      </div>
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