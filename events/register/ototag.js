module.exports = async(client, oldUser, newUser) => {
    let guild = client.guilds.cache.get(client.config.GUILD_ID);

    if (!client.ayar.Register.tag || !client.ayar.Register.tagrol || !client.ayar.Register.taglog) return guild.owner.send("Tag sistemi ayarlı değil!")
        .catch(() => console.log("Tag sistemi ayarlı değil!"));

    let taglog = guild.channels.cache.get(client.ayar.Register.taglog);
    let tagrol = guild.roles.cache.get(client.ayar.Register.tagrol);
    let tag = client.ayar.Register.tag;
    let tagsız = client.ayar.Register.tagsız;
    let ytaglog = guild.channels.cache.get(client.ayar.Register.ytaglog);
    let ytagrol = guild.roles.cache.get(client.ayar.Register.ytagrol);
    let ytag = client.ayar.Register.ytag;
    let boost = guild.roles.cache.get(client.ayar.Register.boosterrol);

    if (!taglog || !tagrol) return guild.owner.send("Tag sistemi için ayarlı kanal veya rol silinmiş!")
        .catch(() => console.log("Tag sistemi için ayarlı kanal veya rol silinmiş!"));

    let nixmember = guild.members.cache.get(oldUser.id);
    if (!nixmember) return;

    if (!guild || oldUser.bot || newUser.bot || (oldUser.username == newUser.username) || nixmember.roles.cache.has(ytagrol.id)) return;

    if (ytag.some(y => newUser.username.includes(y))) {
        nixmember.roles.cache.has(boost.id) ? nixmember.roles.set([boost.id, ytagrol.id]) : nixmember.roles.set([ytagrol.id]).catch();
        if (ytaglog) ytaglog.send({
            embed: {
                color: "RED",
                description: `${client.emojis.cache.get(client.ayar.Genel.infoemoji.no) || "❌"} ${nixmember} **Yasaklı tag aldığı için tüm rolleri alınıp yasaklı tag rolü verildi!**`,
                timestamp: new Date(),
                footer: {
                    icon_url: newUser.displayAvatarURL({ dynamic: true }),
                    text: newUser.username
                }
            }
        })
    } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag) && !nixmember.roles.cache.has(tagrol)) {
        nixmember.roles.add(tagrol).catch();
        if (nixmember.manageable && tag.length > 0) nixmember.setNickname(nixmember.displayName.replace(tagsız, tag)).catch();
        taglog.send({
            embed: {
                color: "GREEN",
                description: `${client.emojis.cache.get(client.ayar.Genel.infoemoji.yes) || "✔"} ${nixmember} **\`${tag}\` sembolünü kullanıcı adına alarak ekibimize katıldı.**`,
                timestamp: new Date(),
                footer: {
                    icon_url: newUser.displayAvatarURL({ dynamic: true }),
                    text: newUser.username
                }
            }
        })
    } else if (oldUser.username.includes(tag) && !newUser.username.includes(tag) && nixmember.roles.cache.has(tagrol)) {
        let taglialim = client.regdb.fetch(`taglialim.${guild.id}`);
        if (taglialim == "ON") {
            if (nixmember.premiumSince) return;
            nixmember.roles.set(client.ayar.Register.kayıtsızrol).catch();
            if (nixmember.manageable && tag.length > 0) nixmember.setNickname(nixmember.displayName.replace(tag, tagsız)).catch();
            taglog.send({
                embed: {
                    color: "RED",
                    description: `${client.emojis.cache.get(client.ayar.Genel.infoemoji.no) || "❌"} ${nixmember} **\`${tag}\` sembolünü kullanıcı adından silerek ekibimizden ayrıldı!**
                    \n**Taglı alım aktif olduğu için kayıtsıza atıldı!**`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: newUser.displayAvatarURL({ dynamic: true }),
                        text: newUser.username
                    }
                }
            })
        } else {
            nixmember.roles.remove(tagrol).catch();
            if (nixmember.manageable && tag.length > 0) nixmember.setNickname(nixmember.displayName.replace(tag, tagsız)).catch();
            taglog.send({
                embed: {
                    color: "RED",
                    description: `${client.emojis.cache.get(client.ayar.Genel.infoemoji.no) || "❌"} ${nixmember} **\`${tag}\` sembolünü kullanıcı adından silerek ekibimizden ayrıldı!**`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: newUser.displayAvatarURL({ dynamic: true }),
                        text: newUser.username
                    }
                }
            })
        }
    }

}
module.exports.configs = {
    name: "userUpdate"
}