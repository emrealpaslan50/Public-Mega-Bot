const Database = require("../../database/Database");

module.exports = {
    config: {
        name: "reward",
        aliases: ["ödül"],
        usage: "<roleID> <number>",
        category: "Invite",
        description: "Sunucuda invite sistemini ödül ayarlarsınız.",
        accessableby: "Bot Owner & Guild Owner"
    },
    run: async(bot, message, args) => {
        if (!bot.config.OWNER.includes(message.author.id) || !message.guild.owner) {
            return message.channel.send(`❌ **Yetkin yok!**`).then(msg => msg.delete({ timeout: 5000 }));
        }

        if (args.length != 2) return message.channel.send("❌ **Geçersiz argüman!**").then(msg => msg.delete({ timeout: 9000 }));
        var roleId = args[0],
            targetInvite = Number(args[1]);
        if (!!message.guild.roles.cache.has(roleId)) return message.channel.send("❌ **Sunucuda böyle bir rol yok!**").then(msg => msg.delete({ timeout: 9000 }));

        if (isNaN(targetInvite)) return message.channel.send("❌ **Geçerli bir sayı belirtin!**").then(msg => msg.delete({ timeout: 9000 }));

        const db = new Database("./Servers/" + message.guild.id, "Rewards");

        var rewards = db.get("rewards") || [];
        rewards.push({
            Id: roleId,
            Invite: targetInvite
        });

        db.set("rewards", rewards);
        message.channel.send("✔ **Ödül başarıyla eklendi.**").then(msg => msg.delete({ timeout: 9000 }));
    }
};