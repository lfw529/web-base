/**
 * 一 网站换肤
 *  1. 上传图片
 *  2. 设置body的背景图
 * */
document.querySelector('.skin-ipt').addEventListener('change', function () {
  // 1.1 上传图片

  // 选择图片
  console.log(this.files[0])

  // FormData对象
  const data = new FormData()
  data.append('img', this.files[0])

  // 调用图片上传接口
  axios({
    url: 'http://hmajax.itheima.net/api/uploadimg',
    method: 'POST',
    data
  }).then(res => {
    // console.log(res)
    const url = res.data.data.url
    console.log(url)

    // 1.2 设置body的背景图
    document.body.style.backgroundImage = `url(${url})`

    // 2.1 保存图片URL
    localStorage.setItem('img', url)
  })
})

/**
 * 二 本地持久化图片URL
 *  1. 保存图片URL
 *  2. 读取图片URL
 * */

// 2.2 读取图片URL
// 这里写代码会在页面打开时直接执行
const url = localStorage.getItem('img')
console.log(url)
// 设置body的背景图

// url存在 设置背景图
// url为null 不需要设置背景图
url && (document.body.style.backgroundImage = `url(${url})`)

// && 优先级 = 要高 通过() 提升优先级
// url && document.body.style.backgroundImage = `url(${url})`


