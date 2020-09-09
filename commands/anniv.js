module.exports = {
  name: 'anniv',
  description: "Donne la date d'anniversaire d 'une personne",
  args: true,
  usage: '<nom de la personne>',
  execute(message, args) {
    if (args[0] === 'Tailongwan') {
      return message.channel.send('Louis Oudard est né le **19 Mai**. ');
    }
    if (args[0] === 'Segronard') {
      return message.channel.send('Léonard Seguin est né le **29 Septembre**. ');
    }
    if (args[0] === 'foo') {
      return message.channel.send('bar');
    }
    if (args[0] === 'Slc') {
      return message.channel.send('Sacha Lévi est né le **23 Janvier**. ');
    }

    message.channel.send(`Désolé, je ne connais pas : ${args[0]}`);
  },
};
