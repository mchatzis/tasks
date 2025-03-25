export enum TaskCategory {
  GENERAL = 'general',
  MAINTENANCE = 'maintenance',
  SAFETY = 'safety',
  CREW = 'crew',
  CARGO = 'cargo'
}

export type Comment = {
  id: number;
  task: number;
  user: string;
  content: string;
}

export type TaskApiData = {
  id: number;
  title: string;
  completed: boolean;
  is_favorite: boolean;
  category: TaskCategory;
  comments: Comment[];
  deadline: string;
}

export type Task = TaskApiData & {
  isEdited: boolean;
}

export type PaginatedTasksResponse = {
  next: string | null;
  previous: string | null;
  count: number;
  pageSize: number;
  data: TaskApiData[];
}

export type TaskChange = {
  taskId: number,
  changes: Partial<Task>
};

export function mapApiDataToTasks(apiData: TaskApiData[]): Task[] {
  return apiData.map(task => ({
    ...task,
    isEdited: false,
  }));
}
