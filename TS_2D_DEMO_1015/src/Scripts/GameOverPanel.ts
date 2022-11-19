export default class GameManager extends Laya.Script {
    constructor() {
        super();
        /** @prop {name: list, tips:"获取单元格",type:node} */
    }

    onAwake():void {
        this.owner.getChildByName("xxxxx").on(Laya.Event.CLICK, this, this.BtnRestartClick);
        var txt_Score = this.owner.getChildByName("txt_Score") as Laya.Text;

        Laya.stage.on("gameOver", this, function(score:number){
            this.owner.visible = true;
            txt_Score.text = "Score:" + score;
        })
    }
    BtnRestartClick():void {
        (this.owner as Laya.Sprite).visible = false;
        Laya.stage.event("Restart");
    }
}