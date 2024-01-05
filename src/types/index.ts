export interface Board {
  id: string;
  boardName: string;
  active?: boolean | undefined;
}

export interface Column {
  id: string;
  name: string;
  position: number;
}

export interface Task {
  id: string;
  name: string;
  position: number;
}