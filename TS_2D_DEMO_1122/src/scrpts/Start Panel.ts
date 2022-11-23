export default class StartPanel extends Laya.Script {
    constructor() {
        super();
    }

    OnAwake():void {
        this.owner.getChildByName("btn_Start").on(Laya.Event.CLICK, this, this.StartButtnOnClick);
        this.owner.getChildByName("btn_Start").on(Laya.Event.CLICK, this, this.ShopButtnOnClike);
    }

    StartButtnOnClick():void {
        console.log("start game");
    }

    ShopButtnOnClike():void {
        console.log("shop");
    }
}