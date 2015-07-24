var hotKeys = {};

$(function(){
    var varlink = new Varlink('form', { default_select: 0 });

    chrome.storage.sync.get(cnst.setting, function(items) {
        varlink.set(items);
        hotKeys = JSON.parse(items.hotKey);
        sentHotKey();
    });

    $('#save').on('click', function() {
        var data = varlink.get();
        data.hotKey = JSON.stringify(hotKeys);
        chrome.storage.sync.set(data);
        window.close();
        return false;
    });

    $('.hotKey').on('mouseenter', function() {
        $('.hotKey').removeClass('selected');
        $(this).addClass('selected');
    }).on('mouseleave', function() {
        $(this).removeClass('selected');
    });

    new MyKey(function(key) {
        var elm = document.querySelector('.hotKey.selected');
        if (elm !== null) {
            var target = elm.dataset.hotKey;
            if (target !== undefined) {
                for (var k in hotKeys) {
                    if (hotKeys[k] === target) delete hotKeys[k];
                };
                if (key !== null) hotKeys[key] = target;
                sentHotKey();
            };
        };
    });
});

var sentHotKey = function() {
    var elms = document.getElementsByClassName('hotKey');
    for (var i = 0; i < elms.length; i++) {
        elms[i].innerHTML = '&nbsp;';
    };

    for (var k in hotKeys) {
        var elm = document.querySelector('[data-hot-key="' + hotKeys[k] + '"]');
        if (elm !== null) elm.innerHTML = k;
    };
};
