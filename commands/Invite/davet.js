const Database = require("../../database/Database");

module.exports = {
    config: {
        name: "davet",
        aliases: ["invites", "invite", "davetlerim"],
        usage: "(@member)",
        category: "Invite",
        description: "Sunucuda invite sayısına bakarsınız.",
        accessableby: "@everyone"
    },
    run: async(bot, message, args) => {
        const db = new Database("./Servers/" + message.guild.id, "Invites");
        var victim = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;
        var data = db.get(`invites.${victim.id}`) || { total: 0, fake: 0, inviter: null, regular: 0, bonus: 0, leave: 0 };

        message.channel.send({
            embed: {
                color: 0x2f3136,
                thumbnail: {
                    url: message.author.displayAvatarURL({ dynamic: true })
                },
                title: message.author.username + " davet bilgi",
                description: `You have **${(data.total || 0) + (data.bonus || 0)}** invites! (**${data.regular || 0}** regular, **${data.bonus || 0}** bonus, **${data.leave || 0}** leaves, **${data.fake || 0}** fake)`
            }
        })
    }
};