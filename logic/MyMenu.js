// String拡張
String.prototype.padding = function(num) {
    return (new Array(num + 1).join('0') + this).slice(-1 * num);
};

// Date拡張
Date.prototype.getFormatString = function(str) {
    if (!str) str = 'YYYY/MM/DD hh:mm:ss';

    str = str.replace(/YYYY/, this.getFullYear().toString().padding(4));
    str = str.replace(/YY/,   this.getYear().toString().padding(2));
    str = str.replace(/MM/,   (this.getMonth() + 1).toString().padding(2));
    str = str.replace(/DD/,   this.getDate().toString().padding(2));
    str = str.replace(/hh/,   this.getHours().toString().padding(2));
    str = str.replace(/mm/,   this.getMinutes().toString().padding(2));
    str = str.replace(/ss/,   this.getSeconds().toString().padding(2));

    return str;
};

var MyMenu = function MyMenu(target, template, uId, opt) {
    LogicMaster.call(this, target, template, uId, opt);
    this.start();
};

MyMenu.prototype = Object.create(LogicMaster.prototype, {
    constructor: {
        value: MyMenu,
        enumerable: false,
        writable: true,
        configurable: true
    }
});

// 初期設定
MyMenu.prototype.start = function() {
    var self = this;

    // 保存領域設定
    self._selectData = { num: 6, column: 2 };
    self._showFlag = false;
    self._setting = {};
    self._hotKey = {};

    // シャッター音設定
    // サウンドオフィスドットコム http://www.soundoffice.com/se/item/se-033.php
    self._shutterSound = new Audio('data:audio/mp3;base64,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');

    // フレームを設定
    self._frame = new MyFrame();

    // 編成選択肢の初期値設定
    self.eventSelect($('#ancMenuSelectNum a:last').get(0));     // 編成数の最後の要素 → 6
    self.eventSelect($('#ancMenuSelectColumn a:first').get(0)); // 並び順の最初の要素 → 縦2列

    // オプション設定読み出し
    chrome.storage.sync.get(cnst.setting, function(items) {
        self._setting = items;
        self._hotKey = JSON.parse(items.hotKey);
    });

    // オプション設定変更イベントリスナー
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        chrome.storage.sync.get(cnst.setting, function(items) {
            self._setting = items;
            self._hotKey = JSON.parse(items.hotKey);
        });
    });

    // background.jsからのメッセージイベントリスナー
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        switch(message.mode) {
            case 'toggleMenu':      // メニュー切り替えの場合
                // 表示・非表示を切り替え
                self._showFlag = !self._showFlag;
                self.show(self._showFlag);

                // 編成canvasは初期化
                self.initFormationCanvas();

                break;
            case 'completeCapture': // キャプチャー取得完了の場合
                self.completeCupter(message);
                break;
            case 'changeZoom':      // ズーム倍率変更の場合
                // 編成canvasは初期化
                self.initFormationCanvas();
                break;
            case 'receiveHotKey':   // ホットキーイベント発生の場合
                self.eventHotKey(message.key);
                break;
        };
        sendResponse({});
    });

    return self;
};

// ホットキーイベント
MyMenu.prototype.eventHotKey = function(key) {
    var self = this;

    if (self._hotKey[key] !== undefined) {
        var elm = document.querySelector('[data-hot-key="' + self._hotKey[key] + '"]');
        if (elm !== null) {
            // クリックイベント強制発火
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', false, true);
            elm.dispatchEvent(event);
        };
    };

    return self;
};

// 「設定」表示イベント
MyMenu.prototype.eventOption = function(elm) {
    var self = this;

    // オプション画面表示
    chrome.runtime.sendMessage({ mode: 'openOption' }, function(res) {});

    return self;
};

// 撮影イベント
MyMenu.prototype.eventCapture = function(elm) {
    var self = this;

    // 表示中？
    var displaying = (self._showFlag === true) ? true : false;

    // 表示中ならメニューを隠す
    if (displaying) self.show(false);

    // 強制redraw
    self.redraw(function() {
        // シャッター音再生
        if (self._setting.shutterSound === 'on') {
            self._shutterSound.currentTime = 0;
            self._shutterSound.play();
        };

        // 撮影実行
        chrome.runtime.sendMessage({ mode: 'execCapture', data: $(elm).data() }, function(res) {});
    });


    return self;
};

// 撮影完了イベント
MyMenu.prototype.completeCupter = function(msg) {
    var self = this;

    // 表示中？
    var displaying = (self._showFlag === true) ? true : false;

    // 表示中ならメニュー再表示
    if (displaying) self.show(true);

    // ゲーム画面の表示領域を取得
    var pos = self.getGamePosition();
    if (pos.success !== true) return self;

    // 各種データを取得
    var data = msg.data;
    var frame = cnst.position[data.captureMode];
    var mask = (data.maskMode && cnst.mask[data.maskMode]) ? cnst.mask[data.maskMode] : null;

    // 対象canvasを設定
    var canvas = (data.target === 'new') ? new MyCanvas().init(frame.width, frame.height) : new MyCanvas(document.getElementById(data.target));

    // dataUrlをcanvasに貼り付ける
    var y = (data.top === undefined) ? 0 : data.top;
    var x = (data.left === undefined) ? 0 : data.left;
    canvas.copyFromDataUrl(msg.dataUrl, pos.left + frame.left, pos.top + frame.top, frame.width, frame.height, x, y, frame.width, frame.height, function(c) {
        // マスキング設定がある場合はマスキング実施
        if (mask !== null) canvas.setMask(mask, x, y);

        // 角丸の場合は角丸にする
        if (frame.radiusArray) canvas.cutRadius(frame.radiusArray);

        // 新規canvasの場合はpng保存
        if (data.target === 'new') canvas.toPngFile(new Date().getFormatString(self._setting.defaultFileName) + '.png');
    });

    return self;
};


// 撮影フレーム表示イベント
MyMenu.prototype.eventShowFrame = function(elm) {
    var self = this;

    // フレーム表示を行わない場合は終了
    if (self._setting.shutterFrame !== 'on') return self;

    // キャプチャー位置を取得
    var pos = self.getGamePosition();
    if (pos.success !== true) return self;

    var data = $(elm).data();

    if (data.captureMode && cnst.position[data.captureMode]) {
        var frame = cnst.position[data.captureMode];

        // フレームを設定
        self._frame.set(
            pos.left + frame.left + $(window).scrollLeft() - 5,
            pos.top + frame.top + $(window).scrollTop() - 5,
            frame.width,
            frame.height,
            frame.radius
        );

        // マスキング設定がある場合はマスキング実施
        if (data.maskMode && cnst.mask[data.maskMode]) self._frame.setMask(cnst.mask[data.maskMode]);

        // フレームを表示
        self._frame.show(true);
    };

    return self;
};

// 撮影フレーム非表示イベント
MyMenu.prototype.eventHideFrame = function(elm) {
    var self = this;

    self._frame.show(false);

    return self;
};

// 保存イベント
MyMenu.prototype.eventSave = function(elm) {
    var self = this;

    // png保存
    new MyCanvas(document.getElementById($(elm).data('target'))).toPngFile(new Date().getFormatString(self._setting.defaultFileName) + '.png');

    return self;
};

// メニュー選択イベント
MyMenu.prototype.eventSelect = function(elm) {
    var self = this;

    var target = $(elm);

    // 選択メニューの書き換え
    $('a', target.parent()).removeClass('ancSelected');
    target.addClass('ancSelected');

    // 選択値を保存
    self._selectData[target.data('type')] = parseInt(target.data('num'), 10);

    // 編成保存用canvasを初期化
    self.initFormationCanvas();

    return self;
};


// ゲーム画面の位置を取得
MyMenu.prototype.getGamePosition = function() {
    var self = this;

    /*
    return {
        top        : 100,
        left       : 200,
        height     : 480,
        width      : 800,
        success    : true,
    };
    */

    var data = { success: false };

    // 位置を返信
    var target = $("#game_frame");
    if (target.length === 1) {
        var offset = target.offset();
        data.top        = Math.round(offset.top + 16) - $(window).scrollTop();
        data.left       = Math.round(offset.left + (target.width() - 800) / 2) - $(window).scrollLeft();
        data.height     = 480;
        data.width      = 800;
        data.success    = true;
    };

    return data;
};


// 編成用サイズを計算
MyMenu.prototype.calcFormationCanvas = function() {
    var self = this;

    var data = {};

     // 表示数を取得
    data.num = self._selectData.num;

    // 縦・横の表示数を計算
    data.numH = (data.num <= self._selectData.column) ? 1 : Math.ceil(data.num / self._selectData.column);
    data.numW = (data.num <= self._selectData.column) ? data.num : self._selectData.column;

    // 縦・横の実解像度を計算
    data.pixelRH = cnst.position.formation.height * data.numH;
    data.pixelRW = cnst.position.formation.width * data.numW;

    // 縦・横の表示解像度を計算
    data.pixelSH = Math.ceil(data.pixelRH * cnst.position.formation.sWidth / data.pixelRW);
    data.pixelSW = cnst.position.formation.sWidth;

    return data;
};


// 編成保存用canvasを書き換え
MyMenu.prototype.initFormationCanvas = function() {
    var self = this;

    // 編成用サイズを取得
    var data = self.calcFormationCanvas();

    // canvasを初期化
    var canvas = new MyCanvas(document.getElementById('ancFormationCanvas')).init(data.pixelRW, data.pixelRH).setDisplaySize(data.pixelSW, data.pixelSH);

    // シャッター表示領域を設定
    $('#ancFormationCanvasArea').css({ height: data.pixelSH, width: data.pixelSW });

    // シャッターを一旦全非表示
    $('#ancFormationCanvasArea a').hide();

    // シャッターを設定
    for (var i = 1; i <= data.num; i++){
        var target = $('#ancShotFormation' + i.toString());

        // 位置を計算
        var y = Math.ceil(i / data.numW);
        var x = (i % data.numW === 0) ? data.numW : i % data.numW;

        // 位置データ等をdataに埋め込む
        target.data('left', (x-1) * cnst.position.formation.width);
        target.data('top', (y-1) * cnst.position.formation.height);

        // 座標を計算
        var top = Math.ceil((y - 1) * data.pixelSH / data.numH + (data.pixelSH / data.numH - target.outerHeight(true)) / 2);
        var left = Math.ceil((x - 1) * data.pixelSW / data.numW + (data.pixelSW / data.numW - target.outerWidth(true)) / 2);

        // 表示
        target.css({ top: top, left: left }).show();
    };

    return self;
};

