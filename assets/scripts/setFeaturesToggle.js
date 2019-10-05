cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.node.setPosition(cc.v2(230, 180));
        this.setToggle();
    },

    setToggle() {
        this.node.on("toggle", () => this.OnSwitch());
    }

});
