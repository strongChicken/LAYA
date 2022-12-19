/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_skin extends fgui.GButton {

	public m_lo_skin:fgui.GLoader;
	public m_txt_price:fgui.GTextField;
	public m_txt_name:fgui.GTextField;
	public static URL:string = "ui://g8qzh8ymvqps2";

	public static createInstance():UI_skin {
		return <UI_skin>(fgui.UIPackage.createObject("02-Shop", "skin"));
	}

	protected onConstruct():void {
		this.m_lo_skin = <fgui.GLoader>(this.getChild("lo_skin"));
		this.m_txt_price = <fgui.GTextField>(this.getChild("txt_price"));
		this.m_txt_name = <fgui.GTextField>(this.getChild("txt_name"));
	}
}