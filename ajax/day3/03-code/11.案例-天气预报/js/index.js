/**
 * 一. 默认查询北京天气
 *  1. 封装查询函数
 *  2. 查询北京天气
 *  3. 渲染天气
 * */
// 1. 封装查询函数
function searchWeather(city) {
  hmAxios({
    url: 'http://hmajax.itheima.net/api/weather',
    params: {
      city
    }
  }).then(res => {
    console.log(res)
    // 3. 渲染天气
    const wData = res.data

    // 城市名
    document.querySelector('.area').innerText = wData.area

    // 日期 定义模板字符串-》innerHTML
    const dateStr = `
      <span class="date">${wData.date}</span>
      <span class="calendar">农历&nbsp;
        <span class="dateLunar">${wData.dateLunar}</span>
      </span>
    `
    document.querySelector('.title').innerHTML = dateStr

    // 当前天气
    const curStr = `
    <div class="tem-box">
      <span class="temp">
        <span class="temperature">${wData.temperature}</span>
        <span>°</span>
      </span>
    </div>
    <div class="climate-box">
      <div class="air">
        <span class="psPm25">${wData.psPm25}</span>
        <span class="psPm25Level">${wData.psPm25Level}</span>
      </div>
      <ul class="weather-list">
        <li>
          <img src="${wData.weatherImg}" class="weatherImg" alt="">
          <span class="weather">${wData.weather}</span>
        </li>
        <li class="windDirection">${wData.windDirection}</li>
        <li class="windPower">${wData.windPower}</li>
      </ul>
    </div>
    `
    document.querySelector('.weather-box').innerHTML = curStr

    // 今天的天气
    const { todayWeather } = wData
    // console.log(todayWeather)
    const tStr = `
      <div class="range-box">
        <span>今天：</span>
        <span class="range">
          <span class="weather">${todayWeather.weather}</span>
          <span class="temNight">${todayWeather.temNight}</span>
          <span>-</span>
          <span class="temDay">${todayWeather.temDay}</span>
          <span>℃</span>
        </span>
      </div>
      <ul class="sun-list">
        <li>
          <span>紫外线</span>
          <span class="ultraviolet">${todayWeather.ultraviolet}</span>
        </li>
        <li>
          <span>湿度</span>
          <span class="humidity">${todayWeather.humidity}</span>%
        </li>
        <li>
          <span>日出</span>
          <span class="sunriseTime">${todayWeather.sunriseTime}</span>
        </li>
        <li>
          <span>日落</span>
          <span class="sunsetTime">${todayWeather.sunsetTime}</span>
        </li>
      </ul>
    `
    document.querySelector('.today-weather').innerHTML = tStr

    // 7日天气预报
    const weekStr = wData.dayForecast.map(v => {
      return `
        <li class="item">
          <div class="date-box">
            <span class="dateFormat">${v.dateFormat}</span>
            <span class="date">${v.date}</span>
          </div>
          <img src="${v.weatherImg}" alt="" class="weatherImg">
          <span class="weather">${v.weather}</span>
          <div class="temp">
            <span class="temNight">${v.temNight}</span>-
            <span class="temDay">${v.temDay}</span>
            <span>℃</span>
          </div>
          <div class="wind">
            <span class="windDirection">${v.windDirection}</span>
            <span class="windPower">${v.windPower}</span>
          </div>
        </li>
      `
    }).join('')
    // console.log(weekStr)
    document.querySelector('.week-wrap').innerHTML = weekStr
  })
}
// 2. 查询北京天气
searchWeather('110100')


/**
 * 二. 城市查询
 *  1. 注册input事件
 *  2. 函数防抖
 *  3. 查询城市
 *  4. 渲染城市
 */
// 2. 函数防抖 lodash
const func = _.debounce(function () {
  // console.log(this.value)
  // 3. 查询城市
  hmAxios({
    url: 'http://hmajax.itheima.net/api/weather/city',
    params: {
      city: this.value
    }
  }).then(res => {
    // console.log(res)
    // 4. 渲染城市
    const str = res.data.map(v => {
      return `<li class="city-item" data-code="${v.code}">${v.name}</li>`
    }).join('')
    // console.log(str)
    document.querySelector('.search-list').innerHTML = str
  })
}, 1000)

// 1. 注册input事件
document.querySelector('.search-city').addEventListener('input', func)


/**
 * 三. 点击查询城市天气
 *  1. 绑定点击事件
 *  2. 获取城市编码
 *  3. 查询城市天气
 * */
// 1. 绑定点击事件
document.querySelector('.search-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('city-item')) {
    // console.log('点了li标签')
    // 2. 获取城市编码
    // console.log(e.target.dataset)
    const { code } = e.target.dataset

    // 3. 查询城市天气
    searchWeather(code)
  }
})
