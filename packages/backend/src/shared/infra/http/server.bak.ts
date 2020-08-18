const app = express();
const server = new Server(app);

app.use(cors());
app.use(express.json());

interface ConnectedUsers {
  [key: string]: string;
}
const io = socketio(server);
const connectedUsers: ConnectedUsers = {};

io.on('connection', socket => {
  const { userId } = socket.handshake.query;
  connectedUsers[userId] = socket.id;

  socket.on('disconnect', () => {
    delete connectedUsers[userId];
  });
});

app.use((request, response, next) => {
  request.io = io;
  request.connectedUsers = connectedUsers;
  next();
});

app.use('/encryptedFiles', express.static(upload.lessonsDir));
app.use('/userfiles', express.static(upload.avatarDir));

app.use(routes);
app.use(ErrorHandler);

server.listen(process.env.PORT || 3333, () =>
  // eslint-disable-next-line no-console
  console.log(`🚀 >> Server started on port: ${process.env.PORT}`),
);
