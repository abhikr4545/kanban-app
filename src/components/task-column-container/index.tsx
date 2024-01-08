"use client";

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useBoardContext } from "@/context/BoardContext";
import CreateTaskColumnModal from "../modals/create-column";
import { useColumnContext } from "@/context/ColumnContext";
import { Column } from "@/types";
import TaskColumn from "../task-column";
import { toast } from "sonner";
import Loader from "./loading";
export default function TaskColumnContainer () {

  const { currentBoardId } = useBoardContext();
  const { columns, setColumns, isLoading } = useColumnContext();

  if(isLoading) {
    return <Loader />
  }

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

    if(type === "columns") {
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
        toast("Something went wrong. Any changes will not be reflected no next refresh.", {
          cancel: {
            label: "x"
          }
        })
      }
    }else {
      const startColumn = columns?.find(column => column.id === source.droppableId);
      const finishColumn = columns?.find(column => column.id === destination.droppableId);
      
      if (startColumn && finishColumn) {
       const task = startColumn.tasks?.find((task: any) => task.id === result.draggableId);
    
        if(task) {
          const newTask = {...task, task_column_id: destination.droppableId, position: destination.index};
      
          if(startColumn === finishColumn) {
            const newColumnTasks = startColumn.tasks?.filter(task => task.id !== result.draggableId);
          
            if(newColumnTasks) {
              newColumnTasks.splice(destination.index, 0, newTask);
          
              newColumnTasks.forEach((task, index) => {
                task.position = index;
              });
          
              const newColumn = {...startColumn, tasks: newColumnTasks};
          
              const newColumns = columns?.map(column => {
                if(column.id === newColumn.id) {
                  return newColumn;
                } else {
                  return column;
                }
              });
        
            if(newColumns) {
              setColumns(newColumns);
            }
          }
          try {
            const response = await fetch("/api/tasks/update-task", {
              method: "PATCH",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify({
                type: "SAME_COLUMN",
                newColumnTasks
              })
            })
            const data = await response.json();
            
          } catch (error) {
            toast("Something went wrong", {
              cancel: {
                label: "x"
              }
            })
          }
        } else {
          const newStartColumnTasks = startColumn.tasks?.filter(task => task.id !== result.draggableId);
        
          newStartColumnTasks?.forEach((task, index) => {
            task.position = index;
          });

          const newEndColumnTasks = [...finishColumn?.tasks];
          newEndColumnTasks.splice(destination.index, 0, newTask);
        
          newEndColumnTasks.forEach((task, index) => {
            task.position = index;
          });
        
          const newStartColumn = {...startColumn, tasks: newStartColumnTasks};
          const newEndColumn = {...finishColumn, tasks: newEndColumnTasks};

          const newColumns = columns?.map(column => {
            if(column.id === newStartColumn.id) {
              return newStartColumn;
            } else if(column.id === newEndColumn.id) {
              return newEndColumn;
            } else {
              return column;
            }
          });
        
          setColumns(newColumns);

          try {
            const response = await fetch("/api/tasks/update-task", {
              method: "PATCH",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify({
                type: "DIFFERENT_COLUMN",
                newStartColumnTasks,
                newEndColumnTasks
              })
            })
            const data = await response.json();
            
          } catch (error) {
            toast("Something went wrong", {
              cancel: {
                label: "x"
              }
            })
          }
        }}}
    }
  }

  return (
    <div className="w-[calc(100%-270px)] flex gap-16 items-center overflow-x-auto px-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="root" type="columns" direction="horizontal">
          {(provided) => (
            <section
              className="w-[calc(100%-270px)] flex gap-16 items-center px-4"
              {...provided.droppableProps} ref={provided.innerRef}
              >
                {
                  columns?.map((column: any) => {
                    return <TaskColumn key={column.id} id={column.id} position={column.position} name={column.name} tasks={column.tasks} />
                  })
                }
                {provided.placeholder}
              <CreateTaskColumnModal />
            </section>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}