import Toast from '@vant/weapp/toast/toast'
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// Check whether the beginning and end are empty
const beSpaces = (value) => {
  const removeSpaces = /(^\s)|(\s$)/g
  return removeSpaces.test(value)
}
const beSpacesBefore = (value) => {
  const removeSpaces = /(^\s)/g
  return removeSpaces.test(value)
}
// Whether to contain special characters
const isIncludeSchar = (value) => {
  const specialChar = /[`~!@#$^&*()=|{}':;',\[\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]/
  return specialChar.test(value)
}
// 校验条件,是否达到注册账号的标准
const testFormat = (value, name) => {
  if (!value) {
    Toast('请输入' + name)
  } else if (beSpaces(value)) {
    Toast(name + '不能以空格开头或者结尾')
  } else if (isIncludeSchar(value)) {
    Toast(name + '不能包含特殊字符')
  } else {
    return true
  }
}

// 字符串检测提示
const stringTestMsg = (value, name) => {
  if (!value) {
    // 为空字符
    return "请输入" + name
  } else if (beSpaces(value)) {
    return name + "不能以空格开头或者结尾"
  } else if (isIncludeSchar(value)) {
    return name + '不能包含特殊字符'
  } else {
    // 符合规范
    return ""
  }
}
// 校验手机号码是否正确
const phoneFormat = (value, name) => {
  var phone = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
  if (!value) {
    Toast('请输入' + name)
  } else if (beSpaces(value)) {
    Toast(name + '不能以空格开头或者结尾')
  } else if (isIncludeSchar(value)) {
    Toast(name + '不能包含特殊字符')
  } else if (!phone.test(value)) {
    Toast(name + '格式错误')
  } else {
    return true
  }
}
// 校验是否有选择角色
const roleFormat = (value, grade) => {
  if (value === -1) {
    Toast('请选择' + grade + '角色')
  } else {
    return true
  }
}
// 校验下拉框是否有选择(常用)
const selectFormat = (value, msg) => {
  if (value === -1) {
    Toast('请选择' + msg)
  } else {
    return true
  }
}
// 校验是否有上传图片（常用）
const pictureFormat = (array, name) => {
  if (array.length === 0) {
    Toast('请上传' + name)
  } else {
    return true
  }
}
// 判空字符串（常用）
const isEmpty = (value, name) => {
  if (!value) {
    Toast('请输入' + name)
  } else {
    return true
  }
}

// 预览图片
const isImageUrl = (url) => {
  var IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
  return IMAGE_REGEXP.test(url);
}
const isImageFile = (item) => {
  if (item.isImage != null) {
    return item.isImage;
  }
  if (item.type) {
    return item.type === 'image';
  }
  if (item.url) {
    return (0, isImageUrl)(item.url);
  }
  return false;
}

module.exports = {
  formatTime,
  beSpaces,
  isIncludeSchar,
  testFormat,
  stringTestMsg,
  phoneFormat,
  roleFormat,
  pictureFormat,
  selectFormat,
  isEmpty,
  isImageFile,
  beSpacesBefore
}