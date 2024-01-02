"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { Board } from "@/types";

interface BoardContextProps {
  currentBoardName: string | null | undefined;
  boardList: Board[];
  setBoardList: Dispatch<SetStateAction<Board[]>>;
  handleChangeActiveBoard: (id: string) => void;
  currentBoardId: string | null | undefined;
}

interface BoardProviderProps {
  children: ReactNode;
}

const BoardContext = createContext<BoardContextProps | undefined>(undefined);

const BoardProvider = ({ children }: BoardProviderProps) => {
  const [boardList, setBoardList] = useState<Board[]>([]);
  const [currentBoardId, setCurrentBoardId] = useState<string | null>();
  const [currentBoardName, setCurrentBoardName] = useState<string | null>()


  useEffect(() => {
    const getAllBoards = async () => {
      const response = await fetch("api/board/get-all-boards");
      const data = await response.json();
      const boards: Board[] = data?.data.map((board: any) => ({
        id: board.id,
        boardName: board.board_name,
        active: false,
      }));
      setBoardList(boards);
    }
    getAllBoards()
  }, [currentBoardId])

  const handleChangeActiveBoard = (id: string) => {
    const indexToChange = boardList.findIndex((board: Board) => board.id === id);
    const currentBoardName = boardList[indexToChange].boardName;
    setCurrentBoardName(currentBoardName);
    setCurrentBoardId(id)
  }

  return (
    <BoardContext.Provider value={{ 
      boardList, setBoardList, currentBoardName, currentBoardId, handleChangeActiveBoard
    }}>
      {children}
    </BoardContext.Provider>
  )
}

const useBoardContext = () => {
  const context = useContext(BoardContext);

  if(!context) {
    throw new Error("useBoardContext must be used withing a BoardProvider")
  }

  return context;
}

export { BoardProvider, useBoardContext };