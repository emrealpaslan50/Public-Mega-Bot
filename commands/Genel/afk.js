module.exports = {
    config: {
        name: "afk",
        noaliases: [],
        usage: "(sebep)",
        category: "Genel",
        description: "Sunucuda afk olursunuz.",
        accessableby: "Herkes"
    },
    run: async(bot, message, args) => {
        let db = bot.db;

        let afk = await db.get(`widafk.${message.guild.id}.${message.author.id}`);
        if (afk) return;
        let sebep = args.join(" ") || "Sebep Yok";
        let reklamlar = [
            "discord.app", "discord.gg", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"
        ];
        if (reklamlar.some(word => message.content.toLowerCase().includes(word))) {
            message.reply(`⛔**Uyanık seni bu komutlar reklam yapacaktın demi :D**`).then(message => message.delete({ timeout: 9000 }));
        } else {
            let widtime = new Date().getTime();
            let b = message.member.displayName;
            await db.set(`widafk.${message.guild.id}.${message.author.id}`, {
                uye: "evet",
                name: b,
                zaman: widtime,
                sebep: sebep
            });
            let a = await db.get(`widafk.${message.guild.id}.${message.author.id}`).sebep;
            message.reply(`**Başarıyla \`${a}\` Sebebi İle AFK Oldunuz!**`).then(message => message.delete({ timeout: 9000 }));
            if (!message.member.manageable) return;
            message.member.setNickname(`[AFK] ` + b);
        }
    }
};