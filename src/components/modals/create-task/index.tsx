import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { IoAdd } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { nanoid } from "nanoid";
// import { useColumnContext } from "@/context/ColumnContext";
// import { useBoardContext } from "@/context/BoardContext";

const formSchema = z.object({
  taskTitle: z.string().min(1, {
    message: "Task title cannot be empty."
  }),
  taskDescription: z.string().min(10, {
    message: "Task description cannot be less than 10 words."
  }),
  column: z
  .string({
    required_error: "Please select an email to display.",
  })
  .min(1, { message: "Please select a column" }),
})

interface Subtasks {
  id: string;
  title: string;
}

interface Columns {
  id: string;
  name: string;
}

export default function CreateTaskModal() {

  const [open, setOpen] = useState<boolean>(false);
  const [subTasksList, setSubtasksList] = useState<Subtasks[]>([]);
  const [subTaskError, setSubTaskError] = useState<boolean>(false);
  // const { currentBoardId, setTasksList } = useBoardContext()
  // const { columns } = useColumnContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskTitle: "",
      taskDescription: "",
      column: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // if(!(subTasksList.every((task) => task.title !== ""))) {
    //   setSubTaskError(true);
    //   return;
    // }

    // const response = await fetch("/api/tasks/create-task", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     taskTitle: values.taskTitle,
    //     taskDescription: values.taskDescription,
    //     column: values.column,
    //     subTasksList: subTasksList,
    //     currentBoardId
    //   })
    // })

    // const data = await response.json();
    
    // if(!response.ok) {
    //   toast({
    //     title: "You request could not be completed"
    //   })
    // } else {
    //   setTasksList((prev: any[]) => [...prev, { ...data.data[0] }])
    //   toast({
    //     title: "Task created successfully"
    //   })
    // }

    // form.reset()
    // setSubTaskError(false);
    // setSubtasksList([])
    // setOpen(false)
  }

  const handleSubtaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubtasksList(prevState => prevState.map(subTask => 
      subTask.id === name ? { ...subTask, title: value } : subTask
    ))
  }

  const handleAddSubTask = (e: React.FormEvent) => {
    e.preventDefault()
    const newSubTask = { id: nanoid(), title: "" }
    setSubtasksList((prev) => [...prev, newSubTask])
  }

  const handleSubTaskDeletion = (id: string) => {
    const newList = subTasksList.filter((subTask) => subTask.id !== id);
    setSubtasksList([...newList])
  }

  return(
    <Dialog open={open} onOpenChange={() => {setOpen(prev => !prev); form.reset()}}>
      <DialogTrigger asChild className="">
        <Button className="bg-logo-color-1 rounded-3xl hover:bg-logo-color-1 hover:opacity-70 bg-bleu-de-france">
          <IoAdd />
          Add a task
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gunmetal text-white max-h-[800px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a task</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField 
              control={form.control}
              name="taskTitle"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input 
                      id="task-title"
                      className="text-white outline-gray-600 ring-gray-600 bg-gunmetal focus:outline-none focus:ring-0"
                      placeholder="e.g. Do your task"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name="taskDescription"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      id="task-description"
                      className="text-white resize-none outline-gray-600 ring-gray-600 bg-gunmetal focus:outline-none focus:ring-0 mb-4"
                      placeholder="e.g. Do your task"
                      {...field}            
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p>Subtasks</p>
            {subTasksList.map((subTask) => (
              <div key={subTask.id} className="flex justify-between gap-4">
                <div className="flex-1">
                  <Input 
                    id="task-description"
                    className="text-white resize-none outline-gray-600 ring-gray-600 bg-main-background focus:outline-none focus:ring-0 mb-4"
                    placeholder="e.g. Do your task"
                    onChange={handleSubtaskChange}
                    name={subTask.id}
                  />
                </div>
                <div>
                  <Button onClick={() => handleSubTaskDeletion(subTask.id)}><IoMdClose /></Button>
                </div>
              </div>
            ))}
            {(subTaskError && subTasksList.length > 0) ? <p className="text-red-600">Subtasks cannot be empty</p> : <></>}
            <Button onClick={handleAddSubTask} className="gap-2 bg-bleu-de-france text-light-purple w-full rounded-full">
              <IoAdd /> Add subtask
            </Button>
            <FormField
              control={form.control}
              name="column"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Column To Add</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-main-background">
                        <SelectValue placeholder="Columns" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-main-background text-white">
                      {
                        // columns?.map((column: Columns) => (
                        //   <SelectItem key={column.id} value={column.id}>{column.name}</SelectItem>
                        // ))
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="sm:justify-start">
              <Button type="submit">Submit</Button>
              <DialogClose asChild>
                <Button type="button" className="bg-light-purple">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}