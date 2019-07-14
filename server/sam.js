const data = require('./data')
const util = require('./lib/util')

var block,transaction
var total
save = (data) => {
    var no = util.parseBlockNoFromId(data.block_id)
    block = {
        ...data,
        blockno: no
    }
    transaction = [...data.transactions]
    block.transaction_ids.forEach((tr_id, index) => {
        transaction[index].id = tr_id
        transaction[index].blockno = no
    })
    delete block.transactions
    var summary={
        transfer:0,
        create:0,
        update:0
    }
    total = transaction.reduce((accumulator, value)=>{
        if('transfer' == value.operations[0][0]){
            accumulator.transfer ++
        }
        console.log(JSON.stringify(accumulator))
        return accumulator
    },summary)
}


save(data)
// console.log(JSON.stringify(block))

console.log(`tr:\n${JSON.stringify(transaction)}`)

// const array1 = [1, 2, 3, 4];
// const reducer = (accumulator, currentValue) => {
//     accumulator + currentValue;
// }

// // 1 + 2 + 3 + 4
// console.log(array1.reduce(reducer));
// console.log(array1.reduce(reducer,5));