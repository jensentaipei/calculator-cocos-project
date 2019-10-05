cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.node.setPosition(cc.v2(230, 220));
        this.setKeyboard();
    },

    setKeyboard() {
        this.node.on("toggle", () => this.OnKeyboard());
    }
});
