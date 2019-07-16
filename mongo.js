const mongoose = require('mongoose')

const dbconfig = {
	endpoint: "mongodb://tyme:q1w2e3r4@tyme-mainnet.cluster-cvxrevdoop1u.ap-northeast-2.docdb.amazonaws.com:27017/test?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred",
    name: "tyme-mainnet",
    options: {
	sslValidate: true,
        sslCA:ca,
	useNewUrlParser: true
    }
}
let uri = "mongodb://tyme:q1w2e3r4@tyme-mainnet.cluster-cvxrevdoop1u.ap-northeast-2.docdb.amazonaws.com:27017/tyme-mainnet?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred"
mongoose.connect(dbconfig,dbconfig.options)
.then(()=>{
    console.log('connected');
    
})
.catch(e=>{
    console.log('error:'+e.message);
    
})