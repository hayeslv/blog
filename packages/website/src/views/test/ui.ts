/*
 * @Author: Lvhz
 * @Date: 2021-11-07 16:44:27
 * @Description: Description
 */
interface UIInfo {
  /** @deprecated use box instead **/
  width : number;
  height : number;

  box : number;
}


function print(box : UIInfo) {
  console.log(box.width);
}
