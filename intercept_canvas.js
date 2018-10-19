chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (request.mode == 'getCanvasCapture') {
        window.requestAnimationFrame(function() {
            var elms = document.getElementsByTagName('canvas');

            for (var i = 0; i < elms.length; i++) {
                if (elms[i].offsetWidth == 1200 && elms[i].offsetHeight == 720) {
                    request.mode = 'completeCanvasCapture';
                    request.dataUrl = elms[i].toDataURL('image/png');
                    chrome.runtime.sendMessage(request, null);
                }
            }
        });
    }
});
