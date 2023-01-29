const axios = require("axios");
const cheerio = require("cheerio");

// Simply Codes

const fetchCouponsSimplyCodes = async () => {
    try {
        const response = await axios.get('https://simplycodes.com/feature/common-coupon-phrases');

        const html = response.data;

        const $ = cheerio.load(html);

        const coupons = [];
        const savings = [];

        $('.dnone').each((_idx, el) => {
            const coupon = $(el).text() // type string
            // console.log(coupon);
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

fetchCouponsSimplyCodes().then((info) => console.log(info));