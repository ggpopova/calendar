export function setupCalendar(element) {
  const monthYearEl = document.getElementById('month-year');
  const daysContainer = document.getElementById('calendar-days');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  // Проверка на наличие элементов
  if (!monthYearEl || !daysContainer || !prevBtn || !nextBtn) {
    console.error('Required calendar elements are missing');
    return;
  }

  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

  let currentDate = new Date();
  let startDate = null;
  let endDate = null;

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Display month and year
    monthYearEl.textContent = `${monthNames[month]} ${year}`;

    const firstDay = (new Date(year, month).getDay() + 6) % 7;
    const daysInMonth = 32 - new Date(year, month, 32).getDate();
    const prevMonthDays = 32 - new Date(year, month - 1, 32).getDate();

    daysContainer.innerHTML = '';

    // Add days from previous month
    for (let i = firstDay; i > 0; i--) {
      const prevDay = prevMonthDays - i + 1;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const currentDayDate = new Date(prevYear, prevMonth, prevDay);
      let isSelected = false;
      let isRangeStart = false;
      let isRangeEnd = false;
      let isSingleSelected = false;

      // Check if the day is in the selected range
      if (startDate) {
        if (!endDate) {
          isSingleSelected = currentDayDate.getTime() === startDate.getTime();
        } else {
          const start = new Date(startDate);
          const end = new Date(endDate);
          const rangeStart = start < end ? start : end;
          const rangeEnd = start < end ? end : start;
          isSelected = currentDayDate >= rangeStart && currentDayDate <= rangeEnd;
          isRangeStart = currentDayDate.getTime() === rangeStart.getTime();
          isRangeEnd = currentDayDate.getTime() === rangeEnd.getTime();
        }
      }

      daysContainer.innerHTML += `<button type="button" class="selected--opacity ${isSelected ? 'selected' : ''} ${isRangeStart ? 'range-start' : ''} ${isRangeEnd ? 'range-end' : ''} ${isSingleSelected ? 'single-selected' : ''}" data-day="${prevDay}" data-month="${prevMonth}" data-year="${prevYear}" aria-label="Выбрать ${prevDay} ${monthNames[prevMonth]} ${prevYear}">${prevDay}</button>`;
    }

    // Add days from current month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
      const currentDayDate = new Date(year, month, day);
      let isSelected = false;
      let isRangeStart = false;
      let isRangeEnd = false;
      let isSingleSelected = false;

      // Check if the day is in the selected range
      if (startDate) {
        if (!endDate) {
          isSingleSelected = currentDayDate.getTime() === startDate.getTime();
        } else {
          const start = new Date(startDate);
          const end = new Date(endDate);
          const rangeStart = start < end ? start : end;
          const rangeEnd = start < end ? end : start;
          isSelected = currentDayDate >= rangeStart && currentDayDate <= rangeEnd;
          isRangeStart = currentDayDate.getTime() === rangeStart.getTime();
          isRangeEnd = currentDayDate.getTime() === rangeEnd.getTime();
        }
      }

      daysContainer.innerHTML += `<button type="button" class="${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${isRangeStart ? 'range-start' : ''} ${isRangeEnd ? 'range-end' : ''} ${isSingleSelected ? 'single-selected' : ''}" data-day="${day}" data-month="${month}" data-year="${year}" aria-label="Выбрать ${day} ${monthNames[month]} ${year}">${day}</button>`;
    }

    // Calculate rows needed (5 or 6)
    const totalDaysRendered = firstDay + daysInMonth;
    const totalCells = Math.ceil(totalDaysRendered / 7) * 7;
    const daysToAdd = totalCells - totalDaysRendered;

    // Add days from next month
    for (let day = 1; day <= daysToAdd; day++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const currentDayDate = new Date(nextYear, nextMonth, day);
      let isSelected = false;
      let isRangeStart = false;
      let isRangeEnd = false;
      let isSingleSelected = false;

      // Check if the day is in the selected range
      if (startDate) {
        if (!endDate) {
          isSingleSelected = currentDayDate.getTime() === startDate.getTime();
        } else {
          const start = new Date(startDate);
          const end = new Date(endDate);
          const rangeStart = start < end ? start : end;
          const rangeEnd = start < end ? end : start;
          isSelected = currentDayDate >= rangeStart && currentDayDate <= rangeEnd;
          isRangeStart = currentDayDate.getTime() === rangeStart.getTime();
          isRangeEnd = currentDayDate.getTime() === rangeEnd.getTime();
        }
      }

      daysContainer.innerHTML += `<button type="button" class="selected--opacity ${isSelected ? 'selected' : ''} ${isRangeStart ? 'range-start' : ''} ${isRangeEnd ? 'range-end' : ''} ${isSingleSelected ? 'single-selected' : ''}" data-day="${day}" data-month="${nextMonth}" data-year="${nextYear}" aria-label="Выбрать ${day} ${monthNames[nextMonth]} ${nextYear}">${day}</button>`;
    }

    // Add click handlers for all days
    const dayElements = daysContainer.querySelectorAll('button');
    dayElements.forEach(dayEl => {
      // Remove existing listeners to prevent duplicates
      dayEl.removeEventListener('click', handleDayClick);
      dayEl.addEventListener('click', handleDayClick);
    });
  };

  // Centralized click handler
  const handleDayClick = (e) => {
    const day = parseInt(e.target.getAttribute('data-day'));
    const month = parseInt(e.target.getAttribute('data-month'));
    const year = parseInt(e.target.getAttribute('data-year'));
    const clickedDate = new Date(year, month, day);

    if (!startDate) {
      startDate = clickedDate;
      endDate = null;
    } else if (!endDate) {
      endDate = clickedDate;
    } else {
      startDate = clickedDate;
      endDate = null;
    }

    renderCalendar();
  };

  const changeMonth = (delta) => {
    currentDate.setMonth(currentDate.getMonth() + delta);
    renderCalendar();
  };

  prevBtn.addEventListener('click', () => changeMonth(-1));
  nextBtn.addEventListener('click', () => changeMonth(1));

  renderCalendar();
}