import React from 'react';
import { TimelineItem, TimelineOppositeContent, TimelineSeparator, TimelineConnector, TimelineDot, TimelineContent } from '@mui/lab';
import { Typography, Paper } from '@mui/material';
import moment from 'moment';
import { icons } from '../../constants';
import { ActivityLog, ActivityType } from '../../types/ActivityLogEntry';
import MenuMore from '../MenuMore';

const dynamicIcon = (value: ActivityType) => {
    const Icon = icons[value];

    return <Icon color='action' />;
}

type ActivityItemProps = {
    log: ActivityLog,
    currentUser: string;
    options: {
        text: string,
        handler: (id: number) => void
    }[];
}

const ActivityItem: React.FC<ActivityItemProps> = ({ log, currentUser, options }) => (
    <TimelineItem>
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
                <MenuMore activityId={log.id} options={options} />
            </Paper>
        </TimelineContent>
    </TimelineItem>
);

export default ActivityItem;
