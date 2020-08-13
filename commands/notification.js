module.exports = {
    name: 'notification',
    description: 'Active le système de notification pour vous informer.',
    guildOnly: true,
    execute(message, args, notif) {
        const args = message.content.slice(prefix.length).split(' ');
        if (args[1] === "JeuxG") {
            notif(JeuxG)
        } else {
            message.channel.send({
                embed: {
                    color: RdmColor,
                    author: {
                        name: message.guild.name + " | Commande de notification (" + prefix + "notification)\n­",
                        icon_url: message.guild.iconURL()
                    },
                    title: "Bonjour, voici les types de notifications que vous pouvez activer ci-dessous. Cliquez simplement sur la réaction qui correspond à votre type de notification pour l'activer.\n­",
                    fields: [{
                        name: "1️⃣ Notification de jeux gratuits",
                        value: "Tapez `" + prefix + "notification JeuxG` pour l'activer ou le désactiver.\nSoyez prévenue à chaque sortie de jeux gratuits !\nChaque utilisateur peut colaborer pour annoncer les jeux gratuits.\n­"
                    }, {
                        name: "~~2️⃣ Notification de jeux joués sur LCD~~",
                        value: "Tapez `" + prefix + "notification Jeux` pour l'activer ou le désactiver.\nCeci n'est pas encore disponible.\n­"
                    }],
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.avatarURL(),
                        text: "Demande d'aide demandé par " + message.author.tag
                    }
                }
            })
        }
    },
};