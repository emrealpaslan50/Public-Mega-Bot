const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
        config: {
            name: "yardım",
            aliases: ["help"],
            usage: "[komut ismi] (isteğe bağlı)",
            category: "Genel",
            description: "Botun komutların bulunduğu yardım listesi",
            accessableby: "Üyeleri Yasakla"
        },
        run: async(bot, message, args) => {
                if (!message.member.permissions.has('BAN_MEMBERS')) {
                    return message.channel.send(`❌ **Yetkin yok!**`).then(msg => msg.delete({ timeout: 5000 }))
                }
                const prefix = process.env.PREFIX;
                const embed = new MessageEmbed()
                    .setThumbnail(message.guild.iconURL({ dynamic: true }));
                if (!args[0]) {


                    const categories = bot.fs.readdirSync("./commands/")
                    embed.setDescription(`**${message.guild.me.displayName} Komutlarımın Listesi\nPrefixim: \`${prefix}\`\n\nKomut kullanımını öğrenmek için -\n\`${prefix}yardım [komut ismi]\`**`)
                    embed.setFooter(`${message.guild.me.displayName} | Toplam komut sayım - ${bot.commands.size - 1}`, bot.user.displayAvatarURL());
                    categories.forEach(category => {
                        const dir = bot.commands.filter(c => c.config.category === category)
                        const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                        try {
                            embed.addField(` ${capitalise} [${dir.size}] - `, dir.map(c => `\`${c.config.name}\``).join(", "))

                        } catch (e) {}
                    })

                    message.channel.send(embed);
                } else {
                    let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
                    if (!command) return message.channel.send(embed.setTitle("**Öyle bir komut yok!**").setDescription(`**Lütfen \`${prefix}yardım\` yazarak komut yardım listesini inceleyin!**`))
                    command = command.config
                    embed.setDescription(stripIndents `\nPrefixim: \`${prefix}\`\n
            ** Komut -** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\n
            ** Açıklama -** ${command.description || "Açıklama yok"}\n
            ** Kategori -** ${command.category}\n
            ** Kullanımı -** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "YOK"}\n
            ** Gereken Yetki -** ${command.accessableby || "everyone"}\n
            ** Kısa İsmi -** ${command.aliases ? command.aliases.join(" | ") : "YOK"}`)
            embed.setFooter(message.guild.name, message.guild.iconURL({dynamic: true}))


        message.channel.send(embed);
        }
    
    }
};