
export default {
  // 页面级组件的数据模型，影响传入数据的覆盖机制：private内定义的属性不允许被覆盖
  private: {
    title: 'V2EX',
    currentIndex: 0,
    tabItems: [
      {
        text: '最热',
        icon: ['../Common/Image/icon_home.png', '../Common/Image/icon_home_select.png'],
        show: true
      },
      {
        text: '最新',
        icon: ['../Common/Image/icon_classify.png', '../Common/Image/icon_classify_select.png'],
        show: false
      }
    ]
  },
  changeTabactive (evt) {
    this.changeCurrent(evt.index);
  },
  clickTabBar (index) {
    this.changeCurrent(index);
  },
  changeCurrent(index) {
    // this.$page.setTitleBar({ text: this.tabItems[index].text })
    this.tabItems[index].show = true;
    this.currentIndex = index;
  }
  
}