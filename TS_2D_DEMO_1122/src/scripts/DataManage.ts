export default class DataManage extends Laya.Script {
    private static instance: DataManage;
    coinCount: number = Number(Laya.LocalStorage.getItem("CoinCount"));
    constructor() {
        super();
        if(Laya.LocalStorage.getItem("CoinCount") == null) {
            this.coinCount = 10;
        }
    }

    /**
     * state get Instance: DataManage    
     */
    static Instance(): DataManage {
        if (this.instance == null) {
            this.instance = new DataManage();
        }
        return this.instance;
    }

    /**
     * 返回金币数量
     * @returns type:numberm, tips:金币数量
     */
    getCoinCount(): number {
        return this.coinCount;
    }

    /**
     * 修改(增加)本地金币数量
     * @param value type: void
     */
    addCoinCount(value: number = 1): void {
        this.coinCount++;
        Laya.LocalStorage.setItem("CoinCount", String(this.coinCount));
    }
}
