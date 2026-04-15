import { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';

const useJobWebSocket = (token) => {
  const [socket, setSocket] = useState(null);
  const [newJob, setNewJob] = useState(null);
  const [newApplication, setNewApplication] = useState(null);
  const [applicationStatusChange, setApplicationStatusChange] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!token) return;

    const socketInstance = io('http://localhost:5000', {
      auth: {
        token
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });

    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket');
      setConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
      setConnected(false);
    });

    socketInstance.on('jobPosted', (data) => {
      console.log('New job posted:', data.job);
      setNewJob(data.job);
      // Auto-clear after 5 seconds
      setTimeout(() => setNewJob(null), 5000);
    });

    socketInstance.on('newApplication', (data) => {
      console.log('New application received:', data.application);
      setNewApplication(data.application);
    });

    socketInstance.on('applicationStatusChanged', (data) => {
      console.log('Application status changed:', data.application);
      setApplicationStatusChange(data.application);
    });

    socketInstance.on('jobUpdated', (data) => {
      console.log('Job updated:', data.jobId);
    });

    socketInstance.on('jobDeleted', (data) => {
      console.log('Job deleted:', data.jobId);
    });

    socketInstance.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [token]);

  const clearNewJob = useCallback(() => {
    setNewJob(null);
  }, []);

  const clearNewApplication = useCallback(() => {
    setNewApplication(null);
  }, []);

  const clearApplicationStatusChange = useCallback(() => {
    setApplicationStatusChange(null);
  }, []);

  return {
    socket,
    connected,
    newJob,
    newApplication,
    applicationStatusChange,
    clearNewJob,
    clearNewApplication,
    clearApplicationStatusChange
  };
};

export default useJobWebSocket;
