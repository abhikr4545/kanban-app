"use client";
import { useState } from "react";
import { 
  Dialog, DialogClose, DialogContent, DialogTrigger, DialogDescription, DialogFooter, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa6";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useBoardContext } from "@/context/BoardContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useColumnContext } from "@/context/ColumnContext";

const formSchema = z.object({
  taskContainerName: z.string().min(1, {
    message: "Column name cannot be empty"
  })
})

interface Column {
  id: string,
  name: string;
}

export default function CreateTaskColumnModal() {

  const [openModal, setOpenModal] = useState<boolean>(false);
  const { currentBoardId } = useBoardContext()
  const { setColumns } = useColumnContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskContainerName: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/columns/create-task-column", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          taskContainerName: values.taskContainerName,
          boardId: currentBoardId
        })
      })

      const data = await response.json();
      if(!response.ok) {
        toast(data.message,{
          cancel: {
            label: "x"
          }
        })
      } else {
        setColumns((prev: Column[]) => [...prev, { id: data.data[0].id, name: data.data[0].name }])
        toast( "Board Column Created",{
          cancel: {
            label: "x"
          }
        })
      }
    } catch (error) {
      toast("Something went wrong",{
        cancel: {
          label: "x"
        }
      })
    }

    form.reset()
    setOpenModal(false)
  }

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <div className="h-[750px] min-w-[380px] mt-10 shadow-lg rounded-lg relative cursor-pointer bg-smoke-white">
          <div className="p-4 absolute inset-0 flex items-center justify-center gap-3 text-smoky-black">
            <FaPlus />
            Add new column
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-gunmetal text-white">
        <DialogHeader>
          <DialogTitle>Name</DialogTitle>
          <DialogDescription>
            Give the name of the column you want to be displayed.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField 
              control={form.control}
              name="taskContainerName"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Column Name
                  </FormLabel>
                  <FormControl>
                    <Input 
                      id="column-name"
                      className="text-black outline-white focus:outline-white focus:ring-white"
                      {...field}
                    />
                  </FormControl>
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