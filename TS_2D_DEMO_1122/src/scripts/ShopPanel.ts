import DataManage from "./DataManage";
import JsonData from "./JsonData";
import ShopItem from "./shopItem";

export default class ShopPanel {
    private _shop: fairygui.GComponent;
    private _list: fairygui.GList;

    constructor() {
        fairygui.UIPackage.loadPackage("res/UI/02-Shop", Laya.Handler.create(this, this.onUILoaded));
    }


    onAwake(): void {
    }


    onUILoaded():void {
        fgui.UIObjectFactory.setExtension("ui://02-Shop/skin", ShopItem);

        this._shop = fairygui.UIPackage.createObject("02-Shop", "shop").asCom;
        fairygui.GRoot.inst.addChild(this._shop);

        this.initWallet();

        this._list = this._shop.getChild("lst_skin").asList;
        this.onloadJson();
    }

    onloadJson(): void {
        new JsonData("./Json/CharactersSkin.json", (jsonDate: Array<any>)=>{
            for(let i: number = 0; i < jsonDate.length; i++) {
                let item: ShopItem = <ShopItem>this._list.addItemFromPool();
                item.setName(jsonDate[i]["fiileName"]);
                item.setPrice(jsonDate[i]["price"]);
                item.setIcon(jsonDate[i]["path"]);
            }
            console.log("shopPanel get shopJson succee");
        });
    }

    destroy(): void {
        fairygui.UIPackage.removePackage("02-shop");
    }
    
    initWallet(): void {
        this._shop.getChild("txt_wallet").text = (DataManage.Instance().getCoinCount()).toString();
    }

}