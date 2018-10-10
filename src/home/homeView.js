import Controul from "./controul";

export default class homeView extends Laya.Scene {
    constructor() {
        super()
    }
    onEnable() {
        homeView.zhi = this
        this._control = this.getComponent(Controul);
        this._control.enabled = false
        this.beginGame.on(Laya.Event.MOUSE_DOWN, this, function () {

            console.log(  this._control.enabled)
            this._control.enabled = true;
            console.log(  this._control.enabled)
        })
    }
    stopgame(){
        this._control.enabled = false
    }

}