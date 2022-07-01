const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "eval",
  aliases: ["ev"],
  description: `eval your code`,
  userPermissions: [],
  botPermissions: [],
  category: "Owner",
  cooldown: 2,

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    // code
    if (message.author.id !== "OWNERID") return;
    const code = args.join(" ");
    if (!code)
      message.reply(
        "How am I supposed to evaluate nothing? PROVIDE CODE IDIOT!"
      );

    try {
      let evaled = eval(code);
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      message
        .reply({
          embeds: [
            new MessageEmbed()
              .setTitle(`Eval Successfully`)
              .setColor("RANDOM")
              .setDescription(`\`\`\`js\n${evaled.substr(0, 3000)}\`\`\``)
              .setThumbnail(message.author.displayAvatarURL({ dynamic: true })),
          ],
        })
        .catch((e) => {
          message.reply({
            content: `\`ERROR\` \`\`\`xl\n${e.message}\n\`\`\``,
          });
        });
    } catch (err) {
      message.reply({ content: `\`ERROR\` \`\`\`xl\n${err}\n\`\`\`` });
    }
  },
};
