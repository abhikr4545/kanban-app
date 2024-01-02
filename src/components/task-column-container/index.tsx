"use client";

import { useEffect, useState } from "react";
import { useBoardContext } from "@/context/BoardContext";
import CreateTaskColumnModal from "../modals/create-column";
import { useColumnContext } from "@/context/ColumnContext";
import { Column } from "@/types";
import TaskColumn from "../task-column";

export default function TaskColumnContainer () {

  const { currentBoardId } = useBoardContext();
  const { columns } = useColumnContext();

  if(!currentBoardId) {
    return (
      <section className=" text-smoky-black text-2xl w-[calc(100%-270px)] flex justify-center items-center">
        Please choose a board.
      </section>
    )
  }

  return (
    <section
      className="w-[calc(100%-270px)] flex gap-16 items-center overflow-x-auto px-4"
    >
      {
        columns?.map((column: Column) => (
          <TaskColumn key={column.id} id={column.id} name={column.name} />
        ))
      }
      <CreateTaskColumnModal />
    </section>
  )
}