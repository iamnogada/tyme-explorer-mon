const EventEmitter = require('events')

const JsonRPC = require('../lib/jsonrpc');
const util = require('../lib/util');
const config = require('../config/config');

const _rpc =new JsonRPC();

class Blockinfo extends EventEmitter {
    constructor(){
        super()
        this.blockno=0;
        _rpc.callbackMessage = _onmessage.bind(this)
        _rpc.callbackClose = _onclose.bind(this)
        _rpc.callbackOpen =_onopen.bind(this)
        // _rpc.callbackError = _onerror.bind(this)
        _rpc.init({ url: config.apiEndpoint });
    }
    getBlock(blockno){
        this.blockno=blockno
        _rpc.send(util.ParamGetBlock(this.blockno))        
    }
    get RECEIVE_BLOCK() {
        return 'receive-block';
    }    
}
function _onopen() {
    // _rpc.send(util.ParamGetBlock(1))
}
function _onmessage(data) {
    // Get next blockno
    if (null === data.result) {
        console.log("Blockinfo:Start receive blockinfo");
        return;
    }
    
    this.emit(this.RECEIVE_BLOCK, data.result)
}
function _onclose() {
    _rpc.init({ url: config.apiEndpoint });
}
function _onerror(error) { }
module.exports= new Blockinfo();
