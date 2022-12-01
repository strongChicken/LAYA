import DataManage from "./DataManage";

export default class ShopPanel extends Laya.Script {
    /** @prop {name: txt_Coin, tip:"金币显示文本", type:Node, default:null} */
    txt_coin: Laya.Text;
    constructor() {
        super();
    }

    onAwake(): void {  // 试过onStart，onEnable也不行
        this.Init();
        this.readConfigFile();
    }
    
    Init(): void {
        this.txt_coin = new Laya.Text();
        console.log("txt_coin:", DataManage.Instance().getCoinCount());     // 10
        this.txt_coin.text = String(DataManage.Instance().getCoinCount());  // BUG：无法显示
        console.log("text:", this.txt_coin.text);   // 10
    }


    readConfigFile(): void {
        let XmlRead = Laya.loader.load("res/CharactersSkin.csv", Laya.Handler.create(this, function(configFile){
            console.log(configFile);
        }))
    }
}