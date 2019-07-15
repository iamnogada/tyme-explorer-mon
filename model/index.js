const mongoose = require('mongoose')
const dbconfig  = require('../config/dbconfig')
const server =dbconfig.endpoint
const collection = dbconfig.name

class Database{
    constructor(){
        this._connect()
    }
    _connect(){
        mongoose.connect(`${server}/${collection}`)
        .then(()=>{
            console.log('mongodb connected')
        })
        .catch(error=>{
            console.error(`Database connection error\n${error}`)
            process.exit(1)
        })
    }
}
const connection = new Database()

module.exports.Block = require('./Block')
module.exports.Transaction = require('./Transaction')