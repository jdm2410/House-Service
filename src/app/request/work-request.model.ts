export class WorkRequest {
  id: string;
  userId: string;
  workerId?: string;
  date: string;
  description: string;
  status?: boolean;
}
