export interface StatusResponse {
  message: string;
  data: StatusResponseDatum[];
}

export interface StatusResponseDatum {
  id: string;
  name: string;
  description: string;
  sequence: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  taskManagements: StatusResponseTaskManagement[];
}

export interface StatusResponseTaskManagement {
  id: string;
  name: string;
  description: string;
  targetDate: null;
  actualDate: null;
  taskPriority: StatusResponseTaskManagementTaskPriority;
  createdAt: Date;
  updatedAt: Date;
}

export interface StatusResponseTaskManagementTaskPriority {
  id: string;
  name: string;
  color: string;
}
