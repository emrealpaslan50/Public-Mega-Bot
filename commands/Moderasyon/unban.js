module.exports = {
    config: {
        name: "unban",
        aliases: ["yasakkaldır", "afban", "banaf"],
        usage: "<ID> (reason)",
        category: "Moderasyon",
        description: "ID girdiğiniz üyenin sunucuda yasağını kaldırırsınız.",
        accessableby: "Ban hammer roles"
    },
    run: async(bot, message, args) => {
        let noem = bot.config.Embeds.noEmbed;
        let okem = bot.config.Embeds.okEmbed;
        let em = bot.ayar.Genel.infoemoji;
        let ayar = bot.ayar;
        let penaltime = bot.moment(message.createdAt).format("lll");
        let db = bot.moddb;

        let log = message.guild.channels.cache.get(ayar.Moderasyon.logkanal.ban) || message.guild.channels.cache.find(x => x.name === "ban-log");

        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.some(r => ayar.Moderasyon.yetkilirol.ban.includes(r.id))) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    title: noem.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Banı sadece "Ban hammer" & "Yönetici" yetkisi olan açabilir!**`,
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: noem.footer
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        let member = args[0];

        if (!member) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    title: noem.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Üyeyi belirtmedin!**`,
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: noem.footer
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        let kalkmaz = db.get(`permaban.${message.guild.id}.${member}`)
        let reason = args.splice(1).join(" ") || "NO REASON";

        if (kalkmaz === "yes") {
            if (message.member.permissions.has("ADMINISTRATOR")) {
                message.guild.members.unban(member).then(user => {
                    db.delete(`permaban.${message.guild.id}.${user.id}`);
                    message.channel.send({
                        embed: {
                            color: okem.color,
                            title: okem.title,
                            description: `${bot.emojis.cache.get(em.yes) || "✔"} ${user.tag}(\`${user.id}\`) **sunucudan yasağı kaldırıldı!**`,
                            footer: {
                                icon_url: user.displayAvatarURL({ dynamic: true }),
                                text: okem.footer
                            }
                        }
                    });

                    log.send({
                        embed: {
                            color: okem.color,
                            title: okem.title,
                            description: `${bot.emojis.cache.get(em.yes) || "✔"} ${user.tag}(\`${user.id}\`) **sunucudan yasağı kaldırıldı!**
                        
                        ● **Yetkili:** ${message.author}(\`${message.author.id}\`)
                        ● **Sebep:** (\`${reason}\`)
                        ● **Tarih:** (\`${penaltime}\`)`,
                            footer: {
                                icon_url: message.author.displayAvatarURL({ dynamic: true }),
                                text: okem.footer
                            }
                        }
                    })
                }).catch(() => message.channel.send({
                    embed: {
                        color: noem.color,
                        title: noem.title,
                        description: `${bot.emojis.cache.get(em.no) || "❌"} **Üye sunucuda yasaklı değil!**`,
                        footer: {
                            icon_url: message.author.displayAvatarURL({ dynamic: true }),
                            text: noem.footer
                        }
                    }
                }).then(a => a.delete({ timeout: 9000 })));
            } else {
                return message.channel.send({
                    embed: {
                        color: noem.color,
                        title: noem.title,
                        description: `${bot.emojis.cache.get(em.no) || "❌"} **Bu üye perma ban yediği için sen kaldıramassın "Yönetici" kaldırabilir!**`,
                        footer: {
                            icon_url: message.author.displayAvatarURL({ dynamic: true }),
                            text: noem.footer
                        }
                    }
                }).then(a => a.delete({ timeout: 9000 }));
            }
            return;
        }

        message.guild.members.unban(member).then(user => {

            message.channel.send({
                embed: {
                    color: okem.color,
                    title: okem.title,
                    description: `${bot.emojis.cache.get(em.yes) || "✔"} ${user.tag}(\`${user.id}\`) **sunucudan yasağı kaldırıldı!**`,
                    footer: {
                        icon_url: user.displayAvatarURL({ dynamic: true }),
                        text: okem.footer
                    }
                }
            });

            log.send({
                embed: {
                    color: okem.color,
                    title: okem.title,
                    description: `${bot.emojis.cache.get(em.yes) || "✔"} ${user.tag}(\`${user.id}\`) **sunucudan yasağı kaldırıldı!**
                
                ● **Yetkili:** ${message.author}(\`${message.author.id}\`)
                ● **Sebep:** (\`${reason}\`)
                ● **Tarih:** (\`${penaltime}\`)`,
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: okem.footer
                    }
                }
            })
        }).catch(() => message.channel.send({
            embed: {
                color: noem.color,
                title: noem.title,
                description: `${bot.emojis.cache.get(em.no) || "❌"} **Üye sunucuda yasaklı değil!**`,
                footer: {
                    icon_url: message.author.displayAvatarURL({ dynamic: true }),
                    text: noem.footer
                }
            }
        }).then(a => a.delete({ timeout: 9000 })));
    }
};