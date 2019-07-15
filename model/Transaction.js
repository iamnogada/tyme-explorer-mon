const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    ref_block_num: Number,
    ref_block_prefix: Number,
    expiration: String,
    operations: {},
    extensions:{},
    signatures: [String],
    _id: String,
    blockno: Number,
    timestamp: String
})

var Transaction = mongoose.model('Transaction',transactionSchema)
module.exports = Transaction