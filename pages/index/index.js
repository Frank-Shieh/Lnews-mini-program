//index.js
 
Page({
  data: {
    lastestNews: '',
    newsList: [],
    categories : ['商务', '娱乐', '健康', '科学', '体育', '科技']
  },
  onPullDownRefresh() {
    this.getNews(() => {
      wx.stopPullDownRefresh()
    })
  },
  onLoad: function() {
    this.getNews()
  },
  getNews() {
    wx.request({
      url: 'https://newsapi.org/v2/top-headlines?country=cn&category=business&apiKey=877f47a04bb3499d978b8875bc1ddc91',
      success: res => {
        console.log(res)
        this.setNews(res.data)
      }
    })
  },
  setNews(result) {
    let lastestNews = ''
    lastestNews = {
      title: result.articles[0].title,
      picture: result.articles[0].urlToImage,
      publisher: result.articles[0].source.name,
      time: result.articles[0].publishedAt
    }
    if (lastestNews.picture == null)
      lastestNews.picture = "../../images/news.jpeg"
    let newsList = []
    for (let i = 1; i < result.articles.length; i++) {
      newsList.push({
        id: i,
        author: result.articles[i].author,
        title: result.articles[i].title,
        picture: result.articles[i].urlToImage,
        publisher: result.articles[i].source.name,
        time: result.articles[i].publishedAt,
        url: result.articles[i].url,
        description: result.articles[i].description
      })
      if (newsList[i - 1 ].picture == null)
        newsList[i - 1 ].picture = "../../images/news.jpeg"
    }
    
    this.setData({
      lastestNews: lastestNews,
      newsList: newsList
    })
  },
  readDetail: function(e) {
    console.log(this.data.newsList[parseInt(e.currentTarget.dataset.id)-1].url)
    let str = JSON.stringify(this.data.newsList[parseInt(e.currentTarget.dataset.id) - 1]);
    wx.navigateTo({
      url: '/pages/detail/detail?newsList=' + str,
    })
  }
})