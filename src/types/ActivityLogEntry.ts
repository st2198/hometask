export type ActivityType = 'message' | 'phone' | 'beer' | 'coffee' | 'meeting note';

export interface ActivityLog {
  id: number;
  type: ActivityType;
  message: string;
  date: string;
  contact: string;
  currentUser: string;
}

export interface State {
  currentActivityLog: {
    message: string;
    type: ActivityType;
  };
  activityLogs: ActivityLog[];
}