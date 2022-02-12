import cherio from 'cherio';

export default async (page) => {
  const html = await page.evaluate(() => document.querySelector('*').outerHTML);
  const $ = cherio.load(html);
  const rating = $('.mzr-block-header-light');

  const benefits = {
    grams: `Польза на 100 грамм ${rating[rating.length - 1].next?.children[0]?.children[1]?.children[0]?.data}`,
    kcal: `Польза на 100 ккал ${rating[rating.length - 1].next?.children[1]?.children[1]?.children[0]?.data}`,
  };

  console.log('Output: ', benefits);

  return benefits;
};
