/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_turn extends fgui.GButton {

	public m_turn:fgui.Controller;
	public static URL:string = "ui://g8qzh8ymvqps1";

	public static createInstance():UI_turn {
		return <UI_turn>(fgui.UIPackage.createObject("02-Shop", "turn"));
	}

	protected onConstruct():void {
		this.m_turn = this.getController("turn");
	}
}