const Database = require("../../database/Database");

module.exports = {
        config: {
            name: "invite-top",
            aliases: ["invitetop", "topdavet", "davettop"],
            nousage: "",
            category: "Invite",
            description: "Sunucuda top invite bakarsınız.",
            accessableby: "Üyeleri Yasakla"
        },
        run: async(bot, message, args) => {
                if (!message.member.permissions.has('BAN_MEMBERS')) {
                    return message.channel.send(`❌ **Yetkin yok!**`).then(msg => msg.delete({ timeout: 5000 }))
                }
                const db = new Database("./Servers/" + message.guild.id, "Invites");
                var data = db.get(`invites`) || {};

                var list = Object.keys(data).map(_data => {
                    return {
                        Id: _data,
                        Value: (data[_data].total || 0) + (data[_data].bonus || 0)
                    };
                }).sort((x, y) => y.Value - x.Value);

                message.channel.send({
                            embed: {
                                color: 0x2f3136,
                                thumbnail: {
                                    url: message.guild.iconURL({ dynamic: true })
                                },
                                title: message.guild.name,
                                description: "Davetler\n" + `${list.splice(0, 10).map((item, index) => `\`${index + 1}.\` <@${item.Id}>: \`${item.Value} invite\``).join("\n")}`,
                timestamp: new Date(),
                footer: {
                    icon_url: message.author.displayAvatarURL({ dynamic: true }),
                    text: message.author.username
                }
            }
        })
    }
};