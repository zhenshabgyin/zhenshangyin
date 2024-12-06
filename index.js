

(function () {
    const styles = `
            .zhenshangyin-custom-calendar {
                position: absolute;
                background: rgb(255, 255, 255);
                filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.25));
                border-radius: 6px;
                z-index: 9999999999999999999999999999999;
                opacity: 0;
                transition: opacity 0.3s ease, transform 0.3s ease;
                padding: 20px 15px;
                width: 300px;
            }
            .zhenshangyin-custom-calendar * {
                line-height: 1;
            }
            .zhenshangyin-custom-calendar.zhenshangyin-custom-show{
                opacity: 1;
            }
            .zhenshangyin-custom-calendar.zhenshangyin-custom-down {
                transform: translateY(15px);
            }
            .zhenshangyin-custom-calendar.zhenshangyin-custom-up {
                transform: translateY(-15px);
            }
            .zhenshangyin-custom-down::before{
                content: "";
                width: 0px;
                height: 0px;
                border-bottom: 6px solid rgb(255, 255, 255);
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                position: absolute;
                top: -6px;
                left: 50px;
            }
            .zhenshangyin-custom-up::before{
                content: "";
                width: 0px;
                height: 0px;
                border-top: 6px solid rgb(255, 255, 255);
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                position: absolute;
                bottom: -6px;
                left: 50px;
            }
            .zhenshangyin-custom-right::before{
                left: auto;
                right: 50px;
            }
            .zhenshangyin-custom-calendar table {
                width: 100%;
                border-collapse: collapse;
            }
            .zhenshangyin-custom-calendar th,
            .zhenshangyin-custom-calendar td {
                padding: 10px;
                line-height: 1;
                text-align: center;
                cursor: pointer;
                font-size: 12px;
                color: rgb(96, 98, 102);
                border: 2px solid #ffffff;
                border-radius: 10px;
            }
            .zhenshangyin-custom-calendar th {
                font-weight: 500;
                color: rgb(144, 147, 153);
            }
            .zhenshangyin-custom-calendar td:hover {
                background-color: rgb(242, 246, 252);
            }
            .zhenshangyin-custom-calendar td.zhenshangyin-custom-selected {
                background-color: rgb(64, 158, 255);
                color: rgb(255, 255, 255) !important;
            }
            .zhenshangyin-custom-calendar td.zhenshangyin-custom-today {
                color: rgb(64, 158, 255);
                font-weight: bold;
            }
            .zhenshangyin-custom-navigation {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 10px;
                border-bottom: 1px solid #ebeef5;
            }
            .zhenshangyin-custom-navigation button {
                background: none;
                border: none;
                cursor: pointer;
            }
            .zhenshangyin-next-month,
            .zhenshangyin-prev-month{
                margin: 0 15px;
            }
            .zhenshangyin-custom-navigation svg {
                width: 16px;
                height: auto;
                display: block;
            }
            .zhenshangyin-custom-navigation button:hover svg path {
                fill: rgb(64, 158, 255);
            }
            .zhenshangyin-custom-navigation button:hover {
                color: rgb(102, 177, 255);
            }
            .zhenshangyin-current-display {
                font-size: 14px;
                color: rgb(94, 94, 94);
                margin: 0 auto;
            }
            .zhenshangyin-time-picker {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 10px;
                gap: 10px;
            }
            .zhenshangyin-time-dropdown {
                flex: 1;
                position: relative;
            }
            .zhenshangyin-current-tame {
                font-size: 12px;
                color: rgb(0, 0, 0, 0.5);
                margin-right: 10px;
            }
            .zhenshangyin-date-label {
                flex: 1;
                border-radius: 4px;
                text-align: center;
                cursor: pointer;
                line-height: 30px;
                font-size: 12px;
                letter-spacing: 1px;
                border: 1px solid #c1c1c1;
                color: #c1c1c1;
            }
            .zhenshangyin-dropdown-label {
                width: 100%;
                border-radius: 4px;
                text-align: center;
                cursor: pointer;
                line-height: 30px;
                font-size: 12px;
                letter-spacing: 1px;
                border: 1px solid #c1c1c1;
                color: #c1c1c1;
            }
            .zhenshangyin-current-time-btn {
                font-size: 12px;
                color: rgb(64, 158, 255);
                background: transparent;
                border: transparent;
                margin: 0px 10px 0px 20px;
                cursor: pointer;
            }
            .zhenshangyin-confirm-btn {
                width: 50px;
                height: 30px;
                background: rgb(64, 158, 255);
                border: transparent;
                color: rgb(255, 255, 255);
                font-size: 12px;
                border-radius: 2px;
                cursor: pointer;
            }
            .zhenshangyin-scroll-container {
                display: none;
                position: absolute;
                bottom: calc(100% + 5px);
                left: 0;
                width: 100%;
                overflow-y: hidden;
                border: 1px solid #ebeef5;
                border-radius: 4px;
                background-color: white;
                z-index: 1;
                justify-content: space-between;
            }
            .zhenshangyin-scroll-container.open {
                display: flex;
            }
            .zhenshangyin-time-scroll {
                overflow-y: scroll;
                height: 150px;
                width: 50px;
            }
            .zhenshangyin-confirm-confirm{
                width: 100%;
                font-size: 12px;
                color: rgb(64, 158, 255);
                background: transparent;
                border: transparent;
                cursor: pointer;
                border-top: 1px solid #00000012;
                text-align: right;
                padding: 8px 10px;
            }
            .zhenshangyin-time-scroll::-webkit-scrollbar {
                width: 0px;
            }
            .zhenshangyin-scroll-scroll{
                display: flex;
                position: relative;
            }
            .zhenshangyin-scroll-scroll::after {
                content: "";
                width: 95%;
                height: 1px;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: 60px;
                background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%);
            }
            .zhenshangyin-scroll-scroll::before {
                content: "";
                width: 95%;
                height: 1px;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: 60px;
                background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%);
            }
            .zhenshangyin-scroll-item {
                line-height: 30px;
                text-align: center;
                cursor: pointer;
                font-size: 12px;
                color: rgb(0, 0, 0, 0.3);
            }
            .zhenshangyin-scroll-item.selected {
                color: rgb(0, 0, 0);
            }
            .zhenshangyin-scroll-container::-webkit-scrollbar {
                display: none;
            }
            .zhenshangyin-button-container {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
                gap: 10px;
            }
            .zhenshangyin-button-container button {
                flex: 1;
                padding: 5px 10px;
                background-color: rgb(64, 158, 255);
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                position: relative;
                z-index: 5;
            }
            .zhenshangyin-button-container button:hover {
                background-color: rgb(102, 177, 255);
            }
            .zhenshangyin-scroll-item.placeholder {
                height: 30px;
                cursor: default;
                background-color: transparent;
            }
            .zhenshangyin-scroll-item.placeholder:hover {
                background-color: transparent;
            }
            .zhenshangyin-date-range-container {
                display: flex;
                justify-content: space-between;
                gap: 20px;
            }
            .zhenshangyin-year-picker-wrapper,
            .zhenshangyin-date-picker-wrapper {
                flex: 1;
            }
            .zhenshangyin-custom-calendar.date-range-calendar {
                width: 600px;
            }
            .zhenshangyin-custom-calendar.date-range-calendar::after {
                content: "";
                width: 1px;
                height: calc(100% - 80px);
                background: #ebeef580;
                position: absolute;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
            }
            .zhenshangyin-selected-range {
                background-color: rgba(64, 158, 255, 0.2);
                border-radius: 4px;
            }
            .zhenshangyin-month-picker-wrapper {
                flex: 1;
            }
            .zhenshangyin-hover-range {
                background-color: rgba(64, 158, 255, 0.2);
                border-radius: 4px;
            }
            .zhenshengyin-dropdown-multiSelect {
                width: max-content;
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 12px;
                background: rgb(0, 0, 0, 0.1);
                border: 1px solid rgb(0, 0, 0, 0.2);
                line-height: 1;
                padding: 5px;
                color: rgb(0, 0, 0, 0.7);
            }
            .zhenshengyin-dropdown-multiSelect-Button {
                cursor: pointer;
                font-size: 12px;
                color: rgb(0, 0, 0);
            }
            @media (max-width: 768px) {
                .zhenshangyin-custom-calendar{
                    width: 90% !important;
                    left: 5% !important;
                }
                .zhenshangyin-date-range-container{
                    flex-wrap: wrap;
                }
                .zhenshangyin-custom-calendar.date-range-calendar::after,
                .zhenshangyin-custom-up::before,
                .zhenshangyin-custom-down::before{
                    display: none
                }
                .zhenshangyin-custom-calendar.date-range-calendar th, .zhenshangyin-custom-calendar.date-range-calendar td{
                    padding: 5px !important;
                    font-size: 12px;
                }
                .zhenshangyin-custom-calendar.zhenshangyin-custom-show{
                    opacity: 1;
                }
                .zhenshangyin-year-picker-wrapper,
                .zhenshangyin-month-picker-wrapper{
                    flex: inherit !important;
                    width: 100% !important;
                }
                .zhenshangyin-custom-calendar.date-range-calendar .zhenshangyin-month-picker-wrapper th,
                .zhenshangyin-custom-calendar.date-range-calendar .zhenshangyin-month-picker-wrapper td,
                .zhenshangyin-custom-calendar.date-range-calendar .zhenshangyin-year-picker-wrapper th,
                .zhenshangyin-custom-calendar.date-range-calendar .zhenshangyin-year-picker-wrapper td{
                    padding: 10px !important;
                }
            }
        `;
    const styleElement = document.createElement("style");
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
})();

class ZhenshangyinDatePicker {
    constructor(inputSelector, options = {}) {
        this.dateInput = document.querySelector(inputSelector);
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth();
        this.dateFormat = options.dateFormat || 'YYYY-MM-DD';
        this.onDateSelect = options.onDateSelect || function () { };
        this.selectedDate = null;
        this.showTime = this.dateFormat.includes('HH') || this.dateFormat.includes('mm') || this.dateFormat.includes('ss');
        this.selectedTime = { hours: 0, minutes: 0, seconds: 0 };
        this.showButtons = this.showTime;
        this.init();
    }
    init() {
        this.dateInput.addEventListener('click', (event) => {
            event.stopPropagation();
            this.createCalendar();
            this.toggleCalendar();
        });
        document.addEventListener('click', () => {
            if (this.calendar) {
                this.calendar.classList.remove('zhenshangyin-custom-show');
                this.calendar.classList.remove('zhenshangyin-custom-down');
                this.calendar.classList.remove('zhenshangyin-custom-up');
                setTimeout(() => {
                    this.calendar.remove();
                    this.calendar = null;
                }, 300);
            }
        });
    }
    toggleCalendar() {
        const updateCalendarPosition = () => {
            if (this.calendar) {
                const rect = this.dateInput.getBoundingClientRect();
                const rectheight = this.dateInput.offsetHeight;
                const spaceBelow = window.innerHeight - rect.bottom;
                const distanceFromTop = rect.top + window.scrollY;
                const spaceLeft = rect.left;
                const spaceRight = window.innerWidth - rect.right;
                this.calendar.classList.add('zhenshangyin-custom-show');
                const pickerHeight = this.calendar.offsetHeight;
                const pickerWidth = this.calendar.offsetWidth;
                this.calendar.classList.remove('zhenshangyin-custom-down');

                if (spaceBelow < pickerHeight && distanceFromTop < pickerHeight) {
                    this.calendar.style.top = `${distanceFromTop + rectheight}px`;
                    this.calendar.classList.add('zhenshangyin-custom-down');
                    this.calendar.classList.remove('zhenshangyin-custom-up');
                } else if (spaceBelow < pickerHeight) {
                    this.calendar.style.top = `${distanceFromTop - pickerHeight}px`;
                    this.calendar.classList.add('zhenshangyin-custom-up');
                    this.calendar.classList.remove('zhenshangyin-custom-down');
                } else {
                    this.calendar.style.top = `${distanceFromTop + rectheight}px`;
                    this.calendar.classList.add('zhenshangyin-custom-down');
                    this.calendar.classList.remove('zhenshangyin-custom-up');
                }
                if (spaceLeft + pickerWidth <= window.innerWidth) {
                    this.calendar.style.left = `${rect.left + window.scrollX}px`;
                } else if (spaceRight + pickerWidth <= window.innerWidth) {
                    this.calendar.style.left = `${rect.right + window.scrollX - pickerWidth}px`;
                    this.calendar.classList.add('zhenshangyin-custom-right');
                } else {
                    this.calendar.style.left = `${rect.left + window.scrollX}px`;
                }
            }
        };
        window.addEventListener('scroll', updateCalendarPosition);
        window.addEventListener('resize', updateCalendarPosition);
        updateCalendarPosition();
    }
    createCalendar() {
        if (this.calendar) return;
        const calendar = document.createElement('div');
        calendar.className = 'zhenshangyin-custom-calendar';
        calendar.innerHTML = `
                <div class="zhenshangyin-custom-navigation">
                    <button class="zhenshangyin-prev-year"><svg t="1732243173238" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8093"><path d="M129.6 527.5L521 918.9c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.4-24.6 0-33.9L180.5 510.5 552 139c9.4-9.4 9.4-24.6 0-33.9-4.7-4.7-10.8-7-17-7s-12.3 2.3-17 7L129.6 493.6c-9.4 9.3-9.4 24.5 0 33.9z" fill="#AAAAAA" p-id="8094"></path><path d="M464 510.5c0 6.4 2.5 12.5 7 17l391.4 391.4c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.4-24.6 0-33.9L522 510.5 893.5 139c9.4-9.4 9.4-24.6 0-33.9-4.7-4.7-10.8-7-17-7s-12.3 2.3-17 7L471.1 493.6c-4.5 4.5-7.1 10.6-7.1 16.9z" fill="#AAAAAA" p-id="8095"></path></svg></button>
                    <button class="zhenshangyin-prev-month"><svg t="1732243173238" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8093"><path d="M129.6 527.5L521 918.9c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.4-24.6 0-33.9L180.5 510.5 552 139c9.4-9.4 9.4-24.6 0-33.9-4.7-4.7-10.8-7-17-7s-12.3 2.3-17 7L129.6 493.6c-9.4 9.3-9.4 24.5 0 33.9z" fill="#AAAAAA" p-id="8094"></path></svg></button>
                    <span class="zhenshangyin-current-display">${this.currentYear}年 ${this.currentMonth + 1}月</span>
                    <button class="zhenshangyin-next-month"><svg t="1732243152928" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7738"><path d="M896.4 496.5L505 105.1c-9.4-9.4-24.6-9.4-33.9 0-9.4 9.4-9.4 24.6 0 33.9l374.4 374.4L474 885c-9.4 9.4-9.4 24.6 0 33.9 4.7 4.7 10.8 7 17 7s12.3-2.3 17-7l388.5-388.5c9.3-9.3 9.3-24.5-0.1-33.9z" fill="#AAAAAA" p-id="7739"></path></svg></button>
                    <button class="zhenshangyin-next-year"><svg t="1732243152928" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7738"><path d="M896.4 496.5L505 105.1c-9.4-9.4-24.6-9.4-33.9 0-9.4 9.4-9.4 24.6 0 33.9l374.4 374.4L474 885c-9.4 9.4-9.4 24.6 0 33.9 4.7 4.7 10.8 7 17 7s12.3-2.3 17-7l388.5-388.5c9.3-9.3 9.3-24.5-0.1-33.9z" fill="#AAAAAA" p-id="7739"></path><path d="M561.9 513.5c0-6.4-2.5-12.5-7-17L163.5 105.1c-9.4-9.4-24.6-9.4-33.9 0-9.4 9.4-9.4 24.6 0 33.9L504 513.5 132.5 885c-9.4 9.4-9.4 24.6 0 33.9 4.7 4.7 10.8 7 17 7s12.3-2.3 17-7L555 530.4c4.4-4.5 6.9-10.6 6.9-16.9z" fill="#AAAAAA" p-id="7740"></path></svg></button>
                </div>
                <table>
                    <thead style="border-bottom: 1px solid #ebeef5;">
                        <tr>
                            <th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th>
                        </tr>
                    </thead>
                </table>
                <div class="zhenshangyin-table-container">
                    <table>
                        <tbody id="calendar-body"></tbody>
                    </table>
                </div>
                ${this.showTime ? this.createTimePicker() : ''}
            `;
        document.body.appendChild(calendar);
        this.calendar = calendar;
        calendar.addEventListener('click', (event) => {
            event.stopPropagation();
        });
        calendar.querySelector('.zhenshangyin-prev-year').addEventListener('click', () => this.changeYear(-1));
        calendar.querySelector('.zhenshangyin-next-year').addEventListener('click', () => this.changeYear(1));
        calendar.querySelector('.zhenshangyin-prev-month').addEventListener('click', () => this.changeMonth(-1));
        calendar.querySelector('.zhenshangyin-next-month').addEventListener('click', () => this.changeMonth(1));
        if (this.showTime) {
            this.setupTimeDropdowns();
        }
        if (this.showButtons) {
            this.calendar.querySelector('.zhenshangyin-confirm-btn').addEventListener('click', () => {
                if (this.selectedDate) {
                    const formattedDate = this.formatDate(this.currentYear, this.currentMonth, this.selectedDate.getDate());
                    this.dateInput.value = formattedDate;
                    this.calendar.classList.remove('zhenshangyin-custom-show');
                    this.calendar.classList.remove('zhenshangyin-custom-down');
                    this.calendar.classList.remove('zhenshangyin-custom-up');
                    setTimeout(() => {
                        this.calendar.remove();
                        this.calendar = null;
                        this.onDateSelect(formattedDate);
                    }, 300);
                }
            });
            this.calendar.querySelector('.zhenshangyin-current-time-btn').addEventListener('click', () => {
                const now = new Date();
                this.selectedTime.hours = now.getHours();
                this.selectedTime.minutes = now.getMinutes();
                this.selectedTime.seconds = now.getSeconds();
                this.selectedDate = now;
                this.currentYear = now.getFullYear();
                this.currentMonth = now.getMonth();
                this.updateCalendar();
                const formattedDate = this.formatDate(this.currentYear, this.currentMonth, now.getDate());
                this.dateInput.value = formattedDate;
                this.calendar.querySelector('.zhenshangyin-dropdown-label').textContent = this.formatTime();
                this.onDateSelect(formattedDate);
            });
        }
        this.updateCalendar();
    }
    createTimePicker() {
        return `
                <div class="zhenshangyin-time-picker">
                    <div class="zhenshangyin-current-tame">时间</div>
                    <div class="zhenshangyin-time-dropdown" id="zhenshangyin-time-dropdown">
                        <div class="zhenshangyin-dropdown-label">${this.formatTime()}</div>
                        <div class="zhenshangyin-scroll-container" style="display: none;">
                            <div class="zhenshangyin-scroll-scroll">
                                <div class="zhenshangyin-time-scroll" id="hours-scroll">
                                    ${this.createPlaceholder()}
                                    ${Array.from({ length: 24 }, (_, i) => `<div class="zhenshangyin-scroll-item${i === 0 ? ' selected' : ''}">${String(i).padStart(2, '0')}</div>`).join('')}
                                    ${this.createPlaceholder()}
                                </div>
                                <div class="zhenshangyin-time-scroll" id="minutes-scroll">
                                    ${this.createPlaceholder()}
                                    ${Array.from({ length: 60 }, (_, i) => `<div class="zhenshangyin-scroll-item${i === 0 ? ' selected' : ''}">${String(i).padStart(2, '0')}</div>`).join('')}
                                    ${this.createPlaceholder()}
                                </div>
                                <div class="zhenshangyin-time-scroll" id="seconds-scroll">
                                    ${this.createPlaceholder()}
                                    ${Array.from({ length: 60 }, (_, i) => `<div class="zhenshangyin-scroll-item${i === 0 ? ' selected' : ''}">${String(i).padStart(2, '0')}</div>`).join('')}
                                    ${this.createPlaceholder()}
                                </div>
                            </div>
                            <button class="zhenshangyin-confirm-confirm">确认</button>
                        </div>
                    </div>
                    <button class="zhenshangyin-current-time-btn">此刻</button>
                    <button class="zhenshangyin-confirm-btn">确认</button>
                </div>
            `;
    }
    createPlaceholder() {
        return Array.from({ length: 2 }, () => `<div class="zhenshangyin-scroll-item placeholder"></div>`).join('');
    }
    formatTime() {
        return `${String(this.selectedTime.hours).padStart(2, '0')}:${String(this.selectedTime.minutes).padStart(2, '0')}:${String(this.selectedTime.seconds).padStart(2, '0')}`;
    }
    setupTimeDropdowns() {
        const dropdown = this.calendar.querySelector('#zhenshangyin-time-dropdown');
        const scrollContainer = dropdown.querySelector('.zhenshangyin-scroll-container');
        const hoursScroll = scrollContainer.querySelector('#hours-scroll');
        const minutesScroll = scrollContainer.querySelector('#minutes-scroll');
        const secondsScroll = scrollContainer.querySelector('#seconds-scroll');
        const confirm = scrollContainer.querySelector('.zhenshangyin-confirm-confirm');
        dropdown.querySelector('.zhenshangyin-dropdown-label').addEventListener('click', (event) => {
            event.stopPropagation();
            scrollContainer.style.display = scrollContainer.style.display === 'none' ? 'block' : 'none';
            this.centerScroll(hoursScroll, this.selectedTime.hours);
            this.centerScroll(minutesScroll, this.selectedTime.minutes);
            this.centerScroll(secondsScroll, this.selectedTime.seconds);
        });
        confirm.addEventListener('click', (event) => {
            event.stopPropagation();
            scrollContainer.style.display = 'none';
        });
        document.addEventListener('click', (event) => {
            if (!dropdown.contains(event.target)) {
                scrollContainer.style.display = 'none';
            }
        });
        this.setupScroll(hoursScroll, 'hours');
        this.setupScroll(minutesScroll, 'minutes');
        this.setupScroll(secondsScroll, 'seconds');
    }
    centerScroll(scrollElement, value) {
        scrollElement.scrollTop = (value + 2) * 30 - 60;
    }
    setupScroll(scrollElement, timeUnit) {
        const items = scrollElement.querySelectorAll('.zhenshangyin-scroll-item:not(.placeholder)');
        let scrollTimeout;
        scrollElement.addEventListener('scroll', () => {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const index = Math.round((scrollElement.scrollTop + 60) / 30) - 2;
                this.selectedTime[timeUnit] = index;
                items.forEach((item, i) => {
                    item.classList.toggle('selected', i === index);
                });
                this.calendar.querySelector('.zhenshangyin-dropdown-label').textContent = this.formatTime();
                this.centerScroll(scrollElement, index);
            }, 100);
        });
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.selectedTime[timeUnit] = index;
                this.centerScroll(scrollElement, index);
                this.calendar.querySelector('.zhenshangyin-dropdown-label').textContent = this.formatTime();
            });
        });
    }
    changeYear(direction) {
        this.currentYear += direction;
        this.updateCalendar();
    }
    changeMonth(direction) {
        this.currentMonth += direction;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        } else if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.updateCalendar();
    }
    updateCalendar() {
        const currentMonthYear = this.calendar.querySelector('.zhenshangyin-current-display');
        currentMonthYear.textContent = `${this.currentYear}年 ${this.currentMonth + 1}月`;
        this.populateCalendar(this.currentYear, this.currentMonth);
    }
    formatDate(year, month, day) {
        const date = new Date(year, month, day, this.selectedTime.hours, this.selectedTime.minutes, this.selectedTime.seconds);
        let formattedDate = this.dateFormat
            .replace('YYYY', date.getFullYear())
            .replace('MM', String(date.getMonth() + 1).padStart(2, '0'))
            .replace('DD', String(date.getDate()).padStart(2, '0'))
            .replace('HH', String(date.getHours()).padStart(2, '0'))
            .replace('mm', String(date.getMinutes()).padStart(2, '0'))
            .replace('ss', String(date.getSeconds()).padStart(2, '0'));
        return formattedDate;
    }
    populateCalendar(year, month) {
        const calendarBody = this.calendar.querySelector('#calendar-body');
        calendarBody.innerHTML = '';
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        const today = new Date();
        const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
        let date = 1;
        let nextMonthDate = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (i === 0 && j < firstDay) {
                    const prevMonthDate = daysInPrevMonth - firstDay + j + 1;
                    cell.innerHTML = prevMonthDate;
                    cell.style.opacity = '0.5';
                    cell.addEventListener('click', () => {
                        this.highlightDate(prevMonthDate, month === 0 ? 11 : month - 1, month === 0 ? year - 1 : year);
                    });
                } else if (date > daysInMonth) {
                    cell.innerHTML = nextMonthDate;
                    cell.style.opacity = '0.5';
                    const currentNextMonthDate = nextMonthDate;
                    cell.addEventListener('click', () => {
                        this.highlightDate(currentNextMonthDate, month === 11 ? 0 : month + 1, month === 11 ? year + 1 : year);
                    });
                    nextMonthDate++;
                } else {
                    cell.innerHTML = date;
                    if (isCurrentMonth && date === today.getDate()) {
                        cell.classList.add('zhenshangyin-custom-today');
                    }
                    if (this.selectedDate && this.selectedDate.getDate() === date && this.selectedDate.getMonth() === month && this.selectedDate.getFullYear() === year) {
                        cell.classList.add('zhenshangyin-custom-selected');
                    }
                    const selectedDate = date;
                    cell.addEventListener('click', () => {
                        this.highlightDate(selectedDate, month, year);
                    });
                    date++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }
    }
    highlightDate(day, month, year) {
        this.selectedDate = new Date(year, month, day);
        this.currentYear = year;
        this.currentMonth = month;
        this.calendar.querySelectorAll('td').forEach(td => td.classList.remove('zhenshangyin-custom-selected'));
        const selectedCell = Array.from(this.calendar.querySelectorAll('td')).find(td => parseInt(td.textContent, 10) === day && !td.style.opacity);
        if (selectedCell) {
            selectedCell.classList.add('zhenshangyin-custom-selected');
        }
        const formattedDate = this.formatDate(year, month, day);
        this.dateInput.value = formattedDate;
        const currentMonthYear = this.calendar.querySelector('.zhenshangyin-current-display');
        currentMonthYear.textContent = `${this.currentYear}年 ${this.currentMonth + 1}月`;
        if (!this.showTime) {
            this.calendar.classList.remove('zhenshangyin-custom-show');
            this.calendar.classList.remove('zhenshangyin-custom-down');
            this.calendar.classList.remove('zhenshangyin-custom-up');
            setTimeout(() => {
                this.calendar.remove();
                this.calendar = null;
                this.onDateSelect(formattedDate);
            }, 300);
        }
    }
}



class ZhenshangyinMonthPicker {
    constructor(inputSelector, options = {}) {
        this.dateInput = document.querySelector(inputSelector);
        this.currentYear = new Date().getFullYear();
        this.selectedMonths = []; // Store objects with year and month
        this.dateFormat = options.dateFormat || 'YYYY-MM';
        this.onMonthSelect = options.onMonthSelect || function () { };
        this.multiSelect = options.multiSelect || false;
        this.init();
    }
    init() {
        this.dateInput.addEventListener('click', (event) => {
            event.stopPropagation();
            this.createMonthPicker();
            this.togglePicker();
        });
        document.addEventListener('click', () => {
            if (this.picker) {
                this.picker.classList.remove('zhenshangyin-custom-show');
                this.picker.classList.remove('zhenshangyin-custom-down');
                this.picker.classList.remove('zhenshangyin-custom-up');
                setTimeout(() => {
                    this.picker.remove();
                    this.picker = null;
                }, 300);
            }
        });
    }
    togglePicker() {
        const updateCalendarPosition = () => {
            if (this.picker) {
                const rect = this.dateInput.getBoundingClientRect();
                const rectheight = this.dateInput.offsetHeight;
                const spaceBelow = window.innerHeight - rect.bottom;
                const distanceFromTop = rect.top + window.scrollY;
                const spaceLeft = rect.left;
                const spaceRight = window.innerWidth - rect.right;
                this.picker.classList.add('zhenshangyin-custom-show');
                const pickerHeight = this.picker.offsetHeight;
                const pickerWidth = this.picker.offsetWidth;
                this.picker.classList.remove('zhenshangyin-custom-down');
                if (spaceBelow < pickerHeight && distanceFromTop < pickerHeight) {
                    this.picker.style.top = `${distanceFromTop + rectheight}px`;
                    this.picker.classList.add('zhenshangyin-custom-down');
                    this.picker.classList.remove('zhenshangyin-custom-up');
                } else if (spaceBelow < pickerHeight) {
                    this.picker.style.top = `${distanceFromTop - pickerHeight}px`;
                    this.picker.classList.add('zhenshangyin-custom-up');
                    this.picker.classList.remove('zhenshangyin-custom-down');
                } else {
                    this.picker.style.top = `${distanceFromTop + rectheight}px`;
                    this.picker.classList.add('zhenshangyin-custom-down');
                    this.picker.classList.remove('zhenshangyin-custom-up');
                }
                if (spaceLeft + pickerWidth <= window.innerWidth) {
                    this.picker.style.left = `${rect.left + window.scrollX}px`;
                } else if (spaceRight + pickerWidth <= window.innerWidth) {
                    this.picker.style.left = `${rect.right + window.scrollX - pickerWidth}px`;
                    this.picker.classList.add('zhenshangyin-custom-right');
                } else {
                    this.picker.style.left = `${rect.left + window.scrollX}px`;
                }
            }
        };
        window.addEventListener('scroll', updateCalendarPosition);
        window.addEventListener('resize', updateCalendarPosition);
        updateCalendarPosition();
    }
    createMonthPicker() {
        if (this.picker) return;
        const picker = document.createElement('div');
        picker.className = 'zhenshangyin-custom-calendar';
        picker.innerHTML = `
                <div class="zhenshangyin-custom-navigation">
                    <button class="zhenshangyin-prev-year"><svg t="1732243173238" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8093"><path d="M129.6 527.5L521 918.9c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.4-24.6 0-33.9L180.5 510.5 552 139c9.4-9.4 9.4-24.6 0-33.9-4.7-4.7-10.8-7-17-7s-12.3 2.3-17 7L129.6 493.6c-9.4 9.3-9.4 24.5 0 33.9z" fill="#AAAAAA" p-id="8094"></path><path d="M464 510.5c0 6.4 2.5 12.5 7 17l391.4 391.4c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.4-24.6 0-33.9L522 510.5 893.5 139c9.4-9.4 9.4-24.6 0-33.9-4.7-4.7-10.8-7-17-7s-12.3 2.3-17 7L471.1 493.6c-4.5 4.5-7.1 10.6-7.1 16.9z" fill="#AAAAAA" p-id="8095"></path></svg></button>
                    <span class="zhenshangyin-current-display">${this.currentYear}</span>
                    <button class="zhenshangyin-next-year"><svg t="1732243152928" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7738"><path d="M896.4 496.5L505 105.1c-9.4-9.4-24.6-9.4-33.9 0-9.4 9.4-9.4 24.6 0 33.9l374.4 374.4L474 885c-9.4 9.4-9.4 24.6 0 33.9 4.7 4.7 10.8 7 17 7s12.3-2.3 17-7l388.5-388.5c9.3-9.3 9.3-24.5-0.1-33.9z" fill="#AAAAAA" p-id="7739"></path><path d="M561.9 513.5c0-6.4-2.5-12.5-7-17L163.5 105.1c-9.4-9.4-24.6-9.4-33.9 0-9.4 9.4-9.4 24.6 0 33.9L504 513.5 132.5 885c-9.4 9.4-9.4 24.6 0 33.9 4.7 4.7 10.8 7 17 7s12.3-2.3 17-7L555 530.4c4.4-4.5 6.9-10.6 6.9-16.9z" fill="#AAAAAA" p-id="7740"></path></svg></button>
                </div>
                <div class="zhenshangyin-table-container">
                    <table>
                        <tbody id="month-picker-body">
                            <tr><td>1月</td><td>2月</td><td>3月</td></tr>
                            <tr><td>4月</td><td>5月</td><td>6月</td></tr>
                            <tr><td>7月</td><td>8月</td><td>9月</td></tr>
                            <tr><td>10月</td><td>11月</td><td>12月</td></tr>
                        </tbody>
                    </table>
                </div>
                ${this.multiSelect ? '<div class="zhenshangyin-button-container"><button class="zhenshangyin-confirm-btn">确认</button></div>' : ''}
            `;
        document.body.appendChild(picker);
        this.picker = picker;
        picker.addEventListener('click', (event) => {
            event.stopPropagation();
        });
        picker.querySelector('.zhenshangyin-prev-year').addEventListener('click', () => this.changeYear(-1));
        picker.querySelector('.zhenshangyin-next-year').addEventListener('click', () => this.changeYear(1));
        if (this.multiSelect) {
            picker.querySelector('.zhenshangyin-confirm-btn').addEventListener('click', () => {
                this.updateInputValue();
                this.picker.classList.remove('zhenshangyin-custom-show');
                this.picker.classList.remove('zhenshangyin-custom-down');
                this.picker.classList.remove('zhenshangyin-custom-up');
                setTimeout(() => {
                    this.picker.remove();
                    this.picker = null;
                }, 300);
            });
        }
        this.populateMonths();
    }
    changeYear(direction) {
        this.currentYear += direction;
        this.picker.querySelector('.zhenshangyin-current-display').textContent = this.currentYear;
        this.populateMonths();
    }
    populateMonths() {
        const monthCells = this.picker.querySelectorAll('#month-picker-body td');
        monthCells.forEach(cell => cell.classList.remove('zhenshangyin-custom-selected'));
        monthCells.forEach((cell, index) => {
            const month = index + 1;
            if (this.selectedMonths.some(m => m.year === this.currentYear && m.month === month)) {
                cell.classList.add('zhenshangyin-custom-selected');
            }
            const newCell = cell.cloneNode(true);
            cell.replaceWith(newCell);
            newCell.addEventListener('click', () => {
                if (this.multiSelect) {
                    this.toggleMonthSelection(month);
                } else {
                    this.selectSingleMonth(month);
                }
            });
        });
    }
    toggleMonthSelection(month) {
        const existingIndex = this.selectedMonths.findIndex(m => m.year === this.currentYear && m.month === month);
        if (existingIndex > -1) {
            this.selectedMonths.splice(existingIndex, 1);
        } else {
            this.selectedMonths.push({ year: this.currentYear, month });
        }
        this.populateMonths();
    }
    selectSingleMonth(month) {
        this.selectedMonths = [{ year: this.currentYear, month }];
        this.updateInputValue();
        this.picker.classList.remove('zhenshangyin-custom-show');
        this.picker.classList.remove('zhenshangyin-custom-down');
        this.picker.classList.remove('zhenshangyin-custom-up');
        setTimeout(() => {
            this.picker.remove();
            this.picker = null;
        }, 300);
    }
    updateInputValue() {
        const formattedMonths = this.selectedMonths
            .map(m => this.formatMonth(m.year, m.month))
            .join(', ');
        this.dateInput.value = formattedMonths;
        this.onMonthSelect(formattedMonths);
    }
    formatMonth(year, month) {
        return this.dateFormat
            .replace('YYYY', year)
            .replace('MM', String(month).padStart(2, '0'));
    }
}



class ZhenshangyinYearPicker {
    constructor(inputSelector, options = {}) {
        this.dateInput = document.querySelector(inputSelector);
        this.currentYear = new Date().getFullYear();
        this.selectedYears = []; // Store selected years
        this.onYearSelect = options.onYearSelect || function () { };
        this.multiSelect = options.multiSelect || false; // New option for multi-select
        this.init();
    }
    init() {
        this.dateInput.addEventListener('click', (event) => {
            event.stopPropagation();
            this.createYearPicker();
            this.togglePicker();
        });
        document.addEventListener('click', () => {
            if (this.picker) {
                this.picker.classList.remove('zhenshangyin-custom-show');
                this.picker.classList.remove('zhenshangyin-custom-down');
                this.picker.classList.remove('zhenshangyin-custom-up');
                setTimeout(() => {
                    this.picker.remove();
                    this.picker = null;
                }, 300);
            }
        });
    }
    togglePicker() {
        const updateCalendarPosition = () => {
            if (this.picker) {
                const rect = this.dateInput.getBoundingClientRect();
                const rectheight = this.dateInput.offsetHeight;
                const spaceBelow = window.innerHeight - rect.bottom;
                const distanceFromTop = rect.top + window.scrollY;
                const spaceLeft = rect.left;
                const spaceRight = window.innerWidth - rect.right;
                this.picker.classList.add('zhenshangyin-custom-show');
                const pickerHeight = this.picker.offsetHeight;
                const pickerWidth = this.picker.offsetWidth;
                this.picker.classList.remove('zhenshangyin-custom-down');
                if (spaceBelow < pickerHeight && distanceFromTop < pickerHeight) {
                    this.picker.style.top = `${distanceFromTop + rectheight}px`;
                    this.picker.classList.add('zhenshangyin-custom-down');
                    this.picker.classList.remove('zhenshangyin-custom-up');
                } else if (spaceBelow < pickerHeight) {
                    this.picker.style.top = `${distanceFromTop - pickerHeight}px`;
                    this.picker.classList.add('zhenshangyin-custom-up');
                    this.picker.classList.remove('zhenshangyin-custom-down');
                } else {
                    this.picker.style.top = `${distanceFromTop + rectheight}px`;
                    this.picker.classList.add('zhenshangyin-custom-down');
                    this.picker.classList.remove('zhenshangyin-custom-up');
                }
                if (spaceLeft + pickerWidth <= window.innerWidth) {
                    this.picker.style.left = `${rect.left + window.scrollX}px`;
                } else if (spaceRight + pickerWidth <= window.innerWidth) {
                    this.picker.style.left = `${rect.right + window.scrollX - pickerWidth}px`;
                    this.picker.classList.add('zhenshangyin-custom-right');
                } else {
                    this.picker.style.left = `${rect.left + window.scrollX}px`;
                }
            }
        };
        window.addEventListener('scroll', updateCalendarPosition);
        window.addEventListener('resize', updateCalendarPosition);
        updateCalendarPosition();
    }
    createYearPicker() {
        if (this.picker) return;
        const picker = document.createElement('div');
        picker.className = 'zhenshangyin-custom-calendar';
        picker.innerHTML = `
                <div class="zhenshangyin-custom-navigation">
                    <button class="prev-decade"><svg t="1732243173238" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8093"><path d="M129.6 527.5L521 918.9c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.4-24.6 0-33.9L180.5 510.5 552 139c9.4-9.4 9.4-24.6 0-33.9-4.7-4.7-10.8-7-17-7s-12.3 2.3-17 7L129.6 493.6c-9.4 9.3-9.4 24.5 0 33.9z" fill="#AAAAAA" p-id="8094"></path><path d="M464 510.5c0 6.4 2.5 12.5 7 17l391.4 391.4c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.4-24.6 0-33.9L522 510.5 893.5 139c9.4-9.4 9.4-24.6 0-33.9-4.7-4.7-10.8-7-17-7s-12.3 2.3-17 7L471.1 493.6c-4.5 4.5-7.1 10.6-7.1 16.9z" fill="#AAAAAA" p-id="8095"></path></svg></button>
                    <span class="zhenshangyin-current-display">${this.currentYear - 5} - ${this.currentYear + 4}</span>
                    <button class="next-decade"><svg t="1732243152928" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7738"><path d="M896.4 496.5L505 105.1c-9.4-9.4-24.6-9.4-33.9 0-9.4 9.4-9.4 24.6 0 33.9l374.4 374.4L474 885c-9.4 9.4-9.4 24.6 0 33.9 4.7 4.7 10.8 7 17 7s12.3-2.3 17-7l388.5-388.5c9.3-9.3 9.3-24.5-0.1-33.9z" fill="#AAAAAA" p-id="7739"></path><path d="M561.9 513.5c0-6.4-2.5-12.5-7-17L163.5 105.1c-9.4-9.4-24.6-9.4-33.9 0-9.4 9.4-9.4 24.6 0 33.9L504 513.5 132.5 885c-9.4 9.4-9.4 24.6 0 33.9 4.7 4.7 10.8 7 17 7s12.3-2.3 17-7L555 530.4c4.4-4.5 6.9-10.6 6.9-16.9z" fill="#AAAAAA" p-id="7740"></path></svg></button>
                </div>
                <div class="zhenshangyin-table-container">
                    <table>
                        <tbody id="year-picker-body">
                            ${this.generateYearRows()}
                        </tbody>
                    </table>
                </div>
                ${this.multiSelect ? '<div class="zhenshangyin-button-container"><button class="zhenshangyin-confirm-btn">确认</button></div>' : ''}
            `;
        document.body.appendChild(picker);
        this.picker = picker;
        picker.addEventListener('click', (event) => {
            event.stopPropagation();
        });
        picker.querySelector('.prev-decade').addEventListener('click', () => this.changeDecade(-10));
        picker.querySelector('.next-decade').addEventListener('click', () => this.changeDecade(10));
        if (this.multiSelect) {
            picker.querySelector('.zhenshangyin-confirm-btn').addEventListener('click', () => {
                this.updateInputValue();
                this.picker.classList.remove('zhenshangyin-custom-show');
                this.picker.classList.remove('zhenshangyin-custom-down');
                this.picker.classList.remove('zhenshangyin-custom-up');
                setTimeout(() => {
                    this.picker.remove();
                    this.picker = null;
                }, 300);
            });
        }
        this.populateYears();
    }
    changeDecade(offset) {
        this.currentYear += offset;
        this.picker.querySelector('.zhenshangyin-current-display').textContent = `${this.currentYear - 5} - ${this.currentYear + 4}`;
        this.updateYearRows();
    }
    generateYearRows() {
        let rows = '';
        for (let i = 0; i < 4; i++) {
            rows += '<tr>';
            for (let j = 0; j < 3; j++) {
                rows += `<td>${this.currentYear - 5 + i * 3 + j}</td>`;
            }
            rows += '</tr>';
        }
        return rows;
    }
    updateYearRows() {
        const yearBody = this.picker.querySelector('#year-picker-body');
        yearBody.innerHTML = this.generateYearRows();
        this.populateYears();
    }
    populateYears() {
        const yearCells = this.picker.querySelectorAll('#year-picker-body td');
        yearCells.forEach(cell => cell.classList.remove('zhenshangyin-custom-selected'));
        yearCells.forEach((cell) => {
            const year = parseInt(cell.textContent, 10);
            if (this.selectedYears.includes(year)) {
                cell.classList.add('zhenshangyin-custom-selected');
            }
            const newCell = cell.cloneNode(true);
            cell.replaceWith(newCell);
            newCell.addEventListener('click', () => {
                if (this.multiSelect) {
                    this.toggleYearSelection(year);
                } else {
                    this.selectSingleYear(year);
                }
            });
        });
    }
    toggleYearSelection(year) {
        const yearIndex = this.selectedYears.indexOf(year);
        if (yearIndex > -1) {
            this.selectedYears.splice(yearIndex, 1);
        } else {
            this.selectedYears.push(year);
        }
        this.populateYears();
    }
    selectSingleYear(year) {
        this.selectedYears = [year];
        this.updateInputValue();
        this.picker.classList.remove('zhenshangyin-custom-show');
        this.picker.classList.remove('zhenshangyin-custom-down');
        this.picker.classList.remove('zhenshangyin-custom-up');
        setTimeout(() => {
            this.picker.remove();
            this.picker = null;
        }, 300);
    }
    updateInputValue() {
        const formattedYears = this.selectedYears.join(', ');
        this.dateInput.value = formattedYears;
        this.onYearSelect(formattedYears);
    }
}



class ZhenshangyinDateRangePicker {
    constructor(inputSelector, options = {}) {
        this.dateInput = document.querySelector(inputSelector);
        this.startDate = null;
        this.endDate = null;
        this.dateFormat = options.dateFormat || 'YYYY-MM-DD';
        this.onDateRangeSelect = options.onDateRangeSelect || function () { };
        this.showTime = this.dateFormat.includes('HH') || this.dateFormat.includes('mm') || this.dateFormat.includes('ss');
        const currentDate = new Date();
        this.startYear = currentDate.getFullYear();
        this.startMonth = currentDate.getMonth();
        this.endYear = currentDate.getFullYear();
        this.endMonth = currentDate.getMonth() + 1;
        if (this.endMonth > 11) {
            this.endMonth = 0;
            this.endYear++;
        }
        this.startTime = { hours: 0, minutes: 0, seconds: 0 };
        this.endTime = { hours: 0, minutes: 0, seconds: 0 };
        this.isSelectingStart = true;
        this.separator = options.separator || ' - ';
        this.init();
    }
    init() {
        this.dateInput.addEventListener('click', (event) => {
            event.stopPropagation();
            this.createDateRangePicker();
            this.togglePicker();
            if (this.startDate && this.endDate) {
                this.applyRangeStyle();
            }
        });
        document.addEventListener('click', () => {
            if (this.picker) {
                this.picker.classList.remove('zhenshangyin-custom-show');
                this.picker.classList.remove('zhenshangyin-custom-down');
                this.picker.classList.remove('zhenshangyin-custom-up');
                setTimeout(() => {
                    this.picker.remove();
                    this.picker = null;
                }, 300);
            }
        });
    }
    togglePicker() {
        const updateCalendarPosition = () => {
            if (this.picker) {
                const rect = this.dateInput.getBoundingClientRect();
                const rectheight = this.dateInput.offsetHeight;
                const spaceBelow = window.innerHeight - rect.bottom;
                const distanceFromTop = rect.top + window.scrollY;
                const spaceLeft = rect.left;
                const spaceRight = window.innerWidth - rect.right;
                this.picker.classList.add('zhenshangyin-custom-show');
                const pickerHeight = this.picker.offsetHeight;
                const pickerWidth = this.picker.offsetWidth;
                this.picker.classList.remove('zhenshangyin-custom-down');
                if (spaceBelow < pickerHeight && distanceFromTop < pickerHeight) {
                    this.picker.style.top = `${distanceFromTop + rectheight}px`;
                    this.picker.classList.add('zhenshangyin-custom-down');
                    this.picker.classList.remove('zhenshangyin-custom-up');
                } else if (spaceBelow < pickerHeight && distanceFromTop < pickerHeight) {
                    this.picker.style.top = `${distanceFromTop + rectheight}px`;
                    this.picker.classList.add('zhenshangyin-custom-down');
                    this.picker.classList.remove('zhenshangyin-custom-up');
                } else if (spaceBelow < pickerHeight) {
                    this.picker.style.top = `${distanceFromTop - pickerHeight}px`;
                    this.picker.classList.add('zhenshangyin-custom-up');
                    this.picker.classList.remove('zhenshangyin-custom-down');
                } else {
                    this.picker.style.top = `${distanceFromTop + rectheight}px`;
                    this.picker.classList.add('zhenshangyin-custom-down');
                    this.picker.classList.remove('zhenshangyin-custom-up');
                }
                if (spaceLeft + pickerWidth <= window.innerWidth) {
                    this.picker.style.left = `${rect.left + window.scrollX}px`;
                } else if (spaceRight + pickerWidth <= window.innerWidth) {
                    this.picker.style.left = `${rect.right + window.scrollX - pickerWidth}px`;
                    this.picker.classList.add('zhenshangyin-custom-right');
                } else {
                    this.picker.style.left = `${rect.left + window.scrollX}px`;
                }
            }
        };
        window.addEventListener('scroll', updateCalendarPosition);
        window.addEventListener('resize', updateCalendarPosition);
        updateCalendarPosition();
    }
    createDateRangePicker() {
        if (this.picker) return;
        const picker = document.createElement('div');
        picker.className = 'zhenshangyin-custom-calendar date-range-calendar';
        picker.innerHTML = `
                <div class="zhenshangyin-date-range-container">
                    <div class="zhenshangyin-date-picker-wrapper">${this.createDatePicker('start')}</div>
                    <div class="zhenshangyin-date-picker-wrapper">${this.createDatePicker('end')}</div>
                </div>
                <div class="zhenshangyin-button-container">
                    <button class="zhenshangyin-confirm-btn">确认</button>
                </div>
            `;
        document.body.appendChild(picker);
        this.picker = picker;

        picker.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        this.setupDatePickers();
        this.setupButtons();

        if (this.showTime) {
            this.setupTimeDropdowns('start');
            this.setupTimeDropdowns('end');
        }
    }
    createDatePicker(type) {
        const year = type === 'start' ? this.startYear : this.endYear;
        const month = type === 'start' ? this.startMonth : this.endMonth;
        return `
                <div class="zhenshangyin-custom-navigation">
                    <button class="zhenshangyin-prev-year" data-type="${type}">
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path d="M129.6 527.5L521 918.9c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.4-24.6 0-33.9L180.5 510.5 552 139c9.4-9.4 9.4-24.6 0-33.9-4.7-4.7-10.8-7-17-7s-12.3 2.3-17 7L129.6 493.6c-9.4 9.3-9.4 24.5 0 33.9z" fill="#AAAAAA"></path>
                            <path d="M464 510.5c0 6.4 2.5 12.5 7 17l391.4 391.4c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.4-24.6 0-33.9L522 510.5 893.5 139c9.4-9.4 9.4-24.6 0-33.9-4.7-4.7-10.8-7-17-7s-12.3 2.3-17 7L471.1 493.6c-4.5 4.5-7.1 10.6-7.1 16.9z" fill="#AAAAAA"></path>
                        </svg>
                    </button>
                    <button class="zhenshangyin-prev-month" data-type="${type}">
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path d="M129.6 527.5L521 918.9c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.4-24.6 0-33.9L180.5 510.5 552 139c9.4-9.4 9.4-24.6 0-33.9-4.7-4.7-10.8-7-17-7s-12.3 2.3-17 7L129.6 493.6c-9.4 9.3-9.4 24.5 0 33.9z" fill="#AAAAAA"></path>
                        </svg>
                    </button>
                    <span class="zhenshangyin-current-display" data-type="${type}">${year}年 ${month + 1}月</span>
                    <button class="zhenshangyin-next-month" data-type="${type}">
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path d="M896.4 496.5L505 105.1c-9.4-9.4-24.6-9.4-33.9 0-9.4 9.4-9.4 24.6 0 33.9l374.4 374.4L474 885c-9.4 9.4-9.4 24.6 0 33.9 4.7 4.7 10.8 7 17 7s12.3-2.3 17-7l388.5-388.5c9.3-9.3 9.3-24.5-0.1-33.9z" fill="#AAAAAA"></path>
                        </svg>
                    </button>
                    <button class="zhenshangyin-next-year" data-type="${type}">
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path d="M896.4 496.5L505 105.1c-9.4-9.4-24.6-9.4-33.9 0-9.4 9.4-9.4 24.6 0 33.9l374.4 374.4L474 885c-9.4 9.4-9.4 24.6 0 33.9 4.7 4.7 10.8 7 17 7s12.3-2.3 17-7l388.5-388.5c9.3-9.3 9.3-24.5-0.1-33.9z" fill="#AAAAAA"></path>
                            <path d="M561.9 513.5c0-6.4-2.5-12.5-7-17L163.5 105.1c-9.4-9.4-24.6-9.4-33.9 0-9.4 9.4-9.4 24.6 0 33.9L504 513.5 132.5 885c-9.4 9.4-9.4 24.6 0 33.9 4.7 4.7 10.8 7 17 7s12.3-2.3 17-7L555 530.4c4.4-4.5 6.9-10.6 6.9-16.9z" fill="#AAAAAA"></path>
                        </svg>
                    </button>
                </div>
                <table>
                    <thead style="border-bottom: 1px solid #ebeef5;">
                        <tr>
                            <th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th>
                        </tr>
                    </thead>
                </table>
                <div class="zhenshangyin-table-container">
                    <table>
                        <tbody id="${type}-calendar-body"></tbody>
                    </table>
                </div>
                ${this.showTime ? this.createTimePicker(type) : ''}
            `;
    }
    createTimePicker(type) {
        return `
                <div class="zhenshangyin-time-picker">
                    <div class="zhenshangyin-date-label" data-type="${type}">${this.formatDateOnly(type === 'start' ? this.startDate : this.endDate)}</div>
                    <div class="zhenshangyin-time-dropdown" id="${type}-zhenshangyin-time-dropdown">
                        <div class="zhenshangyin-dropdown-label">${this.formatTime(type)}</div>
                        <div class="zhenshangyin-scroll-container" style="display: none;">
                            <div class="zhenshangyin-scroll-scroll">
                                <div class="zhenshangyin-time-scroll" id="${type}-hours-scroll">
                                    ${this.createPlaceholder()}
                                    ${Array.from({ length: 24 }, (_, i) => `<div class="zhenshangyin-scroll-item${i === 0 ? ' selected' : ''}">${String(i).padStart(2, '0')}</div>`).join('')}
                                    ${this.createPlaceholder()}
                                </div>
                                <div class="zhenshangyin-time-scroll" id="${type}-minutes-scroll">
                                    ${this.createPlaceholder()}
                                    ${Array.from({ length: 60 }, (_, i) => `<div class="zhenshangyin-scroll-item${i === 0 ? ' selected' : ''}">${String(i).padStart(2, '0')}</div>`).join('')}
                                    ${this.createPlaceholder()}
                                </div>
                                <div class="zhenshangyin-time-scroll" id="${type}-seconds-scroll">
                                    ${this.createPlaceholder()}
                                    ${Array.from({ length: 60 }, (_, i) => `<div class="zhenshangyin-scroll-item${i === 0 ? ' selected' : ''}">${String(i).padStart(2, '0')}</div>`).join('')}
                                    ${this.createPlaceholder()}
                                </div>
                            </div>
                            <button class="zhenshangyin-confirm-confirm">确认</button>
                        </div>
                    </div>
                </div>
            `;
    }
    formatDateOnly(date) {
        if (!date) return '未选择日期';
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
    formatTime(type) {
        const time = type === 'start' ? this.startTime : this.endTime;
        return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
    }
    setupTimeDropdowns(type) {
        const dropdown = this.picker.querySelector(`#${type}-zhenshangyin-time-dropdown`);
        if (!dropdown) return;
        const scrollContainer = dropdown.querySelector('.zhenshangyin-scroll-container');
        const hoursScroll = scrollContainer.querySelector(`#${type}-hours-scroll`);
        const minutesScroll = scrollContainer.querySelector(`#${type}-minutes-scroll`);
        const secondsScroll = scrollContainer.querySelector(`#${type}-seconds-scroll`);
        const dropdownLabel = dropdown.querySelector('.zhenshangyin-dropdown-label');
        const confirm = scrollContainer.querySelector('.zhenshangyin-confirm-confirm');
        if (dropdownLabel) {
            dropdownLabel.addEventListener('click', (event) => {
                event.stopPropagation();
                scrollContainer.style.display = scrollContainer.style.display === 'none' ? 'block' : 'none';
                this.centerScroll(hoursScroll, this[type + 'Time'].hours);
                this.centerScroll(minutesScroll, this[type + 'Time'].minutes);
                this.centerScroll(secondsScroll, this[type + 'Time'].seconds);
            });
        }
        confirm.addEventListener('click', (event) => {
            event.stopPropagation();
            scrollContainer.style.display = 'none';
        });
        this.setupScroll(hoursScroll, 'hours', type);
        this.setupScroll(minutesScroll, 'minutes', type);
        this.setupScroll(secondsScroll, 'seconds', type);
    }
    centerScroll(scrollElement, value) {
        scrollElement.scrollTop = (value + 2) * 30 - 60;
    }
    setupScroll(scrollElement, timeUnit, type) {
        const items = scrollElement.querySelectorAll('.zhenshangyin-scroll-item:not(.placeholder)');
        let scrollTimeout;
        scrollElement.addEventListener('scroll', () => {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const index = Math.round((scrollElement.scrollTop + 60) / 30) - 2;
                this[type + 'Time'][timeUnit] = index;
                items.forEach((item, i) => {
                    item.classList.toggle('selected', i === index);
                });
                this.picker.querySelector(`#${type}-zhenshangyin-time-dropdown .zhenshangyin-dropdown-label`).textContent = this.formatTime(type);
                this.centerScroll(scrollElement, index);
            }, 100);
        });
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                this[type + 'Time'][timeUnit] = index;
                this.centerScroll(scrollElement, index);
                this.picker.querySelector(`#${type}-zhenshangyin-time-dropdown .zhenshangyin-dropdown-label`).textContent = this.formatTime(type);
            });
        });
    }
    setupDatePickers() {
        this.setupSingleDatePicker('start');
        this.setupSingleDatePicker('end');
    }
    setupSingleDatePicker(type) {
        const calendarBody = this.picker.querySelector(`#${type}-calendar-body`);
        const year = type === 'start' ? this.startYear : this.endYear;
        const month = type === 'start' ? this.startMonth : this.endMonth;
        this.populateCalendar(calendarBody, year, month, type);
        this.picker.querySelector(`.zhenshangyin-prev-year[data-type="${type}"]`).addEventListener('click', () => this.changeYear(-1, type));
        this.picker.querySelector(`.zhenshangyin-next-year[data-type="${type}"]`).addEventListener('click', () => this.changeYear(1, type));
        this.picker.querySelector(`.zhenshangyin-prev-month[data-type="${type}"]`).addEventListener('click', () => this.changeMonth(-1, type));
        this.picker.querySelector(`.zhenshangyin-next-month[data-type="${type}"]`).addEventListener('click', () => this.changeMonth(1, type));
        calendarBody.addEventListener('mouseover', (event) => {
            if (this.startDate && !this.endDate) {
                const target = event.target;
                if (target.tagName === 'TD' && !target.style.opacity) {
                    const day = parseInt(target.textContent, 10);
                    const hoverDate = new Date(year, month, day);
                    this.applyHoverRangeStyle(hoverDate);
                }
            }
        });
    }
    applyHoverRangeStyle(hoverDate) {
        const start = this.isSelectingStart ? hoverDate : this.startDate;
        const end = this.isSelectingStart ? this.endDate : hoverDate;
        const [rangeStart, rangeEnd] = start < end ? [start, end] : [end, start];
        ['start', 'end'].forEach(type => {
            const year = type === 'start' ? this.startYear : this.endYear;
            const month = type === 'start' ? this.startMonth : this.endMonth;
            const calendarBody = this.picker.querySelector(`#${type}-calendar-body`);

            Array.from(calendarBody.querySelectorAll('td')).forEach(td => {
                const day = parseInt(td.textContent, 10);
                const date = new Date(year, month, day);

                td.classList.remove('zhenshangyin-hover-range');
                if (date >= rangeStart && date <= rangeEnd && !td.style.opacity) {
                    td.classList.add('zhenshangyin-hover-range');
                }
            });
        });
    }
    changeYear(direction, type) {
        if (type === 'start') {
            this.startYear += direction;
        } else {
            this.endYear += direction;
        }
        this.updateCalendar(type);
        const calendarBody = this.picker.querySelector(`#${type}-calendar-body`);
        calendarBody.addEventListener('mouseover', (event) => {
            if (this.startDate && !this.endDate) {
                const target = event.target;
                if (target.tagName === 'TD' && !target.style.opacity) {
                    const day = parseInt(target.textContent, 10);
                    const hoverDate = new Date(
                        type === 'start' ? this.startYear : this.endYear,
                        type === 'start' ? this.startMonth : this.endMonth,
                        day
                    );
                    this.applyHoverRangeStyle(hoverDate);
                }
            }
        });
    }
    changeMonth(direction, type) {
        if (type === 'start') {
            this.startMonth += direction;
            if (this.startMonth < 0) {
                this.startMonth = 11;
                this.startYear--;
            } else if (this.startMonth > 11) {
                this.startMonth = 0;
                this.startYear++;
            }
        } else {
            this.endMonth += direction;
            if (this.endMonth < 0) {
                this.endMonth = 11;
                this.endYear--;
            } else if (this.endMonth > 11) {
                this.endMonth = 0;
                this.endYear++;
            }
        }
        this.updateCalendar(type);
        const calendarBody = this.picker.querySelector(`#${type}-calendar-body`);
        calendarBody.addEventListener('mouseover', (event) => {
            if (this.startDate && !this.endDate) {
                const target = event.target;
                if (target.tagName === 'TD' && !target.style.opacity) {
                    const day = parseInt(target.textContent, 10);
                    const hoverDate = new Date(type === 'start' ? this.startYear : this.endYear, type === 'start' ? this.startMonth : this.endMonth, day);
                    this.applyHoverRangeStyle(hoverDate);
                }
            }
        });
    }
    updateCalendar(type) {
        const calendarBody = this.picker.querySelector(`#${type}-calendar-body`);
        const year = type === 'start' ? this.startYear : this.endYear;
        const month = type === 'start' ? this.startMonth : this.endMonth;
        this.populateCalendar(calendarBody, year, month, type);
        const display = this.picker.querySelector(`.zhenshangyin-current-display[data-type="${type}"]`);
        if (display) {
            display.textContent = `${year}年 ${month + 1}月`;
        }

        if (this.startDate && this.endDate) {
            this.applyRangeStyle();
        }
    }
    populateCalendar(calendarBody, year, month, type) {
        calendarBody.innerHTML = '';
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        const today = new Date();
        const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
        let date = 1;
        let nextMonthDate = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (i === 0 && j < firstDay) {
                    const prevMonthDate = daysInPrevMonth - firstDay + j + 1;
                    cell.innerHTML = prevMonthDate;
                    cell.style.opacity = '0.5';
                } else if (date > daysInMonth) {
                    cell.innerHTML = nextMonthDate;
                    cell.style.opacity = '0.5';
                    nextMonthDate++;
                } else {
                    cell.innerHTML = date;
                    if (isCurrentMonth && date === today.getDate()) {
                        cell.classList.add('zhenshangyin-custom-today');
                    }
                    const selectedDate = date;
                    cell.addEventListener('click', () => {
                        this.highlightDate(selectedDate, month, year, type);
                    });
                    date++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }
        Array.from(calendarBody.querySelectorAll('td')).forEach(td => {
            td.classList.remove('zhenshangyin-hover-range', 'zhenshangyin-custom-selected', 'zhenshangyin-selected-range');
        });

    }
    highlightDate(day, month, year, type) {
        const selectedDate = new Date(year, month, day);
        if (this.startDate && this.endDate) {
            this.startDate = null;
            this.endDate = null;
            this.isSelectingStart = true;
            this.picker.querySelectorAll('td').forEach(td => td.classList.remove('zhenshangyin-custom-selected', 'zhenshangyin-selected-range'));
        }
        if (this.isSelectingStart) {
            this.startDate = selectedDate;
            this.applySingleSelectionStyle(day, month, year, type);
        } else {
            this.endDate = selectedDate;
        }
        this.isSelectingStart = !this.isSelectingStart;

        if (this.startDate && this.endDate && this.startDate > this.endDate) {
            [this.startDate, this.endDate] = [this.endDate, this.startDate];
        }
        this.updateDateDisplay('start');
        this.updateDateDisplay('end');
        if (this.startDate && this.endDate) {
            this.applyRangeStyle();
        }
    }
    applySingleSelectionStyle(day, month, year, type) {
        const calendarBody = this.picker.querySelector(`#${type}-calendar-body`);
        Array.from(calendarBody.querySelectorAll('td')).forEach(td => {
            const cellDay = parseInt(td.textContent, 10);
            if (cellDay === day && !td.style.opacity) {
                td.classList.add('zhenshangyin-custom-selected');
            }
        });
    }
    updateDateDisplay(type) {
        const dateDisplay = this.formatDateOnly(type === 'start' ? this.startDate : this.endDate);
        const dateLabel = this.picker.querySelector(`.zhenshangyin-date-label[data-type="${type}"]`);
        if (dateLabel) {
            dateLabel.textContent = dateDisplay || '未选择日期';
        }
    }
    applyRangeStyle() {
        if (this.startDate > this.endDate) {
            [this.startDate, this.endDate] = [this.endDate, this.startDate];
        }
        const start = this.startDate;
        const end = this.endDate;
        ['start', 'end'].forEach(type => {
            const calendarBody = this.picker.querySelector(`#${type}-calendar-body`);
            Array.from(calendarBody.querySelectorAll('td')).forEach(td => {
                const day = parseInt(td.textContent, 10);
                const date = new Date(type === 'start' ? this.startYear : this.endYear, type === 'start' ? this.startMonth : this.endMonth, day);

                td.classList.remove('zhenshangyin-custom-selected', 'zhenshangyin-selected-range');

                if (date >= start && date <= end && !td.style.opacity) {
                    if (date.getTime() === start.getTime() || date.getTime() === end.getTime()) {
                        td.classList.add('zhenshangyin-custom-selected');
                    } else {
                        td.classList.add('zhenshangyin-selected-range');
                    }
                }
            });
        });
    }
    setupButtons() {
        this.picker.querySelector('.zhenshangyin-confirm-btn').addEventListener('click', () => {
            if (this.startDate && this.endDate) {
                this.startDate.setHours(this.startTime.hours, this.startTime.minutes, this.startTime.seconds);
                this.endDate.setHours(this.endTime.hours, this.endTime.minutes, this.endTime.seconds);

                const formattedStartDate = this.formatDate(this.startDate);
                const formattedEndDate = this.formatDate(this.endDate);
                const formattedRange = `${formattedStartDate}${this.separator}${formattedEndDate}`; // Use separator
                this.dateInput.value = formattedRange;
                this.picker.classList.remove('zhenshangyin-custom-show');
                this.picker.classList.remove('zhenshangyin-custom-down');
                this.picker.classList.remove('zhenshangyin-custom-up');
                setTimeout(() => {
                    this.picker.remove();
                    this.picker = null;
                    this.onDateRangeSelect(formattedRange);
                }, 300);
            }
        });
    }
    formatDate(date) {
        if (!date) return '未选择日期';
        let formattedDate = this.dateFormat
            .replace('YYYY', date.getFullYear())
            .replace('MM', String(date.getMonth() + 1).padStart(2, '0'))
            .replace('DD', String(date.getDate()).padStart(2, '0'))
            .replace('HH', String(date.getHours()).padStart(2, '0'))
            .replace('mm', String(date.getMinutes()).padStart(2, '0'))
            .replace('ss', String(date.getSeconds()).padStart(2, '0'));
        return formattedDate;
    }
    createPlaceholder() {
        return Array.from({ length: 2 }, () => `<div class="zhenshangyin-scroll-item placeholder"></div>`).join('');
    }
}



class ZhenshangyinMonthRangePicker {
    constructor(inputSelector, options = {}) {
        this.dateInput = document.querySelector(inputSelector);
        this.startMonth = null;
        this.endMonth = null;
        this.currentYear = new Date().getFullYear();
        this.dateFormat = options.dateFormat || 'YYYY-MM';
        this.onMonthRangeSelect = options.onMonthRangeSelect || function () { };
        this.separator = options.separator || ' - ';
        this.isSelectingStart = true;
        this.endYear = this.currentYear + 1;
        this.init();
    }
    init() {
        this.dateInput.addEventListener('click', (event) => {
            event.stopPropagation();
            this.createMonthRangePicker();
            this.togglePicker();
            if (this.startMonth && this.endMonth) {
                this.applyRangeStyle();
            }
        });
        document.addEventListener('click', () => {
            if (this.picker) {
                this.picker.classList.remove('zhenshangyin-custom-show');
                this.picker.classList.remove('zhenshangyin-custom-down');
                this.picker.classList.remove('zhenshangyin-custom-up');
                setTimeout(() => {
                    this.picker.remove();
                    this.picker = null;
                }, 300);
            }
        });
    }
    togglePicker() {
        const updateCalendarPosition = () => {
            if (this.picker) {
                const rect = this.dateInput.getBoundingClientRect();
                const rectheight = this.dateInput.offsetHeight;
                const spaceBelow = window.innerHeight - rect.bottom;
                const distanceFromTop = rect.top + window.scrollY;
                const spaceLeft = rect.left;
                const spaceRight = window.innerWidth - rect.right;
                this.picker.classList.add('zhenshangyin-custom-show');
                const pickerHeight = this.picker.offsetHeight;
                const pickerWidth = this.picker.offsetWidth;
                this.picker.classList.remove('zhenshangyin-custom-down');
                if (spaceBelow < pickerHeight && distanceFromTop < pickerHeight) {
                    this.picker.style.top = `${distanceFromTop + rectheight}px`;
                    this.picker.classList.add('zhenshangyin-custom-down');
                    this.picker.classList.remove('zhenshangyin-custom-up');
                } else if (spaceBelow < pickerHeight) {
                    this.picker.style.top = `${distanceFromTop - pickerHeight}px`;
                    this.picker.classList.add('zhenshangyin-custom-up');
                    this.picker.classList.remove('zhenshangyin-custom-down');
                } else {
                    this.picker.style.top = `${distanceFromTop + rectheight}px`;
                    this.picker.classList.add('zhenshangyin-custom-down');
                    this.picker.classList.remove('zhenshangyin-custom-up');
                }
                if (spaceLeft + pickerWidth <= window.innerWidth) {
                    this.picker.style.left = `${rect.left + window.scrollX}px`;
                } else if (spaceRight + pickerWidth <= window.innerWidth) {
                    this.picker.style.left = `${rect.right + window.scrollX - pickerWidth}px`;
                    this.picker.classList.add('zhenshangyin-custom-right');
                } else {
                    this.picker.style.left = `${rect.left + window.scrollX}px`;
                }
            }
        };
        window.addEventListener('scroll', updateCalendarPosition);
        window.addEventListener('resize', updateCalendarPosition);
        updateCalendarPosition();
    }
    createMonthRangePicker() {
        if (this.picker) return;
        const picker = document.createElement('div');
        picker.className = 'zhenshangyin-custom-calendar date-range-calendar';
        picker.innerHTML = `
                <div class="zhenshangyin-date-range-container">
                    <div class="zhenshangyin-month-picker-wrapper">${this.createMonthPicker('start')}</div>
                    <div class="zhenshangyin-month-picker-wrapper">${this.createMonthPicker('end')}</div>
                </div>
                <div class="zhenshangyin-button-container">
                    <button class="zhenshangyin-confirm-btn">确认</button>
                </div>
            `;
        document.body.appendChild(picker);
        this.picker = picker;
        picker.addEventListener('click', (event) => {
            event.stopPropagation();
        });
        this.setupMonthPickers();
        this.setupButtons();
    }
    createMonthPicker(type) {
        return `
                <div class="zhenshangyin-custom-navigation">
                    <button class="zhenshangyin-prev-year" data-type="${type}">
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path d="M129.6 527.5L521 918.9c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.4-24.6 0-33.9L180.5 510.5 552 139c9.4-9.4 9.4-24.6 0-33.9-4.7-4.7-10.8-7-17-7s-12.3 2.3-17 7L129.6 493.6c-9.4 9.3-9.4 24.5 0 33.9z" fill="#AAAAAA"></path>
                            <path d="M464 510.5c0 6.4 2.5 12.5 7 17l391.4 391.4c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.4-24.6 0-33.9L522 510.5 893.5 139c9.4-9.4 9.4-24.6 0-33.9-4.7-4.7-10.8-7-17-7s-12.3 2.3-17 7L471.1 493.6c-4.5 4.5-7.1 10.6-7.1 16.9z" fill="#AAAAAA"></path>
                        </svg>
                    </button>
                    <span class="zhenshangyin-current-display" data-type="${type}">${type === 'start' ? this.currentYear : this.endYear}</span>
                    <button class="zhenshangyin-next-year" data-type="${type}">
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path d="M896.4 496.5L505 105.1c-9.4-9.4-24.6-9.4-33.9 0-9.4 9.4-9.4 24.6 0 33.9l374.4 374.4L474 885c-9.4 9.4-9.4 24.6 0 33.9 4.7 4.7 10.8 7 17 7s12.3-2.3 17-7l388.5-388.5c9.3-9.3 9.3-24.5-0.1-33.9z" fill="#AAAAAA"></path>
                            <path d="M561.9 513.5c0-6.4-2.5-12.5-7-17L163.5 105.1c-9.4-9.4-24.6-9.4-33.9 0-9.4 9.4-9.4 24.6 0 33.9L504 513.5 132.5 885c-9.4 9.4-9.4 24.6 0 33.9 4.7 4.7 10.8 7 17 7s12.3-2.3 17-7L555 530.4c4.4-4.5 6.9-10.6 6.9-16.9z" fill="#AAAAAA"></path>
                        </svg>
                    </button>
                </div>
                <div class="zhenshangyin-table-container">
                    <table>
                        <tbody id="${type}-month-picker-body">
                            <tr><td>1月</td><td>2月</td><td>3月</td></tr>
                            <tr><td>4月</td><td>5月</td><td>6月</td></tr>
                            <tr><td>7月</td><td>8月</td><td>9月</td></tr>
                            <tr><td>10月</td><td>11月</td><td>12月</td></tr>
                        </tbody>
                    </table>
                </div>
            `;
    }
    setupMonthPickers() {
        this.setupSingleMonthPicker('start');
        this.setupSingleMonthPicker('end');
    }
    setupSingleMonthPicker(type) {
        const monthBody = this.picker.querySelector(`#${type}-month-picker-body`);
        this.populateMonths(monthBody, type);
        this.picker.querySelector(`.zhenshangyin-prev-year[data-type="${type}"]`).addEventListener('click', () => this.changeYear(-1, type));
        this.picker.querySelector(`.zhenshangyin-next-year[data-type="${type}"]`).addEventListener('click', () => this.changeYear(1, type));
        monthBody.addEventListener('mouseover', (event) => {
            if (this.startMonth && !this.endMonth) {
                const target = event.target;
                if (target.tagName === 'TD') {
                    const monthIndex = Array.from(monthBody.querySelectorAll('td')).indexOf(target);
                    const hoverMonth = new Date(type === 'start' ? this.currentYear : this.endYear, monthIndex, 1);
                    this.applyHoverRangeStyle(hoverMonth);
                }
            }
        });
        monthBody.addEventListener('mouseout', (event) => {
            if (this.startMonth && !this.endMonth) {
                this.applyHoverRangeStyle(null);
            }
        });
    }
    applyHoverRangeStyle(hoverMonth) {
        const startDate = this.startMonth;
        const endDate = this.endMonth;
        this.picker.querySelectorAll('td').forEach((cell) => {
            cell.classList.remove('zhenshangyin-custom-selected', 'zhenshangyin-selected-range', 'zhenshangyin-hover-range');
            const year = parseInt(cell.dataset.year, 10);
            const monthIndex = parseInt(cell.dataset.month, 10);
            const cellDate = new Date(year, monthIndex, 1);
            if (startDate && endDate) {
                if (cellDate >= startDate && cellDate <= endDate) {
                    cell.classList.add('zhenshangyin-selected-range');
                    if (cellDate.getTime() === startDate.getTime() || cellDate.getTime() === endDate.getTime()) {
                        cell.classList.add('zhenshangyin-custom-selected');
                    }
                }
            } else if (startDate && !endDate && hoverMonth) {
                const [rangeStart, rangeEnd] = startDate < hoverMonth ? [startDate, hoverMonth] : [hoverMonth, startDate];
                if (cellDate >= rangeStart && cellDate <= rangeEnd) {
                    cell.classList.add('zhenshangyin-hover-range');
                    if (cellDate.getTime() === startDate.getTime()) {
                        cell.classList.add('zhenshangyin-custom-selected');
                    }
                }
            } else if (startDate && !endDate) {
                if (cellDate.getTime() === startDate.getTime()) {
                    cell.classList.add('zhenshangyin-custom-selected');
                }
            }
        });
    }
    populateMonths(monthBody, type) {
        const months = monthBody.querySelectorAll('td');
        const year = type === 'start' ? this.currentYear : this.endYear;
        months.forEach((cell, index) => {
            cell.classList.remove('zhenshangyin-custom-selected', 'zhenshangyin-selected-range', 'zhenshangyin-hover-range');
            cell.replaceWith(cell.cloneNode(true));
            const newCell = monthBody.querySelectorAll('td')[index];
            const month = new Date(year, index, 1);
            newCell.dataset.year = year;
            newCell.dataset.month = index;
            if (this.startMonth && this.endMonth && month >= this.startMonth && month <= this.endMonth) {
                newCell.classList.add(month.getTime() === this.startMonth.getTime() || month.getTime() === this.endMonth.getTime()
                    ? 'zhenshangyin-custom-selected'
                    : 'zhenshangyin-selected-range');
            } else if (this.startMonth && !this.endMonth && month.getTime() === this.startMonth.getTime()) {
                newCell.classList.add('zhenshangyin-custom-selected');
            }
            newCell.addEventListener('click', () => {
                this.highlightMonth(index, type);
            });
        });
    }
    highlightMonth(monthIndex, type) {
        const selectedYear = type === 'start' ? this.currentYear : this.endYear;
        const selectedMonth = new Date(selectedYear, monthIndex, 1);
        if (this.isSelectingStart) {
            this.startMonth = selectedMonth;
            this.endMonth = null;
        } else {
            this.endMonth = selectedMonth;
            if (this.startMonth && this.startMonth > this.endMonth) {
                [this.startMonth, this.endMonth] = [this.endMonth, this.startMonth];
            }
        }
        this.isSelectingStart = !this.isSelectingStart;
        this.applyRangeStyle();
    }
    applyRangeStyle() {
        const startDate = this.startMonth;
        const endDate = this.endMonth;
        this.picker.querySelectorAll('td').forEach((cell) => {
            cell.classList.remove('zhenshangyin-custom-selected', 'zhenshangyin-selected-range');
            const year = parseInt(cell.dataset.year, 10);
            const monthIndex = parseInt(cell.dataset.month, 10);
            const cellDate = new Date(year, monthIndex, 1);
            if (startDate && endDate) {
                if (cellDate >= startDate && cellDate <= endDate) {
                    cell.classList.add('zhenshangyin-selected-range');
                    if (cellDate.getTime() === startDate.getTime() || cellDate.getTime() === endDate.getTime()) {
                        cell.classList.add('zhenshangyin-custom-selected');
                    }
                }
            } else if (startDate && !endDate) {
                if (cellDate.getTime() === startDate.getTime()) {
                    cell.classList.add('zhenshangyin-custom-selected');
                }
            }
        });
    }
    changeYear(direction, type) {
        if (type === 'start') {
            this.currentYear += direction;
        } else {
            this.endYear += direction;
        }
        this.picker.querySelector(`.zhenshangyin-current-display[data-type="${type}"]`).textContent =
            type === 'start' ? this.currentYear : this.endYear;
        const monthBody = this.picker.querySelector(`#${type}-month-picker-body`);
        this.populateMonths(monthBody, type);
        if (this.startMonth && this.endMonth) {
            if (this.startMonth > this.endMonth) {
                [this.startMonth, this.endMonth] = [this.endMonth, this.startMonth];
            }
        }
        this.applyRangeStyle();
    }
    setupButtons() {
        this.picker.querySelector('.zhenshangyin-confirm-btn').addEventListener('click', () => {
            if (this.startMonth && this.endMonth) {
                if (this.startMonth > this.endMonth) {
                    [this.startMonth, this.endMonth] = [this.endMonth, this.startMonth];
                }
                const formattedStartMonth = this.formatMonth(this.startMonth);
                const formattedEndMonth = this.formatMonth(this.endMonth);
                const formattedRange = `${formattedStartMonth}${this.separator}${formattedEndMonth}`;
                this.dateInput.value = formattedRange;
                this.picker.classList.remove('zhenshangyin-custom-show');
                this.picker.classList.remove('zhenshangyin-custom-down');
                this.picker.classList.remove('zhenshangyin-custom-up');
                setTimeout(() => {
                    this.picker.remove();
                    this.picker = null;
                    this.onMonthRangeSelect(formattedRange);
                }, 300);
            }
        });
    }
    formatMonth(date) {
        return this.dateFormat
            .replace('YYYY', date.getFullYear())
            .replace('MM', String(date.getMonth() + 1).padStart(2, '0'));
    }
}


class ZhenshangyinYearRangePicker {
    constructor(inputSelector, options = {}) {
        this.dateInput = document.querySelector(inputSelector);
        this.startYear = null;
        this.endYear = null;
        this.currentYear = new Date().getFullYear();
        this.onYearRangeSelect = options.onYearRangeSelect || function () { };
        this.separator = options.separator || ' - ';
        this.isSelectingStart = true;
        this.init();
    }
    init() {
        this.dateInput.addEventListener('click', (event) => {
            event.stopPropagation();
            this.createYearRangePicker();
            this.togglePicker();
            if (this.startYear && this.endYear) {
                this.applyRangeStyle();
            }
        });
        document.addEventListener('click', () => {
            if (this.picker) {
                this.picker.classList.remove('zhenshangyin-custom-show');
                this.picker.classList.remove('zhenshangyin-custom-down');
                this.picker.classList.remove('zhenshangyin-custom-up');
                setTimeout(() => {
                    this.picker.remove();
                    this.picker = null;
                }, 300);
            }
        });
    }
    togglePicker() {
        const updateCalendarPosition = () => {
            if (this.picker) {
                const rect = this.dateInput.getBoundingClientRect();
                const rectheight = this.dateInput.offsetHeight;
                const spaceBelow = window.innerHeight - rect.bottom;
                const distanceFromTop = rect.top + window.scrollY;
                const spaceLeft = rect.left;
                const spaceRight = window.innerWidth - rect.right;
                this.picker.classList.add('zhenshangyin-custom-show');
                const pickerHeight = this.picker.offsetHeight;
                const pickerWidth = this.picker.offsetWidth;
                this.picker.classList.remove('zhenshangyin-custom-down');
                if (spaceBelow < pickerHeight && distanceFromTop < pickerHeight) {
                    this.picker.style.top = `${distanceFromTop + rectheight}px`;
                    this.picker.classList.add('zhenshangyin-custom-down');
                    this.picker.classList.remove('zhenshangyin-custom-up');
                } else if (spaceBelow < pickerHeight) {
                    this.picker.style.top = `${distanceFromTop - pickerHeight}px`;
                    this.picker.classList.add('zhenshangyin-custom-up');
                    this.picker.classList.remove('zhenshangyin-custom-down');
                } else {
                    this.picker.style.top = `${distanceFromTop + rectheight}px`;
                    this.picker.classList.add('zhenshangyin-custom-down');
                    this.picker.classList.remove('zhenshangyin-custom-up');
                }
                if (spaceLeft + pickerWidth <= window.innerWidth) {
                    this.picker.style.left = `${rect.left + window.scrollX}px`;
                } else if (spaceRight + pickerWidth <= window.innerWidth) {
                    this.picker.style.left = `${rect.right + window.scrollX - pickerWidth}px`;
                    this.picker.classList.add('zhenshangyin-custom-right');
                } else {
                    this.picker.style.left = `${rect.left + window.scrollX}px`;
                }
            }
        };
        window.addEventListener('scroll', updateCalendarPosition);
        window.addEventListener('resize', updateCalendarPosition);
        updateCalendarPosition();
    }
    createYearRangePicker() {
        if (this.picker) return;
        const picker = document.createElement('div');
        picker.className = 'zhenshangyin-custom-calendar date-range-calendar';
        picker.innerHTML = `
                <div class="zhenshangyin-date-range-container">
                    <div class="zhenshangyin-year-picker-wrapper">${this.createYearPicker('start')}</div>
                    <div class="zhenshangyin-year-picker-wrapper">${this.createYearPicker('end')}</div>
                </div>
                <div class="zhenshangyin-button-container">
                    <button class="zhenshangyin-confirm-btn">确认</button>
                </div>
            `;
        document.body.appendChild(picker);
        this.picker = picker;

        picker.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        this.setupYearPickers();
        this.setupButtons();
    }
    createYearPicker(type) {
        const baseYear = type === 'start' ? (this.startYear ? Math.floor(this.startYear / 10) * 10 : this.currentYear - (this.currentYear % 10)) : (this.endYear ? Math.floor(this.endYear / 10) * 10 : this.currentYear + 12 - (this.currentYear % 10));
        return `
                <div class="zhenshangyin-custom-navigation">
                    <button class="prev-decade" data-type="${type}">
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path d="M129.6 527.5L521 918.9c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.4-24.6 0-33.9L180.5 510.5 552 139c9.4-9.4 9.4-24.6 0-33.9-4.7-4.7-10.8-7-17-7s-12.3 2.3-17 7L129.6 493.6c-9.4 9.3-9.4 24.5 0 33.9z" fill="#AAAAAA"></path>
                            <path d="M464 510.5c0 6.4 2.5 12.5 7 17l391.4 391.4c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.4-24.6 0-33.9L522 510.5 893.5 139c9.4-9.4 9.4-24.6 0-33.9-4.7-4.7-10.8-7-17-7s-12.3 2.3-17 7L471.1 493.6c-4.5 4.5-7.1 10.6-7.1 16.9z" fill="#AAAAAA"></path>
                        </svg>
                    </button>
                    <span class="zhenshangyin-current-display" data-type="${type}">${baseYear} - ${baseYear + 11}</span>
                    <button class="next-decade" data-type="${type}">
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path d="M896.4 496.5L505 105.1c-9.4-9.4-24.6-9.4-33.9 0-9.4 9.4-9.4 24.6 0 33.9l374.4 374.4L474 885c-9.4 9.4-9.4 24.6 0 33.9 4.7 4.7 10.8 7 17 7s12.3-2.3 17-7l388.5-388.5c9.3-9.3 9.3-24.5-0.1-33.9z" fill="#AAAAAA"></path>
                            <path d="M561.9 513.5c0-6.4-2.5-12.5-7-17L163.5 105.1c-9.4-9.4-24.6-9.4-33.9 0-9.4 9.4-9.4 24.6 0 33.9L504 513.5 132.5 885c-9.4 9.4-9.4 24.6 0 33.9 4.7 4.7 10.8 7 17 7s12.3-2.3 17-7L555 530.4c4.4-4.5 6.9-10.6 6.9-16.9z" fill="#AAAAAA"></path>
                        </svg>
                    </button>
                </div>
                <div class="zhenshangyin-table-container">
                    <table>
                        <tbody id="${type}-year-picker-body">
                            ${this.generateYearRows(baseYear)}
                        </tbody>
                    </table>
                </div>
            `;
    }
    generateYearRows(baseYear) {
        let rows = '';
        for (let i = 0; i < 4; i++) {
            rows += '<tr>';
            for (let j = 0; j < 3; j++) {
                rows += `<td>${baseYear + i * 3 + j}</td>`;
            }
            rows += '</tr>';
        }
        return rows;
    }
    changeDecade(offset, type) {
        const currentBaseYear = parseInt(this.picker.querySelector(`.zhenshangyin-current-display[data-type="${type}"]`).textContent.split(' - ')[0]);
        const newBaseYear = currentBaseYear + (offset > 0 ? 12 : -12);
        this.updateYearRows(type, newBaseYear);
    }
    updateYearRows(type, baseYear) {
        const yearBody = this.picker.querySelector(`#${type}-year-picker-body`);
        yearBody.innerHTML = this.generateYearRows(baseYear);
        this.picker.querySelector(`.zhenshangyin-current-display[data-type="${type}"]`).textContent = `${baseYear} - ${baseYear + 11}`;
        this.populateYears(yearBody, type);
    }
    setupYearPickers() {
        this.setupSingleYearPicker('start');
        this.setupSingleYearPicker('end');
    }
    setupSingleYearPicker(type) {
        const yearBody = this.picker.querySelector(`#${type}-year-picker-body`);
        this.populateYears(yearBody, type);
        this.picker.querySelector(`.prev-decade[data-type="${type}"]`).addEventListener('click', () => this.changeDecade(-12, type));
        this.picker.querySelector(`.next-decade[data-type="${type}"]`).addEventListener('click', () => this.changeDecade(12, type));
        yearBody.addEventListener('mouseover', (event) => {
            if (this.startYear && !this.endYear) {
                const target = event.target;
                if (target.tagName === 'TD') {
                    const hoverYear = parseInt(target.textContent, 10);
                    this.applyHoverRangeStyle(hoverYear);
                }
            }
        });
    }
    applyHoverRangeStyle(hoverYear) {
        const start = this.isSelectingStart ? hoverYear : this.startYear;
        const end = this.isSelectingStart ? this.endYear : hoverYear;
        const [rangeStart, rangeEnd] = start < end ? [start, end] : [end, start];
        this.picker.querySelectorAll('td').forEach(td => td.classList.remove('zhenshangyin-hover-range'));
        ['start', 'end'].forEach(type => {
            const yearBody = this.picker.querySelector(`#${type}-year-picker-body`);
            Array.from(yearBody.querySelectorAll('td')).forEach(td => {
                const year = parseInt(td.textContent, 10);
                if (year >= rangeStart && year <= rangeEnd) {
                    td.classList.add('zhenshangyin-hover-range');
                }
            });
        });
    }
    populateYears(yearBody, type) {
        const years = yearBody.querySelectorAll('td');
        years.forEach((cell) => {
            cell.classList.remove('zhenshangyin-custom-selected', 'zhenshangyin-selected-range');
            if (this.startYear && this.endYear) {
                const year = parseInt(cell.textContent, 10);
                if (year >= this.startYear && year <= this.endYear) {
                    cell.classList.add('zhenshangyin-selected-range');
                }
            }
            cell.addEventListener('click', () => {
                this.highlightYear(parseInt(cell.textContent, 10), type);
            });
        });
    }
    highlightYear(year, type) {
        if (this.startYear && this.endYear) {
            this.startYear = null;
            this.endYear = null;
            this.isSelectingStart = true;
            this.picker.querySelectorAll('td').forEach(td => td.classList.remove('zhenshangyin-custom-selected', 'zhenshangyin-selected-range'));
        }
        if (this.isSelectingStart) {
            this.startYear = year;
        } else {
            this.endYear = year;
        }
        this.isSelectingStart = !this.isSelectingStart;

        if (this.startYear && this.endYear && this.startYear > this.endYear) {
            [this.startYear, this.endYear] = [this.endYear, this.startYear];
        }
        this.picker.querySelectorAll(`#${type}-year-picker-body td`).forEach(td => td.classList.remove('zhenshangyin-custom-selected', 'zhenshangyin-selected-range'));
        const selectedCell = Array.from(this.picker.querySelectorAll(`#${type}-year-picker-body td`)).find(td => parseInt(td.textContent, 10) === year);
        if (selectedCell) {
            selectedCell.classList.add('zhenshangyin-custom-selected');
        }
        if (this.startYear && this.endYear) {
            this.applyRangeStyle();
        }
    }
    applyRangeStyle() {
        if (this.startYear > this.endYear) {
            [this.startYear, this.endYear] = [this.endYear, this.startYear];
        }
        const start = this.startYear;
        const end = this.endYear;
        ['start', 'end'].forEach(type => {
            const yearBody = this.picker.querySelector(`#${type}-year-picker-body`);
            Array.from(yearBody.querySelectorAll('td')).forEach(td => {
                const year = parseInt(td.textContent, 10);
                td.classList.remove('zhenshangyin-custom-selected', 'zhenshangyin-selected-range');
                if (year >= start && year <= end) {
                    if (year === start || year === end) {
                        td.classList.add('zhenshangyin-custom-selected');
                    } else {
                        td.classList.add('zhenshangyin-selected-range');
                    }
                }
            });
        });
    }
    setupButtons() {
        this.picker.querySelector('.zhenshangyin-confirm-btn').addEventListener('click', () => {
            if (this.startYear && this.endYear) {
                if (this.startYear > this.endYear) {
                    [this.startYear, this.endYear] = [this.endYear, this.startYear];
                }
                const formattedRange = `${this.startYear}${this.separator}${this.endYear}`;
                this.dateInput.value = formattedRange;
                this.picker.classList.remove('zhenshangyin-custom-show');
                this.picker.classList.remove('zhenshangyin-custom-down');
                this.picker.classList.remove('zhenshangyin-custom-up');
                setTimeout(() => {
                    this.picker.remove();
                    this.picker = null;
                    this.onYearRangeSelect(formattedRange);
                }, 300);
            }
        });
    }
}



class ZhenshangyinNotification {
    constructor({ title, message, type = 'info', duration = 2000 }) {
        this.title = title;
        this.message = message;
        this.type = type;
        this.duration = duration;
        this.init();
    }
    init() {
        this.createStyle();
        this.createContainer();
        this.createNotification();
    }
    createStyle() {
        if (!document.getElementById('zhenshangyin-notification-style')) {
            const style = document.createElement('style');
            style.id = 'zhenshangyin-notification-style';
            style.innerHTML = `
                        .zhenshangyin-notification-container {
                            position: fixed;
                            top: 20px;
                            right: 20px;
                            z-index: 9999;
                            width: 300px;
                            overflow: hidden; 
                        }
                        .zhenshangyin-notification {
                            display: flex;
                            align-items: flex-start;
                            margin-top: 15px;
                            padding: 15px;
                            color: #fff;
                            border-radius: 4px;
                            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
                            opacity: 0;
                            transform: translateX(100%);
                            transition: opacity 0.3s ease, transform 0.3s ease;
                        }
                        .zhenshangyin-notification.success {
                            background-color: #67c23a;
                        }
                        .zhenshangyin-notification.warning {
                            background-color: #e6a23c;
                        }
                        .zhenshangyin-notification.info {
                            background-color: #909399;
                        }
                        .zhenshangyin-notification.error {
                            background-color: #f56c6c;
                        }
                        .zhenshangyin-notification.zhenshangyin-notification-show {
                            opacity: 1;
                            transform: translateX(0);
                        }
                        .zhenshangyin-notification.zhenshangyin-notification-hide {
                            opacity: 0;
                            transform: translateX(0px) translateY(-5px); 
                            transition: opacity 0.5s ease, transform 0.5s ease;
                        }
                        .zhenshangyin-notification-subtitle {
                            flex: 1;
                        }
                        .zhenshangyin-notification .zhenshangyin-notification-icon {
                            width: 25px;
                            height: 25px;
                            margin-right: 10px;
                        }
                        .zhenshangyin-notification .zhenshangyin-notification-title {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-weight: bold;
                            line-height: 25px;
                            font-size: 16px;
                        }
                        .zhenshangyin-notification .zhenshangyin-notification-message {
                            flex: 1;
                            margin-top: 5px;
                            font-size: 14px;
                        }
                        .zhenshangyin-notification .zhenshangyin-notification-close {
                            width: 18px;
                            cursor: pointer;
                        }
                    `;
            document.head.appendChild(style);
        }
    }
    createContainer() {
        if (!document.getElementById('zhenshangyin-notification-container')) {
            const container = document.createElement('div');
            container.id = 'zhenshangyin-notification-container';
            container.className = 'zhenshangyin-notification-container';
            document.body.appendChild(container);
        }
    }
    createNotification() {
        const container = document.getElementById('zhenshangyin-notification-container');
        const notification = document.createElement('div');
        notification.className = `zhenshangyin-notification ${this.type}`;
        notification.innerHTML = `
                    <div class="zhenshangyin-notification-icon">${this.getIcon()}</div>
                    <div class="zhenshangyin-notification-subtitle">
                        <div class="zhenshangyin-notification-title">
                            ${this.title}
                            <div class="zhenshangyin-notification-close">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg>
                            </div>
                        </div>
                        <div class="zhenshangyin-notification-message">${this.message}</div>
                    </div>
                `;
        notification.querySelector('.zhenshangyin-notification-close').addEventListener('click', () => {
            this.hideNotification(notification);
        });
        container.appendChild(notification);
        setTimeout(() => notification.classList.add('zhenshangyin-notification-show'), 50);
        if (this.duration) {
            setTimeout(() => this.hideNotification(notification), this.duration);
        }
    }
    getIcon() {
        switch (this.type) {
            case 'error':
                return `<svg class="zhenshangyin-notification-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336z"></path></svg>`;
            case 'warning':
                return `<svg class="zhenshangyin-notification-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344M590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"></path></svg>`;
            case 'info':
                return `<svg class="zhenshangyin-notification-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256m0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4"></path></svg>`;
            case 'success':
                return `<svg class="zhenshangyin-notification-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"></path></svg>`;
            default:
                return '';
        }
    }
    hideNotification(notification) {
        notification.classList.add('zhenshangyin-notification-hide');
        setTimeout(() => notification.remove(), 500);
    }
}



class ZhenshangyinMessage {
    constructor({ message, type = 'info', duration = 2000 }) {
        this.message = message;
        this.type = type;
        this.duration = duration;
        this.init();
    }
    init() {
        this.createStyle();
        this.createContainer();
        this.createMessage();
    }
    createStyle() {
        if (!document.getElementById('message-style')) {
            const style = document.createElement('style');
            style.id = 'zhenshangyin-message-style';
            style.innerHTML = `
                    .zhenshangyin-message-container {
                        position: fixed;
                        top: 20px;
                        left: 50%;
                        transform: translateX(-50%);
                        z-index: 9999;
                        width: auto;
                        max-width: 400px;
                        overflow: hidden; 
                    }
                    .zhenshangyin-message {
                        display: flex;
                        align-items: center;
                        margin-top: 10px;
                        padding: 10px 20px;
                        color: #fff;
                        border-radius: 4px;
                        font-size: 14px;
                        line-height: 1;
                        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
                        opacity: 0;
                        transform: translateY(-100%);
                        transition: opacity 0.3s ease, transform 0.3s ease;
                    }
                    .zhenshangyin-message.success {
                        background-color: #67c23a;
                    }
                    .zhenshangyin-message.warning {
                        background-color: #e6a23c;
                    }
                    .zhenshangyin-message.info {
                        background-color: #909399;
                    }
                    .zhenshangyin-message.error {
                        background-color: #f56c6c;
                    }
                    .zhenshangyin-message.zhenshangyin-message-show {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    .zhenshangyin-message.zhenshangyin-message-hide {
                        opacity: 0;
                        transform: translateY(-20px); 
                        transition: opacity 0.5s ease, transform 0.5s ease;
                    }
                    .zhenshangyin-message-icon {
                        width: 20px;
                        height: 20px;
                        margin-right: 10px;
                    }
                `;
            document.head.appendChild(style);
        }
    }
    createContainer() {
        if (!document.getElementById('zhenshangyin-message-container')) {
            const container = document.createElement('div');
            container.id = 'zhenshangyin-message-container';
            container.className = 'zhenshangyin-message-container';
            document.body.appendChild(container);
        }
    }
    createMessage() {
        const container = document.getElementById('zhenshangyin-message-container');
        const messageElement = document.createElement('div');
        messageElement.className = `zhenshangyin-message ${this.type}`;
        messageElement.innerHTML = `${this.getIcon()} ${this.message}`;

        container.appendChild(messageElement);
        setTimeout(() => messageElement.classList.add('zhenshangyin-message-show'), 50);

        if (this.duration) {
            setTimeout(() => this.hideMessage(messageElement), this.duration);
        }
    }
    getIcon() {
        switch (this.type) {
            case 'error':
                return `<svg class="zhenshangyin-message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336z"></path></svg>`;
            case 'warning':
                return `<svg class="zhenshangyin-message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344M590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"></path></svg>`;
            case 'info':
                return `<svg class="zhenshangyin-message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256m0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4"></path></svg>`;
            case 'success':
                return `<svg class="zhenshangyin-message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"></path></svg>`;
            default:
                return '';
        }
    }
    hideMessage(el) {
        el.classList.add('zhenshangyin-message-hide');
        setTimeout(() => {
            const container = document.getElementById('zhenshangyin-message-container');
            container.removeChild(el);
            if (!container.hasChildNodes()) {
                document.body.removeChild(container);
                const style = document.getElementById('zhenshangyin-message-style');
                if (style) document.head.removeChild(style);
            }
        }, 600);
    }
}


class ZhenshangyinDropdown {
    constructor({
        container,
        data,
        customParams,
        onSelect,
        searchEnabled = false,
        inputSearchEnabled = false,
        defaultSelected = null,
        grouped = false,
        multiSelect = false,
        inputMultiSelect = false,
    }) {
        this.container = document.querySelector(container);
        this.items = data;
        this.customParams = customParams || {};
        this.onSelect = onSelect || (() => { });
        this.searchEnabled = searchEnabled;
        this.inputSearchEnabled = inputSearchEnabled;
        this.defaultSelected = defaultSelected;
        this.grouped = grouped;
        this.multiSelect = multiSelect;
        this.inputMultiSelect = inputMultiSelect;
        this.dropdown = null;
        this.selectedItems = multiSelect ? [] : null;
        this.styleId = `zhenshengyin-dropdown-style-${Math.random().toString(36).substr(2, 9)}`;
        this.init();
    }
    init() {
        this.container.onclick = (event) => this.showDropdown(event);
        if (this.inputSearchEnabled) {
            this.container.addEventListener('input', (e) => this.filterItems(e.target.value));
        }
        if (this.defaultSelected) {
            const flatItems = this.grouped ? this.flattenGroupedItems(this.items) : this.items;
            if (this.multiSelect) {
                this.selectedItems = flatItems.filter(item => this.defaultSelected.includes(item.title));
                this.updateInput();
            } else {
                this.selectedItems = flatItems.find(item => item.title === this.defaultSelected);
                this.container.value = this.selectedItems ? this.selectedItems.title : '';
            }
        }
    }
    flattenGroupedItems(items) {
        return items.reduce((acc, group) => acc.concat(group.children || []), []);
    }
    showDropdown(event) {
        if (this.dropdown) {
            this.dropdown.remove();
            this.removeStyles();
        }
        this.createStyles();
        this.dropdown = document.createElement('div');
        this.dropdown.className = 'zhenshengyin-dropdown';
        if (this.searchEnabled && !this.inputSearchEnabled) {
            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.className = 'zhenshengyin-dropdown-search';
            searchInput.placeholder = '搜索...';
            searchInput.oninput = (e) => this.filterItems(e.target.value);
            this.dropdown.appendChild(searchInput);
        }

        this.dropdown.style.width = `${this.container.offsetWidth}px`;
        if (this.grouped) {
            this.items.forEach(group => this.createGroup(group));
        } else {
            this.createItems(this.items);
        }
        const rect = this.container.getBoundingClientRect();
        const rectHeight = this.container.offsetHeight;
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top + window.scrollY;
        document.body.appendChild(this.dropdown);
        const pickerHeight = this.dropdown.offsetHeight;
        const pickerWidth = this.dropdown.offsetWidth;
        this.dropdown.classList.add('zhenshengyin-dropdown-show');
        if (spaceBelow >= pickerHeight) {
            this.dropdown.classList.add('zhenshengyin-dropdown-down');
            this.dropdown.style.top = `${rect.bottom + window.scrollY}px`;
        } else if (spaceAbove >= pickerHeight) {
            this.dropdown.classList.add('zhenshengyin-dropdown-up');
            this.dropdown.style.top = `${spaceAbove - pickerHeight}px`;
        } else {
            this.dropdown.classList.add('zhenshengyin-dropdown-down');
            this.dropdown.style.top = `${rect.bottom + window.scrollY}px`;
        }
        if (rect.left + pickerWidth <= window.innerWidth) {
            this.dropdown.style.left = `${rect.left + window.scrollX}px`;
        } else if (window.innerWidth - rect.right >= pickerWidth) {
            this.dropdown.style.left = `${rect.right + window.scrollX - pickerWidth}px`;
        } else {
            this.dropdown.style.left = `${rect.left + window.scrollX}px`;
        }
        document.removeEventListener('click', this.removeDropdown.bind(this));
        document.addEventListener('click', this.removeDropdown.bind(this));
    }
    createGroup(group) {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'zhenshengyin-dropdown-group';
        const groupTitle = document.createElement('div');
        groupTitle.className = 'zhenshengyin-dropdown-group-title';
        groupTitle.textContent = group.groupTitle || '分组';
        groupDiv.appendChild(groupTitle);
        this.createItems(group.children, groupDiv);
        this.dropdown.appendChild(groupDiv);
    }
    createItems(items, container = this.dropdown) {
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'zhenshengyin-dropdown-item';
            div.textContent = item.title;
            div.onclick = () => this.selectItem(item);
            container.appendChild(div);
            if (
                (this.multiSelect && this.selectedItems.some(selected => selected.title === item.title)) ||
                (!this.multiSelect && this.selectedItems && this.selectedItems.title === item.title)
            ) {
                div.classList.add(this.multiSelect ? 'zhenshengyin-dropdown-item-selected-multiSelect' : 'zhenshengyin-dropdown-item-selected');
            }
        });
    }
    filterItems(query) {
        if (this.grouped) {
            const filteredGroups = this.items.map(group => {
                const filteredChildren = group.children.filter(item =>
                    item.title.toLowerCase().includes(query.toLowerCase())
                );
                return {
                    ...group,
                    children: filteredChildren,
                };
            }).filter(group => group.children.length > 0);

            this.updateGroupedDropdown(filteredGroups);
        } else {
            const filteredItems = this.items.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase())
            );
            this.updateDropdown(filteredItems);
        }
    }
    updateGroupedDropdown(filteredGroups) {
        const dropdownGroups = this.dropdown.querySelectorAll('.zhenshengyin-dropdown-group');
        dropdownGroups.forEach(group => group.remove());
        filteredGroups.forEach(group => this.createGroup(group));
    }
    updateDropdown(items) {
        const dropdownItems = this.dropdown.querySelectorAll('.zhenshengyin-dropdown-item');
        dropdownItems.forEach(item => item.remove());
        this.createItems(items);
    }
    selectItem(item) {
        if (this.multiSelect) {
            const isSelected = this.selectedItems.some(selected => selected.title === item.title);

            if (isSelected) {
                this.selectedItems = this.selectedItems.filter(selected => selected.title !== item.title);
            } else {
                this.selectedItems.push(item);
            }
            this.updateInput();
            const items = this.dropdown.querySelectorAll('.zhenshengyin-dropdown-item');
            items.forEach(dropdownItem => {
                if (this.selectedItems.some(selected => selected.title === dropdownItem.textContent)) {
                    dropdownItem.classList.add('zhenshengyin-dropdown-item-selected-multiSelect');
                } else {
                    dropdownItem.classList.remove('zhenshengyin-dropdown-item-selected-multiSelect');
                }
            });
        } else {
            this.container.value = item.title;
            const selectedItems = this.dropdown.querySelectorAll('.zhenshengyin-dropdown-item-selected');
            selectedItems.forEach((selectedItem) => {
                selectedItem.classList.remove('zhenshengyin-dropdown-item-selected');
            });
            const selectedItem = [...this.dropdown.children].find(child => child.textContent === item.title);
            if (selectedItem) {
                selectedItem.classList.add('zhenshengyin-dropdown-item-selected');
            }
            this.selectedItems = item;
            this.dropdown.classList.remove('zhenshengyin-dropdown-show');
            this.dropdown.classList.remove('zhenshengyin-dropdown-down');
            this.dropdown.classList.remove('zhenshengyin-dropdown-up');
            setTimeout(() => {
                this.dropdown.remove();
                this.removeStyles();
            }, 300);
        }
        this.onSelect(item);
    }
    updateInput() {
        if (this.inputMultiSelect) {
            this.container.value = this.selectedItems.map(item => item.title).join(', ');
        } else {
            this.container.innerHTML = '';
            this.selectedItems.forEach((item, index) => {
                const itemText = item.title;
                const removeButton = this.createRemoveButton(item);
                const itemElement = document.createElement('div');
                itemElement.classList.add('zhenshengyin-dropdown-multiSelect');
                itemElement.textContent = itemText;
                itemElement.appendChild(removeButton);
                this.container.appendChild(itemElement);
            });
        }
    }
    createRemoveButton(item) {
        const removeButton = document.createElement('div');
        removeButton.classList.add('zhenshengyin-dropdown-multiSelect-Button');
        removeButton.textContent = ' ×';
        removeButton.onclick = (event) => {
            event.stopPropagation();
            this.removeItem(item);
        };
        return removeButton;
    }
    removeItem(item) {
        this.selectedItems = this.selectedItems.filter(selected => selected.title !== item.title);
        this.updateInput();
    }
    removeDropdown(event) {
        if (!this.dropdown.contains(event.target) && event.target !== this.container) {
            this.dropdown.classList.remove('zhenshengyin-dropdown-show');
            this.dropdown.classList.remove('zhenshengyin-dropdown-down');
            this.dropdown.classList.remove('zhenshengyin-dropdown-up');
            setTimeout(() => {
                this.dropdown.remove();
                this.removeStyles();
            }, 300);
        }
    }
    removeStyles() {
        const styleElement = document.getElementById(this.styleId);
        if (styleElement) {
            styleElement.remove();
        }
    }
    createStyles() {
        if (document.getElementById(this.styleId)) {
            return;
        }
        const style = document.createElement('style');
        style.id = this.styleId;
        style.innerHTML = `
                .zhenshengyin-dropdown {
                    position: absolute;
                    border: 1px solid #f0f0f0;
                    background: rgb(255, 255, 255);
                    box-sizing: border-box;
                    z-index: 999999999999999;
                    max-height: 250px;
                    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
                    overflow: auto;
                    opacity: 0;
                    transition: opacity 0.3s ease, transform 0.3s ease;
                }
                .zhenshengyin-dropdown::-webkit-scrollbar {
                    width: 3px;
                }
                .zhenshengyin-dropdown::-webkit-scrollbar-thumb {
                    border-radius: 3px;
                    background: #00000040;
                }
                .zhenshengyin-dropdown::-webkit-scrollbar-track {
                    border-radius: 3px;
                    background: #00000020;
                }
                .zhenshengyin-dropdown.zhenshengyin-dropdown-show {
                    opacity: 1;
                    transition: opacity 0.3s ease, transform 0.3s ease;
                }
                .zhenshengyin-dropdown-up {
                    transform: translateY(-5px);
                }
                .zhenshengyin-dropdown-down {
                    transform: translateY(5px);
                }
                .zhenshengyin-dropdown-item {
                    padding: 10px 15px;
                    font-size: 12px;
                    cursor: pointer;
                    color: #868686;
                    position: relative;
                }
                .zhenshengyin-dropdown-group .zhenshengyin-dropdown-item {
                    padding: 5px 15px;
                }
                .zhenshengyin-dropdown-item:hover {
                    background: #f0f0f0;
                }
                .zhenshengyin-dropdown-item-selected {
                    background: rgb(64, 158, 255) !important;
                    color: #fff;
                }
                .zhenshengyin-dropdown-item-selected-multiSelect {
                    padding-right: 25px;
                    color: rgb(64, 158, 255);
                }
                .zhenshengyin-dropdown-item-selected-multiSelect::after{
                    content: "✔";
                    color: rgb(64, 158, 255);
                    font-size: 12px;
                    position: absolute;
                    top: 50%;
                    right: 15px;
                    transform: translateY(-50%);
                    font-weight: bold;
                    line-height: 1;
                }
                .zhenshengyin-dropdown-search {
                    width: calc(100% - 10px);
                    margin: 5px auto;
                    display: block;
                    height: 36px;
                    border: 1px solid #868686;
                    color: #868686;
                    padding: 0 10px;
                    font-size: 12px;
                }
                .zhenshengyin-dropdown-group{
                    width: 100%;
                    overflow: hidden;
                    border-bottom: 1px solid #00000010;
                    padding-bottom: 5px;
                }
                .zhenshengyin-dropdown-group-title {
                    width: 100%;
                    padding: 10px 10px 5px 10px;
                    font-size: 12px;
                    cursor: pointer;
                    color: #303030;
                }
            `;
        document.head.appendChild(style);
    }
}


