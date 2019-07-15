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
    ParamGetBlock(blockNumber,id=1) {
        let msg = {
            "jsonrpc": "2.0",
            "method": "call",
            "params": [],
            "id": id
        };
        msg.params = [];
        msg.params.push(this.RPC_HEADER);
        msg.params.push(this.FUNC_GETBLOCK);
        var block =[];
        block.push(blockNumber);
        msg.params.push(block);
        return JSON.stringify(msg);
    };
    parseBlockNoFromId(id){
        try{
            return parseInt(id.substring(0, 8), 16)
        }catch(e){
            throw new Error(`[${id}] is not block id format`)
        }
    }
    parseBlock(data){
        let blockno = this.parseBlockNoFromId(data.block_id)
        let summary={
            transfer:0,
            account_create:0,
            account_update:0
        }
        var transaction = [...data.transactions]
        transaction.reduce((accumulator, value)=>{
            if('transfer' == value.operations[0][0]){
                accumulator.transfer ++
            }else if('account_create' == value.operations[0][0]){
                accumulator.account_create ++                
            }else if('account_update' == value.operations[0][0]){
                accumulator.account_update ++
            }
            return accumulator
        },summary)
        
        data._id = blockno
        data.summary=summary
        data.transaction_ids.forEach((tr_id, index) => {
            transaction[index]._id = tr_id
            transaction[index].blockno = blockno
            transaction[index].timestamp = data.timestamp
        })
        // delete data.transactions
        return transaction
    }
}

module.exports = new Util();
