const express = require('express')
const WebSocket = require('ws')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const WSBlockMonitor = require('./service/WSBlockMonitor')
const WSBlockinfo = require('./service/WSBlockinfo')
const Blockinfo = require('./service/Blockinfo')

const app = express()
var wss={}

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.createWSS=(server)=>{
    wss = new WebSocket.Server({server})
    wss.on('connection',(ws)=>{
        console.log('ws connected')
        
        ws.on('message',(msg)=>{
            console.log(`rs: ${msg}`)
        })
        ws.on('error',(error)=>{
            console.log(`error: ${error.toString()}`)
        })
        ws.on('close',()=>{
            console.log('closed')
        })

    })
}

// WSBlockinfo.init({})

WSBlockinfo.on(WSBlockinfo.EVENT_ON_BLOCK,(block)=>{
    console.log(`Getblock:${block.block_id}`)
    Blockinfo.save(block)
})
// Blockinfo.requestBlock(3847935)
WSBlockMonitor.on(WSBlockMonitor.EVENT_ON_BLOCK,(data)=>{
    console.log(`Requesting block no:${data}`)
    WSBlockinfo.requestBlock(data)
})
// WSBlockMonitor.start({})
// WSBlockinfo.requestBlock(3820335)

module.exports = app;
