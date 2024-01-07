import { Column, Task } from "@/types";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import TaskCard from "../task-card";
import { useEffect } from "react";

export default function TaskColumn({ id: columnId, name: columnName, position, tasks }: any) {

  return (
    <Draggable draggableId={columnId} index={position}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef} className="h-[750px] min-w-[380px] mt-10 shadow-lg rounded-lg relative  bg-smoke-white">
          <div {...provided.dragHandleProps} className="flex items-center gap-2 cursor-pointer bg-gray-400 h-8 rounded-t-lg">
            <h1 className="pl-2">{columnName}</h1>
          </div>
          <Droppable droppableId={columnId}>
          {(provided) => (
            <div
              className="px-4 h-[718px]"
              {...provided.droppableProps} ref={provided.innerRef}
            >
              {
                tasks?.map((task: any) => {
                  if(task.task_column_id === columnId) {
                    return <TaskCard key={task.id} task_name={task.task_name} task_description={task.task_description} id={task.id} position={task.position} />
                  }
                })
              }
              {provided.placeholder}
            </div>
          )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}