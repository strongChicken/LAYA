import DataManage from "./DataManage";
import { ui } from "../ui/layaMaxUI";

export default class ShopPanel extends ui.StartSceneUI {
    private _shop: fairygui.GComponent;
    constructor() {
        super();
        fairygui.UIPackage.loadPackage("res/UI/02-Shop", Laya.Handler.create(this, this.onUILoaded));
    }


    onAwake(): void {
    }


    onUILoaded():void {
        this._shop = fairygui.UIPackage.createObject("02-Shop", "shop").asCom;
        fairygui.GRoot.inst.addChild(this._shop);
        this.initWallet();
    }

    destroy(): void {
        fairygui.UIPackage.removePackage("02-shop");
    }
    
    initWallet(): void {
        // this.txt_coin.text = (DataManage.Instance().getCoinCount()).toString();
        this._shop.getChild("txt_wallet").text = "good";
        console.log(this._shop.getChild("txt_wallet"));
    }
}