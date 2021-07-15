module.exports = async(client, guild, user) => {
    let em = client.ayar.Genel.infoemoji;
    let ayar = client.ayar;
    let ayars = client.config;
    let db = client.moddb;

    if (guild.id !== ayars.GUILD_ID) return;

    let bla = await guild.fetchAuditLogs({ type: 'MEMBER_BAN_REMOVE' }).then(xd => xd.entries.first());

    let log = guild.channels.cache.get(ayar.Moderasyon.logkanal.ban) || guild.channels.cache.find(x => x.name === "ban-log");

    let kalkmaz = db.get(`permaban.${guild.id}.${user.id}`)
    let aug = guild.members.cache.get(bla.executor.id);
    if (!aug.managed) return;

    if (kalkmaz === "yes") {
        db.add(`ck.${bla.executor.id}`, +1);
        if (db.get(`ck.${bla.executor.id}`) === 2) {
            db.delete(`ck.${bla.executor.id}`)
            log.send(`${client.emojis.cache.get(em.no) || "❌"} ${aug} **Seni uyardım perma ban yediği için banı açılamaz!**`);
            aug.roles.cache.has(ayar.Register.boosterrol) ? aug.roles.set([ayar.Register.boosterrol, ayar.Moderasyon.cezarol.jail]) : aug.roles.set([ayar.Moderasyon.cezarol.jail]).catch();
            return;
        }
        log.send(`${client.emojis.cache.get(em.no) || "❌"} ${aug} **Bu üye perma ban yediği için sen kaldıramassın!**
        
        **Birdaha denersen cezalıya düşersin!**`);
        return;
    }
}
module.exports.configs = {
    name: "guildBanRemove"
}