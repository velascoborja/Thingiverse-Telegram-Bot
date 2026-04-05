import { Telegraf } from 'telegraf'
import * as dotenv from 'dotenv'
import Thingiverse from './datasource/api/thingiverse'
import UserStore from './datasource/UserStore'

import commandLikes from './commands/likes'
import commandCollections from './commands/collections'
import commandStart from './commands/start'
import commandHelp from './commands/help'
import commandDesigns from './commands/designs'
import commandFiles from './commands/files'
import commandZip from './commands/zip'
import commandTag from './commands/tag'
import commandSearch from './commands/search'
import commandMakes from './commands/makes'
import commandUsername from './commands/username'
import { EventHelper, Event } from './analytics/analytics'
import commandPopular from './commands/popular'
import commandCategories from './commands/categories'

dotenv.config()

const userStore = new UserStore()
const analytics = new EventHelper()
analytics.logEvent(Event.APP_START)

initTelegraf(userStore, analytics)
console.log("Bot started successfully")

function initTelegraf(userStore: UserStore, analytics: EventHelper) {

    const bot = new Telegraf(process.env.BOT_TOKEN || '')
    const thingiverse = new Thingiverse(process.env.THINGIVERSE_TOKEN)

    commandStart(bot, analytics)
    commandCategories(bot, thingiverse, userStore, analytics)
    commandHelp(bot, analytics)
    commandLikes(bot, thingiverse, userStore, analytics)
    commandCollections(bot, thingiverse, userStore, analytics)
    commandDesigns(bot, thingiverse, userStore, analytics)
    commandMakes(bot, thingiverse, userStore, analytics)
    commandFiles(bot, thingiverse, analytics)
    commandZip(bot, thingiverse, analytics)
    commandTag(bot, thingiverse, analytics)
    commandSearch(bot, thingiverse, analytics)
    commandPopular(bot, thingiverse, analytics)
    commandUsername(bot, userStore, analytics)

    bot.launch()
}
