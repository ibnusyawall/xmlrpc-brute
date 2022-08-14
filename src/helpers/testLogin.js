const fs = require('fs');
const axios = require('axios');
const x2js = require('x2js');
const { cwd: pathTo } = process;

const raw = fs.readFileSync(pathTo() + '/' + 'src/xml/' + 'testLogin.xml', 'utf-8');

const xml2js = new x2js({ escapeMode: false });

const testLogin = function(url, {username, password} = {}) {
    var body = raw;
    body = body.replace(/\{username\}/g, username);
    body = body.replace(/\{password\}/g, password);

    return new Promise( async (resolve, reject) => {
        try {
            var { data } =  await axios({
                method: 'post',
                url: `${url}/xmlrpc.php`,
                data: body,
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
        } catch (e) {
            reject({
                status: false
            });
        } finally {
            const result = xml2js.xml2js(data)?.methodResponse;
            if (!result) {
                reject({
                    status: false,
                    message: 'maybe request was blocked.'
                });
            }
            if ((result instanceof Object) && (result.hasOwnProperty('fault'))) {
                reject({
                    status: false,
                    message: 'Incorrect username or password.',
                    e: result
                });
            } else {
                let mapData = result?.params?.param?.array?.data?.value?.struct?.member.map(({ name, value }) => [name, Object.values(value)[0]]);
                resolve({
                    status: true,
                    data: mapData
                });
            }
        }
    });
}

module.exports = testLogin;
