const { Message, Client } = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["latancy"],
  description: `get ping of bot`,
  userPermissions: [],
  botPermissions: [],
  category: "Information",
  cooldown: 10,

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    // code
    message.reply(`Pong`);
  },
};
