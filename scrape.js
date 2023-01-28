const axios = require("axios");
const cheerio = require("cheerio");

const fetchPromos = async () => {
    try {
        const response = await axios.get('https://simplycodes.com/feature/common-coupon-phrases');

        const html = response.data;

        const $ = cheerio.load(html);

        const promos = [];

        $('div.codepill--feature > \n').each((_idx, el) => {
            const promo = $(el).text()
            promos.push(promo);
        });

        return html;
    } catch (error) {
        throw error;
    }
};

fetchPromos().then((promo) => console.log(promo));