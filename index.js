const Discord = require('discord.js');
const bot = new Discord.Client();
const axios = require('axios')
const prefix = "!";

bot.once('ready', () => {
    console.log('Bot is ready!');
    bot.user.setStatus('online')
    bot.user.setPresence({
        game: {
            name: 'Use !covidtx',
            type: "Playing",
            url: "https://discordapp.com/"
        }
    });
});

bot.on('message', async msg=> {
    if(!msg.content.startsWith(prefix)){
        return
    }
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase()

    if(command === "covidtx"){
        let county;
        let countyName;
        if(args.length === 0){
            msg.reply("\n Type !covidtx (County Name) to see COVID-19 data in that county or !covid Texas to see total Texas data. \n If the county has undefined cases/deaths, check your spelling and capitalization or it is not in the database.")
        } else if (args[0] === "Texas") {
            county = "Texas%20Total"
            countyName = "Texas"
        } else {
            if (args.length > 1) {
                county = args.join("%20");
                countyName = args.join(" ")
            } else{
                county = args[0]
                countyName = args[0]
            }
            countyName = countyName + " County"
        }

        if (args.length > 0) {
            let getData = async () => {
                let response = await axios.get(`https://us-central1-firestoretest-3538c.cloudfunctions.net/app/api/read/${county}`)
                let data = response.data
                return data
            }
            let dataValue = await getData()
            msg.reply(`${countyName} has a total of ${dataValue.Cases} cases and ${dataValue.Deaths} deaths.`)
        }
        
    }
})

bot.login(process.env.token);