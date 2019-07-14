const util = require('../lib/util')



class Blockinfo {
    constructor() {

    }
    parse(data){
        let blockno = util.parseBlockNoFromId(data.block_id)
        let summary={
            transfer:0,
            account_create:0,
            account_update:0
        }
        let transaction = [...data.transactions]
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
        let block = {
            'blockno': blockno,
            'summary':summary,
            ...data,
        }
        block.transaction_ids.forEach((tr_id, index) => {
            transaction[index].id = tr_id
            transaction[index].blockno = blockno
        })
        delete block.transactions
    }
}
module.exports = new Blockinfo()
