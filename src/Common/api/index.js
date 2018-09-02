import apiRequest from './request'

const API_ROOT = 'http://v2er.leanapp.cn'

const urlList = {
  listHot: '/api/topics/hot.json',
  listLatest: '/api/topics/latest.json',
  topicShow: '/api/topics/show.json',
  repliyShow: '/api/replies/show.json'
}

export default {
  /**
   * 获取最热帖子列表
   */
  hotTopicList() {
    return apiRequest( API_ROOT + urlList.listHot)
  },
  /**
   * 获取最新帖子列表
   */
  latestTopicList() {
    return apiRequest( API_ROOT + urlList.listLatest)
  },
  /**
   * 获取帖子详情
   */
  topicDetails(id) {
    return apiRequest( API_ROOT + urlList.topicShow,{
      params: {
        id: id
      }
    })
  },
  /**
   * 获取回复详情
   */
  repliyDetails(topic_id) {
    return apiRequest( API_ROOT + urlList.repliyShow,{
      params: {
        topic_id: topic_id,
        page: 1,
        page_size: 100
      }
    })
  }
}

