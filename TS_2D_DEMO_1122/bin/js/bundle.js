(function () {
    'use strict';

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
        }
    }
    GameConfig.width = 1920;
    GameConfig.height = 1080;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

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

    class JsonData extends Laya.Script {
        constructor(jsonUrl, callBack) {
            super();
            this.JsonData(jsonUrl);
            this.callBack = callBack;
        }
        JsonData(jsonUrl) {
            Laya.loader.load(jsonUrl, Laya.Handler.create(this, this.onLoadJson, [jsonUrl]), null, Laya.Loader.JSON);
        }
        onLoadJson(jsonUrl) {
            this.jsonData = Laya.Loader.getRes(jsonUrl);
            console.log("JsonData LoadJson: succee");
            this.callBack(this.jsonData);
        }
    }

    class ShopItem extends fgui.GButton {
        constructor() {
            super();
        }
        onConstruct() {
            this._ItemName = this.getChild("txt_name").asTextField;
            this._ItemPice = this.getChild("txt_price").asTextField;
            this._ItemIcon = this.getChild("lo_skin").asLoader;
        }
        setName(value) {
            this._ItemName.text = value;
        }
        setPrice(value) {
            this._ItemPice.text = value;
        }
        setIcon(value) {
            this._ItemIcon.url = value;
        }
    }

    class ShopPanel {
        constructor() {
            fairygui.UIPackage.loadPackage("res/UI/02-Shop", Laya.Handler.create(this, this.onUILoaded));
        }
        onAwake() {
        }
        onUILoaded() {
            fgui.UIObjectFactory.setExtension("ui://02-Shop/skin", ShopItem);
            this._shop = fairygui.UIPackage.createObject("02-Shop", "shop").asCom;
            fairygui.GRoot.inst.addChild(this._shop);
            this.initWallet();
            this._list = this._shop.getChild("lst_skin").asList;
            this.onloadJson();
        }
        onloadJson() {
            new JsonData("./Json/CharactersSkin.json", (jsonDate) => {
                for (let i = 0; i < jsonDate.length; i++) {
                    let item = this._list.addItemFromPool();
                    item.setName(jsonDate[i]["fiileName"]);
                    item.setPrice(jsonDate[i]["price"]);
                    item.setIcon(jsonDate[i]["path"]);
                }
                console.log("shopPanel get shopItem succee");
            });
        }
        destroy() {
            fairygui.UIPackage.removePackage("02-shop");
        }
        initWallet() {
            this._shop.getChild("txt_wallet").text = (DataManage.Instance().getCoinCount()).toString();
        }
    }

    class StartPanel {
        constructor() {
        }
        onAwake() {
        }
        StartButtonClick() {
            console.log("start");
        }
        ShopButtonClick() {
            console.log("shop");
        }
    }

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
            Laya.stage.addChild(fgui.GRoot.inst.displayObject);
            new ShopPanel();
            new StartPanel();
        }
    }
    new Main();

}());
