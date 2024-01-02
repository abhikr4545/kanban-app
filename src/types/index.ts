export interface Board {
  id: string;
  boardName: string;
  active?: boolean | undefined;
}

export interface Column {
  id: string;
  name: string;
}