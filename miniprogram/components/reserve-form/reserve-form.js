// components/reserve-form/reserve-form.js
var dateTimePicker = require('../../tools/date-time-picker.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    dateTimeValue: null,
    dateTimeArray: null,
    serviceTypeList: [{
        name: 'WX',
        value: '家电维修',
        checked: true
      },
      {
        name: 'QX',
        value: '家电清洗',
        checked: false
      },
      {
        name: 'CZ',
        value: '家电拆装',
        checked: false
      },
    ],
    bookingData: {
      imageId: ''
    },
    uploadImage: ''
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      let startY = new Date().getFullYear()
      var obj = dateTimePicker.dateTimePicker(startY, startY + 10);
      this.setData({
        dateTimeValue: obj.dateTime,
        dateTimeArray: obj.dateTimeArray,
      });

    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeDateTime(e) {
      var arr = this.data.dateTimeValue,
        dateArr = this.data.dateTimeArray;
      let serveTime = `${dateArr[0][arr[0]]}-${dateArr[1][arr[1]]}-${dateArr[2][arr[2]]} ${dateArr[3][arr[3]]}:${dateArr[4][arr[4]]}:${dateArr[5][arr[5]]}`
      this.setData({
        dateTimeValue: e.detail.value,
        bookingData: Object.assign(this.data.bookingData, {
          serviceTime: serveTime
        })
      });
    },

    changeDateTimeColumn(e) {
      var arr = this.data.dateTimeValue,
        dateArr = this.data.dateTimeArray;
      arr[e.detail.column] = e.detail.value;
      dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);


      let serveTime = `${dateArr[0][arr[0]]}-${dateArr[1][arr[1]]}-${dateArr[2][arr[2]]} ${dateArr[3][arr[3]]}:${dateArr[4][arr[4]]}:${dateArr[5][arr[5]]}`
      this.setData({
        dateTimeValue: arr,
        dateTimeArray: dateArr,
        bookingData: Object.assign(this.data.bookingData, {
          serviceTime: serveTime
        })
      });
    },

    formSubmit(e) {
      Object.assign(this.data.bookingData, e.detail.value);
      let data = this.data.bookingData;

      if (!data.fullName || !data.telphone || !data.serviceTime || !data.serviceType) {
        wx.showToast({
          title: '姓名、电话、上门时间为必填项~',
          icon: 'none',
          duration: 2500
        });
        return
      }

      let serveTime = new Date(data.serviceTime);
      if (serveTime < Date.now()) {
        wx.showToast({
          title: '上门时间不能在当前时间之前~',
          icon: 'none',
          duration: 2500
        });
        return
      }

      const db = wx.cloud.database();
      db.collection('bookings').add({
        data: data,
        success: res => {
          wx.showToast({
            title: '预约成功',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '预约失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    },



    // 上传图片
    doUpload: function() {
      let self = this;
      // 选择图片
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function(res) {

          wx.showLoading({
            title: '上传中',
          })

          const filePath = res.tempFilePaths[0]
          self.setData({
            uploadImage: filePath
          });

          // 上传图片
          const cloudPath = Date.now() + filePath.match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: res => {
              console.log('[上传文件] 成功：', res)
              wx.showToast({
                title: '上传成功~',
              })

              Object.assign(self.data.bookingData, {
                imageId: res.fileID
              })
            },
            fail: e => {
              console.error('[上传文件] 失败：', e)
              wx.showToast({
                icon: 'none',
                title: '上传失败',
              })
            },
            complete: () => {
              wx.hideLoading()
            }
          })

        },
        fail: e => {
          console.error(e)
        }
      })
    },
  }
})