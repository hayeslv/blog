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
    reader.onload = function () {
      resolve(this.result);
    };
  });
};

// 是否是图片格式（这里包含gif、jpg、png三种格式）
export const isImage = async (file) => {
  if (file instanceof File) {
    // 通过文件流来判定
    // gif是前6个，jpg是前两个和后两个，png是前8个
    return (await isGif(file)) || (await isPng(file)) || (await isJpg(file));
  }
  return false;

  // 二进制转字符串
  function blobToString(blob) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function () {
        const res = reader.result
          .split("")
          .map((v) => v.charCodeAt()) // 转换成ASCII码
          .map((v) => v.toString(16).toUpperCase()) // 转成16进制，转成大写
          .map((v) => v.padStart(2, "0")) // 个位数前方补0
          .join(" ");
        resolve(res);
      };
      reader.readAsBinaryString(blob);
    });
  }
  // 判断jpg格式
  async function isJpg(file) {
    // jpg判断前2个和后2个16进制
    const len = file.size;
    const start = await blobToString(file.slice(0, 2));
    const end = await blobToString(file.slice(-2, len));
    const isJpg = start === "FF D8" && end === "FF D9";
    return isJpg;
  }
  // 判断gif格式
  async function isGif(file) {
    // 前面6个16进制：'47 49 46 38 39 61' or '47 49 46 38 37 61'
    // 分别代表：GIF89a 和 GIF87a
    const res = await blobToString(file.slice(0, 6));
    const isGif = res === "47 49 46 38 39 61" || res === "47 49 46 38 37 61";
    return isGif;
  }
  // 判断png格式
  async function isPng(file) {
    // png判断前8个16进制
    const res = await blobToString(file.slice(0, 8));
    const isPng = res === "89 50 4E 47 0D 0A 1A 0A";
    return isPng;
  }
};

// 文件切片：计算文件chunk（默认500KB）
// 使用web-worker计算chunk：在public下写fileChunk.js文件
// export const createFileChunk3 = (file, size = 500 * 1024) => {
//   return new Promise((resolve) => {
//     const worker = new Worker('/static/fileChunk.js')
//     worker.postMessage({ file, size })
//     worker.onmessage = (e) => {
//       const { chunks } = e.data
//       if (chunks) {
//         resolve(chunks)
//       }
//     }
//   })
// }
// 文件切片：计算文件chunk（默认500KB）
//! 利用空闲时间计算切片
// export const createFileChunk2 = (file, size = 500 * 1024) => {
//   return new Promise((resolve, reject) => {
//     if(!(file instanceof File)) {
//       console.error('error form createFileChunk：参数错误（不是文件格式）')
//       reject('error form createFileChunk：参数错误（不是文件格式）')
//     }
//     const chunks = []
//     let cur = 0

//     const workLoop = deadline => {
//       while (cur < file.size && deadline.timeRemaining() > 1) {
//         // 空闲时间，且有fileSize还没计算完成
//         chunks.push({ index: cur, file: file.slice(cur, cur + size) })
//         cur += size
//         if(cur >= file.size) {
//           resolve(chunks)
//         }
//       }
//       window.requestIdleCallback(workLoop)
//     }
//     window.requestIdleCallback(workLoop)
//   })
// }
// !原先的方法
export const createFileChunk = (file, size = 500 * 1024) => {
  if (!(file instanceof File)) {
    console.error("error form createFileChunk：参数错误（不是文件格式）");
    return [];
  }
  const chunks = [];
  let cur = 0;
  while (cur < file.size) {
    chunks.push({ index: cur, file: file.slice(cur, cur + size) });
    cur += size;
  }
  return chunks;
};

// 使用web-worker计算文件hash
// 1、将spark-md5.min.js从node_modules复制到public/static目录下
// 2、在public下写hash.js文件
export const calculateHashWorker = (chunks, cb = () => {}) => {
  return new Promise((resolve) => {
    const worker = new Worker("/static/hash.js");
    worker.postMessage({ chunks: chunks });
    worker.onmessage = (e) => {
      cb(e);
      const { hash } = e.data;
      if (hash) {
        resolve(hash);
      }
    };
  });
};

// 使用空闲时间计算文件hash
export const calculateHashIdle = (chunks, cb = () => {}) => {
  const sparkMD5 = require("spark-md5");
  return new Promise((resolve) => {
    const spark = new sparkMD5.ArrayBuffer();
    let count = 0;
    // 将每个切片添加进spark
    const appendToSpark = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = (e) => {
          spark.append(e.target.result);
          resolve();
        };
      });
    };
    const workLoop = async (deadline) => {
      while (count < chunks.length && deadline.timeRemaining() > 1) {
        // 空闲时间，且有任务
        await appendToSpark(chunks[count].file);
        count++;
        if (count < chunks.length) {
          cb({ progress: Number(((100 * count) / chunks.length).toFixed(2)) });
        } else {
          cb({ progress: 100 });
          resolve(spark.end());
        }
      }
      window.requestIdleCallback(workLoop);
    };
    window.requestIdleCallback(workLoop);
  });
};

// 抽样hash
export const calculateHashSample = (file) => {
  const sparkMD5 = require("spark-md5");
  return new Promise((resolve, reject) => {
    if (!(file instanceof File)) {
      console.error("error form calculateHashSample：参数错误（不是文件格式）");
      reject("error form calculateHashSample：参数错误（不是文件格式）");
    }
    const spark = new sparkMD5.ArrayBuffer();
    const reader = new FileReader();

    const size = file.size;
    const offset = 2 * 1024 * 1024; // 第一个区块（2M），最后一个区块，数据全要
    const chunks = [file.slice(0, offset)]; // 中间的，取前中后各两个字节

    let cur = offset;
    while (cur < size) {
      if (cur + offset >= size) {
        // 最后一个区块
        chunks.push(file.slice(cur, cur + offset));
      } else {
        // 中间的区块
        const mid = (cur + offset) / 2;
        const end = cur + offset;
        chunks.push(file.slice(cur, cur + 2));
        chunks.push(file.slice(mid, mid + 2));
        chunks.push(file.slice(end - 2, end));
      }
      cur += offset;
    }
    reader.readAsArrayBuffer(new Blob(chunks));
    reader.onload = (e) => {
      spark.append(e.target.result);
      resolve(spark.end());
    };
  });
};

// web-worker和idle同时使用
export const calculateHashDouble = async (chunks) => {
  if (!Array.isArray(chunks)) {
    console.error("error form calculateHashDouble：参数错误（请传入数组）");
    return;
  }
  const sparkMD5 = require("spark-md5");

  const half = Math.floor(chunks.length / 2);
  const preChunks = chunks.slice(0, half);
  const nextChunks = chunks.slice(half, chunks.length);

  const promiseAll = [];
  promiseAll.push(calculateSectionIdle(preChunks));
  promiseAll.push(calculateSectionWorker(nextChunks));
  const res = await Promise.all(promiseAll);
  const spark = new sparkMD5.ArrayBuffer();
  const list = [...res[0], ...res[1]];
  list.forEach((item) => spark.append(item));
  return spark.end();

  function calculateSectionIdle(chunks, cb = () => {}) {
    const appendResultList = [];
    return new Promise((resolve) => {
      let count = 0;
      // 将每个切片添加进spark
      const appendToSpark = (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = (e) => {
            resolve(e.target.result);
          };
        });
      };
      const workLoop = async (deadline) => {
        while (count < chunks.length && deadline.timeRemaining() > 1) {
          // 空闲时间，且有任务
          const appendResult = await appendToSpark(chunks[count].file);
          appendResultList.push(appendResult);
          count++;
          if (count < chunks.length) {
            cb({
              progress: Number(((100 * count) / chunks.length).toFixed(2)),
            });
          } else {
            cb({ progress: 100 });
            resolve(appendResultList);
          }
        }
        window.requestIdleCallback(workLoop);
      };
      window.requestIdleCallback(workLoop);
    });
  }
  function calculateSectionWorker(chunks, cb = () => {}) {
    return new Promise((resolve) => {
      const worker = new Worker("/static/fileSection.js");
      worker.postMessage({ chunks: chunks });
      worker.onmessage = (e) => {
        cb(e);
        const { sectionList } = e.data;
        if (sectionList) {
          resolve(sectionList);
        }
      };
    });
  }
};
