import puppeteer from 'puppeteer';
import findMostSimilar from './findMostSimilar.js';
import getHarmfulnessOfSubstance from './getHarmfulnessOfSubstance.js';

const url = 'https://health-diet.ru/calorie';

export default async (substane) => {
  try {
    console.log('Input: ', substane);
    // Создаем браузер, страницу и открываем сайт
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--start-maximized'],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Bбиваем в поиске название вещества
    await page.waitForSelector('#t-search-food-top-menu');
    await page.focus('#t-search-food-top-menu');
    await page.keyboard.type(substane);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    // await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Смотрим на все полученные результаты
    await page.waitForSelector('.mzr-tree-with--min-height');
    const list = await page.$('.mzr-tree-with--min-height');
    const listHtml = await list.evaluate((el) => el.innerHTML);

    // Ищем наиболее подходящий нашему запросу результат среди представленных
    const bestMatch = await findMostSimilar(substane, listHtml);

    // Выбираем среди списка предложенных лучший вариант
    await page.evaluate((bestMatch) => [...document.querySelectorAll('.mzr-tree-node')][bestMatch.index].click(), bestMatch);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    // await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Получем вредность продукта
    const benefits = await getHarmfulnessOfSubstance(page);

    await browser.close();
    return benefits;
  } catch (error) {
    console.log(error);
  }
};
