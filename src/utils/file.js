/*
 * @Author: Lvhz
 * @Date: 2021-08-23 11:00:40
 * @Description: Description
 */

// 文件转成base64格式
export const file2Base64 = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      resolve(this.result)
    };
  })
}

// 是否是图片格式（这里包含gif、jpg、png三种格式）
export const isImage = async (file) => {
  if(file instanceof File){
    // 通过文件流来判定
    // gif是前6个，jpg是前两个和后两个，png是前8个
    return await isGif(file) || await isPng(file) || await isJpg(file)
  }
  return false

  
  // 二进制转字符串
  function blobToString(blob) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = function () {
        const res = reader.result.split('')
          .map(v => v.charCodeAt()) // 转换成ASCII码
          .map(v => v.toString(16).toUpperCase()) // 转成16进制，转成大写
          .map(v => v.padStart(2, '0')) // 个位数前方补0
          .join(' ')
        resolve(res)
      }
      reader.readAsBinaryString(blob)
    })
  }
  // 判断jpg格式
  async function isJpg(file) {
    // jpg判断前2个和后2个16进制
    const len = file.size
    const start = await blobToString(file.slice(0, 2))
    const end = await blobToString(file.slice(-2, len))
    const isJpg = (start === 'FF D8') && (end === 'FF D9')
    return isJpg
  }
  // 判断gif格式
  async function isGif(file) {
    // 前面6个16进制：'47 49 46 38 39 61' or '47 49 46 38 37 61'
    // 分别代表：GIF89a 和 GIF87a
    const res = await blobToString(file.slice(0, 6))
    const isGif = (res === '47 49 46 38 39 61') || (res === '47 49 46 38 37 61')
    return isGif
  }
  // 判断png格式
  async function isPng(file) {
    // png判断前8个16进制
    const res = await blobToString(file.slice(0, 8))
    const isPng = (res === '89 50 4E 47 0D 0A 1A 0A')
    return isPng
  }
}