const axios = require("axios");
const cheerio = require("cheerio");

const fetchCoupons = async () => {
    try {
        const response = await axios.get('https://simplycodes.com/feature/common-coupon-phrases');

        const html = response.data;

        const $ = cheerio.load(html);

        const coupons = [];

        $('div > fw600.fs40 > a').each((_idx, el) => {
            const coupon = $(el).text()
            coupon.push(coupon)
        });
        return coupons;
    } catch (error) {
        throw error;
    }
};

fetchCoupons().then((info) => console.log(info));