module.exports = async(bot, message) => {
    try {
        if (message.author.bot || message.channel.type === "dm") return;
        const prefix = process.env.PREFIX;

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();

        if (!message.content.startsWith(prefix)) return;
        var commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
        if (commandfile) commandfile.run(bot, message, args).catch();
    } catch (error) {}
}
module.exports.configs = {
    name: "message"
}