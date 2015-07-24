var CONTROLLER = null;

$(function() {
    CONTROLLER = new Controller();

    CONTROLLER.loadFile(['logic/MyMenu.html'], function(){
        // メニューを作成
        var div = document.createElement('div');
        div.id = 'ancMenu_' + Date.now().toString();
        document.body.appendChild(div);
        CONTROLLER.createLogic(MyMenu, $('#' + div.id), CONTROLLER.getTemplate('logic/MyMenu.html'), null);
    });
});
