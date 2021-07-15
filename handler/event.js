module.exports = (bot) => {
    const load = dirs => {
        const events = bot.fs.readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of events) {
            const aynen = require(`../events/${dirs}/${file}`);
            if (!aynen.configs) return;
            bot.on(aynen.configs.name, aynen.bind(null, bot));
        };
    };
    ["bot", "register", "stats", "moderasyon"].forEach(x => load(x));
};

///--Event handler--///