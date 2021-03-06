const fs = require('fs');
const Discord = require(`discord.js`);
const config = require("./config/config.json");
let prefix = config.prefix;

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
            name: 'son village',
            type: "WATCHING",
        },
        status: "idle"
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

client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.guildOnly && msg.channel.type !== 'text') {
        return msg.reply('Je ne peux pas éxecuter cette commande dans les messages privés !');
    }

    if (command.args && !args.length) {
        let reply = `Vous n'avez fourni aucun argument, ${msg.author}!`;
        if (command.usage) {
            reply += `\nL'usage approprié serait : \`${prefix}${command.name} ${command.usage}\``;
        }

        return msg.channel.send(reply);
    }

    try {
        command.execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.reply("Il y a eu une erreur en essayant d'exécuter cette commande !");
    }
});

client.on('message', msg => {
    if (msg.content === `${prefix}`) {
        msg.channel.send(`Votre commande n'est pas inscrite dans le fichier des sudoers. Cet incident sera signalé.`);
    }
});


client.on('message', msg => {

    // security
    if (msg.author.bot) return;

    // bonjour
    BJ = ["bonjour", "salut", "hei", "guttentag", "hallo", "hola", "buenos días", "hey", "yo ", "yop", "coucou"];
    for (let i = 0; i < BJ.length; i++) {
        if (msg.content.toLowerCase().includes(BJ[i])) {
            msg.react("👋")
        };
    };

    // mdr lol ...
    LOL = ["mdr", "lol", "xd", "x)", "😂", "🤣", "😆"]
    for (let i2 = 0; i2 < LOL.length; i2++) {
        if (msg.content.toLowerCase().includes(LOL[i2])) {
            hasard = Math.floor(Math.random() * 3) + 1;
            if (hasard === 1) {
                msg.react("😂");
            } else if (hasard === 2) {
                msg.react("🤣");
            } else {
                msg.react("😆");
            };
        };
    };

    // suggestion
    if (msg.content.toLowerCase().startsWith(prefix + "s")) {
        const arg = msg.content.slice(prefix.length).split(' ');
        sug = ""
        for (let i5 = 1; i5 < arg.length; i5++) {
            if (i5 === 1) { sug = sug + arg[i5] } else { sug = sug + " " + arg[i5] }
        }
        msg.react('✅')
        let jules = client.users.cache.get('448052818314526721')
        jules.send(`🔳 Suggestion de ${msg.author} : ${sug}`)
        msg.author.send(`✅ Votre suggestion a bien été reçue, et est actuellement en attente, d'ici peu je vous recontacterai pour vous informer si elle est acceptée ou refusée.`)
    }
    // accepted
    if (msg.content.toLowerCase().startsWith(prefix + "acc")) {
        if (msg.author.id !== "448052818314526721") return;
        const arg = msg.content.slice(prefix.length).split(' ');
        sug = ""
        for (let i6 = 2; i6 < arg.length; i6++) {
            if (i6 === 2) { sug = sug + arg[i6] } else { sug = sug + " " + arg[i6] }
        }
        const personne = client.users.cache.get(`${arg[1]}`)
        personne.send(`😍 Félicitations ! Votre suggestion ("${sug}") a été retenue ! Si vous avez encore d'autres idées pour m'améliorer, n'hésitez pas.`)
        msg.react('✅');
    };
    // refused
    if (msg.content.toLowerCase().startsWith(prefix + "ref")) {
        if (msg.author.id !== "448052818314526721") return;
        const arg = msg.content.slice(prefix.length).split(' ');
        sug = ""
        for (let i7 = 2; i7 < arg.length; i7++) {
            if (i7 === 2) { sug = sug + arg[i7] } else { sug = sug + " " + arg[i7] }
        }
        const personne = client.users.cache.get(`${arg[1]}`)
        personne.send(`😔 Malheureusement, votre suggestion ("${sug}") n'a pas été retenue... Si jamais vous avez d'autres idées pour m'améliorer, sachez que je suis toujours à l'écoute.`)
        msg.react('✅');
    };

    // colors
    if (msg.channel.id === "733296042644078603") {
        if (msg.author.bot) return;
        // data
        colors = ["bleu", "vert", "jaune", "orange", "rouge", "violet", "marron", "noir", "gris", "blanc"]
        colorsid = ["733636576495796246", "733984655174533190", "733984922221412374", "733985126261850112", "733985317828296724", "733985435738570782", "733985518190067772", "733991735293902849", "733991824129130578", "733991976260730942"]
            // main
        test = 0
        for (let i4 = 0; i4 < colors.length; i4++) {
            if (msg.content.toLowerCase().startsWith(colors[i4])) {
                msg.delete({ timeout: 100 })
                test = 1
                    //let RoleCouleur = msg.guild.roles.cache.find(role => role.name === colors[i4]);
                msg.member.roles.add(colorsid[i4]);
                msg.channel.send(`➕ Je vous ai donné votre rôle de couleur ${colors[i4]} ${msg.author} !`).then(msgb => {
                    msgb.delete({ timeout: 5000 })
                })
            }
        }
        if (test === 0) {
            if (msg.content.toLowerCase().startsWith(prefix + "reset") || msg.content.toLowerCase().startsWith("reset")) {
                msg.delete({ timeout: 100 })
                for (let i3 = 0; i3 < colors.length; i3++) {
                    if (msg.member.roles.cache.find(r => r.id === colorsid[i3])) {
                        msg.member.roles.remove(colorsid[i3]);
                        msg.channel.send(`➖ Je vous ai retiré le rôle de couleur ${colors[i3]} ${msg.author} !`).then(msgb => {
                            msgb.delete({ timeout: 5000 })
                        })
                    }
                }
            } else {
                msg.delete({ timeout: 100 })
                msg.channel.send(`⁉️ Je ne reconnais pas la couleur que vous nommez "${msg.content}"...`).then(msgb => {
                    msgb.delete({ timeout: 5000 })
                })
            }
        };
    };

});

// login
client.login(process.env.TOKEN);