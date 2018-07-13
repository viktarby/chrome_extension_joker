function FakedImages(imageArr) {
    var status = 1;

    this.state = function () {
        if(status) {
            this.getImages();
            status = 0;
            setTimeout(() => { status = 1;}, 1000);
        }
    },

    this.getImages = function () {
        imageArr.sort(this.shuffleImages);
        for (var d = document.getElementsByTagName("img"), i = 0, j = 0; d.length > i; i++, j++) {
            j = (j < imageArr.length) ? j : 0;
            if(-1 == imageArr.indexOf(d[i].src))
            this.replaceImage(d[i],imageArr[j]);
        }
    },
    this.shuffleImages = function () {
        return Math.random() - 0.5;
    },
    this.replaceImage = function (d, i) {
        if (d.src.match(/(jpeg|jpg|png)/g) || 1) {
            this.fitImg(d, i);
        }
    },
    this.fitImg = function (d, i) {
        if(d.clientWidth && d.clientHeight) {
            d.width =  d.width ? d.width : d.clientWidth + "px";
            d.height =  d.height ? d.height : d.clientHeight + "px";
            d.src = i;
        }
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
            chrome.storage.sync.set({'imageArr': imageArr});
        } else {
            chrome.storage.sync.get(['imageArr'], function(fake) {
                var fakedImages = new FakedImages(fake.imageArr);
                document.addEventListener("DOMContentLoaded", fakedImages.getImages());
                document.addEventListener("scroll", () => fakedImages.state());
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