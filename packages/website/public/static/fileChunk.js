/*
 * @Author: Lvhz
 * @Date: 2021-08-24 15:42:29
 * @Description: 计算文件chunk
 */
self.onmessage = (e) => {
  // 接受主线程传递的数据
  const { file, size } = e.data

  let chunks = []
  let cur = 0

  while (cur < file.size) {
    chunks.push({ index: cur, file: file.slice(cur, cur + size) })
    cur += size
    if(cur >= file.size) {
      self.postMessage({
        chunks: chunks
      })
    }
  }
}