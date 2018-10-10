export default class Zidan extends Laya.Script{
    constructor(){super()}
    onEnable(){
        var sudo = this.owner.getComponent(Laya.RigidBody)
        sudo.setVelocity({x:0,y:-10})
    }
    onTriggerEnter(other, self, contact) {
        this.owner.removeSelf();
    }

    onUpdate() {
        if (this.owner.y < -10) {
            this.owner.removeSelf();
        }
    }
    onDisable() {
        Laya.Pool.recover("zidan", this.owner);
    }
  
}