import firebase from "firebase";

export class Analytics {

    logEvent(event: AnalyticsEvent){
        firebase.analytics().logEvent(event)
    }

}
































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































export enum AnalyticsEvent {
    COMMAND_START = "command_start",
    COMMAND_HELP = "command_help",
    APP_START = "app_start",
    COMMAND_LIKES = "command_likes",
    COMMAND_COLLECTIONS = "COMMAND_COLLECTIONS",
    COMMAND_DESIGNS = "COMMAND_DESIGNS",
    COMMAND_MAKES = "COMMAND_MAKES",
    COMMAND_FILES = "COMMAND_FILES",
    COMMAND_ZIP = "COMMAND_ZIP",
    COMMAND_TAGS = "COMMAND_TAGS",
    COMMAND_SEARCH = "COMMAND_SEARCH",
    COMMAND_USERNAME = "COMMAND_USERNAME"
}