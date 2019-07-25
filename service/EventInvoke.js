const redisconfig  = require('../config/redisconfig')
const redis = require('redis')

class EventInvoker {
    constructor(){
        this.pub = redis.createClient({
            host: redisconfig.endpoint,
            port: redisconfig.port
        })
       
        this.pub.on('error',this.onerror)
    }
    invoke(msg){
        this.pub.publish(redisconfig.channel,msg)
    }
    // onsubscribe(channel,count){
        
    // }
    // onmessage(channel,count){

    // }
    onerror(channel,count){

    }
}
module.exports=new EventInvoker()