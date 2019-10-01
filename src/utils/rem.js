/*
 * base on clientWidth,then transform to rem,default 320px == 20rem
 */
export function setRem (doc, win) {
  let docEl = doc.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let reCaculate = function () {
    var clientWidth = docEl.clientWidth
    // console.log(clientWidth)
    if (!clientWidth) return
    let fontSize = 75 * (clientWidth / 750)
    fontSize = Math.min(fontSize, 75)
    docEl.style.fontSize = fontSize + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, reCaculate, false)
  doc.addEventListener('DOMContentLoaded', reCaculate, false)
}
/**
 * 自适应rem。首先判断用vw，没有支持vw再用js动态改变html的font-size
 *
 * @param {*} docEl
 * @param {*} padBaseSize
 */
export const autoRem = (docEl, padBaseSize) => {
  let width
  let resize = () => {
    let widthDynamic = Math.min(docEl.getBoundingClientRect().width, docEl.clientWidth, padBaseSize)
    if (width !== widthDynamic) {
      width = widthDynamic
      docEl.style.fontSize = `${width / 10}px`
    }
  }
  let el = document.createElement('div')
  el.setAttribute('style', 'width: 1vw')
  if (!el.style.width) {
    window.addEventListener && (window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', resize, false))
    window.addEventListener('DOMContentLoaded', resize, false)
  } else {
    docEl.style.fontSize = '10vw'
  }
}
