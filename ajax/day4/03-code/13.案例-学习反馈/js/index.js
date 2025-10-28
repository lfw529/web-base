/**
 * 需求1: 省份列表
 *  1. 获取数据
 *  2. 渲染数据
 * */
// 1. 获取数据
async function getProvince() {
  const res = await axios({
    url: 'http://hmajax.itheima.net/api/province'
  })
  // console.log(res)
  // 2. 渲染数据
  const html = res.data.list.map(v => {
    return `<option value="${v}">${v}</option>`
  }).join('')
  // console.log(html)
  document.querySelector('.province').innerHTML = `<option value="">省份</option>${html}`
}
getProvince()


/**
 * 需求2: 城市列表
 *  2.1 注册事件
 *  2.2 获取城市数据
 *  2.3 渲染数据
 *  2.4 清空地区列表
 * */
// 2.1 注册事件
document.querySelector('.province').addEventListener('change', async function () {
  // 缺少async关键字 会报错
  // document.querySelector('.province').addEventListener('change', function () {
  // select标签的value属性 获取到的是 选中的option标签的value值
  console.log(this.value)

  // 2.2 获取城市数据
  const res = await axios({
    url: 'http://hmajax.itheima.net/api/city',
    params: {
      pname: this.value
    }
  })
  console.log(res)

  // 2.3 渲染数据
  const html = res.data.list.map(v => {
    return `<option value="${v}">${v}</option>`
  }).join('')
  // console.log(html)
  document.querySelector('.city').innerHTML = `<option value="">城市</option>${html}`

  //  2.4 清空地区列表
  // 选中地区之后，更换省份地区会停留在上一次的状态，必须要清空掉
  document.querySelector('.area').innerHTML = `<option value="">地区</option>`
})

/**
 * 需求3: 地区列表
 *  3.1 注册事件
 *  3.2 获取地区数据
 *  3.3 渲染数据
 * */
//  3.1 注册事件
document.querySelector('.city').addEventListener('change', async function () {
  console.log(this.value)
  // 3.2 获取地区数据
  const res = await axios({
    url: 'http://hmajax.itheima.net/api/area',
    params: {
      cname: this.value,
      pname: document.querySelector('.province').value
    }
  })
  console.log(res)
  // 3.3 渲染数据
  const html = res.data.list.map(v => {
    return `<option value="${v}">${v}</option>`
  }).join('')
  console.log(html)
  document.querySelector('.area').innerHTML = `<option value="">地区</option>${html}`
})

/**
 * 需求4: 反馈提交
 *  4.1 注册事件
 *  4.2 收集表单数据并提交
 *  4.3 提示用户
 * */
// 4.1 注册事件
document.querySelector('.submit').addEventListener('click', async () => {
  // 4.2 收集表单数据并提交
  const form = document.querySelector('.info-form')
  const data = serialize(form, { hash: true, empty: true })
  // console.log(data)

  try {
    const res = await axios({
      url: 'http://hmajax.itheima.net/api/feedback',
      method: 'post',
      data
    })
    // console.log(res)
    // 4.3 提示用户
    // 成功的提示
    alert(res.data.message)
  } catch (error) {
    // console.dir(error)
    alert(error.response.data.message)
  }

})
