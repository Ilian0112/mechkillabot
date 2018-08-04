const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const PREFIX = "mh!";
const queue = new Map();

var client = new Discord.Client();

var version = "V.0.0.1"

var bot = new Discord.Client();

var servers = {};

function play(connection, message) {
 var server = servers[message.guild.id];
    
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    
    server.queue.shift();
    
    server.dispatcher.on("end", function() {
     if (server.queue[0]) play(connection, message);
     else connection.disconnect();
    });
}

bot.on("ready", function () {
    bot.user.setActivity("MechkillaBOT - " + PREFIX + "help", {
        'type': 'STREAMING',
        'url': "https://www.twitch.tv/mechkilla01"
}),
    // bot.user.setUsername("MechkillaBOT")
    console.log("MechkillaBOT - Connecté");
});

bot.on('message', function(message) {
 /*      if(message.content === 'mechkilla') {
        message.reply("C'est mon Maitre lui po touche ( pss il est bi )")
       } */
});

    bot.on("guildMemberAdd", function(message) {
        var join_embed = new Discord.RichEmbed()
        .setAuthor("Nouveau Membre :")
        .setTitle("Bienvenue " + message.user.username + " sur " + message.guild.name + " ! :white_check_mark:")
        .setColor("#3333cc")
        .setTimestamp()
        message.guild.channels.find("name", "🤖bot-logs🤖").send(join_embed);
        message.addRole(message.guild.roles.find("name", "Membre"));
    });
    
    bot.on("guildMemberRemove", function(message) {
        message.guild.channels.find("name", "🤖bot-logs🤖").send("A bientôt " + message.toString() + " sur ``" + message.guild.name + "`` !");
    });
    
    
bot.on("message", async function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split (" ");

    var args2 = message.content.split(" ").slice(1);

    var suffix = args2.join(" ");

    var reason = args2.slice(1).join(" ");
    
    var reasontimed = args2.slice(2).join(' ')

    var user = message.mentions.users.first();
    
    var guild = message.guild;
    
    var member = message.member;

    var rolemembre = member.guild.roles.find("name", "Membre")
    
    var roleMute = member.guild.roles.find("name", "Mute")

    var roleporno = member.guild.roles.find("name", "AccéChat Porno")
    
    var user = message.mentions.users.first();

    switch (args[0].toLowerCase()) {
        case "addporno":
            member.addRole(roleporno)
            message.reply("vous avez maintenant accès au porno !")
            message.delete()
        break;

        case "removeporno":
            member.removeRole(roleporno)
            message.reply("vous n'avez plus accès au porno !")
            message.delete()
        break;

        case "help":
            var help_embed = new Discord.RichEmbed()
                .setAuthor("Menu d'aide", message.author.avatarURL)
                    .addField(PREFIX + "addporno", "Pour avoir l'accès au porno.")
                    .addField(PREFIX + "removeporno", "Pour vous enlevé l'accès au porno.")
                .setFooter("MechkillaBOT " + version)
                .setTimestamp()
                .setColor('#F3F781')
            message.channel.send(help_embed)
            message.delete()
        break;
    }
});

bot.login(process.env.TOKEN);
