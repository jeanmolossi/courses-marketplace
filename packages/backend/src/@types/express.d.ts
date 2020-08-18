declare namespace Express {
  interface Request {
    user: {
      id: string;
    };

    io: import('socket.io').Server;
    connectedUsers: { [key: string]: string };
  }
}
