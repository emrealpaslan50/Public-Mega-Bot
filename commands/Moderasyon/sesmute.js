module.exports = {
    config: {
        name: "sesmute",
        aliases: ["voicemute", "vmute", "smute"],
        usage: "<@Member || ID> <reason>",
        category: "Moderasyon",
        description: "Etiketlediğiniz üyeyi sunucuda ses kanallarında susturursunuz.",
        accessableby: "Voice mute hammer roles"
    },
    run: async(bot, message, args) => {
        let noem = bot.config.Embeds.noEmbed;
        let okem = bot.config.Embeds.okEmbed;
        let em = bot.ayar.Genel.infoemoji;
        let ayar = bot.ayar;
        let db = bot.moddb;

        let log = message.guild.channels.cache.get(ayar.Moderasyon.logkanal.sesmute) || message.guild.channels.cache.find(x => x.name === "vmute-log");

        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.some(r => ayar.Moderasyon.yetkilirol.sesmute.includes(r.id))) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    title: noem.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Voice mute sadece "Voice mute hammer" & "Yönetici" yetkisi olan atabilir!**`,
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: noem.footer
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let time = args[1];
        let reason = args.splice(2).join(" ");

        if (!member || member.voice.serverMute) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    title: noem.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Üyeyi belirtmedin, üye sunucuda yok veya zaten muteli!**`,
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: noem.footer
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        if (bot.config.OWNER.includes(member.id) || (message.member.roles.highest.position <= member.roles.highest.position)) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    title: noem.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Bu üyeyi mute atamassın!**`,
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
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Kendine mute atamassın!**`,
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: noem.footer
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        if (!time || !reason) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    title: noem.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Lütfen süre ve sebep belirt, @member <\`1m, 1h, 1d\`> <reason>!**`,
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: noem.footer
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        let penaltime = bot.moment(message.createdAt).format("lll");
        let penalno = db.fetch(`penalno.${message.guild.id}`) + 1;
        db.add(`penalno.${message.guild.id}`, +1);

        member.voice.setMute(true).catch();

        db.set(`penal.${penalno}.${message.guild.id}`, {
            no: penalno,
            type: "Voice-Mute",
            time: penaltime,
            reason: reason,
            suspended: member.id,
            author: message.author.id

        });
        db.push(`penals.${message.guild.id}`, {
            no: penalno,
            type: "Voice-Mute",
            time: penaltime,
            reason: reason,
            suspended: member.id

        });
        db.set(`vmute.${message.guild.id}.${member.id}`, time)

        message.channel.send({
            embed: {
                color: okem.color,
                title: okem.title,
                description: `${bot.emojis.cache.get(em.yes) || "✔"} ${member} **sunucuda ses kanallarında susturuldu!**`,
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
                description: `${bot.emojis.cache.get(em.yes) || "✔"} ${member}(\`${member.id}\`) **sunucuda ses kanallarında susturuldu!**
                
                ● **Yetkili:** ${message.author}(\`${message.author.id}\`)
                ● **Sebep:** (\`${reason}\`)
                ● **Süre:** (\`${time}\`)
                ● **Tarih:** (\`${penaltime}\`)
                ● **Ceza ID:** (\`#${penalno}\`)`,
                footer: {
                    icon_url: message.author.displayAvatarURL({ dynamic: true }),
                    text: okem.footer
                }
            }
        });

        setTimeout(() => {
            db.delete(`vmute.${message.guild.id}.${member.id}`);
            if (!member.voice.serverMute) return;
            member.voice.setMute(false).catch();
            log.send({
                embed: {
                    color: okem.color,
                    title: okem.title,
                    description: `${bot.emojis.cache.get(em.yes) || "✔"} ${member}(\`${member.id}\`) **sunucuda ses kanallarında susturma cezası bitt!**`,
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: okem.footer
                    }
                }
            });
        }, bot.ms(time));
    }
};