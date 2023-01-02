export default class ShopItem extends fgui.GButton {

    private _ItemName: fgui.GTextField;
    private _ItemPice: fgui.GTextField;
    private _ItemIcon: fgui.GLoader;

    constructor() {
        super();
    }

    protected onConstruct(): void {
        this._ItemName = this.getChild("txt_name").asTextField;
        this._ItemPice = this.getChild("txt_price").asTextField;
        this._ItemIcon = this.getChild("lo_skin").asLoader;
    }


    public setName(value: string): void {
        this._ItemName.text = value;
    }

    public setPrice(value: string): void {
        this._ItemPice.text =value;
    }

    public setIcon(value: string): void {
        this._ItemIcon.url = value;
    }

}