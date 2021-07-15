module.exports = {
        config: {
            name: "stats",
            aliases: ["stat", "me", "ben"],
            nousage: "",
            category: "Stats",
            description: "Sunucuda stats bilginize bakarsınız.",
            accessableby: "@everyone"
        },
        run: async(bot, message, args) => {
                let db = bot.statsdb;
                let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
                let user = bot.users.cache.get(member.id);

                let dataMessage = await db.get(`messageData.${member.id}.channel`) || {};
                let dataVoice = await db.get(`voiceData.${member.id}.channel`) || {};

                let messageData = Object.keys(dataMessage).map(id => {
                    return {
                        channelID: id,
                        totalMessage: dataMessage[id]
                    }
                }).sort((a, b) => b.totalMessage - a.totalMessage);

                let voiceData = Object.keys(dataVoice).map(id => {
                    return {
                        channelID: id,
                        totalTime: dataVoice[id]
                    }
                }).sort((a, b) => b.totalTime - a.totalTime);

                let dataMessage0 = await db.get(`messageData.${member.id}.times`) || [{ time: 0, puan: 0 }, { time: 0, puan: 0 }];
                let dataVoice0 = await db.get(`voiceData.${member.id}.times`) || [{ time: 0, puan: 0 }, { time: 0, puan: 0 }];

                let messageData0 = Object.values(dataMessage0).map(id => {
                    return {
                        time: id.time,
                        puan: id.puan
                    };
                })
                let voiceData0 = Object.values(dataVoice0).map(id => {
                    return {
                        time: id.time,
                        puan: id.puan
                    };
                })

                let message14 = messageData0.filter(data => (Date.now() - (86400000 * 30)) < data.time).reduce((a, b) => a + b.puan, 0);
                let message7 = messageData0.filter(data => (Date.now() - (86400000 * 7)) < data.time).reduce((a, b) => a + b.puan, 0);
                let message24 = messageData0.filter(data => (Date.now() - 86400000) < data.time).reduce((a, b) => a + b.puan, 0);
                let totalmessage = messageData0.filter(data => (Date.now())).reduce((a, b) => a + b.puan, 0);

                let ses14 = voiceData0.filter(data => (Date.now() - (86400000 * 30)) < data.time).reduce((a, b) => a + b.puan, 0);
                let ses7 = voiceData0.filter(data => (Date.now() - (86400000 * 7)) < data.time).reduce((a, b) => a + b.puan, 0);
                let ses24 = voiceData0.filter(data => (Date.now() - 86400000) < data.time).reduce((a, b) => a + b.puan, 0);
                let totalVoice = voiceData0.filter(data => (Date.now())).reduce((a, b) => a + b.puan, 0);

                message.channel.send({
                            embed: {
                                color: 0x2f3136,
                                thumbnail: {
                                    url: user.displayAvatarURL({ dynamic: true })
                                },
                                title: user.username + " stats bilgi",
                                description: `${member} - (${member.id})\n\nSon 14 Gün içindeki kullanıcı ses ve chat istatistikleri.
                   
                \`Genel ses istatistikleri:\` ${bot.moment.duration(totalVoice).format("HH [Saat], mm [Dakika]")} 
                \`Genel text istatistikleri:\` ${totalmessage} mesaj
               
               
                \`Günlük Ses Ve Text İstatistikleri:\`
                ⦁ **Text**: ${message24} mesaj
                ⦁ **Voice**: ${bot.moment.duration(ses24).format("HH [Saat], mm [Dakika]")} 
               \`Haftalık Ses Ve Text İstatistikleri:\`
                ⦁ **Text**: ${message7} mesaj
                ⦁ **Voice**: ${bot.moment.duration(ses7).format("HH [Saat], mm [Dakika]")} 
               \`Aylık Ses Ve Text İstatistikleri:\` 
                ⦁ **Text**: ${message14} mesaj
                ⦁ **Voice**: ${bot.moment.duration(ses14).format("HH [Saat], mm [Dakika]")} 
               
               \` Aktif Olduğu Ses kanalı\` ${voiceData[0] ? `<#${voiceData[0].channelID}>` : 'Veri Yok!'}: \`${voiceData[0] ? bot.moment.duration(voiceData[0].totalTime).format("HH [Saat], mm [Dakika]") : 'Veri Yok!'}\`
               \` Aktif Olduğu Text kanalı\` ${messageData[0] ? `<#${messageData[0].channelID}>` : "Veri Yok"}: \`${messageData[0] ? messageData[0].totalMessage : 0} Mesaj\``
            }
        })
    }
};

//https://github.com/Niwren/niwren-stats-bot