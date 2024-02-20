const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const AppSession = require('../models/appSessionModel');
const { createAppSessionService } = require('./users/appSessionService');
require('dotenv').config();

const activeUsers = new Map();

let start_time = ""
const SocketService = (server) => {
    const io = new Server(server);
    io.on('connection', (socket) => {
        let user_id = 0
        socket.on('login', async (data) => {
            try {
                start_time = new Date().toISOString();
                console.log("start time socket", start_time)
                const decoded = jwt.decode(data.userToken, process.env.JWT_SECRET)
                user_id = decoded.id;
                console.log('1 user connected at ', start_time);
                if (user_id && !Array.from(activeUsers.values()).includes(user_id)) {
                    activeUsers.set(socket.id, user_id);
                    io.emit('active-users', Array.from(activeUsers.values()));
                    console.log(`${user_id} se autenticó`);
                }
            } catch (error) {
                console.error('Error en la autenticación', error);
                socket.disconnect(true)
            }
        });
        socket.on('logout', async () => {
            if (user_id != 0) {
                const end_time = new Date().toISOString();
                console.log("end time" ,{ user_id, start_time, end_time })
                await createAppSessionService({ user_id, start_time, end_time })
            }
            activeUsers.delete(socket.id);
            io.emit('active-users', Array.from(activeUsers.values()));
        });
        socket.on('disconnect', async () => {
            if (user_id != 0) {
                const end_time = new Date().toISOString();
                await createAppSessionService({ user_id, start_time, end_time })
            }
            activeUsers.delete(socket.id);
            io.emit('active-users', Array.from(activeUsers.values()));
        });
    });
    return io;
}

module.exports = SocketService;
