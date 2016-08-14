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
            width:  800,
            height: 480,
        },
        formation: {
            left:   323,
            top:    100,
            width:  465,
            height: 365,
        },
        list: {
            left:   360,
            top:    98,
            width:  440,
            height: 364,
        },
		airservice: {
            left:   580,
            top:    133,
            width:  214,
            height: 326,
        },
        material: {
            left:   656,
            top:    10,
            width:  142,
            height: 58,
        },
        ship1: {
            left:   558,
            top:    110,
            width:  218,
            height: 300,
        },
        ship2: {
            left:   501,
            top:    92,
            width:  218,
            height: 300,
        },
        item: {
            left:   479,
            top:    118,
            width:  260,
            height: 260,
            radius: 8,
            radiusArray: [8, 6, 5, 4, 3, 2, 1, 1],
        },
    },
    mask: {
        header:         [
                            { mode: 'draw', color: '#252525', x: 113, y: 7, w: 168, h: 16 },
                        ],
        formation:      [
                            { mode: 'copy', sx: 0, sy:7, x: 0, y: 0, w: 7, h: 7, hidden: true },
                            { mode: 'copy', sx: 0, sy:349, x: 0, y: 358, w: 7, h: 7, hidden: true },
                        ],
        list:           [
                            { mode: 'copy', sx: 0, sy:8, x: 0, y: 0, w: 8, h: 8, hidden: true },
                            { mode: 'copy', sx: 0, sy:348, x: 0, y: 356, w: 8, h: 8, hidden: true },
                            { mode: 'copy', sx: 40, sy:0, x: 0, y: 0, w: 8, h: 2, hidden: true },
                        ],
        airservice:     [
                            { mode: 'copy', sx: 10, sy:0, x: 0, y: 0, w: 10, h: 6, hidden: true },
                            { mode: 'copy', sx: 10, sy:0, x: 210, y: 0, w: 5, h: 6, hidden: true },
                        ],
        material:       [
                            { mode: 'copy', sx: 6, sy:0, x: 0, y: 0, w: 6, h: 18, hidden: true },
                        ],
        headquarters:   [
                            { mode: 'draw', color: '#252525', x: 113, y: 8, w: 168, h: 16 },
                            { mode: 'copy', sx: 202, sy:103, x: 202, y: 125, w: 250, h: 21 },
                        ],
        ranking:        [
                            { mode: 'draw', color: '#252525', x: 113, y: 8, w: 168, h: 16 },
                            { mode: 'draw', color: '#383838', x: 228, y: 157, w: 145, h: 19 },
                            { mode: 'draw', color: '#383838', x: 228, y: 187, w: 145, h: 19 },
                            { mode: 'draw', color: '#383838', x: 228, y: 217, w: 145, h: 19 },
                            { mode: 'draw', color: '#383838', x: 228, y: 247, w: 145, h: 19 },
                            { mode: 'draw', color: '#383838', x: 228, y: 277, w: 145, h: 19 },
                            { mode: 'draw', color: '#383838', x: 228, y: 307, w: 145, h: 19 },
                            { mode: 'draw', color: '#383838', x: 228, y: 337, w: 145, h: 19 },
                            { mode: 'draw', color: '#383838', x: 228, y: 367, w: 145, h: 19 },
                            { mode: 'draw', color: '#383838', x: 228, y: 397, w: 145, h: 19 },
                            { mode: 'draw', color: '#383838', x: 228, y: 427, w: 145, h: 19 },
                        ],
        battleResult1:  [
                            { mode: 'draw', color: '#252c30', x: 92, y: 85, w: 168, h: 17 },
                        ],
        battleResult2:  [
                            { mode: 'draw', color: '#252c30', x: 60, y: 85, w: 168, h: 17 },
                        ],
    },
};
