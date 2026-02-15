import React, { useState } from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

function KpiCard({ title, value, color, textColor, miniChartData, onClick }) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 140,
          borderRadius: 2,
          bgcolor: color,
          color: textColor || '#fff',
          position: 'relative',
        }}
      >
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="h4">{value}</Typography>

        {hover && miniChartData?.length > 0 && (
          <Box sx={{ position: 'absolute', bottom: 5, left: 5, right: 5, height: 50 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={miniChartData}>
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        )}
      </Paper>
    </motion.div>
  );
}

export default KpiCard;
