const EventEmitter = require('events')
const WebSocketClient = require('ws')
const util = require('../lib/util')
const config = require('../config/config')

var self
var _url = config.apiEndpoint
var _config = {}

var msg = []
var ws

class Blockinfo extends EventEmitter {
    constructor() {
        super()
    }
    init({ url, config }) {
        _url = url ? url : _url;
        _config = config ? config : _config;
        ws = new WebSocketClient(_url, _config);
        ws.once('open', () => {
            console.log(`connected to ${_url} for blockinfo:${ws.readyState}`)
            if (0 == msg.length) return
            let no = msg.shift();
            this.requestBlock(no);
        });
        ws.on('message', (data) => {
            _onmessage(data)
            if (0 == msg.length) return
            let no = msg.shift();
            this.requestBlock(no);
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
        ws.send(util.ParamGetBlock(blockno));
    }
    static get EVENT_ON_BLOCK() {
        return 'event:block';
    }
}

function _onmessage(data) {
    console.log(`rx:${data}`)
    let jsonData = JSON.parse(data)
    // Get next blockno
    if (null === jsonData.result) {
        console.log("Blockinfo:Start receive blockinfo");
        return;
    }
    self.emit(Blockinfo.EVENT_ON_BLOCK, jsonData.result)
}
function _onclose() {
    self.init();
}
function _onerror(error) { }

self = new Blockinfo()
module.exports = self;
