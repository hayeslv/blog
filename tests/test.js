/* eslint-disable*/
var isHappy = function(n) {

  let slow = fast = n;
  do{
      slow = getNext(n);
      fast = getNext(getNext(n));
      console.log(fast)
  }while(fast !== 1 && slow !== fast)

  return fast === 1;

  function getNext(num) {
      let sum = 0;
      while(num !== 0) {
          sum += parseInt(num % 10) * parseInt(num % 10);
          num = Math.floor(num / 10);
      }
      return sum
  }
};