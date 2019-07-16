const mongoose = require('mongoose')
const fs = require('fs')
const ca = [fs.readFileSync("./config/key.pem")];
const dbconfig = {
    endpoint: "mongodb://tyme:q1w2e3r4@tyme-mainnet.cluster-cvxrevdoop1u.ap-northeast-2.docdb.amazonaws.com:27017/test?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred",
    name: "tyme-mainnet",
    options: {
        ssl: true,
        sslValidate: true,
        sslCA: ca,
        useNewUrlParser: true,
        replicaSet: "rs0",
        readPreference: "secondaryPreferred"
    }
}
let uri = "mongodb://tyme:q1w2e3r4@tyme-mainnet.cluster-cvxrevdoop1u.ap-northeast-2.docdb.amazonaws.com:27017/tyme-mainnet"
mongoose.connect(uri, dbconfig.options)
    .then(() => {
        console.log('connected');

    })
    .catch(e => {
        console.log('error:' + e.message);

    })