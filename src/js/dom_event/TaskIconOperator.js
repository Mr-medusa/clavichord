import Util from "../util/Util"

export default function (state,popHeadingEffect) {
    this.$browserContain = $(".browser-container");
    this.$editorContainer = $(".editor-container");

    this.$chrome = $("#chrome");
    this.$vscode = $("#vscode");
    this.$close = $("#close");
    this.$minimize = $("#minimize");
    this.init = function () {
        this.addChromeIconClick();
        this.addVScodeIconClick();
        this.chromeMinimize();
        this.chromeClose();
    }

    this.chromeMinimize = function () {
        var that = this;
        this.$minimize.click(function () {

            state.wight.delStatus(state.wight.CHROME_OPEN);
            state.wight.addStatus(state.wight.CHROME_CLOSED);

            that.handHeadingWightEffect();

            that.$browserContain.fadeOut(1000);
        })
    }
    this.chromeClose = function () {
        var that = this;
        this.$close.click(function () {

            $("#browser .content").empty();
            $('link[data-browser-operator-css]').replaceWith('<link rel="stylesheet" href="#" data-browser-operator-css>');

            state.wight.delStatus(state.wight.CHROME_OPEN);
            state.wight.addStatus(state.wight.CHROME_CLOSED);

            that.handHeadingWightEffect();

            that.$browserContain.fadeOut(1000);
        });
    }

    this.addChromeIconClick = function () {
        var that = this;
        this.$chrome.click(function () {
            if(state.wight.hasStatus(state.wight.CHROME_OPEN)){
                state.wight.delStatus(state.wight.CHROME_OPEN);
                state.wight.addStatus(state.wight.CHROME_CLOSED);
                that.$browserContain.fadeOut(1000);
            }else{
                state.wight.delStatus(state.wight.CHROME_CLOSED);
                state.wight.addStatus(state.wight.CHROME_OPEN);
                that.$browserContain.fadeIn(1000);
            }
            that.handHeadingWightEffect();
        })

    }
    this.addVScodeIconClick = function () {

        var that = this;
        this.$vscode.click(function () {
            $("#particles-js").attr("style", "");
            if(state.wight.hasStatus(state.wight.VSCODE_OPEN)){
                state.wight.delStatus(state.wight.VSCODE_OPEN);
                state.wight.addStatus(state.wight.VSCODE_CLOSED);
                that.$editorContainer.fadeOut(1000);
            }else{
                state.wight.delStatus(state.wight.VSCODE_CLOSED);
                state.wight.addStatus(state.wight.VSCODE_OPEN);

                that.$editorContainer.fadeIn(1000);
            }
            that.handHeadingWightEffect();
            Util.amendParitclesSize();
        })
    }

    this.init();

    this.handHeadingWightEffect = function () {
        if(state.wight.hasStatus(state.wight.CHROME_CLOSED|state.wight.VSCODE_CLOSED)){
            popHeadingEffect.show();
        }else{
            if(popHeadingEffect.isShow){
                popHeadingEffect.hide();
            }
        }
    }
}