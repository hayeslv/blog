const request = url => {
  // 实际场景这里用axios等请求库发请求即可，这里使用定时器模拟延时
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('完成一个任务', url, new Date());
      resolve({ url, date: new Date() })
    }, 1000);
  })
}

function limitQueue(urls, limit) {
  // 已完成任务数
  let i = 0;
  // 填充执行队列
  for(let excuteCount = 0; excuteCount < limit; excuteCount++) {
    run();
  }

  // 执行一个任务
  function run() {
    // 构造待执行任务，当该任务完成后，如果还有待完成的任务，则继续执行下一个任务
    new Promise((resolve) => {
      const url = urls[i++];
      resolve(request(url))
    }).then(() => {
      if(i < urls.length) run()
    })
  }
}

const urls = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

(async () => {
  await limitQueue(urls, 4);
})()