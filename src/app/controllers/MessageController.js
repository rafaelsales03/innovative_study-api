import Message from '../models/Message';
import User from '../models/User';

class MessageController {
	async index(req, res) {
		const { itemType } = req.query;

		try {
			const messages = await Message.findAll({
				where: { item_type: itemType },
				include: [{ model: User, as: 'user', attributes: ['id', 'name'] }],
			});
			return res.json(messages);
		} catch (error) {
			console.error('Error fetching messages:', error);
			return res.status(500).json({ error: 'Error fetching messages' });
		}
	}

	async store(req, res) {
		const { content, user_id, item_type, category } = req.body;

		try {
			const message = await Message.create({
				content,
				user_id,
				item_type,
				category,
			});
			return res.status(201).json(message);
		} catch (error) {
			console.error('Error saving message:', error);
			return res.status(500).json({ error: 'Error saving message' });
		}
	}
}

export default new MessageController();
