const { Client } = require('discord.js');
const bot = new Client({ disableEveryone: true });
const config = require('./assets/config.json');
const db = require('quick.db');
const settings = new db.table('settings');

bot.on('ready', () => {
console.log('I\'m ready!\nLogged in as: ' + bot.user.username);
/* Random Activity */
function randAc() {
let status = [`My prefix is: ${config.PREFIX}`,`with ${bot.users.cache.size} users!`];
let rand = Math.floor(Math.random() * status.length);
bot.user.setActivity(status[rand], { type: 'PLAYING' });
};
setInterval(randAc, 10 * 1000); // 10 seconds
});

bot.on('guildCreate', (guild) => {
settings.set(`guild.${guild.id}`, {
prefix: config.PREFIX,
mod_log: undefined,
auto_role: undefined,
auto_nick: undefined
});
console.log(`[${guild.name}] Data tersimpan.`);
});
bot.on('guildDelete', (guild) => {
settings.delete(`guild.${guild.id}`);
console.log(`[${guild.name}] Data terhapus.`);
});
bot.on('message', async (msg) => {

let message = msg.content.toLowerCase();
let args = msg.content.slice(config.PREFIX.length).trim().split(/ +/g);
let cmd = args.shift().toLowerCase();
let prefix;
let sender = msg.author;
if (settings.get('guild.'+ msg.guild.id).prefix) prefix = settings.get('guild.' + msg.guild.id).prefix;
else prefix = config.PREFIX;

if (message === `<@!${bot.user.id}>` || message === `<@${bot.user.id}>`) {
return message.channel.send(`Hai, prefixku adalah: \`\`${prefix}\`\``);
};

if (msg.author.bot) return;
if (msg.channel.type === 'dm') return;

try {
let commandFile = require(`./commands/${cmd}Command.js`);
commandFile.exec(bot, msg, args);
} catch(e) {
console.log(e.message);
} finally {
console.log(`[${sender.tag}] menggunakan perintah ${cmd}`);
}

});

bot.login(config.TOKEN);
