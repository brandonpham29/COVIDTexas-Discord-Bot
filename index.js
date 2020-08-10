const Discord = require('discord.js');
const bot = new Discord.Client();
const axios = require('axios')
const prefix = "!";

bot.once('ready', () => {
	console.log('Bot is ready!');
});

bot.on('message', async msg=> {
    if(!msg.content.startsWith(prefix)){
        return
    }
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()
    console.log(args)
    console.log(command)


    if(command === "covidtx"){
        let county;
        let countyName;
        if(args.length === 0){
            county = "Texas%20Total"
            countyName = "Texas"
        } else {
            county = args[0]
            countyName = county + " County"
        }
        let getData = async () => {
            let response = await axios.get(`https://us-central1-firestoretest-3538c.cloudfunctions.net/app/api/read/${county}`)
            let data = response.data
            return data
        }
        let dataValue = await getData()
        msg.reply(`${countyName} has a total of ${dataValue.Cases} cases and ${dataValue.Deaths} deaths.`)

    }

})

bot.login(process.env.NzQyNDUyMzg3MTU1MDE3Nzcx.XzGUqw.0SGPUQ05nmsJjf2_TYe2eRg0ja0);