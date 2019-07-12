'use strict'
var JsonRPC = require('./lib/jsonrpc');
const util = require('./lib/util');
const config = require('./config/config');

const BlockinfoSVC = require('./service/BlockinfoSVC');

var rpcRx = new JsonRPC();
rpcRx.Url = config.apiEndpoint;
rpcRx.RpcConfig = config.rpcConfig;


rpcRx.onClosed=()=>{
    console.log("Closed and rerun")
    run();
}
rpcRx.onJson=(jsonData)=>{
    if(null === jsonData.result) {
        console.log("Start receive blockinfo");
        return;}
        //000004d1c54f96fc8f8e3c795afc0712113454d1
    let head = jsonData.params[1][0].previous;
    let no = parseInt(head.substring(0,8),16)+1;
    console.log("Blockno:"+no);
    BlockinfoSVC.getTransactions(3214696);
}
rpcRx.onOpen=(rpc)=>{
    let msg = util.ParamRPCCallback;
    rpc.sendString(msg);
}

//run();
BlockinfoSVC.getTransactions(3214696);
function run(){
    rpcRx.init();
    rpcRx.connect()
    .then((rpc)=>{
        let msg = util.ParamRPCCallback;
        rpc.sendString(msg);
    })
    .catch((e)=>{
        console.log(e)
    });
}

