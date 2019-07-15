
const WSBlockinfo = require('./service/WSBlockinfo')
const Blockinfo = require('./service/Blockinfo')

WSBlockinfo.init({})
WSBlockinfo.on(WSBlockinfo.EVENT_ON_BLOCK,(block)=>{
    console.log(`Getblock:${block.block_id}`)
    Blockinfo.save(block)
})

for(var i=1;i<1000;i++){
    WSBlockinfo.requestBlock(i)
}
