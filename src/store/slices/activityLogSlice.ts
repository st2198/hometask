import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActivityLog, ActivityType, State } from '../../types/ActivityLogEntry';

const activityLogs: ActivityLog[] = [
  {
    id: 1,
    type: 'meeting note',
    message: 'Add a more formal meetings.',
    date: `${new Date().getTime() - (3 * 24 * 60 * 60 * 1000)}`,
    contact: 'Milton Romaguera'
  },
  {
    id: 2,
    type: 'phone',
    message: 'Then we had follow-up phone call',
    date: `${new Date().getTime() - (5 * 24 * 60 * 60 * 1000)}`,
    contact: 'Milton Romaguera'
  },
];

const loadState = (): State | undefined => {
  try {
    const serializedState = localStorage.getItem('state');
    if (!serializedState) {
      return;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const initialState: State = {
  currentUser: 'You',
  currentActivityLog: {
    message: '',
    type: 'message'
  },
  activityLogs: activityLogs,
};

const activityLogSlice = createSlice({
  name: 'activityLog',
  initialState: loadState() || initialState,
  reducers: {
    addActivity: (state, action: PayloadAction<ActivityLog>) => {
      state.activityLogs.unshift(action.payload);
      state.currentActivityLog = {
        message: '',
        type: 'message',
      };
    },
    changeMessage: (state, action: PayloadAction<{ message: string }>) => {
      state.currentActivityLog.message = action.payload.message;
    },
    changeType: (state, action: PayloadAction<{ type: ActivityType }>) => {
      state.currentActivityLog.type = action.payload.type;
    },
    removeActivity: (state, action: PayloadAction<number>) => {
      state.activityLogs = state.activityLogs.filter((log) => log.id !== action.payload);
    },
  },
});

export const { addActivity, changeMessage, changeType, removeActivity } = activityLogSlice.actions;
export default activityLogSlice.reducer;
