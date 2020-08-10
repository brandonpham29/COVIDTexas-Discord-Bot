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
        } else if (args[0] === "help") {
            msg.reply("\n Type !covidtx to see all COVID-19 cases in texas or type !covidtx (County Name) to see COVID-19 cases in that county. \n If it states undefined, check your spelling and capitalization or it is not in the database.")
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

bot.login(process.env.token);