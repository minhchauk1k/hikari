const Discord = require("discord.js");
var bot = new Discord.Client();

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

//liên kết file json
bot.msgs = require('./learning.json');

const PREFIX = ".";



//Tải bot
bot.on('ready', () => {
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
    bot.user.setActivity(activities_list[index], { type: 'PLAYING' }).then(presence => console.log(`Hoạt động dược thay đổi thành: `, activities_list[index]))
.catch(console.error); // sets bot's activities to one of the phrases in the arraylist.
 }, 10000);  // Runs this every 10 seconds.

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

  //check xem có phải bot spam không để dừng lại
  if (message.author.equals(bot.user)) return;
  //nếu tin nhắn k chứa dấu nhận dạng  thì k làm gì cả
  if (!message.content.startsWith(PREFIX)) return;

  //bot reply theo json
  var yeucau = message.content.toLowerCase();
  if(bot.msgs[yeucau]!=null) message.channel.send(bot.msgs[yeucau].reply);

//     //tạo args ~ cắt bỏ tên bot và tách phần sau ra làm 2 ô chứa
//     // var args = message.content.substring(bot.user).split(" ");
    switch (yeucau) {
//       case "nani":
//       case "nani!":
//       case "nà ní":  
//       try{
//          //Xóa đoạn gọi bot
//          message.delete(); //nếu delay nó xóa dòng dưới
//          var mention = message.mentions.users.first();
//          var embed = new RichEmbed();
//          //Mention 1 người trong Embed
//          embed.setDescription(`${message.author} NANI?!!!!!!!` || "None");
//          embed.setColor(0xFFC0CB);
//          embed.setImage('https://i.makeagif.com/media/8-25-2017/8UsD0s.gif');
//          message.channel.send(embed);
//       }catch(e){
//         console.log('Error Nani!:', e.stack);
//       }
//         break;

//       case "chẹp chẹp":  
//       try{
        
//          var mention = message.mentions.users.first();
//          var embed = new RichEmbed();
//          //Mention 1 người trong Embed
//          embed.setDescription(`${message.author} said "Chẹp chẹp"` || "None");
//          embed.setColor(0xFFC0CB);
//          embed.setImage('https://media1.tenor.com/images/cb45f9562719f5a789952cba8e2fe9b7/tenor.gif');
           
//          message.channel.send(embed);
// //            //Xóa đoạn gọi bot
// //          message.delete(); //nếu delay nó xóa dòng dưới
         
//       }catch(e){
//         console.log('Error Chẹp!:', e.stack);
//       }
//         break;

      case "f":  
      try{
        //Xóa đoạn gọi bot
        message.delete(); //nếu delay nó xóa dòng dưới
        var embed = new RichEmbed();
        embed.setDescription(`${message.author} đã ấn "F" để thể hiện sự tiếc thương đến bạn!` || "None");
        embed.setColor(0xFFC0CB);
        embed.setImage('https://i.pinimg.com/originals/38/d2/14/38d214c232f7cc550d15bb915a3af406.gif');
        message.channel.send(embed);
      }catch(e){
        console.log('Error Chẹp!:', e.stack);
      }
        break;
      
        default: return;
    }


  //tạo args ~ cắt bỏ kí tự nhận dạng và tách phần sau ra làm nhiều ô chứa mỗi ô 1 chữ
  var args = message.content.substring(PREFIX.length).split(" ");
  //trường hợp dấu nhận dạng + câu lệnh ví dụ .ping .hug
  switch (args[0].toLowerCase()) {

    // case "hug":
    // case "ôm":
    //   try{
    //    //Xóa đoạn gọi bot
    //    message.delete(); //nếu delay nó xóa dòng dưới
    //   var mention = message.mentions.users.first();
    //   var embed = new RichEmbed();
    //   //Mention 1 người trong Embed
    //   embed.setDescription(`${message.author} Muốn ôm bạn nè! ${mention}`);
    //   embed.setColor(0xFFC0CB);
    //   embed.setImage(hug[Math.floor(Math.random() * hug.length)]);
    //   message.channel.send(embed);
      
    //   }catch(e){
    //     console.log('Error Hug!:', e.stack);
    //   }
       
    // break;

//     case "slap":
//     case "tát":
//     case "hit":
//     case "đánh":
//       try{
//           var mention = message.mentions.users.first();
//           var embed = new RichEmbed();
//          //Mention 1 người trong Embed
//          embed.setDescription(`${message.author} Muốn tát ${mention} thật là đau! `);
//          embed.setColor(0xFFC0CB);
//          embed.setImage(slap[Math.floor(Math.random() * slap.length)]);
// //             //Xóa đoạn gọi bot
// //          message.delete(); //nếu delay nó xóa dòng dưới
//          message.channel.send(embed);
//       }catch(e){
//         console.log('Error Slap!:', e.stack);
//       }
//       break;

    // case "kiss":
    // case "hôn":
    // case "hun":
    //   try{
       
      
    //     var mention = message.mentions.users.first();
    //     var embed = new RichEmbed();
    //     //Mention 1 người trong Embed
    //     embed.setDescription(`${message.author} Đè bạn ra hun nè! ${mention}`);
    //     embed.setColor(0xFFC0CB);
    //     embed.setImage(kiss[Math.floor(Math.random() * kiss.length)]);
    //        //Xóa đoạn gọi bot
    //     message.delete(); //nếu delay nó xóa dòng dưới
    //     message.channel.send(embed);
          
    //   }catch(e){
    //     console.log('Error Kiss!:', e.stack);
    //   }
    //   break;

    // case "help":
    //   //Xóa đoạn gọi bot
    //   message.delete();
    
    //     //đọc file tutorial.txt
    //     var fs = require('fs');
    //     try{
    //       fs.readFile('./tutorial.txt', 'utf-8', function (err, data) {
    //         var embed = new RichEmbed();
    //         embed.setDescription(data);
    //         message.channel.send(embed);
    //         console.log('Error Help!:', err.stack);
    //       });
    //     }catch(e){
    //       console.log('Error Help!:', e.stack);
    //     }
    //   break;
    
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

    // case "random":
    // case "rad":
    //     if(args[1]&&args[2]){
    //           var max = args[1];
    //           var min = args[2];
    //           if (max<args[2]){
    //             max=args[2];
    //             min= args[1];
    //           }
    //           min = Math.ceil(min);
    //           max = Math.floor(max);
    //           message.channel.send(Math.floor(Math.random() * (max - min + 1)) + min);
    //         }else{
    //           message.channel.send("I can't read your question!")
    //       }
    //     break;

    // case "?":
    // if(args[1]){
    //     message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
    //   }else{
    //     message.channel.send("Không hiểu muốn hỏi gì!");
    // }
    // break;

    // case "sex":
    // if(args[1]){
    //     message.channel.send(sex[Math.floor(Math.random() * sex.length)]);
    //   }else{
    //     message.channel.send("Không hiểu muốn hỏi gì!");
    // }
    // break;


    // //kèm tài liệu
    // const attachment = new Attachment('https://i.imgur.com/wOmoeF8.gif');
    // message.channel.send(attachment);
    // break;
    default: message.channel.send("Xin ấn .help và xem lại câu lệnh!");
  }
  
})	

//bot đăng nhập
bot.login(process.env.bot_token);
