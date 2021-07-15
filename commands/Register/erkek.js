module.exports = {
    config: {
        name: "erkek",
        aliases: ["kayıterkek", "kayıt-erkek", "e", "man", "bay"],
        usage: "<@member || ID> <isim ve yaş>",
        category: "Register",
        description: "Üyeyi sunucuda erkek olarak kayıt edersiniz.",
        accessableby: "Kayıt yetkilisi"
    },
    run: async(bot, message, args) => {
        let embişx = bot.config.Embeds;
        let ayar = bot.ayar.Register;
        let em = bot.ayar.Genel.infoemoji;
        let db = bot.regdb;

        if (!ayar.teyitcirol || !ayar.erkekrol || !ayar.kizrol || !ayar.kayıtsızrol || !ayar.tag || !ayar.tagsız) return message.channel.send({
            embed: {
                color: embişx.noEmbed.color,
                title: embişx.noEmbed.title,
                description: `${bot.emojis.cache.get(em.no) || "❌"} **Kayıt rolleri ayarlı değil!**`,
                timestamp: new Date(),
                footer: {
                    icon_url: message.author.displayAvatarURL({ dynamic: true }),
                    text: embişx.noEmbed.footer
                }
            }
        }).then(msg => msg.delete({ timeout: 9000 })).catch();

        if (!message.member.roles.cache.has(ayar.teyitcirol) && !message.member.permissions.has("ADMINISTRATOR")) return;

        if (!args[0]) {
            message.react(em.no || "❎").catch();
            message.channel.send({
                embed: {
                    color: embişx.noEmbed.color,
                    title: embişx.noEmbed.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Kayıt edilecek üyeyi etiketle veya ID gir!**`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: embişx.noEmbed.footer
                    }
                }
            }).then(msg => msg.delete({ timeout: 9000 })).catch();
            return;
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            message.react(em.no || "❎").catch();
            message.channel.send({
                embed: {
                    color: embişx.noEmbed.color,
                    title: embişx.noEmbed.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Belirtiğin üyeyi sunucuda bulamadım!**`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: embişx.noEmbed.footer
                    }
                }
            }).then(msg => msg.delete({ timeout: 9000 })).catch();
            return;
        };

        if (!member.manageable || (message.member.roles.highest.position <= member.roles.highest.position) || (message.member.id === member.id)) {
            message.react(em.no || "❎").catch();
            message.channel.send({
                embed: {
                    color: embişx.noEmbed.color,
                    title: embişx.noEmbed.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Belirtiğin üyeyi kayıt edemem!**`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: embişx.noEmbed.footer
                    }
                }
            }).then(msg => msg.delete({ timeout: 9000 })).catch();
            return;
        };

        args = args.filter(a => a !== "" && a !== " ").splice(1);
        let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
        let yaş = args.filter(arg => !isNaN(arg))[0] || "00";
        let tamisim = `${member.user.username.includes(ayar.tag) ? ayar.tag : (ayar.tagsız ? ayar.tagsız : (ayar.tagsız || ""))} ${isim} | ${yaş}`;

        if (!isim || !yaş) {
            message.react(em.no || "❎").catch();
            message.channel.send({
                embed: {
                    color: embişx.noEmbed.color,
                    title: embişx.noEmbed.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **İsim ve yaşı belirmedin!**`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: embişx.noEmbed.footer
                    }
                }
            }).then(msg => msg.delete({ timeout: 9000 })).catch();
            return;
        };

        let taglialim = db.fetch(`taglialim.${message.guild.id}`);
        if (taglialim == "ON") {
            if (!member.user.username.includes(ayar.tag) && !member.roles.cache.has(ayar.viprol) && !member.premiumSince)
                message.react(em.no || "❎").catch();
            message.channel.send({
                embed: {
                    color: embişx.noEmbed.color,
                    title: embişx.noEmbed.title,
                    description: `${bot.emojis.cache.get(em.no) || "❌"} **Şuan taglı alımdayız!**
                    \n\n**Tag alarak veya takviye yaparak kayıt edilebilir**`,
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.displayAvatarURL({ dynamic: true }),
                        text: embişx.noEmbed.footer
                    }
                }
            }).then(msg => msg.delete({ timeout: 9000 })).catch();
            return;
        }

        member.setNickname(tamisim).catch();
        let man = member.roles.cache.filter(r => r.managed).map(c => c.id).concat(ayar.erkekrol);
        member.roles.add(man).then(() => {
            if (member.user.username.includes(ayar.tag)) member.roles.add(ayar.tagrol).catch();
        }).catch();

        let sonkayit = db.fetch(`sonkayit.` + member.id)
        if (!sonkayit) sonkayit = "İlk kaydı";

        message.channel.send({
            embed: {
                color: embişx.okEmbed.color,
                title: embişx.okEmbed.title,
                description: `${bot.emojis.cache.get(em.yes) || "✔"} ${member} isimli üye başarıyla kayıt edildi.\n\n${sonkayit || "İlk Kaydı"}\n\nTüm kayıtlar için ${process.env.PREFIX}isimler`,
                timestamp: new Date(),
                footer: {
                    icon_url: message.author.displayAvatarURL({ dynamic: true }),
                    text: embişx.okEmbed.footer
                }
            }
        }).catch();

        let tarih = bot.moment(message.createdAt).format("`DD/MM/YYYY | HH:mm:ss`");
        let eskikayit = `**En Son Kayıt Bilgi**\n\n** •Tarih : ${tarih}**\n** •İsmi : \`${nick}\`**\n** •Yetkili : <@${message.author.id}>**`
        db.set(`sonkayit.${member.id}`, eskikayit)
        db.push(`nicks.${message.guild.id}`, {
            uye: member.id,
            isim: tamisim,
            yetkili: message.author.id,
            Tarih: tarih,
        })
        let kayıtlımı = db.fetch(`kayitlimi.${member.id}`);
        if (kayıtlımı == null && kayıtlımı == undefined) {
            db.add(`erkekTeyit.${message.author.id}`, 1);
            db.set(`kayitlimi.${member.id}`, "evet");
        }

    }

};