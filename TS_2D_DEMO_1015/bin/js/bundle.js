(function () {
    'use strict';

    class GameManager extends Laya.Script {
        constructor() {
            super();
            this.list = new Laya.List();
            this.list = null;
            this.numberArr = new Array(4);
        }
        onAwake() {
            for (let i = 0; i < 4; i++) {
                this.numberArr[i] = new Array(4);
                for (let j = 0; j < 4; j++) {
                    this.numberArr[i][j] = 0;
                }
            }
            this.CreateNumberCard();
            this.CreateNumberCard();
            this.LoadTexture();
        }
        LoadTexture() {
            var resArr = [
                { url: "images/2048Atlas_2.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_4.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_8.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_16.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_32.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_64.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_128.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_256.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_512.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_1024.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_2048.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_4096.png", type: Laya.Loader.IMAGE },
                { url: "images/2048Atlas_8192.png", type: Laya.Loader.IMAGE },
            ];
            Laya.loader.load(resArr, Laya.Handler.create(this, function (result) {
                console.log(result);
            }));
        }
        CreateNumberCard() {
            var index = this.GetRandomNullIndex();
            if (index == -1) {
                return;
            }
            var cell = this.list.getCell(index);
            var row = parseInt(String(index / 4));
            var col = index % 4;
            var dialog = new Laya.Image("images/2048Atlas_" + 2 + ".png");
            Laya.stage.addChild(dialog);
            var point = this.list.localToGlobal(new Laya.Point(cell.x, cell.y));
            dialog.pos(point.x, point.y);
            dialog.scale(1.2, 1.2);
        }
        GetRandomNullIndex() {
            var arr = [];
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (this.numberArr[i][j] == 0) {
                        arr.push(i * 4 + j);
                    }
                }
            }
            if (arr.length == 0) {
                return -1;
            }
            var index = arr[this.GetRandom(0, arr.length - 1)];
            return index;
        }
        GetRandom(min, max) {
            let value = Math.random() * (max - min);
            let seed = Math.round(value);
            return seed + min;
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Scripts/GameManager.ts", GameManager);
        }
    }
    GameConfig.width = 750;
    GameConfig.height = 1334;
    GameConfig.scaleMode = "fixedauto";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "Main.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = true;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
