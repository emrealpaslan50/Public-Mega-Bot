module.exports = {
    config: {
        name: "kalkmazjail",
        aliases: ["permajail"],
        usage: "<@Member || ID> (reason)",
        category: "Moderasyon",
        description: "Etiketlediğiniz üyeyi sunucuda kalıcı jail atarsınız.",
        accessableby: "Jail hammer roles"
    },
    run: async(bot, message, args) => {
        let noem = bot.config.Embeds.noEmbed;
        let okem = bot.config.Embeds.okEmbed;
        let em = bot.ayar.Genel.infoemoji;
        let ayar = bot.ayar;
        let db = bot.moddb;

        let log = message.guild.channels.cache.get(ayar.Moderasyon.logkanal.jail) || message.guild.channels.cache.find(x => x.name === "jail-log");
        let rol = message.guild.roles.cache.get(ayar.Moderasyon.cezarol.jail);
        let pre = message.guild.roles.cache.get(ayar.Register.boosterrol);

        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.some(r => ayar.Moderasyon.yetkilirol.jail.includes(r.id))) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    title: noem.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Jail sadece "Jail hammer" & "Yönetici" yetkisi olan atabilir!**`,
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: noem.footer
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.splice(1).join(" ") || "NO REASON";

        if (!member || member.roles.cache.has(rol.id)) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    title: noem.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Üyeyi belirtmedin, üye sunucuda yok veya zaten jailli!**`,
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: noem.footer
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        if (bot.config.OWNER.includes(member.id) || !member.managed || (message.member.roles.highest.position <= member.roles.highest.position)) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    title: noem.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Bu üyeyi jail atamassın!**`,
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
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Kendine jail atamassın!**`,
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

        member.roles.cache.has(pre.id) ? member.roles.set([pre.id, rol.id]) : member.roles.set([rol.id]).catch();

        db.set(`penal.${penalno}.${message.guild.id}`, {
            no: penalno,
            type: "Jail",
            time: penaltime,
            reason: reason,
            suspended: member.id,
            author: message.author.id

        });
        db.push(`penals.${message.guild.id}`, {
            no: penalno,
            type: "Jail",
            time: penaltime,
            reason: reason,
            suspended: member.id

        });

        db.set(`jail.${message.guild.id}.${member.id}`, "yes");

        message.channel.send({
            embed: {
                color: okem.color,
                title: okem.title,
                description: `${bot.emojis.cache.get(em.yes) || "✔"} ${member} **sunucuda jaile atıldı!**`,
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
                description: `${bot.emojis.cache.get(em.yes) || "✔"} ${member}(\`${member.id}\`) **sunucuda jaile atıldı!**
                
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