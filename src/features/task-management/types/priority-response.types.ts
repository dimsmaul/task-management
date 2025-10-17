export interface PriorityResponse {
  message: string;
  data: PriorityResponseDatum[];
}

export interface PriorityResponseDatum {
  id: string;
  name: string;
  description: string;
  level: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}
