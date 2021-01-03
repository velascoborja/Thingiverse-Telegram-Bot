import { Telegraf, Markup } from 'telegraf'
import * as dotenv from 'dotenv'
import Thingiverse from './api/thingiverse'

import commandLikes from './commands/likes'
import commandCollections from './commands/collections'
import commandStart from './commands/start'
import commandHelp from './commands/help'
import commandDesigns from './commands/designs'
import commandDownload from './commands/download'

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN || '')
const thingiverse = new Thingiverse(process.env.THINGIVERSE_TOKEN)

commandStart(bot)
commandHelp(bot)
commandLikes(bot, thingiverse)
commandCollections(bot, thingiverse)
commandDesigns(bot, thingiverse)
commandDownload(bot, thingiverse)

bot.launch()