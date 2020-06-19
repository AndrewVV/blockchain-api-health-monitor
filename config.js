require('dotenv').config()
let environment = process.env.NODE_ENV.toLocaleLowerCase();
console.log(environment)

// process.env.SERVER = "http://51.38.158.241"
// process.env.PORT = 38635
// process.env.INTERVAL = 2500

if (environment === 'development'){
    var DefaultUrl = "http://51.38.158.241"
    var DefaultPort = "38635"
    var defaultGetInterval = 2500
    var defaultSendTxInterval = 1500
} else {
    var DefaultUrl = "http://127.0.0.1"
    var DefaultPort = "38635"
    var defaultGetInterval = 25000
    var defaultSendTxInterval = 1800000
}
module.exports.config = [
    {
        // 'ticker': 'XLM',        // coment for disable currency
        'server': DefaultUrl,
        'port': DefaultPort,
        'getMethodsInterval': defaultGetInterval,
        'methods': {
            'getAdminBalance': true, 
            // 'getBlockNumber': true,
            // 'validateAddress': 'GAI3GJ2Q3B35AOZJ36C4ANE3HSS4NK7WI6DNO4ZSHRAX6NG7BMX6VJER',
            // 'sendCurrency': {
            //     'sendCurrencyInteval': defaultSendTxInterval,
            //     'address': 'GAI3GJ2Q3B35AOZJ36C4ANE3HSS4NK7WI6DNO4ZSHRAX6NG7BMX6VJER',
            //     'amount': 0.00001,
            //     'memo': 'HealthMonitor'
            // }   
        },
    },
    {
        'ticker': 'XRP',       // coment for disable currency
        'server': DefaultUrl,
        'port': DefaultPort,
        'getMethodsInterval': defaultGetInterval,
        'methods': {
            'getAdminBalance': true, 
            'getBlockNumber': true,
            'validateAddress': 'GAI3GJ2Q3B35AOZJ36C4ANE3HSS4NK7WI6DNO4ZSHRAX6NG7BMX6VJER',
            // 'sendCurrency': {
            //     'sendCurrencyInteval': 4000,
            //     'address': 'GAI3GJ2Q3B35AOZJ36C4ANE3HSS4NK7WI6DNO4ZSHRAX6NG7BMX6VJER',
            //     'amount': 0.00001,
            //     'memo': 'HealthMonitor'
            // }   
        },
    },
    {
        // 'ticker': 'BTC',     // coment for disable currency
        'server': process.env.SERVER,
        'port': 38631,
        'getMethodsInterval': 1000,
        'methods': {
            'getAdminBalance': true, 
            // 'getBlockNumber': true,
            'validateAddress': 'GAI3GJ2Q3B35AOZJ36C4ANE3HSS4NK7WI6DNO4ZSHRAX6NG7BMX6VJER',
            'sendCurrency': {
                'sendCurrencyInteval': 1000,
                'address': 'GAI3GJ2Q3B35AOZJ36C4ANE3HSS4NK7WI6DNO4ZSHRAX6NG7BMX6VJER',
                'amount': 0.00001,
                'memo': 'HealthMonitor'
            }   
        },
    }
]
