var listener = function (info) {
    console.log(JSON.stringify(info));
    var headers = info.responseHeaders;
    for (var i = headers.length - 1; i >= 0; --i) {
        var header = headers[i].name.toLowerCase();
        if (header == 'x-frame-options' || header == 'frame-options') {
            headers.splice(i, 1); // Remove header
        }
    }
    return {responseHeaders: headers};
};

chrome.webRequest.onHeadersReceived.addListener(
    listener,
    {
        urls: ['*://www.google.fr/*'],
        types: ['sub_frame']
    },
    ['blocking', 'responseHeaders']
);

chrome.webRequest.onErrorOccurred.removeListener(listener);
