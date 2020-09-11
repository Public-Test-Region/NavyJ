module.exports = {
    name: 'admin',
    description: "Donne la permission Admin sur LCD",
    args: true,
    usage: '<on/off>',
    execute(message, args) {
        if (message.guild.id !== "684843725914112052") return;
        message.channel.send("Ok, c'est fait !")
        let Gudene = message.guild.roles.cache.get("685191626771267690");
        if (args[0].toLowerCase() === 'on') {
            Gudene.setPermissions([ADMINISTRATOR = true])
        } else { Gudene.setPermissions([ADMINISTRATOR = false]) }
    },
};