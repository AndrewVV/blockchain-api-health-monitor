const ApiCallHandler = require("./ApiCallHandler");
// const TelegramReportService = require('./TelegramReporter');
const { config } = require("./config.js");

// TelegramReportService.sendMessage(data);

class MainClass {
    static mainMethod() {
        try {
            const curentConfig = config.filter((item) => {
                if (item.ticker) return item;
            });
            curentConfig.forEach((item) => {
                for (const method in item.methods) {
                    ApiCallHandler[method]({
                        ticker: item.ticker,
                        server: item.server,
                        port: item.port,
                        params: item.methods[method],
                    }).then((res) => console.log(res));
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

MainClass.mainMethod();
