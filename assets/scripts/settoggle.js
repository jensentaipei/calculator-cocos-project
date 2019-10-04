cc.Class({
    extends: cc.Component,

    properties: {
        normaltoggle: cc.Toggle,
        circletoggle: cc.Toggle,

    },

    onLoad() {
        this.node.setPosition(cc.v2(45, 250));
        this.setoggle();
    },

    setoggle() {
        this.normaltoggle.node.on("toggle", () => this.OnToggle());
        this.circletoggle.node.on("toggle", () => this.OnToggle());
    },
});
