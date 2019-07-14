const EventEmitter = require('events')
const WebSocketClient = require('ws')
const util = require('../lib/util')
const config = require('../config/config')

var self
var _url = config.apiEndpoint
var _config = {}

var ws //websocket client

class BlockMonitor extends EventEmitter {
    constructor() {
        super()
    }
    start({ url, config }) {
        _url = url ? url : _url;
        _config = config ? config : _config;
        ws = new WebSocketClient(_url, _config);
        ws.once('open', () => {
            console.log(`connected to ${_url} for blockinfo:${ws.readyState}`)
            ws.send(util.ParamRPCCallback);
        });
        ws.on('message', (data) => {
            _onmessage(data)
        });
        ws.on('error', (error) => {
            _onerror(error)
        });
        ws.on('close', () => {
            console.log('closed')
            _onclose()
        });
    }
    requestBlock(blockno) {
        if (undefined == ws
            || WebSocketClient.OPEN !== ws.readyState) {
            msg.push(blockno)
            return
        }
        
    }
    static get EVENT_ON_BLOCK() {
        return 'event:block';
    }
}

function _onmessage(data) {
    console.log(`rx:${data}`)
    let jsonData = JSON.parse(data)
    if (null === jsonData.result) {
        console.log("Start receive blockinfo");
        return;
    }
    let no,head;
    try {
        head = jsonData.params[1][0].previous;
        no = parseInt(head.substring(0, 8), 16) + 1;
    }catch(e){
        console.error("parse data in blockinfo");
        return;
    }
    self.emit(this.EVENT_ON_BLOCK, no)
}
function _onclose() {
    self.start({});
}
function _onerror(error) { }
self =new BlockMonitor()
module.exports = self