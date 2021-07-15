const Database = require("../../database/Database");

module.exports = {
    config: {
        name: "options",
        aliases: ["ayar"],
        usage: "<type> <value>",
        category: "Invite",
        description: "Sunucuda invite sistemini ayarlarsınız.",
        accessableby: "Bot Owner & Guild Owner"
    },
    run: async(bot, message, args) => {
        if (!bot.config.OWNER.includes(message.author.id) || !message.guild.owner) {
            return message.channel.send(`❌ **Yetkin yok!**`).then(msg => msg.delete({ timeout: 5000 }))
        }

        const db = new Database("./Servers/" + message.guild.id, "Settings");

        if (args.length <= 0) return message.channel.send("❌ **Hatalı kullanım!**").then(msg => msg.delete({ timeout: 5000 }))

        var arg = args[0].toLocaleLowerCase();
        var types = ["leaveMessage", "welcomeMessage", "defaultMessage"];

        var type = types.find(_type => _type.toLocaleLowerCase() == arg);
        if (!type) return message.channel.send("Güncellemek istediğiniz ayarı `leaveMessage`, `welcomeMessage` ve `defaultMessage` bunlardan birini seçiniz.");

        db.set(`settings.${type}`, args.splice(1).join(" "));
        message.channel.send("**" + type + " ayarlandı.**").then(msg => msg.delete({ timeout: 5000 }))
    }
};