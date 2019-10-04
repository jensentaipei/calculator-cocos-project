cc.Class({
    extends: cc.Component,

    properties: {
        ButtonPrefab: {
            default: null,
            type: cc.Prefab
        },
        ScoreDisplayPrefab: {
            default: null,
            type: cc.Prefab
        },
        changetoggle: {
            default: null,
            type: cc.Prefab
        },
        normal: {
            default: null,
            type: cc.SpriteFrame
        },
        normalCircle: {
            default: null,
            type: cc.SpriteFrame
        },
        press: {
            default: null,
            type: cc.SpriteFrame
        },
        pressCircle: {
            default: null,
            type: cc.SpriteFrame
        },
    },

    onLoad() {
        this.insScoreDisplay();
        this.insNumButton();
        this.insCalButton();
        this.insToggle();
        //set string
        this.showScore = this.node.getChildByName("ScoreDisplay").getComponent(cc.Label);
        this.showScore.string = "0";
        //calculator state
        this.state = "=";
        //temp last print
        this.templast = "";
        //check operation
        this.checkOper = false;
        //score
        this.score = 0;
        //NaN
        this.ifNaN = false;
    },

    insScoreDisplay() {
        let score = cc.instantiate(this.ScoreDisplayPrefab);
        this.node.addChild(score);
    },

    insNumButton() {
        for (let i = 0; i <= 9; i++) {
            let setNumberButton = cc.instantiate(this.ButtonPrefab);
            let numberButton = setNumberButton.getComponent("setbutton");
            numberButton.title = i.toString();
            setNumberButton.name = i.toString();
            numberButton.whatInButton = () => this.process(numberButton.title);
            this.node.addChild(setNumberButton);
        }
    },

    insCalButton() {
        const calArray = [".", "=", "+", "-", "x", "÷", "%", "±", "AC", "←"];
        for (let i = 0; i < calArray.length; i++) {
            let setCalButton = cc.instantiate(this.ButtonPrefab);
            let calButton = setCalButton.getComponent("setbutton");
            calButton.title = calArray[i];
            setCalButton.name = calArray[i];
            calButton.whatInButton = () => this.process(calButton.title);
            this.node.addChild(setCalButton);
        }
    },

    insToggle() {
        let styletoggle = cc.instantiate(this.changetoggle);
        let set_toggle = styletoggle.getComponent("settoggle");
        set_toggle.OnToggle = () => this.compareToggle();
        this.node.addChild(styletoggle);
    },

    process(msg) {
        var value = parseInt(msg);
        if (!isNaN(value)) {
            this.inputNumber(msg);
        } else if (msg === "." || msg === "%" || msg === "±" || msg === "AC" || msg === "←") {
            switch (msg) {
                case ".":
                    this.dotFun();
                    this.changeCheckOper();
                    break;
                case "%":
                    this.percentFun();
                    break;
                case "±":
                    this.nagativeFun();
                    break;
                case "AC":
                    this.cleanAllFun();
                    break;
                case "←":
                    this.backFun();
                    break;
            }
        } else {
            if (this.templast === "+" || this.templast === "-" || this.templast === "x" || this.templast === "÷") {
                this.state = msg;
            } else {
                this.calFun(msg);
            }
        }
        this.checkNaN();
        this.templast = msg;
    },

    inputNumber(msg) {
        if (this.checkOper) {
            this.showScore.string = "0";
            this.checkOper = false;
        }
        if (this.showScore.string === "0") {
            this.showScore.string = "" + msg;
        } else {
            this.showScore.string += msg;
        }

    },

    dotFun() {
        let checkDot = this.showScore.string;
        if ((checkDot.indexOf(".") == -1)) {
            this.showScore.string += ".";
        }
    },

    percentFun() {
        let percent = new Number(this.showScore.string);
        percent = percent / 100;
        percent = parseFloat(percent.toPrecision(12));
        this.showScore.string = percent;
    },

    nagativeFun() {
        let nagative = this.showScore.string;
        if ((nagative.indexOf("-") == -1)) {
            this.showScore.string = "-" + this.showScore.string;
        } else {
            let sliceString = this.showScore.string.split("-");
            this.showScore.string = sliceString[1];
        }
        if (this.showScore.string === "-0") {
            this.showScore.string = "0";
        }
    },

    cleanAllFun() {
        this.showScore.string = "0";
        this.resetSet();
    },

    resetSet() {
        this.state = "=";
        this.templast = "";
        this.score = 0;
    },

    backFun() {
        if (!this.checkOper) {
            if (this.ifNaN) {
                this.showScore.string = "0";
                this.ifNaN = false;
            } else {
                let back = this.showScore.string.substring(0, this.showScore.string.length - 1);
                this.showScore.string = back;
                if (this.showScore.string === "" || this.showScore.string === "-") {
                    this.showScore.string = "0";
                }
            }
        }
    },

    calFun(operation) {
        var number = new Number(this.showScore.string);
        switch (this.state) {
            case "+":
                this.score += number;
                break;
            case "-":
                this.score -= number;
                break;
            case "x":
                this.score = this.score * number;
                break;
            case "÷":
                this.score = this.score / number;
                break;
            case "=":
                this.score = number;
                break;
        }
        this.score = parseFloat(this.score.toPrecision(12));
        this.showScore.string = this.score;
        this.checkOper = true;
        this.state = operation;
    },

    changeCheckOper() {
        if (this.checkOper) {
            this.checkOper = false;
        }
    },

    checkNaN() {
        if (this.showScore.string === "Infinity" || this.showScore.string === "-Infinity" ||
            this.showScore.string === "NaN" || this.showScore.string === "不是數字" ||
            this.showScore.string === "-不是數字") {
            this.showScore.string = "不是數字";
            this.resetSet();
            this.checkOper = true;
            this.ifNaN = true;
        }
        this.changeOperationColor();
    },

    changeOperationColor() {
        const operationArray = ["+", "-", "x", "÷"];
        for (let i = 0; i < operationArray.length; i++) {
            let buttonOperation = this.node
                .getChildByName(operationArray[i])
                .getChildByName("Background")
                .getChildByName("Label");
            buttonOperation.color = new cc.color(0, 0, 0);
            buttonOperation.getComponent(cc.Label).fontSize = 20;
        }
        if (this.state === "+" || this.state === "-" || this.state === "x" || this.state === "÷") {
            let buttonName = this.state;
            let buttonOperation = this.node
                .getChildByName(buttonName)
                .getChildByName("Background")
                .getChildByName("Label");
            buttonOperation.color = new cc.color(255, 255, 255);
            buttonOperation.getComponent(cc.Label).fontSize = 38;
        }
    },

    compareToggle() {
        const AllButtonArray = [".", "=", "+", "-", "x", "÷", "%", "±", "AC", "←"];
        for (let i = 0; i <= 9; i++) {
            AllButtonArray.push(i.toString());
        }
        let normal = this.node
            .getChildByName("changeStyle")
            .getChildByName("original")
            .getComponent(cc.Toggle)
            .isChecked;
        let circle = this.node
            .getChildByName("changeStyle")
            .getChildByName("circle")
            .getComponent(cc.Toggle)
            .isChecked;
        for (let i = 0; i < AllButtonArray.length; i++) {
            let buttonStyle = this.node.getChildByName(AllButtonArray[i]).getComponent(cc.Button);
            if (normal) {
                buttonStyle.normalSprite = this.normal;
                buttonStyle.pressedSprite = this.press;
                buttonStyle.hoverSprite = this.normal;
            } else if (circle) {
                buttonStyle.normalSprite = this.normalCircle;
                buttonStyle.pressedSprite = this.pressCircle;
                buttonStyle.hoverSprite = this.normalCircle;
            }
        }
    },
});
