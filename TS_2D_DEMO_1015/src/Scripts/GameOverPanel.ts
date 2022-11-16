export default class GameManager extends Laya.Script {
    constructor() {
        super();
        /** @prop {name: list, tips:"获取单元格",type:node} */
    }

    onAwake():void {
        Laya.stage.on("gameOver", this, function(){
            this.owner.visible = true;
        })
    }
}