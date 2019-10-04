cc.Class({
    extends: cc.Component,

    properties: {
        title: "",
    },

    onLoad() {
        this.buttonName().string = this.title;
        this.node.setPosition(this.setPos(this.title));
        this.setSize();
        this.setColor();
        this.setButtinEvent();
    },

    getButton() {
        return this.node.getComponent(cc.Button);
    },

    buttonName() {
        return this.getButton()
            .node.getChildByName("Background")
            .getChildByName("Label")
            .getComponent(cc.Label);
    },

    setSize() {
        if (this.title === "0") {
            this.node.setContentSize(212, 40);
        } else if (this.title === "←") {
            this.node.setContentSize(147, 40);
        }
    },

    setColor() {
        if (this.title === "=" || this.title === "+" || this.title === "-" || this.title === "x" || this.title === "÷") {
            this.node.getChildByName("Background")
            .color=new cc.color(255,100,38);
        }

    },

    setPos(title) {
        if (!isNaN(title)) {
            if (title === "0") {
                const dx = -91;
                const dy = -205;
                return cc.v2(dx, dy);
            } else {
                const dx = ((title - 1) % 3) * (113) + (-147);
                const dy = -150 + Math.floor((title - 1) / 3) * 55;
                return cc.v2(dx, dy);
            }
        } else {
            const dx = 113;
            const dy = 55;
            const column = ["=", "+", "-", "x", "÷"];
            const row = ["AC", "±", "%"];
            var zx;
            var zy;
            if (title === "=" || title === "+" || title === "-" || title === "x" || title === "÷") {
                zx = 3;
                for (let i = 0; i < column.length; i++) {
                    if (title === column[i]) {
                        zy = i - 1;
                    }
                }
            } else if (title === "AC" || title === "±" || title === "%") {
                zy = 3;
                for (let i = 0; i < row.length; i++) {
                    if (title === row[i]) {
                        zx = i;
                    }
                }
            } else if (title === ".") {
                zx = 2;
                zy = -1;
            } else if (title === "←") {
                return cc.v2(170.8, 66);
            }
            var randX = -147 + dx * zx;
            var randY = -150 + dy * zy;
            return cc.v2(randX, randY);
        }
    },

    setButtinEvent(){
        this.node.on("click",()=>this.whatInButton());
    },
});