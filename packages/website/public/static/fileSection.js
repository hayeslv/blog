/*
 * @Author: Lvhz
 * @Date: 2021-08-24 17:29:39
 * @Description: 读取文件切片
 */
self.onmessage = (e) => {
  // 接受主线程传递的数据
  const { chunks } = e.data

  let progress = 0
  let count = 0
  let sectionList = []

  const loadNext = (index) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(chunks[index].file)
    reader.onload = (e) => {
      count++
      sectionList.push(e.target.result)

      if (count === chunks.length) {
        self.postMessage({
          progress: 100,
          sectionList: sectionList
        })
      } else {
        progress += 100 / chunks.length
        self.postMessage({
          progress: parseInt(progress)
        })
        loadNext(count)
      }
    }
  }
  loadNext(0)
}