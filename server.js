const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Frontend faylları göstər
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Sadə otaq strukturu
let rooms = {}; // roomId -> { players: [socketId], scores: {socketId: score} }

io.on('connection', (socket) => {
  console.log('Yeni oyunçu qoşuldu:', socket.id);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = { players: [], scores: {} };
    }

    if (rooms[roomId].players.length < 2) {
      rooms[roomId].players.push(socket.id);
      rooms[roomId].scores[socket.id] = 0;

      io.to(roomId).emit('roomUpdate', rooms[roomId].players);

      if (rooms[roomId].players.length === 2) {
        io.to(roomId).emit('startGame');
      }
    } else {
      socket.emit('roomFull');
    }
  });

  socket.on('answer', ({ roomId, isCorrect }) => {
    if (!rooms[roomId]) return;
    if (!rooms[roomId].scores[socket.id]) return;

    if (isCorrect) {
      rooms[roomId].scores[socket.id] += 10;
    } else {
      rooms[roomId].scores[socket.id] = Math.max(0, rooms[roomId].scores[socket.id] - 5);
    }

    io.to(roomId).emit('scoreUpdate', rooms[roomId].scores);
  });

  socket.on('disconnect', () => {
    for (const roomId in rooms) {
      const idx = rooms[roomId].players.indexOf(socket.id);
      if (idx !== -1) {
        rooms[roomId].players.splice(idx, 1);
        delete rooms[roomId].scores[socket.id];
        io.to(roomId).emit('roomUpdate', rooms[roomId].players);
        if (rooms[roomId].players.length === 0) {
          delete rooms[roomId];
        }
        break;
      }
    }
    console.log('Oyunçu ayrıldı:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`✅ Server ${PORT} portunda işləyir`);
});
