import http from 'http';
import app from './app';
import configureSocket from './config/socket';

const server = http.createServer(app);
const io = configureSocket(server);

server.listen(4001, () => {
	console.log('Server is running at port 4001...');
});
