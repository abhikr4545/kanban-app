"use client";

import ViewTaskModal from "../modals/view-task";

interface Task {
  task_name: string;
  task_description: string;
  id: string;
}

export default function TaskCard({ task_name, task_description, id }:Task) {
  return (
    <article className="bg-dove-gray rounded-lg h-36 overflow-y-auto mt-3">
      <ViewTaskModal taskName={task_name} taskDescription={task_description} id={id} />
      <p className="ml-4 text-gray-500">
        0 of 1 subtasks
      </p>
    </article>
  )
}