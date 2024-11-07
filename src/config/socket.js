import { Server } from 'socket.io';
import Message from '../app/models/Message';

export default function configureSocket(server) {
	const io = new Server(server, {
		cors: {
			origin: 'http://localhost:5173',
			methods: ['GET', 'POST'],
		},
	});

	io.on('connection', (socket) => {
		console.log('A user connected:', socket.id);

		socket.on('joinRoom', ({ itemId }) => {
			const roomName = `room-${itemId}`;
			socket.join(roomName);
			console.log(`User joined room ${roomName}`);
		});

		socket.on('sendMessage', async ({ itemId, userId, content }) => {
			const roomName = `room-${itemId}`;

			try {
				const message = await Message.create({
					content,
					user_id: userId,
					item_type: itemId,
				});

				io.to(roomName).emit('newMessage', message);
			} catch (error) {
				console.error('Error saving message:', error);
			}
		});

		socket.on('disconnect', () => {
			console.log('A user disconnected:', socket.id);
		});
	});

	return io;
}
