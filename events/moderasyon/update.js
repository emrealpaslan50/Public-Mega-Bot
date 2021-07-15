module.exports = async(client, oldMember, newMember) => {
    let db = client.moddb;
    let crol = client.ayar.Moderasyon.cezarol.textmute;
    let jrol = client.ayar.Moderasyon.cezarol.jail;
    let ujrol = client.ayar.Moderasyon.cezarol.unjail;
    let brol = client.ayar.Register.boosterrol;

    let cmute = db.get(`tmute.${newMember.guild.id}.${newMember.id}`);
    let jail = db.get(`jail.${newMember.guild.id}.${newMember.id}`);
    if (cmute) {
        if (!oldMember.roles.cache.has(crol) || newMember.roles.cache.has(crol)) return;
        newMember.roles.add(crol).catch();
        setTimeout(() => {
            db.delete(`tmute.${newMember.guild.id}.${newMember.id}`);
            if (!newMember.roles.cache.has(crol)) return;
            newMember.roles.remove(crol).catch();
        }, client.ms(cmute));
    }
    if (jail) {
        if (!oldMember.roles.cache.has(jrol) || newMember.roles.cache.has(jrol)) return;
        newMember.roles.cache.has(brol) ? newMember.roles.set([brol, jrol]) : newMember.roles.set([jrol]).catch();
        setTimeout(() => {
            db.delete(`vmute.${newMember.guild.id}.${newMember.id}`);
            if (!newMember.roles.cache.has(jrol)) return;
            newMember.roles.cache.has(brol) ? newMember.roles.set([brol, ujrol]) : newMember.roles.set([ujrol]).catch();
        }, client.ms(jail));
    }
}
module.exports.configs = {
    name: "guildMemberUpdate"
}