/*
 * @Author: Lvhz
 * @Date: 2021-11-04 14:35:41
 * @Description: Description
 */

const axios = require('axios')
let count = 0
let error = 0
const request = async () => {
  try{
    const res = await axios.get("https://www.imqianduan.com/vue/router-key-refresh.html")
    if(res.status === 200) {
      count++
      console.log('count: ', count);
    } else {
      error++
      console.log('error: ', error);
    }
  } catch (err) {
    error++
    console.log('error: ', error);
  }
}

setInterval(() => {
  request()
}, 10);
