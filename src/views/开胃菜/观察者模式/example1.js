/*
 * @Author: Lvhz
 * @Date: 2021-10-31 19:58:25
 * @Description: Description
 */
import { Observable } from ('rxjs');

(() => {
  const observable = new Observable((observer) => {
    let i = 0;
    setInterval(() => {
      observer.next(i++);
    }, 1000)
  })

  observable.subscribe((i) => {
    console.log('tick', i);
  })
})()

