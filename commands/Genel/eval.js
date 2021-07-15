const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: "eval",
        aliases: [],
        usage: "",
        category: "Genel",
        description: "",
        accessableby: "Kimsenin erişimi yok"
    },
    run: async(bot, message, args) => {
        function clean(text) {
            if (typeof text === "string")
                return text
                    .replace(/`/g, "`" + String.fromCharCode(8203))
                    .replace(/@/g, "@" + String.fromCharCode(8203));
            else return text;
        }
        if (bot.config.OWNER.includes(message.author.id)) {
            try {
                const code = args.join(" ");
                let evaled = eval(code);

                if (code.includes("token")) {
                    var tokenwarn = new MessageEmbed()
                        .setTitle("Al sana token XD !")
                        .setDescription("||" + new Date + "||")
                        .setFooter(bot.user.username, bot.user.displayAvatarURL({ dynamic: true }))
                    message.channel.send(tokenwarn)
                    return;
                }

                if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

                var emb = new MessageEmbed()
                    .setTitle('Çıkış')
                    .setDescription(`\`\`\`js` + '\n' + clean(evaled) + `\n` + `\`\`\``)
                    .setFooter(bot.user.username, bot.user.displayAvatarURL({ dynamic: true }))
                message.channel.send(emb);
            } catch (err) {
                var emb = new MessageEmbed()
                    .setTitle('Çıkış Hata')
                    .setDescription(`\`\`\`js` + '\n' + clean(err) + `\n` + `\`\`\``)
                    .setFooter(bot.user.username, bot.user.displayAvatarURL({ dynamic: true }))
                message.channel.send(emb);
            }
        } else {
            message.channel.send('```diff\n-Bu komutu kullanamazsın. Bu komut Yapımcı Komutudur```').then(msg => msg.delete({ timeout: 5000 }));
            return;
        }
    }

};