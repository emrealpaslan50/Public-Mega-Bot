module.exports = async(client, oldState, newState) => {
    let db = client.statsdb;

    if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return
    if (!oldState.channelID && newState.channelID) {
        db.set("ses" + oldState.id, Date.now());
    }
    let data;
    if (!data) {
        data = Date.now();
        db.set("ses" + oldState.id, Date.now());
    } else data = db.get("ses" + oldState.id);


    let duration = Date.now() - data;
    if (oldState.channelID && !newState.channelID) {
        db.delete("ses" + oldState.id);
        db.add(`voiceData.${oldState.id}.channel.${oldState.channelID}`, duration);
        db.push(`voiceData.${oldState.id}.times`, { time: Date.now(), puan: duration })
    } else if (oldState.channelID && newState.channelID) {
        db.set("ses" + oldState.id, Date.now());
        db.add(`voiceData.${oldState.id}.channel.${oldState.channelID}`, duration);
        db.push(`voiceData.${oldState.id}.times`, { time: Date.now(), puan: duration })
    }

}
module.exports.configs = {
        name: "voiceStateUpdate"
    }
    //https://github.com/Niwren/niwren-stats-bot