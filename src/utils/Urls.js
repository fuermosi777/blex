export default {
    tencent(keyword) {
        return `http://s.video.qq.com/smartbox?plat=2&ver=0&num=10&otype=json&query=${keyword}`;
    },
    bilibili(keyword) {
        return `http://www.bilibili.com/search?keyword=${keyword}&orderby=&type=comprehensive`;
    },
    aiqiyi(keyword) {
        return `http://suggest.video.iqiyi.com/?key=${keyword}&platform=11&rltnum=10`;
    },
    leshi(keyword) {
        return `http://so.letv.com/s?wd=${keyword}&from=pc&ref=click`;
    },
    youku(keyword) {
        return `http://www.soku.com/v?keyword=${keyword}`;
    },
    youtube(keyword) {
        return `https://www.youtube.com/results?search_query=${keyword}`;
    }
}