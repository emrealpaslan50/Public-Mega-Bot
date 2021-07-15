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

        if (!ayar.teyitcirol || !ayar.kayıtsızrol) return message.channel.send({
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
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Kayıtsıza atılcak üyeyi etiketle veya ID gir!**`,
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

        if (!member.manageable || (message.member.roles.highest.position <= member.roles.highest.position) || (message.member.id === member.id) || member.premiumSince) {
            message.react(em.no || "❎").catch();
            message.channel.send({
                embed: {
                    color: embişx.noEmbed.color,
                    title: embişx.noEmbed.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Belirtiğin üyeyi kayıtsıza atamam!**`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: embişx.noEmbed.footer
                    }
                }
            }).then(msg => msg.delete({ timeout: 9000 })).catch();
            return;
        };

        member.roles.set(ayar.kayıtsızrol).catch();

        message.channel.send({
            embed: {
                color: embişx.okEmbed.color,
                title: embişx.okEmbed.title,
                description: `${bot.emojis.cache.get(em.yes) || "✔"} ${member} **kayıtsıza gönderildi!**`,
                timestamp: new Date(),
                footer: {
                    icon_url: message.author.displayAvatarURL({ dynamic: true }),
                    text: embişx.okEmbed.footer
                }
            }
        }).catch();

    }

};