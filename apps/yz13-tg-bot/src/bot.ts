import { Bot } from "grammy";

const BOT_TOKEN = process.env.BOT_TOKEN ?? "";

// Set your token in the vercel environment variable
export const bot = new Bot(BOT_TOKEN);

// attach all middleware
bot.on("message", async (ctx) => {
  await ctx.reply("Hi there!");
});
