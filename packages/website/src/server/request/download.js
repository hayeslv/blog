/*
 * @Author: Lvhz
 * @Date: 2021-01-07 10:47:55
 * @Description: 下载
 */

// 导出已有的url
export function download(url, params = {}) {
  if (!url) return;
  const downloadLink = window.document.createElement('a');
  const fileName = params.fileName || '';
  const fileUrl = url;
  downloadLink.href = fileUrl;
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  window.URL.revokeObjectURL(fileUrl);
}
