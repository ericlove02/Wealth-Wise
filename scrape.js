// prob doesn't work with dynamic pages

const axios = require('axios');
const cheerio = require('cheerio')
const url = 'https://simplycodes.com/feature/common-coupon-phrases';
    axios(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html)
            const salePrice = $('.vam fw600 fs25 mr7').text()
            console.log(salePrice);
        })
        .catch(console.error);