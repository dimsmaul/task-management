export interface StatusListResponse {
  message: string;
  data: StatusListResponseDatum[];
}

export interface StatusListResponseDatum {
  id: string;
  name: string;
  description: string;
  sequence: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  taskManagements: [];
}
