module.exports = async(bot, message) => {
    if (message.author.bot || message.channel.type === "dm") return;
    const prefix = process.env.PREFIX;

    let db = bot.db;

    if (message.content.startsWith(prefix + "afk")) return;
    let afk = db.fetch(`widafk.${message.guild.id}.${message.author.id}`);
    if (!afk) return;
    if (afk.uye === "evet") {
        let süre = new Date().getTime() - afk.zaman;
        let sürem = bot.moment.duration(süre)
            .format("Y [yıl], M [ay], D [gün], H [saat], m [dakika], s [saniye]");
        message.reply("**AFK modundan çıktınız.**. `Afk kaldığınız süre:` **" + sürem + "**").then(message => message.delete({ timeout: 9000 }))
        db.delete(`widafk.${message.guild.id}.${message.author.id}`);
        if (!message.member.manageable) return;
        message.member.setNickname(afk.name).catch();
    }
    let USER = message.mentions.users.first();
    if (!USER) return;
    let afks = await db.fetch(`widafk.${message.guild.id}.${USER.id}`);

    if (afks.sebep) {
        let süre = new Date().getTime() - afks.zaman;
        let sürem = bot.moment.duration(süre)
            .format("Y [yıl], M [ay], D [gün], H [saat], m [dakika], s [saniye]");
        message.channel.send(`**${USER} kullanıcısı AFK, AFK süresi: \`${sürem}\` Sebep: \`${sebep}\`**`).then(message => message.delete({ timeout: 9000 }))
    }
}
module.exports.configs = {
    name: "message"
}