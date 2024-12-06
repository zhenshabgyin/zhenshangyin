document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('successButton').addEventListener('click', function () {
        new ZhenshangyinNotification({ title: '提示', message: '成功了', type: 'success', duration: 2000 });
    });

    document.getElementById('warningButton').addEventListener('click', function () {
        new ZhenshangyinNotification({ title: '提示', message: '出错了', type: 'error', duration: 2000 });
    });

    document.getElementById('infoButton').addEventListener('click', function () {
        new ZhenshangyinNotification({ title: '提示', message: '这是一个警告', type: 'warning', duration: 2000 });
    });

    document.getElementById('errorButton').addEventListener('click', function () {
        new ZhenshangyinNotification({ title: '提示', message: '这是一个信息', type: 'info', duration: 2000 });
    });

    document.getElementById('successButtona').addEventListener('click', function () {
        new ZhenshangyinMessage({ message: '成功了', type: 'success', duration: 2000 });
    });

    document.getElementById('warningButtona').addEventListener('click', function () {
        new ZhenshangyinMessage({ message: '出错了', type: 'error', duration: 2000 });
    });

    document.getElementById('infoButtona').addEventListener('click', function () {
        new ZhenshangyinMessage({ message: '这是一个警告', type: 'warning', duration: 2000 });
    });

    document.getElementById('errorButtona').addEventListener('click', function () {
        new ZhenshangyinMessage({ message: '这是一个信息', type: 'info', duration: 2000 });
    });

    // 初始化日期选择器，用于选择单个日期
    new ZhenshangyinDatePicker('#date-shijian', {
        dateFormat: 'YYYY-MM-DD', // 日期格式
        onDateSelect: (formattedDate) => {
            console.log('Selected Date and Time:', formattedDate);
        }
    });

    // 初始化日期选择器，用于选择带时间的日期
    new ZhenshangyinDatePicker('#date-inputa', {
        dateFormat: 'YYYY-MM-DD HH:mm:ss', // 日期时间格式
        onDateSelect: (formattedDate) => {
            console.log('Selected Date and Time:', formattedDate);
        }
    });

    // 初始化日期范围选择器，用于选择一个日期范围
    new ZhenshangyinDateRangePicker('#date-range-input', {
        dateFormat: 'YYYY/MM/DD', // 日期格式
        separator: '至', // 日期范围的分隔符
        onDateRangeSelect: (formattedRange) => {
            console.log('Selected Date Range:', formattedRange);
        }
    });

    // 初始化日期范围选择器，用于选择带时间的日期范围
    new ZhenshangyinDateRangePicker('#date-range-inputs', {
        dateFormat: 'YYYY-MM-DD HH:mm:ss', // 日期时间格式
        separator: '至', // 日期范围的分隔符
        onDateRangeSelect: (formattedRange) => {
            console.log('Selected Date Range:', formattedRange);
        }
    });

    // 初始化月份选择器，用于选择单个月份
    new ZhenshangyinMonthPicker('#month-input', {
        dateFormat: 'YYYY-MM', // 月份格式
        onMonthSelect: (selectedMonth) => {
            console.log('Selected Month:', selectedMonth);
        }
    });

    // 初始化月份选择器，用于选择多个月份
    new ZhenshangyinMonthPicker('#multi-month-input', {
        dateFormat: 'YYYY-MM', // 月份格式
        multiSelect: true, // 启用多选
        onMonthSelect: (selectedMonths) => {
            console.log('Selected Months:', selectedMonths);
        }
    });

    // 初始化月份范围选择器，用于选择一个月份范围
    new ZhenshangyinMonthRangePicker('#month-range-input', {
        dateFormat: 'YYYY-MM', // 月份格式
        separator: '至', // 月份范围的分隔符
        onMonthRangeSelect: (formattedRange) => {
            console.log('Selected Month Range:', formattedRange);
        }
    });

    // 初始化年份选择器，用于选择单个年份
    new ZhenshangyinYearPicker('#year-input', {
        onYearSelect: (selectedYear) => {
            console.log('Selected Year:', selectedYear);
        }
    });

    // 初始化年份选择器，用于选择多个年份
    new ZhenshangyinYearPicker('#multi-year-input', {
        multiSelect: true, // 启用多选
        onYearSelect: (selectedYears) => {
            console.log('Selected Years:', selectedYears);
        }
    });

    // 初始化年份范围选择器，用于选择一个年份范围
    new ZhenshangyinYearRangePicker('#year-range-input', {
        separator: '至', // 年份范围的分隔符
        onYearRangeSelect: (formattedRange) => {
            console.log('Selected Year Range:', formattedRange);
        }
    });



    new ZhenshangyinDropdown({
        container: '#myInput',
        data: [
            { title: '选项1', param1: '参数1', param2: '参数2' },
            { title: '选项2', param1: '参数3', param2: '参数4' },
            { title: '选项3', param1: '参数5', param2: '参数6' },
            { title: '选项4', param1: '参数1', param2: '参数2' },
            { title: '选项5', param1: '参数3', param2: '参数4' },
            { title: '选项6', param1: '参数5', param2: '参数6' },
            { title: '选项7', param1: '参数1', param2: '参数2' },
            { title: '选项8', param1: '参数3', param2: '参数4' },
            { title: '选项9', param1: '参数5', param2: '参数6' }
        ],
        customParams: {
            自定义参数1: 'param1',
            自定义参数2: 'param2'
        },
        onSelect: function (item) {
            console.log('回调函数被调用，选中的项:', item.title);
        },
        searchEnabled: true,               // 使用额外的搜索框
        inputSearchEnabled: true,          // 开启直接在 input 中搜索
        defaultSelected: '选项4',           // 设置默认选项
    });



    new ZhenshangyinDropdown({
        container: '.asas',  // 主输入框的容器，指定下拉框关联的输入框位置
        data: [
            {
                groupTitle: '分组1',
                children: [
                    { title: '选项1', param1: '参数1', param2: '参数2' },
                    { title: '选项2', param1: '参数3', param2: '参数4' },
                ]
            },
            {
                groupTitle: '分组2',
                children: [
                    { title: '选项3', param1: '参数5', param2: '参数6' },
                    { title: '选项4', param1: '参数7', param2: '参数8' },
                ]
            }
        ],
        customParams: {
            自定义参数1: 'param1',  // 自定义参数1，可以在其他地方使用
            自定义参数2: 'param2',  // 自定义参数2，存储额外信息
        },
        onSelect: function (item) {
            console.log('当前选中的项:', item);  // 输出当前选中的项，通常是对象，包括 `title` 和额外的参数
            const selectedTitles = this.selectedItems.map(selected => selected.title);// 获取所有选中项的标题，返回一个包含标题的数组
            console.log('当前选中的标题:', selectedTitles);  // 输出标题数组
            console.log(selectedTitles.join(', '));  // 将标题拼接为字符串显示
        },
        searchEnabled: true,  // 启用下拉框中的搜索框，允许用户搜索选项
        inputSearchEnabled: false,  // 启用主输入框内直接搜索，允许在输入框中进行实时搜索
        defaultSelected: ['选项4'],  // 默认选中项，支持多选时传入一个包含多个标题的数组，单选时传一个单独的标题字符串
        grouped: true,  // 启用分组功能，将数据分成不同的组进行展示
        multiSelect: true,  // 启用多选功能，允许用户同时选择多个项
    });





    new ZhenshangyinDropdown({
        container: '#asas',  // 主输入框的容器，指定下拉框关联的输入框位置

        data: [
            { title: '选项1', param1: '参数1', param2: '参数2' },
            { title: '选项2', param1: '参数3', param2: '参数4' },
            { title: '选项3', param1: '参数5', param2: '参数6' }
        ],

        customParams: {
            自定义参数1: 'param1',  // 自定义参数1，可以在其他地方使用
            自定义参数2: 'param2',  // 自定义参数2，存储额外信息
        },
        onSelect: function (item) {
            console.log('当前选中的项:', item);  // 输出当前选中的项，通常是对象，包括 `title` 和额外的参数
            const selectedTitles = this.selectedItems.map(selected => selected.title);// 获取所有选中项的标题，返回一个包含标题的数组
            console.log('当前选中的标题:', selectedTitles);  // 输出标题数组
            console.log(selectedTitles.join(', '));  // 将标题拼接为字符串显示
        },
        searchEnabled: true,  // 启用下拉框中的搜索框，允许用户搜索选项
        inputSearchEnabled: true,  // 启用主输入框内直接搜索，允许在输入框中进行实时搜索
        defaultSelected: ['选项4'],  // 默认选中项，支持多选时传入一个包含多个标题的数组，单选时传一个单独的标题字符串
        multiSelect: true,  // 启用多选功能，允许用户同时选择多个项
        inputMultiSelect: true
    });

    function highlightCode(element) {
        let code = element.textContent
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    
        code = code
            .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
            .replace(/(["'`])(.*?[^\\])\1/g, '<span class="string">$1$2$1</span>')
            .replace(/\b(\d+)\b/g, '<span class="number">$1</span>')
            .replace(/\b([a-zA-Z_]\w*)\s*\(/g, '<span class="function">$1</span>(');
    
        element.innerHTML = code;
        element.classList.add("code-highlight");
    }
    
    document.querySelectorAll(".ZhenshangYin").forEach((block) => {
        highlightCode(block);
    });

    document.querySelectorAll(".ZhenshangYin").forEach((block) => {
        const copyButton = document.createElement("div");
        copyButton.classList.add("zhenshangyin-copy-button");
        copyButton.innerText = "复制";
        copyButton.addEventListener("click", () => {
            const range = document.createRange();
            range.selectNode(block);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand("copy");
            window.getSelection().removeAllRanges();
            new ZhenshangyinMessage({ 
                message: '复制成功', 
                type: 'success', 
                duration: 2000 
            });
        });
        block.parentNode.insertBefore(copyButton, block);
    });

});


