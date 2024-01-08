import { Column, Task } from "@/types";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import TaskCard from "../task-card";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ColumnOption from "../column-option";

export default function TaskColumn({ id: columnId, name: columnName, position, tasks }: any) {

  return (
    <Draggable draggableId={columnId} index={position}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef} className="h-[750px] min-w-[380px] mt-10 shadow-lg rounded-lg relative  bg-smoke-white">
          <div {...provided.dragHandleProps} className="flex justify-between items-center gap-2 cursor-pointer bg-gray-400 h-8 rounded-t-lg">
            <h1 className="pl-2">{columnName}</h1>
            <div className="mr-2">
              <ColumnOption columnId={columnId} />
            </div>
          </div>
          <Droppable droppableId={columnId}>
          {(provided) => (
            <div
              className="px-4 h-[718px] overflow-y-auto py-2"
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