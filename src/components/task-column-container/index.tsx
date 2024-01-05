"use client";

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useBoardContext } from "@/context/BoardContext";
import CreateTaskColumnModal from "../modals/create-column";
import { useColumnContext } from "@/context/ColumnContext";
import { Column } from "@/types";
import TaskColumn from "../task-column";
import { toast } from "sonner";

export default function TaskColumnContainer () {

  const { currentBoardId } = useBoardContext();
  const { columns, setColumns } = useColumnContext();
  

  if(!currentBoardId) {
    return (
      <section className=" text-smoky-black text-2xl w-[calc(100%-270px)] flex justify-center items-center">
        Please choose a board.
      </section>
    )
  }

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newColumns = Array.from(columns!);
    const [removedColumn] = newColumns.splice(source.index, 1);
    newColumns.splice(destination.index, 0, removedColumn);

    const updatedColumns = newColumns.map((column, index) => ({
      ...column,
      position: index
    }));
  
    setColumns(updatedColumns);

    try {
      const response = await fetch(`/api/columns/update-task-column`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          currentBoardId,
          columns: updatedColumns.map((column, index) => ({
            id: column.id,
            position: index
          }))
        })
      });

      if(!response.ok) {
        toast("Something went wrong. Any changes will not be reflected no next refresh.", {
          cancel: {
            label: "x"
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="root" type="columns" direction="horizontal">
        {(provided) => (
          <section
            className="w-[calc(100%-270px)] flex gap-16 items-center overflow-x-auto px-4"
            {...provided.droppableProps} ref={provided.innerRef}
            >
              {
                columns?.map((column: Column) => {
                  return <TaskColumn key={column.id} id={column.id} position={column.position} name={column.name} />
                })
              }
              {provided.placeholder}
            <CreateTaskColumnModal />
          </section>
        )}
      </Droppable>
    </DragDropContext>
  )
}