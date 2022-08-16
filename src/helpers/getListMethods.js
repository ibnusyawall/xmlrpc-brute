const fs = require('fs');
const axios = require('axios');
const { cwd: pathTo } = process;

const raw = fs.readFileSync(pathTo() + '/' + 'src/xml/' + 'listMethods.xml', 'utf-8');

const getListMethods = function(url) {
    return new Promise(async (resolve, reject) => {
        try {
            await axios({
                method: 'post',
                url: `${url}/xmlrpc.php`,
                data: raw,
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
        } catch (e) {
            reject({
                status: false,
                message: `Site not vuln: ${url}`
            });
        } finally {
            resolve({
                status: true
            });
        }
    });
}

module.exports = getListMethods;
