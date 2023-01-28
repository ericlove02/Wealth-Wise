const axios = require("axios");
const cheerio = require("cheerio");

const fetchCoupons = async () => {
    try {
        const response = await axios.get('https://simplycodes.com/feature/common-coupon-phrases');

        const html = response.data;

        const $ = cheerio.load(html);

        const coupons = [];

        $('.dnone').each((_idx, el) => {
            const coupon = $(el).text() // type string
            // console.log(typeof coupon);
            const tempArr = coupon.split("\n");
            if (tempArr[1]) {
                coupons.push(tempArr[1].trim())
            }
        });
        return coupons;
    } catch (error) {
        throw error;
    }
};

fetchCoupons().then((info) => console.log(info));