const Scene = require('telegraf/scenes/base')

const from = new Scene('from');

from.enter((ctx)=>{
    ctx.reply('Hi! please send a code of  language')
})

from.on('text', ctx =>{
   if(ctx.message.text.length > 2 || ctx.message.text.length == 1){
       return ctx.reply('Language must be a 2 chars')
   }
   ctx.session.from = ctx.message.text.toLowerCase();

   ctx.reply(`${ctx.message.text} set as a language`);
   return ctx.scene.leave();
});
from.leave((ctx)=>{
    ctx.reply('thanks for setting language')
});

from.on('message', ctx => ctx.reply('Only text message please'))

module.exports = from;