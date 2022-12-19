/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_turn from "./UI_turn";

export default class UI_shop extends fgui.GComponent {

	public m_btn_left:UI_turn;
	public m_btn_right:UI_turn;
	public m_gup_turn:fgui.GGroup;
	public m_lst_skin:fgui.GList;
	public m_txt_wallet:fgui.GTextField;
	public m_btn_list:fgui.GButton;
	public static URL:string = "ui://g8qzh8ymvqps0";

	public static createInstance():UI_shop {
		return <UI_shop>(fgui.UIPackage.createObject("02-Shop", "shop"));
	}

	protected onConstruct():void {
		this.m_btn_left = <UI_turn>(this.getChild("btn_left"));
		this.m_btn_right = <UI_turn>(this.getChild("btn_right"));
		this.m_gup_turn = <fgui.GGroup>(this.getChild("gup-turn"));
		this.m_lst_skin = <fgui.GList>(this.getChild("lst_skin"));
		this.m_txt_wallet = <fgui.GTextField>(this.getChild("txt_wallet"));
		this.m_btn_list = <fgui.GButton>(this.getChild("btn_list"));
	}
}