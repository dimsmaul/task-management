export interface TaskBoardResponse {
  message: string;
  data: TaskBoardResponseDatum[];
}

export interface TaskBoardResponseDatum {
  id: string;
  name: string;
  description: string;
  targetDate: null;
  actualDate: null;
  createdAt: Date;
  updatedAt: Date;
  taskStatus: Task;
  taskPriority: Task;
  users: TaskBoardResponseUser[];
}

export interface Task {
  id: string;
  name: string;
  color: string;
}

export interface TaskBoardResponseUser {
  id: string;
  name: string;
  email: string;
}

/**
 * TaskBoardResponse By Id
 */
export interface TaskBoardResponseById {
  message: string;
  data: TaskBoardResponseDatum;
}
