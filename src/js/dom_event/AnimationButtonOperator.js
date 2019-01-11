import Util from "../util/Util"

var $runCode = $("#run-code");
var $last = $("#last")
var $next = $("#next");
var $refresh = $("#refresh")
var $close = $("#close");

var $windowScaleTrigger = $("#window-scale-trigger");
var $shock = $(".shock");

export default function (params) {
    this.history = [];
    this.historyIndex = -1;
    this._buttons = [$runCode, $last, $next, $refresh, $close, $windowScaleTrigger];

    this.initEvents = function () {
        var me = this;
        for (let i = 0; i < this._buttons.length; i++) {
            let prop;
            if (this._buttons[i] === $runCode) {
                prop = {scale: 1.3};
            } else {
                prop = {
                    opacity: 0.5
                }
            }
            this._buttons[i].mousedown(function () {
                me._buttons[i].velocity(prop, {
                    duration: 150,
                });
            });
            this._buttons[i].mouseup(function () {
                me._buttons[i].velocity("reverse", {duration: 150});
                me._buttonEvents[i].call(me);
            })
        }
    }
    this.runCode = function () {
        if (params.state.wight.hasStatus(params.state.wight.CHROME_OPEN)) {
            params.browserOperator.animationName = params.browserOperator.codeAnimationName;
            params.browserOperator.runAnimation();
            this.history.push(params.browserOperator.codeAnimationName);
            this.historyIndex++;
        }
    }

    this.last = function () {
        if (this.history && this.history[--this.historyIndex])
            params.browserOperator.animationName = this.history[this.historyIndex];
        else
            ++this.historyIndex
        params.browserOperator.runAnimation();
    }
    this.next = function () {
        if (this.history && this.history[++this.historyIndex])
            params.browserOperator.animationName = this.history[this.historyIndex];
        else
            --this.historyIndex
        params.browserOperator.runAnimation();
    }

    this.refresh = function () {
        params.browserOperator.runAnimation();
    }

    this.close = function () {
        this.historyIndex = -1;
        this.history = [];
        this.showAnotherWight();

        $(".browser-container").fadeOut(1000);
        params.state.wight.delStatus(params.state.wight.CHROME_OPEN);
        params.state.wight.addStatus(params.state.wight.CHROME_CLOSED);
    }

    this.windowScaleTrigger = function () {

        if ($windowScaleTrigger.attr("class").search("fa fa-window-maximize")>-1){
            $windowScaleTrigger.removeClass().addClass("fa fa-window-restore")
            $shock.addClass("shock-browser-container-maximize");
            params.state.isMaximize = true;
        }else{
            $windowScaleTrigger.removeClass().addClass("fa fa-window-maximize")
            $shock.removeClass("shock-browser-container-maximize");
            params.state.isMaximize = false;
        }

        Util.amendParitclesSize();
    }
    this.initEvents();
    this._buttonEvents = [this.runCode, this.last, this.next, this.refresh, this.close, this.windowScaleTrigger];

    this.showAnotherWight = function () {
        if(params.state.wight.hasStatus(params.state.wight.CHROME_CLOSED|params.state.wight.VSCODE_CLOSED)){
            params.popHeadingEffect.show();
        }else{
            if(params.popHeadingEffect.isShow){
                params.popHeadingEffect.hide();
            }
        }
    }
}