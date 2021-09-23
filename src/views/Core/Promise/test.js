
function createFlow(effects = []) {
  const queue = [...effects.flat()]
  
  const run = async function(cb) {
    for(let task of queue) {
      if(task.run) {
        await task.run()
      } else {
        await task()
      }
    }
    if(cb) cb()
  }

  return {
    run
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const subFlow = createFlow([() => delay(1000).then(() => console.log("c"))]);

createFlow([
  () => console.log("a"),
  () => console.log("b"),
  subFlow,
  [() => delay(1000).then(() => console.log("d")), () => console.log("e")],
]).run(() => {
  console.log("done");
});

// 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印