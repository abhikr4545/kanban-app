import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useColumnContext } from "@/context/ColumnContext";
import { Column } from "@/types";
import { useState } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import { toast } from "sonner";

export default function ColumnDelete({ columnId }: {columnId: string}) {

  const [open, setOpen] = useState<boolean>(false);
  const { deleteColumn, columns, setColumns } = useColumnContext()

  const handleClick = (event: React.FormEvent) => {
    event.stopPropagation();
    setOpen(true);
  }

  const handleColumnDelete = async () => {

    const filteredColumns = columns?.filter((column: Column) => column.id !== columnId);

    const updatedColumns = filteredColumns?.map((column: Column, index: number) => {
      return {
        ...column,
        position: index
      }
    })

    setColumns(updatedColumns);

    try {
      const response = await fetch("/api/columns/delete-column", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          columnId, updatedColumns
        })
      })

      if(response.ok) {
        toast("Column Deleted", {
          cancel: {
            label: "x"
          }
        })

      } else {
        toast("There was some any changes will be reverted on next refresh", {
          cancel: {
            label: "x"
          }
        })
      }
    } catch(error) {
      toast("There was some any changes will be reverted on next refresh", {
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
          <AlertDialogAction onClick={handleColumnDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}