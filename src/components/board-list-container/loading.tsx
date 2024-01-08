import { Skeleton } from "@/components/ui/skeleton";

export default function BoardListContainerLoader() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-4 items-center">
        <Skeleton className="w-4 h-4 bg-loading-background ml-3" />
        <Skeleton className="w-36 h-6 bg-loading-background" />
      </div>
      <div className="flex gap-4 items-center">
        <Skeleton className="w-4 h-4 bg-loading-background ml-3" />
        <Skeleton className="w-36 h-6 bg-loading-background" />
      </div>
      <div className="flex gap-4 items-center">
        <Skeleton className="w-4 h-4 bg-loading-background ml-3" />
        <Skeleton className="w-36 h-6 bg-loading-background" />
      </div>
      <div className="flex gap-4 items-center">
        <Skeleton className="w-4 h-4 bg-loading-background ml-3" />
        <Skeleton className="w-36 h-6 bg-loading-background" />
      </div>
      <div className="flex gap-4 items-center">
        <Skeleton className="w-4 h-4 bg-loading-background ml-3" />
        <Skeleton className="w-36 h-6 bg-loading-background" />
      </div>
      <div className="flex gap-4 items-center">
        <Skeleton className="w-4 h-4 bg-loading-background ml-3" />
        <Skeleton className="w-36 h-6 bg-loading-background" />
      </div>
    </div>
  )
}