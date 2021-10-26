/* eslint-disable no-cond-assign */
/*
 * @Author: Lvhz
 * @Date: 2021-10-26 09:05:13
 * @Description: Description
 */


(() => {
  function deepSet(obj : any, path : Array<any>, value : any, i : number = 0) {
    const key = path[i]
    if(typeof key === 'undefined') {
      return value
    }

    if(typeof obj === 'undefined') {
      if(key.match(/^\d+$/)) {
        obj = new Array()
      } else {
        obj = new Object()
      }
    }

    obj[key] = deepSet(obj[key], path, value, i+1)
    return obj
  }

  // .x.x.x.y
  // [1][2][3]
  // [1].x[3].name
  const ptnIdentifer = /[a-zA-Z_$][a-zA-Z0-9_&]*/
  function getPath(str : string) {
    const m = ptnIdentifer.exec(str)
    if(!m) {
      return [str]
    }

    const ptnPart = /(\.([a-zA-Z_$][a-zA-Z0-9_&]*)|\[([a-zA-Z0-9_&]+)\])/g; // 左边解析.这种情况，右边解析[]这种情况

    str = str.replace(m[0], '')
    const path = [m[0]]

    let p : RegExpExecArray
    let lastIdx = 0
    while(p = ptnPart.exec(str) as RegExpExecArray) {
      if(p.index !== lastIdx) {
        return [str]
      }
      lastIdx += p[0].length
      path.push(p[2] || p[3])
    }

    // if(path.length === 1) {
    //   return [str]
    // }

    return path
  }

  function parse(str : string) {
    const ptnSplit = /([^&=]+)(=([^&=]*))?/g

    let p : RegExpExecArray

    let obj : any = {}
    while(p = ptnSplit.exec(str) as RegExpExecArray) {
      const [, key, , value] = p
      // console.log(key, value);

      const path = getPath(key)

      // value有可能是%2f，这种转义过的字符，所以需要decodeURIComponent
      obj = deepSet(obj, path, decodeURIComponent(value))
    }
    
    console.log(obj);
    return obj
  }

  // console.log(getPath('a'));
  // console.log(getPath('a@#$@#$'));
  // console.log(getPath('a.b.c'));
  // console.log(getPath('a.b[1][2][3].c'));

  parse("x&a=1&b=2&arr[0]=1&arr[1]=2&arr[2]=3&person.name=dy")
  // {
  //   a: 1,
  //   b: 2,
  //   arr: [1, 2, 3],
  //   person: {
  //     name: 'dy'
  //   }
  // }
})()