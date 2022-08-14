const { cwd: pathTo } = process;

const delay = require(pathTo() + '/' + 'src/helpers/delay');
const getListMethods = require(pathTo() + '/' + 'src/helpers/getListMethods');
const sayHello = require(pathTo() + '/' + 'src/helpers/sayHello');
const testLogin = require(pathTo() + '/' + 'src/helpers/testLogin');

module.exports = {
    delay,
    getListMethods,
    sayHello,
    testLogin
}
