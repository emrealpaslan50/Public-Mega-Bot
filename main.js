require('dotenv').config();
require('moment-duration-format');

const { Client, Collection } = require('discord.js'),
    bot = new Client({
        fetchAllMembers: false,
    });
const { Database } = require('ark.db'),
    data = new Database("./database/data.json"),
    registerdata = new Database("./database/register.json"),
    moderasyondata = new Database("./database/moderasyon.json"),
    statsdata = new Database("./database/stats.json");


bot.config = require('./Settings/bot');
bot.ayar = require('./Settings/ayar');
bot.db = data;
bot.regdb = registerdata;
bot.moddb = moderasyondata;
bot.statsdb = statsdata;
bot.fs = require('fs');
bot.chalk = require('chalk');
bot.moment = require('moment');
bot.moment.locale('tr');
bot.ms = require('ms');
bot.guildInvites = new Map();
bot.commands = new Collection();
bot.aliases = new Collection();

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["command", "event", "invite"].forEach(x => require(`./handler/${x}`)(bot));

bot.categories = bot.fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});

Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)]
}; //Random prototype

bot.login(process.env.TOKEN).catch(saiyanix => console.log(bot.chalk.bgRedBright("Discorda giriş yaparken hata oldu;" + saiyanix)));
///--Discord apiye bağlantı--//

process.on("unhandledRejection", error => {
    //console.error(bot.chalk.bgRedBright('Hata:', error));
});
