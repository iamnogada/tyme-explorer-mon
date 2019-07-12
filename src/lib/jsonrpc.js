'use strict'
const WebSocketClient = require('websocket').w3cwebsocket;

class JsonRPC{
    constructor(){
        this._url="";
        this.client={};
        // this.on('event',()=>{
        //     console.log("event triggered inner");
        // });
        // this.onconnected = this.onconnected.bind(this);
        // this.emit = this.emit.bind(this);
    }
    init(url,rpcConfig){
        this._url=url?url:this._url;
        this._rpcConfig=rpcConfig?url:this._rpcConfig;
        this.client=new WebSocketClient(this._url,
            undefined,
            undefined,
            undefined,
            undefined,
            this._rpcConfig);
    }
    get Url(){
        return this._url;
    }
    set Url(value){
        this._url=value;
    }
    set RpcConfig(value){
        this._rpcConfig=value;
    }
    get state(){
        return this.readyState;
    }
    onJson(jsonData){
        onString(JSON.stringify(jsonData));
    }
    onString(strData){
        console.log("default message handler:"+strData);
    }
    onOpen(value){
        // console.log("default open handler");
    }
    
    onClosed(){
        console.log("closed callback internal");
    }
    sendString(strData){
        console.log(strData)
        this.client.send(strData);
    }
    connect(url,reconnect){
        if(! this.client instanceof WebSocketClient){
            throw "must initiate websocket first";
        }
        
        return new Promise((resolve,reject)=>{
            this.client.onopen= ()=>{
                this.onOpen(this);
            }
            this.client.onmessage = (message)=>{
                try {
                    let json = JSON.parse(message.data);
                    this.onJson(json);
                } catch (e) {
                    this.onString(message.data);
                }
            }
            this.client.onerror=(error)=>{
                console.error("ERROR:"+error.toString());
                reject(error);
            }
            this.client.onclose = ()=>{
                console.log("Connection close: ");
                setTimeout(() => {
                    this.onClosed();
                }, 100);
                
            }
        });
    }
}

module.exports = JsonRPC;



