module.exports = {
    config: {
        name: "teyitrank",
        aliases: ["teyit-rank"],
        usage: "(@member || ID)",
        category: "Register",
        description: "Teyit bilginize bakarsınız.",
        accessableby: "Kayıt yetkilisi"
    },
    run: async(bot, message, args) => {
        let db = bot.regdb;
        let embişx = bot.config.Embeds;
        let ayar = bot.ayar.Register;

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

        let widmember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
        let kızTeyit = db.fetch(`kadinTeyit.${widmember.id}`) || "0"
        let erkekTeyit = db.fetch(`erkekTeyit.${widmember.id}`) || "0";
        const teyitrank = `
        Kız    :: ${kızTeyit}
        Erkek  :: ${erkekTeyit}
        Toplam :: ${kızTeyit+erkekTeyit}`;

        message.channel.send({
            embed: {
                color: 0x2f3136,
                description: `
                ${widmember} isimli kullanıcının teyit rank bilgileri:
            
                \`\`\`asciidoc\n${teyitrank}\`\`\``,
                timestamp: new Date(),
                footer: {
                    icon_url: widmember.user.displayAvatarURL({ dynamic: true }),
                    text: widmember.displayName
                }
            }
        })

    }

};