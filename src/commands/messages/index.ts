import Telegraf, { Markup } from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import { Thing } from "../../models/thing";

export function thingToMessage(thing: Thing): string {
    return `š· ${thing.name}\nā¤ļø ${thing.like_count}\nš ${thing.public_url}\nš Files: /files_${thing.id}\nā¬ļø Download ZIP: /zip_${thing.id}`
}

export function getSetUsernameMessage(): string {
    return 'Now send me your Thingiverse username š§āš»'
}

export function sendDefaultUsernameNotProvidedMessage(ctx: TelegrafContext) {
    const setUsernameButton = createSetUsernameButton()

    ctx.reply("Username was not specified š¤­\n\nIf you want to, you can specify a default username by typing /username or touching the button below",
        setUsernameButton)
}

export function createSetUsernameButton() {
    return Markup.inlineKeyboard([
        [Markup.callbackButton('Set username', 'setUserName')]
    ]).extra();
}
