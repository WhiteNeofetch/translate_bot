const {Telegraf} = require('telegraf');

const bot = new Telegraf('1712129449:AAG8xmLy275H4AIbUb8DbzhNfO8azhJYtnw');

//middleware

bot.use(async (ctx,next)=>{
    ctx.reply('Middleware');
    //throw 'some error'
    ctx.state.isSend = true;
    await next(ctx);
})
//commands

bot.start(ctx => {
    const {state} =ctx;

    return ctx.reply(`start ${state.isSend}`)
})
bot.help(ctx=>ctx.reply('Help command'))
bot.settings(ctx=>ctx.reply('Settings'))

bot.command(['stop','finish'],(ctx)=>{
    return ctx.reply('stop command')
})


bot.mention('botfather',(ctx) =>{
    ctx.reply('botfather mention')
})

bot.phone('+79777777777', (ctx)=>{
    ctx.reply('phone number');
})

bot.hashtag('bot',(ctx)=>{
    ctx.reply('bot hashtag');
})

bot.command('ctx',(ctx)=>{
    console.log(ctx);
    ctx.reply(`${ctx.update.message.from.first_name}, hello`)
})

bot.hears('dog', (ctx)=>{
    ctx.reply('dog?')
})

bot.catch((err,ctx) =>{
    console.log('ERROR',err)
})

//edited message
bot.on(['message','edited_message'],(ctx)=>{
    console.log(ctx);
    console.log(ctx.updateType);
})


bot.launch().then((res) => {
    console.log('started');
}).catch(err => console.log(err));