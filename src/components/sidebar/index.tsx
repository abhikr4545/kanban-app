import { useBoardContext } from "@/context/BoardContext";
import BoardListContainer from "../board-list-container";
import CreateBoardModal from "../modals/create-board-modal";

export default function Sidebar() {

  const { boardList } = useBoardContext();

  return (
    <aside
      className="h-[calc(100vh-56px)] text-smoky-black w-[270px] border-r-2 border-r-border-color flex flex-col py-6"
    >
      <h1 className="text-gray-500 font-bold ml-6 mb-2">All boards ({boardList.length})</h1>
        <BoardListContainer />
        <CreateBoardModal />
    </aside>
  )
}