/**
 * 一 信息渲染
 *  1. 获取数据
 *  2. 渲染数据
 * */
// 1. 获取数据
// 定义外号，获取属于自己的数据
const creator = '西蓝花'
axios({
  url: 'http://hmajax.itheima.net/api/settings',
  params: {
    creator
  }
}).then(res => {
  // console.log(res)
  const userInfo = res.data.data

  // 2. 渲染数据
  Object.keys(userInfo).forEach(key => {
    // console.log(key)
    // 2.1 头像 src属性
    if (key === 'avatar') {
      document.querySelector(`.${key}`).src = userInfo[key]
    }

    // 2.2 性别 checked属性
    else if (key === 'gender') {
      // 获取所有性别标签 伪数组[男Radio，女Radio]
      const genderRadios = document.querySelectorAll(`.${key}`)
      // console.log(genderRadios)
      // 获取服务器返回的性别 整数 0 男 1 女
      const gender = userInfo[key]
      // 找到对应标签 选中 性别作为索引即可获取对应的标签
      genderRadios[gender].checked = true
    }

    // 2.3 邮箱 昵称 个人简介 value属性
    else {
      document.querySelector(`.${key}`).value = userInfo[key]
    }
  })
})


/**
 * 二 修改头像
 *  1. 获取头像
 *  2. 调用修改头像接口
 *  3. 更新图片URL
 * */
// 1. 获取头像
document.querySelector('#upload').addEventListener('change', function () {
  console.log(this.files)

  // 2. 调用修改头像接口
  const data = new FormData()
  // 新头像
  data.append('avatar', this.files[0])
  // 外号，告诉服务器修改谁的数据，和获取数据的外号要一致
  data.append('creator', creator)
  axios({
    url: 'http://hmajax.itheima.net/api/avatar',
    method: 'PUT',
    data
  }).then(res => {
    // console.log(res)
    // 3. 更新图片URL
    const avatar = res.data.data.avatar
    document.querySelector('.avatar').src = avatar
  })
})


/**
 * 三 修改信息
 *  1. 收集表单数据
 *  2. 调用修改信息接口
 *  3. 提示用户
 * */
document.querySelector('.submit').addEventListener('click', () => {
  // 1. 收集表单数据
  const form = document.querySelector('.user-form')
  const formData = serialize(form, { hash: true, empty: true })
  // console.log(formData)

  // 2. 调用修改信息接口
  // 性别的类型转为 整数（文档要求）,不转换 会报错
  formData.gender = +formData.gender

  // 需要和creator合并为一个对象（告诉服务器修改的是谁的数据）
  const data = {
    ...formData,
    creator
  }
  console.log(data)

  axios({
    url: 'http://hmajax.itheima.net/api/settings',
    method: 'PUT',
    data
  }).then(res => {
    // 3. 提示用户
    // 创建弹框
    const toastDom = document.querySelector('.my-toast')
    const toast = new bootstrap.Toast(toastDom)

    // 显示弹框
    toast.show()
  })
})

