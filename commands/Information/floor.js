const { Command } = require("../../utils/command/command");
const ee = require("../../settings/config").embed
const { readdirSync } = require("fs");
const { MessageEmbed } = require("discord.js");
const { get } = require("request-promise-native");
const help = require("./help");

module.exports = new Command({
  // options
  name: "floorprice",
  description: `Check FP of a Solana Collection`,
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
          .setTitle(`TSC Collection Check`)
          .setDescription(`
          \`\`\`🖊️ Discord command:: /fp(space)[collection symbol/name]\n🖋️ Sample command :: /fp tshc | /fp art_of_mob\`\`\`
          **📙 TSC COLLECTION CHECK**
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
        url: `https://api-mainnet.magiceden.dev/v2/collections/${cmd}`,
        json: true
        
        }

        interaction.followUp(`Fetching request..\nRequest is invalid if you don't get a response within 3-5secs.\nType \`${prefix}floorprice help\` for command info. 👻`).then(msg => {
        get(ops).then(body => {
          const fp = body.floorPrice / 1000000000;
          const avesale = (body.avgPrice24hr / 1000000000).toFixed(2);
        let embed = new MessageEmbed()
          .setColor(ee.embed_color)
          .setTitle(`${body.name}`)
          .setDescription(`Collection's **FLOOR PRICE** is **${fp} SOL**. \n \nTotal Listed: **${body.listedCount}**\nAverage sale price: **${avesale} SOL**\n \n 👻`)
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