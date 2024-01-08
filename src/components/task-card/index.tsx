"use client";

import { Draggable } from "@hello-pangea/dnd";
import ViewTaskModal from "../modals/view-task";
import TaskOption from "../task-option";

interface Task {
  task_name: string;
  task_description: string;
  id: string;
  position: number;
  task_column_id: string;
}

export default function TaskCard({ task_name, task_description, id, position, task_column_id }:Task) {
  return (
    <Draggable draggableId={id} index={position}>
    {(provided) => (
        <article className="bg-dove-gray rounded-lg h-36  mt-3" {...provided.dragHandleProps} {...provided.draggableProps}
          ref={provided.innerRef}
        >
        <div className="flex items-center justify-between">
          <ViewTaskModal taskName={task_name} taskDescription={task_description} id={id} />
          <TaskOption taskId={id} columnId={task_column_id} />
        </div>
      </article>
    )}
    </Draggable>
  )
}