import { Telegraf } from "telegraf"
import Thingiverse from "../api/thingiverse"
import * as Utils from './../utils'


function commandLikes(bot: Telegraf<any>, thingiverse: Thingiverse) {

    bot.command('likes', (ctx) => {

        const userName = Utils.removeCmd(ctx.message?.text)

        if (userName != '') {
            ctx.reply("⏳ Loading your likes...")

            thingiverse.getLikes(userName)
                .then(async function (likes) {
                    if (likes.length > 0) {
                        ctx.reply("❤️ These are your likes")

                        for (const element of likes) {
                            await ctx.replyWithPhoto(element.thumbnail, { caption: `🏷 ${element.name}\n❤️ ${element.like_count}\n🌐 ${element.public_url}\n` })
                        }

                        ctx.reply("🏁 That's all!")
                    } else ctx.reply("0️⃣ No likes were found")
                })
                .catch(function (error) {
                    ctx.reply("Couldn't retrieve yout likes 🤷‍♂️")
                })
        } else ctx.reply("Username was not specified 🤭")
    })

}

export default commandLikes