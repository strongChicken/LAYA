export default class JsonData extends Laya.Script {
    jsonData: Array<any>;
    callBack: Function;

    public constructor(jsonUrl: string, callBack: Function) {
        super();
        this.JsonData(jsonUrl);
        this.callBack = callBack;
    }

    private JsonData(jsonUrl:string): void {
        Laya.loader.load(jsonUrl, Laya.Handler.create(this, this.onLoadJson, [jsonUrl]), null, Laya.Loader.JSON)
    }

    private onLoadJson(jsonUrl: string): void {
        this.jsonData = Laya.Loader.getRes(jsonUrl);
        console.log("JsonData LoadJson: succee");

        this.callBack(this.jsonData);
    }

}