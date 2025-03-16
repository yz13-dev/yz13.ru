"use client";
import { ChatTask } from "@/types/chat";
import { EllipsisVerticalIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { Checkbox } from "mono/components/checkbox";
import { useEffect } from "react";
import { setTasks } from "../../chat-api/chat-api";
import { useChatApi } from "../../chat-api/chat-provider";

const Task = ({ task }: { task: ChatTask }) => {
  return (
    <div className="w-full h-11 flex items-center justify-between rounded-lg border gap-2 px-2">
      <div className="flex items-center gap-2">
        <Checkbox
          className="size-6 rounded-md [&>span>svg]:size-4"
          checked={task.checked ?? false}
        />
        <span>{task.title}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="size-8">
          <EllipsisVerticalIcon size={16} />
        </Button>
      </div>
    </div>
  );
};

const TaskList = ({ tasks: providedTasks }: { tasks: ChatTask[] }) => {
  const tasks = useChatApi((state) => state.tasks);
  useEffect(() => {
    if (providedTasks.length === 0) return;
    setTasks(providedTasks);
  }, [providedTasks]);
  return (
    <div className="w-full space-y-3 px-4">
      {tasks.map((task, index) => {
        return <Task key={task.id} task={task} />;
      })}
    </div>
  );
};

export default TaskList;
