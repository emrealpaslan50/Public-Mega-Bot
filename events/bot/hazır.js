const invites = {};

const wait = require("util").promisify(setTimeout);

module.exports = async bot => {
    if (!bot.config.GUILD_ID) return console.log(bot.chalk.bgRedBright("Sunucu ID ayarlı değil o yüzden giriş yapamadım!"));
    if (!bot.guilds.cache.get(bot.config.GUILD_ID)) return console.log(bot.chalk.bgRedBright("Sunucu ID ayarlı ama sunucuda olmadığım o yüzden giriş yapamadım!"));
    console.log(bot.chalk.bgGreenBright("🤖 " + bot.user.username + " adıyla discord giriş yaptım!"));
    bot.user.setPresence(bot.config.durum);
    let widkanalXD = bot.channels.cache.get(bot.config.VOICE);
    if (!widkanalXD) return;
    if (widkanalXD) widkanalXD.join().catch(() => console.error(bot.chalk.redBright(`Bot ses kanalına bağlanamadı :( `)));
    wait(1000);

    bot.guilds.forEach(g => {
        g.fetchInvites().then(guildInvites => {
            invites[g.id] = guildInvites;
        });
    });
}
module.exports.configs = {
    name: "ready"
}