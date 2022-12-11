(function () {
    'use strict';

    class StartPanel extends Laya.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.owner.getChildByName("btn_start").on(Laya.Event.CLICK, this, this.StartButtonClick);
            this.owner.getChildByName("btn_shop").on(Laya.Event.CLICK, this, this.ShopButtonClick);
        }
        StartButtonClick() {
            console.log("start");
        }
        ShopButtonClick() {
            console.log("shop");
        }
    }

    class DataManage extends Laya.Script {
        constructor() {
            super();
            this.coinCount = Number(Laya.LocalStorage.getItem("CoinCount"));
            if (Laya.LocalStorage.getItem("CoinCount") == null) {
                this.coinCount = 10;
            }
        }
        static Instance() {
            if (this.instance == null) {
                this.instance = new DataManage();
            }
            return this.instance;
        }
        getCoinCount() {
            return this.coinCount;
        }
        addCoinCount(value = 1) {
            this.coinCount++;
            Laya.LocalStorage.setItem("CoinCount", String(this.coinCount));
        }
    }

    var Scene = Laya.Scene;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        class shopPanelUI extends Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.createView(shopPanelUI.uiView);
            }
        }
        shopPanelUI.uiView = { "type": "Scene", "props": { "width": 1920, "height": 1080 }, "compId": 2, "child": [{ "type": "Sprite", "props": { "name": "startPanel" }, "compId": 9, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1920, "skin": "User Interface/bg02.png", "name": "bg", "height": 1080 }, "compId": 3 }, { "type": "Image", "props": { "y": 290, "x": 0, "width": 799, "skin": "User Interface/Tittle.png", "name": "title", "height": 369 }, "compId": 4 }, { "type": "Button", "props": { "y": 406, "x": 1314, "width": 530, "stateNum": 1, "skin": "User Interface/btn02.png", "name": "btn_start", "labelSize": 40, "label": "开始游戏", "height": 137 }, "compId": 7 }, { "type": "Button", "props": { "y": 576, "x": 1357, "width": 444, "stateNum": 1, "skin": "User Interface/btn02.png", "name": "btn_shop", "labelSize": 40, "label": "进入商店", "height": 83 }, "compId": 8 }, { "type": "Script", "props": { "runtime": "scripts/StartPanel.ts" }, "compId": 10 }] }, { "type": "Sprite", "props": { "name": "shopPanel" }, "compId": 17, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1920, "skin": "User Interface/bg01.png", "name": "bg", "height": 1080 }, "compId": 11 }, { "type": "Image", "props": { "y": 12, "x": 16, "width": 99, "skin": "User Interface/op2.png", "name": "coin", "height": 99 }, "compId": 12, "child": [{ "type": "Text", "props": { "y": 0, "x": 99, "width": 293, "var": "txt_coin", "valign": "middle", "text": "0", "name": "txt_coin", "height": 97, "fontSize": 90, "color": "#e2e2e2", "align": "center", "runtime": "Laya.Text" }, "compId": 13 }] }, { "type": "Image", "props": { "y": 0, "x": 542, "skin": "User Interface/RibonTitle.png", "name": "prop" }, "compId": 14, "child": [{ "type": "Text", "props": { "y": 11, "x": 117, "width": 580, "valign": "middle", "text": "道具", "name": "txt_prop", "height": 89, "fontSize": 80, "align": "center", "runtime": "Laya.Text" }, "compId": 15 }] }, { "type": "Button", "props": { "y": 17, "x": 1797, "width": 102, "stateNum": 1, "skin": "User Interface/MenuBtn.png", "name": "btn_menu", "label": "label", "height": 102 }, "compId": 16 }, { "type": "List", "props": { "y": 257, "x": 278.5, "spaceX": 150, "repeatX": 3, "name": "lst_skin" }, "compId": 26, "child": [{ "type": "Box", "props": { "renderType": "render", "name": "box_skin" }, "compId": 24, "child": [{ "type": "Image", "props": { "skin": "User Interface/boxStat.png", "name": "bg_skin" }, "compId": 18, "child": [{ "type": "Image", "props": { "y": 175.5, "x": 38.5, "width": 270, "skin": "CharacterSkin/1.png", "name": "img_skin", "height": 270 }, "compId": 19 }, { "type": "Image", "props": { "y": 41, "x": 201, "skin": "User Interface/YesBtn.png", "name": "img_choice" }, "compId": 20 }, { "type": "Image", "props": { "y": 504, "x": 68, "width": 78, "skin": "Items/Coin/1.png", "height": 81 }, "compId": 21, "child": [{ "type": "Text", "props": { "y": 13, "x": 70, "width": 187, "valign": "middle", "text": "9999", "name": "txt_price", "height": 55, "fontSize": 40, "color": "#e0e0e0", "align": "left", "runtime": "Laya.Text" }, "compId": 22 }] }, { "type": "Text", "props": { "y": 428, "x": 75.5, "width": 196, "valign": "middle", "text": "name", "name": "txt_name", "height": 68, "fontSize": 70, "color": "#e5e5e5", "align": "center", "runtime": "Laya.Text" }, "compId": 23 }] }] }] }, { "type": "Script", "props": { "txt_Coin": "@node:13", "runtime": "scripts/ShopPanel.ts" }, "compId": 29 }] }, { "type": "Button", "props": { "y": 449, "x": 50, "width": 118, "stateNum": 1, "skin": "User Interface/LeftArrow.png", "name": "btn_left", "height": 182 }, "compId": 27 }, { "type": "Button", "props": { "y": 449, "x": 1714, "width": 118, "stateNum": 1, "skin": "User Interface/RightArrow.png", "name": "btn_right", "height": 182 }, "compId": 28 }], "loadList": ["User Interface/bg02.png", "User Interface/Tittle.png", "User Interface/btn02.png", "User Interface/bg01.png", "User Interface/op2.png", "User Interface/RibonTitle.png", "User Interface/MenuBtn.png", "User Interface/boxStat.png", "CharacterSkin/1.png", "User Interface/YesBtn.png", "Items/Coin/1.png", "User Interface/LeftArrow.png", "User Interface/RightArrow.png"], "loadList3D": [] };
        ui.shopPanelUI = shopPanelUI;
        REG("ui.StartSceneUI", shopPanelUI);
    })(ui || (ui = {}));

    class ShopPanel extends ui.shopPanelUI {
        constructor() {
            super();
        }
        onAwake() {
            this.Init();
            this.readConfigFile();
        }
        Init() {
            this.txt_coin.text = String(DataManage.Instance().getCoinCount);
        }
        readConfigFile() {
            let XmlRead = Laya.loader.load("res/CharactersSkin.csv", Laya.Handler.create(this, function (configFile) {
                console.log(configFile);
            }));
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("scripts/StartPanel.ts", StartPanel);
            reg("scripts/ShopPanel.ts", ShopPanel);
        }
    }
    GameConfig.width = 1920;
    GameConfig.height = 1080;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "StartScene.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
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
            Laya.stage.addChild(new ShopPanel());
        }
    }
    new Main();

}());
