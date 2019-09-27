cc.Class({
    extends: cc.Component,
    //#region Set
    properties: {
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        button1: {
            default: null,
            type: cc.Button
        },
        score: {
            default: 0,
        },
        number2: {
            default: 0,
        },
        num2d: {
            default: '0',
        },
        scored: {
            default: '0',
        },
        add: {
            default: false,
        },
        sub: {
            default: false,
        },
        mul: {
            default: false,
        },
        divid: {
            default: false,
        },
        dot: {
            default: false,
        },
        first: {
            default: true,
        },
        sec: {
            default: false,
        },
        check: {
            default: true,
        },
        checkresult: {
            default: false,
        },
        testresult: {
            default: false,
        },
        percentchange: {
            default: false,
        },
        nagativechange: {
            default: false,
        }
        //#endregion
    },
    //#region EnterNumber
    number: function (event, customEventData) {
        if (this.testresult || this.percentchange || this.nagativechange) {
            this.add = false;
            this.sub = false;
            this.mul = false;
            this.divid = false;
            this.dot = false;
            this.check = true;
            this.checkresult = false;
            this.number2 = 0;
            this.score = 0;
            this.scored = '0';
            this.num2d = '0';
            this.first = true;
            this.sec = false;
            this.testresult = false;
            this.percentchange = false;
            this.nagativechange = false;
        }
        if (this.dot) {
            if (!this.add && !this.sub && !this.mul && !this.divid)//&& this.score == 0)
            {
                this.first = true;
                this.sec = false;
                var ss = customEventData;
                this.scored = this.scored + ss;
                this.score = new Number(this.scored);
                this.scoreDisplay.string = this.score;
            }
            else {
                this.first = false;
                this.sec = true;
                var ss1 = customEventData;
                this.num2d = this.num2d + ss1;
                this.number2 = new Number(this.num2d);
                this.scoreDisplay.string = this.number2;
            }
        }
        else {
            if (!this.add && !this.sub && !this.mul && !this.divid)//&& this.score == 0)
            {
                this.first = true;
                this.sec = false;
                var s = customEventData;
                var a = new Number(s);
                this.score = this.score * 10 + a;
                this.scoreDisplay.string = this.score;
            }
            else {
                this.first = false;
                this.sec = true;
                var s1 = customEventData;
                var a1 = new Number(s1);
                this.number2 = this.number2 * 10 + a1;
                this.scoreDisplay.string = this.number2;
            }
        }
    },
    //#endregion

    //#region CalculateFunction
    addfun: function () {
        this.add = true;
        this.sub = false;
        this.mul = false;
        this.divid = false;
        this.dot = false;
        this.testresult = false;
        this.percentchange = false;
        this.nagativechange = false;
        /////
        this.checkresult = false;
        this.score = this.score + this.number2;
        this.number2 = 0;
        this.score = parseFloat(this.score.toPrecision(12));
        this.scoreDisplay.string = this.score;
        if (this.score === Number.POSITIVE_INFINITY || this.score === -Number.POSITIVE_INFINITY
            || isNaN(this.score)) {
            this.scoreDisplay.string = "不是數字";
            this.testresult = true;
        }

    },

    subfun: function () {
        this.add = false;
        this.sub = true;
        this.mul = false;
        this.divid = false;
        this.dot = false;
        this.testresult = false;
        this.percentchange = false;
        this.nagativechange = false;
        /////
        this.checkresult = false;
        this.score = this.score - this.number2;
        this.number2 = 0;
        this.score = parseFloat(this.score.toPrecision(12));
        this.scoreDisplay.string = this.score;
        if (this.score === Number.POSITIVE_INFINITY || this.score === -Number.POSITIVE_INFINITY
            || isNaN(this.score)) {
            this.scoreDisplay.string = "不是數字";
            this.testresult = true;
        }
    },

    multifun: function () {
        this.add = false;
        this.sub = false;
        this.mul = true;
        this.divid = false;
        this.dot = false;
        this.testresult = false;
        this.percentchange = false;
        this.nagativechange = false;
        /////
        if (this.check || this.checkresult) {
            this.score = this.score;
            this.check = false;
            this.checkresult = false;
        }
        else {
            this.score = this.score * this.number2;
            this.number2 = 0;
        }
        this.score = parseFloat(this.score.toPrecision(12));
        this.scoreDisplay.string = this.score;
        if (this.score === Number.POSITIVE_INFINITY || this.score === -Number.POSITIVE_INFINITY
            || isNaN(this.score)) {
            this.scoreDisplay.string = "不是數字";
            this.testresult = true;
        }
    },

    dividfun: function () {
        this.add = false;
        this.sub = false;
        this.mul = false;
        this.divid = true;
        this.dot = false;
        this.testresult = false;
        this.percentchange = false;
        this.nagativechange = false;
        /////
        if (this.check || this.checkresult) {
            this.score = this.score;
            this.check = false;
            this.checkresult = false;
        }
        else {
            this.score = this.score / this.number2;
            this.number2 = 0;
        }
        this.score = parseFloat(this.score.toPrecision(12));
        this.scoreDisplay.string = this.score;
        if (this.score === Number.POSITIVE_INFINITY || this.score === -Number.POSITIVE_INFINITY
            || isNaN(this.score)) {
            this.scoreDisplay.string = "不是數字";
            this.testresult = true;
        }
    },

    nagative: function () {
        this.testresult = false;
        this.nagativechange = true;
        if (this.sec)//!this.number2 == 0)
        {
            this.number2 = -this.number2;
            this.scoreDisplay.string = this.number2;
        }
        else if (this.first)//!this.score == 0)
        {
            this.score = -this.score;
            this.scoreDisplay.string = this.score;
        }
        if (this.score === Number.POSITIVE_INFINITY || this.score === -Number.POSITIVE_INFINITY
            || isNaN(this.score)) {
            this.scoreDisplay.string = "不是數字";
            this.testresult = true;
        }
    },

    percent: function () {
        this.testresult = false;
        this.percentchange = true;
        if (this.sec)//!this.number2 == 0)
        {
            this.number2 = this.number2 / 100;
            this.number2 = parseFloat(this.number2.toPrecision(12));
            this.scoreDisplay.string = this.number2;
        }
        else if (this.first)//!this.score == 0)
        {
            this.score = this.score / 100;
            this.score = parseFloat(this.score.toPrecision(12));
            this.scoreDisplay.string = this.score;
        }
        if (this.score === Number.POSITIVE_INFINITY || this.score === -Number.POSITIVE_INFINITY
            || isNaN(this.score)) {
            this.scoreDisplay.string = "不是數字";
            this.testresult = true;
        }
    },

    dotfun: function () {
        if (this.testresult) {
            this.add = false;
            this.sub = false;
            this.mul = false;
            this.divid = false;
            this.dot = false;
            this.check = true;
            this.checkresult = false;
            this.number2 = 0;
            this.score = 0;
            this.scored = '0';
            this.num2d = '0';
            this.first = true;
            this.sec = false;
            this.testresult = false;
        }
        if (!this.dot) {
            if (this.sec)//!this.number2 == 0)
            {
                this.num2d = this.number2.toString();
                if (this.num2d.includes(".")) { }
                else {
                    this.num2d = this.num2d + '.';
                    this.scoreDisplay.string = this.num2d;
                }
            }
            else if (this.first)//!this.score == 0)
            {
                this.scored = this.score.toString();
                if (this.scored.includes(".")) { }
                else {
                    this.scored = this.scored + '.';
                    this.scoreDisplay.string = this.scored;
                }
            }
            this.dot = true;
        }
    },

    clear: function () {
        this.add = false;
        this.sub = false;
        this.mul = false;
        this.divid = false;
        this.dot = false;
        this.check = true;
        this.checkresult = false;
        this.number2 = 0;
        this.score = 0;
        this.scored = '0';
        this.num2d = '0';
        this.first = true;
        this.sec = false;
        this.nagativechange = false;
        this.percentchange = false;
        this.scoreDisplay.string = this.score;
    },

    backfun: function () {
        if (this.sec)//!this.number2 == 0)
        {
            this.num2d = this.number2.toString();
            this.num2d = this.num2d.substring(0, this.num2d.length - 1);
            if (this.num2d.includes(".")) {
                this.dot = true;
            }
            else {
                this.dot = false;
                if (this.num2d == 0) {
                    this.num2d = '0';
                }
            }
            if (this.num2d == '-') {
                this.num2d = '0';
            }
            var bbbbbbb=this.num2d.slice(-1);
            if(bbbbbbb=='.')
            {
                this.dot=false;
            }
            this.number2 = new Number(this.num2d);
            this.scoreDisplay.string = this.number2;
        }
        else if (this.first)//!this.score == 0)
        {
            this.scored = this.score.toString();
            this.scored = this.scored.substring(0, this.scored.length - 1);
            if (this.scored.includes(".")) {
                this.dot = true;
            }
            else {
                this.dot = false;
                if (this.scored == 0) {
                    this.scored = '0';
                }
            }
            if (this.scored == '-') {
                this.scored = '0';
            }
            var aaaaaa=this.scored.slice(-1);
            if(aaaaaa=='.')
            {
                this.dot=false;
            }
            this.score = new Number(this.scored);
            this.scoreDisplay.string = this.score;
        }
        if (this.score === Number.POSITIVE_INFINITY || this.score === -Number.POSITIVE_INFINITY
           || isNaN(this.score)) {
           this.scoreDisplay.string = "不是數字";
           this.testresult = true;
           }
    },

    //#endregion

    //#region  Result
    result: function () {
        if (this.add) {
            this.score = this.score + this.number2;
            this.add = false;
        }
        else if (this.sub) {
            this.score = this.score - this.number2;
            this.sub = false;
        }
        else if (this.mul) {
            this.score = this.score * this.number2;
            this.mul = false;
        }
        else if (this.divid) {
            this.score = this.score / this.number2;
            this.divid = false;
        }
        this.score = parseFloat(this.score.toPrecision(12));
        this.scoreDisplay.string = this.score;
        if (this.score === Number.POSITIVE_INFINITY || this.score === -Number.POSITIVE_INFINITY
            || isNaN(this.score)) {
            this.scoreDisplay.string = "不是數字";
        }
        this.number1 = this.score;
        this.number2 = 0;
        this.scored = '0';
        this.num2d = '0';
        this.sec = false;
        this.first = true;
        this.testresult = true;
        this.checkresult = true;
    },
    //#endregion

    start() {
        this.add = false;
        this.sub = false;
        this.mul = false;
        this.divid = false;
        this.dot = false;
        this.first = true;
        this.sec = false;
        //////////
        this.check = true;
        this.checkresult = false;
        this.testresult = false;
        this.percentchange = false;
        this.nagativechange = false;
    },

    update: function (dt) {

    },
});
