const fs = require('fs');
const axios = require('axios');
const x2js = require('x2js');
const { cwd: pathTo } = process;

const raw = fs.readFileSync(pathTo() + '/' + 'src/xml/' + 'sayHello.xml', 'utf-8');

const xml2js = new x2js({ escapeMode: false });

const sayHello = function(url) {
    return new Promise( async (resolve, reject) => {
        try {
            var { data } =  await axios({
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
                string: null
            });
        } finally {
            const string = xml2js.xml2js(data)?.methodResponse?.params.param?.value?.string;
            resolve({
                status: true,
                string
            });
        }
    });
}

module.exports = sayHello;
