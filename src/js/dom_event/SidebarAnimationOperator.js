var Waves = require("../plugins/waves.min");

export default function (params) {
    this.params = params;
    this.initWavesButtons = function () {
        Waves.attach('.flat-buttons', ['waves-button', 'waves-light']);
        Waves.init();
    }

    this.switchAnimationButtons = function () {
        var me = this;
        $("#velocity_animation_btn").click(function () {
            me.params.animationName = this.getAttribute("data-animation-name");
            me.changeAnimation(me.params);
        })
        $("#particles_animation_btn").click(function () {
            me.params.animationName = this.getAttribute("data-animation-name");
            me.changeAnimation(me.params);
        })
    }

    this.changeAnimation = function () {
        var wight = this.params.state.wight;
        if (wight.hasNotStatus(wight.CHROME_OPEN | wight.VSCODE_OPEN)) {
            return;
        }

        var parseText = params.parseExecutor.runParseText(this.params.animationName);

        //确保VSCode与游览器同步
        this.params.browserOperator.animationName = this.params.animationName;
        this.params.browserOperator.codeAnimationName = this.params.animationName;

        $("#drag").css("top", 0);
        $("#paper").css("top", 0);
        $("#paper").empty();

        this.params.writer.performance(parseText);
    }
}