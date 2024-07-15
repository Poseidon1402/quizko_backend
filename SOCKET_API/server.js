// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);

// app.use(cors({
//     origin: '*', 
//     methods: ["GET", "POST"]
// }));

// const io = socketIo(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// });
// let users = [];
// let interviewActive = false;
// let isExpiredInterview = false;

// io.on('connection', (socket) => {
//     io.emit('updateUsers', users);
//     console.log('A user connected');

//     socket.on('activateInterview', () => {
//        // interviewActive = true;
//         io.emit("interviewActive");
        
//     });

//     socket.on('startInterview', (userData) => {
//         users.push(userData);
//         io.emit('updateUsers', users);
//     });

//     socket.on('interviewExpired', () => {
//         //users = users.filter(user => user.socketId !== socketId);
//         //io.emit('updateUsers', users);
//         //io.to(socketId).emit('interviewExpired');
//         isExpiredInterview = true;
//         io.emit("interviewExpired");
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });
// });

// server.listen(4000, () => {
//     console.log('Server is running on port 4000');
// });
const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const io = new Server(4000, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST']
}));

let users = [];
let interviewActive = false;
let isExpiredInterview = false;

io.on('connection', (socket) => {
    io.emit('updateUsers', users);
    console.log('A user connected');

    socket.on('activateInterview', () => {
        interviewActive = true;
        io.emit('interviewActive');
    });

    socket.on('startInterview', (userData) => {
        users.push(userData);
        io.emit('updateUsers', users);
    });

    socket.on('interviewExpired', () => {
        isExpiredInterview = true;
        io.emit('interviewExpired');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

console.log('Server is running on port 4000');

