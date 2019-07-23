const mongoose = require('mongoose')

const blockSchema = new mongoose.Schema({
    _id: Number,
    summary: {
        transfer: Number,
        account_create: Number,
        account_update: Number
    },
    previous: String,
    timestamp : String,
    bobserver: String,
    transaction_merkle_root: String,
    extensions:{},
    bobserver_signature: String,
    block_id: String,
    signing_key: String,
    transaction_ids:[String]
})

var Block = mongoose.model('Block',blockSchema)
module.exports = Block