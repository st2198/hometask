import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ListIcon from '@mui/icons-material/List';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import moment from 'moment';

import RadioGroup from '../RadioGroup';
import Paper from '../Paper';
import MenuMore from '../MenuMore';
import TextField from '../TextField';
import Button from '../Button';

import { addActivity, changeMessage, changeType, removeActivity } from '../../store/slices/activityLogSlice';
import { icons, currentContact } from '../../constants';
import store from '../../store';
import { ActivityType, State } from '../../types/ActivityLogEntry';

import './index.css'

export default function CustomizedTimeline() {
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
      saveState(store.getState().activityLog);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const dynamicIcon = (value: ActivityType) => {
    const Icon = icons[value];
  
    return <Icon color='action' />;
  }

  const dispatch = useDispatch();
  const { activityLogs, currentUser, currentActivityLog } = useSelector(({ activityLog }): State => activityLog);

  const actionOptions = [{
    text: 'Delete',
    handler: (id: number) => {
      dispatch(removeActivity(id));
    },
  }];

  const activityLogMessageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeMessage({ message: e.target.value }));
  };

  const activityLogTypeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeType({ type: e.target.value as ActivityType }));
  };

  const activityLogSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addActivity({
      ...currentActivityLog, contact: currentContact, id: new Date().getSeconds(),
      date: `${new Date().getTime()}`
    }));
  };

  const isMessageFieldActive = (): boolean => {
    return currentActivityLog?.message?.length > 0;
  };

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
              <form onSubmit={activityLogSubmitHandler}>
                <TextField
                  fullWidth
                  multiline
                  hiddenLabel
                  value={currentActivityLog?.message}
                  onChange={activityLogMessageHandler}
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
                  <RadioGroup value={currentActivityLog.type} onChange={activityLogTypeHandler} />
                  <Button type='submit' size='medium'>Submit</Button>
                </div>}
              </form>
            </Paper>
          </TimelineContent>
        </TimelineItem>
        {activityLogs?.map((log, index) => (
          <TimelineItem key={`${index}-key`}>
            <TimelineOppositeContent
              sx={{ m: 'auto 0', flex: 0.1, marginTop: "12px" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {moment(log.date, "x").fromNow()}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector sx={{ flexGrow: 0.2 }} />
              <TimelineDot variant='outlined' sx={{ m: '0' }}>
                {dynamicIcon(log.type)}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>

              <Paper square={false} elevation={0}>
                <Typography variant='h6'><span className='App-highlight'>{currentUser}</span> had a {log.type} with <span className='App-highlight'>{log.contact}</span></Typography>
                <Typography variant='subtitle2'>{log.message}</Typography>
                <MenuMore activityId={log.id} options={actionOptions} />
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  );
}
