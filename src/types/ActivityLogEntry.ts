export type ActivityLogEntry = {
    id: number;
    content: string;
    timestamp: Date;
};

export type ActivityType = 'message' | 'phone' | 'beer' | 'coffee' | 'meeting note';

export interface ActivityLog {
  id: number;
  type: ActivityType;
  message: string;
  date: string;
  contact: string;
}

export interface State {
  currentUser: string;
  currentActivityLog: {
    message: string;
    type: ActivityType;
  };
  activityLogs: ActivityLog[];
}