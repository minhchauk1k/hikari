const Discord = require("discord.js");
const { ClientUser, RichEmbed, Attachment, Client} = require('discord.js');
const PREFIX = ".";
var bot = new Discord.Client();

  //liên kết file json
bot.msgs = require('./learning.json');

//fix lỗi 60s
var express = require('express');
var app     = express();
app.set('port', (process.env.PORT || 5000));

const activities_list = [
  "Hủy diệt thế giới!", 
  "Trộm pha lê của kanchou~",
  "Giải cứu thế giới~", 
  "Xâm chiếm vũ trụ này!"
];

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

//Tải bot
bot.on('ready', function() {
  console.log("Bot Hikari is now online!");	
})

//bot thông báo bạn mới
bot.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'bot_spam');
  if (!channel) return;
  channel.send(`Chào mừng đến với server!, ${member}`);
});

//Bot lúc đọc mess
bot.on("message", async message => {

    //set trạng thái cho bot
 // bot.user.setActivity("Hủy diệt thế giới!"); 
  
   //có ai tag thì rep lại
  if(message.isMentioned(bot.user)) message.channel.send(`Có gì không ạ? ${message.author}`);

  //check xem có phải bot spam không để dừng lại
  if (message.author.equals(bot.user)) return;
  //nếu tin nhắn k chứa dấu nhận dạng  thì k làm gì cả
  if (!message.content.startsWith(PREFIX)) return;

  //bot reply theo json
  var yeucau = message.content.toLowerCase();
  if(bot.msgs[yeucau]!=null) message.channel.send(bot.msgs[yeucau].reply);

  //tạo args ~ cắt bỏ kí tự nhận dạng và tách phần sau ra làm nhiều ô chứa mỗi ô 1 chữ
  var args = message.content.substring(PREFIX.length).split(" ");
  //trường hợp dấu nhận dạng + câu lệnh ví dụ .ping .hug
  switch (args[0].toLowerCase()) {
    case "set":
      var fs = require('fs');
      try{
        var argsedit = message.content.substring(".set ".length).split(" -> ");
        argsedit[0].toLowerCase();
        bot.msgs[argsedit[0]] = {
          reply: argsedit[1]
        }
        fs.writeFile("./learning.json", JSON.stringify(bot.msgs,null,4), err => {
          if(err) throw err;
          message.channel.send(`Hikari đã nhớ rồi ạ!`);
        });

      }catch(e){
          console.log('Error Write Json!:', e.stack);
      }
      break;

    default: message.channel.send("Xin ấn .help và xem lại câu lệnh!");
  }
  
})	

//bot đăng nhập
bot.login(process.env.bot_token);
