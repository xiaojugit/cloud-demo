//index.js
const app = getApp();
const { apiUrl } = app.globalConfig;

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
    autoplay: false,
    interval: 2500,
    duration: 500,
    serviceSteps: [
      { title: '1、预约服务', desc: '在线预约登记', icon: '../../images/icon1.png'},
      { title: '2、客服派单', desc: '工程师与您联系', icon: '../../images/icon2.png'},
      { title: '3、师傅上门', desc: '检测具体故障', icon: '../../images/icon3.png'},
      { title: '4、完成服务', desc: '开具发票和保修卡', icon: '../../images/icon4.png'},
    ],
    serviceTypeList: [
      { name: 'WX', value: '家电维修', checked: 'true' },
      { name: 'QX', value: '家电清洗' },
      { name: 'CZ', value: '家电拆装' },
    ]
  },

  onLoad: function() {
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
      // url: apiUrl + '/bannerList.php', 
      url: 'https://cnodejs.org/api/v1/topics',
      data: {},
      success(res) {
        console.log('------------', res.data)
        let bannerList = res.data;
        this.setData({
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
