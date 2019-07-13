var WebSocketClient = require('websocket').client;
var client = new WebSocketClient({timeout:20000,reconnection:true});
var apiEndpoint = "ws://13.124.23.192:6300"

client.on('connectFailed',(error)=>{
    console.log('Error in connection'+error.toString());
});

client.on('connect',(connection)=>{
    console.log("connected");
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            var result = JSON.parse(message.utf8Data);
            console.log(result);
        }
    });
    

    function send(){
        if (connection.connected) {
            var msg = getRequestData();
            connection.sendUTF(JSON.stringify(msg));
        }
    }
    send();
    console.log("sent");
});
client.on('connectFailed', function(error) {
    console.log("Connection Error: " + error.toString());
});

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
var msg = getRequestData();
console.log(JSON.stringify(msg));


client.connect(apiEndpoint);