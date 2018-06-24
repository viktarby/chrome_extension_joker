function fakeImages() {
    this.getImages = function (imageArr) {
        imageArr.sort(this.shuffleImages);
        for (var d = document.getElementsByTagName("img"), i = 0, j = 0; d.length > i; i++, j++) {
            j = (j <= imageArr.length) ? j : 0;
            d[i].src = imageArr[j];
        }
    };
    this.shuffleImages = function (a, b) {
        return Math.random() - 0.5;
    }
}

if (window.location.hostname == "www.google.fr") {
    var imageGet = document.getElementsByTagName('a');
    var imageArr = [];

    [].forEach.call(imageGet, function(a) {
        if(a.href.match(/^(https?.*imgurl=.*(jpeg|jpg|gif))/g)) {
            var url = new URL(a.href);
            var param = url.searchParams.get('imgurl');
            console.log(param);
            if(imageArr.length < 30) {
                imageArr.push(param);
            } else {
                return;
            }
        }
    });
    chrome.storage.sync.set({'imageArr': imageArr}, function() {
    });
} else {
    chrome.storage.sync.get(['imageArr'], function(fake) {
        if(chrome.runtime.lastError)
        {
            return;
        }
        function faker() {
            fakeImages.call(this);
        }
        var fakedImages = new faker();
        document.addEventListener("DOMContentLoaded", fakedImages.getImages(fake.imageArr));
    });
};