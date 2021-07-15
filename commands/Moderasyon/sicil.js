module.exports = {
    config: {
        name: "sicil",
        noaliases: [],
        usage: "<@Member || ID>",
        category: "Moderasyon",
        description: "ID girdiğiniz üyenin sunucuda cezalarına bakarsınız.",
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

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

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

        let wida = db.get(`penals.${message.guild.id}`)
        if (!wida) return message.channel.send(`${bot.emojis.cache.get(em.no) || "❌"} **Veri Yok!**`).then(msg => msg.delete({ timeout: 9000 })).catch();
        let kayıtlar = wida.filter(x => x.suspended === member.id).map(nix => `**Ceza ID:** \`#${nix.no}\`\n\`╰>\`**Ceza Türü:** \`${nix.type}\` / **Ceza Sebep:** \`${nix.reason}\`/ **Ceza Tarih:** \`${nix.time}\``).join("\n")
        if (!kayıtlar) kayıtlar = `${bot.emojis.cache.get(em.no) || "❌"} **Veri Yok!**`


        message.channel.send({
            embed: {
                color: 0x2f3136,
                description: kayıtlar,
                footer: {
                    icon_url: member.user.displayAvatarURL({ dynamic: true }),
                    text: member.displayName
                }
            }
        });

    }
};