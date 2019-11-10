//index.js
const app = getApp()

Page({
  data: {
    bannerList: [
      {
        src: '../../images/banner1.jpg'
      },
      {
        src: '../../images/banner2.jpg'
      },
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    serviceTypeList: [
      { name: 'WX', value: '家电维修', checked: 'true' },
      { name: 'QX', value: '家电清洗' },
      { name: 'CZ', value: '家电拆装' },
    ],
    bookingData: {
      imageId: ''
    },
    myImage: ''
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    wx.cloud.getTempFileURL({
      fileList: ['cloud://demo-bchvt.6465-demo-bchvt-1300634251/my-image.png'],
    }).then((res) => {
      this.setData({
        myImage: res.fileList[0].tempFileURL
      })
    })
  },

  imageError(e) {
    console.log(e)
  },

  formSubmit(e) {
    Object.assign(this.data.bookingData, e.detail.value);
    let data = this.data.bookingData;
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
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

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
})
