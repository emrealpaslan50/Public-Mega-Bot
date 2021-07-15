module.exports = {
    config: {
        name: "top-stats",
        aliases: ["topstats", "top-stat", "topstat", "top"],
        nousage: "",
        category: "Stats",
        description: "Sunucuda top stats bilginisine bakarsınız.",
        accessableby: "Üyeleri Yasakla"
    },
    run: async(bot, message, args) => {
        let db = bot.statsdb;

        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.channel.send(`❌ **Yetkin yok!**`).then(msg => msg.delete({ timeout: 5000 }))
        }

        let dataMessage = await db.get(`messageData`) || {};
        let dataVoice = await db.get(`voiceData`) || {};

        const topMessage = Object.keys(dataMessage).map(id => {
            return {
                userID: id,
                data: Object.values(dataMessage[id].channel || {}).reduce((a, b) => a + b, 0)
            }
        }).sort((a, b) => b.data - a.data).slice(0, 10).map((data, i) => `${message.guild.members.cache.get(data.userID)}: \`${data.data} Mesaj\``)

        const topVoice = Object.keys(dataVoice).map(id => {
            return {
                userID: id,
                data: Object.values(dataVoice[id].channel || {}).reduce((a, b) => a + b, 0)
            }
        }).sort((a, b) => b.data - a.data).slice(0, 10).map((data, i) => `${message.guild.members.cache.get(data.userID)}: \`${bot.moment.duration(data.data).format("M [Ay], W [Hafta], DD [Gün], HH [Saat], mm [Dakika], ss [Saniye]")}\``)

        message.channel.send({
            embed: {
                color: 0x2f3136,
                thumbnail: {
                    url: message.guild.iconURL({ dynamic: true })
                },
                title: message.guild.name + " top stats bilgi",
                fields: [{
                        name: "\`Text kanalları sıralaması ilk 10\`",
                        value: topMessage.length >= 1 ? topMessage : "Veri Yok!"
                    },
                    {
                        name: "\`Voice kanalları sıralaması ilk 10\`",
                        value: topVoice.length >= 1 ? topVoice : "Veri Yok!"
                    }
                ],
            }
        })
    }
};

//https://github.com/Niwren/niwren-stats-bot