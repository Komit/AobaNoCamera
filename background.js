// インストール時orアップデート時
chrome.runtime.onInstalled.addListener(function() {
    // 拡張自体のインストール/アップデートの場合にお知らせを表示
    var manifest = chrome.runtime.getManifest();
    chrome.storage.local.get({ version: '0.0.0' }, function(items) {
        if (items.version !== manifest.version) chrome.tabs.create({ url: chrome.runtime.getURL('update.html') });
        chrome.storage.local.set({ version: manifest.version });
    });
});

// タブに送信
var sendMessageTab = function(param) {
    chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, function(tab) {
        for (var i = 0; i < tab.length; i++) {
            chrome.tabs.sendMessage(tab[i].id, param, function() {});
        };
    });
};


// スナップショット取得
var capturScreen = function(param) {
//    chrome.tabs.getCurrent(function(tab) {
        param.mode = 'getCanvasCapture';
        sendMessageTab(param);
//    });
};

// ホットキー送信
var hotKeyWait = false;
var sendHotKey = function(key) {
    if (hotKeyWait !== true) {

        // 0.1秒相当のwaitをかける
        hotKeyWait = true;
        window.setTimeout(function() {
            hotKeyWait = false;
        }, 100);

        sendMessageTab({ mode: 'receiveHotKey', key: key });
    };
};

// ボタンの有効無効切り替え
var toggleButton = function(tabId, flag) {
    if (flag === true) {
        chrome.action.enable(tabId)
        chrome.action.setTitle({ tabId: tabId, title: '青葉のカメラ' });
        chrome.action.setIcon({ tabId: tabId, path: 'icon/icon38_enabled.png' });
    } else {
        chrome.action.disable(tabId)
        chrome.action.setTitle({ tabId: tabId, title: '青葉のカメラ' });
        chrome.action.setIcon({ tabId: tabId, path: 'icon/icon38_disabled.png' });
    };
}

// タブのステータス変更イベント処理
var chageTabStatus = function(tabId) {
    chrome.tabs.get(tabId, function(tab) {
        //toggleButton(tabId, (tab.status === 'complete' && tab.url.indexOf('www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/') >= 0) ? true : false);
        toggleButton(tabId, true);
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
chrome.action.onClicked.addListener(function(tab) {
    // ボタンが有効な場合に実行
    chrome.action.getTitle({ tabId: tab.id }, function(result) {
        if (tab.url.indexOf('www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/') < 0) {        
            //alert("艦これのゲーム画面以外では動作しません。")
            return;
        }
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
        case 'openOption':  // オプション画面表示
            chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
            break;
        case 'completeCanvasCapture':  // 撮影完了
            request.mode = 'completeCapture';
            sendMessageTab(request);
            break;
    };
    sendResponse({});
});

toggleButton(null, false);
