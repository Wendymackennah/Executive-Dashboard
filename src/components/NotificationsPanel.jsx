import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

function NotificationsPanel({ notifications, markAsRead }) {
  if (!notifications.length) return null;

  return (
    <Paper sx={{ p: 2, mt: 3 }}>
      <Typography variant="h6">Notifications</Typography>
      <List dense>
        {notifications.map((n) => (
          <ListItem key={n.id}>
            <ListItemText primary={n.message} />
          </ListItem>
        ))}
      </List>
      <Button onClick={markAsRead} variant="contained" size="small">
        Mark All Read
      </Button>
    </Paper>
  );
}

export default NotificationsPanel;
