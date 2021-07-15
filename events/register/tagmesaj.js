module.exports = async(client, message) => {
    let tagmsgg = ["tag", "+tag", ".tag", "!tag", "*tag", "-tag", "^tag", "#tag", "&tag", "tag?", "?tag"]
    if (tagmsgg.some(lannaber => message.content.toLowerCase() == lannaber)) {
        message.delete().catch();
        message.channel.send(`\`${client.ayar.Register.tag}\``)
            .then(a => a.delete({ timeout: 15000 }))
            .catch();
    }
}
module.exports.configs = {
    name: "message"
}