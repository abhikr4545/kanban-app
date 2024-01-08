import { useBoardContext } from "@/context/BoardContext";
import BoardCard from "../board-card";
import { Board } from "@/types";
import BoardListContainerLoader from "./loading";


export default function BoardListContainer() {

  const { boardList, loading } = useBoardContext()

  if(loading) {
    return (
      <div className="flex-1 overflow-y-auto">
        <BoardListContainerLoader />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {
        boardList.map((board: Board) => <BoardCard key={board.id} id={board.id} active={board.active} boardName={board.boardName} />)
      }
    </div>
  )
}