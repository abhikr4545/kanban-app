import { Skeleton } from "../ui/skeleton";

export default function Loader() {
  return (
    <div className="w-[calc(100%-270px)] flex gap-16 items-center overflow-x-auto px-4">
      <Skeleton  className="h-[750px] min-w-[380px] mt-10 shadow-lg rounded-lg relative  bg-smoke-white" />
      <Skeleton  className="h-[750px] min-w-[380px] mt-10 shadow-lg rounded-lg relative  bg-smoke-white" />
    </div>
  )
}