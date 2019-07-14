const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const BlockMonitor = require('./service/BlockMonitor')
const Blockinfo = require('./service/Blockinfo')

const app = express();
var wss={};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.createWSS=(server)=>{
    wss = new WebSocket.Server({server});
    wss.on('connection',(ws)=>{
        console.log('ws connected')
        
        ws.on('message',(msg)=>{
            console.log(`rs: ${msg}`);
        });
        ws.on('error',(error)=>{
            console.log(`error: ${error.toString()}`);
        });
        ws.on('close',()=>{
            console.log('closed');
        });

    });
}

Blockinfo.init({})
Blockinfo.on(Blockinfo.EVENT_ON_BLOCK,(block)=>{
    console.log(`RXBlockinfo::${block.blockno}`)
})

BlockMonitor.addListener(BlockMonitor.EVENT_ON_BLOCK,Blockinfo.requestBlock)
BlockMonitor.start({});

module.exports = app;
