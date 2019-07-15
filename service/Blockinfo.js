const util = require('../lib/util')
const { Block, Transaction } = require('../model')


class Blockinfo {
    constructor() { }
    async save(data) {
        var transaction = util.parseBlock(data)
        
        try {
            var result = await Block.findById({ _id: data._id });
            if (!!result) return // already saved
            let block = new Block({
                ...data
            })
            await block.save()
            await Transaction.insertMany(transaction)
        } catch (error) {
            console.log(error.message);

        }
    }
}
module.exports = new Blockinfo()
