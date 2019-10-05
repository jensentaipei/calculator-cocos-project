cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.node.setPosition(cc.v2(230, 140));
        this.setToggle();
    },

    setToggle() {
        this.node.on("toggle", () => this.OnScoreColor());
    }

});
