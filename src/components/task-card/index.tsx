"use client";

import { Draggable } from "@hello-pangea/dnd";
import ViewTaskModal from "../modals/view-task";

interface Task {
  task_name: string;
  task_description: string;
  id: string;
  position: number;
}

export default function TaskCard({ task_name, task_description, id, position }:Task) {
  return (
    <Draggable draggableId={id} index={position}>
    {(provided) => (
        <article className="bg-dove-gray rounded-lg h-36 overflow-y-auto mt-3" {...provided.dragHandleProps} {...provided.draggableProps}
          ref={provided.innerRef}
        >
        <ViewTaskModal taskName={task_name} taskDescription={task_description} id={id} />
      </article>
    )}
    </Draggable>
  )
}