import Zidan from './zidan';
import BoxDown from './boxDown'
export default class controul extends Laya.Script {
    /** @prop {name:zidan,tips:"子弹预制体对象",type:Prefab}*/
    /** @prop {name:boxDown,tips:"子弹预制体对象",type:Prefab}*/
    
    constructor() {
        super()
    }
    onEnable() {
        this._time = Date.now();
        this.createBoxInterval = 1000;
        this._gameBox = this.owner.getChildByName("gamebox");
    }
    onUpdate() {
        let now = Date.now();
        if (now - this._time > this.createBoxInterval) {
            this._time = now;
            this.createBox();
        }
    }

    createBox() {
        let box = Laya.Pool.getItemByCreateFun("boxDown", this.boxDown.create, this.boxDown);
        box.pos(Math.random() * (Laya.stage.width - 100), -100);
        this._gameBox.addChild(box);
    }
    onStageClick(e) {
        // this.enabled = true;        
        e.stopPropagation();
        let fly = Laya.Pool.getItemByCreateFun('zidan', this.zidan.create, this.zidan)
        fly.pos(Laya.stage.mouseX, Laya.stage.mouseY);
        this._gameBox.addChild(fly);
    }
}