import Ajax from '../utils/Ajax.js';
import Urls from '../utils/Urls.js';
import $ from 'jquery';
import Basic from '../utils/Basic.js';

export default {
    tencent(keyword) {
        let url = Urls.tencent(keyword);
        return new Promise((resolve, reject) => {
            Ajax.GET(url)
                .then((res) => {
                    res = res.replace('QZOutputJson=', '');
                    res = res.substring(0, res.length - 1);
                    res = JSON.parse(res);
                    if (res.head.num === 0) {
                        return Promise.reject('NO_RESULT');
                    } else {
                        let resArray = [];
                        let imageLoaders = res.item.map((item) => {
                            if (item.url && item.dc) {
                                return Basic.loadImage({
                                    img: item.dc,
                                    title: item.word,
                                    url: item.url,
                                    other: item.da
                                });
                            } else {
                                return;
                            }
                        });
                        return Promise.all(imageLoaders);    
                    }                
                })
                .then((res) => {
                    resolve(Basic.cleanArray(res));
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    bilibili(keyword) {
        let url = Urls.bilibili(keyword);
        return new Promise((resolve, reject) => {
            Ajax.GET(url)
                .then((res) => {
                    let doc = (new DOMParser).parseFromString(res, 'text/html');
                    let items = doc.querySelectorAll('.searchlist li.l');
                    let imageLoaders = Array.prototype.slice.call(items).map((item) => {
                        let spanStr = item.querySelector('.t span').innerText;
                        return Basic.loadImage({
                            img: item.querySelector('.preview img').src,
                            title: item.querySelector('.t').innerText.replace(spanStr, '').replace(/(\r\n|\n|\r)/gm,''),
                            url: item.querySelector('.comprehensive_r a').href,
                            other: spanStr
                        });
                    });
                    return Promise.all(imageLoaders);
                })
                .then((res) => {
                    resolve(res);
                });
        });
    },
    aiqiyi(keyword) {
        let url = Urls.aiqiyi(keyword);
        return new Promise((resolve, reject) => {
            Ajax.GET(url)
                .then((res) => {
                    res = JSON.parse(res);
                    let imageLoaders = res.data.map((item) => {
                        if (item.picture_url && item.link) {
                            return Basic.loadImage({
                                img: item.picture_url,
                                title: item.name,
                                url: item.link,
                                other: item.year
                            });
                        }
                    });
                    return Promise.all(imageLoaders);
                })
                .then((res) => {
                    resolve(Basic.cleanArray(res));
                });
        });
    },
    leshi(keyword) {
        let url = Urls.leshi(keyword);
        return new Promise((resolve, reject) => {
            Ajax.GET(url)
                .then((res) => {
                    let doc = (new DOMParser).parseFromString(res, 'text/html');
                    let items = doc.querySelectorAll('.So-detail.Movie-so');
                    let imageLoaders = Array.prototype.slice.call(items).map((item) => {
                        if (item.querySelector('a.ico_play')) {
                            return Basic.loadImage({
                                img: item.querySelector('.left a img').src,
                                title: item.querySelector('.left a img').title,
                                url: item.querySelector('.left a').href,
                                other: item.querySelector('.info-tit p').innerText
                            });
                        }
                    });
                    return Promise.all(imageLoaders);
                })
                .then((res) => {
                    resolve(Basic.cleanArray(res));
                });
        });
    },
    youku(keyword) {
        let url = Urls.youku(keyword);
        return new Promise((resolve, reject) => {
            Ajax.GET(url)
                .then((res) => {
                    let doc = (new DOMParser).parseFromString(res, 'text/html');
                    let items = doc.querySelectorAll('.item');
                    let imageLoaders = Array.prototype.slice.call(items).map((item) => {
                        if (item.querySelector('.playarea a.s_btn.btn_play')) {
                            return Basic.loadImage({
                                img: item.querySelector('li.p_thumb img').src,
                                title: item.querySelector('li.p_thumb img').alt,
                                url: item.querySelector('.s_btn.btn_play').href,
                                other: item.querySelector('ul.base li.base_pub').innerText.replace(/[\(\)']+/g,'')
                            });
                        }
                    });
                    return Promise.all(imageLoaders);
                })
                .then((res) => {
                    resolve(Basic.cleanArray(res));
                });
        });
    },
    youtube(keyword) {
        let url = Urls.youtube(keyword);
        return new Promise((resolve, reject) => {
            Ajax.GET(url)
                .then((res) => {
                    let doc = (new DOMParser).parseFromString(res, 'text/html');
                    let items = doc.querySelectorAll('ol.item-section li .yt-lockup-dismissable');
                    let imageLoaders = Array.prototype.slice.call(items).map((item) => {
                        let imgMatches = item.querySelector('.yt-thumb.video-thumb img').outerHTML.match(/src="\/\/(.[^\s]*)"/) || item.querySelector('.yt-thumb.video-thumb img').outerHTML.match(/data-thumb="\/\/(.[^\s]*)"/);
                        return Basic.loadImage({
                            img: 'http://' + imgMatches[1],
                            title: item.querySelector('h3.yt-lockup-title a').title,
                            url: 'https://www.youtube.com' + item.querySelector('a.yt-uix-sessionlink').outerHTML.match(/href="(.[^\s]*)"/)[1],
                            other: item.querySelector('.yt-lockup-byline a').innerText
                        });
                    });
                    return Promise.all(imageLoaders);
                })
                .then((res) => {
                    resolve(res);
                });
        });
    }
}