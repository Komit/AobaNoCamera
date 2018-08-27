var cnst = {
    setting: {
        defaultFileName: '青葉のカメラ(YYYY年MM月DD日 hh時mm分ss秒)',
        shutterSound: 'on',
        shutterFrame: 'on',
        hotKey: '{}',
    },
    size: {
        formation: {
            width: 160,
            height: 200,
        },
    },
    position: {
        standard: {
            left:   0,
            top:    0,
            width:  1200,
            height: 720,
        },
        formation: {
            left:   485,
            top:    151,
            width:  698,
            height: 548,
        },
        list: {
            left:   556,
            top:    147,
            width:  644,
            height: 546,
        },
        airservice: {
            left:   870,
            top:    200,
            width:  320,
            height: 490,
        },
        material1: {
            left:   984,
            top:    15,
            width:  213,
            height: 87,
        },
        material2: {
            left:   902,
            top:    15,
            width:  298,
            height: 87,
        },
        ship1: {
            left:   840,
            top:    166,
            width:  326,
            height: 450,
        },
        ship2: {
            left:   752,
            top:    138,
            width:  326,
            height: 450,
        },
        item: {
            left:   719,
            top:    177,
            width:  390,
            height: 390,
            radius: 12,
            radiusArray: [12, 9, 7.5, 6, 4.5, 3, 1.5, 1.5],
        },
    },
    mask: {
        header:         [
                            { mode: 'draw', color: '#252525', x: 170, y: 10, w: 232, h: 25 },
                        ],
        formation:      [
                            { mode: 'copy', sx: 0, sy:11, x: 0, y: 0, w: 11, h: 11, hidden: true },
                            { mode: 'copy', sx: 0, sy:524, x: 0, y: 537, w: 11, h: 11, hidden: true },
                        ],
        list:           [
                            { mode: 'copy', sx: 0, sy:12, x: 0, y: 0, w: 12, h: 12, hidden: true },
                            { mode: 'copy', sx: 0, sy:522, x: 0, y: 534, w: 12, h: 12, hidden: true },
                            { mode: 'copy', sx: 60, sy:0, x: 0, y: 0, w: 12, h: 3, hidden: true },
                        ],
        airservice:     [
                            { mode: 'copy', sx: 15, sy:0, x: 0, y: 0, w: 15, h: 9, hidden: true },
                            { mode: 'copy', sx: 15, sy:0, x: 315, y: 0, w: 8, h: 9, hidden: true },
                        ],
        material1:      [
                            { mode: 'copy', sx: 17, sy:0, x: 9, y: 0, w: 9, h: 24, hidden: true },
                            { mode: 'copy', sx: 17, sy:0, x: 0, y: 0, w: 9, h: 24, hidden: true },
                        ],
        headquarters:   [
                            { mode: 'draw', color: '#252525', x: 170, y: 10, w: 232, h: 25 },
                            { mode: 'copy', sx: 303, sy:155, x: 303, y: 188, w: 375, h: 32 },
                        ],
        ranking:        [
                            { mode: 'draw', color: '#252525', x: 170, y: 10, w: 232, h: 25 },
                            { mode: 'draw', color: '#383838', x: 342, y: 236, w: 218, h: 29 },
                            { mode: 'draw', color: '#383838', x: 342, y: 281, w: 218, h: 29 },
                            { mode: 'draw', color: '#383838', x: 342, y: 326, w: 218, h: 29 },
                            { mode: 'draw', color: '#383838', x: 342, y: 371, w: 218, h: 29 },
                            { mode: 'draw', color: '#383838', x: 342, y: 416, w: 218, h: 29 },
                            { mode: 'draw', color: '#383838', x: 342, y: 461, w: 218, h: 29 },
                            { mode: 'draw', color: '#383838', x: 342, y: 506, w: 218, h: 29 },
                            { mode: 'draw', color: '#383838', x: 342, y: 551, w: 218, h: 29 },
                            { mode: 'draw', color: '#383838', x: 342, y: 596, w: 218, h: 29 },
                            { mode: 'draw', color: '#383838', x: 342, y: 641, w: 218, h: 29 },
                        ],
        battleResult1:  [
                            { mode: 'draw', color: '#252c30', x: 138, y: 128, w: 232, h: 26 },
                        ],
        battleResult2:  [
                            { mode: 'draw', color: '#252c30', x: 86, y: 128, w: 232, h: 26 },
                        ],
    },
};
