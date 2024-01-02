import { useState } from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoProject } from "react-icons/go";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { useBoardContext } from "@/context/BoardContext";
import { Board } from "@/types";

const formSchema = z.object({
  boardname: z.string().min(1, {
    message: "Boardname cannot be empty"
  })
})

export default function CreateBoardModal() {
  const [open, setOpen] = useState(false);
  const { setBoardList } = useBoardContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      boardname: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("/api/board/create-board", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          boardname: values.boardname
        })
      })

      const data = await response.json();

      if(!response.ok) {
        toast(data?.message)
      } else {
        const newBoard: Board = {
          id: data.data[0].id,
          boardName: data.data[0].board_name,
          active: false,
        };
        setBoardList((prev => [...prev, newBoard]))
        toast("Board Created", {
          cancel: { label: "x" }
        })
      }
    } catch (error) {
      toast("Something went wrong",{
        description: "Your request cannot be completed currently"
      })
    }

    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="mt-2">
        <Button className="gap-2">
          <GoProject />
          Create New Board
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gunmetal text-white">
        <DialogHeader>
          <DialogTitle>Name</DialogTitle>
          <DialogDescription>
            Give the name of the board you want to be displayed.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField 
              control={form.control}
              name="boardname"
              render={({field}) => (
                <FormItem>
                  <FormLabel>
                    Board Name
                  </FormLabel>
                  <FormControl>
                    <Input 
                      id="board-name"
                      className="text-black outline-white ring-white"
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