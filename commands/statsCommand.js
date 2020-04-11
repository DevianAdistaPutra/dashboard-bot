const { MessageEmbed } = require('discord.js');
const os = require('os');

module.exports.exec = async (bot, msg, args) => {
    let model = os.cpus()[0].model;
    let ping = bot.ws.ping;

    const embed = new MessageEmbed()
    .setTitle(`${bot.user.username} Information's`)
    .setThumbnail(bot.user.displayAvatarURL())
    .setDescription(`
      **• System**
      \`\`\`css\n
      - Model: ${model}
      - Websocket Ping: ${ping}
      - Presence Status: ${bot.presence.status}
      \`\`\`
    `)
    .setFooter(`• Request: ${msg.author.tag}`);
message.channel.send({ embed });
};
