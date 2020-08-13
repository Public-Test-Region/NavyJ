const fs = require('fs');
const Discord = require(`discord.js`);
const config = require("./config/config.json");
let prefix = config.prefix;
let jeuxgratuits = require("./config/data/jeuxgratuits.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    RdmColor = Math.floor(Math.random() * 16777214) + 1;
    console.log(`Je suis connecté en tant que ${client.user.username} !`)
    client.user.setPresence({
        activity: {
            name: 'le village',
            type: "WATCHING",
        }
    });
});

// emojis
function emoji(id) {
    return client.emojis.get(id).toString();
}

// user mention
function getUserFromMention(mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
    }
}

// notificaitons
function notific(type) {
    if (type === "JeuxG") {
        if (!jeuxgratuits[message.author.id]) {
            jeuxgratuits[message.author.id] = 1
            fs.writeFile("./config/data/jeuxgratuits.json", JSON.stringify(vote), err => {
                if (err) throw err;
            });
            message.channel.send("Je vous l'ai activé !")
        } else {
            jeuxgratuits[message.author.id] = 0
            fs.writeFile("./config/data/jeuxgratuits.json", JSON.stringify(vote), err => {
                if (err) throw err;
            });
            message.channel.send("Je vous l'ai désactivé !")
        }
    } else { // type === "Jeux"
        // prochainement
    }
}

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('Je ne peux pas éxecuter cette commande dans les messages privés !');
    }

    if (command.args && !args.length) {
        let reply = `Vous n'avez fourni aucun argument, ${message.author}!`;
        if (command.usage) {
            reply += `\nL'usage approprié serait : \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    try {
        command.execute(message);
    } catch (error) {
        console.error(error);
        message.reply("Il y a eu une erreur en essayant d'exécuter cette commande !");
    }
});

client.on('message', message => {
    if (message.content === `${prefix}`) {
        message.channel.send(`Votre commande n'est pas dans le livre de la vie malheureusement...`);
    }
});


client.on('message', message => {

    // security
    if (message.author.bot) return;

    // bonjour
    BJ = ["bonjour", "salut", "hei", "guttentag", "hallo", "hola", "buenos días", "hey", "yo ", "yop", "coucou"];
    for (let i = 0; i < BJ.length; i++) {
        if (message.content.toLowerCase().includes(BJ[i])) {
            message.react("👋")
        };
    };

    // mdr lol ...
    LOL = ["mdr", "lol", "xd", "x)", "😂", "🤣", "😆"]
    for (let i2 = 0; i2 < LOL.length; i2++) {
        if (message.content.toLowerCase().includes(LOL[i2])) {
            hasard = Math.floor(Math.random() * 3) + 1;
            if (hasard === 1) {
                message.react("😂");
            } else if (hasard === 2) {
                message.react("🤣");
            } else {
                message.react("😆");
            };
        };
    };

    // help
    if (message.content.toLowerCase().startsWith(prefix + "help") || message.content.toLowerCase().startsWith(prefix + "aide")) {
        const arg = message.content.slice(prefix.length).split(' ');
        if (!arg[1]) {
            message.channel.send({
                embed: {
                    color: RdmColor,
                    thumbnail: {
                        url: "https://i.imgur.com/NN9dwjx.png"
                    },
                    author: {
                        name: message.guild.name + " | Commande d'aide",
                        icon_url: message.guild.iconURL()
                    },
                    title: "Voici la liste de mes commandes !\n­",
                    fields: [{
                        name: "`" + prefix + "suggestion [votre suggestion]`",
                        value: "Vous permet de faire une suggestion.\nVous pouvez aussi taper " + prefix + "s [suggestion]\n­"
                    }, {
                        name: "`" + prefix + "reset`",
                        value: "Permet de réinitialiser vos rôles de couleurs\n(Uniquement dans le salon <#733296042644078603>)\n­"
                    }],
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.avatarURL(),
                        text: "Demande d'aide demandé par " + message.author.tag
                    }
                }
            })
        } else if (arg[1].toLowerCase().startsWith("not")) {
            message.channel.send({
                embed: {
                    color: RdmColor,
                    author: {
                        name: message.guild.name + " | Commande de notifications (" + prefix + "notification)\n­",
                        icon_url: message.guild.iconURL()
                    },
                    title: "Affiche la liste de commande de notification à activer ou désactiver.\n­",
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.avatarURL(),
                        text: "Demande d'aide demandé par " + message.author.tag
                    }
                }
            })
        }
    };

    // suggestion
    if (message.content.toLowerCase().startsWith(prefix + "s")) {
        const arg = message.content.slice(prefix.length).split(' ');
        sug = ""
        for (let i5 = 1; i5 < arg.length; i5++) {
            if (i5 === 1) {
                sug = sug + arg[i5]
            } else {
                sug = sug + " " + arg[i5]
            }
        }
        message.react('✅')
        let jules = client.users.cache.get('448052818314526721')
        let remi = client.users.cache.get('278211495915945985')
        jules.send(`🔳 Nouvelle suggestion de ${message.author} : ${sug}`)
        remi.send(`🔳 Nouvelle suggestion de ${message.author} : ${sug}`)
        message.author.send(`✅ Votre suggestion a bien été reçue, et est actuellement en attente, d'ici peu je vous recontacterai pour vous informer si elle est acceptée ou refusée.`)
    }
    // accepted
    if (message.content.toLowerCase().startsWith(prefix + "acc")) {
        if (message.author.id !== "448052818314526721" || message.author.id !== "278211495915945985") return;
        const arg = message.content.slice(prefix.length).split(' ');
        sug = ""
        for (let i6 = 2; i6 < arg.length; i6++) {
            if (i6 === 2) {
                sug = sug + arg[i6]
            } else {
                sug = sug + " " + arg[i6]
            }
        }
        let jules = client.users.cache.get('448052818314526721')
        let remi = client.users.cache.get('278211495915945985')
        jules.send(`🎭 Vous avez accepté la suggestion de ${message.author} : ${sug}`)
        remi.send(`🎭 Vous avez accepté la suggestion de ${message.author} : ${sug}`)
        const personne = client.users.cache.get(`${arg[1]}`)
        personne.send(`😍 Félicitations ! Votre suggestion ("${sug}") a été retenue ! Si vous avez encore d'autres idées pour m'améliorer, n'hésitez pas.`)
        message.react('✅');
    };
    // refused
    if (message.content.toLowerCase().startsWith(prefix + "ref")) {
        if (message.author.id !== "448052818314526721" || message.author.id !== "278211495915945985") return;
        const arg = message.content.slice(prefix.length).split(' ');
        sug = ""
        for (let i7 = 2; i7 < arg.length; i7++) {
            if (i7 === 2) {
                sug = sug + arg[i7]
            } else {
                sug = sug + " " + arg[i7]
            }
        }
        let jules = client.users.cache.get('448052818314526721')
        let remi = client.users.cache.get('278211495915945985')
        jules.send(`🎭 Vous avez refusé la suggestion de ${message.author} : ${sug}`)
        remi.send(`🎭 Vous avez refusé la suggestion de ${message.author} : ${sug}`)
        const personne = client.users.cache.get(`${arg[1]}`)
        personne.send(`😔 Malheureusement, votre suggestion ("${sug}") n'a pas été retenue... Si jamais vous avez d'autres idées pour m'améliorer, sachez que je suis toujours à l'écoute.`)
        message.react('✅');
    };

    // colors
    if (message.channel.id === "733296042644078603") {
        if (message.author.bot) return;
        // data
        colors = ["bleu", "vert", "jaune", "orange", "rouge", "violet", "marron", "noir", "gris", "blanc"]
        colorsid = ["733636576495796246", "733984655174533190", "733984922221412374", "733985126261850112", "733985317828296724", "733985435738570782", "733985518190067772", "733991735293902849", "733991824129130578", "733991976260730942"]
            // main
        test = 0
        for (let i4 = 0; i4 < colors.length; i4++) {
            if (message.content.toLowerCase().startsWith(colors[i4])) {
                message.delete({
                    timeout: 100
                })
                test = 1
                    //let RoleCouleur = message.guild.roles.cache.find(role => role.name === colors[i4]);
                message.member.roles.add(colorsid[i4]);
                message.channel.send(`➕ Je vous ai donné votre rôle de couleur ${colors[i4]} ${message.author} !`).then(messageb => {
                    messageb.delete({
                        timeout: 5000
                    })
                })
            }
        }
        if (test === 0) {
            if (message.content.toLowerCase().startsWith(prefix + "reset") || message.content.toLowerCase().startsWith("reset")) {
                message.delete({
                    timeout: 100
                })
                for (let i3 = 0; i3 < colors.length; i3++) {
                    if (message.member.roles.cache.find(r => r.id === colorsid[i3])) {
                        message.member.roles.remove(colorsid[i3]);
                        message.channel.send(`➖ Je vous ai retiré le rôle de couleur ${colors[i3]} ${message.author} !`).then(messageb => {
                            messageb.delete({
                                timeout: 5000
                            })
                        })
                    }
                }
            } else {
                message.delete({
                    timeout: 100
                })
                message.channel.send(`⁉️ Je ne reconnais pas la couleur que vous nommez "${message.content}"...`).then(messageb => {
                    messageb.delete({
                        timeout: 5000
                    })
                })
            }
        };
    };

});

// login
client.login(process.env.TOKEN);