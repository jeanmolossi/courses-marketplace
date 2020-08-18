import 'reflect-metadata';
import 'dotenv/config';

import express, { Express } from 'express';
import 'express-async-errors';
import cors from 'cors';

import { Server } from 'http';
import socketio, { Server as IOServer } from 'socket.io';

import '@config/typeorm';
import upload from '@config/upload';

import '@shared/container';
import routes from './routes';

import ErrorHandler from './middlewares/ErrorHandler';

interface ConnectedUsers {
  [key: string]: string;
}

class ServerRunner {
  public app: Express;

  public server: Server;

  public io: IOServer;

  public connectedUsers: ConnectedUsers;

  constructor() {
    this.app = express();

    this.server = new Server(this.app);

    this.io = socketio(this.server);

    this.connectedUsers = {};

    this.insertSocketInRequest();
    this.middlewares();
    this.routes();
    this.errors();

    return this;
  }

  insertSocketInRequest() {
    this.io.on('connection', socket => {
      const { userId } = socket.handshake.query;
      // eslint-disable-next-line no-console
      console.log(`User ${userId} has connected with socket ${socket.id}`);

      this.connectedUsers[userId] = socket.id;

      socket.on('connected', _socket => socket.emit('connected'));

      socket.on('disconnect', () => {
        // eslint-disable-next-line no-console
        console.log(
          `User ${userId} has disconnected and released socket ${socket.id}`,
        );

        delete this.connectedUsers[userId];
      });
    });

    this.app.use((request, response, next) => {
      request.io = this.io;
      request.connectedUsers = this.connectedUsers;

      return next();
    });
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());

    this.app.use('/encryptedFiles', express.static(upload.lessonsDir));
    this.app.use('/userfiles', express.static(upload.avatarDir));
  }

  routes() {
    this.app.use(routes);
  }

  errors() {
    this.app.use(ErrorHandler);
  }
}

const serverRun = new ServerRunner().server;

serverRun.listen(process.env.PORT, () =>
  console.log(`🚀 >> Server started on port: ${process.env.PORT}`),
);
