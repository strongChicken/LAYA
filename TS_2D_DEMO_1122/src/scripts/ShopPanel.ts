import DataManage from "./DataManage";
import { ui } from "../ui/layaMaxUI";
import { fgui } from "../../bin/fgui/fairygui";

export default class ShopPanel extends ui.StartSceneUI {
    private _view: fgui.GComponent;

    constructor() {
        super();
        fgui.UIPackage.addPackage("res/UI/02-Shop", Laya.Handler.create(this, this.onUILoaded));;
    }


    onAwake(): void {
        this.initWallet();
    }


    onUILoaded():void {
        this._view = fgui.UIPackage.createObject("02-Shop", "shop").asCom;
        fgui.GRoot.inst.addChild(this._view);
    }

    destroy(): void {
        fgui.UIPackage.removePackage("02-shop");
    }
    
    initWallet(): void {
        // this.txt_coin.text = (DataManage.Instance().getCoinCount()).toString();
        this._view.getChild("txt_wallet").text = (DataManage.Instance().getCoinCount()).toString();
        
    }
}