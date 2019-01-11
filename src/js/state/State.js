function Wight() {
    this.Flag = 0;
    this.CHROME_OPEN = 1 << 0;
    this.CHROME_CLOSED = 1 << 1;
    this.VSCODE_OPEN = 1 << 2;
    this.VSCODE_CLOSED = 1 << 3;

    this.setStatus = function (condition) {
        this.Flag = condition;
    }
    this.hasStatus = function (condition) {
        return (this.Flag & condition) === condition;
    }
    this.hasNotStatus = function (condition) {
        return (this.Flag & condition) === 0;
    }
    this.hasOnlyStatus = function (condition) {
        this.Flag === condition;
    }

    this.addStatus = function (condition) {
        this.Flag |= condition;
    }
    this.delStatus = function (condition) {
        this.Flag &= ~condition;
    }
    this.getStatus = function () {
        return this.Flag;
    }
}

export default function () {
    this.hasScroll = false;
    this.isMaximize = false;
    this.isAutomationRunCode = function () {
        return document.getElementById("automation-run-code").checked
    };
    this.wight = new Wight();
}