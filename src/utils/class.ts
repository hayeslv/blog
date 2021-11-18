/*
 * @Author: Lvhz
 * @Date: 2021-11-18 09:47:20
 * @Description: 元素、类 操作
 */

/** 隐藏所有指定元素
 * @param el 
 * （隐藏页面上所有<img />元素）
 * 使用方式：hideEl(document.querySelectorAll('img'))
 */
export const hideEl = (el : NodeListOf<HTMLElement>) : void => [...el].forEach(e => (e.style.display = "none"))

/** 确认元素是否具有指定的类
 * @param el 
 * @param className 
 * @returns 
 * （第一个p标签上是否具有artical这个类）
 * 使用方式：hasClass(document.querySelector("p"), "artical");
 */
export const hasClass = (el : HTMLElement, className : string) : boolean => el.classList.contains(className)

/** 切换元素的类
 * @param el 
 * @param className 
 * @returns 
 * （第一个p标签上是否具有artical这个类：如果有则删掉，如果没有则加上）
 * 使用方式：toggleClass(document.querySelector("p"), "artical");
 */
export const toggleClass = (el : HTMLElement, className : string) : boolean => el.classList.toggle(className);
 
/** 获取当前页面的滚动位置
 * @param el 
 * @returns { x: 0, y: 0 }
 * 使用方式：getScrollPosition();
 */
export const getScrollPosition = (el = window) => ({ 
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollX, 
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollY 
}); 

/** 滚动到页面顶部
 * 使用方式：scrollToTop()
 */
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if(c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c/8)
  }
}

/** 确认父元素是否包含子元素
 * @param parent 
 * @param child 
 * @returns 
 * （查看body中是否存在.title的子元素）
 * 使用方式：elementContains(document.querySelector("body"), document.querySelector(".title"));
 */
export const elementContains = (parent : HTMLElement, child : HTMLElement) => parent !== child && parent.contains(child);

/** 确认指定元素是否在视口可见
 * @param el 指定元素
 * @param partiallyVisible 是否部分可见
 * @returns 
 * 使用方式：
 * 1、不完全可见：elementIsVisibleInViewport(el);
 * 2、部分可见：elementIsVisibleInViewport(el, true);
 */
export const elementIsVisibleInViewport = (el : HTMLElement, partiallyVisible = false) => {     
  const { top, left, bottom, right } = el.getBoundingClientRect();     
  const { innerHeight, innerWidth } = window;     
  return partiallyVisible ? 
    ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)) : 
    top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth; 
}; 


