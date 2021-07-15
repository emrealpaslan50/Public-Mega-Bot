module.exports = {
    config: {
        name: "avatar",
        aliases: ["profil-resmi", "pp"],
        usage: "(@member || ID)",
        category: "Genel",
        description: "Kendi ve bir üyenin avatarını büyütürsünüz.",
        accessableby: "Herkes"
    },
    run: async(bot, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if (args[0]) {
            message.channel.send({
                embed: {

                    title: `${user.user.username}'s Avatar`,

                    color: 0xFFEFD5,

                    image: {
                        url: `${user.user.displayAvatarURL({dynamic: true})}` + '?size=4096'
                    },

                    timestamp: new Date(),

                    footer: {
                        text: message.author.username + " tarafından istendi",
                        icon_url: message.author.displayAvatarURL({ dynamic: true })
                    }
                }
            })
        } else if (!args[0]) {
            message.channel.send({
                embed: {

                    title: `${user.user.username}'s Avatar`,

                    color: 0xFFEFD5,

                    image: {
                        url: `${user.user.displayAvatarURL({ dynamic: true })}` + '?size=4096'
                    },

                    timestamp: new Date(),

                    footer: {
                        text: message.author.username + " tarafından istendi",
                        icon_url: message.author.displayAvatarURL({ dynamic: true })
                    }

                }
            })
        }

    }
};