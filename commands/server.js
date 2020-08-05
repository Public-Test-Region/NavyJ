module.exports = {
	name: 'server',
	description: 'Display info about this server.',
	execute(message) {
		message.channel.send(`Nom du serveur: ${message.guild.name}\nNombre total de membre: ${message.guild.memberCount}`);
	},
};
