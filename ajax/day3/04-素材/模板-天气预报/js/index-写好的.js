/**
 * 一. 默认查询北京天气
 * */
// 1.1 封装天气查询函数
function searchWeather(city) {
  hmAxios({
    url: 'http://hmajax.itheima.net/api/weather',
    params: {
      city
    }
  }).then(res => {
    console.log(res)
    // 1.3 渲染天气
    const wData = res.data
    // 城市
    document.querySelector('.area').innerText = wData.area
    // 日期
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

    // 今日天气
    const tWeather = wData.todayWeather
    const tStr = `
      <div class="range-box">
        <span>今天：</span>
        <span class="range">
          <span class="weather">${tWeather.weather}</span>
          <span class="temNight">${tWeather.temNight}</span>
          <span>-</span>
          <span class="temDay">${tWeather.temDay}</span>
          <span>℃</span>
        </span>
      </div>
      <ul class="sun-list">
        <li>
          <span>紫外线</span>
          <span class="ultraviolet">${tWeather.ultraviolet}</span>
        </li>
        <li>
          <span>湿度</span>
          <span class="humidity">${tWeather.humidity}</span>%
        </li>
        <li>
          <span>日出</span>
          <span class="sunriseTime">${tWeather.sunriseTime}</span>
        </li>
        <li>
          <span>日落</span>
          <span class="sunsetTime">${tWeather.sunsetTime}</span>
        </li>
      </ul>
    `
    document.querySelector('.today-weather').innerHTML = tStr

    // 7日内天气预报
    const weekDate = wData.dayForecast
    const weekStr = weekDate.map(v => {
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

// 1.2 默认查询北京天气
searchWeather('110100')


/**
 * 二. 城市查询
 * */
// 2.4 性能优化 利用lodash的debounce方法生成防抖函数
const func = _.debounce(function () {
  // 2.2 查询城市
  hmAxios({
    url: 'http://hmajax.itheima.net/api/weather/city',
    params: {
      city: this.value.trim()
    }
  }).then(res => {
    // 2.3 渲染城市
    console.log(res)
    const html = res.data.map(v => {
      return `<li class="city-item" data-code="${v.code}">${v.name}</li>`
    }).join('')
    document.querySelector('.search-list').innerHTML = html
  })
}, 800)
// 2.1 注册input事件
document.querySelector('.search-city').addEventListener('input', func)


/**
 * 三. 点击查询城市天气
 * */
// 3.1 事件委托绑定事件
document.querySelector('.search-list').addEventListener('click', function (e) {
  console.log(e.target)
  if (e.target.classList.contains('city-item')) {
    // 获取城市编码
    const { code } = e.target.dataset
    // 查询城市天气
    searchWeather(code)
  }
})

