/* 关键字 */
export const keyWord = {
  multiple: 'Multiple',
  /* 多选 */
  picture: 'PICTURE',
  /* 图片 */
  relatedWords: ',' /* 将数组替换成他 */
}

/* 表单支持生成的标签 */
export const formItemType = {
  text: 'text',
  input: 'input',
  select: 'select',
  switch: 'switch',
  selectMultiple: 'select' + keyWord.multiple,
  selectSearchMultiple: 'selectSearch' + keyWord.multiple,
  selectSearch: 'selectSearch',
  radio: 'radio',
  checkbox: 'checkbox' + keyWord.multiple,
  inputNumber: 'inputNumber',
  datePicker: 'datePicker',
  rangeDatePicker: 'rangeDatePicker' + keyWord.multiple,
  upload: 'upload',
  colorPicker: 'colorPicker',
  excelUpload: 'excelUpload',
  textDate: 'textDate',
  datePickerDaterangeGai: 'datePickerDaterangeGai' + keyWord.multiple,
  inputGai: 'SInputGai' + keyWord.multiple
}

export const clickType = {
  default: 'default',
  close: 'close'
}
/* 下拉框配置 */
export const selectConfig = {
  clearable: true,
  filterable: true
}

/* 请求时忽略值 */
export const updateIgnoreKey = ['createTime', 'updateTime']

export const dialogFooterState = {
  common: 'common',
  close: 'close'
}

/* 表格参数 */
export const tableItemType = {
  tabType: {
    selection: 'selection',
    radio: 'radio'
  },
  active: 'active',
  activeType: {
    delete: 'delete',
    detailsDialog: 'detailsDialog',
    dialog: 'Dialog',
    newWin: 'newWin',
    event: 'Event'
  },
  tableView: {
    text: 'text',
    tagState: 'tagState',
    picture: 'picture',
    requestText: 'requestText',
    date: 'date',
    prefixTitle: 'prefixTitle',
    subTitle: 'subTitle',
    colorView: 'colorView',
    pointerColorView: 'pointerColorView',
    jump: 'jump'
  }
}
export const error = (msg) => {
  throw new Error(msg)
}
export const picturePath = (picturePath) => {
  return picturePath
}
