// src/components/ActivityLog.tsx
import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography, Box } from '@mui/material';

type ActivityLogProps = {
  entries: { id: number; content: string; date: string }[];
};

const ActivityLog: React.FC<ActivityLogProps> = ({ entries }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, backgroundColor: 'background.paper' }}>
      <List>
        {entries.map((entry, index) => (
          <React.Fragment key={entry.id}>
            <ListItem alignItems="flex-start" sx={{ padding: '8px 16px' }}>
              <ListItemText
                primary={<Typography variant="subtitle1">{entry.content}</Typography>}
                secondary={<Typography variant="body2" color="text.secondary">{formatDate(entry.date)}</Typography>}
                sx={{ margin: 0 }}
              />
            </ListItem>
            {index !== entries.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default ActivityLog;
