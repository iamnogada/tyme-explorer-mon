const EventEmitter = require('events')

const JsonRPC = require('../lib/jsonrpc');
const util = require('../lib/util');
const config = require('../config/config');

const _rpc = new JsonRPC();

class BlockMonitor extends EventEmitter {
    constructor() {
        super()
        _rpc.callbackMessage = _onmessage.bind(this)
        _rpc.callbackClose = _onclose.bind(this)
        // _rpc.callbackError = _onerror.bind(this)
    }
    start() {
        _rpc.init({ url: config.apiEndpoint });
    }

    get RECEIVE_BLOCK() {
        return 'receive-block';
    }
}
_rpc.callbackOpen = () => {
    _rpc.send(util.ParamRPCCallback);
}
function _onmessage(data) {
    // Get next blockno
    if (null === data.result) {
        console.log("Start receive blockinfo");
        return;
    }
    let no,head;
    try {
        head = data.params[1][0].previous;
        no = parseInt(head.substring(0, 8), 16) + 1;
    }catch(e){
        console.error("parse data in blockinfo");
        return;
    }
    this.emit(this.RECEIVE_BLOCK, no)
}
function _onclose() {
    // this.start();
}
function _onerror(error) { }

module.exports = new BlockMonitor();