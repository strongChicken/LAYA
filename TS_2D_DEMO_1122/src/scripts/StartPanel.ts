export default class StartPanel extends Laya.Script {
    constructor() {
        super();
    }

    onAwake(): void {
        this.owner.getChildByName("btn_start").on(Laya.Event.CLICK, this, this.StartButtonClick);
        this.owner.getChildByName("btn_shop").on(Laya.Event.CLICK, this, this.ShopButtonClick);
    }

    StartButtonClick(): void {
        console.log("start");
    }

    ShopButtonClick(): void {
        console.log("shop");
    }
}