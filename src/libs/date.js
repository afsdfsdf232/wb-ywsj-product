/*
 * 时间处理方法
 * */
let date = {};
// 格式化日期兼容性调整
date.formatDate = function (date, fmt) {
    if (!date) {
        return '';
    }
    if (!+date) {
        date = date.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, '$1/$2/$3');
        date = date.replace(/(.+)\.0/, '$1');
    }
    return new Date(date).Format(fmt);
};
/*
 * 格式化时间把时间显示 (几分钟/小时/天前)
 * @param dateStr 目标时间
 * @param showM  是否显示月份
 * @param showY 是否显示年份
 * @param showBefore 是否返回 xx后
 * */
date.getDateDiff = function getDateDiff(dateStr, showM, showY, showBefore = true) {
    let publishTime;
    if (+dateStr) {
        publishTime = (new Date(dateStr).getTime()) / 1000;
    } else {
        publishTime = (new Date(this.formatDate(dateStr, 'yyyy/MM/dd hh:mm:ss')).getTime()) / 1000;
    }
    let seconds,
        minutes,
        hours,
        days,
        month,
        year,
        timeNow = parseInt(new Date().getTime() / 1000),
        d,
        afterTime = false,
        date = new Date(publishTime * 1000),
        Y = date.getFullYear(),
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes();

    //小于10的在前面补0
    M = M < 10 ? '0' + M : M;
    D = D < 10 ? '0' + D : D;
    H = H < 10 ? '0' + H : H;
    m = m < 10 ? '0' + m : m;

    d = timeNow - publishTime;
    if (d <= 0 && showBefore) {
        afterTime = true;
        d = d * (-1);
    }
    days = parseInt(d / 86400);
    hours = parseInt(d / 3600);
    minutes = parseInt(d / 60);
    seconds = parseInt(d);
    month = d / (24 * 60 * 60 * 30) >> 0;
    year = d / (24 * 60 * 60 * 365) >> 0;
    if (days === 1) {
        return afterTime ? '明天' : '昨天';
    } else if (days > 1 && days <= 3) {
        return days + (afterTime ? '天后' : '天前');
    } else if (days <= 0 && hours > 0) {
        return hours + (afterTime ? '小时后' : '小时前');
    } else if (hours <= 0 && minutes > 0) {
        return minutes + (afterTime ? '分钟后' : '分钟前');
    } else if (seconds < 60) {
        if (seconds <= 0) {
            return '刚刚';
        } else {
            return seconds + (afterTime ? '秒后' : '秒前');
        }
    } else if (days > 3) {
        if (showY) {
            if (year > 0) {
                return year + '年' + (month % 12 === 0 ? '' : (month % 12 + '月')) + (afterTime ? '后' : '');
            } else {
                if (month > 0) {
                    return month + '月' + (afterTime ? '后' : '');
                } else {
                    return days + '天' + (afterTime ? '后' : '');
                }
            }
        } else if (showM) {
            return month + '月' + (afterTime ? '后' : '');
        } else {
            return Y + '/' + M + '/' + D + ' ' + H + ':' + m;
        }
    }
};
/**
 * 格式化日期
 **/
Date.prototype.Format = function(fmt) {
    var o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'h+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        'S': this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    return fmt;
};

export default date;
