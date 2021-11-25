/*
 * @Author: Lvhz
 * @Date: 2021-11-25 15:50:11
 * @Description: Description
 */
export class ProjectFile {
  private file : File
  private fileName : string
  constructor(file : File) {
    this.file = file
    this.fileName = file.name
  }
  public getHash() {
    const sparkMD5 = require("spark-md5");
    return new Promise((resolve, reject) => {
      if (!(this.file instanceof File)) {
        console.error("error form calculateHashSample：参数错误（不是文件格式）");
        reject("error form calculateHashSample：参数错误（不是文件格式）");
      }
      const spark = new sparkMD5.ArrayBuffer();
      const reader = new FileReader();
  
      reader.readAsArrayBuffer(new Blob([this.file]));
      reader.onload = (e) => {
        spark.append(e.target!.result);
        resolve(spark.end());
      };
    })
  }
  public getExt() {
    const prts = this.fileName.split(".");
    return (prts.length > 1 ? prts.pop() : "") || ""
  }
  public getName() {
    return this.fileName
  }
  public getFile() {
    return this.file
  }
  public setFileName(name : string) {
    this.fileName = name;
  }
}