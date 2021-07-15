module.exports = {
    config: {
        name: "say",
        aliases: ["say2"],
        nousage: "",
        category: "Register",
        nodescription: "",
        accessableby: "Kayıt yetkilisi"
    },
    run: async(bot, message, args) => {
        let embişx = bot.config.Embeds;
        let em = bot.ayar.Genel.infoemoji;
        let ayar = bot.ayar.Register;

        if (!ayar.teyitcirol || !ayar.tag) return message.channel.send({
            embed: {
                color: embişx.noEmbed.color,
                title: embişx.noEmbed.title,
                description: `${bot.emojis.cache.get(em.no) || "❌"} **Kayıt sistemi ayarlı değil!**`,
                timestamp: new Date(),
                footer: {
                    icon_url: message.author.displayAvatarURL({ dynamic: true }),
                    text: embişx.noEmbed.footer
                }
            }
        }).then(msg => msg.delete({ timeout: 9000 })).catch();

        if (!message.member.roles.cache.has(ayar.teyitcirol) && !message.member.permissions.has("ADMINISTRATOR")) return;

        let voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
        let count = 0;
        for (let [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
        let taglı = message.guild.members.cache.filter(m => m.user.username.includes(ayar.tag)).size || "0";
        let gün = message.guild.members.cache.filter(s => new Date().getTime() - s.joinedAt.getTime() < 1 * 24 * 60 * 60 * 1000).size || "0";
        let hafta = message.guild.members.cache.filter(s => new Date().getTime() - s.joinedAt.getTime() < 7 * 24 * 60 * 60 * 1000).size || "0";
        let hafta2 = message.guild.members.cache.filter(s => new Date().getTime() - s.joinedAt.getTime() < 15 * 24 * 60 * 60 * 1000).size || "0";
        let ay = message.guild.members.cache.filter(s => new Date().getTime() - s.joinedAt.getTime() < 30 * 24 * 60 * 60 * 1000).size || "0";
        let boost = `‣Takviye    :: ${message.guild.premiumSubscriptionCount}`;
        let boosts = `‣Seviye     :: ${message.guild.premiumTier}`;
        let total = message.guild.memberCount;
        let botlan = message.guild.members.cache.filter(s => s.bot).size || "0";
        let aktif = message.guild.members.cache.filter(u => u.presence.status != "offline").size || "0";

        let sgiris = `‣1 Gün      :: ${gün} üye katılmış.\n‣1 hafta    :: ${hafta} üye katılmış.\n‣2 Hafta    :: ${hafta2} üye katılmış.\n‣1 Ay       :: ${ay} üye katılmış.`;
        let boostinfo = `${boost}\n${boosts}`

        let genel = `Toplam Üye  :: ${total}\nAktif Üye   :: ${aktif}\nSesli Üye   :: ${count}\nTaglı Üye   :: ${taglı}\nBot Sayısı  :: ${botlan}`;

        message.channel.send({
            embed: {
                color: 0x2f3136,
                thumbnail: {
                    url: message.guild.iconURL({ dynamic: true })
                },
                title: message.guild.name,
                description: `**Sunucu hakkında bilgiler aşağıda yer almaktadır.**`,
                fields: [{
                        name: "Sunucu üye bilgisi",
                        value: "```asciidoc\n" + genel + "```"
                    },
                    {
                        name: "Sunucu ziyaret bilgisi",
                        value: "```asciidoc\n" + sgiris + "```"
                    },
                    {
                        name: "Boost bilgisi",
                        value: "```asciidoc\n" + boostinfo + "```"
                    }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: message.author.displayAvatarURL({ dynamic: true }),
                    text: embişx.noEmbed.footer
                }
            }
        })

    }

};