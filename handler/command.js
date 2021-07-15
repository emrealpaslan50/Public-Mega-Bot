module.exports = (bot) => {
    const load = dirs => {
        const commands = bot.fs.readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of commands) {
            let falan = require(`../commands/${dirs}/${file}`);
            bot.commands.set(falan.config.name, falan);
            if (falan.config.aliases) falan.config.aliases.forEach(a => bot.aliases.set(a, falan.config.name));
        };
    };
    ["Genel", "Register", "Invite", "Stats", "Moderasyon"].forEach(x => load(x));
};
//--Command handler--//