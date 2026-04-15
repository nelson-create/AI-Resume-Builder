const jwt = require('jsonwebtoken');

let io = null;
const connectedUsers = new Map();

const initializeWebSocket = (server) => {
  const socketIO = require('socket.io');
  io = new socketIO.Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:5173'],
      credentials: true
    }
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      socket.user = decoded.user;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    if (socket.user) {
      connectedUsers.set(socket.user.id, socket.id);
      socket.join(`user_${socket.user.id}`);
      
      // Join employers room
      if (socket.user.role === 'employer') {
        socket.join('employers');
      }
      
      // Join job seekers room
      if (socket.user.role === 'job_seeker') {
        socket.join('job_seekers');
      }
    }

    socket.on('disconnect', () => {
      if (socket.user) {
        connectedUsers.delete(socket.user.id);
      }
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};

const getIO = () => io;

const emitJobPosted = (job) => {
  if (io) {
    io.to('job_seekers').emit('jobPosted', {
      type: 'new_job',
      job,
      timestamp: new Date()
    });
  }
};

const emitJobUpdated = (jobId, updates) => {
  if (io) {
    io.emit('jobUpdated', {
      type: 'job_updated',
      jobId,
      updates,
      timestamp: new Date()
    });
  }
};

const emitJobDeleted = (jobId) => {
  if (io) {
    io.emit('jobDeleted', {
      type: 'job_deleted',
      jobId,
      timestamp: new Date()
    });
  }
};

const emitNewApplication = (employerId, applicationData) => {
  if (io) {
    io.to(`user_${employerId}`).emit('newApplication', {
      type: 'new_application',
      application: applicationData,
      timestamp: new Date()
    });
  }
};

const emitApplicationStatusChanged = (applicantId, applicationData) => {
  if (io) {
    io.to(`user_${applicantId}`).emit('applicationStatusChanged', {
      type: 'application_status_changed',
      application: applicationData,
      timestamp: new Date()
    });
  }
};

module.exports = {
  initializeWebSocket,
  getIO,
  emitJobPosted,
  emitJobUpdated,
  emitJobDeleted,
  emitNewApplication,
  emitApplicationStatusChanged
};
