/*
 * Varlink 0.1.2
 * Copyright (c) 2013-2014 KOBAYASHI Mitsuru
 * https://github.com/kobayashim/varlink
 *
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 */

var Varlink = function Varlink(target, opt) {
    opt = opt || {};

    // デフォルト設定
    var d = {
        escape          : false,
        unescape        : false,
        select_default  : -1,
        duplicate       : true,
        delimiter       : ',',
    };
    for (var key in d) {
        if (opt[key] == undefined) {
            opt[key] = d[key];
        };
    };

    // UID生成
    var uid = null;
    while (uid == null) {
        uid = 'varlink-' + (Math.round(Math.random() * 10000000000) + 1).toString();
        if (document.getElementsByClassName(uid).length > 0) {
            uid = null;
        };
    };

    this.target = target;
    this.opt = opt;
    this.val = {};
    this.callback = {};
    this.uid = uid;

    this.init();
};

// 初期化
Varlink.prototype.init = function() {
    return this.bind().refresh();
};

// イベントの設定
Varlink.prototype.bind = function() {
    var self = this;

    // 変更イベントを作成
    if (!self.change_function) {
        self.change_function = function() {
            var key = this.dataset.varlink;
            self._get_form_data(key, this)._change(key);

            // setCallbackメソッドでのコールバック設定がある場合は実施
            if (self.callback[key]) {
                self.callback[key](key, self.get(key), self, this);
            };

            // 個別要素のコールバック設定がある場合は実施
            var callback = this.dataset.varlinkCallback;
            if (callback) {
                var type = self._getObjectType(callback);
                try {
                    if (type == 'Function') {
                        callback(key, self.get(key), self, this);
                    } else {
                        eval('var func = ' + callback);
                        func(key, self.get(key), self, this);
                    };
                } catch(e) {
                    console.log(e);
                };
            };

        };
    };

    // セレクタ用クラスを設定し、変更イベントを設定
    var elms = document.querySelectorAll(self.target + " [data-varlink]");
    for (var i = 0; i < elms.length; i++) {
        // クラスを追加
        if (elms[i].className == '') {
            elms[i].className = self.uid + ' ' + self.uid + '-' + elms[i].dataset.varlink;
        } else {
            var new_class = elms[i].className.split(' ').concat([self.uid, self.uid + '-' + elms[i].dataset.varlink]);
            elms[i].className = self._removeDuplicate(new_class).join(' ');
        };

        // イベントを破棄・追加
        elms[i].removeEventListener('change', self.change_function);
        elms[i].addEventListener('change', self.change_function);
    };

    // データ全項目再表示
    this.reshow();

    return this;
};

// イベントの削除
Varlink.prototype.unbind = function() {
    var self = this;

    // セレクタ用クラスと変更イベントを全て削除
    var elms = document.querySelectorAll(self.target + " [data-varlink]");
    for (var i = 0; i < elms.length; i++) {
        // セレクタ用クラスを削除
        var cls = elms[i].className.split(' '), new_cls = [];
        for (var j = 0; j < cls.length; j++) {
            if (cls[j] != '' && cls[j].indexOf(self.uid) == -1) {
                new_cls.push(cls[j]);
            };
        };
        this.className  = (new_cls.length > 0) ? new_cls.join(' ') : '';

        // 変更イベントを削除
        elms[i].removeEventListener('change', self.change_function);
    };

    return this;
};


// コールバックの設定
Varlink.prototype.setCallback = function(key, callback) {
    if (!callback || callback == '') {
        delete this.callback[key];
    } else {
        this.callback[key] = callback;
    };

    return this;
};


// データの再表示
Varlink.prototype.reshow = function() {
    // データ全項目再表示
    for (var key in this.val) {
        this._change(key);
    };

    return this;
};


// データのリフレッシュ
Varlink.prototype.refresh = function() {
    var self = this;

    var got = {};
    var elms = document.getElementsByClassName(self.uid);
    for (var i = 0; i < elms.length; i++) {
        var key = elms[i].dataset.varlink;
        if (!got[key]) {
            if (elms[i].nodeName == 'SELECT' || elms[i].nodeName == 'TEXTAREA' || elms[i].nodeName == 'INPUT') {
                self._get_form_data(key, null)._change(key);
                got[key] = true;
            };
        };
    };

    return this;
};

// データの設定
Varlink.prototype.set = function(data) {
    for (var key in data) {
        var val = (this._getObjectType(data[key]) == 'Array') ? data[key] : [data[key]];
        for (var i = 0; i < val.length; i++) {
            if (this._getObjectType(val[i]) == 'String') {
                val[i] = (this.opt.unescape) ? this._unescape(val[i]) : val[i];
                //val[i] = this._parseNumber(val[i]);
            };
        };
        this.val[key] = (this.opt.duplicate) ? val : this._removeDuplicate(val);
        //this._change(key);
    };
    for (var key in data) {
        this._change(key);
    };

    return this;
};

// データの取得
Varlink.prototype.get = function(key) {
    if (key) {
        if (!this.val[key] || this.val[key].length == 0) {
            return null;
        } else if (this.val[key].length == 1) {
            return this.val[key][0];
        } else {
            return this.val[key];
        };
    } else {
        var val = {};
        for (var key in this.val) {
            if (!this.val[key] || this.val[key].length == 0) {
            } else if (this.val[key].length == 1) {
                val[key] = this.val[key][0];
            } else {
                val[key] = this.val[key];
            };
        };
        return val;
    };
};

// データの取得(全て配列で返す)
Varlink.prototype.getToArray = function(key) {
    if (key) {
        if (!this.val[key] || this.val[key].length == 0) {
            return [];
        } else {
            return this.val[key];
        };
    } else {
        var val = {};
        for (var key in this.val) {
            if (!this.val[key] || this.val[key].length == 0) {
                val[key] = [];
            } else {
                val[key] = this.val[key];
            };
        };
        return val;
    };
};

// データの取得(全て文字で返す)
Varlink.prototype.getToString = function(key) {
    if (key) {
        if (!this.val[key] || this.val[key].length == 0) {
            return null;
        } else {
            return this.val[key].join(this.opt.delimiter);
        };
    } else {
        var val = {};
        for (var key in this.val) {
            if (!this.val[key] || this.val[key].length == 0) {
                val[key] = null;
            } else {
                val[key] = this.val[key].join(this.opt.delimiter);
            };
        };
        return val;
    };
};


// リフレッシュ付きデータの取得
Varlink.prototype.getWithRefresh = function(key) {
    return this.refresh().get(key);
};

// データの削除
Varlink.prototype.del = function(key) {
    delete this.val[key];
    this._change(key);

    return this;
};

// データのクリア
Varlink.prototype.clear = function() {
    var self = this;

    self.val = {};
    var changed = {};
    var elms = document.getElementsByClassName(self.uid);
    for (var i = 0; i < elms.length; i++) {
        if (!changed[elms[i].dataset.varlink]) {
            self._change(elms[i].dataset.varlink);
            changed[elms[i].dataset.varlink] = true;
        };
    };

    return this;
};

// データによる表示切り替え
Varlink.prototype._change = function(key) {
    var self = this;

    // 対象エレメントを取得しエレメント毎に処理
    var elms = document.getElementsByClassName(self.uid + '-' + key);
    for (var i = 0; i < elms.length; i++) {
        var val = (self.val[key]) ? self.val[key].concat() : [];
        var elm = elms[i];

        // 値のプレ設定
        if (val.length == 0) {
            // 値が存在せず、デフォルト設定があった場合はその値で設定、なければ空配列
            if (elm.dataset.varlinkDefault) {
                val = [elm.dataset.varlinkDefault];
            } else {
                val = [];
            };
        } else if (elm.dataset.varlinkTrim) {
            // 値が存在して、trim設定があった場合は各値に対してtirm実行
            try {
                eval('var func = ' + elm.dataset.varlinkTrim);
                for(var j = 0; j < val.length; j++) {
                    val[j] = func(key, val[j], self);
                };
            } catch (e) {
                console.log(e);
            };
        };

        // 対象エレメントのタグで処理を変更
        switch(elm.nodeName) {
            case 'SELECT' : 
                var opts = elm.getElementsByTagName('option');
                var str = val.join(self.opt.delimiter) || null;
                for (var j = 0; j < opts.length; j++) {
                    opts[j].selected = ((val.length > 0 && (val.indexOf(opts[j].value) >= 0 || opts[j].value == str)) || (val.length == 0 && j == self.opt.select_default)) ? true : false;
                };
                break;
            case 'TEXTAREA' : 
            case 'INPUT' : 
                if (elm.type == 'checkbox' || elm.type == 'radio') {
                    elm.checked = (val.length > 0 && val.indexOf(elm.value) >= 0) ? true : false;
                } else {
                    var str = val.join(self.opt.delimiter) || '';
                    elm.value = (self.opt.unescape) ? self._unescape(str) : str;
                };
                break;
            default : 
                var str = val.join(self.opt.delimiter) || '';
                elm.innerHTML = (self.opt.escape) ? self._escape(str) : str;
                break;
        };
    };

    return this;
};

// フォームデータの取得
Varlink.prototype._get_form_data = function(key, target) {
    var self = this;

    // 対象エレメントを取得しエレメント毎に処理
    var val = [];
    var elms = (target && target.type != 'checkbox' && target.type != 'radio') ? [target] : document.getElementsByClassName(self.uid + '-' + key);
    for (var i = 0; i < elms.length; i++) {
        var v = [];
        var elm = elms[i];

        // 対象エレメントのタグで処理を変更
        switch(elm.nodeName) {
            case 'SELECT' : 
                var opts = elm.getElementsByTagName('option');
                for (var j = 0; j < opts.length; j++) {
                    if (opts[j].selected) {
                        v.push(opts[j].value);
                    };
                };
                break;
            case 'TEXTAREA' : 
            case 'INPUT' : 
                if (elm.type == 'checkbox' || elm.type == 'radio') {
                    if (elm.checked && elm.value != '' && (target == elm || target.value != elm.value)) {
                        v.push(elm.value);
                    };
                } else {
                    if (elm.value) {
                        v.push(elm.value);
                    };
                };
                break;
            default : 
                break;
        };

        // 値が存在し取得不可でない場合は、pre設定があれば実行して、なければそのままデータに追加
        if (v.length > 0 && !elm.dataset.varlinkNotGet) {
            if (elm.dataset.varlinkPre) {
                try {
                    eval('var func = ' + elm.dataset.varlinkPre);
                    v = v.map(func);
                } catch (e) {
                    console.log(e);
                };
            };
            val = val.concat(v);
        };
    };

    if (val.length > 0) {
        self.val[key] = (self.opt.duplicate) ? val.sort() : self._removeDuplicate(val).sort();
    } else {
        delete self.val[key];
    };

    return this;
};

// エスケープ
Varlink.prototype._escape = function(str) {
    return str.replace(/[&<>"]/g, function(match) {
        return {
            '&' : '&amp;',
            '<' : '&lt;',
            '>' : '&gt;',
            '"' : '&quot;',
        }[match];
    });
};

// アンエスケープ
Varlink.prototype._unescape = function(str) {
    return str.replace(/&(amp|lt|gt|quot);/g, function(match) {
        return {
            '&amp;'  : '&',
            '&lt;'   : '<',
            '&gt;'   : '>',
            '&quot;' : '"',
        }[match];
    });
};

// オブジェクトタイプを取得
Varlink.prototype._getObjectType = function(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
};

// 数値は数値に変換
Varlink.prototype._parseNumber = function(val) {
    return (isFinite(val)) ? val - 0 : val;
};

// 重複削除
Varlink.prototype._removeDuplicate = function(ary) {
    var s = {}, u = [];
    for (var i = 0; i < ary.length; i++) {
        var v = ary[i];
        if (!(v in s)) {
            s[v] = true;
            u.push(v);
        };
    };
   return u;
};
