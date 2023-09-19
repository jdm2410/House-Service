
// custom-types.ts

import { User } from 'firebase/auth';
import { WorkRequest } from './work-request.model';

export interface CustomUser extends User {
  workerSchedule?: Record<string, string>;
  workRequest: WorkRequest[];
}
