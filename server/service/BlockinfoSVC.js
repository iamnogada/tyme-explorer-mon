const JsonRPC = require('../lib/jsonrpc');
const config = require('../config/config');
const util = require('../lib/util');

class BlockInfoSVC {
    constructor() {
        this.rpcTx = new JsonRPC();
        this.rpcTx.Url = config.apiEndpoint;
        this.rpcTx.RpcConfig = config.rpcConfig;
        this.rpcTx.onOpen=this.onOpen.bind(this);
        this.rpcTx.onClosed=this.onClosed.bind(this);
        this.rpcTx.onJson = this.onJson.bind(this);
        this.rpcTx.init();
        this.blockNumber=-1;
    }
    onOpen(rpc){
        let msg = util.ParamGetBlock(this.blockNumber);
        rpc.sendString(msg);
    }
    onClosed(){
        console.log("Closed");
        rpcTx.init();
    }
    onJson(value){
        console.log(JSON.stringify(value))
    }
    run() {        
        
    }
    getTransactions(blockNumber) {
        this.blockNumber = blockNumber;
        this.rpcTx.connect()
            .then((data)=>{})
            .catch((e) => {
                console.log(e)
            });
    }
}

module.exports=new BlockInfoSVC();
