import './style.scss'
import arrowBtn from '/arrow-btn.svg'
import { setupCalendar } from './calendar.js'
import { themeToggle } from './theme-toggle.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1 class="visually-hidden">«Альпака календарь»</h1>
    <div class="container">
      <button class="theme-toggle">Переключить тему</button>
      <div class="calendar">
        <div class="calendar__header">
          <h2 class="calendar__month" id="month-year"></h2>
          <div class="calendar__btns">
            <button type="button"  class="calendar__btn calendar__btn--prev" id="prev-btn">
              <img src="${arrowBtn}" class="calendar__btn-img calendar__btn-img-prev" width="8" height="12" alt="Стрелка назад" />
            </button>
            <button type="button"  class="calendar__btn calendar__btn--next" id="next-btn">
              <img src="${arrowBtn}" class="class="calendar__btn-img calendar__btn-img-next" width="8" height="12" alt="Стрелка назад" />
            </button>
          </div>
        </div>
        <div class="calendar__body">
          <div class="calendar__days" id="calendar-days"></div>
        </div>
      </div>
  </div>
`
setupCalendar(document.querySelector('#calendar'))
themeToggle(document.querySelector('#theme-toggle'))
