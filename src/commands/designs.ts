import { Telegraf } from "telegraf"
import Thingiverse from "../api/thingiverse"
import { thingToMessage } from "../messages"
import * as Utils from "../utils"

function commandDesigns(bot: Telegraf<any>, thingiverse: Thingiverse) {
    bot.command("designs", (ctx) => {
        const username = Utils.removeCmd(ctx.message.text)
        thingiverse.getUsersDesigns(username)
            .then(async function (designs) {
                if (designs.length > 0) {
                    ctx.reply("🎨 These are your designs")

                    for (const element of designs) {
                        await ctx.replyWithPhoto(element.thumbnail, { caption: thingToMessage(element) })
                    }

                    ctx.reply("🏁 That's all!")
                } else ctx.reply("0️⃣ No designs were found")
            })
            .catch(function (error) {
                ctx.reply("Couldn't retrieve yout designs 🤷‍♂️")
            })
    })
}

export default commandDesigns