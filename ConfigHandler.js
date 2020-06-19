const {config} = require('./config.js')
const GET_ADMIN_BALANCE = 'getAdminBalance';
const VALIDATE_ADDRES = 'validateAddress';
const GET_BLOCK_NUMBER = 'getBlockNumber';
const SEND_CURRENCY = 'sendCurrency';


class ConfigHandler{
        
   static configParser(){
        try {
            // console.log(config)
            config.forEach(element => {
                if(element.ticker){
                    let server = element.server
                    let port = element.port
                    let methods = element.methods
                    let getMethodsInterval = element.getMethodsInterval
                    ConfigHandler.funcCaller(element.ticker,server,port,methods,getMethodsInterval)
                }
            });
        }catch (e) {
            return (e)
        }
    }

    static funcCaller(ticker,server,port,methods,getMethodsInterval){
        try {
            console.log(methods)


            if(methods.hasOwnProperty(GET_ADMIN_BALANCE)) {

                setInterval(() => {
                    //call function get admin balance
                    console.log(`Call function get Balance ${ticker} with interaval ${getMethodsInterval} ms`)
                }, getMethodsInterval);
            }

            if(methods.hasOwnProperty(GET_BLOCK_NUMBER)) {
                //call function get block number
            }

            if(methods.hasOwnProperty(SEND_CURRENCY)) {
                let sendParams = methods.sendCurrency;
                setInterval(() => {
                    console.log(`Call function send Transaction ${ticker} with interaval ${sendParams.sendCurrencyInteval} ms`)
                }, sendParams.sendCurrencyInteval);
            }
        }catch (e) {
            return reject(e)
        }
    }
    
    
}

module.exports = ConfigHandler
// let configHandler = new ConfigHandler()

// let healthMonitor1 = new healthMonitor()



    let testObj = {
        name: 'alex',
        age: 25
    }

let a  = true
switch(testObj.hasOwnProperty('name')){
    case true:
        // console.log('df')
        // console.log('aadfa')
    break;
}