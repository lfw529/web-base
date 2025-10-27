/**
 * 二 壁纸上传
 *  1. 选择壁纸
 *  2. FormData
 *  3. 上传壁纸
 * */
document.querySelector('.skin-ipt').addEventListener('change', function () {
  // 1,2 选择壁纸 通过append方法添加到FormData对象中
  const data = new FormData()
  data.append('img', this.files[0])

  // 3 上传壁纸
  axios({
    url: 'http://hmajax.itheima.net/api/uploadimg',
    method: 'post',
    data
  }).then(res => {
    const { url } = res.data.data
    document.body.style.backgroundImage = `url(${url})`
    // 缓存URL
    localStorage.setItem('skin', url)
  })
})

// 读取URL
const imgUrl = localStorage.getItem('skin')
// 非空判断
if (imgUrl) {
  document.body.style.backgroundImage = `url(${imgUrl})`
}




