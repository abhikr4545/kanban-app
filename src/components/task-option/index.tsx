import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Button } from "../ui/button";
import TaskDelete from "../modals/task-delete";

export default function TaskOption({ taskId, columnId }: { taskId: string, columnId: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent h-fit w-fit p-0 hover:bg-transparent focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none text-smoky-black mr-3">
          <HiOutlineDotsHorizontal  />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <TaskDelete taskId={taskId} columnId={columnId} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}