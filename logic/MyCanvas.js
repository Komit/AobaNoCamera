var MyCanvas = function MyCanvas(canvas) {
    var self = this;

    self._canvas = (canvas && canvas.tagName === 'CANVAS') ? canvas : document.createElement('canvas');
    self._ctx    = self._canvas.getContext('2d');
    self._ratio  = self.getRatio();

    return this;
};

MyCanvas.prototype.getCanvas = function() {
    var self = this;

    return self._canvas;
};

MyCanvas.prototype.getRatio = function() {
    var self = this;

    return (window.devicePixelRatio || 1) / (self._ctx.backingStorePixelRatio || 1);
};

MyCanvas.prototype.init = function(width, height) {
    var self = this;

    self._ratio  = self.getRatio();

    self._canvas.width = width * self._ratio;
    self._canvas.height = height * self._ratio;

    self._ctx.globalAlpha = 1;

    self.clear();

    return self;
};

MyCanvas.prototype.clear = function(width, height) {
    var self = this;

    self._ctx.clearRect(0, 0, self._canvas.width, self._canvas.height);

    return self;
};


MyCanvas.prototype.setDisplaySize = function(width, height) {
    var self = this;

    self._ratio  = self.getRatio();

    self._canvas.style.width = ((isFinite(width)) ? width : self._canvas.width / self._ratio).toString() + 'px';
    self._canvas.style.height = ((isFinite(height)) ? height : self._canvas.height / self._ratio).toString() + 'px';

    return self;
};

MyCanvas.prototype.copyFromDataUrl = function(dataUrl, sx, sy, sw, sh, dx, dy, dw, dh, callback) {
    var self = this;

    var img = document.createElement('img');
    img.onload = function() {
        self.copyFromImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
        if (typeof callback === 'function') callback(self.getCanvas());
    };
    img.src = dataUrl;

    return self;
};

MyCanvas.prototype.copyFromImage = function(image, sx, sy, sw, sh, dx, dy, dw, dh) {
    var self = this;

    self._ctx.drawImage(
        image,
        sx * self._ratio,
        sy * self._ratio,
        sw * self._ratio,
        sh * self._ratio,
        dx * self._ratio,
        dy * self._ratio,
        dw * self._ratio,
        dh * self._ratio
    );

    return self;
};

MyCanvas.prototype.copyFromMyCanvas = function(mc, x, y, w, h) {
    var self = this;

    var img = mc._ctx.getImageData(
        x * self._ratio,
        y * self._ratio,
        w * self._ratio,
        h * self._ratio
    );
    self._ctx.putImageData(img, 0, 0);

    return self;
};

MyCanvas.prototype.setLine = function(sx, sy, dx, dy, width, color) {
    var self = this;

    self._ctx.strokeStyle = color;
    self._ctx.lineWidth = width * self._ratio;
    self._ctx.beginPath();
    self._ctx.moveTo(sx  * self._ratio, sy * self._ratio);
    self._ctx.lineTo(dx * self._ratio, dy * self._ratio);
    self._ctx.stroke();

    return self;
};

MyCanvas.prototype.setPolygon  = function(positions, color) {
    var self = this;

    self._ctx.fillStyle = color;
    self._ctx.beginPath();
    self._ctx.moveTo(positions[0][0] * self._ratio, positions[0][1] * self._ratio);
    for (var i = 1; i < positions.length; i++) {
        self._ctx.lineTo(positions[i][0] * self._ratio, positions[i][1] * self._ratio);
    }
    self._ctx.closePath();
    self._ctx.fill();

    return self;
};


MyCanvas.prototype.setMask = function(masks, dx, dy) {
    var self = this;

    if (!isFinite(dx)) dx = 0;
    if (!isFinite(dy)) dy = 0;

    for (var i = 0; i < masks.length; i++) {
        switch(masks[i].mode) {
            case 'draw':
                self._ctx.fillStyle = masks[i].color || '#000000';
                self._ctx.fillRect(
                    (masks[i].x + dx) * self._ratio,
                    (masks[i].y + dy) * self._ratio,
                    masks[i].w * self._ratio,
                    masks[i].h * self._ratio
                );
                break;
            case 'copy':
                var image = self._ctx.getImageData(
                    (masks[i].sx + dx) * self._ratio,
                    (masks[i].sy + dy) * self._ratio,
                    masks[i].w * self._ratio,
                    masks[i].h * self._ratio
                );
                self._ctx.putImageData(
                    image,
                    (masks[i].x + dx) * self._ratio,
                    (masks[i].y + dy) * self._ratio
                );
                break;
        };
    };

    return self;
};

MyCanvas.prototype.toPngFile = function(fileName) {
    var self = this;

    self._canvas.toBlobHD(function(blob) { saveAs(blob, fileName); }, 'image/png');

    /*
    var elm = document.createElement('a');
    elm.href = self._canvas.toDataURL('image/png');
    elm.download = fileName;
    elm.click();
    */

    return self;
};


MyCanvas.prototype.cutRadius = function(radiusArray) {
    var self = this;

    for (var i = 0; i < radiusArray.length; i++) {
        var lx = i * self._ratio;
        var rx = ((self._canvas.width / self._ratio - 1) - i) * self._ratio;
        var len = radiusArray[i] * self._ratio;
        var by = (self._canvas.height / self._ratio - radiusArray[i]) * self._ratio;

        self._ctx.clearRect(lx, 0, self._ratio, len);
        self._ctx.clearRect(rx, 0, self._ratio, len);
        self._ctx.clearRect(lx, by, self._ratio, len);
        self._ctx.clearRect(rx, by, self._ratio, len);
    };

    return self;
};
