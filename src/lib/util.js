class Util {
    constructor(){
        this.RPC_HEADER = "database_api";
        this.RPC_DUMMY = [1234];
        this.FUNC_RPCCALLBACK = "set_block_applied_callback";
        this.FUNC_GETBLOCK="get_block";
    }

    get ParamRPCCallback() {
        var msg = {
            "jsonrpc": "2.0",
            "method": "call",
            "params": [],
            "id": 1
        };
        msg.params = [];
        msg.params.push(this.RPC_HEADER);
        msg.params.push(this.FUNC_RPCCALLBACK);
        msg.params.push(this.RPC_DUMMY);
        return JSON.stringify(msg);
    };
    ParamGetBlock(blockNumber) {
        let msg = {
            "jsonrpc": "2.0",
            "method": "call",
            "params": [],
            "id": 2
        };
        msg.params = [];
        msg.params.push(this.RPC_HEADER);
        msg.params.push(this.FUNC_GETBLOCK);
        var block =[];
        block.push(blockNumber);
        msg.params.push(block);
        return JSON.stringify(msg);
    };
}

module.exports = new Util();
