import DataManage from "./DataManage";
import { ui } from "../ui/layaMaxUI";

export default class ShopPanel extends ui.StartSceneUI {
    constructor() {
        super();

    }


    onAwake(): void {
        this.Init();
        this.readConfigFile();
    }
    
    Init(): void {
        this.txt_coin.text = (DataManage.Instance().getCoinCount()).toString();
        this.shopSkin();
    }

    readConfigFile(): void {

        let xmlDom = Laya.loader.load(
            "res/CharactersSkinXml.xml", 
            null, 
            null,
            Laya.Loader.XML,
            )
        console.log("xmlDom", xmlDom);
        // let xmlDom = Laya.Utils.parseXMLFromString(_Res);

    }

    /**
     * 设置商品list的属性；
     */
    shopSkin(): void {
        this.lst_skin.repeatX = 3;
        this.lst_skin.spaceX = 450;
        this.lst_skin.selectedIndex = -1;

        this.lst_skin.elasticEnabled = false;
        this.lst_skin.selectEnable = true;
        this.lst_skin.visible = true;
    }
}