module.exports = {
    config: {
        name: "stats-sıfırla",
        aliases: ["statsrestart", "statsdelete"],
        usage: "<hepsi - yazı - ses>",
        category: "Stats",
        description: "Sunucuda top stats bilgilerini sıfırlarsınız.",
        accessableby: "Bot Owner & Guild Owner"
    },
    run: async(bot, message, args) => {
        let db = bot.statsdb;

        if (!bot.config.OWNER.includes(message.author.id) || !message.guild.owner) {
            return message.channel.send(`❌ **Yetkin yok!**`).then(msg => msg.delete({ timeout: 5000 }))
        }

        if (!args[0]) return message.channel.send("❌ **Geçerli bir argüman belirt!**\nArgümanlar: (`hepsi` / `yazı` / `ses`)").then(msg => msg.delete({ timeout: 5000 }))

        if (args[0] == "hepsi") {
            db.delete(`messageData`);
            db.delete(`voiceData`);
            return message.channel.send(`Sunucudaki Tüm Veriler Başarılı Bir Şekilde Sıfırlandı.`).then(msg => msg.delete({ timeout: 5000 }))
        } else if (args[0] == "yazı") {
            db.delete(`messageData`);
            return message.channel.send(`Sunucudaki Tüm Yazı Verileri Başarılı Bir Şekilde Sıfırlandı.`).then(msg => msg.delete({ timeout: 5000 }))
        } else if (args[0] == "ses") {
            db.delete(`voiceData`);
            return message.channel.send(`Sunucudaki Tüm Ses Verileri Başarılı Bir Şekilde Sıfırlandı.`).then(msg => msg.delete({ timeout: 5000 }))
        }
    }
};

//https://github.com/Niwren/niwren-stats-bot