import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useColumnContext } from "@/context/ColumnContext";
import { Column } from "@/types";
import { useState } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import { toast } from "sonner";

export default function TaskDelete({ taskId, columnId }: { taskId: string, columnId: string }) {

  const [open, setOpen] = useState<boolean>(false);
  const { columns, setColumns } = useColumnContext()

  const handleClick = (event: React.FormEvent) => {
    event.stopPropagation();
    setOpen(true);
  }

  const handleTaskDelete = async () => {
    const taskColumn = columns?.filter((column: any) => column.id === columnId)[0];

    const filteredTasks = taskColumn?.tasks.filter((task: any) => task.id !== taskId);

    const updatedTasks = filteredTasks?.map((task: any, index: number) => { 
      return { ...task, position: index }
    })

    setColumns((prev: any[]) => {
      return prev.map(column => {
        if(column.id === columnId) {
          return {
            ...column,
            tasks: updatedTasks
          }
        } else {
          return column
        }
      })
    })

    try {
      const response = await fetch("/api/tasks/delete-task", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          taskId, updatedTasks
        })
      })

      if(!response.ok) {
        toast("Something went wrong", {
          cancel: {
            label: "x"
          }
        })
      } else {
        toast("Task deleted", {
          cancel: {
            label: "x"
          }
        })
      }

    } catch (error) {
      toast("Something went wrong", {
        cancel: {
          label: "x"
        }
      })
    }
  }
  

  return (
    <AlertDialog>
      <AlertDialogTrigger onClick={handleClick} className="w-full">
        <div className="flex justify-between w-full items-center text-smoky-black">
          Delete
          <RiDeleteBin7Line size={`16px`} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          Are you sure you want to delete ?
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleTaskDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}