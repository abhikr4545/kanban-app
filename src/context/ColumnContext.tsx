"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState, useEffect } from "react";
import { useBoardContext } from "./BoardContext";
import { Column } from "@/types";

interface ColumnProviderProps {
  children: ReactNode
}

interface ColumnContextType {
  columns: Column[] | null;
  isLoading: boolean | null;
  setColumns: Dispatch<SetStateAction<Column[]>>;
}

const ColumnContext = createContext<ColumnContextType | undefined>(undefined);

const ColumnProvider: React.FC<ColumnProviderProps> = ({ children }) => {

  const [columns, setColumns] = useState<Column[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentBoardId }  = useBoardContext();

  useEffect(() => {
    const getAllColumns = async () => {
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
          const data = await response.json()
          setColumns(data.data);
        } catch (error) {
          console.log(error)
      } finally {
        setIsLoading(false);
      }
    }

    getAllColumns()
  },[currentBoardId])

  return (
    <ColumnContext.Provider value={{ columns, isLoading, setColumns }}>
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