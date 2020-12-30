const { Telegraf, Markup } = require('telegraf')
const commandParts = require('telegraf-command-parts');
const axios = require('axios')
const dotenv = require('dotenv').config()

const thingiverse = axios.create({
  baseURL: 'https://api.thingiverse.com/',
  timeout: 10000,
  headers: { 'authorization': `Bearer ${process.env.THINGIVERSE_TOKEN}` }
});

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.use(commandParts())

bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Check available options tapping right side button'))

/* ---Gets LIKES from selected user--- */
bot.command('likes', (ctx) => {

  const userName = ctx.state.command.splitArgs[0]

  if (!userName == "") {
    ctx.reply("⏳ Loading your likes...")

    thingiverse.get(`users/${userName}/likes`)
      .then(async function (response) {
        ctx.reply("❤️ These are your likes")

        for (const element of response.data) {
          await ctx.replyWithPhoto(element.thumbnail, { caption: `🏷 ${element.name}\n❤️ ${element.like_count}\n🌐 ${element.public_url}\n` })
        }

        ctx.reply("🏁 That's all!")
      })
      .catch(function (error) {
        return ctx.reply("Couldn't retrieve yout likes 🤷‍♂️")
      })
  } else ctx.reply("Username was not specified 🤭")
})

/* ---Gets all COLLECTIONS from selected user--- */
bot.command('collections', (ctx) => {

  ctx.reply("⏳ Loading your collections...")

  // Make a request for a user with a given ID
  thingiverse.get(`users/${ctx.state.command.splitArgs[0]}/collections`)
    .then(function (response) {
      /*       response.data.forEach(element =>
              ctx.reply(element.absolute_url)
            ) */

      const collections = Markup.inlineKeyboard(response.data.map(it =>
        Markup.callbackButton(it.name, it.id)
      )).extra()

      return ctx.reply(
        'Like?',
        collections
      )
    })
    .catch(function (error) {
      return ctx.reply("Couldn't retrieve yout collections 🤷‍♂️")
    })
})

bot.launch()