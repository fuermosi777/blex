export default {
    loadImage(mediaObj) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = () => {
                resolve({
                    img: window.URL.createObjectURL(xhr.response),
                    title: mediaObj.title,
                    url: mediaObj.url,
                    other: mediaObj.other
                });
            }
            xhr.open('GET', mediaObj.img, true);
            xhr.send();
        });
    },

    cleanArray(array) {
        for (var i = 0; i < array.length; i++) {
            if (typeof array[i] === 'undefined') {         
                array.splice(i, 1);
                i--;
            }
        }
        return array;
    }
}