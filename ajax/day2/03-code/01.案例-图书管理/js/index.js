/*
  一 图书列表
    1. 获取数据
    2. 渲染数据
*/
// 定义变量 保存外号，方便后续使用
const creator = '西蓝花'
// 抽取图书列表的逻辑到函数中
function getBooks() {
  // 1. 获取数据
  axios({
    url: 'http://hmajax.itheima.net/api/books',
    params: {
      // 起一个外号，并告诉服务器，获取自己的三本书，进行增删改查
      creator
    }
  }).then(res => {
    // 2. 渲染数据
    // console.log(res)
    const list = res.data.data
    console.log(list)
    // array->map->htmlArr->join->htmlStr
    const htmlArr = list.map((v, index) => {
      return `<tr>
                <td>${index + 1}</td>
                <td>${v.bookname}</td>
                <td>${v.author}</td>
                <td>${v.publisher}</td>
                <td data-id="${v.id}">
                  <span class="del">删除</span>
                  <span class="edit">编辑</span>
                </td>
              </tr>`
    })
    // console.log(htmlArr)
    const htmlStr = htmlArr.join('')
    // console.log(htmlStr)
    document.querySelector('.list').innerHTML = htmlStr
  })
}
// 默认调用一次
getBooks()

/*
  二 新增图书
    1. bootstrap弹框
    2. 增加图书
*/
// 创建弹框
const addModal = new bootstrap.Modal(document.querySelector('.add-modal'))
// js弹框
document.querySelector('.btn-show').addEventListener('click', () => {
  addModal.show()
})
// 点击增加按钮 隐藏弹框
document.querySelector('.add-btn').addEventListener('click', () => {
  // 收集用户数据 并提交到服务器
  const addForm = document.querySelector('.add-form')
  const data = serialize(addForm, { hash: true, empty: true })
  console.log(data)
  // 提交到服务器
  axios({
    url: 'http://hmajax.itheima.net/api/books',
    method: 'post',
    data: {
      creator,
      ...data
    }
  }).then(res => {
    // 调用函数获取图书数据
    getBooks()
    // 清空表单 reset
    addForm.reset()
    // 关闭弹框
    addModal.hide()
  })

})

/*
  三 删除图书
    1. 绑定点击事件
    2. 删除图书
*/
// 绑定点击事件 - 事件委托
document.querySelector('.list').addEventListener('click', (e) => {
  // console.log('点了tbody')
  // 通过事件参数 获取触发事件的元素
  // console.log(e.target)
  // 点了删除再执行后续逻辑
  if (!e.target.classList.contains('del')) {
    // 点的不是删除 才会执行这里的逻辑
    return
  }
  // 点的是删除 才会执行到这里
  console.log('点了删除')

  // 2. 删除图书
  // 获取保存在删除元素父元素上的自定义属性 data-id的值
  // console.log(e.target.parentNode)
  // console.log(e.target.parentNode.dataset)
  const { id } = e.target.parentNode.dataset
  // console.log(id)
  axios({
    url: `http://hmajax.itheima.net/api/books/${id}`,
    method: 'DELETE'
  }).then(res => {
    // 重新获取数据
    getBooks()
  })
})

/*
  四 编辑图书
    1. 获取数据
    2. 编辑弹框
    3. 保存修改
*/
// 通过js控制编辑弹框
const editModal = new bootstrap.Modal(document.querySelector('.edit-modal'))
// editModal.show()
// 绑定点击事件 - 事件委托
document.querySelector('.list').addEventListener('click', (e) => {
  if (!e.target.classList.contains('edit')) {
    return
  }
  // console.log('点了编辑')
  // 获取图书id 通过编辑元素的父元素的自定义属性 data-id获取id
  // console.log(e.target.parentNode.dataset)
  const { id } = e.target.parentNode.dataset
  // console.log(id)
  // 获取图书数据
  axios({
    url: `http://hmajax.itheima.net/api/books/${id}`
  }).then(res => {
    // console.log(res)
    const book = res.data.data
    console.log(book)
    // 设置获取到的图书数据
    // document.querySelector('.edit-modal .id').value = book.id
    // document.querySelector('.edit-modal .bookname').value = book.bookname

    // Object.keys 获取对象的属性名 ['id', 'bookname', 'author', 'publisher']
    // const keys = Object.keys(book)
    // console.log(keys)
    Object.keys(book).forEach(key => {
      // console.log(key)
      document.querySelector(`.edit-modal .${key}`).value = book[key]
    })

    // 弹出编辑框
    editModal.show()
  })
})

document.querySelector('.edit-btn').addEventListener('click', () => {
  console.log('点了修改')
  // 通过插件获取表单中的数据
  // const book = serialize(document.querySelector('.edit-form'), { hash: true, empty: true })
  // console.log(book)
  const { author, bookname, id, publisher } = serialize(document.querySelector('.edit-form'), { hash: true, empty: true })
  // 调用修改接口
  axios({
    url: `http://hmajax.itheima.net/api/books/${id}`,
    method: 'PUT',
    data: {
      bookname,
      author,
      publisher,
      creator
    }
  }).then(res => {
    // 获取数据
    getBooks()
    // 关闭弹框
    editModal.hide()
  })
})