"use strict";

var LogicMaster = function LogicMaster(target, template, uId) {
    this._uid               = uId || null;
    this._target            = target;
    this._template          = template;
    this._varlink           = null;

    this.init();
};

LogicMaster.prototype.init = function() {
    var self = this;

    self.setTemplate(self.getTemplate());
    self.setEvent();

    return self;
};

LogicMaster.prototype.getTarget = function() {
    var self = this;

    return self._target;
};


LogicMaster.prototype.getTemplate = function() {
    var self = this;

    return self._template;
};

LogicMaster.prototype.setTemplate = function(template) {
    var self = this;

    self.show(false);

    var target = self.getTarget();

    if (template) {
        target.html('');
        target.append(template);
    };

    $('form', self._target).on('submit', function() {
        return false;
    });

    self._varlink = new Varlink(target.selector, { default_select : 0 });
    self._varlink.refresh(true, true);

    return self;
};

LogicMaster.prototype.varlink = function() {
    var self = this;

    return self._varlink;
};


LogicMaster.prototype.show = function(flag) {
    var self = this;

    if (flag === true) {
        self.getTarget().show();
    } else {
        self.getTarget().hide();
    };

    return self;
};

LogicMaster.prototype.redraw = function(callback) {
    var self = this;

    // 万策尽きたー！ のでsetTimeoutで代用
    var tId = window.setTimeout(callback, 50);

    return self;
};

/**
* mix-in
* @method mixin
* @param cls {Object} クラス
* @return {object} 自身
*/
LogicMaster.prototype.mixin = function(cls) {
    var self = this;

    for (var m in cls) {
        if (cls.hasOwnProperty(m)) {
            self[m] = cls[m];
        };
    };

    return self;
};

LogicMaster.prototype.setEvent = function(target) {
    var self = this;

    target = target || self.getTarget();

    $('[data-event]', target).each(function(){
        var elm = this;
        var obj = $(elm);

        var envents = obj.data('event').split(',');
        var callback = {};
        for (var i = 0; i < envents.length; i++) {
            var e = envents[i].split(':').map(function(s){
                return s.toString().trim();
            });
            callback[e[0]] = e[1];

            var func = function(t) {
                if (typeof self[callback[t.type]] === 'function') self[callback[t.type]](elm);
                return false;
            };

            obj.on(e[0], func);
        };
    });

    return this;
};

LogicMaster.prototype.whoIs = function() {
    var self = this;

    return (self.constructor.name) ? self.constructor.name : ('' + self.constructor).replace(/^\s*function\s*([^\(]*)[\S\s]+$/im, '$1');
};

LogicMaster.prototype.getUId = function() {
    var self = this;

    return self._uid;
};

LogicMaster.prototype.setUId = function(uid) {
    var self = this;

    self._uid = uid;

    return self;
};

LogicMaster.prototype.getAncestors = function(filter) {
    var self = this;

    var ancestors = CONTROLLER.getAncestors(self.getUId()).map(function(uid) {
        return CONTROLLER.getLogicByUId(uid);
    });

    if (typeof filter == 'string') {
        for (var i = ancestors.length - 1; i >= 0; i--) {
            if (ancestors[i].whoIs() != filter) {
                ancestors.splice(i, 1);
            };
        };
    };

    return ancestors;

};

LogicMaster.prototype.getParent = function() {
    var self = this;

    var parent = CONTROLLER.getParent(self.getUId());
    return (parent) ? CONTROLLER.getLogicByUId(parent) : null;
};

LogicMaster.prototype.getRoot = function() {
    var self = this;

    var root = CONTROLLER.getRoot(self.getUId());
    return (root) ? CONTROLLER.getLogicByUId(root) : null;
};

LogicMaster.prototype.getChildren = function(filter) {
    var self = this;

    var children = CONTROLLER.getChildren(self.getUId()).map(function(uid) {
        return CONTROLLER.getLogicByUId(uid);
    });

    if (typeof filter == 'string') {
        for (var i = children.length - 1; i >= 0; i--) {
            if (children[i].whoIs() != filter) {
                children.splice(i, 1);
            };
        };
    };

    return children;
};

LogicMaster.prototype.getDescendants = function(filter) {
    var self = this;

    var descendants = CONTROLLER.getDescendants(self.getUId()).map(function(uid) {
        return CONTROLLER.getLogicByUId(uid);
    });

    if (typeof filter == 'string') {
        for (var i = descendants.length - 1; i >= 0; i--) {
            if (descendants[i].whoIs() != filter) {
                descendants.splice(i, 1);
            };
        };
    };

    return descendants;
};

LogicMaster.prototype.checkDescendants = function(obj1, obj2) {
    var self = this;

    return CONTROLLER.checkDescendants(obj1.getUId(), obj2.getUId());
};

LogicMaster.prototype.destory = function() {
    var self = this;

    // ウィンドウを破棄
    self.getTarget().remove();

    // 中身を破棄
    for(var key in self) {
        self[key] = null;
        delete self[key];
    };

    return self;
};
