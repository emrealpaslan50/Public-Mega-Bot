module.exports = {
    config: {
        name: "git",
        noaliases: [],
        usage: "<@Member || ID>",
        category: "Genel",
        description: "Etiketlediğiniz üye sesteyse yanına götürür.",
        accessableby: "Herkes"
    },
    run: async(bot, message, args) => {
        let embişx = bot.config.Embeds;
        let em = bot.ayar.Genel.infoemoji;

        if (!message.member.voice.channel) {
            return message.channel.send({
                embed: {
                    color: embişx.noEmbed.color,
                    title: embişx.noEmbed.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **İlk önce ses kanalında olman gerek!**`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: embişx.noEmbed.footer
                    }
                }
            }).then(msg => msg.delete({ timeout: 9000 })).catch();
        }

        if (!args[0]) {
            message.react(em.no || "❎").catch();
            message.channel.send({
                embed: {
                    color: embişx.noEmbed.color,
                    title: embişx.noEmbed.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Yanına gidilecek üyeyi etiketle veya ID gir!**`,
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
        if (!member || !member.voice.channel) {
            message.react(em.no || "❎").catch();
            message.channel.send({
                embed: {
                    color: embişx.noEmbed.color,
                    title: embişx.noEmbed.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Belirtiğin üyeyi ses kanallarında bulamadım!**`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: embişx.noEmbed.footer
                    }
                }
            }).then(msg => msg.delete({ timeout: 9000 })).catch();
            return;
        };

        const filter = (reaction, user) => {
            if (!bot.emojis.cache.get(em.no) || !bot.emojis.cache.get(em.no)) {
                return ['✅', '❌'].includes(reaction.emoji.name) && user.id === member.id;
            } else {
                return [em.yes, em.no].includes(reaction.emoji.id) && user.id === member.id;
            }
        };

        message.channel.send(`${member}, ${message.author} **ses kanalında yanına gelmek istiyor!**`)
            .then(a => {
                a.react(em.yes || '✅');
                a.react(em.no || '❌');
                a.delete({ timeout: 90000 });
                a.awaitReactions(filter, {
                    max: 1,
                    time: 90000,
                    errors: ['time']
                }).then(collected => {
                    let reaction = collected.first();
                    if (!bot.emojis.cache.get(em.no) || !bot.emojis.cache.get(em.no)) {
                        if (reaction.emoji.name === '✅') {
                            a.delete();
                            message.channel.send(`${message.author}, **işlem onaylandı!**`).then(msg => msg.delete({ timeout: 9000 })).catch();
                            message.member.voice.setChannel(member.voice.channel.id).catch();
                        } else {
                            a.delete();
                            message.channel.send(`${message.author}, **işlem onaylanmadı!**`).then(msg => msg.delete({ timeout: 9000 })).catch();
                        }
                    } else {
                        if (reaction.emoji.id === em.yes) {
                            a.delete();
                            message.channel.send(`${message.author}, **işlem onaylandı!**`).then(msg => msg.delete({ timeout: 9000 })).catch();
                            message.member.voice.setChannel(member.voice.channel.id).catch();
                        } else {
                            a.delete();
                            message.channel.send(`${message.author}, **işlem onaylanmadı!**`).then(msg => msg.delete({ timeout: 9000 })).catch();
                        }
                    }
                });
            })

    }
};