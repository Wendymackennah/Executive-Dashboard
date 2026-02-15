import React from 'react';
import { IconButton, Badge, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { motion, AnimatePresence } from 'framer-motion';

function Header({ unreadCount, onClick }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
      <Tooltip title="Notifications">
        <AnimatePresence>
          <motion.div
            key={unreadCount}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <IconButton onClick={onClick} color="primary">
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </motion.div>
        </AnimatePresence>
      </Tooltip>
    </div>
  );
}

export default Header;
