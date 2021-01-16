import DatabaseDataSource from "../datasource/db/DatabaseDataSource"

export class EventHelper {
    client: any
    db: DatabaseDataSource

    constructor(db : DatabaseDataSource) {
        const Analytics = require('analytics-node')
        this.client = new Analytics(process.env.SEGMENT_API_KEY)
        this.db = db
    }

    logEvent(event: Event) {
        try {
            this.client.track({
                event: event,
                userId: "test"
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export enum Event {
    APP_START = "app_start",

    COMMAND_START = "command_start",
    COMMAND_HELP = "command_help",
    COMMAND_LIKES = "command_likes",
    COMMAND_COLLECTIONS = "command_collections",
    COMMAND_DESIGNS = "command_designs",
    COMMAND_MAKES = "command_makes",
    COMMAND_FILES = "command_files",
    COMMAND_ZIP = "command_zip",
    COMMAND_TAGS = "command_tags",
    COMMAND_SEARCH = "command_search",
    COMMAND_USERNAME = "command_username"
}