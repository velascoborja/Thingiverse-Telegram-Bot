import { Telegraf } from "telegraf"
import { EventHelper, Event } from "../analytics/analytics"

function commandHelp(bot: Telegraf<any>, analytics: EventHelper) {
    bot.help((ctx) => {
        analytics.logEvent(Event.COMMAND_HELP)
        ctx.reply("🧐 To get to know what this bot can do for you type / to check all the available commands.")
    })
}

export default commandHelp