module.exports = async(client, message) => {
    let db = client.statsdb;

    if (!message.guild || message.author.bot || message.content.startsWith(client.prefix)) return;
    db.add(`messageData.${message.author.id}.channel.${message.channel.id}`, 1);
    db.push(`messageData.${message.author.id}.times`, { time: Date.now(), puan: 1 })

}
module.exports.configs = {
        name: "message"
    }
    //https://github.com/Niwren/niwren-stats-bot