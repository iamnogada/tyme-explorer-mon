// ace={
//     data:"hello"
// }
// ace.send = ()=>{
//     console.log("send"+ace.data)
// }
// module.exports.ACE = ace;
function hello(){
    console.log('called')
}
module.exports.ace = hello;