import * as dotenv from 'dotenv';
dotenv.config();


const {
    PORT,
    TTV_USER_NAME,
    TTV_PASSWORD,
    TTV_CHANNELS
} = process.env;

/**
 * Applicaiton port number to use
 */
export const port: number = +PORT || 3300;

/**
 * Twitch account user name
 */
export const ttvUserName: string = TTV_USER_NAME;

/**
 * Twitch account password
 */
export const ttvPassword: string = TTV_PASSWORD;

/**
 * Twitch account channels
 */
export const ttvChannels: string[] = TTV_CHANNELS.split(',');