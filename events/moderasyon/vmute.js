module.exports = async(client, oldState, newState) => {
    let db = client.moddb;

    let wid = db.get(`vmute.${newState.guild.id}.${newState.id}`);
    if (wid) {
        if (!newState.serverMute) newState.setMute(true).catch();

        setTimeout(() => {
            db.delete(`vmute.${newState.guild.id}.${newState.id}`);
            if (!newState.serverMute) return;
            newState.setMute(false).catch();
        }, client.ms(wid));
    }
}
module.exports.configs = {
    name: "voiceStateUpdate"
}