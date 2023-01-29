const axios = require("axios");
const cheerio = require("cheerio");
const { Server } = require("socket.io");

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

/* Connects to the socket server */
// var socket = io.connect('http://localhost:3002');
// socket.on('connect', function() {
// console.log('Client connected');
// });

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
        $('.mr10').each((_idx, el) => {
            const saving = $(el).text() // type string
            // console.log(saving);
            savings.push(saving);
        });

        const out = [];
        let index = 0;

        coupons.forEach((coupon) => {
            out[index] = coupon + " " + savings[index];
            index++;
        });
        return out;
    } catch (error) {
        throw error;
    }
};

fetchCouponsSimplyCodes().then((info1, info2) => console.log(info1 + " " + info2));