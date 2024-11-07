import Sequelize, { Model } from 'sequelize';

class Message extends Model {
	static init(sequelize) {
		super.init(
			{
				content: Sequelize.TEXT,
				user_id: Sequelize.UUID,
				item_type: Sequelize.STRING,
				category: Sequelize.STRING,
			},
			{
				sequelize,
			},
		);
		return this;
	}

	static associate(models) {
		this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
	}
}

export default Message;
