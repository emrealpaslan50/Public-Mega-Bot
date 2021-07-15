module.exports = {
    config: {
        name: "booster",
        aliases: ["b"],
        usage: "<isim>",
        category: "Register",
        nodescription: "",
        accessableby: "Booster rol"
    },
    run: async(bot, message, args) => {
        if (!message.member.premiumSince || !message.member.manageable) return;

        if (args[0]) {
            if (args[0] < 32) {
                message.member.setNickname(args[0]).catch();
                message.channel.send("**Yeni ismin `" + args[0] + "` olarak güncellendi!**")
                    .then(a => a.delete({ timeout: 9000 }))
                    .catch();
            } else if (args[0] > 32) return message.channel.send("**Yeni ismin 32 karakterden fazla olamaz!**")
                .then(a => a.delete({ timeout: 9000 }))
                .catch();
        } else if (!args[0]) {
            message.member.setNickname(message.author.username).catch();
            message.channel.send("**Yeni ismin `" + message.author.username + "` olarak güncellendi!**")
                .then(a => a.delete({ timeout: 9000 }))
                .catch();
        }
    }
};