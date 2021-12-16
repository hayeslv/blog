/*
 * @Author: Lvhz
 * @Date: 2021-12-15 18:15:27
 * @Description: Description
 */

const { getOptions, interpolateName } = require('loader-utils')



module.exports = function(content) {
  console.log(this.query);
  const options = getOptions(this);
  const context = options.context || this.rootContext;
  const name = options.name || '[contenthash].[ext]'
  const url = interpolateName(this, name, {
    context,
    content,
    regExp: options.regExp
  })
  console.log('============');
  console.log(url);
  console.log(this.rootContext);
  console.log('=============');

  let outputPath = url;
  let publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`

  const esModule = typeof options.esModule !== 'undefined' ? options.esModule : true;

  return `${esModule ? 'export default' : 'module.exports = '} ${publicPath}`;
}

