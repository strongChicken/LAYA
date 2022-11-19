(function () {
    'use strict';

    class GameManager extends Laya.Script {
        constructor() {
            super();
            this.downPos = new Laya.Point;
            this.list = new Laya.List();
            this.list = null;
            this.numberArr = new Array(4);
            this.cardArr = new Array(4);
        }
        onAwake() {
            console.log(Laya.stage);
            for (let i = 0; i < 4; i++) {
                this.numberArr[i] = new Array(4);
                for (let j = 0; j < 4; j++) {
                    this.numberArr[i][j] = 0;
                }
            }
            for (let i = 0; i < 4; i++) {
                this.cardArr[i] = new Array(4);
                for (let j = 0; j < 4; j++) {
                    this.cardArr[i][j] = null;
                }
            }
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseUp);
            this.LoadTexture();
        }
        mouseDown() {
            this.downPos.x = Laya.stage.mouseX;
            this.downPos.y = Laya.stage.mouseY;
        }
        mouseUp() {
            var diffX = Laya.stage.mouseX - this.downPos.x;
            var diffY = Laya.stage.mouseY - this.downPos.y;
            if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
                if (this.IsMoveLeft()) {
                    this.MoveLeft();
                    this.CreateNumberCard();
                    console.log("left");
                }
            }
            if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
                if (this.IsMoveRight()) {
                    this.MoveRight();
                    this.CreateNumberCard();
                    console.log("right");
                }
                else {
                    console.log("cant right");
                }
            }
            if (diffY < 0 && Math.abs(diffX) < Math.abs(diffY)) {
                console.log("up");
            }
            if (diffY > 0 && Math.abs(diffX) < Math.abs(diffY)) {
                console.log("IsMoveRight:", this.IsMoveRight());
                if (this.IsMoveDown()) {
                    this.MoveDown();
                    this.CreateNumberCard();
                    console.log("down");
                }
            }
            Laya.stage.event("gameove");
        }
        IsMoveRight() {
            for (let i = 3; i >= 0; i--) {
                for (let j = 2; j >= 0; j--) {
                    if (this.numberArr[i][j] != 0) {
                        if (this.numberArr[i][j + 1] == 0 || this.numberArr[i][j + 1] == this.numberArr[i][j]) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        IsMoveLeft() {
            for (let i = 3; i >= 0; i--) {
                for (let j = 1; j <= 3; j++) {
                    if (this.numberArr[i][j] != 0) {
                        if (this.numberArr[i][j - 1] == 0 || this.numberArr[i][j - 1] == this.numberArr[i][j]) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        IsMoveDown() {
            for (let j = 3; j >= 0; j--) {
                for (let i = 2; i >= 0; i--) {
                    if (this.numberArr[i][j] != 0) {
                        if (this.numberArr[i][j + 1] == 0 || this.numberArr[i + 1][j] == this.numberArr[i][j]) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        MoveRight() {
            for (let i = 3; i >= 0; i--) {
                for (let j = 2; j >= 0; j--) {
                    if (this.numberArr[i][j] != 0) {
                        for (let k = 3; k > j; k--) {
                            if (this.numberArr[i][k] == 0 && this.IsMoveRightMid(i, j, k)) {
                                this.Horizontal_Func1(i, j, k);
                                continue;
                            }
                            if (this.numberArr[i][k] == this.numberArr[i][j] && this.IsMoveRightMid(i, j, k)) {
                                this.Horizontal_Func2(i, j, k);
                            }
                        }
                    }
                }
            }
        }
        MoveLeft() {
            for (let i = 3; i >= 0; i--) {
                for (let j = 0; j <= 3; j++) {
                    if (this.numberArr[i][j] != 0) {
                        for (let k = 0; k < j; k++) {
                            if (this.numberArr[i][k] == 0 && this.IsMoveRightMid(i, j, k)) {
                                this.Horizontal_Func1(i, j, k);
                                continue;
                            }
                            if (this.numberArr[i][k] == this.numberArr[i][j] && this.IsMoveRightMid(i, j, k)) {
                                this.Horizontal_Func2(i, j, k);
                            }
                        }
                    }
                }
            }
        }
        MoveDown() {
            console.log("arr:", this.numberArr);
            for (let j = 3; j >= 0; j--) {
                for (let i = 0; i <= 3; i++) {
                    if (this.numberArr[i][j] != 0) {
                        for (let k = 3; k > i; k--) {
                            if (this.numberArr[k][j] == 0 && this.IsMoveDownMid(j, i, k)) {
                                if (this.cardArr[i][j] != null) {
                                    this.cardArr[k][j] = this.cardArr[j][i];
                                    this.cardArr[i][j] = null;
                                    var point = this.GetGlobalPos(k * 4 + j);
                                    Laya.Tween.to(this.cardArr[k][j], { x: point.x + 77, y: point.y + 77 }, Math.abs(point.x - this.cardArr[k][j].x) / 10);
                                }
                                this.numberArr[k][j] = this.numberArr[i][j];
                                this.numberArr[i][j] = 0;
                                continue;
                            }
                            if (this.numberArr[k][j] == this.numberArr[i][j] && this.IsMoveDownMid(i, j, k)) {
                                this.numberArr[k][j] *= 2;
                                this.numberArr[i][j] = 0;
                                if (this.cardArr[i][j] != null && this.cardArr[k][j] != null) {
                                    this.cardArr[k][j].destroy();
                                    this.cardArr[k][j] = this.cardArr[i][j];
                                    this.cardArr[i][j] = null;
                                    var point = this.GetGlobalPos(k * 4 + j);
                                    Laya.Tween.to(this.cardArr[k][j], { x: point.x + 77, y: point.y + 77 }, Math.abs(point.x - this.cardArr[k][j].x) / 10, null, Laya.Handler.create(this, this.ChangeImage, [k, j]));
                                }
                            }
                        }
                    }
                }
            }
        }
        ChangeImage(row, col) {
            console.log("numberArr[row][col]:", this.numberArr[row][col]);
            this.cardArr[row][col].skin = Laya.loader.getRes("images/2048Atlas_" + this.numberArr[row][col] + ".png");
            console.log(this.cardArr[row][col]);
        }
        IsMoveRightMid(row, j, k) {
            for (let i = j + 1; i < k; i++) {
                if (this.numberArr[row][i] != 0) {
                    return false;
                }
            }
            return true;
        }
        IsMoveLeftMid(row, j, k) {
            for (let i = j - 1; i > k; i--) {
                if (this.numberArr[row][i] != 0) {
                    return false;
                }
            }
            return true;
        }
        IsMoveDownMid(row, j, k) {
            for (let i = row + 1; i < k; i++) {
                if (this.numberArr[i][j] != 0) {
                    return false;
                }
            }
            return true;
        }
        Horizontal_Func1(i, j, k) {
            if (this.numberArr[i][k] == 0 && this.IsMoveRightMid(i, j, k)) {
                if (this.cardArr[i][j] != null) {
                    this.cardArr[i][k] = this.cardArr[i][j];
                    this.cardArr[i][j] = null;
                    var point = this.GetGlobalPos(i * 4 + k);
                    Laya.Tween.to(this.cardArr[i][k], { x: point.x + 77, y: point.y + 77 }, Math.abs(point.x - this.cardArr[i][k].x));
                }
                this.numberArr[i][k] = this.numberArr[i][j];
                this.numberArr[i][j] = 0;
            }
        }
        Horizontal_Func2(i, j, k) {
            this.numberArr[i][k] *= 2;
            this.numberArr[i][j] = 0;
            if (this.cardArr[i][k] != null && this.cardArr[i][j] != null) {
                this.cardArr[i][k].destroy();
                this.cardArr[i][k] = this.cardArr[i][j];
                this.cardArr[i][j] = null;
                var point = this.GetGlobalPos(i * 4 + k);
                Laya.Tween.to(this.cardArr[i][k], { x: point.x + 77, y: point.y + 77 }, Math.abs(point.x - this.cardArr[i][k].x) / 10, null, Laya.Handler.create(this, this.ChangeImage, [i, k]));
            }
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
                this.CreateNumberCard();
                this.CreateNumberCard();
            }));
        }
        CreateNumberCard() {
            var index = this.GetRandomNullIndex();
            if (index == -1) {
                return;
            }
            var valueArr = [2, 4];
            var cardValue = valueArr[this.GetRandom(0, valueArr.length - 1)];
            var dialog = new Laya.Image("images/2048Atlas_" + cardValue + ".png");
            Laya.stage.addChild(dialog);
            var point = this.GetGlobalPos(index);
            dialog.pos(point.x + 77, point.y + 77);
            dialog.scale(0, 0);
            dialog.pivot(dialog.width / 2, dialog.height / 2);
            Laya.Tween.to(dialog, { scaleX: 1.2, scaleY: 1.2 }, 100, Laya.Ease.quartInOut);
            var row = parseInt(String(index / 4));
            var col = index % 4;
            this.numberArr[row][col] = cardValue;
            this.cardArr[row][col] = dialog;
        }
        GetGlobalPos(index) {
            var cell = this.list.getCell(index);
            var point = this.list.localToGlobal(new Laya.Point(cell.x, cell.y));
            return point;
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
