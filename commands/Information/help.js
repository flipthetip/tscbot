const { Command } = require("../../utils/command/command");
const ee = require("../../settings/config").embed
const { readdirSync } = require("fs");
const { MessageEmbed } = require("discord.js");
const activity = require("./activity");

module.exports = new Command({
  // options
  name: "help",
  description: `need help ? click now to see commands`,
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES"],
  category: "Information",
  cooldown: 10,
  options: [
    {
      name: "cmd",
      description: `Give cmd name`,
      type: "STRING",
      required: false,
    },
  ],
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    let cmd = interaction.options.getString("cmd");
    if (!cmd) {


      interaction.followUp({
        embeds: [
          new MessageEmbed()
            .setColor(ee.embed_color)
            .setTitle(`👻 TSC Bot Commands`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(
              `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help drops\`.
              \n\`${prefix}help\` Show this message\n
              \n\`${prefix}activity\` Check recent activity of a Solana Collection\n
              \n\`${prefix}drops\` Check recent activity of a Solana Collection\n
              \n\`${prefix}floorprice\` Check recent activity of a Solana Collection\n
              
              
              
              `
            )
            .setTimestamp()
            .setFooter({
              text: `Requested By ${interaction.user.tag}`,
              iconURL: interaction.member.displayAvatarURL({ dynamic: true }),
            }),
        ],
      });
    } else {
      const command = client.commands.get(cmd.toLowerCase());
      if (!command) {
        return interaction.followUp(
          `:x: Inavlid Command , ${prefix}help to see all Commands`
        );
      } else {
        let embed = new MessageEmbed()
          .setColor(ee.embed_color)
          .setTitle(`${command.name.toUpperCase()} Command Info `)
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
          .addFields([
            {
              name: `⚙️ Command Name`,
              value: `>>> \`${command.name}\``,
            },
            {
              name: `⚙️ Command Description`,
              value: `>>> \`${command.description}\``,
            },
            {
              name: `⚙️ Command Cooldown`,
              value: `>>> \`${command.cooldown} Seconds\``,
            },
          ])
          .setFooter({
            text: `Requested By ${interaction.user.tag}`,
            iconURL: interaction.member.displayAvatarURL({ dynamic: true }),
          });

        interaction.followUp({ embeds: [embed] });
      }
    }
  },
});