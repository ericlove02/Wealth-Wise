const axios = require("axios");
const cheerio = require("cheerio");

const fetchPromos = async () => {
    try {
        const response = await axios.get('https://simplycodes.com/feature/common-coupon-phrases');

        const axios = require('axios');
        const cheerio = require('cheerio')
        const url = 'https://www.retailmenot.com/?u=4R6M5JDZFNEJZP5W7NQ6WVAYX4';
        axios(url)
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html)
                const salePrice = $('CopyCode__Code-sc-10h0ylz-2 cVSRcS').text()
                console.log(salePrice);
            })
            .catch(console.error);