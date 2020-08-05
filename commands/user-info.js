module.exports = {
	name: 'user-info',
	description: 'Display info about yourself.',
	execute(message) {
		message.channel.send(`Votre nom d'utilisateur: ${message.author.username}\nVotre ID: ${message.author.id}`);
	},
};
