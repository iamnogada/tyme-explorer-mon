
const WSReplay = require('./service/WSReplay')
const Blockinfo = require('./service/Blockinfo')
const util = require('./lib/util')
const argv = require('minimist')(process.argv.slice(2));

if(6> process.argv.length){
    console.log("node replay.js -s 10 -c 100")
    console.log("-s: start number")
    console.log("-c: number of retreive")
}
try{
    var start = parseInt(argv['s'])
    var count = parseInt(argv['c'])
}catch(e){
    console.log("node replay.js -s 10 -c 100")
    console.log("-s: start number")
    console.log("-c: number of retreive")
    exit(1)    
}
var startTime = new Date()
WSReplay.init({})
WSReplay.on(WSReplay.EVENT_ON_BLOCK,(block)=>{
    let no = util.parseBlockNoFromId(block.block_id)
    Blockinfo.save(block)
    if(0 == no % 100){
        console.log(`Saved until ${no}`);        
    }
    if(no == count+start-1){
        let duration = new Date() - startTime;
        console.log(`Finished: ${duration/1000/60} minutes`)
        process.exit(0)      
    }
})

for(var i=start;i<count+start;i++){
    WSReplay.requestBlock(i)
}


