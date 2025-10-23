/*
  http://hmajax.itheima.net/api/area
  传递某个省份内某个城市的所有区县
  查询参数名：pname、cname
  pname说明：传递省份或直辖市名，比如 北京、湖北省…
  cname说明：省份内的城市，比如 北京市、武汉市…
  核心功能：查询地区，并渲染列表
*/
document.querySelector('.my-button').addEventListener('click', function () {
  // console.log('点了按钮哦!')

  // 1.获取输入框的内容
  const pname = document.querySelector('.province').value
  const cname = document.querySelector('.city').value
  console.log('pname:', pname)
  console.log('cname:', cname)

  // 2.查询地区，并渲染列表
  axios({
    url: 'http://hmajax.itheima.net/api/area',
    params: {
      pname, cname // pname: pname,
      // cname: cname
    }
  }).then(res => {
    // console.log(res.data)
    const list = res.data.list
    // console.log('list:', list)
    const htmlArr = list.map(v => `<li class="list-group-item">${v}</li>`)
    // console.log('htmlArr:', htmlArr)
    document.querySelector('.list-group').innerHTML = htmlArr.join('')
  })
})
