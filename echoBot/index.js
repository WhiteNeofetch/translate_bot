const {Telegraf} = require('telegraf');

const bot_token = '1712129449:AAG8xmLy275H4AIbUb8DbzhNfO8azhJYtnw';
const bot = new Telegraf(bot_token);


bot.start (ctx => {
    ctx.reply(
        `hello! its echo bot`
    )
})

bot.help(ctx =>{
    ctx.reply(
        'send any message and i will copy it'
    )
})

bot.on('message',(ctx)=>{
    console.log(ctx.chat)
    console.log(ctx.message)
    ctx.telegram.sendCopy(ctx.chat.id, ctx.message)
})

bot.launch().then(res=>{
    console.log('run')
}).catch((err)=>{
    console.log(err);
})