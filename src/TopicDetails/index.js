import router from '@system.router'
import api from '../Common/api'
import util from '../util'

export default {
  // 页面级组件的数据模型，影响传入数据的覆盖机制：private内定义的属性不允许被覆盖
  data: {
    title: '',
    id: '',
    details: {},

  },
  onInit () {
    this.$page.setTitleBar({ text: this.title })
  },
  onReady () {
    this.initPageData()
  },
  initPageData() {
    this.getTopicDetails();
  },
  getTopicDetails() {
    var _this = this;
    var id = this.id;
    api.topicDetails(id)
    .then((res)=>{
      var data = res[0] || {};
      if(data.content_rendered){
        data.content_rendered = '<style>img{display:block;width: 100% !important;;}</style><div>' + data.content_rendered + '</div>';
        data.creatDate = util.formatTime(data.created * 1000);
        data.member.avatarUrl = 'https:' + data.member.avatar_normal.replace('s=24&','s=240&');
      }
      _this.details = data;

      console.log(_this.details);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
}