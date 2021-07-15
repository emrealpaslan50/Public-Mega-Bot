module.exports = {
    config: {
        name: "ban",
        aliases: ["yasakla", "uçur", "banla", "yargı"],
        usage: "<@Member || ID> (reason)",
        category: "Moderasyon",
        description: "Etiketlediğiniz üyeyi sunucudan yasaklarsınız.",
        accessableby: "Ban hammer roles"
    },
    run: async(bot, message, args) => {
        let noem = bot.config.Embeds.noEmbed;
        let okem = bot.config.Embeds.okEmbed;
        let em = bot.ayar.Genel.infoemoji;
        let ayar = bot.ayar;
        let db = bot.moddb;

        let log = message.guild.channels.cache.get(ayar.Moderasyon.logkanal.ban) || message.guild.channels.cache.find(x => x.name === "ban-log");

        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.some(r => ayar.Moderasyon.yetkilirol.ban.includes(r.id))) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    title: noem.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Banı sadece "Ban hammer" & "Yönetici" yetkisi olan atabilir!**`,
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: noem.footer
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.splice(1).join(" ") || "NO REASON";

        if (!member) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    title: noem.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Üyeyi belirtmedin veya üye sunucuda yok!**`,
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: noem.footer
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        if (bot.config.OWNER.includes(member.id) || !member.bannable || (message.member.roles.highest.position <= member.roles.highest.position)) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    title: noem.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Bu üyeye ban atamassın!**`,
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: noem.footer
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        if (message.author.id === member.id) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    title: noem.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Kendine ban atamassın!**`,
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: noem.footer
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        let penaltime = bot.moment(message.createdAt).format("lll");
        let penalno = db.fetch(`penalno.${message.guild.id}`) || 1;
        db.add(`penalno.${message.guild.id}`, +1);

        message.guild.members.ban(member, { days: 7, reason: reason }).catch();

        db.set(`penal.${penalno}.${message.guild.id}`, {
            no: penalno,
            type: "Ban",
            time: penaltime,
            reason: reason,
            suspended: member.id,
            author: message.author.id

        });
        db.push(`penals.${message.guild.id}`, {
            no: penalno,
            type: "Ban",
            time: penaltime,
            reason: reason,
            suspended: member.id,
            author: message.author.id

        });

        message.channel.send({
            embed: {
                color: okem.color,
                title: okem.title,
                description: `${bot.emojis.cache.get(em.yes) || "✔"} ${member} **sunucudan yasaklandı!**`,
                footer: {
                    icon_url: message.author.displayAvatarURL({ dynamic: true }),
                    text: okem.footer
                }
            }
        });

        log.send({
            embed: {
                color: okem.color,
                title: okem.title,
                description: `${bot.emojis.cache.get(em.yes) || "✔"} ${member}(\`${member.id}\`) **sunucudan yasaklandı!**
                
                ● **Yetkili:** ${message.author}(\`${message.author.id}\`)
                ● **Sebep:** (\`${reason}\`)
                ● **Tarih:** (\`${penaltime}\`)
                ● **Ceza ID:** (\`#${penalno}\`)`,
                footer: {
                    icon_url: message.author.displayAvatarURL({ dynamic: true }),
                    text: okem.footer
                }
            }
        })
    }
};