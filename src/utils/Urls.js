export default {
    tencent(keyword) {
        return `http://s.video.qq.com/smartbox?plat=2&ver=0&num=15&otype=json&query=${keyword}`;
    },
    bilibili(keyword) {
        return `http://www.bilibili.com/search?keyword=${keyword}&orderby=&type=comprehensive`;
    },
    aiqiyi(keyword) {
        return `http://suggest.video.iqiyi.com/?key=${keyword}&platform=11&rltnum=15`;
    },
    leshi(keyword) {
        return `http://suggest.letv.cn/suggestion?q=${keyword}&p=pcjs&t=all`;
    },
    youku(keyword) {
        return `http://tip.soku.com/search_tip_1?query=${keyword}&site=14&h=21`;
    },
    youtube(keyword) {
        return `https://www.youtube.com/results?search_query=${keyword}`;
    }
}