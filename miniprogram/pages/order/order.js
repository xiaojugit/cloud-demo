// miniprogram/pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    typeList: [{
        code: 0,
        name: '全部',
        active: true
      },
      {
        code: 1,
        name: '未派单',
        active: false
      },
      {
        code: 2,
        name: '进行中',
        active: false
      },
      {
        code: 3,
        name: '已完成',
        active: false
      },
      {
        code: 4,
        name: '已取消',
        active: false
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.switchOrderTab(options.type);
  },

  tapOrderTab(e) {
    this.switchOrderTab(e.target.dataset.type);
  },

  switchOrderTab(type) {
    this.setData({
      typeList: this.data.typeList.map(item => {
        item.active = false;
        if (parseInt(type) === item.code) {
          item.active = true;
        }
        return item;
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})