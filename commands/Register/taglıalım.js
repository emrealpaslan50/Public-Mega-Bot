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

        if (!message.member.permissions.has("ADMINISTRATOR")) return;

        let taglıalım = db.fetch(`taglialim.${message.guild.id}`)

        if (!args[0]) return message.channel.send(`❌ **Taglı alım sistemini aktif etmek için "taglıalım aktif" kapatmak için "taglıalım deaktif" yazmalısın!**`)
            .then(msg => msg.delete({ timeout: 7000 }))
            .catch();

        if (args[0] === "aktif") {
            if (taglıalım == "ON") return message.channel.send(`❌ **Taglı alım sistemi zaten aktif!**`)
                .then(msg => msg.delete({ timeout: 7000 }))
                .catch();
            db.set(`taglialim.${message.guild.id}`, "ON");
            message.channel.send(`✔ **Taglı alım sistemi aktif edildi!**`)
                .then(msg => msg.delete({ timeout: 7000 }))
                .catch();
        } else if (args[0] === "deaktif") {
            if (!taglıalım) return message.channel.send(`❌ **Taglı alım sistemi zaten deaktif!**`)
                .then(msg => msg.delete({ timeout: 7000 }))
                .catch();
            db.delete(`taglialim.${message.guild.id}`)
            message.channel.send(`✔ **Taglı alım sistemi kapatıldı!**`)
                .then(msg => msg.delete({ timeout: 7000 }))
                .catch();
        };
    }

};