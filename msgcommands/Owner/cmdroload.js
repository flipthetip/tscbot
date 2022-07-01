const { Message, Client , MessageEmbed } = require("discord.js");

module.exports = {
  name: "cmdreload",
  aliases: ["cmdre"],
  description: `reload a cmd`,
  userPermissions: [],
  botPermissions: [],
  category: "Owner",
  cooldown: 10,

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args, prefix) => {
    // code
    if (message.author.id !== "OWNERID") return;

    let thecmd = client.commands.get(args[0].toLowerCase());
    if (thecmd) {
      try {
        //delete the cmd from there
        delete require.cache[
          require.resolve(`../../commands/${thecmd.category}/${thecmd.name}.js`)
        ]; // usage !reload <name>
        //delete the command from the collection
        client.commands.delete(thecmd.name);
        //Pull the cmd information
        const pull = require(`../../commands/${thecmd.category}/${thecmd.name}.js`);
        //set the information
        client.commands.set(thecmd.name, pull);
        //send success message
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor("RANDOM")
              .setTitle(`Reloaded: \`${args[0]}\``),
          ],
        });
      } catch (e) {
        return message.reply({
          embeds: [
            new MessageEmbed()
              .setColor("RED")
              .setTitle(`:x: Could not reload: \`${args[0]}\``)
              .setDescription(
                `\`\`\`${
                  e.message
                    ? String(e.message).substr(0, 2000)
                    : e.stack
                    ? String(e.stack).substr(0, 2000)
                    : String(e).substr(0, 2000)
                }\`\`\``
              ),
          ],
        });
      }
    } else {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setTitle(`:x: Could not find: \`${args[0]}\``),
        ],
      });
    }
  },
};
