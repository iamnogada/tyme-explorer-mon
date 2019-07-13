const WebSocketClient = require('websocket').w3cwebsocket;
const apiEndpoint = "ws://13.124.23.192:6300";
const client = new WebSocketClient(apiEndpoint);

client.onopen= ()=>{
    console.log("Connected");
    function send(){
        if (client.readyState === client.OPEN) {
            var msg = getRequestData();
            console.log(msg);
            client.send(JSON.stringify(msg));
            console.log("sent");
        }
    }
    send();
    console.log("sent");
}
client.onerror = (error)=>{
    console.log("Connection close: " + error.toString());
}
client.onclose = ()=>{
    console.log("Connection close: ");
}
client.onmessage = (message)=>{
    console.log("message: " + message.toString());
    if (message.type === 'utf8') {
        var result = JSON.parse(message.utf8Data);
        console.log(result);
    }
}





function getRequestData(){
    var msg = {
        "jsonrpc": "2.0",
        "method": "call",
        "params":[],
        "id": 1
    };
    msg.params=[];
    msg.params.push("database_api");
    msg.params.push("set_block_applied_callback");
    msg.params.push([1234]);
    return msg;
}

console.log("done");



