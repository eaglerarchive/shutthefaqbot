const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const spelling = require('./spelling.js');

const spellingTolerance = 3;

var recents = [];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({status: 'dnd'});
  client.user.setActivity({
    type: 'WATCHING',
    name: 'users of eaglercraft'
  });
});

client.on('messageCreate', msg => {
  if(msg.author===client.user)return;
  if(msg.channel.id==936501244585967616&&recents.indexOf(msg.author.id)!=-1)recents.splice(recents.indexOf(msg.author.id), 1);
  if(recents.includes(msg.author.id))return;
  var matched = true;
  if(msg.channel.id==936480157802307664){
    sendHelp(msg, 5, true);
    matched = false;
  }else {
	  var corrected = spelling.correctTheGoddamnSpelling(msg.content, spellingTolerance);
	  
	  // simplified, only single spaces and corrected spelling
	  
	  if(corrected.match(/stop ask(ing)?/g)){
	    matched = false;
	  }else if(corrected.match(/(how (can|do|to) (i|you|we) (create|make|host|start) (a |an |my (own )?|our )?(private |public |local )?(server|world))|(can (you|lax1dude|ayunami2000|<@237080395747819520>|<@214118574485143553>) (help|assist) me (make|create|host|start) (a |an |my (own )?|our )?(private |public |local )?(server|world))/g)){
		  sendHelp(msg, 0);
	  }else if(corrected.match(/(why|i|we|my friends?) (cant( i)?|fail to) (connect|join|log ?(in|on)|load) (to )?(the )?(online |offline )?(mc|(eagler|mine) ?craft )?((demo )?((creative|survival|creative\/survival|survival\/creative) )?(demo )?|demo )(server|world)?/g)
      || corrected.match(/the (mc|(eagler|mine) ?craft )?((demo )?((creative|survival|creative\/survival|survival\/creative) )?(demo )?|demo )(server|world|url|(web)?site|link)? (is (down|not (loading|working|connecting|joining|logging (in|on)|letting me join|letting me connect|letting me log ?(in|on)))|(wont|will not|cant) (load|work|log ?(in|on)|connect|join|let me (connect|join|log ?(in|on)))|isnt (loading|working|connecting|joining|logging (in|on)|letting me join|letting me connect|letting me log ?(in|on)))/g)
      || corrected.match(/why is the (mc|(eagler|mine) ?craft )?((demo )?((creative|survival|creative\/survival|survival\/creative) )?(demo )?|demo )(server|world|url|(web)?site|link)? ((down|not (loading|working|connecting|joining|logging (in|on)|letting me join|letting me connect|letting me log ?(in|on)))|(wont|will not|cant) (load|work|log ?(in|on)|connect|join|let me (connect|join|log ?(in|on)))|isnt (loading|working|connecting|joining|logging (in|on)|letting me join|letting me connect|letting me log ?(in|on)))/g)) {
		  sendHelp(msg, 1);
	  }else if(corrected.match(/why (doesnt|wont) .{3,50} (work|place)|.{3,50} (doesnt|wont) (work|place)|cant (use|get) .{3,50} (in|on) (mc|(eagler|mine) ?craft|(the )?game|the server)/g)) {
		  sendHelp(msg, 2);
	  }else if(corrected.match(/((can|will|cant) (lax1dude|laxidude|ayunami2000|<@237080395747819520>|<@214118574485143553>)? ?(you|you all|you guys|yall|lax1dude|laxidude|ayunami2000|<@237080395747819520>|<@214118574485143553>)|is it possible (to|for (lax1dude|laxidude|ayunami2000|<@237080395747819520>|<@214118574485143553>)? ?(you|you all|you guys|yall|lax1dude|laxidude|ayunami2000|<@237080395747819520>|<@214118574485143553>) to)) (possibly )?(update|upgrade) (the )?(server|client|game|mc|(eagler|mine) ?craft)/g)
      || corrected.match(/(can|will) (there be|(lax1dude|laxidude|ayunami2000|<@237080395747819520>|<@214118574485143553>)? ?(you|you all|you guys|yall|lax1dude|laxidude|ayunami2000|<@237080395747819520>|<@214118574485143553>) (make|create)) (a )?newer version/g)) {
		  sendHelp(msg, 3);
    }else if(corrected.match(/((can|will|cant) (lax1dude|laxidude|ayunami2000|<@237080395747819520>|<@214118574485143553>)? ?(you|you all|you guys|yall|lax1dude|laxidude|ayunami2000|<@237080395747819520>|<@214118574485143553>)|is it possible (to|for (lax1dude|laxidude|ayunami2000|<@237080395747819520>|<@214118574485143553>)? ?(you|you all|you guys|yall) to)) (possibly )?((update|upgrade) the (server|client|game|mc|(eagler|mine) ?craft) (to|and) )?add single ?player/g)
      || corrected.match(/(why (is there )?no |where (is )?(the )?)single ?player/g)) {
      sendHelp(msg, 4);
	  }else {
		  matched = false;
	  }
  }
  if(matched){
    recents.push(msg.author.id);
    setTimeout(()=>{
      recents.splice(recents.indexOf(msg.author.id), 1);
    }, 3*60*1000);
  }
});

const topics =  [
                  [
                    "How do I create a server?",
                    [
                      "Notice: you need Java 8 or above to host your own server.",
                      "**[OFFICIAL VIDEO TUTORIAL](https://youtu.be/Zsnv8YskjMA)**",
                      "Download the [stable-download.zip](https://github.com/LAX1DUDE/eaglercraft/raw/main/stable-download/stable-download.zip) file from the GitHub repository.",
                      "Extract it to its own folder.",
                      "Run the **.bat** files inside the `java/bungee_command/` directory and in the `java/bukkit_command/` directory.",
                      "(Easy/quick method) Go to the `stable-download` folder and open the **offline HTML file**.",
                      "(Better/correct method) Host an HTTP server at the `web` directory (refer to the README on the GitHub repository for HTTP servers) and open __localhost:port__ in your browser (replacing `port` with the port that the HTTP server is running on)."
                    ]
                  ],
                  [
                    "Why can't I join the creative/survival server?",
                    [
                      "The servers are currently overloaded, or you have been banned. If neither of these are the case, contact <@237080395747819520> or <@214118574485143553> to report them as down."
                    ]
                  ],
                  [
                    "Why doesn't [x] work?",
                    [
                      "**Referring to slowness/unresponsiveness?** The servers are likely currently overloaded, or you are expecting too much out of your browser.\n**Referring to a feature that is missing?** This version of Minecraft is very old; version 1.5.2; so it does not support all of the newer features of modern Minecraft.\n**Referring to something else?** Let us or others know that this automatic response didn't solve your problem!"
                    ]
                  ],
                  [
                    "Can you make it for a newer version?",
                    [
                      "We are currently working on creating a 1.8.8 version, but it will take a while."
                    ]
                  ],
                  [
                    "Why is there no singleplayer?",
                    [
                      "Singleplayer has been removed as it would've made the game a lot larger in size and a lot slower too. It would have also been a million times harder to implement and port to web."
                    ]
                  ],
                  [
                    "how to maek ser ver  ? !",
                    [
                      "[https://youtu.be/Zsnv8YskjMA](https://youtu.be/Zsnv8YskjMA)"
                    ]
                  ]
                ];

function sendHelp(msg, topic, fardmode){
	if(fardmode==null)fardmode=false;
    const embed = new MessageEmbed()
                  .setTitle(topics[topic][0])
                  .setColor("RANDOM");
    if(topics[topic][1].length==1){
      embed.addField("Solution", topics[topic][1][0], false);
    }else{
      for(var i=0;i<topics[topic][1].length;i++)embed.addField("Step "+(i+1), topics[topic][1][i], false);
    }
    if(!fardmode)embed.setFooter({ text: msg.author.username+" requested this, 3 minutes until next question will be answered.", iconURL: msg.author.avatarURL() });
    msg.reply(fardmode?({ embeds: [embed] }):({ embeds: [embed], "allowedMentions": { "users" : []}}));
}

client.login(require('fs').readFileSync('../tok.txt', {encoding: 'utf8', flag: 'r'}));