module.exports = async(client, member) => {
    let db = client.moddb;
    let crol = client.ayar.Moderasyon.cezarol.textmute;
    let jrol = client.ayar.Moderasyon.cezarol.jail;
    let ujrol = client.ayar.Moderasyon.cezarol.unjail;
    let brol = client.ayar.Register.boosterrol;

    let cmute = db.get(`tmute.${member.guild.id}.${member.id}`);
    let jail = db.get(`jail.${member.guild.id}.${member.id}`);;
    if (cmute) {
        if (member.roles.cache.has(crol)) return;
        member.roles.add(crol).catch();
        setTimeout(() => {
            db.delete(`tmute.${member.guild.id}.${member.id}`);;
            if (!member.roles.cache.has(crol)) return;
            member.roles.remove(crol).catch();
        }, client.ms(cmute));
    }
    if (jail) {
        if (member.roles.cache.has(jrol)) return;
        member.roles.cache.has(brol) ? member.roles.set([brol, jrol]) : member.roles.set([jrol]).catch();
        setTimeout(() => {
            db.delete(`vmute.${member.guild.id}.${member.id}`);;
            if (!member.roles.cache.has(jrol)) return;
            member.roles.cache.has(brol) ? member.roles.set([brol, ujrol]) : member.roles.set([ujrol]).catch();
        }, client.ms(jail));
    }
}
module.exports.configs = {
    name: "guildMemberAdd"
}