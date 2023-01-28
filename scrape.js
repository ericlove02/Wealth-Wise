const axios = require("axios");
const cheerio = require("cheerio");

// Simply Codes

const fetchCouponsSimplyCodes = async () => {
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

fetchCouponsSimplyCodes().then((info) => console.log(info));

// const fetchCoupons = async () => {
//     try {
//         const response = await axios.get('https://www.retailmenot.com/?u=AXLI4ZPI35C5XPZFZ3F4HDLGPA');

//         const html = response.data;

//         const $ = cheerio.load(html);

//         const coupons = [];

//         $('.RedemptionModalContent__RedemptionBody-sc-1c3tlo0-3.jGMPPB').each((_idx, el) => {
//             const coupon = $(el).text() // type string
//             // console.log(typeof coupon);
//             const tempArr = coupon.split("\n");
//             if (tempArr[1]) {     
//                 coupons.push(tempArr[1].trim())
//             }
//         });
//         return coupons;
//     } catch (error) {
//         throw error;
//     }
// };

// fetchCoupons().then((info) => console.log(info));