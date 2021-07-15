module.exports = async(client, member) => {
    let ayar = client.ayar;

    if (member.user.bot) {

        member.roles.add(ayar.Genel.botrol).catch();

    } else {
        let zaman = new Date().getTime() - member.user.createdAt.getTime();

        if (zaman < 1000 * 60 * 60 * 24 * 7) {
            member.roles.set([ayar.Register.karantina]).catch();
        } else {
            member.roles.set(ayar.Register.kayıtsızrol).catch();
        }
    }
}
module.exports.configs = {
    name: "guildMemberAdd"
}