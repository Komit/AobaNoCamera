"use strict";

var Controller = function Controller() {
    this._logic_object              = {};
    this._uid_count                 = 0;

    return this;
};

Controller.prototype.loadFile = function(list, callback, async, cache) {
    var self = this;

    if (async !== false) async = true;
    if (cache !== false) cache = true;
    self._loadCount = list.length;
    if (self._template === undefined) self._template = {};

    // ファイル読み込み
    $.each(list, function(i) {
        var dataType = (list[i].match(/\.js$/i)) ? 'script' : 'text';
        $.ajax({
            url         : chrome.runtime.getURL('') + list[i],
            async       : async,
            cache       : cache,
            type        : 'get',
            dataType    : dataType,
            success     : function(data, status) {
                            if (dataType === 'text') self._template[list[i]] = data;
                            if (--self._loadCount == 0 && typeof callback === 'function') {
                                callback();
                            };
                          },
            error       : function() { console.log('ファイル読込失敗[' + list[i] + ']'); }
        });
    });

    return self;
};

Controller.prototype.getTemplate = function(path) {
    var self = this;

    return self._template[path] || '';
};

Controller.prototype.getUId = function() {
    var self = this;

    // ツリーIDを作成
    var uid = null;
    while (uid == null) {
        uid = 'logic-' + (Math.round(Math.random() * 10000000000) + 1).toString() + '-' + (++self._uid_count).toString();
        if (self._logic_object[uid] !== undefined) {
            uid = null;
        };
    };

    return uid;
};

Controller.prototype.createLogic = function(cls, target, template, parent_uid) {
    var self = this;

    if (self._logic_object[uid] != undefined) {
        return null;
    };

    var uid = self.getUId();
    var path_tree = [];
    if (parent_uid && self._logic_object[parent_uid]['path_tree']) {
        path_tree = self._logic_object[parent_uid]['path_tree'].concat();
        if (path_tree.indexOf(uid) != -1) {
            return null;
        };
    }
    path_tree.push(uid);
    self._logic_object[uid] = { path_tree : path_tree };
    self._logic_object[uid].obj = new cls(target, template, uid);

    target.get(0).dataset.logicUId = uid;

    return uid;
};

Controller.prototype.destoryLogic = function(uid, flag) {
    var self = this;

    if (flag !== true) {
        flag = false;
    };

    if (flag) {
        var descendants = self.getDescendants(uid);
        for (var i = 0; i < descendants.length; i++) {
            self.destoryLogic(descendants[i], false);
        };
    };

    self._logic_object[uid]['obj'].destory();
    self._logic_object[uid] = null;
    delete self._logic_object[uid];

    return self;
};

Controller.prototype.getPathTree = function(uid) {
    var self = this;

    if (self._logic_object[uid] == undefined) {
        return [];
    };

    return self._logic_object[uid]['path_tree'];
};

Controller.prototype.getLogicByUId = function(uid) {
    var self = this;

    if (self._logic_object[uid] == undefined) {
        return null;
    };

    return self._logic_object[uid]['obj'];
};

Controller.prototype.getAncestors = function(uid) {
    var self = this;

    var tree = self.getPathTree(uid).concat();
    tree.splice(tree.length - 1, 1);
    return tree;
};

Controller.prototype.getParent = function(uid) {
    var self = this;

    var tree = self.getAncestors(uid);

    if (tree.length == 0) {
        return null;
    } else {
        return tree[tree.length - 1];
    };
};

Controller.prototype.getRoot = function(uid) {
    var self = this;

    var tree = self.getAncestors(uid);

    if (tree.length == 0) {
        return null;
    } else {
        return tree[0];
    };
};

Controller.prototype.getDescendants = function(uid) {
    var self = this;

    if (self._logic_object[uid] == undefined) {
        return [];
    };

    var uids = [];
    for (var key in self._logic_object) {
        var tree = self.getPathTree(key);
        if (key != uid && tree.indexOf(uid) != -1) {
            uids.push(key);
        };
    };

    return uids;
};

Controller.prototype.getChildren = function(uid) {
    var self = this;

    if (self._logic_object[uid] == undefined) {
        return [];
    };

    var uids = [];
    var depth = self.getPathTree(uid).length + 1;

    var descendants = self.getDescendants(uid);
    for (var i = 0; i < descendants.length; i++) {
        if (self.getPathTree(descendants[i]).length == depth) {
            uids.push(descendants[i]);
        }
    };
    return uids;
};

Controller.prototype.checkDescendants = function(uid1, uid2) {
    var self = this;

    var uid1_path = self.getPathTree(uid1);
    var uid2_path = self.getPathTree(uid2);

    if (uid1_path.length == 0 || uid2_path.length == 0 || uid1_path[0] !== uid2_path[0]) {
        return 0;
    };

    if (uid2_path.indexOf(uid1) != -1) {
        return 1;
    } else if (uid1_path.indexOf(uid2) != -1) {
        return -1;
    } else {
        return 0;
    };
};
