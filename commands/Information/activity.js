const { Command } = require("../../utils/command/command");
const ee = require("../../settings/config").embed
const { readdirSync } = require("fs");
const { MessageEmbed } = require("discord.js");
const { get } = require("request-promise-native");

module.exports = new Command({
  // options
  name: "activity",
  description: `Check recent activity of a Solana Collection`,
  userPermissions: ["SEND_MESSAGES"],
  botPermissions: ["SEND_MESSAGES"],
  category: "Information",
  cooldown: 5,
  options: [
    {
      name: "collection",
      description: `Give a collection name/symbol. Leave empty for HELP info.`,
      type: "STRING",
      required: false,
    },
  ],
  // command start
  run: async ({ client, interaction, args, prefix }) => {
    // Code
    let cmd = interaction.options.getString("collection");
    if (cmd == 'help' | !cmd) {


      interaction.followUp({
        embeds: [
          new MessageEmbed()
          .setColor('BLUE')
          .setTitle(`TSC Collection Activity Check`)
          .setDescription(`
\`\`\`🖊️ Discord command:: /activity(space)[collection symbol/name]
🖋️ Sample command :: /activity tshc | /activity art_of_mob\`\`\`
**📙 TSC ACTIVITY CHECK**
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
      const wow = {
        url: `https://api-mainnet.magiceden.dev/v2/collections/${cmd}/activities?offset=0&limit=10`,
        json: true
        
        }

        get(wow).then(body => {

          interaction.followUp(`Fetching request..\nRequest is invalid if you don't get a response within 3-5secs.\nType \`${prefix}activity help\` for command info. 👻`).then(msg => {

          let embed = new MessageEmbed()
          .setTitle(`TSC PROJECT ACTIVITY CHECK`)
          .setColor("RANDOM")
          .setDescription(`5 latest activities for **${body[0].collection.toUpperCase()}**:\n\n
          💰 **${body[0].type.toUpperCase()}** | **${body[0].price} SOL**.
          **Buyer:** ${body[0].buyer}
          **Seller:** ${body[0].seller}\n
          **Txn Sig:** ${body[0].signature}\n

          💰 **${body[1].type.toUpperCase()}** | **${body[1].price} SOL**.
          **Buyer:** ${body[1].buyer}
          **Seller:** ${body[1].seller}\n
          **Txn Sig:** ${body[1].signature}\n
      
          💰 **${body[2].type.toUpperCase()}** | **${body[2].price} SOL**.
          **Buyer:** ${body[2].buyer}
          **Seller:** ${body[2].seller}\n
          **Txn Sig:** ${body[2].signature}\n
      
          💰 **${body[3].type.toUpperCase()}** | **${body[3].price} SOL**.
          **Buyer:** ${body[3].buyer}
          **Seller:** ${body[3].seller}\n
          **Txn Sig:** ${body[3].signature}\n
      
          💰 **${body[4].type.toUpperCase()}** | **${body[4].price} SOL**.
          **Buyer:** ${body[4].buyer}
          **Seller:** ${body[4].seller}\n
          **Txn Sig:** ${body[4].signature}\n
      
          View more activity here: 👉 [MAGICEDEN](https://magiceden.io/marketplace/${cmd}?activeTab=activity)`)
          .setTimestamp()
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