//require('dotenv').config();

const BOT_TOKEN = '1615935140:AAHaMlmY3RrpnazDtSIbuZbPKh0MXEKfsG4';

const {Telegraf} = require('telegraf');
const TSL = require('telegraf-session-local')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const session = require('telegraf/session')

//commands
const startCommand = require('./commands/start')
const helpCommand = require('./commands/help')
//scenes
const fromScene = require('./scenes/from')
const toScene = require('./scenes/to')

const init = async (bot, config) => {
    //stage,scenes
    const stage = new Stage([fromScene, toScene]);
    //middleware
    bot.use(new TSL({database: './data/session.json'}).middleware());
    bot.use(stage.middleware())
    //commands
    bot.start(startCommand());
    bot.help(helpCommand());
    bot.command('from',(ctx)=>ctx.scene.enter('from'))
    bot.command('to',(ctx)=>ctx.scene.enter('to'))
    bot.command('lang', ctx => ctx.reply(`${ctx.session.from} - ${ctx.session.to}`))
    return bot;
}

init(new Telegraf(BOT_TOKEN), process.env).then(async (bot) => {
    await bot.launch();
    console.log('Launched')
})

module.exports = init;