// components/reserve-form/reserve-form.js
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
    serviceTypeList: [
      { name: 'WX', value: '家电维修', checked: true },
      { name: 'QX', value: '家电清洗', checked: false },
      { name: 'CZ', value: '家电拆装', checked: false },
    ],
    bookingData: {
      imageId: ''
    },
    myImage: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    formSubmit(e) {
      Object.assign(this.data.bookingData, e.detail.value);
      let data = this.data.bookingData;

      if (!data.fullName || !data.telphone || !data.serviceTime || !data.serviceType) {
        wx.showToast({
          title: '姓名、电话、上门时间为必填项~',
          icon: 'none',
          duration: 2000
        });
        return
      }

      const db = wx.cloud.database();
      db.collection('bookings').add({
        data: data,
        success: res => {
          wx.showToast({
            title: '新增记录成功',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    },

    // 上传图片
    doUpload: function () {
      let self = this;
      // 选择图片
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {

          wx.showLoading({
            title: '上传中',
          })

          const filePath = res.tempFilePaths[0]

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
