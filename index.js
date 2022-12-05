// 选择图片容器
var imgs = document.getElementById('imgs');
// 选择侧边导航栏容器
var sideBar = document.getElementById('side-bar');

// 存储我们创建的图片元素（a)
var imgsDom = [];
// 存储我们创建的导航元素（a）
var navDom = [];

// 记录当前活跃的图片和导航（active);
var activeImg = null;
var activeNav = null;

// 根据data数组，生成对应的图片以及侧边栏

for(var i=0; i<data.length; i++) {
  // i 数组中的索引
  // item代表数组中的一个对象
  var item = data[i];

  // 创建图片（a)
  var tagA = document.createElement('a');
      tagA.setAttribute('href', '#');
      tagA.style.backgroundColor = item.bg;
      tagA.style.backgroundImage = 'url('+ item.img +')';
      imgs.appendChild(tagA);
      imgsDom.push(tagA);

  // 创建导航（a）
  var tagNav = document.createElement('a');
      tagNav.setAttribute('class', 'nav');
      tagNav.setAttribute('href', '#');
      tagNav.setAttribute('title',item.title + ':' + item.desc);
      tagNav.innerHTML = '<span>'+ item.title +'</span> ' + item.desc;
      sideBar.appendChild(tagNav); 
      navDom.push(tagNav);
  // 第一个元素让它展示（图片展示，标题展示）
  if (i == 0) {
    tagA.setAttribute('class', 'active');
    tagNav.setAttribute('class', 'active');
    activeImg = tagA;
    activeNav = tagNav;
  }
  tagNav.onmouseenter = (function (tagA, tagNav) {
    return function () {
      // 鼠标移入清除定时器。
      clearInterval(t);

      // 1. 把原来活跃的图片和导航取消
      activeNav.setAttribute('class', 'nav');
      activeImg.setAttribute('class', '');
      // 2. 把当前被鼠标选中的导航和图片展示
       tagA.setAttribute('class', 'active');
       tagNav.setAttribute('class', 'active');
      // 3. 记录最新的导航和图片
      activeImg = tagA;
      activeNav = tagNav;
    }
  })(tagA, tagNav);
  tagNav.onmouseleave = function() {
    t = setInterval(move, 3000);
  }
}

// 自己动
function move() {
  // 1. 把原来活跃的图片和导航取消
    activeNav.setAttribute('class', 'nav');
    activeImg.setAttribute('class', '');
  // 找到当前元素的下一个
  // 当前图片在页面中的位置
  var index = imgsDom.indexOf(activeImg);
  console.log(index);
  // 如果是最后一个图片，下一个就是第一个图片
  if  (index == data.length - 1) {
    activeNav = navDom[0];
    activeImg = imgsDom[0];
  } else {
    activeImg = imgsDom[index + 1];
    activeNav = navDom[index + 1];
  }
  // 活跃的图片和导航，激活（具有active类名）
  activeImg.setAttribute('class', 'active');
  activeNav.setAttribute('class', 'active');
}
var t = setInterval(move, 3000);