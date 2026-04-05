import { Markup, Telegraf } from "telegraf"
import { TelegrafContext } from "telegraf/typings/context"
import { Event, EventHelper } from "../analytics/analytics"
import UserStore from "../datasource/UserStore"
import { getSetUsernameMessage } from "./messages"
import { getUserId } from "./utils"

function commandUsername(bot: Telegraf<any>, userStore: UserStore, analytics: EventHelper) {

    bot.action("setUserName", (ctx: TelegrafContext) => {
        initSetUserNameProcess(ctx, analytics)
    })

    bot.command("username", function (ctx: TelegrafContext) {
        initSetUserNameProcess(ctx, analytics)
    })

    bot.on("message", function (ctx: TelegrafContext) {
        if (ctx.message.reply_to_message != undefined && ctx.message.reply_to_message.text == getSetUsernameMessage()) {
            const thingiverseUsername = ctx.message.text

            if (thingiverseUsername == undefined || thingiverseUsername == "") {
                ctx.reply("📭 Username cannot be empty")
            } else {
                userStore.setThingiverseUsername(getUserId(ctx), thingiverseUsername)
                    .then(function () {
                        ctx.reply(`✅ Username "${thingiverseUsername}" was correctly saved.\n\nFrom now on you can execute commands without specifing a username and the one you just set will be used`)
                    })
                    .catch(function () {
                        ctx.reply("❌ Couldn't set your username")
                    })
            }
        } else {
            ctx.reply("🙀 I can't understand what you're trying to tell me. Maybe you could try to type / and take a look to all available commands")
        }
    })
}

function initSetUserNameProcess(ctx: TelegrafContext, analytics: EventHelper) {
    analytics.logEvent(Event.COMMAND_USERNAME, getUserId(ctx))

    ctx.reply(getSetUsernameMessage(), Markup.forceReply().extra())
}

export default commandUsername
