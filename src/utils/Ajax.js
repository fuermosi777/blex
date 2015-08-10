import $ from 'jquery';

export default {
    GET(url) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                dataType: 'text',
                success(res) {
                    resolve(res);
                },
                error(err) {
                    console.log(err);
                    reject(err);
                }
            });
        });
    },
    POST(url, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: data,
                success(res) {
                    resolve(res);
                },
                error(err) {
                    console.log(err);
                    reject(err);
                }
            })
        });
    }
}