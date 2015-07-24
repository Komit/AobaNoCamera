var MyFrame = function MyFrame() {
    var self = this;

    self.init();

    return this;
};

MyFrame.prototype.init = function() {
    var self = this;

    self._div                 = document.createElement('div');
    self._div.id              = 'ancShutterFrame_' + Date.now().toString();
    self._div.style.width     = '0px';
    self._div.style.height    = '0px';
    self._div.style.top       = '-1px';
    self._div.style.left      = '-1px';
    self._div.style.position  = 'absolute';
    self._div.style.border    = 'red solid 5px';
    self._div.style.zIndex    = '2147483630';
    self._div.style.padding   = '0px';
    self._div.style.margin    = '0px';
    self._div.style.display   = 'none';

    document.body.appendChild(self._div);

    return self;
};

MyFrame.prototype.set = function(left, top, width, height, radius) {
    var self = this;

    self._div.style.left    = left.toString() + 'px';
    self._div.style.top     = top.toString() + 'px';
    self._div.style.width   = width.toString() + 'px';
    self._div.style.height  = height.toString() + 'px';
    self._div.style.borderRadius = ((radius === undefined) ? 0 : radius).toString() + 'px';
    self._div.innerHTML     = '';

    return self;
};

MyFrame.prototype.show = function(flag) {
    var self = this;

    self._div.style.display = (flag === true) ? 'block' : 'none';

    return self;
};

MyFrame.prototype.setMask = function(masks) {
    var self = this;

    for (var i = 0; i < masks.length; i++) {
        if (masks[i].hidden !== true) {
            var data  = {
                x:      0,
                y:      0,
                w:      masks[i].w,
                h:      masks[i].h,
                mode:   'draw',
                color:  'red',
            };

            var canvas = new MyCanvas().init(data.w, data.h).setMask([data]).getCanvas();
            canvas.style.zIndex     = 2147483631;
            canvas.style.position   = 'absolute';
            canvas.style.left       = masks[i].x.toString() + 'px';
            canvas.style.top        = masks[i].y.toString() + 'px';
            canvas.style.width      = masks[i].w.toString() + 'px';
            canvas.style.height     = masks[i].h.toString() + 'px';

            self._div.appendChild(canvas);
        };
    };

    return self;
};

