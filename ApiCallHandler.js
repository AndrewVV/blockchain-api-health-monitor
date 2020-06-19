const fetch = require('node-fetch')
require('dotenv').config()

const AUTH_TOKEN = process.env.AUTH_TOKEN
console.log(AUTH_TOKEN)
const GET = 'get'
const POST = 'post'
const DELETE = 'delete'

const SERVER = process.env.SERVER
const PORT = process.env.PORT
const INTERVAL = process.env.INTERVAL

// console.log(INTERVAL)
class ApiCallHandler{
    constructor() {

    }
    


    // run(){
    //     // setInterval(()=>{
    //         // this.getAdminBalance('xlm')
    //         // this.getBlockNumber('xlm')
    //         // this.validateAddress('xlm')
    //         // this.sendCurrency('xlm')
    //         // this.fromBuffer()
    //         // console.log('tick')
    //         // },INTERVAL)
    //     }
        
    async sendCurrency(ticker, port=PORT, server=SERVER, params=SendCurrencyParams){
        try {
            console.log(params)
            const method = 'send'
            const url = this.composeUrl(server, port, ticker, method)
            const res = await this.fetchUrl(url, POST, params)
            if (res.result === true && res.txHash) { 
                console.log('Test passed:)');
                return true
            } else if (res.result === false && res.message){
                console.log(`test failed`) 
                return res.message
            }
        }catch (e) {
            return (e)
        }
    }
            
    getAdminBalance(ticker){
        return new Promise(async(resolve,reject)=>{
            try {
                const method = 'admin/balance'
                let url = this.composeUrl(SERVER, PORT, ticker, method)
                let res = await this.fetchUrl(url)
                // console.log(res)
                if (res.result === true && res.balance) { 
                    console.log('Test passed');
                    return resolve = true
            }
                else {
                    console.log(`test failed`) 
                    return resolve (false)
                }
            }catch (e) {
                return reject(e)
            }
        })
    }

    getBlockNumber(ticker){
        return new Promise(async(resolve,reject)=>{
            try {
                const method = 'block/count'
                let url = this.composeUrl({server:SERVER, port:PORT, ticker, method})
                let res = await this.fetchUrl(url)
                // console.log(res)
                if (res.result === true && res.number) { 
                    console.log('Test passed');
                    return resolve = true
                } else {
                    console.log(`test failed`) 
                    return resolve = false
                }
            }catch (e) {
                return reject(e)
            }
        })
    }

    static async validateAddress(values){
        try {
            const {ticker, address} = values;
            const method = `address/validate/${address}`
            const url = ApiCallHandler.composeUrl({server:SERVER, port:PORT, ticker, method})
            const res = await ApiCallHandler.fetchUrl(url)
            if (res.result) { 
                console.log('Test passed');
                return true
            } else {
                console.log(`test failed`) 
                return false
            }
        }catch (e) {
            return e
        }
    }


    static composeUrl(values){
        try {
            console.log(values)
            const {ticker, method, data, server, port} = values
            // console.log(ticker)
            console.log(`${server}:${port}/${ticker}/${method}`)
            return `${server}:${port}/${ticker}/${method}`
        } catch (error) {
            return error
        }
    }
//
    static fetchUrl(url, method = GET, params = {}){
        return new Promise(async(resolve,reject)=>{
            try {
                let formBody
                if (method.toLocaleUpperCase() === 'POST' || method.toLocaleUpperCase() === 'PUT'){
                    formBody = [];
                    for (var property in params) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(params[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                    }
                    formBody = formBody.join("&");
                }
                fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': AUTH_TOKEN },
                    body: formBody
                    }).then(res => {
                        let bufferBody = res.body._readableState.buffer.head.data
                        let fromBuffer = bufferBody.toString('utf8')
                        console.log(fromBuffer)
                        let result
                        try{
                            JSON.parse(fromBuffer) 
                            result = JSON.parse(fromBuffer) 
                        } catch {
                            result = false
                        }
                        return resolve (result)
                    }).catch(e => console.log(e))
            }catch (e) {
                return reject(e)
            }
        })
    }
    
}



// let ApiCallHandler = new ApiCallHandler()
// let ApiCallHandler1 = new ApiCallHandler()
module.exports = ApiCallHandler;

