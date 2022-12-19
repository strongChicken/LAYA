/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_shop from "./UI_shop";
import UI_turn from "./UI_turn";
import UI_skin from "./UI_skin";

export default class 02_ShopBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(UI_shop.URL, UI_shop);
		fgui.UIObjectFactory.setExtension(UI_turn.URL, UI_turn);
		fgui.UIObjectFactory.setExtension(UI_skin.URL, UI_skin);
	}
}