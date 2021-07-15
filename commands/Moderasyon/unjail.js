module.exports = {
    config: {
        name: "unjail",
        aliases: ["jailkaldır", "afjail", "jailaf"],
        usage: "<@Member || ID> <reason>",
        category: "Moderasyon",
        description: "ID girdiğiniz üyenin sunucuda jailini kaldırırsınız.",
        accessableby: "Jail hammer roles"
    },
    run: async(bot, message, args) => {
        let noem = bot.config.Embeds.noEmbed;
        let okem = bot.config.Embeds.okEmbed;
        let em = bot.ayar.Genel.infoemoji;
        let penaltime = bot.moment(message.createdAt).format("lll");
        let ayar = bot.ayar;
        let db = bot.moddb;

        let log = message.guild.channels.cache.get(ayar.Moderasyon.logkanal.jail) || message.guild.channels.cache.find(x => x.name === "jail-log");
        let rol = message.guild.roles.cache.get(ayar.Moderasyon.cezarol.jail);
        let pre = message.guild.roles.cache.get(ayar.Register.boosterrol);
        let unjail = message.guild.roles.cache.get(ayar.Moderasyon.cezarol.unjail);

        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.some(r => ayar.Moderasyon.yetkilirol.jail.includes(r.id))) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    title: noem.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Jaili sadece "Jail hammer" & "Yönetici" yetkisi olan kaldırabilir!**`,
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: noem.footer
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.splice(1).join(" ") || "NO REASON";

        if (!member || !member.roles.cache.has(rol.id)) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    title: noem.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Üyeyi belirtmedin, üye sunucuda yok veya cezalı değil!**`,
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: noem.footer
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        member.roles.cache.has(pre.id) ? member.roles.set([pre.id, unjail.id]) : member.roles.set([unjail.id]).catch();
        message.channel.send({
            embed: {
                color: okem.color,
                title: okem.title,
                description: `${bot.emojis.cache.get(em.yes) || "✔"} ${member.user.tag}(\`${member.id}\`) **sunucuda jaili kaldırıldı!**`,
                footer: {
                    icon_url: user.displayAvatarURL({ dynamic: true }),
                    text: okem.footer
                }
            }
        }).catch();

        log.send({
            embed: {
                color: okem.color,
                title: okem.title,
                description: `${bot.emojis.cache.get(em.yes) || "✔"} ${member.user.tag}(\`${member.id}\`) **sunucuda jaili kaldırıldı!**
                
                ● **Yetkili:** ${message.author}(\`${message.author.id}\`)
                ● **Sebep:** (\`${reason}\`)
                ● **Tarih:** (\`${penaltime}\`)`,
                footer: {
                    icon_url: message.author.displayAvatarURL({ dynamic: true }),
                    text: okem.footer
                }
            }
        }).catch();
    }
};