import { NewsSource } from "../models/news-source.model";
import { CommonArticle, InterfaxArticle, IzArticle, LentaArticle, NewNewsArticle, RBKArticle, RiaArticle, TassArticle, VedomostiArticle } from "../models/news.model";
import { fromIz } from "./iz.adapter";
import { fromLenta } from "./lenta.adapter";
import { fromRBK } from "./rbk.adapter";
import { fromRia } from "./ria.adapter";
import { fromTass } from "./tass.adapter";
import { fromVedomosti } from "./vedomosti.adapter";



// url = source.id
export const applyAdapters = async (source: NewsSource, items: CommonArticle[]) => {

  let count = 0;
  let articles: NewNewsArticle[] = [];

  const isRia = source.url.includes("ria.ru");
  const isInterfax = source.url.includes("interfax.ru");
  const isRBK = source.url.includes("rbk.ru");
  const isLenta = source.url.includes("lenta.ru");
  const isTass = source.url.includes("tass.ru");
  const isIz = source.url.includes("iz.ru");
  const isVedomosti = source.url.includes("vedomosti.ru");

  if (isRia) {
    const converted = items.map(item => fromRia(source.id, item as RiaArticle))

    if (articles.length === 0) {
      console.log("No articles found")
    }

    count = articles.length;
    articles = converted;
  }

  if (isInterfax) {
    const converted = items.map(item => fromRBK(source.id, item as InterfaxArticle))

    if (articles.length === 0) {

      console.log("No articles found")
    }

    count = articles.length;
    articles = converted;
  }

  if (isRBK) {
    const converted = items.map(item => fromRBK(source.id, item as RBKArticle))

    if (articles.length === 0) {

      console.log("No articles found")
    }

    count = articles.length;
    articles = converted;
  }

  if (isLenta) {
    const converted = items.map(item => fromLenta(source.id, item as LentaArticle))

    if (articles.length === 0) {

      console.log("No articles found")
    }

    count = articles.length;
    articles = converted;
  }

  if (isTass) {
    const converted = items.map(item => fromTass(source.id, item as TassArticle))

    if (articles.length === 0) {

      console.log("No articles found")
    }

    count = articles.length;
    articles = converted;
  }

  if (isIz) {
    const converted = items.map(item => fromIz(source.id, item as IzArticle))

    if (articles.length === 0) {

      console.log("No articles found")
    }

    count = articles.length;
    articles = converted;
  }

  if (isVedomosti) {
    const converted = items.map(item => fromVedomosti(source.id, item as VedomostiArticle))

    if (articles.length === 0) {

      console.log("No articles found")
    }

    count = articles.length;
    articles = converted;
  }

  return {
    count,
    articles
  }
}
