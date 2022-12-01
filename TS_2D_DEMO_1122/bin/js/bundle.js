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
            console.log("getCoinCount:", this.coinCount);
            return this.coinCount;
        }
        addCoinCount(value = 1) {
            this.coinCount++;
            Laya.LocalStorage.setItem("CoinCount", String(this.coinCount));
        }
    }

    class ShopPanel extends Laya.Script {
        constructor() {
            super();
        }
        onAwake() {
            this.Init();
            this.readConfigFile();
        }
        Init() {
            this.txt_coin = new Laya.Text();
            console.log("txt_coin:", DataManage.Instance().getCoinCount());
            this.txt_coin.text = String(DataManage.Instance().getCoinCount());
            console.log("text:", this.txt_coin.text);
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
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
