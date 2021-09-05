/**
 * 各种正则表达式
 * mobile   手机号
 * email    电子邮箱
 * password 密码【6-20位】
 * integer  正整数【不包含0】
 * money    金钱
 * TINumber 纳税识别号
 * IDCard   身份证
 * userName 账户名称【汉字、字母、数字、“-”、“_”的组合】
 * URL      URL
 * TEL      固定电话
 * isEmoji  Emoji表情
 */

// 手机号
export const mobile = /^0?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/

// 座机号
export const cellPhone = /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/
// 电子邮箱
export const email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

// 密码【6-20位】
export const password = /^[@A-Za-z0-9!#$%^&*.~,]{6,20}$/
export const passwords = /^(?=.*?[a-z)(?=.*>[A-Z])(?=.*?[0-9])[a-zA_Z0-9]{6,10}$/

// 正整数【不包含0】
export const integer = /^[1-9]\d*$/

// 正整数【包含0】
export const Integer = /^[0-9]\d*$/

// 金钱
export const money = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/

// 纳税识别号
export const TINumber = /^((\d{6}[0-9A-Z]{9})|([0-9A-Za-z]{2}\d{6}[0-9A-Za-z]{10,12}))$/

// 身份证
export const IDCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/

// 账户名称【汉字、字母、数字、“-”、“_”的组合】
export const userName = /[A-Za-z0-9_\-\u4e00-\u9fa5]$/

// 运单号
export const waybillNo = /^[0-9A-Z]*$/

// URL
export const URL = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/

// 固话
export const TEL = /0\d{2,3}-\d{7,8}/

// Emoji表情
export const isEmoji = /[\ud800-\udbff][\udc00-\udfff]/g
// 银行卡号
export const bankCard = /^\d{16}|\d{19}$/

// 中文字符
export const isChinese = /[\u4E00-\u9FA5]/

// 字母开头
export const letterReg = /^[a-z|A-Z]/

// 端口验证
export const prot = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/

// IP验证
export const IP = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
