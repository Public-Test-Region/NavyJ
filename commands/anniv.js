module.exports = {
  name: 'anniv',
  description: "Donne la date d'anniversaire d 'une personne",
  args: true,
  usage: '<nom de la personne>',
  execute(message, args) {
    if (args[0] === 'Tailongwan') {
      return message.channel.send('Louis Oudard est né le **19 Mai**. ');
    }
    if (args[0] === 'foo') {
      return message.channel.send('bar');
    }

    message.channel.send(`Désolé, je ne connais pas : ${args[0]}`);
  },
};
