import React, { useEffect } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ListIcon from '@mui/icons-material/List';
import Container from '@mui/material/Container';

import RadioGroup from '../RadioGroup';
import Paper from '../Paper';
import Button from '../Button';
import TextField from '../TextField';

import store from '../../store';
import { State } from '../../types/ActivityLogEntry';

import './index.css'
import ActivityItem from '../ActivityItem';
import useActivityLog from '../ActivityItem/useActivityLog';

export default function App() {
  useEffect(() => {
    const saveState = (state: State) => {
      try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
      } catch (err) {
        console.error(err)
      }
    };

    const unsubscribe = store.subscribe(() => {
      saveState(store.getState());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const {
    activityLogs,
    currentUser,
    currentActivityLog,
    actionOptions,
    handleMessageChange,
    handleTypeChange,
    handleSubmit,
    isMessageFieldActive
  } = useActivityLog();

  return (
    <Container maxWidth="md">
      <Timeline position="right">
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0', flex: 0.1 }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector sx={{ flexGrow: 0.2 }} />
            <TimelineDot variant='outlined' sx={{ m: '0' }}>
              <ListIcon color='action' />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Paper square={false} elevation={0}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  multiline
                  hiddenLabel
                  value={currentActivityLog?.message}
                  onChange={handleMessageChange}
                  name='message'
                  rows={isMessageFieldActive() ? 3 : 1}
                  placeholder='Add note about ABC'
                  variant="outlined"
                />
                {isMessageFieldActive() && <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <RadioGroup value={currentActivityLog.type} onChange={handleTypeChange} />
                  <Button type='submit' size='medium'>Submit</Button>
                </div>}
              </form>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        {activityLogs?.map((log) => (
          <ActivityItem 
            key={`${log.id}-key`}
            log={log}
            currentUser={currentUser}
            options={actionOptions}
          />
        ))}
      </Timeline>
    </Container>
  );
}
