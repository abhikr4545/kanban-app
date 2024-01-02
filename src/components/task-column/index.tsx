import { Column } from "@/types";

export default function TaskColumn({ id: columnId, name: columnName }: Column) {
  return (
    <div className="h-[750px] min-w-[380px] mt-10 shadow-lg rounded-lg relative  bg-smoke-white overflow-y-auto">
      <div className="flex items-center gap-2 cursor-pointer">
        <h1>{columnName}</h1>
      </div>
      <div
        className=""
      >
        {columnId}
      </div>
    </div>
  )
}