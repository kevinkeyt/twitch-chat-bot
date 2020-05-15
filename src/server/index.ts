import { AppServer } from "./server";
import { TwitchChat } from "./twitch-chat";

const appServer = new AppServer();

const twitchChat = new TwitchChat();
twitchChat.connect();


export { appServer };