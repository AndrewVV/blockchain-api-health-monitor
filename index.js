const ApiCallHandler = require('./ApiCallHandler');
const ConfigHandler = require('./ConfigHandler');
const TelegramReportService = require('./TelegramReporter');
// console.log(configHandler)
// console.log(ApiCallHandler['validateAddress']({ticker:'xlm', address:'dsf'}))
// ConfigHandler.configParser()
let data = {
    name: "alex",
    age: 25,
};
TelegramReportService.sendMessage(data);
// let healthMonitor = new HealthMonitor()

// console.log(HealthMonitor.)
// console.log(HealthMonitor.validateAddress({
//     ticker:'xlm',
//     address: 'GAI3GJ2Q3B35AOZJ36C4ANE3HSS4NK7WI6DNO4ZSHRAX6NG7BMX6VJER'
// }))
