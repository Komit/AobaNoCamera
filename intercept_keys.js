window.onload = function() {
    new MyKey(function(key) {
        chrome.runtime.sendMessage({ mode: 'pushHotKey', key: key }, function(res) {});
    });
};
