module.exports = {
    Register: { //Register ayarları
        erkekrol: [""], //Erkek rollerin id
        kizrol: [""], //Kız rollerin id
        kayıtsızrol: [""], //Kayıtsız rollerin id
        karantina: "", //Yeni hesap rol id
        boosterrol: "", //Booster rol id
        viprol: "", //V.I.P. rol id
        tagrol: "", //Tag rol id
        hgkanal: "", //Hoşgeldin kanal id
        teyitcirol: "", //Kayıt yetkili rol id
        tag: "", //Tag sembol
        tagsız: "", //Tagsız sembol
        taglog: "", //Tag log kanal id
        ytaglog: "", //Yasaklı tag log kanal id
        ytags: [""], //Yasaklı taglar
        ytagrol: "", //Yasaklı tag rol id
        genelchat: "" //Karşılama kanal id
    },
    Moderasyon: { //Moderasyon ayarları
        yetkilirol: { //Yetkili rolleri
            ban: [""], //Ban yetkili rollerin id
            jail: [""], //Jail yetkili rolleri id
            sesmute: [""], //Ses mute yetkili rolleri id
            textmute: [""], //Text mute yetkili rolleri id
        },
        logkanal: { //Log kanalları
            ban: "", //Ban log kanal id
            jail: "", //Jail log kanal id
            sesmute: "", //Ses mute log kanal id
            textmute: "", //Text mute log kanal id
        },
        cezarol: { //Ceza rolleri
            jail: "", //Jail rol id
            unjail: "", //Unjail rol id
            textmute: "" //Textmute rol id
        }
    },
    Genel: {
        botrol: "", //Bot oto rol id
        infoemoji: {
            yes: "", //Yes emoji id
            no: "", //No emoji id
        },
        invitelog: "" //Davet log kanalı
    }
};