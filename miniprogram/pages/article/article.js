// miniprogram/pages/article/article.js
const app = getApp();
const {
  apiUrl
} = app.globalConfig;

const contentDef = '<p><span style="font-weight: bold;"><span style="font-size: x-large;">维修场景</span>&nbsp;&nbsp;</span><br></p><p><span style="font-weight: bold;"><br></span></p><p><img src="http://421878.s81i.faiusr.com/2/101/AFEI9t8ZEAIYACDDiPblBSjL9tXGBjDuBTjoAkBl.jpg" style="max-width:100%;"><span style="font-weight: bold;"><br></span></p><p>水管故障维修</p><p><br></p><p><img src="http://421878.s81i.faiusr.com/2/101/AFEI9t8ZEAIYACC-iPblBSiOyIfQBTDuBTjoAkBl.jpg" style="max-width:100%;"><br></p><p>热水器维修</p><p><br></p><p><img src="http://421878.s81i.faiusr.com/2/101/AFEI9t8ZEAIYACDEiPblBSiojYKuAzDuBTjoAkBl.jpg" style="max-width:100%;"><br></p><p>水管维修</p><p><br></p><p><img src="http://421878.s81i.faiusr.com/2/101/AFEI9t8ZEAIYACC7iPblBSjQ7aMwMO4FOOgCQGU.jpg" style="max-width:100%;"><br></p><p>电脑故障检测</p><p><br></p><p><img src="http://421878.s81i.faiusr.com/2/101/AFEI9t8ZEAIYACC9iPblBSiArdiQBDDuBTjoAkBl.jpg" style="max-width:100%;"><br></p><p>电脑维修</p><p><br></p><p><img src="http://421878.s81i.faiusr.com/2/101/AFEI9t8ZEAIYACDBiPblBSjMmMCNBzDuBTjoAkBl.jpg" style="max-width:100%;"><br></p><p>手机维修</p><p><br></p>'
const contentDef2 = '<h1><span style="font-size: x-large;">空调产生异味的原因及解决办法</span></h1><p><span style="color: rgb(238, 236, 224);">2018-11-30 16:00阅读 101&nbsp;&nbsp;</span><br></p><div><p></p><p><span style="font-size: small;">由于全球变暖，夏天也越来越热，人们对空调的依赖也越来越高。生活中我们会发现空调一段时间没有使用就会产生异味，今天小编就来聊聊空调产生异味的原因及处理办法，感兴趣的朋友快来了解一下吧！<br><br>空调产生异味的原因：<br><br>1.空调如果运行了较长时间，空调的滤网以及铜片内部会挤压一定的灰尘，热交换器翅片间也会积满灰尘，在积累到一定的量后就会造成堵塞；产生一定的异味，随着空调开启，空调出风异味就会飘散到空气中。<br><br>2.由于空调在制冷热以后，很多情况下，室内机的内部会有潮气，所以当关闭空调后，没有干燥防霉功能的空调会立刻停机，这样内部的潮气一直存在，长期下来就会产生霉菌，霉味也就自然而然的产生。<br><br>3.长时间不用的空调在启动时也会产生异味，因为热交换盘管、翅片及其周边部件上滞留的凝结水慢慢蒸发，在盘管四周形成适合微生物繁殖的高温度条件，微生物繁殖时产生的大量气体会在空调系统的带动下释放出来，成为恶臭之源。</span></p><p></p></div>'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contnet: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getArticle(options.id);
    if (parseInt(options.id) === 2) {
      this.setData({
        content: contentDef
      })
    } else {
      this.setData({
        content: contentDef2
      })
    }
   
  },

  getArticle (id) {
    let self = this;
    wx.request({
      url: apiUrl + '/admin/article/getArticles?id='+ id,
      data: {},
      success(res) {
        if (res.statusCode !== 200) {
          wx.showToast({
            icon: 'none',
            title: '请求失败~'
          });
          return
        }
        console.log(res.data)
        let content = res.data.data.list[0].content;
        
        self.setData({
          content
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})