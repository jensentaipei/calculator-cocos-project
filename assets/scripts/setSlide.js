cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.node.setPosition(cc.v2(280, -70));
        this.setSlide();
    },

    setSlide() {
        this.node.on('slide', () => this.OnSlide());
    }
});
