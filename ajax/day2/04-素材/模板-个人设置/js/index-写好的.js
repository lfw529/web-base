/**
 * 一 信息渲染
 * 1. 获取数据
 * 2. 渲染数据
 * */
// 1.  定义creator
const creator = '播仔'

// 2. 调用接口 
axios({
  url: 'http://hmajax.itheima.net/api/settings',
  params: {
    creator
  },
  method: 'get',
}).then(res => {
  // 3. 渲染数据
  const data = res.data.data
  console.log('data:', data)

  Object.keys(data).forEach(key => {
    console.log('key:', key)
    // 3.1 头像 src属性
    if (key === 'avatar') {
      document.querySelector(`.${key}`).src = data[key]
    }
    // 3.2 性别 checked属性
    else if (key === 'gender') {
      // 0 男 1 女
      const { gender } = data
      // 获取所有性别标签 [男radio,女radio]
      const genderRadios = document.querySelectorAll(`.${key}`)
      // 性别作为 索引 获取对应的标签
      genderRadios[gender].checked = true
    }
    // 3.3 邮箱 昵称 个人简介 value属性
    else {
      document.querySelector(`.${key}`).value = data[key]
    }
  })

})


/**
 * 二 头像上传
 * 1. 获取头像
 * 2. 调用接口
 * 3. 更新头像URL
 * */
document.querySelector('#upload').addEventListener('change', function () {
  // 1. 获取头像
  // this.files[0]

  // FormData
  const data = new FormData()
  data.append('avatar', this.files[0])
  data.append('creator', creator)

  // 2.调用接口
  axios({
    url: 'http://hmajax.itheima.net/api/avatar',
    method: 'put',
    data
  }).then(res => {
    // 3. 更新头像URL
    // 获取url
    const { avatar } = res.data.data
    // 渲染图片
    document.querySelector('.avatar').src = avatar
  })
})

/**
 * 三 信息修改
 * 1. 收集表单数据
 * 2. 调用接口
 * 3. 提示用户
 * */
const toastDom = document.querySelector('.toast')
const toast = new bootstrap.Toast(toastDom)
document.querySelector('.submit').addEventListener('click', () => {
  // 收集数据
  const data = serialize(document.querySelector('.user-form'), { hash: true, empty: true })
  data.gender = +data.gender
  // 提交数据
  axios({
    url: 'http://hmajax.itheima.net/api/settings',
    method: 'put',
    data: {
      ...data,
      creator
    }
  }).then(res => {
    // console.log('')
    toast.show()
  })
})




