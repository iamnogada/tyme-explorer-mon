const EventEmitter = require('events')
const WebSocketClient = require('ws')
const util = require('../lib/util')
const apiconfig  = require('../config/apiconfig')
const ServiceStatus = require('./Health')


var self
var _url = apiconfig.endpoint
var _config = apiconfig.options
var msg = []
var ws

class WSBlockinfo extends EventEmitter {
    constructor() {
        super()
    }
    init({ url, config }) {
        _url = url ? url : _url;
        _config = config ? config : _config;
        ws = new WebSocketClient(_url, _config);
        ws.once('open', () => {
            ServiceStatus.Blockinfo=true
            console.log(`Blockinfo connected to ${_url} for blockinfo`)
            if (0 == msg.length) return
            let blockno = msg.shift();
            this.requestBlock(blockno);
        });
        ws.on('message', (data) => {
            _onmessage(data)
            if (0 == msg.length) return
            let no = msg.shift();
            this.requestBlock(no);
        });
        ws.on('error', (error) => {
            ServiceStatus.Blockinfo=false
            _onerror(error)
        });
        ws.on('close', () => {
            ServiceStatus.Blockinfo=false
            console.log('Blockinfo:closed')
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
    get EVENT_ON_BLOCK() {
        return 'event:block';
    }
}

function _onmessage(data) {
    // console.log(`rx:${data}`)
    let jsonData = JSON.parse(data)
    // Get next blockno
    if (null === jsonData.result) {
        console.log("Blockinfo:Invalid data received");
        return;
    }
    self.emit(self.EVENT_ON_BLOCK, jsonData.result)
}
function _onclose() {
    self.init({});
}
function _onerror(error) { }

self = new WSBlockinfo()
module.exports = self;
