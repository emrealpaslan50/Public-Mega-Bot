module.exports = {
    config: {
        name: "isim",
        aliases: ["name", "nick"],
        usage: "<@member || ID> <isim ve yaş>",
        category: "Register",
        description: "Üyeyi sunucuda ismini güncellersiniz.",
        accessableby: "Kayıt yetkilisi"
    },
    run: async(bot, message, args) => {
        let embişx = bot.config.Embeds;
        let ayar = bot.ayar.Register;
        let em = bot.ayar.Genel.infoemoji;
        let db = bot.regdb;

        if (!ayar.teyitcirol) return message.channel.send({
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

        if (!args[0]) {
            message.react(em.no || "❎").catch();
            message.channel.send({
                embed: {
                    color: embişx.noEmbed.color,
                    title: embişx.noEmbed.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Eski isimleri sorgulanacak üyeyi etiketle veya ID gir!**`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: embişx.noEmbed.footer
                    }
                }
            }).then(msg => msg.delete({ timeout: 9000 })).catch();
            return;
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            message.react(em.no || "❎").catch();
            message.channel.send({
                embed: {
                    color: embişx.noEmbed.color,
                    title: embişx.noEmbed.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Belirtiğin üyeyi sunucuda bulamadım!**`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: embişx.noEmbed.footer
                    }
                }
            }).then(msg => msg.delete({ timeout: 9000 })).catch();
            return;
        };

        var sayi = 1
        let wida = db.get(`nicks.${message.guild.id}`)
        if (!wida) return message.channel.send(`${bot.emojis.cache.get(em.no) || "❌"} **Veri Yok!**`).then(msg => msg.delete({ timeout: 9000 })).catch();
        let kayıtlar = wida.filter(x => x.uye === member.id).map(nix => `**${sayi++}- İsim:** \`${nix.isim}\`\n**Yetkili:** <@${nix.yetkili}>\n**Tarih:** \`${nix.Tarih}\``).join("\n")
        if (!kayıtlar) kayıtlar = "Kayıt Yok"

        message.channel.send({
            embed: {
                color: embişx.yesEmbed.color,
                title: `${member.user.tag} Eski Kayıtları`,
                description: kayıtlar,
                timestamp: new Date(),
                footer: {
                    icon_url: member.user.displayAvatarURL({ dynamic: true }),
                    text: embişx.yesEmbed.footer
                }
            }
        }).then(msg => msg.delete({ timeout: 9000 })).catch();

    }

};