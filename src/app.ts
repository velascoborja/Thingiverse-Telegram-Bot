import { Telegraf, Markup } from 'telegraf'
import axios from 'axios'
import * as Utils from './utils'
import * as dotenv from 'dotenv'

dotenv.config()

const thingiverse = axios.create({
  baseURL: 'https://api.thingiverse.com/',
  timeout: 10000,
  headers: { 'authorization': `Bearer ${process.env.THINGIVERSE_TOKEN}` }
});

const bot = new Telegraf(process.env.BOT_TOKEN || '')

bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Check available options tapping right side button'))

/* ---Gets LIKES from selected user--- */
bot.command('likes', (ctx) => {

  const userName = Utils.removeCmd(ctx.message?.text)

  if (userName != '') {
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

  const username = Utils.removeCmd(ctx.message?.text)

  // Make a request for a user with a given ID
  if (username != undefined) {
    thingiverse.get(`users/${username}/collections`)
      .then(function (response) {
        const bigarray = response.data
        const collectionArrays = []

        var size = 2;

        for (var i = 0; i < bigarray.length; i += size) {
          collectionArrays.push(bigarray.slice(i, i + size));
        }

        const collections = Markup.inlineKeyboard(collectionArrays.map(it =>
          it.map((it: { name: string; id: string; }) => Markup.callbackButton(it.name, it.id))
        )).extra()

        return ctx.reply(
          "📚 These are your colletions",
          collections
        )
      })
      .catch(function (error) {
        return ctx.reply("Couldn't retrieve yout collections 🤷‍♂️")
      })
  } else ctx.reply("Username was not specified 🤭")
})

bot.launch()