'use strict'
function delay(sec){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve(new Date())
        }, sec*1000);
    });
}
async function myAsync(){
    var d = await delay(1).then((a)=>{return a});
    return d;
}

myAsync().then((aaa)=>{
    console.log(aaa);
})
console.log('done')