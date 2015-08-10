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
                    if (!res.hasOwnProperty('head') || res.head.num === 0) {
                        reject('NO_RESULT');
                    } else {
                        let resArray = res.item.map((item) => {
                            return item.word;
                        });
                        resolve(resArray);    
                    }                
                });
        });
    },
}