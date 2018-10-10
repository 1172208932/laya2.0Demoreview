import homeView from './homeView'
    export default class boxDown extends Laya.Script {
    constructor() {
        super()
    }
    onUpdate(){
        this.owner.rotation++;
    }
    onTriggerEnter(other, self, contact) {
        var owner = this.owner;
        owner.removeSelf();
        if (other.label === "groand") {
            owner.removeSelf();
            homeView.zhi.stopgame()
        }
    }
    onDisable() {
        Laya.Pool.recover("boxDown", this.owner);
    }
}