const { prefix } = require('../config/config.json');

module.exports = {
	name: 'help',
	description: 'Liste de toutes mes commandes ou des informations sur une commande spécifique.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push('Voici une liste de toutes mes commandes:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nVous pouvez envoyer \`${prefix}help [nom de la commande]\` pour avoir des informations sur une commande spécifique`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('Je vous ai envoyé un message privé avec toutes mes commandes!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('il semble que je ne puisse pas vous DM !');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('Ce n\'est pas une commande valide');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Alias:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });
	},
};
