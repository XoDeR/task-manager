import type { Task } from "@/types";
import { Card, CardContent } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface Props {
  task: Task;
}

const TaskItem = ({ task }: Props) => {
  return (
    <Card className="h-full overflow-hidden py-1">
      <CardContent>
        <Accordion
            type="single"
            collapsible
            className="w-3/4 mr-4"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger><p className="text-lg text-foreground">{task.title}</p></AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p className="text-sm text-foreground">{task.description}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
      </CardContent>
    </Card>  
  )
}

export default TaskItem;