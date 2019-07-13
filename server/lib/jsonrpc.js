'use strict'
const WebSocketClient = require('ws');
var _url=""
var _config={}
var _name=""
class JsonRPC {
    constructor() {
        this._ws={}
        this.callbackOpen = this.callbackOpen.bind(this);
        this.callbackMessage = this.callbackMessage.bind(this);
        this.callbackRXString = this.callbackRXString.bind(this);
        this.callbackError = this.callbackError.bind(this);
        this.callbackClose = this.callbackClose.bind(this);

    }
    get Name(){return _name;}
    set Name(value){_name=value}
    get Url() {
        return _url;
    }
    set Url(value) {
        _url = value;
    }
    init({ url, config }) {
        _url = url ? url : _url;
        _config = config ? config : _config;

        this._ws = new WebSocketClient(_url, _config);
        this._ws.on('open', ()=>{
            console.log(`connected to ${_url}`)
            this.callbackOpen()
        });
        this._ws.on('message', (data)=>{
            
            this.callbackRXString(data)
        });
        this._ws.on('error', (error)=>{

            this.callbackError(error)
        });
        this._ws.on('close', ()=>{
            console.log('closed')
            this.callbackClose();
        });
    }
    callbackOpen(){}        
    
    callbackMessage(data) {}
    callbackRXString(str) {
        console.log(`rx:${str}`)
        this.callbackMessage(JSON.parse(str))
    }
    callbackError(error) {}
    callbackClose() {}

    send(str) {
        if (WebSocketClient.OPEN != this._ws.readyState) throw "need to open first";
        this._ws.send(str);
    }
    sendJson(json) {
        this.send(JSON.stringify(json));
    }
    close() {
        if(!this._ws instanceof WebSocketClient) return;
        this._ws.close();
    }
}


module.exports = JsonRPC;



