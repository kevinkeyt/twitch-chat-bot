import { Client, ChatUserstate } from 'tmi.js';
import * as config from './config';

export class TwitchChat {
    public ttvClient: Client;

    constructor() {
        this.ttvClient = Client(this.setConfigOptions());
        this.ttvClient.on('join', this.handleJoin);
        this.ttvClient.on('part', this.handleLeave);
        this.ttvClient.on('chat', this.handleChat);
    }

    /**
     * Connect to the TTV Chat Client
     */
    public connect = () => {
        this.ttvClient
            .connect()
            .then(() => {
                console.log('Twitch chat connected!');
            })
            .catch(error => {
                console.error('error', error);
            });
    };

    private getTime = () => {
        const date = new Date();
        const rawMinutes = date.getMinutes();
        const rawHours = date.getHours();
        const hours = (rawHours < 10 ? '0' : '') + rawHours.toLocaleString();
        const minutes = (rawMinutes < 10 ? '0' : '') + rawMinutes.toLocaleString();
        return { hours, minutes };
    }

    /**
     * Handles chat event
     * @param channel 
     * @param userState 
     * @param message
     * @param self 
     */
    private handleChat = (channel: string, userState: ChatUserstate, message: string, self: boolean) => {
        if (self) return;
        
        const lowerCaseMessage = message.toLowerCase();
        if (self) return;

        if (lowerCaseMessage === '!hello') {
            this.ttvClient.say(channel, `@${userState.username}, heya!`);
        }
        if (lowerCaseMessage === '!dice') {
            const sides: number = 6;
            const num: number = Math.floor(Math.random() * sides) + 1;
            this.ttvClient.say(channel, `You rolled a ${num}`);
        }
    }

    /**
     * When a user joins the channel
     * @param channel 
     * @param username 
     * @param self 
     */
    private handleJoin = (channel: string, username: string, self: boolean) => {
        const { hours, minutes } = this.getTime();
        console.log(`[${hours}:${minutes}] ${username} has JOINED the channel`);
    }

    /**
     * When a user leaves the channel
     * @param channel 
     * @param username 
     */
    private handleLeave = (channel: string, username: string) =>  {
        const { hours, minutes } = this.getTime();
        console.log(`[${hours}:${minutes}] ${username} has LEFT the channel`);
    }

    private setConfigOptions = () => {
        return {
            options: { debug: true },
            connection: {
                reconnect: true,
                secure: true
            },
            identity: {
                username: config.ttvUserName,
                password: config.ttvPassword
            },
            channels: config.ttvChannels
        };
    }
}