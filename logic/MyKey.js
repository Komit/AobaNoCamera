var MyKey = function MyKey(callback) {
    var self = this;

    if (typeof callback === 'function') self._callback = callback;
    document.addEventListener('keydown', function(keyEvent) { self.downKey(keyEvent) }, false);

    return this;
};

MyKey.prototype.downKey = function(keyEvent) {
    var self = this;

    if (keyEvent.repeat === true) return self;

    var keyCode = keyEvent.keyCode;
    if (keyCode >= 96 && keyCode <= 105) keyCode -= 48;
    var key = (keyCode === 46 || keyCode === 32 || keyCode === 8) ? null : String.fromCharCode(keyCode);

    if (key !== null) {
        if (!key.match(/^[A-Z0-9]$/i)) return self;

        if (keyEvent.shiftKey === true) key = 'Shift+' + key;
        if (keyEvent.altKey === true)   key = 'Alt+' + key;
        if (keyEvent.ctrlKey === true)  key = 'Ctrl+' + key;
        if (keyEvent.metaKey === true)  key = 'Command+' + key;

    };

    if (self._callback !== undefined) self._callback(key);

    return self;
};
