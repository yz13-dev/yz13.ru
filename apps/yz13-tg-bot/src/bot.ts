import { Bot, InlineKeyboard, InlineQueryResultBuilder } from "grammy";

const BOT_TOKEN = process.env.BOT_TOKEN ?? "";

// Set your token in the vercel environment variable
export const bot = new Bot(BOT_TOKEN);

// attach all middleware
bot.on("message:text", async (ctx) => {
  const { from } = ctx.message;
  await ctx.reply(`Привет, ${from.first_name}!`);
  const button = new InlineKeyboard().url("Открыть", "https://yz13.ru/");
  await ctx.reply(
    "Я сейчас нахожусь в тестовом режиме. Посетите сайт разработчика, возможно там найдется полезная информация.",
    {
      reply_markup: button,
    },
  );
});

// Return empty result list for other queries.
bot.inlineQuery("website", async (ctx) => {
  const result = InlineQueryResultBuilder.article("id:website", "Сайт", {
    reply_markup: new InlineKeyboard().url("YZ13 Website", "https://yz13.ru/"),
  }).text(`<b>YZ13</b> - Фронтенд разработчик`, { parse_mode: "HTML" });

  // Answer the inline query.
  await ctx.answerInlineQuery(
    [result], // answer with result list
    { cache_time: 24 * 3600 }, // 30 days in seconds
  );
});
