"use client";

import { Task } from "@/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState, useEffect } from "react";
import { useBoardContext } from "./BoardContext";

interface TaskProviderProps {
  children: ReactNode
}

interface TaskContextProps {
  tasks: Task[] | null;
  isLoading: boolean | null;
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { currentBoardId } = useBoardContext();

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const response = await fetch("/api/tasks/get-all-tasks", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            currentBoardId
          })
        });

        
        if(response.ok) {
          const data = await response.json()
          setTasks(data.data)
        }
      } catch(error) {
        console.log(error)
      }
    }


    getAllTasks()
  }, [currentBoardId])

  return (
    <TaskContext.Provider value={{
      tasks, isLoading, setTasks
    }}>
      {children}
    </TaskContext.Provider>
  )
}

const useTaskContext = () => {
  const context = useContext(TaskContext);
  if(!context) {
    throw new Error("Task context is not present")
  }

  return context;
}

export { TaskProvider, useTaskContext };