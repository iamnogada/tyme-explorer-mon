const mongoose = require('mongoose')
const dbconfig = require('../config/dbconfig')
const server = dbconfig.endpoint
const collection = dbconfig.name
const ServiceStatus = require('../service/Health')
const fs = require('fs')
var ca

if(dbconfig.options.ssh){
    ca = [fs.readFileSync("../config/key.pem")];
}
class Database {
    constructor() {
        this._connect()

    }
    _connect() {
        mongoose.connection.on('reconnectFailed', (error) => {
            ServiceStatus.Database = false
            console.error(`Database connection error\n${error}`)
        })
        mongoose.connection.on('connected', () => {
            ServiceStatus.Database = true
            console.error(`Database connected`)
        })
        mongoose.connection.on('disconnected', () => {
            ServiceStatus.Database = false
            console.error(`Database disconnected`)
        })
        mongoose.connection.on('reconnected', () => {
            ServiceStatus.Database = true
            console.error(`Database connected`)
        })
        mongoose.connect(`${server}/${collection}`,dbconfig.options)
            .then(() => {
                ServiceStatus.Database = true
                console.log('mongodb connected')
            })
            .catch(error => {
                ServiceStatus.Database = false
                console.error(`Database connection error\n${error}`)
                process.exit(1)
            })
    }
}
const connection = new Database()

module.exports.Block = require('./Block')
module.exports.Transaction = require('./Transaction')