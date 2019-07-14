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

let cats = ['bob','navi']
let ret = cats.push('say')
let data=[]
console.log(cats)
console.log(ret)
ret =cats.shift() 
console.log(ret)
console.log(cats)
console.log(data.shift())