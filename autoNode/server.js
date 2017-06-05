const execFile = require('child_process').execFile;
const exec = require('child_process').exec;
const http = require('http');
const iconv = require('iconv-lite');

http.createServer(function(req, res) {
  res.writeHeader(200, {
    'content-Type': 'text/plain;charset=utf-8'
  });
  runCmd()
  res.end("执行脚本程序启动成功")

}).listen(88);
console.log('执行脚本程序启动成功,请使用localhost:88端口访问!')

async function runCmd() {
  //需要执行的命令字符串
  var cli1 = 'git add -A';
//var cli2 = 'git commit -m "add info"';
//var cli3='git push origin';
  var cmd1=await Cmd(cli1);
//	var cmd2=await Cmd(cli2);
//var cmd3=await Cmd(cli3);111
console.log(typeof cmd1)
console.log(cmd1==='\n',cmd1==='\r',cmd1==='\n\r',cmd1==='',cmd1===null)
//console.log('cmd2',cmd2)
}

String.prototype.each = function(i, fun) {
  var index = 0;
  var that = this;
  while(index <= that.length) {
    (fun || function() {})(that.substr(index, i))
    index += i;
  }
}

function Cmd(cli) {
  return new Promise(function(resolve, reject) {
    exec(cli, {encoding: 'hex'}, function(err, stdouts,stderr) {
      if(err) {
        return reject(err);
      }
      if(stderr){
      	return reject(stderr);
      }
      let arr = [];
      stdouts.each(2, function(data) {
        arr.push(parseInt(data, 16));
      });
      return resolve(iconv.decode(new Buffer(arr),'GBK'))
    })
  })
}