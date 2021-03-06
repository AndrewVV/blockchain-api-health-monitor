const ApiCallHandler = require("./ApiCallHandler");
const TelegramReportService = require("./TelegramReporter");
const TestsHandler = require("./testshandler");
const { config } = require("./config.js");
require("dotenv").config();

class MainClass {
    static mainMethod() {
        setInterval(() => {
            try {
                const curentConfig = config.filter(item => {
                    if (item.ticker) return item;
                });
                curentConfig.forEach((item) => {
                    for (const method in item.methods) {
                        const params = {
                            ticker: item.ticker,
                            server: item.server,
                            port: item.port,
                            params: item.methods[method],
                        };
                        ApiCallHandler[method](params).then((res) => {
                            params["res"] = res;
                            const result = TestsHandler[method](params);
                            
                            const telegramMessage = {
                                ticker: item.ticker,
                                port: item.port,
                                method: method,
                                working: result,
                            };
                            
                            if (res.result === false && res.message) {
                                telegramMessage.working = res.result;
                                telegramMessage["message"] = res.message;
                                TelegramReportService.sendMessage(telegramMessage);
                            }
                            if (result === false) {
                                telegramMessage["message"] =
                                "cannot conect with this currency in the server";
                                TelegramReportService.sendMessage(telegramMessage);
                            }
                            if (process.env.TELEGRAM_BOT_ENABLE === "true") {
                            }
                        });
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }, 9000);
    }

    // static async handleTestReults(values) {
    //     try {
    //         let result = TestsHandler[method]({
    //             ticker: item.ticker,
    //             server: item.server,
    //             port: item.port,
    //             params: item.methods[method],
    //             res: res,
    //         });
    //         return;
    //     } catch (e) {
    //         return e;
    //     }
    // }
}

MainClass.mainMethod();
