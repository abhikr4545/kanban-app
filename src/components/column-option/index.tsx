import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { Button } from "../ui/button";
import ColumnDelete from "../modals/column-delete";

export default function ColumnOption({ columnId }: {columnId: string}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent h-fit w-fit p-0 hover:bg-transparent focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none text-smoky-black">
          <HiOutlineDotsHorizontal  />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ColumnDelete columnId={columnId} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}