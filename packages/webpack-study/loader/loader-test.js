/*
 * @Author: Lvhz
 * @Date: 2021-12-15 18:15:27
 * @Description: Description
 */

// const { getOptions } = require('loader-utils')
const {  } = require('../utils/loader-utils')



module.exports = function(content) {
  const options = getOptions(this);
  // console.log(this.query);
  console.log(options);

  return content;
}

