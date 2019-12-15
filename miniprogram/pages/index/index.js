//index.js
const app = getApp();
const {
  apiUrl
} = app.globalConfig;

Page({
  data: {
    bannerList: [{
        src: '../../images/banner1.jpg'
      },
      {
        src: '../../images/banner2.jpg'
      },
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 2500,
    duration: 500,
    serviceSteps: [{
        title: '1、预约服务',
        desc: '在线预约登记',
        icon: '../../images/icon1.png'
      },
      {
        title: '2、客服派单',
        desc: '工程师与您联系',
        icon: '../../images/icon2.png'
      },
      {
        title: '3、师傅上门',
        desc: '检测具体故障',
        icon: '../../images/icon3.png'
      },
      {
        title: '4、完成服务',
        desc: '开具发票和保修卡',
        icon: '../../images/icon4.png'
      },
    ],
    workerList: [{
      name: '',
      stars: 0,
    }, {
      name: '',
      stars: 0,
    }, {
      name: '',
      stars: 0,
    }]
  },

  onLoad: function() {
    let self = this;
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // wx.cloud.getTempFileURL({
    //   fileList: ['cloud://demo-bchvt.6465-demo-bchvt-1300634251/my-image.png'],
    // }).then((res) => {
    //   this.setData({
    //     myImage: res.fileList[0].tempFileURL
    //   })
    // })



    wx.request({
      url: apiUrl + '/admin/pic/getPics?type=1',
      data: {},
      success(res) {
        if (res.statusCode !== 200) {
          wx.showToast({
            icon: 'none',
            title: '请求失败~'
          })
          return
        }
        let list = res.data.data.list;
        let bannerList = list.map(item => {
          return {
            src: item.imgUrl
          }
        });
        self.setData({
          bannerList
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '请求失败~'
        })
      }
    })
  },

  imageError(e) {
    console.log(e)
  },
})