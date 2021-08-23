/*
 * @Author: Lvhz
 * @Date: 2021-08-23 11:00:40
 * @Description: Description
 */
export const file2Base64 = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      resolve(this.result)
    };
  })
}