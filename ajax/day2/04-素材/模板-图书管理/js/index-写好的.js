/*
  一 渲染图书列表
*/
// 3.3 抽取creator为变量
const creator = 'itheima1011'
// 2.4 抽取渲染图书列表的逻辑为函数
function getBooks() {
  axios({
    url: 'http://hmajax.itheima.net/api/books',
    // 3.4 替换为变量
    params: {
      creator
    }
  }).then(res => {
    console.log(res)
    const htmlArr = res.data.data.map((item, index) => {
      const { author, bookname, publisher, id } = item
      // 2.2 在删除按钮上保存id
      return `<tr>
                <td>${index + 1}</td>
                <td>${bookname}</td>
                <td>${author}</td>
                <td>${publisher}</td>
                <td>
                  <span data-id="${id}" class="del">删除</span>
                  <span data-id="${id}" class="edit">编辑</span>
                </td>
              </tr>`
    })
    const htmlStr = htmlArr.join('')
    document.querySelector('.list').innerHTML = htmlStr
  })
}
// 2.5 默认调用一次
getBooks()


/*
  二 删除图书
*/
// 2.1 事件委托绑定事件
document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.classList.contains('del')) {
    // 2.3 获取保存在删除按钮上的id
    const { id } = e.target.dataset
    axios({
      url: `http://hmajax.itheima.net/api/books/${id}`,
      method: 'delete'
    }).then(res => {
      // console.log(res)
      // 2.6 删除成功之后 重新获取数据并渲染
      getBooks()
    })
  }
})

/*
  三 新增图书
*/
const addModal = new bootstrap.Modal(document.querySelector('.add-modal'))

document.querySelector('.add-btn').addEventListener('click', () => {
  // 3.2 收集表单数据
  const addForm = document.querySelector('.add-form')
  const data = serialize(addForm, { hash: true, empty: true })
  console.log('data:', data)
  // 3.3 提交到服务器
  axios({
    url: 'http://hmajax.itheima.net/api/books',
    method: 'POST',
    data: { ...data, creator }
  }).then(res => {
    // console.log(res)
    // 关闭弹窗
    addModal.hide()
    // 重置表单
    addForm.reset()
    // 重新获取数据
    getBooks()
  })
})

/*
  四 编辑图书
*/
const editModal = new bootstrap.Modal(document.querySelector('.edit-modal'))
document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.classList.contains('edit')) {
    const { id } = e.target.dataset
    axios({
      url: `http://hmajax.itheima.net/api/books/${id}`,
    }).then(res => {
      console.log(res)
      // 保存图书数据
      // document.querySelector('.edit-modal .bookname').value = res.data.data.bookname
      // document.querySelector('.edit-modal .author').value = res.data.data.author
      // document.querySelector('.edit-modal .publisher').value = res.data.data.publisher
      for (const key in res.data.data) {
        document.querySelector(`.edit-modal .${key}`).value = res.data.data[key]
      }
      editModal.show()
    })
  }
})
document.querySelector('.edit-btn').addEventListener('click', () => {
  const data = serialize(document.querySelector('.edit-form'), { hash: true, empty: true })
  axios({
    url: `http://hmajax.itheima.net/api/books/${data.id}`,
    method: 'PUT',
    data: data
  }).then(res => {
    console.log(res)
    editModal.hide()
    getBooks()
  })
})