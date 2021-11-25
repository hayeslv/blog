/*
 * @Author: Lvhz
 * @Date: 2021-11-25 17:44:56
 * @Description: 文件上传至OSS
 */
// @ts-ignore
import OSS from 'ali-oss'
import { aliOssConfig } from '@/config/config.default'

export class FileUploadOSS{
  private client : any
  constructor() {
    this.client = new OSS(aliOssConfig)
  }
  async uploadFile(file : File, url : string) {
    try {
      const ret = await this.client.put(url, file)
      console.log('upload file to oss success: ', ret);
    } catch(e) {
      console.error('error：', e);
    }
  }
  async getFile(url = 'markdown/object') {
    try {
      const ret = await this.client.get(url);
      return ret
    } catch(e) {
      console.error('error：', e);
    }
  }
}