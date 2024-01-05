import { Column, Task } from "@/types";
import { Draggable } from "@hello-pangea/dnd";
import TaskCard from "../task-card";
import { useTaskContext } from "@/context/TaskContext";

export default function TaskColumn({ id: columnId, name: columnName, position }: Column) {

  const { tasks } = useTaskContext()

  return (
    <Draggable draggableId={columnId} index={position}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef} className="h-[750px] min-w-[380px] mt-10 shadow-lg rounded-lg relative  bg-smoke-white overflow-y-auto">
          <div {...provided.dragHandleProps} className="flex items-center gap-2 cursor-pointer bg-gray-400 h-8">
            <h1 className="pl-2">{columnName}</h1>
          </div>
          <div
            className="px-4"
          >
            {
              tasks?.map((task: any) => {
                if(task.task_column_id === columnId) {
                  return <TaskCard key={task.id} task_name={task.task_name} task_description={task.task_description} id={task.id} />
                }
              })
            }
          </div>
        </div>
      )}
    </Draggable>
  )
}