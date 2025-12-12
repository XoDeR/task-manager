import type { Task } from "@/types";
import { Card, CardContent } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { useDeleteTask, useUpdateTask } from "@/hooks/useTasks";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { PencilIcon, XIcon } from "lucide-react";

interface Props {
  task: Task;
}

const TaskItem = ({ task }: Props) => {
  const updateMutation = useUpdateTask();
  const deleteMutation = useDeleteTask();

  const handleDelete = (articleId: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteMutation.mutate(articleId);
    }
  };

  const changeStatus = (status: number) => {
    updateMutation.mutate(
      { ...task, status: status },
    );
  }

  const getOtherStatuses = (status: number): number[] => {
    const allStatuses = [0, 1, 2];
    return allStatuses.filter((s) => s !== status);
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
    <Card className="h-full overflow-hidden py-1">
      <CardContent>
        <div className="flex">
          <Accordion
              type="single"
              collapsible
              className="w-3/4 mr-4"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger><p className="text-lg text-foreground">{task.title}</p></AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p className="text-sm text-foreground">{task.description}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="flex justify-end w-1/4">
              <Button className="mx-1 mt-3" variant="outline">{getStatusName(task.status)}</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="mt-3">
                  <Button variant="outline"><PencilIcon/></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-4 flex flex-col justify-center" align="center">
                  {getOtherStatuses(task.status).map((st) => (
                    <DropdownMenuItem key={st} asChild>
                      <Button onClick={() => { changeStatus(st) }} variant="outline">
                        {getStatusName(st)}
                      </Button>
                    </DropdownMenuItem>))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="destructive" className="mx-4 mt-3" onClick={ () => {handleDelete(task.id)}}><XIcon/></Button>
            </div>
          </div>
      </CardContent>
    </Card>  
  )
}

export default TaskItem;