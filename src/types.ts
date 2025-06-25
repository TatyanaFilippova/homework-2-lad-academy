export interface TodoItem {
  id: number;
  name: string;
  subList: TodoSubItem[];
}

export interface TodoSubItem {
  id: number;
  name: string;
}
