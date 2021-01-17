import { Markup, Telegraf } from "telegraf"
import { EventHelper, Event } from "../analytics/analytics"
import DatabaseDataSource from "../datasource/db/DatabaseDataSource"
import { createSetUsernameButton } from "./messages"
import { getUser, getUserId } from "./utils"

function commandStart(bot: Telegraf<any>, analytics: EventHelper, db: DatabaseDataSource) {
    const setUsernameButton = createSetUsernameButton()

    bot.start((ctx) => {
        analytics.logEvent(Event.COMMAND_START, getUserId(ctx))
        db.createUser(getUser(ctx))
        ctx.reply("Welcome! 🥳\n\nTo get to know what this bot can do for you type / and take a look to all the available commands. ⌨️\n\nIf you want you can send me right now your Thingiverse username so that you don't have to manually type it for each command 👌",
            setUsernameButton)
    })
}

export default commandStart