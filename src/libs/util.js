import cookies from './util.cookies';
import log from './util.log';
import db from './util.db';
import axios from 'axios';
import Qs from 'qs';
import date from './date'
import * as reg from './RegExp'
import Setting from '@/setting';

const util = {
    cookies,
    log,
    db,
    reg
};
let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
util.footerHeight = 50;
util.contentHeight = windowHeight - 108;
console.log('windowHeight', windowHeight);

util.imgType = ['jpg', 'png', 'jpeg', 'webp', 'svg', 'bmp', 'gif'];
util.videoType = ['mp4', '3gp', 'rmvb', 'avi'];

util.utf16toEntities = function utf16toEntities (str) {
    if (typeof str !== 'string') {
        return str;
    }
    var patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则

    str = str.replace(patt, function (char) {
        var H, L, code;
        if (char.length === 2) {
            H = char.charCodeAt(0); // 取出高位
            L = char.charCodeAt(1); // 取出低位
            code = (H - 0xd800) * 0x400 + 0x10000 + L - 0xdc00; // 转换算法
            return '&#' + code + ';';
        } else {
            return char;
        }
    });
    return str;
};
// 格式化参数，所有接口提交前都要执行改方法
util.formatParams = function (params) {
    for (var key in params) {
        if (typeof params[key] === 'object') {
            util.formatParams(params[key]);
        } else {
            // params[key] = escape(params[key]);
            // params[key] = params[key].replace(/\%u/g, '\\u');
            params[key] = util.utf16toEntities(params[key]);
        }
    }
};
util.getQueryString = (url, name) => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let r = url.split('?')[1].match(reg);
    if (r != null) return decodeURI(r[2]);
    return '';
};
// 日期格式化
util.formatDate = date.formatDate;
util.getDateDiff = date.getDateDiff;
// 验证正则
util.mobileReg = /^1[3-9]\d{9}$/;
util.cellReg = /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/;
util.emailReg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$');
util.priceReg = /^\d+(\.\d{1,2})?$/; // 金额验证
util.numberReg = /^\d+(\.\d+)?$/; // 非负浮点数
util.numberReg2 = /^\\d+$/; // 正整数
util.isChinese = /[\u4E00-\u9FA5]/ // 中文字符
util.letterReg = /^[a-z|A-Z]/ // 字母开头
// 去除时间后面毫秒
util.removeMS = function (mydate) {
    if (mydate === '') {
        return '';
    }
    let Str = mydate.split('.');
    return Str[0];
};
util.Totime = function timestampToTime (timestamp) {
    var date = new Date(timestamp * 1000);
    let Y = date.getFullYear() + '-';
    let M =
    (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = change(date.getDate()) + ' ';
    let h = change(date.getHours()) + ':';
    let m = change(date.getMinutes()) + ':';
    let s = change(date.getSeconds());
    return Y + M + D + h + m + s;
};
function change (t) {
    if (t < 10) {
        return '0' + t;
    } else {
        return t;
    }
}
/*
 * 判断是否为空对象
 * @param obj 目标对象
 * @return 判断结果 Boolean
 * */
util.isEmptyObject = obj => {
    for (let name in obj) {
        return false;
    }
    return true;
};

function tTitle (title = '') {
    if (window && window.$t) {
        if (title.indexOf('$t:') === 0) {
            return window.$t(title.split('$t:')[1]);
        } else {
            return title;
        }
    } else {
        return title;
    }
}
/*
 * B转KB、MB、GB、TB
 * @param bytes
 * */
util.bytesToSize = bytes => {
    // 防止NaN类型
    if (typeof bytes !== 'number') {
        return bytes;
    }
    if (bytes === 0) return '0 B';
    // eslint-disable-next-line one-var
    var k = 1024, // or 1024
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));

    return (bytes / Math.pow(k, i)).toFixed(2) + sizes[i];
};
/*
 * 获取文件类型
 * @param fileName  文件名称
 * */
util.getFileType = fileName => {
    if (!fileName) {
        console.error('请传入文件名');
        return;
    }
    return fileName
        .split('.')[fileName.split('.').length - 1].toLocaleLowerCase();
};
util.resizeElementH = (params) => {
    console.log()
    let ch = document.documentElement.clientHeight || document.body.clientHeight // 屏幕高度
    let cw = document.documentElement.clientWidth || document.body.clientWidth // 屏幕宽度
    let header = 64 + 24 + 44
    let H = 0
    /* if (typeof params === 'array') {

    } else if (typeof params === 'object') {
        H = params.$el.offsetHeight
    } */
    params.forEach(item => {
        H += item.$el.offsetHeight
    })
    return ch - header - H
}
/**
 * @description 更改标题
 * @param {Object} title 标题
 * @param {Object} count 未读消息数提示（可视情况选择使用或不使用）
 */
util.title = function ({ title, count }) {
    title = tTitle(title);
    let fullTitle = title ? `${title} - ${Setting.titleSuffix}` : Setting.titleSuffix;

    if (count) fullTitle = `(${count}条消息)${fullTitle}`;
    window.document.title = fullTitle;
};

function requestAnimation (task) {
    if ('requestAnimationFrame' in window) {
        return window.requestAnimationFrame(task);
    }

    setTimeout(task, 16);
}

export { requestAnimation };

export default util;
