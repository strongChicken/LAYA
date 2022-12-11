import DataManage from "./DataManage";
import { ui } from "../ui/layaMaxUI";

export default class ShopPanel extends ui.shopPanelUI {
    constructor() {
        super();

    }


    onAwake(): void {
        this.Init();
        this.readConfigFile();
    }
    
    Init(): void {
        this.txt_coin.text = String(DataManage.Instance().getCoinCount)
    }


    readConfigFile(): void {
        let XmlRead = Laya.loader.load("res/CharactersSkin.csv", Laya.Handler.create(this, function(configFile){
            console.log(configFile);
        }))
    }


}