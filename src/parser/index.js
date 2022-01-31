import getHarmfulnessBuSubstanceName from './helpers/getHarmfulnessBySubstanceName.js';

const description = `мясо механической обвалки куриное,  мясо голов свиных, говяжьих, шпик, говядина, жировая эмульсия, эмульсия из свиной шкурки, соль, йодат калия, расный рис, изолят соевого белка, ароматизатор, горчицы, глютена, молока, орехов, продуктов яичных, сельдерея`;


(async (description)=>{
    console.time('Time');
    const arr = description.split(', ');

    for (const item of arr) {
        const harmfulness = await getHarmfulnessBuSubstanceName(item);
        console.log(`${item} - ${JSON.stringify(harmfulness, null, 2)}`);
    }
    console.timeEnd('Time');
})(description);

