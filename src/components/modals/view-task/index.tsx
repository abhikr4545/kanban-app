"use client";

import { useState } from "react";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import TaskOption from "@/components/task-option";

interface ViewTaskModalProps {
  taskName: string, 
  taskDescription: string, 
  id: string 
}

export default function ViewTaskModal({ taskName, taskDescription, id }: ViewTaskModalProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [subTasks, setSubTasks] = useState<any>([]);
  const [originalSubTasks, setOriginalSubTasks] = useState<any>([]);

  const getTaskdata = async() => {
    const response = await fetch("/api/sub-tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        taskCardId: id
      })
    })

    const data = await response.json();
    setSubTasks(data.data);
    setOriginalSubTasks(JSON.parse(JSON.stringify(data.data)));
  }

  const handleOpen = (state: boolean) => {
    if (state !== open) {
      setOpen(state);
      if (state) {
        getTaskdata();  
      }
    }
  }

  const handleChange = async (subTaskId: string) => {
    const updatedSubTasks = [...subTasks];

    const index = updatedSubTasks.findIndex(subTask => subTask.id === subTaskId);
  
    if (index !== -1) {
      updatedSubTasks[index].is_completed = !updatedSubTasks[index].is_completed;
    }
    setSubTasks(updatedSubTasks);
  }
  
  const handleSubmit = async () => {
    const changes = subTasks.filter((updatedSubTask: any) => {
      const originalSubTask = originalSubTasks.find((original: any) => original.id === updatedSubTask.id);
      return originalSubTask && JSON.stringify(originalSubTask) !== JSON.stringify(updatedSubTask);
    });

    try {
      const response = await fetch("/api/sub-tasks", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          changes
        })
      })

      const data = await response.json();
      
      toast(data.message, {
        cancel: {
          label: "x"
        }
      })

    } catch(error) {
      toast("Something went wrong",{
        cancel: {
          label: "x"
        }
      })
    }
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
      <p className="text-smoky-black text-xl font-semibold ml-4 py-3 cursor-pointer overflow-hidden w-fit max-w-64 whitespace-nowrap overflow-ellipsis">
        {taskName}
      </p>
      </DialogTrigger>
      <DialogContent className="bg-gunmetal text-white max-h-[800px] overflow-y-hidden">
        <DialogHeader className="flex items-center justify-between">
          <DialogTitle>{taskName}</DialogTitle>
          <TaskOption />
        </DialogHeader>
        <div className="">
          <p className="text-gray-500 text-sm">{taskDescription}</p>
        </div>
        {
          subTasks.map((subTask: any) => (
            <div key={subTask.id} className="flex items-center space-x-2 bg-gray-800 min-h-[60px] rounded-md">
              <Checkbox 
                checked={subTask.is_completed} id="terms" className="ml-3 bg-white" 
                onClick={() => handleChange(subTask.id)}  
              />
              <label
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${subTask.is_completed ? "line-through text-gray-500" : ""}`}
              >
                {subTask.name}
              </label>  
            </div>
          ))
        }
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}