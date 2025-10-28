/**
 * 需求: 获取所有分类数据并同时渲染到页面上
 *  1. 获取一级商品分类
 *  2. 获取所有二级商品分类
 *  3. 渲染数据
 * */

async function func() {
  // 1. 获取一级商品分类
  const res1 = await axios({
    url: 'http://hmajax.itheima.net/api/category/top'
  })
  console.log(res1)
  // 2. 获取所有二级商品分类
  // 基于数据[]-map-》Promise数组[]
  const pArray = res1.data.data.map(v => {
    const { id } = v
    return axios({
      url: 'http://hmajax.itheima.net/api/category/sub',
      params: {
        id
      }
    })
  })
  console.log(pArray)

  // Promise.all 等待所有二级分类接收获取到数据
  const result = await Promise.all(pArray)
  console.log(result)

  // 3. 渲染数据
  const html = result.map(v => {
    const { name, children } = v.data.data
    return `
      <div class="item">
          <h3>${name}</h3>
          <ul>
          ${children.map(c => {
      return `
            <li>
              <a href="javascript:;">
                <img src="${c.picture}">
                <p>${c.name}</p>
              </a>
            </li>`
    }).join('')}            
          </ul>
        </div>
    `
  }).join('')
  document.querySelector('.sub-list').innerHTML = html
}

func()

