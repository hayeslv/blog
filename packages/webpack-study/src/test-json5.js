/*
 * @Author: Lvhz
 * @Date: 2021-12-15 20:12:49
 * @Description: Description
 */
const json5 = require('json5')
const fs = require('fs');
const path = require('path')
// const json = require('./user.json5')

let json = fs.readFileSync(path.resolve(__dirname, './user.json5'), 'utf-8');
console.log(json);
console.log(json5.parse(json));



