module.exports = {
    config: {
        name: "cezasorgu",
        aliases: ["cezabilgi"],
        usage: "<Ceza ID>",
        category: "Moderasyon",
        description: "Girdiğiniz ceza ID ayrıntısına bakarsınız.",
        accessableby: "Yönetici"
    },
    run: async(bot, message, args) => {
        let noem = bot.config.Embeds.noEmbed;
        let em = bot.ayar.Genel.infoemoji;
        let ayar = bot.ayar;
        let db = bot.moddb;

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    title: noem.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Buna sadece "Yönetici" yetkisi olan bakabilir!**`,
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: noem.footer
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        let ID = args[0]

        if (!ID) {
            return message.channel.send({
                embed: {
                    color: noem.color,
                    title: noem.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **ID belirtmedin!**`,
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: noem.footer
                    }
                }
            }).then(a => a.delete({ timeout: 9000 }));
        }

        let nix = db.get(`penal.${ID}.${message.guild.id}`)
        if (!nix) return message.channel.send(`${bot.emojis.cache.get(em.no) || "❌"} **Veri Yok!**`).then(msg => msg.delete({ timeout: 9000 })).catch();

        message.channel.send({
            embed: {
                color: 0x2f3136,
                description: `**Ceza ID:** \`#${nix.no}\`\n\`╰>\`**Cezalı:** <@${nix.suspended}>\n\`╰>\`**Yetkili:** <@${nix.author}>\n\`╰>\`**Ceza Türü:** \`${nix.type}\`\n\`╰>\`**Ceza Sebep:** \`${nix.reason}\`\n\`╰>\`**Ceza Tarih:** \`${nix.time}\``,
                footer: {
                    icon_url: message.author.displayAvatarURL({ dynamic: true }),
                    text: message.member.displayName
                }
            }
        });

    }
};