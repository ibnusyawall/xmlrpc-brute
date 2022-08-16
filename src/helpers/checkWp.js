const axios = require('axios');
const cheerio = require('cheerio');

const checkWp = function(url) {
    return new Promise(async (resolve, reject) => {
        try {
            var { data: html  } = await axios(url);
        } catch (e) {
            reject({
                status: false,
                message: `Invalid response from target: ${url}`
            });
        } finally {
            var $ = cheerio.load(html);

            var meta = $('meta[name="generator"]').attr('content');
            var isMetaWp = /WordPress/i.test(meta);
            if (!!isMetaWp) {
                resolve({
                    status: true,
                    version: meta
                });
            } else {
                reject({
                    status: false,
                    message: `Not wordpress site: ${url}`
                });
            }
        }
    });
}

module.exports = checkWp;

