/*
  1. 点击登录 和 服务器通信
  2. 判断 用户名 和 密码的长度
  3. 提示信息
  4. 通过 form-serialize插件 快速收集表单元素的值
*/

// 4. 封装提示框函数
function myAlert(msg, flag) {
  // 获取弹框的dom元素
  const alertDom = document.querySelector('.my-alert')
  // 显示弹框 添加 show类名
  alertDom.classList.add('show')
  // 更改弹框的内容-使用msg的内容
  alertDom.innerText = msg
  // 根据flag 控制外观 成功true- alert-success / 失败false- alert-danger
  alertDom.classList.add(flag ? 'alert-success' : 'alert-danger')
  // 过一会，隐藏弹框
  setTimeout(() => {
    alertDom.classList.remove('show')
    alertDom.classList.remove(flag ? 'alert-success' : 'alert-danger')
  }, 1000);
}

document.querySelector('.btn-login').addEventListener('click', () => {
  // 2. 获取用户输入的用户名和密码
  // const username = document.querySelector('.username').value
  // const password = document.querySelector('.password').value
  // console.log(username, password)

  // 2.通过 form-serialize插件 快速收集表单元素的值
  const form = document.querySelector('.login-form')
  // {username: 'itheima001', password: '123456'}
  // const data = serialize(form, { hash: true, empty: true })
  const { username, password } = serialize(form, { hash: true, empty: true })
  // console.log(data)
  console.log(username, password)

  // 3. 判断 用户名 和 密码的长度
  if (username.length < 8) {
    console.log('用户名的长度应该大于等于8')
    myAlert('用户名的长度应该大于等于8', false)
    return
  }
  if (password.length < 6) {
    console.log('密码的长度应该大于等于6')
    myAlert('密码的长度应该大于等于6', false)
    return
  }

  // 1.使用axios和服务器通信
  axios({
    url: 'http://hmajax.itheima.net/api/login',
    method: 'POST',
    data: {
      username,// username: username,
      password// password: ''
    }
  }).then(res => {
    console.log(res.data.message)
    myAlert(res.data.message, true)
  }).catch(err => {
    console.log(err.response.data.message)
    myAlert(err.response.data.message, false)
  })
})