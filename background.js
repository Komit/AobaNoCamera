// スナップショット取得
var capturScreen = function(param) {
    chrome.tabs.getCurrent(function(tab) {
        // キャプチャー取得
        chrome.tabs.captureVisibleTab({ format: 'png' }, function(dataUrl){
            // キャプチャー完了メッセージを送信
            param.dataUrl = dataUrl;
            param.mode = 'completeCapture';

            chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, function(tab) {
                for (var i = 0; i < tab.length; i++) {
                    chrome.tabs.sendMessage(tab[i].id, param, function() {});
                };
            });
        });
    });
};

// ホットキー送信
var hotKeyWait = false;
var sendHotKey = function(key) {
    if (hotKeyWait !== true) {

        // 0.2秒相当のwaitをかける
        hotKeyWait = true;
        window.setTimeout(function() {
            hotKeyWait = false;
        }, 200);

        chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, function(tab) {
            for (var i = 0; i < tab.length; i++) {
                chrome.tabs.sendMessage(tab[i].id, { mode: 'receiveHotKey', key: key }, function() {});
            };
        });
    };
};

// ボタンの有効無効切り替え
var toggleButton = function(tabId, flag) {
    if (flag === true) {
        chrome.browserAction.enable(tabId)
        chrome.browserAction.setTitle({ tabId: tabId, title: '青葉のカメラ[取得可能]' });
        chrome.browserAction.setIcon({ tabId: tabId, path: 'icon/icon38_enabled.png' });
    } else {
        chrome.browserAction.disable(tabId)
        chrome.browserAction.setTitle({ tabId: tabId, title: '青葉のカメラ[取得不可]' });
        chrome.browserAction.setIcon({ tabId: tabId, path: 'icon/icon38_disabled.png' });
    };
}

// タブのステータス変更イベント処理
var chageTabStatus = function(tabId) {
    chrome.tabs.get(tabId, function(tab) {
        toggleButton(tabId, (tab.status === 'complete' && tab.url.indexOf('www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/') >= 0) ? true : false);
        //toggleButton(tabId, true);
    });
};

// タブ変更関連のイベント設定
chrome.tabs.onCreated.addListener(function(tab) {
    chageTabStatus(tab.id);
});
chrome.tabs.onUpdated.addListener(function(tabId) {
    chageTabStatus(tabId);
});
chrome.tabs.onActivated.addListener(function(activeInfo) {
    chageTabStatus(activeInfo.tabId);
});
chrome.tabs.onZoomChange.addListener(function(zoomChangeInfo){
  chrome.tabs.sendMessage(zoomChangeInfo.tabId, { mode: 'changeZoom' }, function(res){});
});

// アイコンが押された場合
chrome.browserAction.onClicked.addListener(function(tab) {
    // ボタンが有効な場合に実行
    chrome.browserAction.getTitle({ tabId: tab.id }, function(result) {
        if (result.indexOf('取得可能') === -1) return;

        // メニューの表示非表示を切り替え
        chrome.tabs.sendMessage(tab.id, { mode: 'toggleMenu' }, function(res){});
    });
});

// content scriptからの通信があった場合
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.mode) {
        case 'execCapture': // キャプチャー実施
            capturScreen(request);
            break;
        case 'pushHotKey':  // ホットキーエコーバック
            sendHotKey(request.key);
            break;
    };
    sendResponse({});
});

toggleButton(null, false);
