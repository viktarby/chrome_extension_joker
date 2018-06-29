function fakeImages() {
    this.getImages = function (imageArr) {
        imageArr.sort(this.shuffleImages);
        for (var d = document.getElementsByTagName("img"), i = 0, j = 0; d.length > i; i++, j++) {
            j = (j <= imageArr.length) ? j : 0;
            if(d[i].src.match(/(jpeg|jpg)/g)) {
                d[i].src = imageArr[j];
            }
        }
    };
    this.shuffleImages = function (a, b) {
        return Math.random() - 0.5;
    }
}
chrome.storage.sync.get(["jokerAppOptions"], function(data) {
    switch(data.jokerAppOptions.trickType) {
        case "0":
        if (window.location.hostname == "www.google.fr") {
            var imageGet = document.getElementsByTagName('a');
            var imageArr = [];

            [].forEach.call(imageGet, function(a) {
                if(a.href.match(/^(https?.*imgurl=.*(jpeg|jpg|gif))/g)) {
                    var url = new URL(a.href);
                    var param = url.searchParams.get('imgurl');
                    if (imageArr.length < 30) {
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
                function Faker() {
                    fakeImages.call(this);
                }
                var fakedImages = new Faker();
                document.addEventListener("DOMContentLoaded", fakedImages.getImages(fake.imageArr));
            });
        }
            break;
        case "1":
                if(data.jokerAppOptions.blockedWebsites.includes(window.location.host)) {
                    setTimeout(function () {
                        chrome.runtime.sendMessage({url: window.location.host, redirectTo: data.jokerAppOptions.redirectTo});
                    },3000);
                } else {
                    chrome.storage.sync.get(['msg'], function(exist) {
                        if(exist.msg) {
                            document.addEventListener("DOMContentLoaded", alert(data.jokerAppOptions.message));
                            chrome.storage.sync.remove('msg', function() {
                            });
                        }
                    });
                }
            break;
        default:
            break;
    }
});
