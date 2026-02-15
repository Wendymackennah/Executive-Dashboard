import { useState, useEffect } from 'react';

// Mock WebSocket real-time updates
export default function useSocketNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [clients, setClients] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [kpiCounts, setKpiCounts] = useState({
    totalClients: 0,
    activeLicenses: 0,
    expiredLicenses: 0,
    pendingTasks: 0,
  });

  const [clientTrends, setClientTrends] = useState([]);
  const [licenseTrends, setLicenseTrends] = useState([]);

  useEffect(() => {
    // Simulate incoming WebSocket events
    const interval = setInterval(() => {
      const newClient = { name: `Client ${Math.floor(Math.random() * 100)}`, createdAt: new Date().toLocaleDateString() };
      setClients((prev) => [newClient, ...prev]);
      setKpiCounts((prev) => ({ ...prev, totalClients: prev.totalClients + 1 }));
      setClientTrends((prev) => [...prev.slice(-9), { date: new Date().toLocaleTimeString(), value: prev.length + 1 }]);

      const newNotification = { id: Date.now(), message: `New client added: ${newClient.name}` };
      setNotifications((prev) => [newNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const markAsRead = () => setUnreadCount(0);

  return { notifications, markAsRead, unreadCount, clients, licenses, tasks, kpiCounts, clientTrends, licenseTrends };
}
