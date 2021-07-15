module.exports = async bot => {
    if (!bot.config.GUILD_ID || !bot.ayar.Register.tag || !bot.ayar.Register.tagrol || !bot.ayar.Register.tagsız) return;

    setInterval(function() {
        bot.guilds.cache.get(bot.config.GUILD_ID).members.cache.forEach(async wid => {
            let ayar = bot.ayar.Register;
            if (ayar.ytag.some(y => wid.user.username.includes(y))) {
                wid.roles.cache.has(ayar.boost) ? wid.roles.set([ayar.boost.id, ayar.ytagrol]) : wid.roles.set([ayar.ytagrol]).catch();
            } else if (wid.username.includes(ayar.tag) && !wid.roles.cache.has(ayar.tagrol)) {
                nixmember.roles.add(ayar.tagrol).catch();
                if (wid.manageable && ayar.tag.length > 0) wid.setNickname(wid.displayName.replace(ayar.tagsız, ayar.tag)).catch();
            } else if (!wid.username.includes(ayar.tag) && wid.roles.cache.has(ayar.tagrol)) {
                let taglialim = bot.regdb.fetch(`taglialim.${bot.config.GUILD_ID}`);
                if (taglialim == "ON") {
                    if (nixmember.premiumSince) return;
                    wid.roles.set(bot.ayar.Register.kayıtsızrol).catch();
                    if (wid.manageable && ayar.tag.length > 0) wid.setNickname(wid.displayName.replace(ayar.tag, ayar.tagsız)).catch();
                } else {
                    wid.roles.remove(ayar.tagrol).catch();
                    if (wid.manageable && ayar.tag.length > 0) wid.setNickname(wid.displayName.replace(ayar.tag, ayar.tagsız)).catch();
                }
            }
        })
    }, 1000 * 60 * 60 * 1);
}
module.exports.configs = {
    name: "ready"
}