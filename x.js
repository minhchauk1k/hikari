const Discord = require("discord.js");
var bot = new Discord.Client();
const { Client, RichEmbed, Attachment} = require('discord.js');

//liên kết file json
bot.msgs = require('./learning.json');

//fix lỗi 60s
var express = require('express');
var app     = express();
app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
  var result = 'App is running'
  response.send(result);
}).listen(app.get('port'), function() {
  console.log('Server đang dùng port:', app.get('port'));
});

const PREFIX = ".";

//list để random
var activities_list = [
  "Hủy diệt thế giới!", 
  "Trộm pha lê của kanchou~",
  "Giải cứu thế giới~", 
  "Xâm chiếm vũ trụ này!"
];
var fortunes = ["Có","Không","Có thể","Chắc chắn luôn!","Không thể nào!","Hên xui!","Khó nói lắm ~"];
var sex = ["Nam","Nữ","Đực rựa!","Giống cái~","Giữa giữa","Lưỡng","Bí mật nha~"];
var hug =['https://i.imgur.com/AhGtkI7.gif','https://i.imgur.com/iMVRt36.gif','https://i.imgur.com/DKrVJ4I.gif','https://i.imgur.com/P2k2IHY.gif','https://i.imgur.com/a3LEDQX.gif','https://i.imgur.com/dUnMS6C.gif','https://i.imgur.com/KHLkb3n.gif'];
var kiss =['https://i.imgur.com/Rg9mwvf.gif','https://i.imgur.com/Jy11NQm.gif','https://i.imgur.com/ixKHvah.gif','https://i.imgur.com/qODq72W.gif','https://i.imgur.com/I9qS9N6.gif','https://i.imgur.com/ABwjzgD.gif','https://i.imgur.com/RoOcfNU.gif','https://i.imgur.com/jNWQvTO.gif'];
var slap=['https://i.imgur.com/QFBjeCZ.gif','https://i.imgur.com/VsHdS0z.gif','https://i.imgur.com/14XwzmI.gif','https://i.imgur.com/zWt8FKS.gif','https://i.imgur.com/YDg2gNU.gif','https://i.imgur.com/W2RVSri.gif','https://i.imgur.com/yzHpR2H.gif','https://i.imgur.com/IUMXMvj.gif','https://i.imgur.com/Ib8DOPy.gif'];


//Tải bot
bot.on('ready', async () =>{
  //bot.user.setActivity("Đọc gì đó nhân loại?");
  console.log("Bot Yuki is now online!");	
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
    //bot.user.setActivity("Hủy diệt thế giới!"); 
  
   //có ai tag thì rep lại
  if(message.isMentioned(bot.user)) message.channel.send(`Có gì không ạ? ${message.author}`);

  //bot reply theo json
  var yeucau = message.content.toLowerCase();
  if(bot.msgs[yeucau]!=null) message.channel.send(bot.msgs[yeucau].reply || "Lỗi: tin nhắn rỗng!");

    //tạo args ~ cắt bỏ tên bot và tách phần sau ra làm 2 ô chứa
    // var args = message.content.substring(bot.user).split(" ");
    switch (message.content.toLowerCase()) {
      case "yuki ơi":
      case "yuki đâu rồi?":
      case "yuki":
        message.channel.send(`Dạ để em gọi Sếp Yuki <@484399853045022726>`);
        break;
      case "hướng dẫn":
      case "help":
      case "tutorial":
        message.channel.send(`Ấn .help để xem hướng dẫn các câu lệnh bot Hikari ạ!`);
        break;
      case "nani":
      case "nani!":
      case "nà ní":  
      try{
         //Xóa đoạn gọi bot
         message.delete(); //nếu delay nó xóa dòng dưới
    
         var mention = message.mentions.users.first();
         var embed = new RichEmbed();
         //Mention 1 người trong Embed
         embed.setDescription(`${message.author} NANI?!!!!!!!`);
         embed.setColor(0xFFC0CB);
         embed.setImage('https://i.makeagif.com/media/8-25-2017/8UsD0s.gif');
         message.channel.send({embed});
      }catch(e){
        console.log('Error Nani!:', e);
      }
           
        break;

      case "chẹp chẹp":  
      try{
         //Xóa đoạn gọi bot
         message.delete(); //nếu delay nó xóa dòng dưới
         var mention = message.mentions.users.first();
         var embed = new RichEmbed();
         //Mention 1 người trong Embed
         embed.setDescription(`${message.author} said "Chẹp chẹp"`);
         embed.setColor(0xFFC0CB);
         embed.setImage('https://media1.tenor.com/images/cb45f9562719f5a789952cba8e2fe9b7/tenor.gif');
         message.channel.send({embed});
      }catch(e){
        console.log('Error Chẹp!:', e);
      }
        break;

      case "f":  
      try{
         //Xóa đoạn gọi bot
         message.delete(); //nếu delay nó xóa dòng dưới
         var mention = message.mentions.users.first();
         var embed = new RichEmbed();
         //Mention 1 người trong Embed
         embed.setDescription(`${message.author} đã ấn "F" để thể hiện sự tiếc thương đến bạn!`);
         embed.setColor(0xFFC0CB);
         embed.setImage('https://i.pinimg.com/originals/38/d2/14/38d214c232f7cc550d15bb915a3af406.gif');
         message.channel.send({embed} || "None");
      }catch(e){
        console.log('Error Chẹp!:', e);
      }
        break;
    }

    
  
  //check xem có phải bot spam không để dừng lại
  if (message.author.equals(bot.user)) return;
  //nếu tin nhắn k chứa dấu nhận dạng  thì k làm gì cả
  if (!message.content.startsWith(PREFIX)) return;

  //tạo args ~ cắt bỏ kí tự nhận dạng và tách phần sau ra làm nhiều ô chứa mỗi ô 1 chữ
  var args = message.content.substring(PREFIX.length).split(" ");
  //trường hợp dấu nhận dạng + câu lệnh ví dụ .ping .hug
  switch (args[0].toLowerCase()) {

    case "hug":
    case "ôm":
      try{
      //Xóa đoạn gọi bot
      message.delete(); //nếu delay nó xóa dòng dưới
      var mention = message.mentions.users.first();
      var embed = new RichEmbed();
      //Mention 1 người trong Embed
      embed.setDescription(`${message.author} Muốn ôm bạn nè! ${mention}`);
      embed.setColor(0xFFC0CB);
      embed.setImage(hug[Math.floor(Math.random() * hug.length)]);
      message.channel.send({embed});
      }catch(e){
        console.log('Error Hug!:', e);
      }
       
    break;

    case "slap":
    case "tát":
    case "hit":
    case "đánh":
      try{
         //Xóa đoạn gọi bot
         message.delete(); //nếu delay nó xóa dòng dưới
      
          var mention = message.mentions.users.first();
          var embed = new RichEmbed();
         //Mention 1 người trong Embed
         embed.setDescription(`${message.author} Muốn tát ${mention} thật là đau! `);
         embed.setColor(0xFFC0CB);
         embed.setImage(slap[Math.floor(Math.random() * slap.length)]);
         message.channel.send({embed});
      }catch(e){
        console.log('Error Slap!:', e);
      }
      break;

    case "kiss":
    case "hôn":
    case "hun":
      try{
        //Xóa đoạn gọi bot
        message.delete(); //nếu delay nó xóa dòng dưới
      
        var mention = message.mentions.users.first();
        var embed = new RichEmbed();
        //Mention 1 người trong Embed
        embed.setDescription(`${message.author} Đè bạn ra hun nè! ${mention}`);
        embed.setColor(0xFFC0CB);
        embed.setImage(kiss[Math.floor(Math.random() * kiss.length)]);
        message.channel.send({embed});
      }catch(e){
        console.log('Error Kiss!:', e);
      }
      break;

    case "help":
      //Xóa đoạn gọi bot
      //message.delete();
        //đọc file tutorial.txt
        var fs = require('fs');
        try{
          fs.readFile('./tutorial.txt', 'utf-8', function (err, data) {
            var embed = new RichEmbed();
            embed.setDescription(data);
            message.channel.send({embed});
            console.log('Error Help!:', err.stack);
          });
        }catch(e){
          console.log('Error Help!:', e);
        }
      break;
    
    case "set":
    case "học":
    case "learn":
      //message.delete();
      var fs = require('fs');
      try{
        var argsedit = message.content.substring(".set ".length).split(" -> ");
        argsedit[0].toLowerCase();
        bot.msgs[argsedit[0]] = {
          reply: argsedit[1]
        }
        fs.writeFileSync("./learning.json", JSON.stringify(bot.msgs,null,4), err => {
          if(err) throw err;
          message.channel.send(`Hikari đã nhớ rồi ạ!`);
        });

      }catch(e){
          console.log('Error Write Json!:', e);
      }
      break;

    case "random":
    case "rad":
        if(args[1]&&args[2]){
              var max = args[1];
              var min = args[2];
              if (max<args[2]){
                max=args[2];
                min= args[1];
              }
              min = Math.ceil(min);
              max = Math.floor(max);
              message.channel.send(Math.floor(Math.random() * (max - min + 1)) + min);
            }else{
              message.channel.send("I can't read your question!")
          }
        break;

    case "?":
    if(args[1]){
        message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
      }else{
        message.channel.send("Không hiểu muốn hỏi gì!");
    }
    break;

    case "sex":
    if(args[1]){
        message.channel.send(sex[Math.floor(Math.random() * sex.length)]);
      }else{
        message.channel.send("Không hiểu muốn hỏi gì!");
    }
    break;

    // //kèm tài liệu
    // const attachment = new Attachment('https://i.imgur.com/wOmoeF8.gif');
    // message.channel.send(attachment);
    // break;
    default: message.channel.send("Xin ấn .help và xem lại câu lệnh!")
  }
  
})	

//bot đăng nhập
bot.login(process.env.bot_token);