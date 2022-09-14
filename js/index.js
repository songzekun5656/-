/*轮播图*/
// 声明用于轮播图中改变样式的函数
function changeStyle(imgBox,left,pointArr,pointIndex){
  imgBox.style.left = left + 'px'
  pointArr.forEach((item) => {
    item.style.backgroundColor = '#b2b2b2'
  })
  pointArr[pointIndex].style.backgroundColor = '#ff6900'
}

// 声明一个轮播图区域的函数
function swiper(selector,intervalId){
  /*图片滚动数据*/
  let imgBox = document.querySelector(selector+' .swiper-box')
  let width = imgBox.clientWidth
  let totalWidth = width * imgBox.children.length
  let left = 0
  /*分页器滚动数据*/
  let swiperPoint = document.querySelector(selector+' .swiper-pagination')
  // 将伪数组转为真数组，便于遍历
  let pointArr = new Array(...swiperPoint.children)
  let pointIndex = 0

  // 声明定时器回调函数
  function running(){
    left -= width
    pointIndex += 1
    if (-left >= totalWidth) {
      left = 0
      pointIndex = 0
    }
    // 调用changeStyle函数改变当前样式
    changeStyle(imgBox,left,pointArr,pointIndex)
  }

  // 用传入的字符串参数作为变量名，并将定时器标识赋值给它，用于后续清除指定定时器
  intervalId = setInterval(running, 5000)

  // 为分页器的每一块绑定点击事件
  pointArr.forEach((item,index)=>{
    item.onclick = ()=>{
      // 停止上一个定时器
      clearInterval(intervalId)

      // 改变当前样式
      left = -width * index
      pointIndex = index
      changeStyle(imgBox,left,pointArr,pointIndex)

      // 重新开启定时器
      intervalId = setInterval(running,5000)
    }
  })

  // 为左右按钮搬到点击事件
  let leftBtn = document.querySelector(selector+' .i-btn-left')
  let rightBtn = document.querySelector(selector+' .i-btn-right')
  /// 左按钮
  leftBtn.onclick = () => {
    // 停止上一个定时器
    clearInterval(intervalId)

    // 改变当前样式
    left += width
    if (left >= width){
      left = -width * (pointArr.length-1)
    }
    pointIndex -= 1
    if (pointIndex <= -1){
      pointIndex = pointArr.length-1
    }
    changeStyle(imgBox,left,pointArr,pointIndex)

    // 重新开启定时器
    intervalId = setInterval(running,5000)
  }

  // 右按钮
  rightBtn.onclick = () => {
    clearInterval(intervalId)

    left -= width
    if (-left >= totalWidth){
      left = 0
    }
    pointIndex += 1
    if (pointIndex >= pointArr.length){
      pointIndex = 0
    }
    changeStyle(imgBox,left,pointArr,pointIndex)

    intervalId = setInterval(running,5000)
  }

}

swiper('.content-second','intId1')
swiper('.content-fifth','intId2')

/*头部透明度、回到顶部按钮*/
/// 头部透明度变化
function callBack(){
  if (html.scrollTop === 0){
    header.style.backgroundColor = 'rgba(0,0,0,0)'
    scrollBtn.style.display = 'none'
  }else {
    header.style.backgroundColor = 'rgb(0,0,0)'
    scrollBtn.style.display = 'block'
  }
}

let html = document.documentElement
let body = document.body
let header = document.querySelector('.header')
let scrollBtn = document.querySelector('.scroll-btn')

body.onload = callBack
body.onscroll = callBack

/// 回到顶部
scrollBtn.onclick = function (){
  let WIDTH = 100
  let intervalId = setInterval(()=>{
    html.scrollTop = html.scrollTop - WIDTH
    if (html.scrollTop <= 0){
      html.scrollTop = 0
      clearInterval(intervalId)
    }
  },10)
}

/// 人工服务按钮效果
let serveLink = document.querySelector('.footer-top-right>a')
let serveImg = document.querySelector('.footer-top-right img')
let serveSpan = document.querySelector('.footer-top-right span')
function changeServeLink(imgUrl,bgColor,fontColor){
  serveImg.src = imgUrl
  serveLink.style.backgroundColor = bgColor
  serveSpan.style.color = fontColor
}

serveLink.onmouseover = function (){
  changeServeLink('./images/message_white.svg','#ff6900','#ffffff')

}

serveLink.onmouseout = function (){
  changeServeLink('./images/message_orange.svg','#ffffff','#ff6900')
}

/// 底部动态图片效果
let switchImg = document.querySelector('.switch-img')
let changeSign = true
setInterval(() => {
  if (changeSign){
    switchImg.src = './images/10013.png'
    changeSign = !changeSign
  }else{
    switchImg.src = './images/10007.png'
    changeSign = !changeSign
  }
},3000)
