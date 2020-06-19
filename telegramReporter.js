const PROJECT_NAME = "P2P_log_chat";
const ALLOWREPEAT_COMMAND_CODE = "Allow_repeat";
require("dotenv").config();


const TelegramBot = require("node-telegram-bot-api");
// process.env.telegramBotToken = '1021559295:AAF6yjjozo-RhHxDGP-RXUTm5XxrwP9Z6KI';
// let token = process.env.telegramBotToken;
let token = "970356293:AAE2m3BHM_QIkm9l5PXLSkYBMJkX05AuPq0";
console.log("working");
const bot = new TelegramBot(token, { polling: true });

let dataStorage;
let UniqueData;
let frequencyIndex = 0;
let frequency = 4;
//FOR TESTING//
// let data = {
// 	name: 'RequestError',
// 	code: 'not specified',
// 	uri: 'https://api.23ab2.com/app-incoming-transaction/eth',
// 	body: '{"walletAddress',
// 	message:
// 		'Error: getaddrinfo ENOTFOUND api.23ab2.com api.23ab2.com:443'
// }
//FOR TESTING

class TelegramReporter {
    constructor() {
        if (process.env.TELEGRAM_BOT_ENABLE == "true") {
            console.log(`working`);
            TelegramReporter.activateCommands();
        }
        this.chatId = 0;
        this.allowRepeatCode = 0;
    }

    static activateCommands() {
        return new Promise(async (resolve, reject) => {
            let chatId = this.chatId;
            try {
                bot.onText(/\/start/, (msg) => {
                    let chatId = msg.chat.id;
                    let mess = msg.message_id;
                    if (
                        TelegramReporter.storeBlockNumber(chatId, PROJECT_NAME)
                    ) {
                        bot.sendMessage(
                            chatId,
                            `Telegram chat id saved:"${chatId}"`,
                            { parse_mode: "HTML" }
                        );
                        TelegramReporter.logger.logEvent(
                            `Telegram chat id saved: ${chatId}`,
                            true
                        );
                    }
                });
                // bot.onText(/edit/, (msg) => {
                // 	let chatId = 350985285
                // 	let mess = msg.message_id;
                // 	let messageid = 4540;
                // 	let replyMarkup = {
                // 		inline_keyboard: []
                // 	}
                // 	console.log(mess)

                // 		bot.editMessageText('Выбери свободное время', {
                // 			chat_id: chatId,
                // 			message_id: messageid,
                // 			reply_markup: replyMarkup,
                // 		})

                // })
                bot.onText(/\/allowRepeat/, (msg) => {
                    let chatId = msg.chat.id;
                    frequency = 1;
                    TelegramReporter.storeBlockNumber(
                        1,
                        ALLOWREPEAT_COMMAND_CODE
                    );
                    bot.sendMessage(
                        chatId,
                        `Telegram: re-sending of the same logs is allowed`,
                        { parse_mode: "HTML" }
                    );
                    TelegramReporter.logger.logEvent(
                        `Telegram repeat messeage is allowed`,
                        true
                    );
                });
                bot.onText(/\/disallowRepeat/, (msg) => {
                    let chatId = msg.chat.id;
                    TelegramReporter.storeBlockNumber(
                        0,
                        ALLOWREPEAT_COMMAND_CODE
                    );
                    frequency = 3;
                    bot.sendMessage(
                        chatId,
                        `Telegram: re-sending of the same logs is forbiden`,
                        { parse_mode: "HTML" }
                    );
                    TelegramReporter.logger.logEvent(
                        `Telegram repeat messeage is refused`,
                        true
                    );
                });
            } catch (e) {
                return reject(e);
            }
        });
    }

    static parseMessage(data) {
        return new Promise(async (resolve, reject) => {
            try {
                if (typeof data === "string") {
                    let maxStringLength = 1000;
                    if (data.length > maxStringLength) {
                        let cutedLength = data.length - maxStringLength;
                        data = data.substr(0, data.length - cutedLength);
                    }
                }
                if (typeof data === "object") {
                    data = await TelegramReporter.parseObject(data);
                }
                return resolve(data);
            } catch (e) {
                return reject(e);
            }
        });
    }

    static parseObject(object) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = ``;
                let maxValueLength = 300;
                for (let key in object) {
                    let value = object[key];
                    if (typeof value === "object") {
                        value = JSON.stringify(value);
                    }
                    if (typeof value === "string") {
                        if (value.length > maxValueLength) {
                            let cutedLength = value.length - maxValueLength;
                            value = value.substr(0, value.length - cutedLength);
                        }
                    }
                    result += `\n${key}: <code>${value} </code>`;
                }
                return resolve(result);
            } catch (e) {
                return reject(e);
            }
        });
    }

    static checkUnique(data) {
        return new Promise(async (resolve, reject) => {
            try {
                let result;
                if (!dataStorage) dataStorage = data;
                else {
                    if (dataStorage === data) {
                        result = "The same error!";
                    } else {
                        dataStorage = data;
                        result = data;
                    }
                }
                return resolve(result);
            } catch (e) {
                return reject(e);
            }
        });
    }

    static calculefrequency(data) {
        return new Promise(async (resolve, reject) => {
            try {
                // console.log(frequency)
                if (!UniqueData) {
                    UniqueData = data;
                    return resolve(true);
                } else if (UniqueData) {
                    frequencyIndex++;
                    if (frequencyIndex % frequency === 0) {
                        frequencyIndex = 0;
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                } else return resolve(true);
            } catch (e) {
                return reject(e);
            }
        });
    }

    static sendMessage(data) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("working-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
                let text = await TelegramReporter.parseMessage(data);
                let chatId = await TelegramReporter.getBlockNumberFrom(
                    PROJECT_NAME
                );
                if (
                    (await TelegramReporter.getBlockNumberFrom(
                        ALLOWREPEAT_COMMAND_CODE
                    )) === 0
                )
                    text = await TelegramReporter.checkUnique(text); // NEED TO ADD EDIT MESSAGE
                // if (await TelegramReporter.calculefrequency(data)) {
                if (!chatId)
                    throw new Error(
                        'Telegram chat id not saved, add bot to chat and write "/start" command'
                    );
                bot.sendMessage(chatId, `${text}`, { parse_mode: "HTML" })
                    .then((res) => {})
                    .catch((e) => {
                        throw new Error(
                            "Error pasting message text inside TelegagramReportService"
                        );
                    });
                // }
            } catch (e) {
                return reject(e);
            }
        });
    }

    static storeBlockNumber(number, commandCode) {
        return new Promise(async (resolve, reject) => {
            try {
                if (commandCode === PROJECT_NAME) this.chatId = number;
                if (commandCode === ALLOWREPEAT_COMMAND_CODE)
                    this.allowRepeatCode = number;
                return resolve(true);
            } catch (e) {
                return reject(e);
            }
        });
    }

    static getBlockNumberFrom(commandCode) {
        return new Promise(async (resolve, reject) => {
            try {
                if (commandCode === PROJECT_NAME) return resolve(this.chatId);
                if (commandCode === ALLOWREPEAT_COMMAND_CODE)
                    return resolve(this.allowRepeatCode);
                return (a = commandCode);
            } catch (e) {
                return reject(e);
            }
        });
    }

    //!! TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
    // editMessage() {
    // 	return new Promise(async (resolve, reject) => {
    // 		try {
    // 			bot.editMessageText(text, message_id)
    // 		} catch (e) {
    // 			return reject(e);
    // 		}
    // 	})
    // }
}

module.exports = TelegramReporter;
let telegram = new TelegramReporter();
