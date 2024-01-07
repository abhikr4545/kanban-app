import { NextResponse, NextRequest } from "next/server";
import SupabaseServerClient from "@/lib/supabase";
import { nanoid } from "nanoid";

export async function POST(request: NextRequest) {
  const { taskTitle, taskDescription, column, subTasksList, currentBoardId, position } = await request.json();
  const supabase = await SupabaseServerClient()
  const taskId = nanoid();

  const { data, error } = await supabase.from("task_card")
  .insert({ id: taskId, task_column_id: column, task_name: taskTitle, task_description: taskDescription, board_id: currentBoardId, position }).select();

  const subTasksWithCardId = subTasksList.map((subTask: any) => ({id: subTask.id , name: subTask.title, task_card_id: taskId}))

  const { error: subtasksError } = await supabase.from("subtask_list")
  .upsert([...subTasksWithCardId]).select();

  if(error) {
    console.log(error)
    console.log(subtasksError);
    return NextResponse.json({ message: "Something went wrong" }, { status: 401 })
  }

  return NextResponse.json({ data, message: "Task Created" }, { status: 201 })
}