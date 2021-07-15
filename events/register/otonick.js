module.exports = async(client, member) => {
    let ayar = client.ayar;

    if (member.user.bot) {

        await member.setNickname(member.guild.name).catch();

    } else {
        let zaman = new Date().getTime() - member.user.createdAt.getTime();

        if (zaman < 1000 * 60 * 60 * 24 * 7) {
            await member.setNickname("Yeni Hesap").catch();
        } else {
            if (member.user.username.includes(ayar.Register.tag)) {
                await member.setNickname(ayar.Register.tag + " İsim | Yaş").catch();
            } else if (!member.user.username.includes(ayar.Register.tag)) {
                await member.setNickname(ayar.Register.tagsız + " İsim | Yaş").catch();
            }
        }
    }
}
module.exports.configs = {
    name: "guildMemberAdd"
}