const ApiCallHandler = require('./ApiCallHandler')
const ConfigHandler = require('./ConfigHandler')

ApiCallHandler['validateAddress']({
    ticker:'xlm',
    address:'GAI3GJ2Q3B35AOZJ36C4ANE3HSS4NK7WI6DNO4ZSHRAX6NG7BMX6VJER'
}).then(res => console.log(res))
// ConfigHandler.configParser()


// console.log(HealthMonitor.)
// console.log(HealthMonitor.validateAddress({
//     ticker:'xlm',
//     address: 'GAI3GJ2Q3B35AOZJ36C4ANE3HSS4NK7WI6DNO4ZSHRAX6NG7BMX6VJER'
// }))