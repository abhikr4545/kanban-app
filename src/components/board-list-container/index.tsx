import { useBoardContext } from "@/context/BoardContext";
import BoardCard from "../board-card";
import { Board } from "@/types";

export default function BoardListContainer() {

  const { boardList } = useBoardContext()

  return (
    <div className="flex-1 overflow-y-auto">
      {
        boardList.map((board: Board) => <BoardCard key={board.id} id={board.id} active={board.active} boardName={board.boardName} />)
      }
    </div>
  )
}