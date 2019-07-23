const dbconfig = {
    endpoint: "mongodb://localhost:27017",
    name: "tyme-mainnet",
    options: {
        useNewUrlParser: true
    }
}
module.exports = dbconfig


// const dbconfig = {
//     endpoint: "mongodb://tyme:q1w2e3r4@127.0.0.1:27017",
//     name: "tyme-mainnet",
//     options: {
//         ssl: true,
//         sslValidate: true,
//         useNewUrlParser: true,
//         replicaSet: "rs0",
//         readPreference: "secondaryPreferred"
//     }
// }