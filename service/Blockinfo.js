const util = require('../lib/util')
const { Block, Transaction } = require('../model')


class Blockinfo {
    constructor() { }
    async save(data) {
        var transaction = util.parseBlock(data)

        try {
            var result = await Block.findById({ _id: data._id });
            if (!result) {
                let block = new Block({
                    ...data
                })
                await block.save()
            }
            await Transaction.insertMany(transaction,{ordered:false})
        } catch (error) {
            if("BulkWriteError" == error.name && 11000 == error.code) return
            console.log(error.message);

        }
    }
}
module.exports = new Blockinfo()
