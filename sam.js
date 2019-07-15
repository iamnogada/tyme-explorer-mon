const util = require('./lib/util')
const data = require('./model/data')
const WSBlockinfo = require('./service/WSBlockinfo')
const { Block, Transaction } = require('./model')
const BlockInfo = require('./service/Blockinfo')


WSBlockinfo.init({})

WSBlockinfo.on(WSBlockinfo.EVENT_ON_BLOCK, (data) => {
    console.log(`Getblock:${data.block_id}`)
    BlockInfo.save(data)
    .then(()=>{
        console.log('done');
    })
    .catch(err=>{
        console.log('error:'+error.message);
        
    })
    // // var tr = util.parseBlockTransaction(data)
    // var transaction = util.parseBlock(data)
    // console.log(`block: ${JSON.stringify(data)}`)
    // console.log(`tr: ${JSON.stringify(transaction)}`)

    // // var transaction = [...data.transaction]
    // delete data.transactions
    // Block.findById({ _id: data._id }).exec((err, result) => {
    //     if (!!result) return;
    //     let record = new Block({
    //         ...data
    //     })
    //     record.save()
    //         .then(doc => {
    //             console.log(doc);
    //         })
    //         .catch(error => {
    //             console.log("error");

    //         })
    // })
})
// WSBlockinfo.requestBlock(3820335)

WSBlockinfo.requestBlock(1)
//tr 9: 3796340
//ac 2, tr 1: 3795917



