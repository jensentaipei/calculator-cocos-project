cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        this.node.getChildByName("ScoreDisplay").setPosition(cc.v2(22, 130));
        this.node.getChildByName("KeyBoard").setPosition(cc.v2(150,220));
        this.node.getChildByName("Features").setPosition(cc.v2(150,180));
    },
});
