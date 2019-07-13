// const JsonRPC = require('./lib/jsonrpc');
const util = require('./lib/util');
const config = require('./config/config');
const WebSocketClient = require('ws');

var ws1 = new WebSocketClient(config.apiEndpoint);
var ws2 = new WebSocketClient(config.apiEndpoint);

ws1.on('open',()=>{
    console.log('ws1:open')
    ws1.send(util.ParamRPCCallback)
})
ws1.on('message', (data)=>{
    console.log(`ws1:message:${data}`)
    ws1.close();
});
ws1.on('error', (error)=>{
    
});
ws1.on('close', ()=>{
    console.log('ws1:closed')
});
ws2.on('open',()=>{
    console.log('ws1:open')
    ws2.send(util.ParamRPCCallback)
})
ws2.on('message', (data)=>{
    console.log(`ws2:message:${data}`)
});
ws2.on('error', (error)=>{

});
ws2.on('close', ()=>{
    console.log('ws2:closed')
});