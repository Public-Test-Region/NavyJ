module.exports = {
	name: 'avatar',
	aliases: ['icon', 'pp'],
	description: 'Obtenez l\'URL de l\'avatar du ou des utilisateur(s) marqué(s), ou votre propre avatar.',
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Voici votre avatar : ${message.author.displayAvatarURL({ dynamic: true })}`);
		}
		message.channel.send(avatarList);
	},
};
