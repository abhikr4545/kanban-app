"use client";

import { useBoardContext } from "@/context/BoardContext";
import { TbLayoutBoardSplit } from "react-icons/tb";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger
} from "../ui/tooltip"

interface BoardCardProps {
  active: boolean | undefined;
  boardName: string;
  id: string;
}

export default function BoardCard({ boardName, id }: BoardCardProps) {

  const { handleChangeActiveBoard, currentBoardId } = useBoardContext()

  return (
    <TooltipProvider>
      <article 
        onClick={() => handleChangeActiveBoard(id)} 
        className={`flex items-center gap-4 ${currentBoardId === id ? "bg-bleu-de-france": ""} p-4 w-52 rounded-r-full cursor-pointer text-smoky-black`}
      >
        <TbLayoutBoardSplit />
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="overflow-hidden w-[150px] text-ellipsis">
              {boardName}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{boardName}</p>
          </TooltipContent>
        </Tooltip>
      </article>
    </TooltipProvider>
  )
}