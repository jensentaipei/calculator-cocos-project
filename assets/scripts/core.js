cc.Class({
    extends: cc.Component,

    properties: {
        buttonPrefab: {
            default: null,
            type: cc.Prefab
        },
        scoreDisplayPrefab: {
            default: null,
            type: cc.Prefab
        },
        styleChangeToggle: {
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
        slideFontSize: {
            default: null,
            type: cc.Prefab
        },
        featuresPrefab: {
            default: null,
            type: cc.Prefab
        },
        keyBoard: {
            default: null,
            type: cc.Prefab
        },
        scoreColorToggle: {
            default: null,
            type: cc.Prefab
        },
    },

    onLoad() {
        this.insString();
        this.insNumButton();
        this.insCalButton();
        this.insStyleToggle();
        this.insSlide();
        this.insFeatures();
        this.insKeyboard();
        this.insScoreColorToggle();
        //set string
        this.showScore = this.node
            .getChildByName("String")
            .getChildByName("ScoreDisplay")
            .getComponent(cc.Label);
        this.ScoreColor = this.node
            .getChildByName("String")
            .getChildByName("ScoreDisplay");
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
        //scoreColor Boolean
        this.scoreColorBoolean = false;
        //update
        this.ratio = 0.15;
        this.ratioBoolean = true;
    },

    insString() {
        let score = cc.instantiate(this.scoreDisplayPrefab);
        this.node.addChild(score);
    },

    insNumButton() {
        for (let i = 0; i <= 9; i++) {
            let setNumberButton = cc.instantiate(this.buttonPrefab);
            let numberButton = setNumberButton.getComponent("setButton");
            numberButton.title = i.toString();
            setNumberButton.name = i.toString();
            numberButton.whatInButton = () => this.process(numberButton.title);
            this.node.addChild(setNumberButton);
        }
    },

    insCalButton() {
        let calArray = this.allButton();
        for (let i = 0; i < 10; i++) {
            let setCalButton = cc.instantiate(this.buttonPrefab);
            let calButton = setCalButton.getComponent("setButton");
            calButton.title = calArray[i];
            setCalButton.name = calArray[i];
            calButton.whatInButton = () => this.process(calButton.title);
            this.node.addChild(setCalButton);
        }
    },

    insStyleToggle() {
        let styletoggle = cc.instantiate(this.styleChangeToggle);
        let set_toggle = styletoggle.getComponent("setToggle");
        set_toggle.OnToggle = () => this.style();
        this.node.addChild(styletoggle);
        styletoggle.active = false;
    },

    insSlide() {
        let sizeSlide = cc.instantiate(this.slideFontSize);
        let set_slide = sizeSlide.getComponent("setSlide");
        set_slide.OnSlide = () => this.slideRow();
        this.node.addChild(sizeSlide);
        sizeSlide.active = false;
    },

    insFeatures() {
        let featuresToggle = cc.instantiate(this.featuresPrefab);
        let set_features = featuresToggle.getComponent("setFeaturesToggle");
        set_features.OnSwitch = () => this.featuresSwitch();
        this.node.addChild(featuresToggle);
    },

    insKeyboard() {
        let keyboardToggle = cc.instantiate(this.keyBoard);
        let set_keyboard = keyboardToggle.getComponent("setKeyboard");
        set_keyboard.OnKeyboard = () => this.keyBoardSwitch();
        this.node.addChild(keyboardToggle);
    },

    insScoreColorToggle() {
        let scoreToggle = cc.instantiate(this.scoreColorToggle);
        let set_toggle = scoreToggle.getComponent("setScoreColor");
        set_toggle.OnScoreColor = () => this.scoreColorChange();
        this.node.addChild(scoreToggle);
        scoreToggle.active = false;
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
        let operationButton = this.allButton();
        for (let i = 1; i < 5; i++) {
            let buttonOperation = this.node
                .getChildByName(operationButton[i])
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

    allButton() {
        const AllButtonArray = ["=", "+", "-", "x", "÷", "←", "%", "±", "AC", "."];
        for (let i = 0; i <= 9; i++) {
            AllButtonArray.push(i.toString());
        }
        return AllButtonArray;
    },

    style() {
        let allbutton = this.allButton();
        let normal = this.node
            .getChildByName("ChangeStyle")
            .getChildByName("original")
            .getComponent(cc.Toggle)
            .isChecked;
        let circle = this.node
            .getChildByName("ChangeStyle")
            .getChildByName("circle")
            .getComponent(cc.Toggle)
            .isChecked;
        for (let i = 0; i < allbutton.length; i++) {
            let buttonStyle = this.node.getChildByName(allbutton[i]).getComponent(cc.Button);
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

    slideRow() {
        let slideprogess = this.node
            .getChildByName("ChangeColor")
            .getComponent(cc.Slider)
            .progress;
        let allbutton = this.allButton();
        console.log(allbutton);
        for (let i = 6; i < allbutton.length; i++) {
            let buttomcolor = this.node
                .getChildByName(allbutton[i])
                .getChildByName("Background")
                .getChildByName("Label");
            this.rainbowColor(slideprogess, buttomcolor)
        }

    },

    featuresSwitch() {
        let features = this.node
            .getChildByName("FeaturesSwitch")
            .getComponent(cc.Toggle)
            .isChecked;
        let changeStyle = this.node.getChildByName("ChangeStyle");
        let changeColor = this.node.getChildByName("ChangeColor");
        let scoreColor = this.node.getChildByName("ScoreColor");
        if (features) {
            changeStyle.active = true;
            changeColor.active = true;
            scoreColor.active = true;
        } else if (!features) {
            changeStyle.active = false;
            changeColor.active = false;
            scoreColor.active = false;
        }
    },

    findPrecent(a, b, c) {
        let percent = (b - a) / (c - a);
        return percent;
    },

    keyBoardSwitch() {
        let keyBoardSet = this.node
            .getChildByName("KeyBoard")
            .getComponent(cc.Toggle)
            .isChecked;
        if (keyBoardSet) {
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        } else {
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        }
    },

    onKeyDown(event) {
        if (event.keyCode < 47 || event.keyCode > 58) {
            return;
        }
        this.process(event.keyCode - 48);
    },

    rainbowColor(number, target) {
        console.log(number + target);
        var getnumber = number;
        var gettarget = target;
        let violet = new cc.Color(148, 0, 211);
        let indigo = new cc.Color(75, 0, 130);
        if (getnumber < 1 / 7) {
            gettarget.color = cc.Color.BLACK.lerp(cc.Color.RED, this.findPrecent(0, getnumber, 1 / 7));
        } else if (getnumber < 2 / 7) {
            gettarget.color = cc.Color.RED.lerp(cc.Color.ORANGE, this.findPrecent(1 / 7, getnumber, 2 / 7));
        } else if (getnumber < 3 / 7) {
            gettarget.color = cc.Color.ORANGE.lerp(cc.Color.YELLOW, this.findPrecent(2 / 7, getnumber, 3 / 7));
        } else if (getnumber < 4 / 7) {
            gettarget.color = cc.Color.YELLOW.lerp(cc.Color.GREEN, this.findPrecent(3 / 7, getnumber, 4 / 7));
        } else if (getnumber < 5 / 7) {
            gettarget.color = cc.Color.GREEN.lerp(cc.Color.BLUE, this.findPrecent(4 / 7, getnumber, 5 / 7));
        } else if (getnumber < 6 / 7) {
            gettarget.color = cc.Color.BLUE.lerp(indigo, this.findPrecent(5 / 7, getnumber, 6 / 7));
        } else if (getnumber.color < 1) {
            gettarget = indigo.lerp(violet, this.findPrecent(6 / 7, getnumber, 1));
        }
    },

    scoreColorChange() {
        let colorToggle = this.node
            .getChildByName("ScoreColor")
            .getComponent(cc.Toggle)
            .isChecked;
        if (colorToggle) {
            this.scoreColorBoolean = true;
        } else {
            this.scoreColorBoolean = false;
        }
    },

    update: function (dt) {
        if (this.scoreColorBoolean) {
            if (this.ratioBoolean) {
                this.ratio += dt * 0.4;
                if (this.ratio > 1) {
                    this.ratioBoolean = false;
                }
            } else {
                this.ratio -= dt * 0.4;
                if (this.ratio < 0.15) {
                    this.ratioBoolean = true;
                }
            }
            this.rainbowColor(this.ratio, this.ScoreColor);
        } else {
            this.ScoreColor.color = new cc.Color(255, 255, 255);
        }
    }

});