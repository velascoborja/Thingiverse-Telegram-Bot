export class EventHelper {
    logEvent(event: Event, userId?: string, params?: Map<EventParam, string>) {
        const paramsStr = params ? Array.from(params.entries()).map(([k, v]) => `${k}=${v}`).join(' ') : ''
        console.log(`[analytics] event=${event}`, userId ? `userId=${userId}` : '', paramsStr)
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
    COMMAND_USERNAME = "command_username",
    COMMAND_POPULAR = "command_popular",
    COMMAND_CATEGORIES = "command_categories"
}

export enum EventParam {
    PARAM_SEARCH = "param_search",
    PARAM_THING_ID = "param_thing_id",
    PARAM_TAG = "param_tag"
}