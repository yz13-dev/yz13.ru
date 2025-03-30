import { hydrate, HydrateFlavor } from "@grammyjs/hydrate";
import { Menu } from "@grammyjs/menu";
import { Bot, Context, InlineKeyboard, InlineQueryResultBuilder } from "grammy";
import { getFullPricing } from "rest-api/pricing";

type BotContext = HydrateFlavor<Context>;
const BOT_TOKEN = process.env.BOT_TOKEN ?? "";

export const bot = new Bot<BotContext>(BOT_TOKEN);

const menu = new Menu("services-menu").text("Все услуги").row();

bot.use(hydrate());
bot.use(menu);

bot.command("start", async (ctx) => {
  await bot.api.setMyCommands([
    {
      command: "services",
      description: "Показать список услуг",
    },
  ]);

  const inlineKeyboard = new InlineKeyboard().text("Услуги", "click-services");

  await ctx.reply("Привет! Чем могу помочь?", {
    reply_markup: inlineKeyboard,
  });
});

bot.callbackQuery("click-services", async (ctx) => {
  const statusMessage = await ctx.reply("Получаем список...");

  try {
    const services = await getFullPricing();

    if (services.length === 0) {
      await statusMessage.editText("Нет доступных услуг");
    } else {
      const list = services.map((service) => {
        return `${service.name} - ${service.description}`;
      });

      const inlineKeyboard = new InlineKeyboard().url(
        "Все услуги",
        "https://yz13.ru/services",
      );

      await statusMessage.editText(list.join("\n \n"), {
        reply_markup: inlineKeyboard,
      });
    }

    setTimeout(() => statusMessage.delete().catch(() => {}), 3000);
  } catch (error) {
    console.error(error);
    await statusMessage.delete();
  }
});

bot.command("services", async (ctx) => {
  const statusMessage = await ctx.reply("Получаем список...");

  try {
    const services = await getFullPricing();

    if (services.length === 0) {
      await statusMessage.editText("Нет доступных услуг");
    } else {
      const list = services.map((service) => {
        return `${service.name} - ${service.description}`;
      });

      const inlineKeyboard = new InlineKeyboard().url(
        "Все услуги",
        "https://yz13.ru/services",
      );

      await statusMessage.editText(list.join("\n \n"), {
        reply_markup: inlineKeyboard,
      });
    }

    setTimeout(() => statusMessage.delete().catch(() => {}), 3000);
  } catch (error) {
    console.error(error);
    await statusMessage.delete();
  }
});

bot.command("user", async (ctx) => {});

bot.inlineQuery("website", async (ctx) => {
  const result = InlineQueryResultBuilder.article("id:website", "Сайт", {
    reply_markup: new InlineKeyboard().url("YZ13 Website", "https://yz13.ru/"),
  }).text(`<b>YZ13</b> - Фронтенд разработчик`, { parse_mode: "HTML" });

  await ctx.answerInlineQuery([result], { cache_time: 24 * 3600 });
});
