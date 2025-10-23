// 1.获取 alert
const alertCom = document.querySelector('.alert')


// 2.抽取提示框的方法
function showAlert(msg, classname) {
  alertCom.innerText = msg
  alertCom.classList.add(classname)
  alertCom.classList.add('show')
  setTimeout(() => {
    // 延迟隐藏
    alertCom.classList.remove('show')
    alertCom.classList.remove(classname)
  }, 1000);
}

// 3.给注册按钮绑定点击事件，提交输入的用户信息到服务器
document.querySelector('.btn-register').addEventListener('click', function () {
  // 3.1 获取输入的用户名、密码、确认密码
  const username = document.querySelector('.username').value.trim()
  const password = document.querySelector('.password').value.trim()
  const repassword = document.querySelector('.re-password').value.trim()
  // 3.2用户名和密码 长度判断
  if (username.length < 8) {
    showAlert('用户名长度需要大于等于8', 'alert-danger')
    return
  }
  if (password.length < 6) {
    showAlert('密码长度需要大于等于6', 'alert-danger')
    return
  }

  // 3.3 判断两次密码是否相同
  if (repassword !== password) {
    showAlert('两次输入的密码不一致', 'alert-danger')
    return
  }
  // 3.4 通过axios提交到服务器 并 提示用户 成功 / 失败
  axios({
    url: 'http://hmajax.itheima.net/api/register',
    method: 'post',
    data: {
      username,
      password
    }
  }).then(res => {
    // 显示提示框
    showAlert(res.data.message, 'alert-success')
  }).catch(err => {
    // 显示警示框
    showAlert(err.response.data.message, 'alert-danger')
  })
})

