"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState, useEffect } from "react";
import { useBoardContext } from "./BoardContext";
import { Column, Task } from "@/types";

interface ColumnProviderProps {
  children: ReactNode
}

interface ColumnContextType {
  columns: Column[] | null;
  isLoading: boolean | null;
  setColumns: Dispatch<SetStateAction<Column[] | any>>;
  updateTasks: any
}

const ColumnContext = createContext<ColumnContextType | undefined>(undefined);

const ColumnProvider: React.FC<ColumnProviderProps> = ({ children }) => {

  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentBoardId }  = useBoardContext();

  useEffect(() => {
    const getAllColumns = async () => {

      if(!currentBoardId) {
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`/api/columns/get-all-columns`, {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            currentBoardId
          })
        })
        const data = await response.json();
        
        // Fetch all tasks
        const taskResponse = await fetch("/api/tasks/get-all-tasks", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            currentBoardId
          })
        });
        
        const taskData = await taskResponse.json();
        
        // Add tasks to each column
        const columnsWithTasks = data.data.map((column: any) => {
          return {
            ...column,
            tasks: taskData.data.filter((task: any) => task.task_column_id === column.id)
          };
        });
        
        setColumns(columnsWithTasks);
      } catch (error) {
          console.log(error)
      } finally {
        setIsLoading(false);
      }
    }

    getAllColumns()
  },[currentBoardId])

  const updateTasks = (data: any) => {

    setColumns((prev: any[]) => {
      return prev.map(column => {
        if(column.id === data.task_column_id) {
          return {
            ...column,
            tasks: [...column.tasks, { ...data }]
          }
        } else {
          return column;
        }
      })
    })

  }

  return (
    <ColumnContext.Provider value={{ columns, isLoading, setColumns, updateTasks }}>
      {children}
    </ColumnContext.Provider>
  )
}

const useColumnContext = () : ColumnContextType => {
  const context = useContext(ColumnContext);

  if(!context) {
    throw new Error("useBoardContext must be used withing a BoardProvider")
  }

  return context;
}

export { ColumnProvider, useColumnContext };