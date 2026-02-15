import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import useSocketNotifications from '../hooks/useSocketNotifications';
import KpiCard from '../components/KpiCard';
import Header from '../components/Header';
import DrillDownModal from '../components/DrillDownModal';
import NotificationsPanel from '../components/NotificationsPanel';

function LiveDashboard() {
  const { notifications, markAsRead, unreadCount, clients, licenses, tasks, kpiCounts, clientTrends, licenseTrends } = useSocketNotifications();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalColumns, setModalColumns] = useState([]);

  const handleCardClick = (type) => {
    switch (type) {
      case 'clients':
        setModalData(clients.map(c => ({ name: c.name, joined: c.createdAt })));
        setModalColumns([{ key: 'name', label: 'Name' }, { key: 'joined', label: 'Joined On' }]);
        break;
      case 'activeLicenses':
        setModalData(licenses.filter(l => l.status === 'Active').map(l => ({ name: l.name, expiry: l.expiry })));
        setModalColumns([{ key: 'name', label: 'License' }, { key: 'expiry', label: 'Expiry Date' }]);
        break;
      case 'expiredLicenses':
        setModalData(licenses.filter(l => l.status === 'Expired').map(l => ({ name: l.name, expiry: l.expiry })));
        setModalColumns([{ key: 'name', label: 'License' }, { key: 'expiry', label: 'Expiry Date' }]);
        break;
      case 'pendingTasks':
        setModalData(tasks.map(t => ({ title: t.title, due: t.dueDate })));
        setModalColumns([{ key: 'title', label: 'Task' }, { key: 'due', label: 'Due Date' }]);
        break;
      default:
        break;
    }
    setModalOpen(true);
  };

  const kpiData = [
    { title: 'Total Clients', value: kpiCounts.totalClients, color: '#3f5c2f', key: 'clients', miniChartData: clientTrends },
    { title: 'Active Licenses', value: kpiCounts.activeLicenses, color: '#1e95a5', key: 'activeLicenses', miniChartData: licenseTrends },
    { title: 'Expired Licenses', value: kpiCounts.expiredLicenses, color: '#d32f2f', key: 'expiredLicenses', miniChartData: licenseTrends },
    { title: 'Pending Tasks', value: kpiCounts.pendingTasks, color: '#fbc02d', textColor: '#000', key: 'pendingTasks' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header unreadCount={unreadCount} onClick={() => alert('Open Notifications Panel')} />

      <Typography variant="h4" gutterBottom>Live Executive Dashboard</Typography>

      {/* KPI Cards */}
      <Grid container spacing={3}>
        {kpiData.map(kpi => (
          <Grid item xs={12} sm={6} md={3} key={kpi.title}>
            <KpiCard
              title={kpi.title}
              value={kpi.value}
              color={kpi.color}
              textColor={kpi.textColor}
              miniChartData={kpi.miniChartData}
              onClick={() => handleCardClick(kpi.key)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Notifications Panel */}
      <NotificationsPanel notifications={notifications} markAsRead={markAsRead} />

      {/* Drill-down Modal */}
      <DrillDownModal open={modalOpen} handleClose={() => setModalOpen(false)} data={modalData} columns={modalColumns} />
    </motion.div>
  );
}

export default LiveDashboard;
