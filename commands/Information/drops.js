const { Command } = require("../../utils/command/command");
const ee = require("../../settings/config").embed
const { readdirSync } = require("fs");
const { MessageEmbed } = require("discord.js");
const { get } = require("request-promise-native");

module.exports = new Command({
  // options
  name: "drops",
  description: `Check latest drops in the Solana Network`,
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES"],
  category: "Information",
  cooldown: 5,
  options: [
    {
      name: "date",
      description: `Give a date. Leave empty for HELP info.`,
      type: "STRING",
      required: false,
    },
  ],
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    let cmd = interaction.options.getString("date");
    if (cmd == 'help' | !cmd) {


      interaction.followUp({
        embeds: [
          new MessageEmbed()
          .setColor('BLUE')
          .setTitle(`TSC Collection Check`)
          .setDescription(`
          \`\`\`🖊️ Discord command:: /drops(space)[yyyy-mm-dd]
🖋️ Sample command :: /drops 2022-12-01 | /drops 2022-08-22\`\`\`
          **📙 TSC SOLANA DROPS CHECK**
          ​
          `)
            .setTimestamp()
            .setFooter({
              text: `Requested By ${interaction.user.tag}`,
              iconURL: interaction.member.displayAvatarURL({ dynamic: true }),
            }),
        ],
      });
      

      } else {
      const ops = {
        url: `https://api.howrare.is/v0.1/drops`,
        json: true
        
        }

        get(ops).then(body => {

        interaction.followUp(`Fetching request..\nRequest is invalid if you don't get a response within 3-5secs.\nType \`${prefix}drops help\` for command info. 👻`).then(msg => {

        let embed = new MessageEmbed()
          .setColor(ee.embed_color)
          .setTitle(`**TSC SOLANA DROPS CHECK**`)
          .setDescription(`The upcoming Top 5 NFT drops for that date:\n\n **${body.result.data[`${cmd}`][0].name}**
          ${body.result.data[`${cmd}`][0].price}
          ${body.result.data[`${cmd}`][0].nft_count} SUPPLY\n
          ${body.result.data[`${cmd}`][0].twitter}
          ${body.result.data[`${cmd}`][0].time}\n
          
          **${body.result.data[`${cmd}`][1].name}**
          ${body.result.data[`${cmd}`][1].price}
          ${body.result.data[`${cmd}`][1].nft_count} SUPPLY\n
          ${body.result.data[`${cmd}`][1].twitter}
          ${body.result.data[`${cmd}`][1].time}\n
          
          **${body.result.data[`${cmd}`][2].name}**
          ${body.result.data[`${cmd}`][2].price}
          ${body.result.data[`${cmd}`][2].nft_count} SUPPLY\n
          ${body.result.data[`${cmd}`][2].twitter}
          ${body.result.data[`${cmd}`][2].time}\n
          
          **${body.result.data[`${cmd}`][3].name}**
          ${body.result.data[`${cmd}`][3].price}
          ${body.result.data[`${cmd}`][3].nft_count} SUPPLY\n
          ${body.result.data[`${cmd}`][3].twitter}
          ${body.result.data[`${cmd}`][3].time}\n
          
          **${body.result.data[`${cmd}`][4].name}**
          ${body.result.data[`${cmd}`][4].price}
          ${body.result.data[`${cmd}`][4].nft_count} SUPPLY\n
          ${body.result.data[`${cmd}`][4].twitter}
          ${body.result.data[`${cmd}`][4].time}\n
          \n
          **More drops info below:**👉 \n[MAGICEDEN](https://magiceden.io/drops)
          `)
          .setThumbnail(body.image)
          .setFooter({
            text: `Requested By ${interaction.user.tag}`,
            iconURL: interaction.member.displayAvatarURL({ dynamic: true }),
          });

        interaction.followUp({ embeds: [embed] });
        })
      })
    }}
  },
);